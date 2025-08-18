import { productsData } from "./productsData.js";

export function init() {

  const categories = [
    { name: "Business Cards", link: "https://www.primeprint.net/store/category/business-cards" },
    { name: "Marketing Products", link: "https://www.primeprint.net/store/category/marketing" },
    { name: "Stationery Products", link: "https://www.primeprint.net/store/category/stationery" },
    { name: "Displays", link: "https://www.primeprint.net/store/category/displays" },
    { name: "Specialty Products", link: "https://www.primeprint.net/store/category/specialty" },
    { name: "Promo Products", link: "https://www.primeprint.net/store/category/promo" },
    { name: "Services", link: "https://www.primeprint.net/services" }
  ];

  document.querySelectorAll(".search-wrapper, .search-wrapper-responsive").forEach(wrapper => {
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
            <a href="${p.href}" class="suggestion-item">
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
}
