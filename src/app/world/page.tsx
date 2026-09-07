import { LivingLandscape } from "@/components/LivingLandscape";
import type { Metadata } from "next";
import { WorldAtlas } from "@/components/WorldAtlas";
import Link from "next/link";
import Image from "next/image";
import { getBibleEntries } from "@/lib/worldbuilding";
import styles from "./WorldStudy.module.css";

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
      <h1>World</h1>
      <nav className="section-subnav" aria-label="World sections"><a href="#atlas">Atlas</a><a href="#history">History</a><a href="#institutions">Institutions & power</a><a href="#everyday">Everyday life</a><Link href="/codex#substance">Beliefs, substances & artifacts</Link></nav>
      <section id="atlas" className="section-block world-atlas-section"><h2 className="sr-only">Atlas</h2>
      <WorldAtlas key={typeof at === "string" ? at : "default"} initialAt={typeof at === "string" ? at : undefined} />
      </section>
      <section className={styles.study} aria-labelledby="carthara-study-title">
        <figure>
          <a className={styles.artwork} href="/images/world/carthara-grand-study-v1.webp" target="_blank" rel="noreferrer" aria-label="Open the Carthara architectural study at full size">
            <Image
              src="/images/world/carthara-grand-study-v1.webp"
              alt="An immense white-stone coastal city rises from busy wooden docks through garden terraces and dense neighborhoods to ribbed domes and a towering aqueduct beneath a brilliant blue sky."
              width={1672}
              height={941}
              sizes="(max-width: 1800px) 96vw, 1720px"
              data-motion-art
            />
            <span className={styles.viewDetail} aria-hidden="true">View artwork ↗</span>
          </a>
          <figcaption className={styles.caption}>
            <div>
              <h2 id="carthara-study-title">Carthara · an architectural study</h2>
            </div>
            <p className={styles.note}>Architectural concept.</p>
          </figcaption>
        </figure>
      </section>
      <LivingLandscape />
      <section id="history" className="section-block"><h2>History & memory</h2><div className="notebook-cards"><Link href="/library/history/current-timeline"><h3>A relative history of the world</h3></Link><Link href="/library/geography-reconciliation"><h3>The wider world recovered</h3></Link></div></section>
      <section id="institutions" className="section-block"><h2>Institutions & power</h2><div className="notebook-cards">{entries.filter((entry) => entry.group === "factions").map((entry) => <Link key={entry.slug} href={`/library/${entry.slug}`}><h3>{entry.title}</h3></Link>)}</div></section>
      <section id="everyday" className="section-block"><h2>Everyday life</h2><div className="notebook-cards"><Link href="/library/cultures/everyday-life"><h3>Life beneath the architecture</h3></Link><Link href="/library/visual-direction"><h3>Architecture & technology</h3></Link></div></section>
    </main>
  );
}
