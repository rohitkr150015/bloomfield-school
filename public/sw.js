const CACHE='bloomfield-public-v1';
const SHELL=['/','/bloom.svg','/manifest.webmanifest'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(SHELL)));self.skipWaiting();});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('bloomfield-public-')&&k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim();});
const privatePath=path=>/^\/(portal|login|auth|api|verify|admissions\/(apply|track)|visit)(\/|$)/.test(path);
self.addEventListener('fetch',event=>{
 const url=new URL(event.request.url);
 if(event.request.method!=='GET'||url.origin!==self.location.origin||privatePath(url.pathname)||url.search)return;
 if(event.request.mode==='navigate'){
  event.respondWith(fetch(event.request).catch(()=>caches.match('/')));return;
 }
 if(/^\/(assets|images|fonts)\//.test(url.pathname)||SHELL.includes(url.pathname)){
  event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request).then(response=>{if(response.ok&&response.type==='basic'){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));}return response;})));
 }
});
