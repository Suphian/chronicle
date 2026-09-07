import Link from "next/link";
import Image from "next/image";
import { chapters } from "@/content/chapters";
import { getBibleEntries } from "@/lib/worldbuilding";

export const metadata = { title: "Story outline & notebook" };

export default function OutlinePage() {
  const entries = getBibleEntries();
  const groups = [{ id: "characters", name: "Character dossiers", description: "History, motives, relationships, contradictions, and the choices that could change each person." }, { id: "places", name: "Places", description: "The people, resources, and institutions behind the map." }, { id: "factions", name: "Institutions & power", description: "Who has power, what sustains it, and where interests collide." }, { id: "ideas", name: "Ideas in development", description: "New pitches with possible placements. These are proposals, not events already written." }, { id: "workshop", name: "The writing room", description: "Story options, continuity questions, visual direction, sounds, and the collaboration prompt." }];
  return <main className="outline-shell">
    <header className="outline-hero"><Image src="/images/chronicle/house-of-measures.webp" alt="A sunlit fantasy courtyard with intricate stone arcades, brass instruments, and a garden overlooking a lake" fill sizes="100vw" className="object-cover" /><div />
      <section><p className="book-eyebrow">The author’s notebook</p><h1>A story. A world.<br />Room to discover both.</h1><p>Follow what is written, explore the people behind it, and find a home for the next idea.</p></section>
    </header>
    <div className="outline-body">
      <nav className="outline-jumps" aria-label="Notebook sections"><a href="#story">Story outline</a>{groups.map((group) => <a key={group.id} href={`#${group.id}`}>{group.name}</a>)}</nav>
      <section className="outline-intro"><p className="book-eyebrow">Where we stand</p><h2>The main story is still taking shape.</h2><p>The existing chapters tell Hanno’s rise, vengeance, and family tragedy. They are a working draft, with the choice at Dyia’s final knock still open. Each compressed chapter can grow into several chapters and viewpoints; there is no fixed chapter limit. The notebook keeps established draft events, interpretations, and proposed changes visibly separate.</p><Link className="book-location" href="/library/story-options">Explore three possible story directions →</Link></section>
      <section id="story" className="outline-section"><p className="book-eyebrow">Existing draft · Full-story spoilers</p><h2>The story so far</h2><p>Open a chapter to see its passages, or read it from the beginning.</p>
        {chapters.map((chapter) => <details className="outline-chapter" key={chapter.slug}><summary><span>{chapter.order === 0 ? "Prologue" : `Chapter ${chapter.order}`}</span>{chapter.title}<small>{chapter.status ?? "draft"}</small></summary><div><p>{chapter.summary}</p><Link className="book-location" href={`/chapters/${chapter.slug}`}>Read this chapter →</Link><ol>{chapter.scenes.filter((scene) => scene.kind !== "title").map((scene) => <li key={scene.id}><Link href={`/chapters/${chapter.slug}?scene=${scene.id}`}>{scene.heading ?? scene.id}</Link></li>)}</ol></div></details>)}
      </section>
      {groups.map((group) => <section className="outline-section" id={group.id} key={group.id}><h2>{group.name}</h2><p>{group.description}</p><div className="notebook-cards">{entries.filter((entry) => entry.group === group.id).map((entry) => <Link key={entry.slug} href={`/library/${entry.slug}`}><span>{group.id === "ideas" ? "Proposal" : "Notebook"}</span><h3>{entry.title}</h3><p>Open entry →</p></Link>)}</div></section>)}
    </div>
  </main>;
}
