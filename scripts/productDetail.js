import { productsData } from "./productsData.js";

export function init() {
  const slugify = (s) =>
    String(s).toLowerCase()
      .replace(/&/g, " and ")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const url = new URL(location.href);
  const idParam = url.searchParams.get("id");

  const product =
    productsData.find(x => String(x.id) === String(idParam)) ||
    productsData.find(x => slugify(x.name) === slugify(idParam));

  const big     = document.getElementById("pdBig");
  const thumbs  = document.getElementById("pdThumbs");
  const title   = document.getElementById("pdTitle");
  const price   = document.getElementById("pdPrice");
  const desc    = document.getElementById("pdDesc");
  const buy     = document.getElementById("pdBuy");
  const notFound = document.getElementById("pdNotFound");

  if (!big || !thumbs || !title || !price || !desc || !buy) return;

  if (!product) {
    if (notFound) notFound.style.display = "block";
    document.querySelector(".pd-gallery")?.classList.add("hidden");
    document.querySelector(".pd-info")?.classList.add("hidden");
    return;
  }

  title.textContent = product.name;
  price.textContent = `$${Number(product.price).toFixed(2)} USD`;
  desc.textContent  = product.description || "";
  buy.href          = product.href || "#";

  const gallery = [product.image, ...(product.otherImages || [])].filter(Boolean);

  if (!gallery.length) {
    gallery.push("assets/images/placeholder.png");
  }

  const setBigImage = (src) => {
    const img = new Image();
    img.onload = () => {
      big.style.opacity = 0;
      big.src = src;
      big.alt = product.name;
      requestAnimationFrame(() => {
        setTimeout(() => (big.style.opacity = 1), 20);
      });
    };
    img.src = src;
  };

  setBigImage(gallery[0]);

  thumbs.innerHTML = gallery
    .map((src, i) => `
      <button class="pd-thumb ${i === 0 ? "active" : ""}" type="button" data-src="${src}" aria-label="Image ${i + 1}">
        <img src="${src}" alt="${product.name} ${i + 1}">
      </button>
    `)
    .join("");

  const thumbButtons = Array.from(thumbs.querySelectorAll(".pd-thumb"));
  const activateThumb = (btn) => {
    thumbButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    setBigImage(btn.dataset.src);
  };

  thumbButtons.forEach(btn => {
    btn.addEventListener("click", () => activateThumb(btn));
    btn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        activateThumb(btn);
      }
    });
  });

  let currentIndex = 0;
  const showAt = (idx) => {
    currentIndex = (idx + gallery.length) % gallery.length;
    activateThumb(thumbButtons[currentIndex]);
    thumbButtons[currentIndex].focus({ preventScroll: true });
  };

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") showAt(currentIndex + 1);
    if (e.key === "ArrowLeft")  showAt(currentIndex - 1);
  });

  let touchStartX = 0;
  big.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });

  big.addEventListener("touchend", (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 40) {
      showAt(dx < 0 ? currentIndex + 1 : currentIndex - 1);
    }
  });

  big.addEventListener("click", () => showAt(currentIndex + 1));
}
