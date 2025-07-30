async function loadHTML(id, file, script) {
  try {
    const res = await fetch(file);
    const html = await res.text();
    const container = document.getElementById(id);
    container.innerHTML = html;

    if (script) {
      const module = await import(`./scripts/${script}?v=${Date.now()}`); 
      if (module && typeof module.init === 'function') {
        module.init();
      }
    }
  } catch (err) {
    console.error(`Erreur lors du chargement de ${file}:`, err);
  }
}

loadHTML("header", "sections/header.html", "header.js");
loadHTML("header", "sections/header.html", "search.js"); 
loadHTML("header", "sections/header.html", "navBottom.js"); 
loadHTML("footer", "sections/footer.html", "footer.js");

const modulesToInit = [
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
