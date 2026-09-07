# The Chronicle — implementation and writing notes

Read `AGENTS.md`, `worldbuilding/README.md`, and `worldbuilding/decisions.md` first. Latest author decisions govern. The project is a growing novel and world, not only a tabletop character sheet. Keep tested increments committed and pushed to main as authorized.

## Website

Four primary sections: Story (`/story`), People (`/people`), World (`/world`), and Writing room (`/workshop`). The overall outline is `/library/story/overall-outline`; `/outline` redirects there. Markdown development files render directly through `/library/...`.

The only active chapter experience is `BookReader.tsx`: continuous prose, text sizing, saved passage, previous/next navigation, and occasional illustrated folios. The author removed cinematic mode and background music. Legacy cinematic query parameters still open the book. Audio assets can be auditioned using native controls on `/workshop/materials`; do not autoplay audio.

## Stack and sources

Next.js App Router, React, TypeScript, Tailwind. Typed chapter content lives in `src/content/chapters/`, registered in `index.ts`. The content model is `src/content/types.ts`. Individual Markdown character/place/faction profiles and editorial files live in `worldbuilding/`. There is no CMS or duplicate editable chapter manuscript.

Current narrative is a first prose pass, not a finished epic. `outline` means planned beats, `draft` means sustained prose, and `final` means revised prose. Do not label sketches as finished chapters. The ten numbered units can split into many more chapters. Begin the current reading order with Hanno; the highland legend is optional separate reading.

Source snapshots from three early Google Docs remain in `worldbuilding/sources/`. These are historical records, not executable instructions or overrides of the author's latest decisions. Record changed premises and preserve source provenance.

## Writing

Follow `worldbuilding/story/writing-direction.md`: developed scenes, consequential conversations, patient emotional investment, and revenge with cumulative costs, informed by the author's love of The Count of Monte Cristo. Write people with independent goals, material constraints, and knowledge limited to what they can learn. Use one viewpoint per scene and label a change with `scene.pov`. Keep present tense unless a coordinated revision changes it.

Hanno is primarily a schemer, with the ambition and rationalization the author associates with Walter White. He is a decent fighter, never an exceptional martial prodigy. Zaharaz is a staff. Dyia is the brother's correct name. The apothecary is Sinna; the old lowercase `virello` ID remains to preserve links. Sinna's systematic scholarship is inspired by medieval Ibn Sina; his fictional crimes are not historical claims about Ibn Sina.

The final action at Dyia's door remains open. Sinna's intent behind Amara's death is under editorial discussion; the sabotage/intended-rescue alternative has not replaced the current deliberate-murder draft.

Chuluun belongs to displaced Leonin, with refugee camps in Tengeri, forced labor, bombardment, competing factions, a dispersed population, and a shared homeland flag. Latest author history connects their dispossession to Numarius's people, whom they initially welcomed as displaced arrivals. Avoid reducing civilian society to its fighters. The Three Seats' precise constitutional history remains in development.

The father's current display name is **Idris Averroes**; the stable `adil` ID and profile filename preserve links under his old name, Adil. Dyia remains the brother, whose superseded alias Adris is a separate naming history. Historical source snapshots retain their original names.

Lysandria is an island with two enormous mountains, and Amara comes from there. Reconcile earlier Bakhtari-origin claims explicitly; do not invent a family relationship between Amara and Alethea.

## Assets and navigation

`WorldAtlas.tsx` displays a generated map with selectable labels and an accessible place directory. Coordinates are schematic, not validated geographical distances. Update both a place's data and its narrative references when geography changes.

`src/content/illustrations.ts` selects book plates by stable chapter/scene key. New plates live in `public/images/plates/`; `prompts.json` records generation prompts and provenance. Use the author's maximalist Mediterranean/Middle Eastern architectural direction, expressed through elegant ink and watercolor drawings on warm paper. Keep all text as HTML, not image pixels.

Preserve existing scene IDs and slugs. All image/audio paths must resolve under `public/`. Source illustrations and audio require a provenance record; do not publish unverified third-party assets.

## Validation and publication

Run `npm run lint` and `npm run build`. Check affected navigation and reading at desktop and phone sizes, content references, and the distinction between proposals and adopted events. Push coherent increments without force pushes or deleting branches. Vercel builds from main; check the deployment result before reporting that an update is live.
