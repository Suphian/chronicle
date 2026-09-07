# Narration and voice casting

## Adopted reading direction — 2026-09-07

The author wants a Play button and a narrator with distinct character voices, with a British storyteller or period audiobook quality. Narration is optional and starts only on a reader's action. Chapter background music remains removed. Every scene and meaningful change of place should also have an illustration.

## Current implementation

The author clarified that narration should be made **only when Play is pressed**, a short passage at a time, and reused on replay. The default ElevenLabs player follows that direction. Opening a chapter or its settings does not generate audio. The reader presents a compact Play/Pause control below the chapter title; playback source, speed, and text size live on `/settings` and are saved on the current device. Play prepares the current passage; only its completed playback starts preparation of the next. There is no speculative queue or whole-chapter generation. The opening passage of each scene is at most 240 characters, split at a sentence boundary when possible, so less audio must be prepared before listening begins. Later passages remain at most 700 characters. Each passage stays within one scene and uses at most ten cast voices. Splitting the opening retains later clip content where possible so unchanged recordings can still be reused.

The player buffers one short recording before playing it and shows **Preparing your narration…** while waiting. This is not a promise of instant or seamless streaming: first-time passages can have a short gap between them. The shorter opening reduces buffering work but does not guarantee instant playback. After six and twenty seconds the player explains the wait; after sixty seconds it cancels preparation and offers an explicit retry instead of remaining on Preparing indefinitely. Pausing a playing recording preserves its position. Cancel, Stop, changing playback preferences, and leaving the chapter cancel pending requests and stop the current playback. There is no automatic retry after a provider error or an uncertain canceled request. The provider may already have charged for work begun before cancellation.

Full manuscript playback with the browser's available voices remains an explicit **Device voices** option in Settings. Casting is automatic; installed voices and accents differ between devices. Resuming device playback repeats the current short phrase. The reader has no cast, scene, source, or speed configuration panel. The saved opening sample remains a review asset rather than a reader playback option.

The opening fruit-stall scene also has an **ElevenLabs cast sample**. Its title credits **elevenlabs.io**. It is an archived stock audition predating the new performance cues, not a complete audiobook. The connected account was on the free plan with 10,000 available characters before generation; a full recording of the draft requires substantially more allowance. No upgrade or overage has been purchased.

## Profile-directed cast — 2026-09-07

The author requests a distinct ElevenLabs identity for every character, molded from the profiles. Previously the website assigned stock IDs but did not send its written performance directions to ElevenLabs. Idris had Daniel's ID, separate from the narrator's George; no custom Idris voice had been designed.

**Implemented:** all thirteen named characters have separate provider IDs. The guard no longer shares Vael's identity, using Chris, shared only with unnamed supporting men. `src/content/voice-designs.ts` contains thirteen individual briefs linked to their profiles, plus v3 delivery cues and scene-specific overrides. Cues now reach both the on-demand service and recording generator. They are never inserted into visible prose or device speech. Request limits and allowance checks include the tags; cache keys and prepared-recording hashes include the voices and delivery choices.

Idris's proposed original voice is a warm, lightly weathered baritone with a merchant's welcome, earned pride, affectionate stubbornness and persuasive rhythm. His actual dialogue cues shift from warmth at the stall to persuasion at home, insistence in the drought, strain at the seizure and firmness at the hearing. Sinna retains a credible teaching voice, Chuluun the patience and limits of a working teacher, and Alethea professional authority. These are **performance interpretations**, not additional biography or resolutions of open motives. The future British-English accents and vocal ages are casting choices. Current stock voices retain their provider accents. Childhood delivery is lighter in the opening family scenes, not a completed child/adult recast.

**Available for review:** `/workshop/voices` has manually playable auditions for all thirteen named characters, made from selected existing dialogue. Files and exact request/provenance records live in `public/audio/voices/<stable-id>/`. These are directed stock auditions, not custom-designed voices or approved final performances. Listen for natural delivery, pronunciation and whether tags are applied rather than spoken. Nothing autoplays or generates just by opening that page.

**Blocked:** the API returned HTTP 403 for Idris's Voice Design request, stating that API voice creation requires a paid plan. The account also reports three saved-voice slots, two occupied by unrelated existing voices. Those voices were preserved. No custom character identity was created; `src/content/designed-voices.ts` is intentionally empty until creation succeeds. More capacity is required for the full cast. The web app was signed out during this check, so web-based Voice Design remains unverified for this account. No plan change or overage was purchased.

`scripts/design-character-voices.mjs` checks plan, slots and allowance before creating previews from the profile brief and reviewed manuscript lines. It records provenance and saves a selected preview under the stable character ID. It recovers a matching saved voice after an interrupted save; uncertain billed design requests are not automatically retried. Short roles repeat their existing lines to meet the preview minimum. Review alternatives before choosing a preview number.

```powershell
node scripts/design-character-voices.mjs
node scripts/design-character-voices.mjs idris
# Once the account supports API Voice Design:
node --env-file=.env.local scripts/design-character-voices.mjs idris --generate
node --env-file=.env.local scripts/design-character-voices.mjs idris --save 1
# A short audition of the currently assigned voice:
node --env-file=.env.local scripts/generate-voice-audition.mjs adil --generate
```

Saved names include a design fingerprint; stable IDs remain `adil` for Idris and `virello` for Sinna. A profile revision should trigger review of the brief; editing prose cannot silently remodel a saved voice. The earlier opening recording is archived as `stock-audition-manifest.json`, with its original provenance intact. It is not the new directed performance.

Sources: [Voice Design API](https://elevenlabs.io/docs/api-reference/text-to-voice/design), [save a designed voice](https://elevenlabs.io/docs/api-reference/text-to-voice/create), and [Eleven v3 performance guidance](https://elevenlabs.io/docs/overview/capabilities/text-to-speech/best-practices). The specific plan and slot limits above were checked through the connected account, rather than inferred from general documentation.

## Original stock auditions

The editable casting directions and dialogue assignments live in [`src/content/narration.ts`](../src/content/narration.ts). Directions are interpretations of the character profiles for a performance, not new biographical facts or canonical accents. The sample uses George for the British narrator, Daniel for Idris, Liam for Hanno, Charlie for Dyia, and Alice for the customer. Liam is labelled American and Charlie Australian by the voice provider; this initial cast is an audition, not a claim that every character has a British accent. Childhood/adult voice development deserves a later casting pass.

The narrator reads the prose between dialogue. Explicit speaker assignments keep a character from reading another's lines. If the scene prose changes, its casting is treated as stale until reviewed. Unreviewed dialogue falls back to the narrator. Editorial pull-quotes are excluded from playback; all manuscript paragraphs remain the sole source of narration text.

Prepared sample files are checked against the current manuscript and speaker assignments by the validation script. On-demand passage cache keys include the exact text, voice IDs, model, output format, and an API-key namespace; changed passages cannot reuse the old audio. Unchanged passages can still be reused when their content and casting match. Rotating the API key starts a new cache namespace.

All roles now have explicit stock voice assignments. Additional named roles use Bill (Sinna), Sarah (Alethea), Brian (Chuluun), Adam (Phylios), Roger (Numarius), Matilda (Corvo), Eric (Vael), Bella (Rukhsana), and Harry (Iskandar). Supporting men use Chris, young supporting speakers Will, guards Chris, clerks River, and brokers Callum. Supporting actors may be reused; they are not silently replaced by the narrator. These are editable audition choices based on the profile directions. The narrator is British; the wider cast includes other English accents. Provider names and availability were checked through the account's premade-voice list on 2026-09-07.

## Server generation and replay

If cloud narration fails, the reader offers **Play with device voices** without leaving the chapter. This explicit click restarts the affected paragraph and uses device voices for the rest of that open player; the saved narration preference stays unchanged. Known provider refusals distinguish invalid credentials, missing permissions, free-tier restrictions, plan requirements, and exhausted quota without exposing raw provider responses.

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

The API check uses a mock provider and never reads a real key. It verifies bounded canonical passages, stale packing-schedule rejection, no eager generation, cache replay, invalid-origin and stale-text rejection, allowance checks, cancellation, concurrent deduplication, and explicit-only retries. The manuscript checker also reconstructs every chapter’s prose and paragraph spacing from the packed audio inputs, bounds each scene opening, and checks sentence-aware splitting. Browser verification should additionally confirm that opening a chapter causes no generation POST and that stopping or navigation ends the active queue.

## Sources and rights

[ElevenLabs Text to Dialogue](https://elevenlabs.io/docs/api-reference/text-to-dialogue/convert) supports separate voice IDs in one dialogue request. The generator keeps each request below 2,000 characters and at most ten voices, as documented.

The reader uses the [streaming dialogue endpoint](https://elevenlabs.io/docs/api-reference/text-to-dialogue/stream) on the server, then buffers each bounded clip to validate and cache it before playback. [Next's Data Cache](https://nextjs.org/docs/app/api-reference/functions/unstable_cache) provides reuse across requests and deployments.

The initial sample was generated on a free plan. [ElevenLabs' publication rules](https://help.elevenlabs.io/hc/en-us/articles/13313564601361-Can-I-publish-the-content-I-generate-on-the-platform) require attribution in the published title and restrict that audio to noncommercial use. The sample carries the required credit; do not reuse it in a commercial edition. The provenance ledger records the plan and rights for each generated clip. A future paid-plan recording needs its own provenance rather than silently relabelling an older free-plan file.
