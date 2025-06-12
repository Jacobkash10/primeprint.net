async function loadHTML(id, file, script) {
  try {
    const res = await fetch(file);
    const html = await res.text();
    document.getElementById(id).innerHTML = html;

    if (script) {
      // Charger dynamiquement un fichier JS après HTML
      const module = await import(`./scripts/${script}`);
      if (module && typeof module.init === 'function') {
        module.init(); // Appelle la fonction init du module
      }
    }
  } catch (err) {
    console.error(`Erreur lors du chargement de ${file}:`, err);
  }
}

// Appels : id, html, script JS correspondant
loadHTML("header", "sections/header.html", "header.js");
loadHTML("hero", "sections/hero.html", "hero.js");
loadHTML("badges", "sections/badges.html", "badges.js");
loadHTML("services", "sections/services.html", "services.js");
loadHTML("passport", "sections/passport.html", "passport.js");
loadHTML("prime", "sections/prime.html", "prime.js");
loadHTML("our", "sections/our.html", "our.js");
