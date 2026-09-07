# Narration and voice casting

## Adopted reading direction — 2026-09-07

The author wants a Listen button and a narrator with distinct character voices, with a British storyteller or period audiobook quality. Narration is optional and starts only on a reader's action. Chapter background music remains removed. Every scene and meaningful change of place should also have an illustration.

## Current implementation

Each chapter offers full manuscript playback using the browser's available voices, with play/pause, stop, scene selection, speed, and per-character voice choices. This is labelled **device preview**: installed voices and accents differ between devices. Resuming a device preview repeats the current short phrase. Changing chapter stops playback.

The opening fruit-stall scene also has an **ElevenLabs cast sample**. Its title credits **elevenlabs.io**. It is a sample of the current text, not a complete audiobook. The connected account was on the free plan with 10,000 available characters before generation; a full recording of the draft requires substantially more allowance. No upgrade or overage has been purchased.

## Performance proposals

The editable casting directions and dialogue assignments live in [`src/content/narration.ts`](../src/content/narration.ts). Directions are interpretations of the character profiles for a performance, not new biographical facts or canonical accents. The sample uses George for the British narrator, Daniel for Idris, Liam for Hanno, Charlie for Dyia, and Alice for the customer. Liam is labelled American and Charlie Australian by the voice provider; this initial cast is an audition, not a claim that every character has a British accent. Childhood/adult voice development deserves a later casting pass.

The narrator reads the prose between dialogue. Explicit speaker assignments keep a character from reading another's lines. If the scene prose changes, its casting is treated as stale until reviewed. Unreviewed dialogue falls back to the narrator. Editorial pull-quotes are excluded from playback; all manuscript paragraphs remain the sole source of narration text.

Recorded audio is also checked against the current manuscript and speaker assignments. A changed chapter uses device preview until its recording is regenerated. This is particularly useful while the story remains a draft.

## Generating and reviewing recordings

The website plays prepared audio files; readers do not trigger paid generation. The API key belongs only in the ignored local `.env.local` file as `ELEVENLABS_API_KEY`. Never add it to browser code, a `NEXT_PUBLIC_` variable, a commit, or a public settings form.

With Node 24 or newer:

```powershell
# Inspect exact text size and missing casting without spending credits.
node --env-file=.env.local scripts/generate-narration.mjs market-awnings --scene the-fruit-stall

# Generate the reviewed opening sample within the default 6,000-character ceiling.
node --env-file=.env.local scripts/generate-narration.mjs market-awnings --scene the-fruit-stall --generate

node scripts/check-narration.mjs
```

For another scene, choose its chapter slug and stable scene ID. Every speaking role must have a configured ElevenLabs voice before generation. Omitting `--scene` requests a whole chapter; the character ceiling must explicitly be raised with `--max-characters` when appropriate. The script checks included allowance and stops if insufficient. Successful clips are reused by their text/voice hash; an interrupted billed request is never automatically retried. Listen to every resulting clip for omissions, pronunciation, character consistency, and unnatural transitions before treating a recording as a finished performance.

Files and per-clip provenance live under `public/audio/narration/<chapter>/`. Generating another scene merges it into the existing recording when the manuscript and speaker assignments still match. The recording becomes complete only when every prose scene has been generated. Changed manuscripts begin a new manifest; older clips remain available in the asset register. Generated clips carry scene-level positions, not word-level timing; exact paragraph highlighting is available only for device preview.

## Sources and rights

[ElevenLabs Text to Dialogue](https://elevenlabs.io/docs/api-reference/text-to-dialogue/convert) supports separate voice IDs in one dialogue request. The generator keeps each request below 2,000 characters and at most ten voices, as documented.

The initial sample was generated on a free plan. [ElevenLabs' publication rules](https://help.elevenlabs.io/hc/en-us/articles/13313564601361-Can-I-publish-the-content-I-generate-on-the-platform) require attribution in the published title and restrict that audio to noncommercial use. The sample carries the required credit; do not reuse it in a commercial edition. The provenance ledger records the plan and rights for each generated clip. A future paid-plan recording needs its own provenance rather than silently relabelling an older free-plan file.
