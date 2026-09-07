import { unstable_cache } from "next/cache";
import { getChapter } from "@/content/chapters";
import { createNarrationHandler } from "@/lib/narration-service";

export const runtime = "nodejs";
export const maxDuration = 120;

export const POST = createNarrationHandler({
  chapter: getChapter,
  apiKey: () => process.env.ELEVENLABS_API_KEY,
  cache: (key, generate) => unstable_cache(generate, ["chronicle-narration-v1", key], {
    revalidate: false, tags: ["chronicle-narration"],
  })(),
});
