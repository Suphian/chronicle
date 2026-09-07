import Link from "next/link";
import { HeroArtwork } from "@/components/HeroArtwork";
import { chapters } from "@/content/chapters";
import { isProse } from "@/lib/reading";
import { ResumeReading } from "@/components/ResumeReading";

const sections = [
  { href: "/story", number: "I", title: "Story", description: "Read the chapters." },
  { href: "/people", number: "II", title: "People", description: "Meet the characters." },
  { href: "/world", number: "III", title: "World", description: "Explore Mizan." },
  { href: "/workshop", number: "IV", title: "Writing room", description: "Outlines, ideas, and drafts." },
];

export default function Home() {
  const first = chapters.find((chapter) => chapter.order > 0 && isProse(chapter));
  return <main className="editorial-home">
    <section className="home-hero" aria-labelledby="home-heading">
      <HeroArtwork />
      <div className="home-title"><h1 id="home-heading"><span>The</span> Chronicle</h1></div>
      <div className="home-footer">
        <div className="home-intro"><p>Of Hanno Averroes, of Dyia, and of a city that remembers what its people try to forget.</p><div className="home-actions"><Link href={first ? `/chapters/${first.slug}` : "/story"} className="btn-primary">Read the opening <span aria-hidden="true">↗</span></Link><Link href="#chapters" className="btn-ghost">Explore ↓</Link></div></div>

      </div>
    </section>
    <section id="chapters" className="home-sections"><ResumeReading /><div className="home-section-grid">{sections.map((section) => <Link href={section.href} key={section.href}><span>{section.number}</span><h2>{section.title}</h2><p>{section.description}</p><strong aria-hidden="true">→</strong></Link>)}</div></section>
  </main>;
}
