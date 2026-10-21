const C='chaekgyeol-v1';
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(['./','./index.html'])).catch(()=>{}));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(n=>n!==C).map(n=>caches.delete(n)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const same=new URL(r.url).origin===location.origin;
const put=res=>{if(res&&(res.ok||res.type==='opaque')){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp))}return res};
e.respondWith(same?fetch(r).then(put).catch(()=>caches.match(r).then(m=>m||caches.match('./index.html'))):caches.match(r).then(m=>m||fetch(r).then(put)))});
