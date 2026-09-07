# Individual atlas pictures

Every entry in `src/content/mizan-pictures.json` assigns a picture to one stable map or story-place ID. New pictures in this directory are generated individually with OpenAI's built-in image generation tool, then converted to WebP without compositional edits. The adjacent `.prompt.json` files preserve the exact prompts, source output filenames, reference, and rights statements.

The shared style reference is `../carthara-grand-study-v1.webp`. Architecture and unwritten appearances are visual studies, not new chapter events or surveyed layouts. Current story profiles take precedence over older map notes.

Existing regional paintings are assigned to their corresponding region markers, and existing Hanno, Alethea, Chuluun, and Numarius portraits to their person markers. Their original provenance remains in `../mizan-art-provenance.json`, `../carthara-grand-study-v1.prompt.json`, `../../portraits/prompts.json`, and `../../portraits/representation-v2-prompts.json`. These files are reused directly rather than copied or recropped to manufacture unique assets.

`node scripts/check-map-pictures.mjs` verifies complete map/story-place coverage, unique image bytes, file existence, dimensions, accessible descriptions, and provenance for new pictures. `--partial` validates completed pictures while generation is in progress.
