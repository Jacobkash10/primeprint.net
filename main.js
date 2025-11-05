// async function loadHTML(id, file, script) {
//   try {
//     const res = await fetch(file);
//     const html = await res.text();
//     const container = document.getElementById(id);
//     container.innerHTML = html;

//     if (script) {
//       const module = await import(`./scripts/${script}?v=${Date.now()}`); 
//       if (module && typeof module.init === 'function') {
//         module.init();
//       }
//     }
//   } catch (err) {
//     console.error(`Erreur lors du chargement de ${file}:`, err);
//   }
// }

// loadHTML("header", "sections/header.html", "header.js");
// loadHTML("footer", "sections/footer.html", "footer.js");

// const modulesToInit = [
//   'home.js',
//   'filterByCategory.js',
//   'servicePage.js',
//   'serviceDetails.js',
//   'categoryPage.js',
//   'productDetail.js'
// ];

// modulesToInit.forEach(moduleName => {
//   import(`./scripts/${moduleName}?v=${Date.now()}`).then(module => {
//     if (module && typeof module.init === 'function') {
//       module.init();
//     }
//   }).catch(err => {
//     console.warn(`Erreur lors de l'import de ${moduleName}:`, err);
//   });
// });

// main.js (ES module)
const IS_LOCAL = location.hostname === '127.0.0.1' || location.hostname === 'localhost';
// Mets ici ton domaine de prod (sans slash final)
const PROD_ORIGIN = 'https://prime-print.net';

// Version pour le cache-busting : en dev on met Date.now(), en prod tu peux injecter un hash de build
const VERSION = IS_LOCAL ? Date.now() : (window.__APP_VERSION__ || '1');

// Construit une URL absolue vers /sections et /scripts selon l'environnement
const url = {
  section: (file) => (IS_LOCAL ? `/sections/${file}` : `${PROD_ORIGIN}/sections/${file}`),
  script:  (file) => (IS_LOCAL ? `/scripts/${file}?v=${VERSION}` : `${PROD_ORIGIN}/scripts/${file}?v=${VERSION}`),
};

// Charge un fragment HTML puis, optionnellement, son JS d'init associé (ES module)
async function loadHTML(id, file, script) {
  try {
    const res = await fetch(url.section(file), { credentials: 'same-origin' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();

    const container = document.getElementById(id);
    if (!container) throw new Error(`Container #${id} introuvable`);
    container.innerHTML = html;

    if (script) {
      const module = await import(url.script(script));
      if (module && typeof module.init === 'function') {
        module.init();
      }
    }
  } catch (err) {
    console.error(`Erreur lors du chargement de ${file}:`, err);
  }
}

// === Utilisation ===
loadHTML('header', 'header.html', 'header.js');
loadHTML('footer', 'footer.html', 'footer.js');

// Modules "pages" à initialiser (si présents)
const modulesToInit = [
  'home.js',
  'filterByCategory.js',
  'servicePage.js',
  'serviceDetails.js',
  'categoryPage.js',
  'productDetail.js',
];

modulesToInit.forEach(async (moduleName) => {
  try {
    const mod = await import(url.script(moduleName));
    if (mod && typeof mod.init === 'function') mod.init();
  } catch (err) {
    // Soft-fail si le module n’existe pas sur une page
    console.warn(`Erreur lors de l'import de ${moduleName}:`, err);
  }
});
