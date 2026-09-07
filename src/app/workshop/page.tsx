import Link from "next/link";
import { chapters } from "@/content/chapters";
import { getBibleEntries } from "@/lib/worldbuilding";
import { chapterStage, chapterWords } from "@/lib/reading";

export const metadata = { title: "Writing room" };

const desks = [
  { href: "/library/story/overall-outline", title: "Overall story outline", detail: "The whole story on one page, from the fruit stall to the final door. Full-story spoilers." },
  { href: "/library/story/writing-direction", title: "Writing direction", detail: "Patient storytelling, consequential conversations, revenge, and the illustrated edition." },
  { href: "/library/story/architecture", title: "Story architecture", detail: "The central question, viewpoints, major arcs, and the choices we have not made yet." },
  { href: "/library/story/opening-arc", title: "Opening arc", detail: "The family and the city: how each conflict changes what becomes possible next." },
  { href: "/library/story/scene-plans", title: "Scene plans", detail: "Point of view, desire, resistance, turning point, and consequence." },
  { href: "/library/continuity", title: "Continuity ledger", detail: "Ages, chronology, geography, evidence, and contradictions to resolve." },
  { href: "/library/decisions", title: "Author decisions", detail: "The choices that guide the next draft, including names and what remains open." },
  { href: "/workshop/materials", title: "Research & media", detail: "Original documents, historical sources, image direction, and sound cues." },
];

export default function WorkshopPage() {
  const entries = getBibleEntries();
  return <main className="section-shell"><div className="section-inner"><p className="book-eyebrow">The Chronicle / Writing room</p><h1>Where an idea becomes a story.</h1><p className="section-lead">Work from a possibility to a plan, from a plan to a scene, and from a scene to a chapter worth reading. The larger epic remains open to discovery.</p>
    <div className="section-subnav"><Link href="/library/story/overall-outline">Overall story outline</Link><a href="#chapter-plan">Chapter outline</a><a href="#ideas">Ideas</a><a href="#reviews">Draft reviews</a><Link href="/library/PROMPT">Collaboration prompt</Link></div>
    <section className="section-block" id="desks"><h2>The writing desk</h2><div className="notebook-cards">{desks.map((desk) => <Link href={desk.href} key={desk.href}><h3>{desk.title}</h3><p>{desk.detail}</p></Link>)}</div></section>
    <section className="section-block"><p className="book-eyebrow">How we work</p><ol className="pitch-stages">{["Pitch an idea", "Find its connections", "Plan the scenes", "Write the chapter", "Check continuity", "Revise together"].map((stage, i) => <li key={stage}><span>{i + 1}</span>{stage}</li>)}</ol><p className="section-footnote">Pitch ideas in our conversation. Each gets a note with possible homes, affected people, and consequences. Proposals stay distinguishable from events already written.</p></section>
    <section className="section-block" id="chapter-plan"><p className="book-eyebrow">Current sequence · Full-story spoilers</p><h2>Chapter outline</h2><p>This is the current draft sequence, not a limit on the epic. Any of these units can later split into several chapters. Open one to see its scenes.</p>
      <div className="stage-legend"><span>Idea — a possibility</span><span>Story sketch — planned beats</span><span>Prose draft — narrative to edit</span><span>Revised chapter — reviewed prose</span></div>
      {chapters.map((chapter) => <details className="outline-chapter" key={chapter.slug} id={chapter.slug}><summary><span>{chapter.order === 0 ? "Prologue" : `Chapter ${chapter.order}`}</span>{chapter.title}<small>{chapterStage(chapter)}</small></summary><div><p>{chapter.summary}</p><p className="book-eyebrow">{chapterWords(chapter).toLocaleString()} words · {chapterStage(chapter)}</p><Link className="book-location" href={`/chapters/${chapter.slug}`}>{chapter.status === "outline" ? "View story sketch" : "Read prose draft"} →</Link><ol>{chapter.scenes.filter((scene) => scene.kind !== "title").map((scene) => <li key={scene.id}><Link href={`/chapters/${chapter.slug}?scene=${scene.id}`}>{scene.heading ?? scene.id}</Link>{scene.pov && <small> · {scene.pov}</small>}</li>)}</ol></div></details>)}
    </section>
    <section className="section-block" id="ideas"><h2>Ideas in development</h2><p>Research and possibilities awaiting a place in the story.</p><div className="notebook-cards">{entries.filter((entry) => entry.group === "ideas").map((entry) => <Link key={entry.slug} href={`/library/${entry.slug}`}><span>Proposed</span><h3>{entry.title}</h3><p>Explore connections →</p></Link>)}</div></section>
    <section className="section-block" id="reviews"><h2>Draft reviews</h2><p>What a prose pass introduced, what it repaired, and what needs the next edit.</p><div className="notebook-cards">{entries.filter((entry) => entry.group === "reviews").map((entry) => <Link key={entry.slug} href={`/library/${entry.slug}`}><span>Editorial notes</span><h3>{entry.title}</h3><p>Read the notes →</p></Link>)}</div></section>
    <section className="section-note"><h2>Keep the wider world connected</h2><p>The <Link href="/people">character dossiers</Link>, <Link href="/world">world histories</Link>, and <Link href="/library/story-options">possible story directions</Link> support the chapter work. None of the possible endings has been selected simply by filling out a profile.</p></section>
  </div></main>;
}
