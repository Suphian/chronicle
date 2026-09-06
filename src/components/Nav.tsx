"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { character } from "@/content/character";
import { useAudio } from "@/lib/audio";

const links = [
  { href: "/", label: "Chronicle" },
  { href: "/world", label: "World" },
  { href: "/character", label: character.name.split(" ")[0] },
];

export function Nav() {
  const path = usePathname();
  const audio = useAudio();
  const inReader = path.startsWith("/chapters/");

  return (
    <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-4 md:px-10">
      <Link href="/" className="font-display text-xs tracking-[0.35em] text-parchment/70 uppercase transition hover:text-parchment">
        {inReader ? "← Chronicle" : "The Chronicle"}
      </Link>
      <nav className="flex items-center gap-5">
        {!inReader &&
          links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`font-display hidden text-xs tracking-[0.3em] uppercase transition sm:inline ${
                path === l.href ? "text-parchment" : "text-parchment/50 hover:text-parchment"
              }`}
            >
              {l.label}
            </Link>
          ))}
        <button
          onClick={audio.toggleMute}
          aria-label={audio.muted ? "Unmute" : "Mute"}
          title={audio.muted ? "Unmute" : "Mute"}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-parchment/30 text-parchment/70 transition hover:border-parchment hover:text-parchment"
        >
          {audio.muted ? <MutedIcon /> : <SoundIcon />}
        </button>
      </nav>
    </header>
  );
}

function SoundIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M11 5 6 9H2v6h4l5 4V5z" />
      <path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a9 9 0 0 1 0 14" />
    </svg>
  );
}
function MutedIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M11 5 6 9H2v6h4l5 4V5z" />
      <path d="m23 9-6 6M17 9l6 6" />
    </svg>
  );
}
