/* Kusyu service worker — HANYA untuk klik notifikasi "Doa setelah azan".
   Sengaja TANPA handler fetch/cache: tidak mengubah cara aplikasi dimuat atau diperbarui, tidak ada jaringan pihak ketiga. */
self.addEventListener("install",()=>self.skipWaiting());
self.addEventListener("activate",e=>e.waitUntil(self.clients.claim()));
self.addEventListener("notificationclick",e=>{
  e.notification.close();
  const d=e.notification.data||{}; const url=new URL(d.url||"./?doa-azan=1#beranda",self.registration.scope).href;
  e.waitUntil((async()=>{
    const cs=await self.clients.matchAll({type:"window",includeUncontrolled:true});
    for(const c of cs){ if(c.url.startsWith(self.registration.scope)){ try{ c.postMessage({type:"doa-azan",key:d.key||""}); }catch(_){} try{ await c.focus(); }catch(_){} return; } }
    if(self.clients.openWindow) await self.clients.openWindow(url);
  })());
});
