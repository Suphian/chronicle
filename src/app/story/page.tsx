import Link from "next/link";
import Image from "next/image";
import { chapters } from "@/content/chapters";
import { chapterWords, chapterStage, isProse } from "@/lib/reading";
import { ResumeReading } from "@/components/ResumeReading";

export const metadata = { title: "Read the story" };

export default function StoryPage() {
  const prose = chapters.filter((chapter) => chapter.order > 0 && isProse(chapter));
  const sketches = chapters.filter((chapter) => !isProse(chapter));
  return <main className="section-shell"><div className="section-inner">
    <p className="book-eyebrow">The Chronicle / Story</p><h1>The story, one chapter at a time.</h1>
    <p className="section-lead">A family in a city of debts. Two brothers who each believe the other left. A gift for healing that will ask more of its owner than he expects.</p>
    <ResumeReading />
    <div className="section-subnav"><a href="#chapters">Read in order</a><Link href="/library/story/overall-outline">Overall story outline · spoilers</Link><Link href="/workshop#chapter-plan">Chapter plans</Link><Link href="/people">Meet the people</Link></div>
    <section id="chapters" className="section-block"><p className="book-eyebrow">First prose pass · Open for editing</p><h2>Chapters to read</h2>
      <p>{prose.length} prose {prose.length === 1 ? "draft" : "drafts"} · {prose.reduce((total, chapter) => total + chapterWords(chapter), 0).toLocaleString()} words. Start with Hanno’s family; discover the world through their lives.</p>
      <ol className="story-list">{prose.map((chapter) => <li key={chapter.slug}><Link href={`/chapters/${chapter.slug}`}>
        {chapter.cover && <div className="story-thumbnail"><Image src={chapter.cover} alt="" fill sizes="(max-width: 600px) 90px, 150px" className="object-cover" /></div>}
        <div><span className="book-eyebrow">{chapter.order === 0 ? "Prologue" : `Chapter ${chapter.order}`} · {chapterStage(chapter)}</span><h3>{chapter.title}</h3><p>{chapter.when}</p><span className="story-length">{Math.ceil(chapterWords(chapter) / 200)} min read · {chapterWords(chapter).toLocaleString()} words</span></div><span aria-hidden="true" className="story-arrow">→</span>
      </Link></li>)}</ol>
    </section>
    <aside className="section-note"><h2>A tale from before</h2><p>Iskandar and Rukhsana’s legend belongs to the world’s remembered past. It is optional reading; you can begin Hanno’s story without it.</p><Link href="/chapters/the-conqueror">The Conqueror — a Bakhtari legend →</Link></aside>
    {sketches.length > 0 && <aside className="section-note"><h2>Still being developed</h2><p>{sketches.length} existing sketches preserve future events and ideas. They are available in the writing room with their scene plans, rather than presented as finished narrative.</p><Link href="/workshop#chapter-plan">Browse the story sketches →</Link></aside>}
    <p className="section-footnote">Character profiles, world histories, and the writing room discuss later events. The chapter list above keeps plot summaries out of your way.</p>
  </div></main>;
}
