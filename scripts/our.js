export function init() {
  setTimeout(() => {
    const slider = document.querySelector(".our__content");
    const prevBtn = document.querySelector(".slide-btn.prev");
    const nextBtn = document.querySelector(".slide-btn.next");

    if (!slider || !prevBtn || !nextBtn) {
      console.warn("Slider elements not found");
      return;
    }

    console.log("Slider ready");

    let index = 0;
    const GAP = 10;

    const getItemWidth = () =>
      slider.querySelector(".our__item").getBoundingClientRect().width + GAP;

    const goTo = (i) => {
      const maxIndex = slider.children.length - 1;
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
      const maxIndex = slider.children.length - 2;
      if (index < maxIndex) {
        goTo(index + 1);
      } else {
        goTo(0);
      }
    }, 7000);
  }, 50);
}
