import Link from "next/link";
import Image from "next/image";
import { chapters } from "@/content/chapters";
import { isProse } from "@/lib/reading";
import { ResumeReading } from "@/components/ResumeReading";

export const metadata = { title: "Read the story" };

export default function StoryPage() {
  const prose = chapters.filter((chapter) => chapter.order > 0 && isProse(chapter));
  return <main className="section-shell"><div className="section-inner">
    <p className="book-eyebrow">The Chronicle / Story</p><h1>The story, one chapter at a time.</h1>
    <p className="section-lead">A family in a city of debts. Two brothers who each believe the other left. A gift for healing that will ask more of its owner than he expects.</p>
    <ResumeReading />
    <div className="section-subnav"><Link href="/settings">Reading settings</Link></div>
    <section id="chapters" className="section-block"><h2>Chapters</h2>
      <ol className="story-list">{prose.map((chapter) => <li key={chapter.slug}><Link href={`/chapters/${chapter.slug}`}>
        {chapter.cover && <div className="story-thumbnail"><Image src={chapter.cover} alt="" fill sizes="(max-width: 600px) 90px, 150px" className="object-cover" /></div>}
        <div><span className="book-eyebrow">Chapter {chapter.order}</span><h3>{chapter.title}</h3></div><span aria-hidden="true" className="story-arrow">→</span>
      </Link></li>)}</ol>
    </section>
    <aside className="section-note"><h2>A tale from before</h2><p>Iskandar and Rukhsana’s legend belongs to the world’s remembered past. It is optional reading; you can begin Hanno’s story without it.</p><Link href="/chapters/the-conqueror">The Conqueror — a Bakhtari legend →</Link></aside>
  </div></main>;
}
