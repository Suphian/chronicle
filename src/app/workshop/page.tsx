import { LivingLandscape } from "@/components/LivingLandscape";
import Link from "next/link";
import { chapters } from "@/content/chapters";
import { getBibleEntries } from "@/lib/worldbuilding";
import { chapterStage } from "@/lib/reading";

export const metadata = { title: "Writing room" };

const desks = [
  { href: "/library/story/overall-outline", title: "Overall story outline" },
  { href: "/library/story/writing-direction", title: "Writing direction" },
  { href: "/library/story/architecture", title: "Story architecture" },
  { href: "/library/story/opening-arc", title: "Opening arc" },
  { href: "/library/story/scene-plans", title: "Scene plans" },
  { href: "/library/continuity", title: "Continuity ledger" },
  { href: "/library/decisions", title: "Author decisions" },
  { href: "/workshop/materials", title: "Research & media" },
];

export default function WorkshopPage() {
  const entries = getBibleEntries();
  return <main className="section-shell"><div className="section-inner"><h1>Writing room</h1><p className="section-footnote">Drafts and proposals · Full-story spoilers</p>
    <div className="section-subnav"><a href="#chapter-plan">Chapter outline</a><a href="#ideas">Ideas</a><a href="#reviews">Draft reviews</a><Link href="/library/PROMPT">Collaboration prompt</Link></div>
    <section className="section-block" id="desks"><h2 className="sr-only">Writing desk</h2><div className="notebook-cards">{desks.map((desk) => <Link href={desk.href} key={desk.href}><h3>{desk.title}</h3></Link>)}</div></section>
    <LivingLandscape artwork="travel-letters" />
    <section className="section-block" id="chapter-plan"><h2>Chapter outline</h2><p>The current sequence can grow into more chapters.</p>
      {chapters.map((chapter) => <details className="outline-chapter" key={chapter.slug} id={chapter.slug}><summary><span>{chapter.order === 0 ? "Prologue" : `Chapter ${chapter.order}`}</span>{chapter.title}<small>{chapterStage(chapter)}</small></summary><div><p>{chapter.summary}</p><Link className="book-location" href={`/chapters/${chapter.slug}`}>{chapter.status === "outline" ? "View story sketch" : "Read prose draft"} →</Link><ol>{chapter.scenes.filter((scene) => scene.kind !== "title").map((scene) => <li key={scene.id}><Link href={`/chapters/${chapter.slug}?scene=${scene.id}`}>{scene.heading ?? scene.id}</Link>{scene.pov && <small> · {scene.pov}</small>}</li>)}</ol></div></details>)}
    </section>
    <section className="section-block" id="ideas"><h2>Ideas in development</h2><p>Proposals, not established events.</p><div className="notebook-cards">{entries.filter((entry) => entry.group === "ideas").map((entry) => <Link key={entry.slug} href={`/library/${entry.slug}`}><h3>{entry.title}</h3></Link>)}</div></section>
    <section className="section-block" id="reviews"><h2>Draft reviews</h2><div className="notebook-cards">{entries.filter((entry) => entry.group === "reviews").map((entry) => <Link key={entry.slug} href={`/library/${entry.slug}`}><h3>{entry.title}</h3></Link>)}</div></section>
    <div className="section-subnav"><Link href="/library/story-options">Possible story directions →</Link></div>
  </div></main>;
}
