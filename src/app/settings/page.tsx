import Link from "next/link";
import { ReaderSettings } from "@/components/ReaderSettings";
import { ResumeReading } from "@/components/ResumeReading";

export const metadata = { title: "Reading settings" };

export default function SettingsPage() {
  return <main className="section-shell"><div className="section-inner reading-settings-page">
    <Link className="book-eyebrow" href="/story">← Back to the story</Link>
    <h1>Reading settings</h1>
    <p className="section-lead">Make yourself comfortable.</p>
    <ReaderSettings />
    <ResumeReading />
  </div></main>;
}
