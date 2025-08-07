export function init() {
  const slider = document.getElementById("slider__hero");
  const btnNext = document.querySelector(".sliders-btn.next");
  const btnPrev = document.querySelector(".sliders-btn.prev");

  if (!slider || !btnNext || !btnPrev) return;

  const GAP = 0; 
  let index = 0;

  const getItemWidth = () =>
    slider.querySelector(".hero__item").getBoundingClientRect().width + GAP;

  const goTo = (i) => {
    const maxIndex = slider.children.length - 1;
    index = Math.max(0, Math.min(i, maxIndex));
    const offset = index * getItemWidth();
    slider.style.transform = `translateX(-${offset}px)`;
    slider.style.transition = "transform 0.4s ease";

    btnPrev.disabled = index === 0;
    btnNext.disabled = index === maxIndex;
  };

  btnNext.addEventListener("click", () => {
    goTo(index + 1);
  });

  btnPrev.addEventListener("click", () => {
    goTo(index - 1);
  });

  window.addEventListener("resize", () => goTo(index));
}
