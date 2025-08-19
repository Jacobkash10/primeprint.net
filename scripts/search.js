import { productsData } from "./productsData.js";

export function init() {

  const categories = [
    { name: "Business Cards", link: "category.html?category=Business%20Cards" },
    { name: "Marketing Products", link: "category.html?category=Marketing%20Products" },
    { name: "Stationery Products", link: "category.html?category=Stationery%20Products" },
    { name: "Signs & Posters", link: "category.html?category=Signs%20%26%20Posters" },
    { name: "Displays", link: "category.html?category=Displays" },
    { name: "Specialty Products", link: "category.html?category=Specialty%20Products" },
    { name: "Promotional Item", link: "category.html?category=Promotional%20Item" },
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
}
