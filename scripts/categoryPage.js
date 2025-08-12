export function init() {
  const grid = document.getElementById('productGrid');
  const empty = document.getElementById('emptyState');
  const titleEl = document.getElementById('categoryTitle');
  const metaEl = document.getElementById('categoryMeta');
  const sortSelect = document.getElementById('sortSelect');

  if (!grid || !titleEl || !sortSelect) return;

  const productsData = [
    {
      name: "Brown Kraft Cards",
      image: "../assets/images/prime1.jpg",
      category: "Business Cards",
      price: 20.90,
      href: "https://www.primeprint.net/store/product-view.html/105-Brown-Kraft-Cards",
      isNew: true, addedAt: "2025-08-01"
    },
    {
      name: "Banners with Stand",
      image: "../assets/images/prime2.jpg",
      category: "Displays",
      price: 119.98,
      href: "https://www.primeprint.net/store/product-view.html/31-Banners-With-Stand",
      isNew: true, addedAt: "2025-08-02"
    },
    {
      name: "Packaging",
      image: "../assets/images/prime1.jpg",
      category: "Specialty Products",
      price: 213.40,
      href: "https://www.primeprint.net/store/product-view.html/70-Packaging",
      isNew: false, addedAt: "2025-07-01"
    },
    {
      name: "Plastic Cards",
      image: "../assets/images/prime2.jpg",
      category: "Business Cards",
      price: 167.60,
      href: "https://www.primeprint.net/store/product-view.html/73-Plastic-Cards",
      isNew: false, addedAt: "2025-07-05"
    },
    {
      name: "Flyers and Brochures",
      image: "../assets/images/prime1.jpg",
      category: "Marketing Products",
      price: 145.20,
      href: "https://www.primeprint.net/store/product-view.html/50-Flyers-And-Brochures",
      isNew: false, addedAt: "2025-07-10"
    },
  ];

  const slugify = (s) => s.toLowerCase()
    .replace(/&/g,' and ')
    .replace(/[^a-z0-9]+/g,'-')
    .replace(/^-+|-+$/g,'');

  const prettyFromSlug = (slug) => {
    const map = [
      "Business Cards",
      "Marketing Products",
      "Stationery Products",
      "Signs & Posters",
      "Displays",
      "Specialty Products",
      "Promo Products",
      "All"
    ].reduce((acc, name) => (acc[slugify(name)] = name, acc), {});
    return map[slug] || slug.replace(/-/g,' ');
  };

  const url = new URL(window.location.href);
  const raw = url.searchParams.get('category') || 'all';
  const isAll = raw.toLowerCase() === 'all';

  const currentSlug = slugify(raw);
  const currentName = isAll ? 'All' : prettyFromSlug(currentSlug);

  titleEl.textContent = isAll ? 'All Products' : currentName;

  let currentList = isAll
    ? [...productsData]
    : productsData.filter(p => slugify(p.category) === currentSlug);

  metaEl.textContent = `${currentList.length} product${currentList.length>1?'s':''} found`;

  function render(list) {
    if (!list.length) {
      grid.innerHTML = '';
      empty.style.display = 'block';
      metaEl.textContent = `0 products found`;
      return;
    }
    empty.style.display = 'none';
    metaEl.textContent = `${list.length} product${list.length>1?'s':''} found`;

    grid.innerHTML = list.map(p => `
      
      <div class="product__item">
        <a href="${p.href}">
          <div class="inner">
            ${p.isNew ? '<span class="badge-new">New</span>' : ''}
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
    `).join('');
  }

  // ——— tri ———
  function sortAndRender() {
    const sortType = sortSelect.value;
    const list = [...currentList];
    if (sortType === 'price-low') {
      list.sort((a,b) => a.price - b.price);
    } else if (sortType === 'price-high') {
      list.sort((a,b) => b.price - a.price);
    } else if (sortType === 'newest') {
      list.sort((a,b) => {
        const aBoost = a.isNew ? 1 : 0;
        const bBoost = b.isNew ? 1 : 0;
        if (aBoost !== bBoost) return bBoost - aBoost;
        const aDate = a.addedAt ? new Date(a.addedAt) : new Date(0);
        const bDate = b.addedAt ? new Date(b.addedAt) : new Date(0);
        return bDate - aDate;
      });
    }
    render(list);
  }

  sortSelect.addEventListener('change', sortAndRender);

  const pillCurrent = document.querySelector('.pill[data-cat="current"]');
  const pillAll = document.querySelector('.pill[href*="category=all"]');
  if (isAll) {
    pillCurrent?.classList.remove('active');
    pillAll?.classList.add('active');
  } else {
    pillCurrent?.classList.add('active');
    pillAll?.classList.remove('active');
  }

  sortSelect.value = 'newest';
  sortAndRender();
}
