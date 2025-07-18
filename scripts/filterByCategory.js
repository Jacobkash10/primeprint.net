export function init() {
const productsData = [
  {
    name: "Brown Kraft Cards",
    image: "../assets/images/prime1.jpg",
    category: "Business Card",
    price: 20.90,
    href: "https://www.primeprint.net/store/product-view.html/105-Brown-Kraft-Cards"
  },
  {
    name: "Banners with Stand",
    image: "../assets/images/prime2.jpg",
    category: "Displays",
    price: 119.98,
    href: "https://www.primeprint.net/store/product-view.html/31-Banners-With-Stand"
  },
  {
    name: "Packaging",
    image: "../assets/images/prime1.jpg",
    category: "Specialty Products",
    price: 213.40,
    href: "https://www.primeprint.net/store/product-view.html/70-Packaging"
  },
  {
    name: "Plastic Cards",
    image: "../assets/images/prime2.jpg",
    category: "Business Card",
    price: 167.60,
    href: "https://www.primeprint.net/store/product-view.html/73-Plastic-Cards"
  },
  {
    name: "Flyers and Brochures",
    image: "../assets/images/prime1.jpg",
    category: "Marketing Products",
    price: 145.20,
    href: "https://www.primeprint.net/store/product-view.html/50-Flyers-And-Brochures"
  },
];

const productGrid = document.getElementById("productGrid");
const filterBtns = document.querySelectorAll(".filter-btn");
const sortSelect = document.getElementById("sortSelect");

function displayProducts(data) {
  productGrid.innerHTML = data
    .map(
      (product) => `
                        <div class="product__item">
                              <a href="${product.href}">
                                    <div class="inner">
                                          <img src="${product.image}" alt="${product.name}">
                                    </div>
                                    <div class="product__item__price">
                                          <p>From $${product.price},00 USD</p>
                                    </div>
                                    <div class="product__card">
                                          <h5>${product.name}</h5>
                                          <i class='bxr  bx-arrow-up-right-stroke-circle'  ></i> 
                                    </div>
                              </a>
                        </div>`
      )
    .join("");
}

function applyFilter(category) {
  filterBtns.forEach((btn) => btn.classList.remove("active"));
  document.querySelector(`[data-category="${category}"]`).classList.add("active");

  let filtered = category === "all" ? productsData : productsData.filter((p) => p.category === category);
  applySort(filtered);
}

function applySort(data) {
  const sortType = sortSelect.value;
  let sorted = [...data];

  if (sortType === "price-low") {
    sorted.sort((a, b) => a.price - b.price);
  } else if (sortType === "price-high") {
    sorted.sort((a, b) => b.price - a.price);
  }

  displayProducts(sorted);
}

// Event Listeners
filterBtns.forEach((btn) =>
  btn.addEventListener("click", () => {
    applyFilter(btn.dataset.category);
  })
);

sortSelect.addEventListener("change", () => {
  const activeBtn = document.querySelector(".filter-btn.active");
  applyFilter(activeBtn.dataset.category);
});

// Initial Load
applyFilter("all");

}