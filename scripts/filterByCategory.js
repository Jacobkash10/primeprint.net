import { productsData } from "./productsData.js";

export function init() {
  if (window.__catalogInitDone__) return;
  window.__catalogInitDone__ = true;

  const productGrid   = document.getElementById("productGrid");
  const paginationEl  = document.getElementById("pagination");
  const filterBtns    = document.querySelectorAll(".filter-btn");
  const sortSelect    = document.getElementById("sortSelect");

  if (!productGrid || !paginationEl || !sortSelect) return;

  let currentCategory = "all";
  let currentPage = 1;
  const pageSize = 12;

  const HEADER_OFFSET = 100;

  function scrollToGridTop() {
    const y = window.pageYOffset + productGrid.getBoundingClientRect().top - HEADER_OFFSET;
    window.scrollTo({ top: y, behavior: "smooth" });
  }

  function shuffleArray(array) {
    return array
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }

  function renderCards(data) {
    productGrid.innerHTML = data.map((p) => `
      <div class="product__item">
        <a href="product-detail.html?id=${p.id}">
          ${p.isNew ? '<span class="badge-new">New</span>' : ''}
          <div class="inner">
            <img src="${p.image}" alt="${p.name}">
          </div>
          <div class="product__item__price">
            <p>From $${p.price.toFixed(2)} USD</p>
          </div>
          <div class="product__card">
            <h5>${p.name}</h5>
            <i class='bxr bx-arrow-up-right-stroke-circle'></i>
          </div>
        </a>
      </div>
    `).join("");
  }

  function getSortType() {
    const raw = (sortSelect?.value || "").trim().toLowerCase();
    return raw === "newst" ? "newest" : raw;
  }

  function sortData(data, sortType) {
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
          if (a.isNew !== b.isNew) return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
          const ad = a.addedAt ? new Date(a.addedAt) : new Date(0);
          const bd = b.addedAt ? new Date(b.addedAt) : new Date(0);
          return bd - ad;
        });
        break;
      default:
        break;
    }
    return sorted;
  }

  function filterData(category) {
    return category === "all"
      ? productsData
      : productsData.filter(p => p.category === category);
  }

  function paginate(data, page, perPage) {
    const total = data.length;
    const totalPages = Math.max(1, Math.ceil(total / perPage));
    const safePage = Math.min(Math.max(1, page), totalPages);
    const start = (safePage - 1) * perPage;
    const end = start + perPage;
    return {
      pageItems: data.slice(start, end),
      totalPages,
      page: safePage,
      total
    };
  }

  function renderPagination({ totalPages, page }) {
    if (totalPages <= 1) {
      paginationEl.innerHTML = "";
      return;
    }

    const makeBtn = (label, p, disabled = false, active = false) => `
      <button class="page-btn ${active ? "active" : ""}" data-page="${p}" ${disabled ? "disabled" : ""}>
        ${label}
      </button>
    `;

    let html = "";
    html += makeBtn("«", 1, page === 1);
    html += makeBtn("‹", page - 1, page === 1);

    const windowSize = 7;
    let start = Math.max(1, page - Math.floor(windowSize / 2));
    let end = Math.min(totalPages, start + windowSize - 1);
    start = Math.max(1, end - windowSize + 1);

    if (start > 1) {
      html += makeBtn("1", 1, false, page === 1);
      if (start > 2) html += `<span class="ellipsis">…</span>`;
    }

    for (let p = start; p <= end; p++) {
      html += makeBtn(String(p), p, false, p === page);
    }

    if (end < totalPages) {
      if (end < totalPages - 1) html += `<span class="ellipsis">…</span>`;
      html += makeBtn(String(totalPages), totalPages, false, page === totalPages);
    }

    html += makeBtn("›", page + 1, page === totalPages);
    html += makeBtn("»", totalPages, page === totalPages);

    paginationEl.innerHTML = html;

    paginationEl.querySelectorAll(".page-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        currentPage = Number(btn.dataset.page);
        render();
        scrollToGridTop();
      });
    });
  }

  function render() {
    const sortType = getSortType();

    const filtered = filterData(currentCategory);

    const base = sortType ? [...filtered] : shuffleArray(filtered);

    const sorted = sortData(base, sortType);

    const { pageItems, totalPages, page } = paginate(sorted, currentPage, pageSize);

    renderCards(pageItems);
    renderPagination({ totalPages, page });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      currentCategory = btn.dataset.category || "all";
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentPage = 1;
      render();
      scrollToGridTop();
    });
  });

  sortSelect.addEventListener("change", () => {
    currentPage = 1;
    render();
    scrollToGridTop();
  });

  const firstActive = document.querySelector(".filter-btn.active");
  currentCategory = firstActive?.dataset.category || "all";
  currentPage = 1;
  render();
}
