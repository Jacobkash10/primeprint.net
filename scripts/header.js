export function init() {
  const menuItems = document.querySelectorAll(".nav-bottom li");
  const submenu = document.querySelector(".submenu");
  const submenuContent = document.getElementById("submenu-content");

  const menus = {
    majestic: `
      <div class="menu-column">
        <h4>Cards</h4>
        <a href="#">Business Cards</a>
        <a href="#">Plastic Cards</a>
      </div>
      <div class="menu-column">
        <h4>Promo</h4>
        <a href="#">Mugs</a>
        <a href="#">Shirts</a>
      </div>
    `,
    business: `
      <div class="menu-column">
        <h4>Business Cards</h4>
        <a href="#">Classic</a>
        <a href="#">Premium</a>
      </div>
    `,
    marketing: `
      <div class="menu-column">
        <h4>Marketing</h4>
        <a href="#">Flyers</a>
        <a href="#">Postcards</a>
      </div>
    `,
    // Ajoute ici d'autres sections si nécessaire
  };

  menuItems.forEach(item => {
    const key = item.getAttribute("data-menu");
    if (!key) return;

    if (item.classList.contains("click-toggle")) {
      // Clic pour le premier élément
      item.addEventListener("click", (e) => {
        e.stopPropagation();
        submenuContent.innerHTML = menus[key] || "";
        submenu.style.display = submenu.style.display === "block" ? "none" : "block";
      });
    } else {
      // Hover pour les autres
      item.addEventListener("mouseenter", () => {
        submenuContent.innerHTML = menus[key] || "";
        submenu.style.display = "block";
      });
    }
  });

  // Ferme si on clique en dehors
  document.addEventListener("click", () => {
    submenu.style.display = "none";
  });

  // Garde ouvert si on est dessus
  submenu.addEventListener("mouseenter", () => {
    submenu.style.display = "block";
  });

  submenu.addEventListener("mouseleave", () => {
    submenu.style.display = "none";
  });

// --- Mobile slide-in logic for .nav-center ---
const burger = document.querySelector(".burger-toggle");
const navCenter = document.querySelector(".nav-center");
const closeMenu = navCenter?.querySelector(".close-menu");

if (burger && navCenter) {
  burger.addEventListener("click", (e) => {
    e.stopPropagation();
    navCenter.classList.add("open");
    navCenter.style.display = "flex";
  });
}

if (closeMenu && navCenter) {
  closeMenu.addEventListener("click", () => {
    navCenter.classList.remove("open");
  });
}

document.addEventListener("click", (e) => {
  if (
    navCenter?.classList.contains("open") &&
    !navCenter.contains(e.target) &&
    !burger.contains(e.target)
  ) {
    navCenter.classList.remove("open");
  }
});

}
