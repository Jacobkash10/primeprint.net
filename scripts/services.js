export function init() {
  const slider = document.getElementById("slider");
  const btnNext = document.querySelector(".slider-btn.next");
  const btnPrev = document.querySelector(".slider-btn.prev");

  if (!slider || !btnNext || !btnPrev) return;

  const GAP = 30;
  let index = 0;

  const getItemWidth = () =>
    slider.querySelector(".service__item").getBoundingClientRect().width + GAP;

  const goTo = (i) => {
    const maxIndex = slider.children.length - 2; 
    index = Math.max(0, Math.min(i, maxIndex));
    const offset = index * getItemWidth();
    slider.style.transform = `translateX(-${offset}px)`;
    btnPrev.disabled = index === 0;
    btnNext.disabled = index === maxIndex;
  };

  btnNext.addEventListener("click", () => {
    clearInterval(autoplayInterval);
    goTo(index + 1);
  });

  btnPrev.addEventListener("click", () => {
    clearInterval(autoplayInterval);
    goTo(index - 1);
  });

  window.addEventListener("resize", () => goTo(index));

  goTo(0);

  const autoplayInterval = setInterval(() => {
    const maxIndex = slider.children.length - 2;
    goTo(index < maxIndex ? index + 1 : 0);
  }, 3000);
}
