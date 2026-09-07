import { LivingLandscape } from "@/components/LivingLandscape";
import Link from "next/link";
import Image from "next/image";
import { chapters } from "@/content/chapters";
import { isProse } from "@/lib/reading";
import { ResumeReading } from "@/components/ResumeReading";

export const metadata = { title: "Read the story" };

export default function StoryPage() {
  const prose = chapters.filter((chapter) => chapter.order > 0 && isProse(chapter));
  return <main className="section-shell"><div className="section-inner">
    <h1>Story</h1>
    <p className="section-lead">A family in a city of debts. Two brothers who each believe the other left.</p>
    <ResumeReading />
    <div className="section-subnav"><Link href="/settings">Reading settings</Link></div>
    <LivingLandscape artwork="pottery-room" />
    <section id="chapters" className="section-block"><h2>Chapters</h2>
      <ol className="story-list">{prose.map((chapter) => <li key={chapter.slug}><Link href={`/chapters/${chapter.slug}`}>
        {chapter.cover && <div className="story-thumbnail"><Image src={chapter.cover} alt="" fill sizes="(max-width: 600px) 90px, 150px" className="object-cover" /></div>}
        <div><span className="book-eyebrow">Chapter {chapter.order}</span><h3>{chapter.title}</h3></div><span aria-hidden="true" className="story-arrow">→</span>
      </Link></li>)}</ol>
    </section>
    <aside className="section-note"><h2>A tale from before</h2><Link href="/chapters/the-conqueror">The Conqueror — a Bakhtari legend →</Link></aside>
  </div></main>;
}
