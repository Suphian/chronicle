import { LivingLandscape } from "@/components/LivingLandscape";
import Link from "next/link";
import { codex } from "@/content/codex";
import { PeopleDirectory } from "@/components/PeopleDirectory";

export const metadata = { title: "People" };
const groups: Record<string, string> = { hanno: "The Averroes family", dyia: "The Averroes family", adil: "The Averroes family", amara: "The Averroes family", alethea: "Family & Lysandria", virello: "Carthara · The apprenticeship", numarius: "Carthara · The Three Seats", corvo: "Carthara · The Three Seats", vael: "Carthara · The Three Seats", phylios: "Lysandria", chuluun: "The Leonin · Tengeri Wastes", iskandar: "The old histories · Bakhtar", rukhsana: "The old histories · Bakhtar" };

export default function PeoplePage() {
  return <main className="section-shell"><div className="section-inner"><h1>People</h1>
    <div className="section-subnav"><Link href="/character">Hanno’s character sheet</Link><Link href="/codex">Codex</Link></div>
    <p className="section-footnote">Profiles contain full-story spoilers.</p>
    <section id="directory"><PeopleDirectory people={codex.filter((entry) => entry.kind === "person").map((entry) => ({ id: entry.id, name: entry.name, group: groups[entry.id] ?? "The Chronicle" }))} /></section>
    <LivingLandscape artwork="clinic-courtyard" />
  </div></main>;
}
