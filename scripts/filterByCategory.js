export function init() {
  const productsData = [
    {
      name: "Brown Kraft Cards",
      image: "../assets/images/prime1.jpg",
      category: "Business Card",
      price: 20.90,
      href: "https://www.primeprint.net/store/product-view.html/105-Brown-Kraft-Cards",
      isNew: true,
      addedAt: "2025-08-01"
    },
    {
      name: "Banners with Stand",
      image: "../assets/images/prime2.jpg",
      category: "Displays",
      price: 119.98,
      href: "https://www.primeprint.net/store/product-view.html/31-Banners-With-Stand",
      isNew: true,
      addedAt: "2025-08-01"
    },
    {
      name: "Packaging",
      image: "../assets/images/prime1.jpg",
      category: "Specialty Products",
      price: 213.40,
      href: "https://www.primeprint.net/store/product-view.html/70-Packaging",
      isNew: false,
      addedAt: "2025-07-01"
    },
    {
      name: "Plastic Cards",
      image: "../assets/images/prime2.jpg",
      category: "Business Card",
      price: 167.60,
      href: "https://www.primeprint.net/store/product-view.html/73-Plastic-Cards",
      isNew: false,
      addedAt: "2025-07-01"
    },
    {
      name: "Flyers and Brochures",
      image: "../assets/images/prime1.jpg",
      category: "Marketing Products",
      price: 145.20,
      href: "https://www.primeprint.net/store/product-view.html/50-Flyers-And-Brochures",
      isNew: false,
      addedAt: "2025-07-01"
    },
  ];

  const productGrid = document.getElementById("productGrid");
  const filterBtns = document.querySelectorAll(".filter-btn");
  const sortSelect = document.getElementById("sortSelect");

  let currentCategory = "all";

  function displayProducts(data) {
    if (!productGrid) return;

    productGrid.innerHTML = data.map((product) => `
      <div class="product__item">
        <a href="${product.href}">
          <div class="inner">
            ${product.isNew ? '<span class="badge-new">New</span>' : ''}
            <img src="${product.image}" alt="${product.name}">
          </div>
          <div class="product__item__price">
            <p>From $${product.price.toFixed(2)} USD</p>
          </div>
          <div class="product__card">
            <h5>${product.name}</h5>
            <i class='bxr bx-arrow-up-right-stroke-circle'></i>
          </div>
        </a>
      </div>
    `).join("");
  }

  function applySort(data) {
    const sortType = (sortSelect?.value || "").trim();
    const sorted = [...data];

    switch (sortType) {
      case "price-low":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        sorted.sort((a, b) => {
          if (a.isNew !== b.isNew) return b.isNew - a.isNew;

          const aDate = a.addedAt ? new Date(a.addedAt) : new Date(0);
          const bDate = b.addedAt ? new Date(b.addedAt) : new Date(0);
          return bDate - aDate;
        });
        break;
      default:
        break;
    }

    displayProducts(sorted);
  }

  function applyFilter(category) {
    currentCategory = category;

    filterBtns.forEach((btn) => btn.classList.remove("active"));
    const activeBtn = document.querySelector(`[data-category="${category}"]`);
    if (activeBtn) activeBtn.classList.add("active");

    const filtered = category === "all"
      ? productsData
      : productsData.filter((p) => p.category === category);

    applySort(filtered);
  }

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const cat = btn.dataset.category || "all";
      applyFilter(cat);
    });
  });

  if (sortSelect) {
    sortSelect.addEventListener("change", () => {
      applyFilter(currentCategory);
    });
  }

  applyFilter("all");
}
