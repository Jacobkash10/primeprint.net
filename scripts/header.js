import { productsData } from "./productsData.js";

export function init() {
  const menuItems = document.querySelectorAll(".nav-bottom li");
  const submenu = document.querySelector(".submenu");
  const submenuContent = document.getElementById("submenu-content");

  let hideTimeout;

  const menus = {
  majestic: `
    <div class="menu-column">
      <h4>Business Cards Products</h4>
      <a href="product-detail.html?id=1">Brown Kraft Cards</a>
      <a href="product-detail.html?id=2">Business Cards</a>
      <a href="product-detail.html?id=3">EDGE Cards</a>
      <a href="product-detail.html?id=4">Hot Foil</a>
      <a href="product-detail.html?id=5">Inline Foil</a>
      <a href="product-detail.html?id=6">Linen Uncoated</a>
      <a href="product-detail.html?id=7">Painted Edge Cards</a>
      <a href="product-detail.html?id=8">Plastic Cards</a>
      <a href="product-detail.html?id=9">Raised Foil</a>
      <a href="product-detail.html?id=10">Raised Spot UV</a>
      <a href="product-detail.html?id=11">Silk Cards</a>
      <a href="product-detail.html?id=12">Suede Cards</a>
      <a href="product-detail.html?id=13">Waterproof</a>
    </div>
    <div class="menu-column">
      <h4>Marketing Products</h4>
      <a href="product-detail.html?id=14">Booklets</a>
      <a href="product-detail.html?id=15">Calendars</a>
      <a href="product-detail.html?id=16">CD and DVD</a>
      <a href="product-detail.html?id=17">Catalogs</a>
      <a href="product-detail.html?id=18">Door Hangers</a>
      <a href="product-detail.html?id=19">Event Tickets</a>
      <a href="product-detail.html?id=20">Flyers and Brochures</a>
      <a href="product-detail.html?id=21">Hang Tags</a>
      <a href="product-detail.html?id=22">Header Cards</a>
      <a href="product-detail.html?id=23">Magnets</a>
      <a href="product-detail.html?id=24">Menus</a>
      <a href="product-detail.html?id=25">Postcards</a>
      <a href="product-detail.html?id=26">Presentation Folders</a>
      <a href="product-detail.html?id=27">Rack Cards</a>
      <a href="product-detail.html?id=28">Roll Labels</a>
      <a href="product-detail.html?id=29">Sell Sheets</a>
      <a href="product-detail.html?id=30">Stickers</a>
      <a href="product-detail.html?id=31">Tear Off Cards</a>
      <a href="product-detail.html?id=32">Trading Cards</a>
    </div>
    <div class="menu-column">
      <h4>Stationery Products</h4>
      <a href="product-detail.html?id=33">Announcement Cards</a>
      <a href="product-detail.html?id=34">Envelope</a>
      <a href="product-detail.html?id=35">Greeting Cards</a>
      <a href="product-detail.html?id=36">Letterhead</a>
      <a href="product-detail.html?id=37">NCR Forms</a>
      <a href="product-detail.html?id=38">Natural Cards</a>
      <a href="product-detail.html?id=39">Notepads</a>
      <a href="product-detail.html?id=40">Pearl Cards</a>
    </div>
    <div class="menu-column">
      <h4>Signs & Posters</h4>
      <a href="product-detail.html?id=41">Adhesive Vinyl</a>
      <a href="product-detail.html?id=42">Car Magnets</a>
      <a href="product-detail.html?id=43">Fabric Banners</a>
      <a href="product-detail.html?id=44">Indoor Banners</a>
      <a href="product-detail.html?id=45">Large Posters</a>
      <a href="product-detail.html?id=46">Outdoor Banners</a>
      <a href="product-detail.html?id=47">Posters</a>
      <a href="product-detail.html?id=48">Sidewalk Signs</a>
      <a href="product-detail.html?id=49">Signs</a>
      <a href="product-detail.html?id=50">Window Clings</a>
      <a href="product-detail.html?id=51">Window Graphics</a>
    </div>
    <div class="menu-column">
      <h4>Displays</h4>
      <a href="product-detail.html?id=52">Banners with Stand</a>
      <a href="product-detail.html?id=53">Counter Cards</a>
      <a href="product-detail.html?id=54">Displays</a>
      <a href="product-detail.html?id=55">Event Tents</a>
      <a href="product-detail.html?id=56">Flags</a>
      <a href="product-detail.html?id=57">Table Covers</a>
      <a href="product-detail.html?id=58">Table Tent Cards</a>
    </div>
    <div class="menu-column">
      <h4>Specialty Products</h4>
      <a href="product-detail.html?id=59">Mounted Canvas</a>
      <a href="product-detail.html?id=60">Packaging</a>
      <a href="product-detail.html?id=61">Passport Photos</a>
    </div>
    <div class="menu-column">
      <h4>Promotional Items</h4>
      <a href="product-detail.html?id=62">Buttons</a>
      <a href="product-detail.html?id=63">Mugs</a>
      <a href="product-detail.html?id=64">T-Shirts</a>
      <a href="product-detail.html?id=65">Tote Bags</a>
    </div>
  `,
};


  menuItems.forEach(item => {
    const key = item.getAttribute("data-menu");
    if (!key) return;

    const showSubmenu = () => {
      clearTimeout(hideTimeout);
      submenuContent.innerHTML = menus[key] || "";
      submenu.classList.add("visible");
    };

    const hideSubmenu = () => {
      hideTimeout = setTimeout(() => {
        submenu.classList.remove("visible");
      }, 200);
    };

    if (item.classList.contains("click-toggle")) {
      item.addEventListener("click", (e) => {
        e.stopPropagation();
        const isVisible = submenu.classList.contains("visible");
        submenuContent.innerHTML = menus[key] || "";
        submenu.classList.toggle("visible", !isVisible);
      });
    } else {
      item.addEventListener("mouseenter", showSubmenu);
      item.addEventListener("mouseleave", hideSubmenu);
    }

    submenu.addEventListener("mouseenter", () => clearTimeout(hideTimeout));
    submenu.addEventListener("mouseleave", hideSubmenu);
  });

  document.addEventListener("click", (e) => {
    if (!submenu.contains(e.target)) {
      submenu.classList.remove("visible");
    }
  });

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

const slides = document.querySelectorAll(".promo__slider h5");
if (slides.length) {
  let current = 0;
  const showSlide = (index) => {
    slides.forEach((slide, i) => slide.classList.toggle("active", i === index));
  };
  showSlide(current);
  setInterval(() => {
    current = (current + 1) % slides.length;
    showSlide(current);
  }, 8000);
}

function computeActive(link, currentURL) {
  const cur = currentURL || new URL(window.location.href);
  const curPath = cur.pathname.replace(/\/+$/, '');
  const curFile = curPath.split('/').pop() || 'index.html';
  const curCat  = cur.searchParams.get('category');

  const linkURL = new URL(link.getAttribute('href'), window.location.href);
  const linkPath = linkURL.pathname.replace(/\/+$/, '');
  const linkFile = linkPath.split('/').pop() || 'index.html';
  const linkCat  = linkURL.searchParams.get('category');

  if (curFile === 'category.html' && linkFile === 'category.html') {
    if (curCat && linkCat && decodeURIComponent(curCat) === decodeURIComponent(linkCat)) return true;
    return false;
  }
  return linkFile === curFile;
}

function setActiveClasses() {
  const currentURL = new URL(window.location.href);
  const allLinks = document.querySelectorAll('.nav-menu a, .respo-nav-menu a');

  allLinks.forEach(link => {
    const isActive = computeActive(link, currentURL);
    const li = link.closest('li');
    link.classList.toggle('active', isActive);
    if (li) li.classList.toggle('active', isActive);
  });
}

setActiveClasses();

window.addEventListener('load', setActiveClasses);

const headerHost = document.getElementById('header') || document.body;
const mo = new MutationObserver(() => setActiveClasses());
mo.observe(headerHost, { childList: true, subtree: true });

function bindOptimisticClick() {
  const allLinks = document.querySelectorAll('.nav-menu a, .respo-nav-menu a');
  allLinks.forEach(link => {
    link.addEventListener('click', () => {
      document.querySelectorAll('.nav-menu a.active, .respo-nav-menu a.active').forEach(a => {
        a.classList.remove('active');
        a.closest('li')?.classList.remove('active');
      });
      link.classList.add('active');
      link.closest('li')?.classList.add('active');
    }, { capture: true });
  });
}
bindOptimisticClick();

const moLinks = new MutationObserver(() => bindOptimisticClick());
moLinks.observe(document.querySelector('.nav-bottom') || document.body, { childList: true, subtree: true });

  // Responsive Nav Bottom
  const resMenuItems = document.querySelectorAll(".responsive-nav-bottom li");
  const resSubmenu = document.querySelector(".respo-submenu");
  const resSubmenuContent = document.getElementById("respo-submenu-content");

  resMenuItems.forEach(item => {
    const key = item.getAttribute("data-menu");
    if (!key) return;

    const showSubmenu = () => {
      clearTimeout(hideTimeout);
      resSubmenuContent.innerHTML = menus[key] || "";
      resSubmenu.classList.add("visible");
    };

    const hideSubmenu = () => {
      hideTimeout = setTimeout(() => {
        resSubmenu.classList.remove("visible");
      }, 200);
    };

    if (item.classList.contains("click-toggles")) {
      item.addEventListener("click", (e) => {
        e.stopPropagation();
        const isVisible = resSubmenu.classList.contains("visible");
        resSubmenuContent.innerHTML = menus[key] || "";
        resSubmenu.classList.toggle("visible", !isVisible);
      });
    } else {
      item.addEventListener("mouseenter", showSubmenu);
      item.addEventListener("mouseleave", hideSubmenu);
    }

    resSubmenu.addEventListener("mouseenter", () => clearTimeout(hideTimeout));
    resSubmenu.addEventListener("mouseleave", hideSubmenu);
  });

  document.addEventListener("click", (e) => {
    if (!resSubmenu.contains(e.target)) {
      resSubmenu.classList.remove("visible");
    }
  });

  // Search Functionality
  const categories = [
    { name: "Business Cards", link: "category.html?category=Business%20Cards" },
    { name: "Marketing Products", link: "category.html?category=Marketing%20Products" },
    { name: "Stationery Products", link: "category.html?category=Stationery%20Products" },
    { name: "Signs & Posters", link: "category.html?category=Signs%20%26%20Posters" },
    { name: "Displays", link: "category.html?category=Displays" },
    { name: "Specialty Products", link: "category.html?category=Specialty%20Products" },
    { name: "Promotional Item", link: "category.html?category=Promotional%20Item" },
  ];

  document.querySelectorAll(".search-wrapper, .search-wrapper-responsive, .search-wrapper-category").forEach(wrapper => {
    const input = wrapper.querySelector("[data-search-input]");
    const suggestionList = wrapper.querySelector("[data-suggestions]");

    if (!input || !suggestionList) return;

    input.addEventListener("input", () => {
      const query = input.value.toLowerCase().trim();
      suggestionList.innerHTML = "";

      if (!query) return;

      const filteredProducts = productsData.filter(p => p.name.toLowerCase().includes(query));
      const filteredCategories = categories.filter(c => c.name.toLowerCase().includes(query));

      if (filteredProducts.length === 0 && filteredCategories.length === 0) {
        suggestionList.innerHTML = `<li>No results found</li>`;
        return;
      }

      if (filteredCategories.length > 0) {
        const title = document.createElement("li");
        title.innerHTML = "<strong>Categories</strong>";
        suggestionList.appendChild(title);

        filteredCategories.forEach(c => {
          const li = document.createElement("li");
          li.innerHTML = `<a href="${c.link}">${c.name}</a>`;
          suggestionList.appendChild(li);
        });
      }

      if (filteredProducts.length > 0) {
        const title = document.createElement("li");
        title.innerHTML = "<strong>Products</strong>";
        title.style.paddingTop = "0.5rem";
        suggestionList.appendChild(title);

        filteredProducts.forEach(p => {
          const li = document.createElement("li");
          li.innerHTML = `
            <a href="product-detail.html?id=${p.id}" class="suggestion-item">
              <img src="${p.image}" alt="${p.name}" />
              <span>${p.name}</span>
            </a>
          `;
          suggestionList.appendChild(li);
        });
      }
    });
  });

  // Mobile
  const openBtn = document.querySelector("[data-open-search]");
  const closeBtn = document.querySelector("[data-close-search]");
  const mobileContainer = document.querySelector(".search-wrapper-responsive .search-bar-container");

  if (openBtn && closeBtn && mobileContainer) {
    openBtn.addEventListener("click", () => {
      mobileContainer.classList.add("show");
      const input = mobileContainer.querySelector("[data-search-input]");
      if (input) input.focus();
    });

    closeBtn.addEventListener("click", () => {
      mobileContainer.classList.remove("show");
      const input = mobileContainer.querySelector("[data-search-input]");
      const suggestionList = mobileContainer.querySelector("[data-suggestions]");
      if (input) input.value = "";
      if (suggestionList) suggestionList.innerHTML = "";
    });
  }

  // auth
    const isLoggedIn = localStorage.getItem("userLogged") === "true";

    const signInBlocks = document.querySelectorAll(".signin-block");
    const loggedBlocks = document.querySelectorAll(".logged-block");

    if (isLoggedIn) {
        // Cacher tous les "Sign In"
        signInBlocks.forEach(el => el.style.display = "none");
        // Afficher tous les blocs logged (desktop + mobile)
        loggedBlocks.forEach(el => el.style.display = "flex");
    } else {
        signInBlocks.forEach(el => el.style.display = "flex");
        loggedBlocks.forEach(el => el.style.display = "none");
    }

    // Gestion des dropdowns (pour chaque user-dropdown)
    document.querySelectorAll(".user-dropdown").forEach(dropdown => {
        const btn = dropdown.querySelector(".user-btn");
        const menu = dropdown.querySelector(".dropdown-menu");

        if (!btn || !menu) return;

        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            dropdown.classList.toggle("open");
        });
    });

    document.addEventListener("click", () => {
        document.querySelectorAll(".user-dropdown.open").forEach(d => {
            d.classList.remove("open");
        });
    });

    document.querySelectorAll("#logout-btn, #logout-btn-desktop, #logout-btn-mobile").forEach(btn => {
        if (!btn) return;
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.removeItem("userLogged");
            window.location.reload();
        });
    });
}
