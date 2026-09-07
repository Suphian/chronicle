# Chapter illustrations

The illustrated reader has 32 curated placements: three in each of the ten numbered chapters and two in the optional historical tale. There are 20 distinct artworks, including 18 added in this pass. Returning places and objects can reuse an illustration; a chapter never repeats the same image.

## Asset register

All paths below are relative to this directory. Originals remain untouched in the Codex generated-images directory recorded in each prompt file. These images were generated using the **built-in image_gen tool**, not sourced from a stock-photo service. WebP files are format conversions only; no resizing, compositing, or cropping was used to make the chapter artwork.

| Asset | Dimensions | Prompt set |
|---|---|---|
| [carthara-market.webp](carthara-market.webp) | 1024 × 1536 | [Full prompt & provenance](prompts.json) |
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

## Editorial use

The exact captions, alternative descriptions, dimensions, and paragraph placements live in `src/content/illustrations.ts`. It supports multiple illustrations in one scene. Three page treatments are available: prose beside a portrait plate, a wide landscape between complete paragraphs, and a smaller centered vignette.

Illustrations visualize the manuscript rather than establish additional plot events. The final door has no depicted visitor or outcome. Zaharaz is a plain staff; Lysandria remains an island with two dominant mountains; the Tengeri refugees are Leonin civilians. Visual details such as an exact flag design or civic floor plan remain artistic proposals.

When the manuscript changes, revisit paragraph placements so an illustration follows the relevant introduction. Keep the prose itself in the chapter data. Run the content checker for artwork coverage and dimensions, then check a running reader to verify that no paragraph was lost, duplicated, reordered, or altered by its layout.
