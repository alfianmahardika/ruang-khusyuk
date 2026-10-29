/* Kusyu service worker — HANYA untuk klik notifikasi "Doa setelah azan".
   Sengaja TANPA handler fetch/cache: tidak mengubah cara aplikasi dimuat atau diperbarui, tidak ada jaringan pihak ketiga.
   CACHE_VER=bm-sw-v89 — bump so phones re-check SW after deploy (no runtime cache; version is the signal). */
const CACHE_VER="bm-sw-v89";
/* Precache self-hosted OFL fonts (notification SW still has no fetch handler — version + install cache is the signal). */
const PRECACHE=["fonts/poppins-semibold.woff2","fonts/OFL.txt"];
self.addEventListener("install",e=>{
  e.waitUntil((async()=>{
    try{ const c=await caches.open(CACHE_VER); await c.addAll(PRECACHE); }catch(_){}
    await self.skipWaiting();
  })());
});
self.addEventListener("activate",e=>e.waitUntil((async()=>{
  try{ const keys=await caches.keys(); await Promise.all(keys.filter(k=>k!==CACHE_VER).map(k=>caches.delete(k))); }catch(_){}
  await self.clients.claim();
})()));
self.addEventListener("notificationclick",e=>{
  e.notification.close();
  const d=e.notification.data||{}; const url=new URL(d.url||"./?doa-azan=1#beranda",self.registration.scope).href;
  e.waitUntil((async()=>{
    const cs=await self.clients.matchAll({type:"window",includeUncontrolled:true});
    for(const c of cs){ if(c.url.startsWith(self.registration.scope)){ try{ c.postMessage({type:"doa-azan",key:d.key||""}); }catch(_){} try{ await c.focus(); }catch(_){} return; } }
    if(self.clients.openWindow) await self.clients.openWindow(url);
  })());
});
