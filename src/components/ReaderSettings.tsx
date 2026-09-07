"use client";

import { useState } from "react";
import { playbackSpeeds, saveReaderPreferences, useReaderPreferences, type ReaderPreferences } from "@/lib/reader-preferences";

export function ReaderSettings() {
  const preferences = useReaderPreferences();
  const [message, setMessage] = useState("");
  function update(change: Partial<ReaderPreferences>) {
    setMessage(saveReaderPreferences({ ...preferences, ...change }) ? "Saved on this device." : "Your browser could not save this preference. Allow local storage and try again.");
  }
  return <div className="reader-settings">
    <label htmlFor="narration-source">Narration</label>
    <select id="narration-source" value={preferences.narration} onChange={(event) => update({ narration: event.target.value === "device" ? "device" : "ondemand" })} aria-describedby="narration-help">
      <option value="ondemand">ElevenLabs voices</option><option value="device">Device voices</option>
    </select>
    <p id="narration-help">{preferences.narration === "ondemand" ? "Uses the connected ElevenLabs allowance. New passages may take a moment to prepare." : "Uses your device’s voices without ElevenLabs usage."}</p>
    <label htmlFor="playback-speed">Playback speed</label>
    <select id="playback-speed" value={preferences.rate} onChange={(event) => update({ rate: Number(event.target.value) })}>{playbackSpeeds.map((speed) => <option key={speed} value={speed}>{speed}×{speed === 1 ? " · Normal" : ""}</option>)}</select>
    <label htmlFor="reader-text-size">Text size</label>
    <select id="reader-text-size" value={preferences.largeText ? "large" : "standard"} onChange={(event) => update({ largeText: event.target.value === "large" })}><option value="standard">Standard</option><option value="large">Larger</option></select>
    <p className="reader-settings-status" role="status">{message || "Saved for all chapters on this device."}</p>
  </div>;
}
