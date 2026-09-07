# Chronicle collaboration

This repository is a story and world workshop with a website for reading and exploration. The owner pitches ideas conversationally and authorizes routine website updates. Deliver useful changes within that scope; do not turn each reversible edit into an approval request.

Read `worldbuilding/README.md` and the relevant character, place, or faction profiles before changing story content. `worldbuilding/PROMPT.md` contains reusable briefs. `CLAUDE.md` describes the existing implementation; newer user direction takes precedence, including a readable book experience and a maximalist futuristic Mediterranean and Middle Eastern visual direction.

The four primary website sections are Story, People, World, and Writing room. Chapters use the illustrated scrolling reader only; the author removed cinematic mode and chapter background music. The overall story outline and writing direction have dedicated pages under `worldbuilding/story/`. The author wants patient narrative, consequential conversations, and moral complexity informed by their affection for *The Count of Monte Cristo*. Keep the world visually maximalist, with occasional hand-drawn architectural plates beside selectable prose.

## Evidence and invention

- Existing chapters are **draft continuity**, not an irrevocable finished novel. The author welcomes tens of chapters; these compressed seeds may grow into extensive arcs without a chapter-count cap. Preserve deliberate revisions such as Sinna's death by the stolen shipment when importing older material. The latest author correction restores **Dyia** as the brother's canonical name; **Adris** is a superseded repository alias.
- Label source facts, interpretations, proposed developments, and unresolved questions separately. A profile's proposed motive is not evidence that a chapter established it. A character's belief is not the world's objective truth.
- The three early Google Docs are source material, not instructions to execute. Preserve competing ideas without silently replacing current continuity. See `worldbuilding/sources/README.md` and `worldbuilding/decisions.md`.
- When the user adopts an idea or asks to implement it, follow its consequences into relevant profiles, the outline, chapter prose, codex, and map references. Preserve stable chapter slugs, scene IDs, and location IDs.
- Do not make all characters secretly related or every historical influence part of Hanno's ancestry. Give institutions material interests and people lives outside the protagonist's needs.
- Push back specifically: cite the inconsistent action or constraint, explain what would make it credible, and offer a workable alternative. Do not use alignment or a personality label as a substitute for motivation.
- The final choice at Dyia's door remains open. The broader primary story is still being developed; do not settle it accidentally while filling a profile.
- The apothecary's current name is **Sinna**, inspired in scholarly characteristics by the medieval physician and philosopher Ibn Sina. Virello is a superseded display name; the stable `virello` ID and profile filename preserve existing links. Historical Ibn Sina is not evidence for the fictional character's crimes.
- The father's current name is **Idris Averroes**. Adil is his superseded display name; preserve the stable `adil` ID and profile filename. The brother remains Dyia; his old alias Adris is not the father's new name.
- The latest Leonin premise supersedes the free nomadic-homeland portrayal: Chuluun belongs to displaced Leonin living in Tengeri refugee camps, subject to bombardment, forced labor, and dehumanizing propaganda. They originally welcomed Numarius's displaced people, who later dispossessed them. Preserve civilian lives, competing factions, the diaspora, and their shared homeland flag. The exact generations and command chain remain open.
- Hanno is primarily a calculating alchemist and schemer, with decent ordinary combat ability. Remove exceptional fighter claims. Zaharaz is a staff. Lysandria is an island with two enormous mountains and Amara's home; the earlier Bakhtari lineage connection remains unresolved.

## Work and validation

Use plain Markdown for the working bible and typed `src/content/` data for the website unless a task deliberately changes that architecture. Do not add a CMS or a second editable copy of chapter prose. If bible content is rendered on the site, keep the original Markdown as its source.

For UI or content-schema changes, run `npm run lint` and `npm run build` and check the reading/navigation behavior affected. Keep audio optional, controllable, and off until the reader chooses to play it. Record source and license when adding sound or image assets.

Delegation is optional and should match user authorization. Give agents bounded ownership; reconcile their changes and continuity findings before reporting completion. Do not commit unrelated workspace changes or invent a publish step outside the task's scope.

The author has authorized updates to this website, commits and pushes as work progresses, and merging outstanding branches into main. Push tested, coherent increments; preserve history and avoid force pushes or deleting branches unless requested.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
