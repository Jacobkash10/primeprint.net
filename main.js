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

const modulesToInit = [
  'filterByCategory.js',
  'servicePage.js',
  'serviceDetails.js',
  'categoryPage.js',
  'productDetail.js'
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

