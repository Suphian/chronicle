# Chapter illustrations

The current Carthara market image is [`carthara-market-v2.webp`](carthara-market-v2.webp), following the author's request for more visible Black representation. Black families, traders, and neighbors now occupy the foreground beneath the existing arcades. [Revision prompt and provenance](carthara-market-v2.prompt.json) record the built-in generation edit and visual review. The stable `carthara-market` artwork ID, scene placements, and number remain unchanged; the earlier image is retained.

The illustrated reader has 70 curated placements across all 63 prose scenes in the ten numbered chapters and optional historical tale. There are 25 distinct artworks. Every scene has a relevant illustration; seven additional placements accompany meaningful changes of place within a scene. Returning places and objects may recall an earlier image, including within the same chapter. A scene never repeats the same artwork.

## Asset register

All paths below are relative to this directory. Originals remain untouched in the Codex generated-images directory recorded in each prompt file. These images were generated using the **built-in image_gen tool**, not sourced from a stock-photo service. WebP files are format conversions only; no resizing, compositing, or cropping was used to make the chapter artwork.

| Asset | Dimensions | Prompt set |
|---|---|---|
| [carthara-market-v2.webp](carthara-market-v2.webp) | 1024 × 1536 | [Revision prompt & provenance](carthara-market-v2.prompt.json); [earlier study](prompts.json) |
| [apothecary.webp](apothecary.webp) | 1024 × 1536 | [Full prompt & provenance](prompts.json) |
| [pottery-room.webp](pottery-room.webp) | 1536 × 1024 | [Full prompt & provenance](household-prompts.json) |
| [petition-court.webp](petition-court.webp) | 1536 × 1024 | [Full prompt & provenance](household-prompts.json) |
| [unfinished-bowls.webp](unfinished-bowls.webp) | 1254 × 1254 | [Full prompt & provenance](household-prompts.json) |
| [case-notebook.webp](case-notebook.webp) | 1536 × 1024 | [Full prompt & provenance](household-prompts.json) |
| [clinic-courtyard.webp](clinic-courtyard.webp) | 1536 × 1024 | [Full prompt & provenance](clinic-prompts.json) |
| [lantern-alley.webp](lantern-alley.webp) | 1536 × 1024 | [Full prompt & provenance](carthara-prompts.json) |
| [sealed-cargo.webp](sealed-cargo.webp) | 1536 × 1024 | [Full prompt & provenance](carthara-prompts.json) |
| [courtyard-garden.webp](courtyard-garden.webp) | 1536 × 1024 | [Full prompt & provenance](carthara-prompts.json) |
| [threshold.webp](threshold.webp) | 1024 × 1536 | [Full prompt & provenance](carthara-prompts.json) |
| [bakhtar-cliffs.webp](bakhtar-cliffs.webp) | 1536 × 1024 | [Full prompt & provenance](journeys-prompts.json) |
| [highland-council.webp](highland-council.webp) | 1536 × 1024 | [Full prompt & provenance](journeys-prompts.json) |
| [tengeri-shelters.webp](tengeri-shelters.webp) | 1536 × 1024 | [Full prompt & provenance](journeys-prompts.json) |
| [lake-siraj.webp](lake-siraj.webp) | 1536 × 1024 | [Full prompt & provenance](journeys-prompts.json) |
| [lysandria-harbor.webp](lysandria-harbor.webp) | 1536 × 1024 | [Full prompt & provenance](journeys-prompts.json) |
| [three-seats-hall.webp](three-seats-hall.webp) | 1536 × 1024 | [Full prompt & provenance](civic-prompts.json) |
| [banquet-court.webp](banquet-court.webp) | 1536 × 1024 | [Full prompt & provenance](civic-prompts.json) |
| [moonlit-wedding.webp](moonlit-wedding.webp) | 1536 × 1024 | [Full prompt & provenance](civic-prompts.json) |
| [zaharaz-staff.webp](zaharaz-staff.webp) | 1254 × 1254 | [Full prompt & provenance](civic-prompts.json) |
| [drought-fields.webp](drought-fields.webp) | 1536 × 1024 | [Full prompt & provenance](scene-coverage-prompts.json) |
| [travel-letters.webp](travel-letters.webp) | 1536 × 1024 | [Full prompt & provenance](scene-coverage-prompts.json) |
| [broken-pottery.webp](broken-pottery.webp) | 1254 × 1254 | [Full prompt & provenance](scene-coverage-prompts.json) |
| [highland-flute.webp](highland-flute.webp) | 1536 × 1024 | [Full prompt & provenance](scene-coverage-prompts.json) |
| [lysandria-foundry.webp](lysandria-foundry.webp) | 1536 × 1024 | [Full prompt & provenance](scene-coverage-prompts.json) |

These are AI-generated project artworks; no third-party stock license applies. Use is governed by the generating service terms, without a claim of exclusive copyright. The five newest source PNGs were visually inspected before conversion; source paths, full prompts, dimensions, hashes, and inspection notes are retained in their provenance file.

## Editorial use

The exact captions, alternative descriptions, dimensions, and paragraph placements live in `src/content/illustrations.ts`. It supports multiple illustrations in one scene. Three page treatments are available: prose beside a portrait plate, a wide landscape between complete paragraphs, and a smaller centered vignette.

Placement captions can distinguish a returning subject from its first appearance. Letters, pottery, and notebooks serve as object studies rather than literal facsimiles of every letter or record. The drought landscape supplies context while the characters remain in the market; it does not invent a journey to the fields. The highland cave plate leaves the legend's disputed events open. New location passages, including the descent into Lysandria's foundry, receive their own view after the prose introduces them.

Illustrations visualize the manuscript rather than establish additional plot events. The final door has no depicted visitor or outcome. Zaharaz is a plain staff; Lysandria remains an island with two dominant mountains; the Tengeri refugees are Leonin civilians. Visual details such as an exact flag design or civic floor plan remain artistic proposals.

When the manuscript changes, revisit paragraph placements so an illustration follows the relevant introduction. Keep the prose itself in the chapter data. Run the content checker for artwork coverage and dimensions, then check a running reader to verify that no paragraph was lost, duplicated, reordered, or altered by its layout.
