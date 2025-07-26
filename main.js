async function loadHTML(id, file, script) {
  try {
    const res = await fetch(file);
    const html = await res.text();
    document.getElementById(id).innerHTML = html;

    if (script) {
      const module = await import(`./scripts/${script}`);
      if (module && typeof module.init === 'function') {
        module.init();
      }
    }
  } catch (err) {
    console.error(`Erreur lors du chargement de ${file}:`, err);
  }
}

loadHTML("header", "sections/header.html", "header.js");
loadHTML("footer", "sections/footer.html", "footer.js");

const modulesToInit = [
  'search.js',
  'navBottom.js',
  'services.js',
  'our.js',
  'filterByCategory.js',
  'servicePage.js',
  'serviceDetails.js'
];

modulesToInit.forEach(moduleName => {
  import(`./scripts/${moduleName}`).then(module => {
    if (module && typeof module.init === 'function') {
      module.init();
    }
  }).catch(err => {
    console.warn(`Erreur lors de l'import de ${moduleName}:`, err);
  });
});
