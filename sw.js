/* Profdemaths 2.0 · fonctionnement hors connexion */
const V='pdm-202610222030';
const CORE=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const req=e.request,url=new URL(req.url);
  if(req.method!=='GET'||/script\.google(usercontent)?\.com$/.test(url.hostname))return;
  if(req.mode==='navigate'){
    e.respondWith((async()=>{const c=await caches.open(V);
      try{const ctl=new AbortController(),t=setTimeout(()=>ctl.abort(),9000);const r=await fetch(req.url,{signal:ctl.signal,cache:'no-store',credentials:'same-origin'});clearTimeout(t);if(r.ok)c.put('./',r.clone());return r}
      catch(err){return (await c.match('./'))||(await c.match('./index.html'))||Response.error()}})());return;
  }
  e.respondWith((async()=>{const c=await caches.open(V),hit=await c.match(req);
    const net=fetch(req).then(r=>{if(r&&(r.ok||r.type==='opaque'))c.put(req,r.clone());return r}).catch(()=>hit);
    return hit||net})());
});
