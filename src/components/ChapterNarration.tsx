"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Chapter } from "@/content/types";
import { voiceCast } from "@/content/narration";
import { getNarrationSegments, splitSpeechText } from "@/lib/narration";
import { getNarrationPassages, narrationRequestHash } from "@/lib/narration-passages";
import { useReaderPreferences } from "@/lib/reader-preferences";

type Status = "stopped" | "loading" | "playing" | "paused" | "ended";
type Mode = "ondemand" | "device";
type Props = { chapter: Chapter; initialSceneId?: string; onActiveParagraph?: (id: string | null) => void };

export function ChapterNarration(props: Props) {
  const preferences = useReaderPreferences();
  return <NarrationPlayer key={`${props.chapter.slug}/${props.initialSceneId ?? ""}/${preferences.narration}/${preferences.rate}`} {...props} mode={preferences.narration} rate={preferences.rate} />;
}

function NarrationPlayer({ chapter, initialSceneId, onActiveParagraph, mode, rate }: Props & { mode: Mode; rate: number }) {
  const segments = useMemo(() => getNarrationSegments(chapter), [chapter]);
  const previewTracks = useMemo(() => segments.flatMap((segment) => splitSpeechText(segment.text).filter((text) => text.trim()).map((text) => ({ ...segment, text }))), [segments]);
  const passages = useMemo(() => getNarrationPassages(chapter), [chapter]);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [index, setIndex] = useState(() => Math.max(0, (mode === "ondemand" ? passages : previewTracks).findIndex((part) => part.sceneId === initialSceneId)));
  const [status, setStatus] = useState<Status>("stopped");
  const [error, setError] = useState("");
  const audio = useRef<HTMLAudioElement | null>(null);
  const utterance = useRef<SpeechSynthesisUtterance | null>(null);
  const ownsSpeech = useRef(false);
  const generation = useRef(0);
  const position = useRef(index);
  const pending = useRef<AbortController | null>(null);
  const sourceHash = useRef<Promise<string> | null>(null);
  const replay = useRef(new Map<string, string>());
  const tracks = mode === "ondemand" ? passages : previewTracks;
  const track = tracks[index];
  const castIds = [...new Set(segments.map((segment) => segment.speaker))];
  const englishVoices = voices.filter((voice) => /^en\b/i.test(voice.lang));
  const availableVoices = englishVoices.length ? englishVoices : voices;

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
    pending.current?.abort();
    if (audio.current) { audio.current.pause(); audio.current.removeAttribute("src"); audio.current.load(); }
    if (ownsSpeech.current) window.speechSynthesis?.cancel();
    utterance.current = null;
    for (const url of replay.current.values()) URL.revokeObjectURL(url);
    replay.current.clear();
  }, []);

  useEffect(() => {
    // Prepared cast clips may span paragraphs; only device phrases have exact paragraph timing.
    onActiveParagraph?.(mode === "device" && track && (status === "playing" || status === "paused") ? `${track.sceneId}:${track.paragraphIndex}` : null);
    return () => onActiveParagraph?.(null);
  }, [track, status, onActiveParagraph, mode]);

  function halt() {
    generation.current++;
    pending.current?.abort();
    pending.current = null;
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

  function playAudio(src: string, at: number, token: number) {
    if (token !== generation.current) return;
    const player = audio.current ?? new Audio();
    audio.current = player;
    player.onended = () => playTrack(at + 1, token);
    player.onerror = () => fail("This passage could not play. Press Play to retry, or change narration in Settings.", token);
    player.src = src;
    player.playbackRate = rate;
    setStatus("playing");
    void player.play().catch(() => fail("Playback was interrupted. Press Play to try again.", token));
  }

  async function preparePassage(at: number, token: number) {
    const passage = passages[at];
    const saved = replay.current.get(passage.id);
    if (saved) { playAudio(saved, at, token); return; }
    const controller = new AbortController();
    pending.current = controller;
    setStatus("loading");
    try {
      sourceHash.current ??= narrationRequestHash(chapter);
      const hash = await sourceHash.current;
      if (token !== generation.current) return;
      const response = await fetch("/api/narration", {
        method: "POST", headers: { "Content-Type": "application/json" }, signal: controller.signal,
        body: JSON.stringify({ chapter: chapter.slug, passageId: passage.id, sourceHash: hash }),
      });
      if (!response.ok) {
        const detail = await response.json().catch(() => null);
        throw new Error(typeof detail?.error === "string" ? detail.error : "The voice service could not prepare this passage. Press Play to retry.");
      }
      if (!response.headers.get("content-type")?.startsWith("audio/")) throw new Error("The voice service returned no audio. Press Play to retry.");
      const blob = await response.blob();
      if (token !== generation.current) return;
      const url = URL.createObjectURL(blob);
      replay.current.set(passage.id, url);
      // Keep a bounded local replay window; older clips remain reusable in the server cache.
      if (replay.current.size > 24) {
        const oldest = replay.current.keys().next().value!;
        URL.revokeObjectURL(replay.current.get(oldest)!);
        replay.current.delete(oldest);
      }
      pending.current = null;
      playAudio(url, at, token);
    } catch (cause) {
      if (token === generation.current) fail(cause instanceof Error ? cause.message : "Narration stopped. Press Play to retry.", token);
    }
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
    if (mode === "ondemand") {
      void preparePassage(at, token);
    } else {
      setStatus("playing");
      if (!speechSupported) { fail("This browser does not offer speech preview. Try a browser with speech synthesis support.", token); return; }
      const part = previewTracks[at];
      const speaking = new SpeechSynthesisUtterance(part.text);
      const role = voiceCast[part.speaker] ?? voiceCast.narrator;
      speaking.voice = defaultVoice(part.speaker) ?? null;
      speaking.lang = speaking.voice?.lang ?? role.lang;
      speaking.pitch = role.pitch;
      speaking.rate = rate * role.rate;
      speaking.onend = () => playTrack(at + 1, token);
      speaking.onerror = () => fail("The device voice stopped. Press Play to retry or change narration in Settings.", token);
      utterance.current = speaking;
      ownsSpeech.current = true;
      window.speechSynthesis.resume();
      window.speechSynthesis.speak(speaking);
    }
  }

  function listen() {
    setError("");
    if (status === "loading") { stop(); return; }
    if (status === "playing") {
      if (mode !== "device") audio.current?.pause();
      else halt(); // Restart the current short phrase on resume; long utterance pause is unreliable on mobile.
      setStatus("paused");
      return;
    }
    if (status === "paused" && mode !== "device" && audio.current) {
      const token = generation.current;
      setStatus("playing");
      void audio.current.play().catch(() => fail("Press Play to resume the recording.", token));
      return;
    }
    halt();
    const start = status === "ended" ? 0 : position.current;
    playTrack(start, generation.current);
  }

  const active = status === "playing" || status === "paused";
  const currentScene = chapter.scenes.find((scene) => scene.id === track?.sceneId);
  const label = status === "loading" ? "Cancel" : status === "playing" ? "Pause" : status === "paused" ? "Resume" : status === "ended" ? "Play again" : "Play";
  return <section className="chapter-narration" aria-label="Chapter narration">
    <div className="narration-row">
      <button className="narration-play" onClick={listen} disabled={!tracks.length || (mode === "device" && !speechSupported)} aria-label={`${label} chapter narration`}><span aria-hidden="true">{status === "playing" ? "Ⅱ" : status === "loading" ? "×" : "▶"}</span> {label}</button>
      {active && <button className="narration-stop" onClick={stop}>Stop</button>}
      <p className="narration-now" role="status">{status === "loading" ? "Preparing your narration…" : status === "ended" ? "End of chapter." : active ? `${status === "paused" ? "Paused" : "Playing"}${currentScene?.heading ? ` · ${currentScene.heading}` : ""}` : mode === "device" && !speechSupported ? "Device voices are unavailable." : "Listen to this chapter"}</p>
      <Link className="narration-settings-link" href="/settings" aria-label="Reading and narration settings">Settings</Link>
    </div>
    {mode === "ondemand" && <p className="narration-attribution">Voices by <a href="https://elevenlabs.io" target="_blank" rel="noreferrer">elevenlabs.io</a></p>}
    {error && <p className="narration-error" role="alert">{error}</p>}
  </section>;
}
