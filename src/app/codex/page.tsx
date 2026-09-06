import type { Metadata } from "next";
import Link from "next/link";
import { codex, codexKinds } from "@/content/codex";
import { chapters } from "@/content/chapters";

export const metadata: Metadata = { title: "Codex" };

export default function CodexPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 pt-28 pb-24">
      <p className="font-display text-xs tracking-[0.5em] text-parchment/50 uppercase">Reference</p>
      <h1 className="font-display mt-2 text-4xl text-parchment md:text-6xl">Codex</h1>
      <p className="font-serif mt-4 max-w-2xl text-lg text-parchment/70">
        The people, powers, and poisons of the chronicle. Short entries; the chapters carry the story.
      </p>

      <nav className="mt-8 flex flex-wrap gap-4">
        {codexKinds.map((k) => (
          <a key={k.kind} href={`#${k.kind}`} className="btn-ghost">
            {k.label}
          </a>
        ))}
      </nav>

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
                    <h3 className="font-display text-xl text-parchment">{e.name}</h3>
                    <p className="font-serif text-parchment/60 italic">{e.role}</p>
                    <p className="font-serif mt-2 leading-relaxed text-parchment/85">{e.body}</p>
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
