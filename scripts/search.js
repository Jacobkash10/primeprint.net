export function init() {
  const products = [
    {
      name: "Brown Kraft Cards",
      category: "Business Cards Products",
      link: "https://www.primeprint.net/store/product-view.html/105-Brown-Kraft-Cards",
      image: "../assets/images/cat1.png"
    },
    {
      name: "Business Cards",
      category: "Business Cards Products",
      link: "https://www.primeprint.net/store/product-view.html/33-Business-Cards",
      image: "../assets/images/cat2.png"
    },
    {
      name: "EDGE Cards",
      category: "Business Cards Products",
      link: "https://www.primeprint.net/store/product-view.html/101-Edge-Cards",
      image: "../assets/images/cat3.png"
    },
    {
      name: "Postcards",
      category: "Marketing Products",
      link: "https://www.primeprint.net/store/product-view.html/74-Postcards",
      image: "../assets/images/cat4.png"
    },
    {
      name: "Booklets",
      category: "Marketing Products",
      link: "https://www.primeprint.net/store/product-view.html/97-Booklets",
      image: "../assets/images/cat1.png"
    },
    {
      name: "Announcement Cards",
      category: "Stationery Products",
      link: "https://www.primeprint.net/store/product-view.html/30-Announcement-Cards",
      image: "../assets/images/cat2.png"
    },
    {
      name: "Pearl Cards",
      category: "Stationery Products",
      link: "https://www.primeprint.net/store/product-view.html/72-Pearl-Cards",
      image: "../assets/images/cat3.png"
    },
    {
      name: "Event Tents",
      category: "Displays",
      link: "https://www.primeprint.net/store/product-view.html/293-Event-Tents",
      image: "../assets/images/cat4.png"
    }
  ];

  const categories = [
    { name: "Business Cards Products", link: "https://www.primeprint.net/store/category/business-cards" },
    { name: "Marketing Products", link: "https://www.primeprint.net/store/category/marketing" },
    { name: "Stationery Products", link: "https://www.primeprint.net/store/category/stationery" },
    { name: "Displays", link: "https://www.primeprint.net/store/category/displays" },
    { name: "Specialty Products", link: "https://www.primeprint.net/store/category/specialty" },
    { name: "Promo Products", link: "https://www.primeprint.net/store/category/promo" },
    { name: "Services", link: "https://www.primeprint.net/services" }
  ];

  // ✅ Gère toutes les barres de recherche (desktop et mobile)
  document.querySelectorAll(".search-wrapper, .search-wrapper-responsive").forEach(wrapper => {
    const input = wrapper.querySelector("[data-search-input]");
    const suggestionList = wrapper.querySelector("[data-suggestions]");

    if (!input || !suggestionList) return;

    input.addEventListener("input", () => {
      const query = input.value.toLowerCase().trim();
      suggestionList.innerHTML = "";

      if (!query) return;

      const filteredProducts = products.filter(p => p.name.toLowerCase().includes(query));
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
            <a href="${p.link}" class="suggestion-item">
              <img src="${p.image}" alt="${p.name}" />
              <span>${p.name}</span>
            </a>
          `;
          suggestionList.appendChild(li);
        });
      }
    });
  });

  // ✅ Mobile only: ouvrir/fermer la barre de recherche
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
}
