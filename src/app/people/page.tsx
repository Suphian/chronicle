import { LivingLandscape } from "@/components/LivingLandscape";
import Link from "next/link";
import { codex } from "@/content/codex";
import { PeopleDirectory } from "@/components/PeopleDirectory";
import { ResumeReading } from "@/components/ResumeReading";

export const metadata = { title: "People" };
const groups: Record<string, string> = { hanno: "The Averroes family", dyia: "The Averroes family", adil: "The Averroes family", amara: "The Averroes family", alethea: "Family & Lysandria", virello: "Carthara · The apprenticeship", numarius: "Carthara · The Three Seats", corvo: "Carthara · The Three Seats", vael: "Carthara · The Three Seats", phylios: "Lysandria", chuluun: "The Leonin · Tengeri Wastes", iskandar: "The old histories · Bakhtar", rukhsana: "The old histories · Bakhtar" };

export default function PeoplePage() {
  return <main className="section-shell"><div className="section-inner"><p className="book-eyebrow">The Chronicle / People</p><h1>Everyone has a life beyond this story.</h1><p className="section-lead">Their work, their loyalties, their private justifications. Each dossier follows a person through the existing draft and separates what is written from what we might develop next.</p><ResumeReading />
    <div className="section-subnav"><a href="#directory">Character dossiers</a><Link href="/character">Hanno’s character sheet</Link><Link href="/codex">Quick reference & lore</Link></div>
    <p className="section-footnote">Dossiers contain full-story spoilers, including secrets and later events. Names in this directory do not reveal their outcomes.</p>
    <section id="directory"><PeopleDirectory people={codex.filter((entry) => entry.kind === "person").map((entry) => ({ id: entry.id, name: entry.name, group: groups[entry.id] ?? "The Chronicle" }))} /></section>
    <LivingLandscape artwork="clinic-courtyard" />
  </div></main>;
}
