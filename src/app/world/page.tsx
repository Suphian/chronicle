import type { Metadata } from "next";
import { WorldAtlas } from "@/components/WorldAtlas";
import { ResumeReading } from "@/components/ResumeReading";
import Link from "next/link";
import { getBibleEntries } from "@/lib/worldbuilding";

export const metadata: Metadata = { title: "World" };

export default async function WorldPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { at } = await searchParams;
  const entries = getBibleEntries();
  return (
    <main className="world-page">
      <p className="book-eyebrow">The lands of the Chronicle</p>
      <h1>A world worth getting lost in.</h1>
      <p className="world-intro">Mountains that remember empires. Cities built on trade and debt. Follow Hanno’s travels, meet the people who live here, and return to the chapter where each place comes alive.</p>
      <ResumeReading />
      <nav className="section-subnav" aria-label="World sections"><a href="#atlas">Atlas</a><a href="#history">History</a><a href="#institutions">Institutions & power</a><a href="#everyday">Everyday life</a><Link href="/codex#substance">Beliefs, substances & artifacts</Link></nav>
      <section id="atlas" className="section-block world-atlas-section"><h2>The atlas</h2>
      <WorldAtlas key={typeof at === "string" ? at : "default"} initialAt={typeof at === "string" ? at : undefined} />
      </section>
      <section id="history" className="section-block"><h2>History & memory</h2><p>What the chapters establish, what the old songs dispute, and what survives in the early world notes.</p><div className="notebook-cards"><Link href="/library/history/current-timeline"><h3>A relative history of the world</h3><p>Events, legendary accounts, and gaps in the chronology →</p></Link><Link href="/library/geography-reconciliation"><h3>The wider world recovered</h3><p>Ruhania, the seven lakes, and the fragmented Khanate →</p></Link></div></section>
      <section id="institutions" className="section-block"><h2>Institutions & power</h2><p>Who commands, who pays, who can refuse, and what happens when interests collide.</p><div className="notebook-cards">{entries.filter((entry) => entry.group === "factions").map((entry) => <Link key={entry.slug} href={`/library/${entry.slug}`}><h3>{entry.title}</h3><p>History, interests & constraints →</p></Link>)}</div></section>
      <section id="everyday" className="section-block"><h2>Everyday life</h2><p>A city needs food, water, work, care, and ways for news to travel. These details give its conflicts consequences.</p><div className="notebook-cards"><Link href="/library/cultures/everyday-life"><h3>Life beneath the architecture</h3><p>Seven material domains, with evidence and open questions →</p></Link><Link href="/library/visual-direction"><h3>Architecture & technology</h3><p>The aesthetic, its practical uses, and its limits →</p></Link></div></section>
    </main>
  );
}
