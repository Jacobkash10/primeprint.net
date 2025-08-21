import { productsData } from "./productsData.js";

export function init() {
  const container = document.getElementById("homeProducts");

  if (!container) return;

  const featured = productsData.slice(0, 8);

  container.innerHTML = featured
    .map(
      (p) => `
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
    `
    )
    .join("");
}
