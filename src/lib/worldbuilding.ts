import fs from "node:fs";
import path from "node:path";

export interface BibleEntry { slug: string; title: string; group: string; content: string }

/** Published notebook pages are an explicit inventory; sources and templates stay in the repo. */
export function getBibleEntries(): BibleEntry[] {
  const root = path.join(process.cwd(), "worldbuilding");
  if (!fs.existsSync(root)) return [];
  const entries: BibleEntry[] = [];
  for (const group of ["characters", "places", "factions", "ideas"]) {
    const folder = path.join(root, group);
    if (!fs.existsSync(folder)) continue;
    for (const name of fs.readdirSync(folder).filter((name) => name.endsWith(".md")).sort()) {
      const content = fs.readFileSync(path.join(folder, name), "utf8");
      entries.push({ slug: `${group}/${name.slice(0, -3)}`, title: content.match(/^#\s+(.+)$/m)?.[1] ?? name.slice(0, -3), group, content });
    }
  }
  for (const name of ["README", "PROMPT", "decisions", "continuity", "story-options", "geography-reconciliation", "visual-direction", "sound-cues"]) {
    const file = path.join(root, `${name}.md`);
    if (!fs.existsSync(file)) continue;
    const content = fs.readFileSync(file, "utf8");
    entries.push({ slug: name, title: content.match(/^#\s+(.+)$/m)?.[1] ?? name, group: "workshop", content });
  }
  return entries;
}

export function notebookHref(href: string, currentSlug: string): string {
  if (/^(https?:|mailto:|#|\/)/.test(href)) return href;
  const [file, anchor] = href.split("#");
  if (!file.endsWith(".md")) return href;
  const relative = path.posix.normalize(path.posix.join(path.posix.dirname(currentSlug), file));
  const suffix = anchor ? `#${anchor}` : "";
  if (getBibleEntries().some((entry) => entry.slug === relative.slice(0, -3))) return `/library/${relative.slice(0, -3)}${suffix}`;
  const repoPath = path.posix.normalize(`worldbuilding/${relative}`);
  return `https://github.com/Suphian/chronicle/blob/main/${repoPath}${suffix}`;
}
