# Narration and voice casting

## Adopted reading direction — 2026-09-07

The author wants a Play button and a narrator with distinct character voices, with a British storyteller or period audiobook quality. Narration is optional and starts only on a reader's action. Chapter background music remains removed. Every scene and meaningful change of place should also have an illustration.

## Current implementation

The author clarified that narration should be made **only when Play is pressed**, a short passage at a time, and reused on replay. The default ElevenLabs player follows that direction. Opening a chapter or its settings does not generate audio. The reader presents a compact Play/Pause control below the chapter title; playback source, speed, and text size live on `/settings` and are saved on the current device. Play prepares the current passage; only its completed playback starts preparation of the next. There is no speculative queue or whole-chapter generation. A passage is at most 700 characters, remains within one scene, and uses at most ten cast voices.

The player buffers one short recording before playing it and shows **Preparing your narration…** while waiting. This is not a promise of instant or seamless streaming: first-time passages can have a short gap between them. Pausing a playing recording preserves its position. Cancel, Stop, changing playback preferences, and leaving the chapter cancel pending requests and stop the current playback. There is no automatic retry after a provider error or an uncertain canceled request. The provider may already have charged for work begun before cancellation.

Full manuscript playback with the browser's available voices remains an explicit **Device voices** option in Settings. Casting is automatic; installed voices and accents differ between devices. Resuming device playback repeats the current short phrase. The reader has no cast, scene, source, or speed configuration panel. The saved opening sample remains a review asset rather than a reader playback option.

The opening fruit-stall scene also has an **ElevenLabs cast sample**. Its title credits **elevenlabs.io**. It is a sample of the current text, not a complete audiobook. The connected account was on the free plan with 10,000 available characters before generation; a full recording of the draft requires substantially more allowance. No upgrade or overage has been purchased.

## Performance proposals

The editable casting directions and dialogue assignments live in [`src/content/narration.ts`](../src/content/narration.ts). Directions are interpretations of the character profiles for a performance, not new biographical facts or canonical accents. The sample uses George for the British narrator, Daniel for Idris, Liam for Hanno, Charlie for Dyia, and Alice for the customer. Liam is labelled American and Charlie Australian by the voice provider; this initial cast is an audition, not a claim that every character has a British accent. Childhood/adult voice development deserves a later casting pass.

The narrator reads the prose between dialogue. Explicit speaker assignments keep a character from reading another's lines. If the scene prose changes, its casting is treated as stale until reviewed. Unreviewed dialogue falls back to the narrator. Editorial pull-quotes are excluded from playback; all manuscript paragraphs remain the sole source of narration text.

Prepared sample files are checked against the current manuscript and speaker assignments by the validation script. On-demand passage cache keys include the exact text, voice IDs, model, output format, and an API-key namespace; changed passages cannot reuse the old audio. Unchanged passages can still be reused when their content and casting match. Rotating the API key starts a new cache namespace.

All roles now have explicit stock voice assignments. Additional named roles use Bill (Sinna), Sarah (Alethea), Brian (Chuluun), Adam (Phylios), Roger (Numarius), Matilda (Corvo), Eric (Vael), Bella (Rukhsana), and Harry (Iskandar). Supporting men use Chris, young supporting speakers Will, guards Eric, clerks River, and brokers Callum. Supporting actors may be reused; they are not silently replaced by the narrator. These are editable audition choices based on the profile directions. The narrator is British; the wider cast includes other English accents. Provider names and availability were checked through the account's premade-voice list on 2026-09-07.

## Server generation and replay

`POST /api/narration` accepts only a canonical chapter slug, passage ID, and current request hash, which binds the exact passage IDs, packing schedule, text, voices, model, and output format. An older open page cannot resolve an obsolete passage ID to different prose after deployment. The server derives the text and cast from the manuscript; clients cannot supply arbitrary text or voice IDs. It checks included account allowance before each uncached request and does not enable upgrades or overage. Quota, missing configuration, and provider failures produce readable messages with device voices available in Settings.

Successful MP3 data and generation metadata are stored using Next's Data Cache with no scheduled revalidation. On Vercel this persists across requests and deployments according to the host's cache policy. Replay reads that record rather than generating again. The player also keeps up to 24 passage recordings in memory for immediate replay while the chapter remains open. Cache removal, host eviction, or an API-key change can require regeneration; the cache is not a permanent editorial asset archive. Errors and incomplete audio are not saved as successful recordings.

The server serializes new provider generation within each running instance and deduplicates concurrent requests for the same passage. It limits each instance to twelve new passages and 120 playback requests per minute. These are local safeguards, not a distributed spending limit. The private deployment's access protection must remain enabled: same-origin checks alone are not authentication. This endpoint should not be exposed as an unrestricted public generation service.

Only the server environment needs `ELEVENLABS_API_KEY`. Never put the key in browser code, a `NEXT_PUBLIC_` variable, a commit, or a public settings form. Local development reads ignored `.env.local`; deployment configuration is managed separately.

## Generating and reviewing recordings

The command-line generator remains available for intentionally preparing reviewable sample assets. It is separate from the reader's on-demand passage flow; the website never invokes the whole-chapter script.

With Node 24 or newer:

```powershell
# Inspect exact text size and missing casting without spending credits.
node --env-file=.env.local scripts/generate-narration.mjs market-awnings --scene the-fruit-stall

# Generate the reviewed opening sample within the default 6,000-character ceiling.
node --env-file=.env.local scripts/generate-narration.mjs market-awnings --scene the-fruit-stall --generate

node scripts/check-narration.mjs
node scripts/check-narration-api.mjs
```

For another scene, choose its chapter slug and stable scene ID. Every speaking role must have a configured ElevenLabs voice before generation. Omitting `--scene` requests a whole chapter; the character ceiling must explicitly be raised with `--max-characters` when appropriate. The script checks included allowance and stops if insufficient. Successful clips are reused by their text/voice hash; an interrupted billed request is never automatically retried. Listen to every resulting clip for omissions, pronunciation, character consistency, and unnatural transitions before treating a recording as a finished performance.

Prepared files and per-clip provenance live under `public/audio/narration/<chapter>/`. Generating another scene merges it into the existing recording when the manuscript and speaker assignments still match. The recording becomes complete only when every prose scene has been generated. Changed manuscripts begin a new manifest; older clips remain available in the asset register. On-demand cache records hold generation time, account tier, text size, model, and voice IDs. Cloud recordings have passage/scene positions, not word-level timing; exact paragraph highlighting is available only for device preview.

The API check uses a mock provider and never reads a real key. It verifies bounded canonical passages, no eager generation, cache replay, invalid-origin and stale-text rejection, allowance checks, cancellation, concurrent deduplication, and explicit-only retries. Browser verification should additionally confirm that opening a chapter causes no generation POST and that stopping or navigation ends the active queue.

## Sources and rights

[ElevenLabs Text to Dialogue](https://elevenlabs.io/docs/api-reference/text-to-dialogue/convert) supports separate voice IDs in one dialogue request. The generator keeps each request below 2,000 characters and at most ten voices, as documented.

The reader uses the [streaming dialogue endpoint](https://elevenlabs.io/docs/api-reference/text-to-dialogue/stream) on the server, then buffers each bounded clip to validate and cache it before playback. [Next's Data Cache](https://nextjs.org/docs/app/api-reference/functions/unstable_cache) provides reuse across requests and deployments.

The initial sample was generated on a free plan. [ElevenLabs' publication rules](https://help.elevenlabs.io/hc/en-us/articles/13313564601361-Can-I-publish-the-content-I-generate-on-the-platform) require attribution in the published title and restrict that audio to noncommercial use. The sample carries the required credit; do not reuse it in a commercial edition. The provenance ledger records the plan and rights for each generated clip. A future paid-plan recording needs its own provenance rather than silently relabelling an older free-plan file.
