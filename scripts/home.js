import { productsData } from "./productsData.js";

export function init() {

const container = document.querySelector('.works__content');
  if (!container) return;

  const imgNodes = container.querySelectorAll('img');
  if (!imgNodes.length) return;

  
  const sources = Array.from(imgNodes).map(img => img.getAttribute('src'));

  
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lbImage');
  const btnClose = document.getElementById('lbClose');
  const btnPrev = document.getElementById('lbPrev');
  const btnNext = document.getElementById('lbNext');

  let index = 0;
  let touchStartX = 0;

  function openAt(i) {
    index = ((i % sources.length) + sources.length) % sources.length;
    lbImg.src = sources[index];
    lb.classList.add('open');
    document.body.classList.add('lb-no-scroll');
    lb.setAttribute('aria-hidden', 'false');
  }

  function close() {
    lb.classList.remove('open');
    document.body.classList.remove('lb-no-scroll');
    lb.setAttribute('aria-hidden', 'true');
  }

  function showNext(delta = 1) {
    index = (index + delta + sources.length) % sources.length;
    lbImg.style.animation = 'none';
    requestAnimationFrame(() => {
      lbImg.src = sources[index];
      lbImg.style.animation = 'lbIn .2s ease';
    });
  }


  imgNodes.forEach((img, i) => {
    const anchor = img.closest('a');
    (anchor || img).addEventListener('click', (e) => {
      e.preventDefault();
      openAt(i);
    });
  });

  
  btnClose.addEventListener('click', close);
  btnPrev.addEventListener('click', () => showNext(-1));
  btnNext.addEventListener('click', () => showNext(+1));

  
  lb.addEventListener('click', (e) => {
    if (e.target === lb) close();
  });

  
  document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') showNext(+1);
    if (e.key === 'ArrowLeft') showNext(-1);
  });

  
  lb.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });

  lb.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 40) {
      showNext(dx < 0 ? +1 : -1);
    }
  });

  setTimeout(() => {
    const slider = document.querySelector(".our__content");
    const prevBtn = document.querySelector(".slide-btn.prev");
    const nextBtn = document.querySelector(".slide-btn.next");

    if (!slider || !prevBtn || !nextBtn) {
      console.warn("Slider elements not found");
      return;
    }

    let index = 0;
    const GAP = 20;
    const items = slider.querySelectorAll(".our__item");

    const getItemWidth = () =>
      items[0].getBoundingClientRect().width + GAP;

    const goTo = (i) => {
      const totalItems = items.length;
      const maxIndex = totalItems - 1;

      index = Math.max(0, Math.min(i, maxIndex));
      const offset = index * getItemWidth();
      slider.style.transform = `translateX(-${offset}px)`;

      prevBtn.disabled = index === 0;
      nextBtn.disabled = index === maxIndex;
    };

    prevBtn.addEventListener("click", () => {
      goTo(index - 1);
    });

    nextBtn.addEventListener("click", () => {
      goTo(index + 1);
    });

    window.addEventListener("resize", () => goTo(index));
    goTo(0);

    let autoplayInterval = setInterval(() => {
      const maxIndex = items.length - 1;

      if (index < maxIndex) {
        goTo(index + 1);
      } else {
        goTo(0);
      }
    }, 7000);
  }, 50);

  const container2 = document.getElementById("homeProducts");

  if (!container2) return;

  const featured = productsData.slice(0, 8);

  container2.innerHTML = featured
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