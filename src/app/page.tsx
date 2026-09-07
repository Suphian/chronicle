import Link from "next/link";
import Image from "next/image";
import { chapters } from "@/content/chapters";
import { isProse } from "@/lib/reading";
import { ResumeReading } from "@/components/ResumeReading";

const sections = [
  { href: "/story", number: "I", title: "Story", description: "Read the chapters in sequence. Stay with a scene, a voice, and the choices that change a life.", action: "Begin reading" },
  { href: "/people", number: "II", title: "People", description: "Meet the family, their allies, and their adversaries. Follow their histories, loyalties, and contradictions.", action: "Meet the characters" },
  { href: "/world", number: "III", title: "World", description: "Explore the atlas, contested histories, institutions, and the everyday life beneath the grand architecture.", action: "Explore the world" },
  { href: "/workshop", number: "IV", title: "Writing room", description: "See the larger plan, develop an idea, trace its consequences, and follow the work from outline to prose.", action: "Enter the writing room" },
];

export default function Home() {
  const first = chapters.find((chapter) => chapter.order > 0 && isProse(chapter));
  return <main>
    <section className="home-hero"><Image src="/images/chronicle/house-of-measures.webp" alt="A monumental courtyard of pale stone, planted terraces and brass instruments beside a sunlit lake" fill sizes="100vw" preload className="object-cover" /><div className="home-shade" />
      <div className="home-title"><p className="book-eyebrow">A world in the making</p><h1>The Chronicle</h1><p>Of Hanno Averroes, of Dyia, and of a city that remembers what its people try to forget.</p><div className="home-actions"><Link href={first ? `/chapters/${first.slug}` : "/story"} className="btn-primary">Read the opening</Link><Link href="/workshop" className="btn-ghost">See the story plan →</Link></div></div>
    </section>
    <section id="chapters" className="home-sections"><ResumeReading /><p className="book-eyebrow">Four ways into the Chronicle</p><div className="home-section-grid">{sections.map((section) => <Link href={section.href} key={section.href}><span>{section.number}</span><h2>{section.title}</h2><p>{section.description}</p><strong>{section.action} →</strong></Link>)}</div></section>
  </main>;
}
