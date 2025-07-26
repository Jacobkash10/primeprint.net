export function init() {
  const burgerToggle = document.querySelector(".burger-toggles");
  const navMenu = document.querySelector(".nav-menu");
  const submenu = document.querySelector(".submenu");

  if (!burgerToggle || !navMenu) return;

  burgerToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    navMenu.classList.toggle("open");
    burgerToggle.classList.toggle("active");
  });

  document.addEventListener("click", (e) => {
    if (!navMenu.contains(e.target) && !burgerToggle.contains(e.target)) {
      navMenu.classList.remove("open");
      burgerToggle.classList.remove("active");
    }

    if (!submenu.contains(e.target)) {
      submenu.classList.remove("visible");
    }
  });
}
