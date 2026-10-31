// Service worker mínimo: permite instalar como app. Não guarda nada em cache (cada abertura pega a versão
// publicada); sem internet, mostra uma página simples em vez do erro do navegador.
var OFFLINE = '<!doctype html><html lang="pt-BR"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">' +
  '<title>Sem conexão</title><body style="margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background:#F5F5F1;' +
  'font-family:system-ui,sans-serif;color:#15171A"><div style="max-width:360px;padding:24px;text-align:center"><h1 style="font-size:22px">Sem conexão</h1>' +
  '<p style="color:#5B616B;line-height:1.5">O painel da loja precisa de internet. Verifique a conexão e tente de novo.</p>' +
  '<button onclick="location.reload()" style="height:44px;padding:0 18px;border:0;border-radius:12px;background:#1E5B48;color:#fff;font-weight:700;font-size:15px">Tentar de novo</button></div></body></html>';
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (e) { e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', function (e) {
  if (e.request.mode !== 'navigate') return;
  e.respondWith(fetch(e.request).catch(function () {
    return new Response(OFFLINE, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
  }));
});
