"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Chapter } from "@/content/types";
import { voiceCast } from "@/content/narration";
import { getNarrationSegments, narrationSourceHash, splitSpeechText, validateNarrationManifest, type NarrationManifest } from "@/lib/narration";

type Status = "stopped" | "playing" | "paused" | "ended";
type Props = { chapter: Chapter; initialSceneId?: string; onActiveParagraph?: (id: string | null) => void };

export function ChapterNarration(props: Props) {
  return <NarrationPlayer key={`${props.chapter.slug}/${props.initialSceneId ?? ""}`} {...props} />;
}

function NarrationPlayer({ chapter, initialSceneId, onActiveParagraph }: Props) {
  const segments = useMemo(() => getNarrationSegments(chapter), [chapter]);
  const previewTracks = useMemo(() => segments.flatMap((segment) => splitSpeechText(segment.text).filter((text) => text.trim()).map((text) => ({ ...segment, text }))), [segments]);
  const [manifest, setManifest] = useState<NarrationManifest | null>(null);
  const [recordingStatus, setRecordingStatus] = useState("Checking the chapter recording…");
  const [loaded, setLoaded] = useState(false);
  const [retry, setRetry] = useState(0);
  const [deviceMode, setDeviceMode] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [voiceChoices, setVoiceChoices] = useState<Record<string, string>>({});
  const [rate, setRate] = useState(1);
  const [index, setIndex] = useState(() => Math.max(0, previewTracks.findIndex((part) => part.sceneId === initialSceneId)));
  const [status, setStatus] = useState<Status>("stopped");
  const [error, setError] = useState("");
  const audio = useRef<HTMLAudioElement | null>(null);
  const utterance = useRef<SpeechSynthesisUtterance | null>(null);
  const ownsSpeech = useRef(false);
  const generation = useRef(0);
  const position = useRef(index);
  const usingRecording = !!manifest && !deviceMode;
  const tracks = usingRecording ? manifest.chunks : previewTracks;
  const track = tracks[index];
  const scenes = chapter.scenes.filter((scene) => tracks.some((part) => part.sceneId === scene.id));
  const castIds = [...new Set(segments.map((segment) => segment.speaker))];
  const englishVoices = voices.filter((voice) => /^en\b/i.test(voice.lang));
  const availableVoices = englishVoices.length ? englishVoices : voices;

  useEffect(() => {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => {
      controller.abort();
      setRecordingStatus("The recording check timed out. Device preview is available; you can check again below.");
      setLoaded(true);
    }, 10000);
    async function load() {
      try {
        const response = await fetch(`/audio/narration/${chapter.slug}/manifest.json`, { signal: controller.signal });
        if (!response.ok) {
          if (response.status !== 404) throw new Error("Recording could not be checked. Retry when your connection is available.");
          if (!controller.signal.aborted) setRecordingStatus("The cast recording is not available for this chapter yet.");
          return;
        }
        const hash = await narrationSourceHash(chapter);
        const checked = validateNarrationManifest(await response.json(), chapter, hash);
        if (!checked) throw new Error("The chapter has changed since this recording. A new recording is needed.");
        if (!controller.signal.aborted) {
          setManifest(checked);
          setDeviceMode(false);
          setRecordingStatus(checked.complete ? "ElevenLabs · narrated with character voices" : "ElevenLabs · cast recording sample");
          const start = Math.max(0, checked.chunks.findIndex((chunk) => chunk.sceneId === initialSceneId));
          position.current = start;
          setIndex(start);
        }
      } catch (cause) {
        if (!controller.signal.aborted) setRecordingStatus(cause instanceof Error ? cause.message : "Recording unavailable.");
      } finally {
        window.clearTimeout(timeout);
        if (!controller.signal.aborted) setLoaded(true);
      }
    }
    void load();
    return () => { window.clearTimeout(timeout); controller.abort(); };
  }, [chapter, initialSceneId, retry]);

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (!synth) return;
    const update = () => { setSpeechSupported(true); setVoices(synth.getVoices()); };
    queueMicrotask(update);
    synth.addEventListener("voiceschanged", update);
    return () => synth.removeEventListener("voiceschanged", update);
  }, []);

  useEffect(() => () => {
    generation.current++;
    if (audio.current) { audio.current.pause(); audio.current.removeAttribute("src"); audio.current.load(); }
    if (ownsSpeech.current) window.speechSynthesis?.cancel();
    utterance.current = null;
  }, []);

  useEffect(() => {
    // Prepared cast clips may span paragraphs; only device phrases have exact paragraph timing.
    onActiveParagraph?.(!usingRecording && track && (status === "playing" || status === "paused") ? `${track.sceneId}:${track.paragraphIndex}` : null);
    return () => onActiveParagraph?.(null);
  }, [track, status, onActiveParagraph, usingRecording]);

  function halt() {
    generation.current++;
    audio.current?.pause();
    if (ownsSpeech.current) window.speechSynthesis.cancel();
    ownsSpeech.current = false;
    utterance.current = null;
  }

  function stop() {
    halt();
    setStatus("stopped");
    setError("");
  }

  function defaultVoice(speaker: string) {
    const preferred = availableVoices.filter((voice) => /^en[-_]GB$/i.test(voice.lang));
    const pool = preferred.length ? preferred : availableVoices;
    return pool[Math.max(0, castIds.indexOf(speaker)) % Math.max(1, pool.length)];
  }

  function fail(message: string, token: number) {
    if (token !== generation.current) return;
    halt();
    setStatus("stopped");
    setError(message);
  }

  function playTrack(at: number, token: number) {
    if (token !== generation.current) return;
    if (at >= tracks.length) {
      ownsSpeech.current = false;
      utterance.current = null;
      setStatus("ended");
      return;
    }
    position.current = at;
    setIndex(at);
    setStatus("playing");
    if (usingRecording) {
      const player = audio.current ?? new Audio();
      audio.current = player;
      player.onended = () => playTrack(at + 1, token);
      player.onerror = () => fail("This recording could not play. Try Listen again, or choose Device preview below.", token);
      player.src = manifest.chunks[at].src;
      player.playbackRate = rate;
      void player.play().catch(() => fail("Playback was interrupted. Press Listen to try again.", token));
    } else {
      if (!speechSupported) { fail("This browser does not offer speech preview. Try a browser with speech synthesis support.", token); return; }
      const part = previewTracks[at];
      const speaking = new SpeechSynthesisUtterance(part.text);
      const role = voiceCast[part.speaker] ?? voiceCast.narrator;
      speaking.voice = voices.find((voice) => voice.voiceURI === voiceChoices[part.speaker]) ?? defaultVoice(part.speaker) ?? null;
      speaking.lang = speaking.voice?.lang ?? role.lang;
      speaking.pitch = role.pitch;
      speaking.rate = rate * role.rate;
      speaking.onend = () => playTrack(at + 1, token);
      speaking.onerror = () => fail("The device voice stopped. Press Listen to retry or choose another voice.", token);
      utterance.current = speaking;
      ownsSpeech.current = true;
      window.speechSynthesis.resume();
      window.speechSynthesis.speak(speaking);
    }
  }

  function listen() {
    setError("");
    if (status === "playing") {
      if (usingRecording) audio.current?.pause();
      else halt(); // Restart the current short phrase on resume; long utterance pause is unreliable on mobile.
      setStatus("paused");
      return;
    }
    if (status === "paused" && usingRecording && audio.current) {
      const token = generation.current;
      setStatus("playing");
      void audio.current.play().catch(() => fail("Press Listen to resume the recording.", token));
      return;
    }
    halt();
    const start = status === "ended" ? 0 : position.current;
    playTrack(start, generation.current);
  }

  function move(to: number) {
    const wasPlaying = status === "playing";
    stop();
    position.current = to;
    setIndex(to);
    if (wasPlaying) playTrack(to, generation.current);
  }

  function changeMode(device: boolean) {
    const sceneId = track?.sceneId;
    stop();
    const nextTracks = device || !manifest ? previewTracks : manifest.chunks;
    const next = Math.max(0, nextTracks.findIndex((part) => part.sceneId === sceneId));
    position.current = next;
    setIndex(next);
    setDeviceMode(device);
  }

  const sceneIndex = scenes.findIndex((scene) => scene.id === track?.sceneId);
  const currentSpeaker = track?.speaker === "cast" ? "Narrator & character cast" : voiceCast[track?.speaker ?? "narrator"]?.name ?? "Narrator";
  return <section className="chapter-narration" aria-label="Chapter narration">
    <div className="narration-heading"><div><span className="book-eyebrow">Listen to the story</span><p>{usingRecording ? recordingStatus : loaded ? "Device voice preview · narrator & character parts" : recordingStatus}</p></div>
      <button className="narration-play" onClick={listen} disabled={!loaded || !tracks.length || (!usingRecording && !speechSupported)}>{status === "playing" ? "Pause" : status === "paused" ? "Resume" : status === "ended" ? "Listen again" : usingRecording ? manifest.complete ? "Listen" : "Listen to sample" : "Listen to preview"}</button>
    </div>
    <div className="narration-controls">
      <button onClick={() => move(Math.max(0, tracks.findIndex((part) => part.sceneId === scenes[sceneIndex - 1]?.id)))} disabled={sceneIndex <= 0 || !loaded} aria-label="Previous narrated scene">← Scene</button>
      <label className="narration-scene"><span className="sr-only">Narrated scene</span><select value={track?.sceneId ?? ""} onChange={(event) => move(tracks.findIndex((part) => part.sceneId === event.target.value))} disabled={!loaded || !scenes.length}>{scenes.map((scene, number) => <option value={scene.id} key={scene.id}>{scene.heading ?? `Scene ${number + 1}`}</option>)}</select></label>
      <button onClick={() => move(tracks.findIndex((part) => part.sceneId === scenes[sceneIndex + 1]?.id))} disabled={sceneIndex < 0 || sceneIndex >= scenes.length - 1 || !loaded} aria-label="Next narrated scene">Scene →</button>
      <button onClick={stop} disabled={status === "stopped" || status === "ended"}>Stop</button>
    </div>
    <p className="narration-now" aria-live="polite">{status === "ended" ? usingRecording && !manifest.complete ? "End of the cast sample. The full chapter is available in device preview." : "End of this chapter’s narration." : status === "playing" || status === "paused" ? `${status === "paused" ? "Paused · " : ""}${currentSpeaker} · ${index + 1} of ${tracks.length} passages` : "Audio starts only when you press Listen."}</p>
    {usingRecording && <p className="narration-attribution">{manifest.complete ? "Cast recording" : "Opening scene · cast sample"} · <a href="https://elevenlabs.io" target="_blank" rel="noreferrer">elevenlabs.io</a></p>}
    {error && <p className="narration-error" role="alert">{error}</p>}
    <details className="narration-options"><summary>Playback & voice cast</summary>
      <div className="narration-settings"><label>Recording<select value={usingRecording ? "recording" : "device"} disabled={!loaded} onChange={(event) => changeMode(event.target.value === "device")}><option value="recording" disabled={!manifest}>ElevenLabs cast{manifest && !manifest.complete ? " sample" : " recording"}</option><option value="device" disabled={!speechSupported}>Device preview</option></select></label>
        <label>Speed<select value={rate} onChange={(event) => { stop(); setRate(Number(event.target.value)); }}>{[0.75, 0.9, 1, 1.1, 1.25, 1.5].map((speed) => <option key={speed} value={speed}>{speed}×</option>)}</select></label></div>
      {!manifest && <p>{recordingStatus} <button className="narration-retry" disabled={!loaded} onClick={() => { stop(); setLoaded(false); setRetry((value) => value + 1); }}>Check again</button></p>}
      {!usingRecording && <p>Preview voices come from your browser or device; their quality and British accents vary. Character parts use the cast directions below. Resuming repeats the current short phrase.</p>}
      <div className="narration-cast">{castIds.map((speaker) => { const role = voiceCast[speaker] ?? voiceCast.narrator; return <div key={speaker}><strong>{role.name}</strong><p>{role.direction}</p>{!usingRecording && <label><span className="sr-only">{role.name} preview voice</span><select value={voiceChoices[speaker] ?? ""} onChange={(event) => { stop(); setVoiceChoices((choices) => ({ ...choices, [speaker]: event.target.value })); }}><option value="">Automatic{defaultVoice(speaker) ? ` · ${defaultVoice(speaker)!.name}` : " · device default"}</option>{availableVoices.map((voice) => <option key={voice.voiceURI} value={voice.voiceURI}>{voice.name} ({voice.lang})</option>)}</select></label>}</div>; })}</div>
    </details>
  </section>;
}
