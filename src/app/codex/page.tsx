import type { Metadata } from "next";
import Link from "next/link";
import { codex, codexKinds } from "@/content/codex";
import { chapters } from "@/content/chapters";
import { getBibleEntries } from "@/lib/worldbuilding";
import { ResumeReading } from "@/components/ResumeReading";

export const metadata: Metadata = { title: "Codex" };

export default function CodexPage() {
  const dossiers = getBibleEntries().filter((entry) => entry.group === "characters");
  return (
    <main className="mx-auto max-w-5xl px-6 pt-28 pb-24">
      <p className="font-display text-xs tracking-[0.5em] text-parchment/50 uppercase">Reference</p>
      <h1 className="font-display mt-2 text-4xl text-parchment md:text-6xl">People & lore</h1>
      <p className="font-serif mt-4 max-w-2xl text-lg text-parchment/70">
        Your companion to the chronicle: who people are, how they are connected, and the places and powers that shape their lives. Entries cover the full story and may reveal later events.
      </p>

      <nav className="mt-8 flex flex-wrap gap-4">
        {codexKinds.map((k) => (
          <a key={k.kind} href={`#${k.kind}`} className="btn-ghost">
            {k.label}
          </a>
        ))}
      </nav>
      <ResumeReading />

      {codexKinds.map((k) => {
        const entries = codex.filter((e) => e.kind === k.kind);
        if (!entries.length) return null;
        return (
          <section key={k.kind} id={k.kind} className="mt-16 scroll-mt-24">
            <h2 className="font-display border-b border-parchment/15 pb-3 text-xs tracking-[0.4em] text-parchment/50 uppercase">
              {k.label}
            </h2>
            <div className="mt-6 grid gap-x-10 gap-y-8 md:grid-cols-2">
              {entries.map((e) => {
                const ch = e.chapter ? chapters.find((c) => c.slug === e.chapter) : undefined;
                return (
                  <article key={e.id} id={e.id} className="scroll-mt-24">
                    {e.id === "dyia" && <span id="adris" className="scroll-mt-24" aria-hidden="true" />}
                    <h3 className="font-display text-xl text-parchment">{e.name}</h3>
                    <p className="font-serif text-parchment/60 italic">{e.role}</p>
                    <p className="font-serif mt-2 text-xl leading-relaxed text-parchment/90">{e.body}</p>
                    {dossiers.find((entry) => entry.slug === `characters/${e.id}`) && <Link className="mt-3 inline-block text-base text-gold underline underline-offset-4" href={`/library/characters/${e.id}`}>History, motivations & relationships →</Link>}
                    <p className="font-display mt-3 flex flex-wrap gap-4 text-[10px] tracking-[0.3em] uppercase">
                      {e.location && (
                        <Link href={`/world?at=${e.location}`} className="text-parchment/50 hover:text-parchment">
                          ◆ On the map
                        </Link>
                      )}
                      {ch && (
                        <Link href={`/chapters/${ch.slug}`} className="text-gold/80 hover:text-gold">
                          Read: {ch.title} →
                        </Link>
                      )}
                    </p>
                  </article>
                );
              })}
            </div>
          </section>
        );
      })}
    </main>
  );
}
