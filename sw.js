// Métier — service worker : l'app s'ouvre hors ligne (tous les fichiers servis sont gardés en cache à l'installation).
// Origine partagée avec d'autres apps du même site : ce fichier ne touche QUE les caches « metier2-… » (l'ancienne adresse, /carte-de-vie/metier/, avait « metier- » : jamais touché ici)
// (jamais caches.match, qui cherche dans tous les caches du site ; jamais de suppression d'un cache d'un autre nom).
// Les empreintes SHA-256 ci-dessous sont celles des fichiers : une copie n'est servie, et une réponse n'est gardée, que si
// son empreinte est la bonne (une autre page du même site pourrait écrire dans le Cache Storage commun).
// Ce fichier change dès qu'un fichier change (empreintes) : le navigateur installe alors la nouvelle version, d'un bloc.
// Seules les réponses de CE dossier sont gardées, et seulement à l'installation : une réponse de l'API GitHub ou du serveur (autres hôtes) n'est jamais interceptée ni mise en cache.
// Recalcul : python3 scripts/metier_empreintes.py (vérifié par tests/test_metier_autonome.py).
const CACHE = 'metier2-v1-d69bcc1bc838';
const COQUILLE = ['./', 'index.html', 'app.css', 'connexion.css', 'app.js', 'logique.js', 'connexion.js', 'synchro.js', 'qr.js', 'donnees.js', 'enquete.js', 'porteurs.js', 'porteurs_donnees.js', 'porteurs_donnees_panel.js', 'installation.js',
  'manifest.webmanifest', 'icon.svg', 'icon-192.png', 'icon-512.png', 'icon-maskable-512.png',
  'fonts/instrument-sans.woff2', 'fonts/plex-mono-400.woff2', 'fonts/plex-mono-400-italique.woff2', 'fonts/plex-mono-500.woff2',
  'fonts/plex-mono-600.woff2', 'fonts/plex-mono-700.woff2', 'fonts/OFL-InstrumentSans.txt', 'fonts/OFL-IBMPlexMono.txt'];
// EMPREINTES:début
const EMPREINTES = {
  'index.html': '3f0e43cd70d1c83e17c9589eb8c867d72791df0f771086befd999c730a0790ae',
  'app.css': '2f5339310b11a50fcdae561f1da1eaa0fcf5651b5e5733f887cc6a22e5ca2c72',
  'connexion.css': '01bf86c5c909a65f76fd2a55214ead405d8ce57ff1d2d394ab7eac950c8819ce',
  'app.js': 'ec1a01d39c434f283a6464bb4b958f54de176eef562a02068c69f1ca12758e5b',
  'logique.js': 'e65e3777bb36c0bf8e6c790f87a4c7e071c463de0017878ff2ce6896fefeb232',
  'connexion.js': 'c25c5a9ca19236108606957edfcf7049d7c95327873f6b9f06ed4e0664e28b5d',
  'synchro.js': '84d8b7571322db44fd89ec94c85425f9c396299d20648001d7b53ac2724c1ed4',
  'qr.js': '14685aab1677fc1e530c7e761a28bd842ede7a18fcd3e804b3e7037ca0fb0444',
  'donnees.js': '477c85acec4ea7b09b632d898263db79d103b4bde2d43f826d5f3f804923b1c9',
  'enquete.js': '35849771b85284cf244eca5a5642e7a74f1c7eaf7d8751167f08c0dc156c71df',
  'porteurs.js': '88d1a581a0495bee1d8ff9b08a2ef3d0a0921d23577ba04bf75250042a549777',
  'porteurs_donnees.js': '8d5f339ca5de255bc5b05a8cca17853fa6b9a612b7c9133ad32028d33a06514e',
  'porteurs_donnees_panel.js': '9a96ab39c7484106907f9454e531ef127e3bfc42bddce5eabd1b55168aabe493',
  'installation.js': '7b65f755117edb9e9f9325766e21b4ec13b111502b49acc130b8e63d2c4d024d',
  'manifest.webmanifest': '116fbd523138c1d8f139aaa97c330b042ad2b75459c0bc1d78da38caefadfac6',
  'icon.svg': 'f0030ee2d83ed001e32b9e1761a811e5510aae83df32c9afadac7c5129695fa8',
  'icon-192.png': '81e3aa5337980b808d3128956838a6d3aa5a270cf2b29426f3bcaaff8d65beae',
  'icon-512.png': '7b07196052894621354f2724a59693f33b63b903f034dd5db9b7862694d66a81',
  'icon-maskable-512.png': 'baf6a7f9be7e50226656b3cbec6863a0a68fa90992037be23eb6ee4027d9c297',
  'fonts/instrument-sans.woff2': '6219bc4bfdfc5d9b2201dcdf046218b122a758f932e25ed5f168f929b7ca2311',
  'fonts/plex-mono-400.woff2': 'c36f509c0a8f9f85f29cb44bc8701d8a9e0b14c499e77a884f789ead7093a7ac',
  'fonts/plex-mono-400-italique.woff2': '2665f5fbbb334780fa135c7f1dc6e2459061a2d6d44c32b7c1fdbc34cde65ede',
  'fonts/plex-mono-500.woff2': 'a76f53ca6612e7b3828eec2311098675b7f9849ae4169a8bcef6302aec02a6c0',
  'fonts/plex-mono-600.woff2': 'ad4580d8cb4b5f627c2d18457656732f7f7b070f7837fbc380e08054157e6f6c',
  'fonts/plex-mono-700.woff2': '9e1455e6e9c5866f607e464fffb7855486dcf575b7e69b83a3d234e587fce41b',
  'fonts/OFL-InstrumentSans.txt': '9e27a72ed30eb49a08678f6a5d6ed98ec7ba5368f541637ee0683ec9134ef966',
  'fonts/OFL-IBMPlexMono.txt': '7e6b2818edbd8f6a01ae80641cc8f16a51080d08fb4e532be3a0b6f74adb07da'
};
// EMPREINTES:fin
const nomDe = url => { const r = url.slice(self.registration.scope.length).split(/[?#]/)[0]; return r === '' ? 'index.html' : r; };
async function intacte(nom, reponse) {
  const attendue = EMPREINTES[nom]; if (!attendue || !reponse) return false;
  const h = new Uint8Array(await crypto.subtle.digest('SHA-256', await reponse.clone().arrayBuffer()));
  return [...h].map(b => b.toString(16).padStart(2, '0')).join('') === attendue;
}
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => Promise.all(COQUILLE.map(async f => {
    const r = await fetch(f, { cache: 'no-cache' });
    if (!r.ok || !(await intacte(nomDe(new URL(f, self.registration.scope).href), r))) throw new Error('fichier absent ou différent : ' + f);
    await c.put(f, r);
  }))).then(() => self.skipWaiting()));
});
// seulement SES anciennes copies (préfixe metier2-) : les autres apps du même site gardent les leurs
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(k => Promise.all(k.filter(n => n.startsWith('metier2-') && n !== CACHE).map(n => caches.delete(n)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin || !e.request.url.startsWith(self.registration.scope)) return;
  const nom = nomDe(e.request.url);
  e.respondWith(caches.open(CACHE).then(c => c.match(e.request, { ignoreSearch: true })).then(async copie => {
    if (copie && await intacte(nom, copie)) return copie;
    return fetch(e.request);   // pas en cache (ou copie piégée) : le réseau, sans rien garder
  }));
});
