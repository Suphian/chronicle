import Link from "next/link";
import Image from "next/image";
import { chapters } from "@/content/chapters";
import { isProse } from "@/lib/reading";
import { ResumeReading } from "@/components/ResumeReading";
import { LivingLandscape } from "@/components/LivingLandscape";

const sections = [
  { href: "/story", number: "I", title: "Story", description: "Read the chapters in sequence. Stay with a scene, a voice, and the choices that change a life.", action: "Begin reading" },
  { href: "/people", number: "II", title: "People", description: "Meet the family, their allies, and their adversaries. Follow their histories, loyalties, and contradictions.", action: "Meet the characters" },
  { href: "/world", number: "III", title: "World", description: "Explore the atlas, contested histories, institutions, and the everyday life beneath the grand architecture.", action: "Explore the world" },
  { href: "/workshop", number: "IV", title: "Writing room", description: "See the larger plan, develop an idea, trace its consequences, and follow the work from outline to prose.", action: "Enter the writing room" },
];

export default function Home() {
  const first = chapters.find((chapter) => chapter.order > 0 && isProse(chapter));
  return <main className="editorial-home">
    <section className="home-hero"><div className="home-art"><Image src="/images/plates/carthara-market-v2.webp" alt="An ink and watercolor view of Carthara: Black families and traders beneath shaded market awnings, planted terraces, and intricate limestone arcades" fill sizes="(max-width: 700px) 100vw, 65vw" preload className="object-contain" /></div>
      <div className="home-title"><p className="book-eyebrow">An illustrated story · A world in the making</p><h1><span>The</span> Chronicle</h1><p>Of Hanno Averroes, of Dyia, and of a city that remembers what its people try to forget.</p><div className="home-actions"><Link href={first ? `/chapters/${first.slug}` : "/story"} className="btn-primary">Read the opening <span aria-hidden="true">↗</span></Link><Link href="#chapters" className="btn-ghost">Explore the Chronicle ↓</Link></div></div>
      <p className="home-folio">Carthara <span>Markets, awnings, and a thousand quiet debts.</span></p>
    </section>
    <div className="home-living"><LivingLandscape /></div>
    <section id="chapters" className="home-sections"><ResumeReading /><p className="book-eyebrow">Four ways into the Chronicle</p><div className="home-section-grid">{sections.map((section) => <Link href={section.href} key={section.href}><span>{section.number}</span><h2>{section.title}</h2><p>{section.description}</p><strong>{section.action} →</strong></Link>)}</div></section>
  </main>;
}
