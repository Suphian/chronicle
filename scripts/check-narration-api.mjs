// Pure service tests with a mock ElevenLabs provider. Never reads a key or spends credits.
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { marketAwnings } from '../src/content/chapters/01-market-awnings.ts';
import { getNarrationSegments, narrationSourceHash } from '../src/lib/narration.ts';
import { getNarrationPassages, narrationRequestHash, providerInputs, NARRATION_MODEL, NARRATION_FORMAT, PASSAGE_CHARACTER_LIMIT } from '../src/lib/narration-passages.ts';
import { createNarrationHandler } from '../src/lib/narration-service.ts';

const chapter = marketAwnings;
const passages = getNarrationPassages(chapter);
const hash = await narrationRequestHash(chapter);
assert(passages.length > 1);
for (const part of passages) {
  assert(part.characters <= PASSAGE_CHARACTER_LIMIT);
  assert.equal(part.characters, providerInputs(part).reduce((total, input) => total + input.text.length, 0));
  assert(new Set(part.inputs.map(input => input.voice_id)).size <= 10);
  assert(part.inputs.every(input => input.voice_id));
}
assert.equal(passages.flatMap(part => part.inputs.map(input => input.text)).join('').replace(/\s/g,''), getNarrationSegments(chapter).map(part => part.text).join('').replace(/\s/g,''), 'bounded passages preserve every prose character except spacing');

const body = { chapter: chapter.slug, passageId: passages[0].id, sourceHash: hash };
const request = (data = body, extra = {}) => new Request('https://chronicle.test/api/narration', { method:'POST', headers:{'content-type':'application/json',origin:'https://chronicle.test'}, body:JSON.stringify(data), ...extra });
const cacheStore = new Map();
const cache = async (key, generate) => {
  if (!cacheStore.has(key)) cacheStore.set(key, await generate());
  return cacheStore.get(key);
};
const dependencies = { chapter: slug => slug === chapter.slug ? chapter : undefined, cache, apiKey: () => 'test-only-not-a-real-key' };
let checks = 0, generations = 0;
const audio = () => new Response(new Uint8Array(1400).fill(1), {headers:{'content-type':'audio/mpeg'}});
const provider = async (url, options) => {
  if (url.endsWith('/subscription')) { checks++; return Response.json({character_limit:10000,character_count:0,tier:'free'}); }
  generations++;
  const sent = JSON.parse(options.body);
  assert.deepEqual(sent.inputs, providerInputs(passages[0]), 'provider receives canonical manuscript/cast with performance cues');
  assert.equal(sent.model_id, 'eleven_v3');
  return audio();
};
const handle = createNarrationHandler({...dependencies,fetch:provider});
assert.equal(generations, 0, 'constructing handler does not generate');
assert.equal((await handle(request({...body,text:'arbitrary paid speech'}))).status,400);
assert.equal((await handle(request({...body,sourceHash:'stale'}))).status,409);
// An older packing rule could combine the first two passages without changing a word.
// Its passage 0 must not silently resolve to today's shorter passage 0.
const oldSchedule = structuredClone(passages);
const removed = oldSchedule.splice(1, 1)[0];
oldSchedule[0].inputs.push(...removed.inputs);
oldSchedule[0].characters += removed.characters;
assert.equal(oldSchedule.flatMap(part => part.inputs.map(input => input.text)).join(''), passages.flatMap(part => part.inputs.map(input => input.text)).join(''));
const oldScheduleHash = createHash('sha256').update(JSON.stringify({model:NARRATION_MODEL,format:NARRATION_FORMAT,passages:oldSchedule})).digest('hex');
assert.notEqual(oldScheduleHash, hash);
assert.equal((await handle(request({...body,sourceHash:oldScheduleHash}))).status,409, 'stale passage schedule is rejected despite unchanged manuscript');
assert.equal((await handle(request({...body,sourceHash:await narrationSourceHash(chapter)}))).status,409, 'old text-only request hashes are rejected');
assert.equal((await handle(request({...body,chapter:'missing'}))).status,404);
assert.equal((await handle(request(body,{headers:{'content-type':'application/json',origin:'https://elsewhere.test'}}))).status,403);
assert.equal((await handle(request({...body,passageId:'missing'}))).status,404);
assert.equal(generations,0, 'invalid requests never reach provider');
const first = await handle(request());
assert.equal(first.status,200);
assert.equal((await first.arrayBuffer()).byteLength,1400);
assert.equal(generations,1, 'one playback request generates only one passage');
const repeated = await handle(request());
assert.equal(repeated.status,200);
assert.equal(generations,1,'replay reuses saved recording');
assert.equal(checks,1,'cache hits do not check or consume provider allowance');

let quotaGeneration = 0;
const noQuota = createNarrationHandler({...dependencies, cache:async (_,make)=>make(),fetch:async url=> {
  if(url.endsWith('/subscription')) return Response.json({character_limit:10,character_count:10});
  quotaGeneration++; return audio();
}});
assert.equal((await noQuota(request())).status,402);
assert.equal(quotaGeneration,0,'insufficient included quota never initiates billed generation');

const failedStore = new Map();
let attempts = 0;
const transient = createNarrationHandler({...dependencies, cache:async (key,make)=> {
  if(!failedStore.has(key)) failedStore.set(key,await make());
  return failedStore.get(key);
},fetch:async url=> {
  if(url.endsWith('/subscription')) return Response.json({character_limit:10000,character_count:0});
  attempts++; return attempts === 1 ? new Response('provider failure',{status:500}) : audio();
}});
assert.equal((await transient(request())).status,502);
assert.equal(attempts,1,'uncertain provider results are not automatically retried');
assert.equal(failedStore.size,0,'errors are never persisted');
assert.equal((await transient(request())).status,200,'explicit subsequent Play can retry');

let release, started;
const began = new Promise(resolve=>{started=resolve;});
let pendingGeneration = 0;
const pending = createNarrationHandler({...dependencies,cache:async(_,make)=>make(),fetch:async(url,options)=> {
  if(url.endsWith('/subscription')) return Response.json({character_limit:10000,character_count:0});
  pendingGeneration++;
  started();
  return new Promise((resolve,reject)=> {
    release=()=>resolve(audio());
    options.signal.addEventListener('abort',()=>reject(new DOMException('Aborted','AbortError')),{once:true});
  });
}});
const controller = new AbortController();
const canceled = pending(request(body,{signal:controller.signal}));
await began;
controller.abort();
assert.equal((await canceled).status,499,'Stop cancels pending provider work');
assert.equal(pendingGeneration,1);
release();

let unblock, signalStart;
const begun = new Promise(resolve=>{signalStart=resolve;});
let sharedCalls=0;
const shared = createNarrationHandler({...dependencies,cache:async(_,make)=>make(),fetch:async url=> {
  if(url.endsWith('/subscription')) return Response.json({character_limit:10000,character_count:0});
  sharedCalls++; signalStart(); return new Promise(resolve=>{unblock=()=>resolve(audio());});
}});
const simultaneous = shared(request());
await begun;
const duplicate = shared(request());
// Let canonical SHA verification finish before resolving the mocked provider.
await new Promise(resolve=>setTimeout(resolve,20));
unblock();
assert.equal((await simultaneous).status,200);
assert.equal((await duplicate).status,200);
assert.equal(sharedCalls,1,'concurrent replay of one passage is deduplicated');

// One tab leaving must not cancel another tab's shared, uncached recording.
let finishShared, notifySharedStart;
const sharedStarted = new Promise(resolve=>{notifySharedStart=resolve;});
let sharedProviderSignal;
let subscriberCalls=0;
const subscriberCache = new Map();
const subscribed = createNarrationHandler({...dependencies,cache:async(key,make)=> {
  if(!subscriberCache.has(key)) subscriberCache.set(key,await make());
  return subscriberCache.get(key);
},fetch:async(url,options)=> {
  if(url.endsWith('/subscription')) return Response.json({character_limit:10000,character_count:0});
  subscriberCalls++;
  sharedProviderSignal=options.signal;
  notifySharedStart();
  return new Promise((resolve,reject)=> {
    finishShared=()=>resolve(audio());
    options.signal.addEventListener('abort',()=>reject(new DOMException('Aborted','AbortError')),{once:true});
  });
}});
const firstListener = new AbortController();
const initiating = subscribed(request(body,{signal:firstListener.signal}));
await sharedStarted;
const surviving = subscribed(request());
await new Promise(resolve=>setTimeout(resolve,30));
firstListener.abort();
assert.equal((await initiating).status,499,'canceled initiator returns promptly without waiting for the shared provider');
assert.equal(sharedProviderSignal.aborted,false,'remaining subscriber keeps the provider request alive');
finishShared();
assert.equal((await surviving).status,200,'remaining subscriber receives its recording');
assert.equal(subscriberCalls,1,'surviving listener shares the original billed request');
assert.equal((await subscribed(request())).status,200);
assert.equal(subscriberCalls,1,'completed shared audio is cached for subsequent replay');

// If both listeners leave, abort the provider only after the last one detaches.
let notifyAllStart;
const allStarted = new Promise(resolve=>{notifyAllStart=resolve;});
let allProviderSignal;
const allCanceled = createNarrationHandler({...dependencies,cache:async(_,make)=>make(),fetch:async(url,options)=> {
  if(url.endsWith('/subscription')) return Response.json({character_limit:10000,character_count:0});
  allProviderSignal=options.signal; notifyAllStart();
  return new Promise((_,reject)=> options.signal.addEventListener('abort',()=>reject(new DOMException('Aborted','AbortError')),{once:true}));
}});
const listenerOne = new AbortController(), listenerTwo = new AbortController();
const one = allCanceled(request(body,{signal:listenerOne.signal}));
await allStarted;
const two = allCanceled(request(body,{signal:listenerTwo.signal}));
await new Promise(resolve=>setTimeout(resolve,30));
listenerOne.abort();
assert.equal((await one).status,499);
assert.equal(allProviderSignal.aborted,false);
listenerTwo.abort();
assert.equal((await two).status,499);
assert.equal(allProviderSignal.aborted,true,'the last canceled subscriber aborts provider work');
console.log('Verified canonical bounded passages, no eager generation, replay cache, origin/stale-input rejection, included-quota guard, cancellation, deduplication, and explicit-only retries. No real provider calls.');
