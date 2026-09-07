# Sound cues

Audio is an optional layer around reading. The user may bring sounds later; this page records them without implying that an unlicensed reference or missing file is ready to play. No external sound has been acquired through this ledger.

## Existing implementation

Chapters already reference local ambient and one-shot files under `/audio/`, with a shared audio system in [`src/lib/audio.tsx`](../src/lib/audio.tsx). The repository includes a placeholder generator at [`scripts/gen-audio.mjs`](../scripts/gen-audio.mjs). Verify that an asset exists and can play before describing a cue as available. A filename in a scene is not proof of successful playback.

## Intake record

| Field | What to record |
| --- | --- |
| Cue ID and title | Stable ID and a short recognizable name |
| Status | Suggested, sourced, licensed, implemented, or retired |
| Source | Original URL, creator, acquisition date; retain the source page |
| License | Exact license or permission, permitted uses, attribution, relevant receipt or terms |
| File | Local path, format, duration, size; leave blank before import |
| Context | Place, chapter, scene, time of day, and dramatic purpose |
| Behavior | Ambient loop or one-shot; fade, volume, loop points, optional playback |
| Content notes | Speech, language, sacred or ceremonial material, startling peaks |
| Verification | Existence, browser playback, looping and fade checked; date and result |

## Proposed palette, no files assigned

| Cue | Use | Story constraint |
| --- | --- | --- |
| Market shade | Cloth movement, footsteps, nearby work, distant trade | Keep intelligible speech out of the prose's way |
| Pottery room | Turning wheel, wet clay, small tools | Use only before the wheel's seizure or after its return is established |
| Harbor court | Water, timber, ropes, bells with a defined local use | A bell should not imply a religion or technology we have not chosen |
| Bakhtari cave | Breath, flute, long acoustic decay | Commission or license a suitable performance; avoid claiming generic music is authentic Bakhtari history |
| Alethea's garden | Leaves, water, a small inhabited space | Allow silence at the chapter's decisive moments |

## Playback rules

The reader chooses play; do not autoplay sound on entry or every chapter change. Provide visible mute and volume controls, retain the choice appropriately, and avoid stacking loops when navigating. A sound cue must never contain the only copy of essential story information. Offer text context for meaningful sounds, respect reduced motion for any associated visual effect, and make missing audio recover gracefully.

For a user-supplied reference, record its source first. Then determine whether it can be used, needs permission, should be recreated, or should remain inspiration. A public video or downloadable file does not by itself grant reuse rights.
