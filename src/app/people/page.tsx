import Link from "next/link";
import { people } from "@/content/people";
import { PeopleDirectory } from "@/components/PeopleDirectory";

export const metadata = { title: "People" };

export default function PeoplePage() {
  return <main className="section-shell"><div className="section-inner"><h1>People</h1>
    <div className="section-subnav"><Link href="/character">Hanno’s character sheet</Link><Link href="/codex">Codex</Link></div>
    <p className="section-footnote">Profiles contain full-story spoilers. Major and minor reflect the current story’s focus and can change as it grows. Imported lore and proposals are labeled separately.</p>
    <section id="directory"><PeopleDirectory people={people} /></section>
  </div></main>;
}
