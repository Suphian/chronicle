# The Chronicle

An interactive, cinematic "book" about Hanno Averroes, a half-elf alchemist of Carthara. Chapters play as
full-screen slideshows with music, sound effects, atmospheric visuals, optional
video, and an explorable world map that links back into the story.

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
- `/chapters/<slug>` — the reader. `?scene=<id>` deep-links to a scene.
- `/world` — pan/zoom map. `?at=<location>` opens a pin.
- `/character` — profile, bonds/ideals/flaws, timeline.

## Add a chapter

See [CLAUDE.md](./CLAUDE.md) for the full workflow. Short version: copy the latest
`src/content/chapters/NN-<slug>.ts`, register it in `src/content/chapters/index.ts`,
drop art into `public/images/<slug>/`, and build.

## Deploy

It's a stock Next.js app. Import the repo into Vercel and it deploys on every
push, giving you a URL that works on any device.
