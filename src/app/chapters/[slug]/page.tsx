import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { chapters, getAdjacent, getChapter } from "@/content/chapters";
import { SceneReader } from "@/components/SceneReader";
import { BookReader } from "@/components/BookReader";

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export function generateStaticParams() {
  return chapters.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const chapter = getChapter(slug);
  return chapter ? { title: chapter.title, description: chapter.summary } : {};
}

export default async function ChapterPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { scene, mode } = await searchParams;
  const chapter = getChapter(slug);
  if (!chapter) notFound();
  const { prev, next } = getAdjacent(slug);
  if (mode !== "cinematic") {
    return <BookReader key={slug} chapter={chapter} prev={prev} next={next} initialSceneId={typeof scene === "string" ? scene : undefined} />;
  }
  return (
    <SceneReader
      chapter={chapter}
      next={next}
      initialSceneId={typeof scene === "string" ? scene : undefined}
    />
  );
}
