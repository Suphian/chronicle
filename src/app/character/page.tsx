import type { Metadata } from "next";
import Link from "next/link";
import { character } from "@/content/character";
import { chapters } from "@/content/chapters";

export const metadata: Metadata = { title: "Character" };

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="font-display text-xs tracking-[0.4em] text-parchment/50 uppercase">{title}</p>
      <ul className="mt-3 space-y-2">
        {items.map((s, i) => (
          <li key={i} className="font-serif leading-relaxed text-parchment/85">
            {s}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function CharacterPage() {
  const c = character;
  return (
    <main className="mx-auto max-w-5xl px-6 pt-28 pb-24">
      <div className="grid gap-12 md:grid-cols-[260px_1fr]">
        <div>
          <div className="aspect-[3/4] w-full overflow-hidden rounded-xl border border-parchment/10 bg-gradient-to-b from-[#2a1f14] to-[#0b0a0f]">
            {c.portrait ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={c.portrait} alt={c.name} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center">
                <span className="font-display text-6xl text-parchment/20">{c.name[0]}</span>
              </div>
            )}
          </div>
          <dl className="mt-6 space-y-2 text-sm">
            {[
              ["Race", c.race],
              ["Class", c.class],
              ["Level", c.level ? String(c.level) : undefined],
              ["Alignment", c.alignment],
              ...c.traits.map((t) => [t.label, t.value] as const),
            ]
              .filter(([, v]) => v)
              .map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 border-b border-parchment/10 pb-2">
                  <dt className="font-display text-[10px] tracking-[0.3em] text-parchment/50 uppercase">{k}</dt>
                  <dd className="font-serif text-right text-parchment/85">{v}</dd>
                </div>
              ))}
          </dl>
        </div>

        <div>
          <p className="font-display text-xs tracking-[0.5em] text-parchment/50 uppercase">The character</p>
          <h1 className="font-display mt-2 text-4xl text-parchment md:text-6xl">{c.name}</h1>
          {c.epithet && <p className="font-display mt-2 text-sm tracking-[0.4em] text-gold uppercase">{c.epithet}</p>}
          <div className="mt-8 space-y-4">
            {c.bio.map((p, i) => (
              <p key={i} className="font-serif text-lg leading-relaxed text-parchment/85 md:text-xl">
                {p}
              </p>
            ))}
          </div>

          <div className="mt-12 grid gap-10 sm:grid-cols-3">
            <List title="Bonds" items={c.bonds} />
            <List title="Ideals" items={c.ideals} />
            <List title="Flaws" items={c.flaws} />
          </div>
          {c.lies?.length ? (
            <div className="mt-12">
              <List title="Lies he believes" items={c.lies} />
            </div>
          ) : null}

          <div className="mt-14">
            <p className="font-display text-xs tracking-[0.4em] text-parchment/50 uppercase">Timeline</p>
            <ol className="mt-4 border-l border-parchment/15 pl-6">
              {c.timeline.map((t, i) => {
                const ch = t.chapter ? chapters.find((x) => x.slug === t.chapter) : undefined;
                return (
                  <li key={i} className="relative pb-6">
                    <span className="absolute top-2 -left-[27px] h-2 w-2 rounded-full bg-gold" />
                    <p className="font-display text-[10px] tracking-[0.3em] text-parchment/50 uppercase">{t.when}</p>
                    <p className="font-serif mt-1 text-parchment/85">
                      {t.what}
                      {ch && (
                        <>
                          {" "}
                          <Link href={`/chapters/${ch.slug}`} className="text-gold underline-offset-4 hover:underline">
                            Read: {ch.title} →
                          </Link>
                        </>
                      )}
                    </p>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </main>
  );
}
