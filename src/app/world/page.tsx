import type { Metadata } from "next";
import { WorldMap } from "@/components/WorldMap";

export const metadata: Metadata = { title: "World" };

export default async function WorldPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { at } = await searchParams;
  return (
    <main className="fixed inset-0 pt-14">
      <WorldMap initialAt={typeof at === "string" ? at : undefined} />
      <p className="font-display pointer-events-none absolute top-16 left-6 text-[10px] tracking-[0.35em] text-parchment/40 uppercase md:left-10">
        Drag to pan · scroll to zoom · tap a pin
      </p>
    </main>
  );
}
