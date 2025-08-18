import { productsData } from "./productsData.js";

export function init() {
  if (window.__categoryPageInitDone__) return;
  window.__categoryPageInitDone__ = true;

  const grid      = document.getElementById("productGrid");
  const empty     = document.getElementById("emptyState");
  const titleEl   = document.getElementById("categoryTitle");
  const metaEl    = document.getElementById("categoryMeta");
  const sortSelect= document.getElementById("sortSelect");

  if (!grid || !titleEl || !sortSelect) return;

  const slugify = (s) =>
    String(s).toLowerCase()
      .replace(/&/g, " and ")
      .replace(/\+/g, " ")                 
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const uniqueCategories = [...new Set(productsData.map(p => p.category))];
  const slugToPretty = uniqueCategories.reduce((acc, name) => {
    acc[slugify(name)] = name;
    return acc;
  }, {});

  const url = new URL(window.location.href);
  const rawParam = url.searchParams.get("category");

  const decodedParam = rawParam ? decodeURIComponent(rawParam).replace(/\+/g, " ") : null;

  const givenSlug = decodedParam ? slugify(decodedParam) : null;
  const categoryKnown = !!(givenSlug && slugToPretty[givenSlug]);

  const currentName = categoryKnown ? slugToPretty[givenSlug] : (decodedParam || "Unknown category");
  titleEl.textContent = categoryKnown ? currentName : "Category";

  const currentList = categoryKnown
    ? productsData.filter(p => slugify(p.category) === givenSlug)
    : [];

  function render(list) {
    if (!list.length) {
      grid.innerHTML = "";
      if (empty) empty.style.display = "block";
      if (metaEl) metaEl.textContent = `0 products found`;
      return;
    }
    if (empty) empty.style.display = "none";
    if (metaEl) metaEl.textContent = `${list.length} product${list.length > 1 ? "s" : ""} found`;

    grid.innerHTML = list.map(p => `
      <div class="product__item">
        <a href="${p.href}">
          <div class="inner">
            ${p.isNew ? '<span class="badge-new">New</span>' : ""}
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

  function sortAndRender() {
    const raw = (sortSelect.value || "").toLowerCase().trim();
    const sortType = raw === "newst" ? "newest" : raw;

    const list = [...currentList];
    if (sortType === "price-low") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortType === "price-high") {
      list.sort((a, b) => b.price - a.price);
    } else if (sortType === "newest") {
      list.sort((a, b) => {
        if (a.isNew !== b.isNew) return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        const ad = a.addedAt ? new Date(a.addedAt) : new Date(0);
        const bd = b.addedAt ? new Date(b.addedAt) : new Date(0);
        return bd - ad;
      });
    }
    render(list);
  }

  sortSelect.value = "newest";
  sortSelect.addEventListener("change", sortAndRender);

  document.querySelectorAll(".pill").forEach(pill => {
    const href = pill.getAttribute("href") || "";
    const m = href.match(/category=([^&]+)/);
    const pillSlug = m ? slugify(decodeURIComponent(m[1]).replace(/\+/g, " ")) : null;
    if (pillSlug && givenSlug && pillSlug === givenSlug) {
      pill.classList.add("active");
    } else {
      pill.classList.remove("active");
    }
  });

  sortAndRender();
}
