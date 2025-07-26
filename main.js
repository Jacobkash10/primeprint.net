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

import('./scripts/navBottom.js').then(module => {
  if (module && typeof module.init === 'function') {
    module.init();
  }
});

import('./scripts/services.js').then(module => {
  if (module && typeof module.init === 'function') {
    module.init();
  }
});

import('./scripts/our.js').then(module => {
  if (module && typeof module.init === 'function') {
    module.init();
  }
});

import('./scripts/filterByCategory.js').then(module => {
  if (module && typeof module.init === 'function') {
    module.init();
  }
});

import('./scripts/servicePage.js').then(module => {
  if (module && typeof module.init === 'function') {
    module.init();
  }
});

import('./scripts/serviceDetails.js').then(module => {
  if (module && typeof module.init === 'function') {
    module.init();
  }
});

loadHTML("header", "sections/header.html", "header.js");
loadHTML("footer", "sections/footer.html", "footer.js");
