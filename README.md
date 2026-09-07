# The Chronicle

A growing fantasy story and world about Hanno Averroes, his brother Dyia, and the people whose lives intersect with theirs. Read continuous chapters, explore a painted atlas, or use the author’s notebook to develop characters, institutions, and future arcs. Cinematic scenes and audio are optional.

The existing prologue and ten chapters are draft material, not a chapter limit. The epic can expand into many chapters and viewpoints. Start a writing session with [the collaboration prompt](worldbuilding/PROMPT.md) and [the story bible](worldbuilding/README.md).

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run lint
npm run build    # production build (also typechecks)
```

## Pages

- `/` — hero, chapter list, links to the character and world.
- `/chapters/<slug>` — continuous book reader with text sizing, contents, previous/next chapters, and a saved reading place. `?scene=<id>` deep-links to a passage; `?mode=cinematic` opens the slideshow.
- `/world` — painted atlas and readable place directory. `?at=<location>` selects a place.
- `/character` — profile, bonds/ideals/flaws, timeline.
- `/codex` — people and lore, linked to deeper character dossiers.
- `/outline` — chapter outline, proposed ideas, character dossiers, story options, and the writing room.
- `/library/<entry>` — renders the Markdown story bible directly. The original files in `worldbuilding/` remain the single editing source.

The three early Google Docs are preserved in [the source register](worldbuilding/sources/README.md). Recovered material, established draft events, and new proposals are distinguished in the notebook. Original snapshots and reusable templates are kept in the repository; they are not listed as reader-facing notebook pages.

## Add a chapter

See [AGENTS.md](./AGENTS.md) and [CLAUDE.md](./CLAUDE.md) for the workflow. Short version: copy the latest
`src/content/chapters/NN-<slug>.ts`, register it in `src/content/chapters/index.ts`,
drop art into `public/images/<slug>/`, and build.

## Deploy

It's a stock Next.js app. Import the repo into Vercel and it deploys on every
push, giving you a URL that works on any device.
