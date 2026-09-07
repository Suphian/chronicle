import type { Metadata } from "next";
import { WorldAtlas } from "@/components/WorldAtlas";
import { ResumeReading } from "@/components/ResumeReading";

export const metadata: Metadata = { title: "World" };

export default async function WorldPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { at } = await searchParams;
  return (
    <main className="world-page">
      <p className="book-eyebrow">The lands of the Chronicle</p>
      <h1>A world worth getting lost in.</h1>
      <p className="world-intro">Mountains that remember empires. Cities built on trade and debt. Follow Hanno’s travels, meet the people who live here, and return to the chapter where each place comes alive.</p>
      <ResumeReading />
      <WorldAtlas key={typeof at === "string" ? at : "default"} initialAt={typeof at === "string" ? at : undefined} />
    </main>
  );
}
