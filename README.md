# The Chronicle

A growing fantasy novel and world about Hanno, his brother Dyia, and the people whose lives intersect with theirs. Read sustained prose, explore the world, and develop the next draft in a connected Markdown writing room.

The ten current numbered units have a first prose pass. They can expand into many more chapters and viewpoints. Start a writing session with the [collaboration prompt](worldbuilding/PROMPT.md), [overall outline](worldbuilding/story/overall-outline.md), and [writing direction](worldbuilding/story/writing-direction.md).

## Run and check

```bash
npm install
npm run dev
npm run lint
npm run build
```

## Pages

- `/story` — reading order, draft stages, lengths, and saved reading place. Begin with Hanno; the highland legend is optional.
- `/chapters/<slug>` — continuous illustrated book reader with text sizing and previous/next chapters. `?scene=<id>` opens a passage. Cinematic mode and background music have been removed.
- `/people` — searchable character directory linked to individual Markdown dossiers.
- `/world` — atlas, place directory, history, institutions, and everyday life. `?at=<location>` selects a place.
- `/workshop` — overall story outline, architecture, chapter/scene plans, author decisions, continuity reviews, and ideas.
- `/workshop/materials` — original documents, researched influences, visual development, and an optional sound shelf.
- `/library/<entry>` — renders `worldbuilding/` Markdown directly. `/outline` redirects to the overall story outline.
- `/character` and `/codex` — existing reference pages remain available.

Profiles and planning pages contain full-story spoilers. Author decisions, established draft events, recovered sources, and proposed additions are distinguished. The [source register](worldbuilding/sources/README.md) preserves the three early Google Docs.

## Content

The [story bible](worldbuilding/README.md) describes how new ideas become scenes and how continuity is tracked. Chapters are typed data in `src/content/chapters/`; register new files in `index.ts`. Character, place, faction, and editorial profiles are Markdown. Curated illustration placements live in `src/content/illustrations.ts`, with art and generation prompts under `public/images/plates/`.

See [AGENTS.md](AGENTS.md) and [CLAUDE.md](CLAUDE.md) before editing. Keep stable chapter/scene IDs and existing source snapshots. Run lint, build, and relevant browser checks before pushing. Vercel deploys this Next.js project from main.
