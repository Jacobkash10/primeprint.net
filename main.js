async function loadHTML(id, file, script) {
  try {
    const res = await fetch(file);
    const html = await res.text();
    const container = document.getElementById(id);
    container.innerHTML = html;

    // Important : on attend le DOM avant d’importer le JS lié
    if (script) {
      const module = await import(`./scripts/${script}?v=${Date.now()}`); // <== force reload via cache busting
      if (module && typeof module.init === 'function') {
        module.init();
      }
    }
  } catch (err) {
    console.error(`Erreur lors du chargement de ${file}:`, err);
  }
}

// Chargement dynamique du header avec son script à chaque fois
loadHTML("header", "sections/header.html", "search.js"); // search.js inclus ici car dépend du header
loadHTML("footer", "sections/footer.html", "footer.js");

// Les autres modules JS globaux
const modulesToInit = [
  'navBottom.js',
  'services.js',
  'our.js',
  'filterByCategory.js',
  'servicePage.js',
  'serviceDetails.js'
];

modulesToInit.forEach(moduleName => {
  import(`./scripts/${moduleName}?v=${Date.now()}`).then(module => {
    if (module && typeof module.init === 'function') {
      module.init();
    }
  }).catch(err => {
    console.warn(`Erreur lors de l'import de ${moduleName}:`, err);
  });
});
