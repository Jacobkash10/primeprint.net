// export function init() {
//   const slider = document.getElementById("slider");
//   const btnNext = document.querySelector(".slider-btn.next");
//   const btnPrev = document.querySelector(".slider-btn.prev");

//   if (!slider || !btnNext || !btnPrev) return;

//   const GAP = 20;
//   let index = 0;

//   const getItemWidth = () =>
//     slider.querySelector(".service__item").getBoundingClientRect().width + GAP;

//   const goTo = (i) => {
//     const maxIndex = slider.children.length - 2; 
//     index = Math.max(0, Math.min(i, maxIndex));
//     const offset = index * getItemWidth();
//     slider.style.transform = `translateX(-${offset}px)`;
//     btnPrev.disabled = index === 0;
//     btnNext.disabled = index === maxIndex;
//   };

//   btnNext.addEventListener("click", () => {
//     clearInterval(autoplayInterval);
//     goTo(index + 1);
//   });

//   btnPrev.addEventListener("click", () => {
//     clearInterval(autoplayInterval);
//     goTo(index - 1);
//   });

//   window.addEventListener("resize", () => goTo(index));

//   goTo(0);

//   const autoplayInterval = setInterval(() => {
//     const maxIndex = slider.children.length - 2;
//     goTo(index < maxIndex ? index + 1 : 0);
//   }, 3000);
// }

export function init() {
  const slider = document.getElementById("slider");
  const btnNext = document.querySelector(".slider-btn.next");
  const btnPrev = document.querySelector(".slider-btn.prev");

  if (!slider || !btnNext || !btnPrev) return;

  const GAP = 20;
  const ITEMS_VISIBLE = 2;
  const SCROLL_BY = 2;
  const AUTOPLAY_INTERVAL = 4000;

  let index = 0;

  const originalItems = Array.from(slider.children);
  originalItems.slice(0, SCROLL_BY).forEach(item => {
    const clone = item.cloneNode(true);
    clone.classList.add("clone");
    slider.appendChild(clone);
  });

  const getItemWidth = () =>
    slider.querySelector(".service__item").getBoundingClientRect().width + GAP;

  const goTo = (i) => {
    const totalItems = slider.children.length;
    const itemWidth = getItemWidth();
    index = i;

    slider.style.transition = "transform 0.4s ease";
    slider.style.transform = `translateX(-${index * itemWidth}px)`;

    if (index >= originalItems.length) {
      setTimeout(() => {
        slider.style.transition = "none";
        index = 0;
        slider.style.transform = `translateX(0px)`;
      }, 400);
    }

    if (index < 0) {
      slider.style.transition = "none";
      index = originalItems.length - SCROLL_BY;
      const offset = index * itemWidth;
      slider.style.transform = `translateX(-${offset}px)`;
    }
  };

  btnNext.addEventListener("click", () => {
    clearInterval(autoScroll);
    goTo(index + SCROLL_BY);
  });

  btnPrev.addEventListener("click", () => {
    clearInterval(autoScroll);
    goTo(index - SCROLL_BY);
  });

  window.addEventListener("resize", () => goTo(index));
  goTo(0);

  const autoScroll = setInterval(() => {
    goTo(index + SCROLL_BY);
  }, AUTOPLAY_INTERVAL);
}
