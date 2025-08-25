// export function init() {
//   const slider = document.getElementById("slider");
//   const btnNext = document.querySelector(".slider-btn.next");
//   const btnPrev = document.querySelector(".slider-btn.prev");

//   if (!slider || !btnNext || !btnPrev) return;

//   const GAP = 20;
//   const ITEMS_VISIBLE = 2;
//   const SCROLL_BY = 2;
//   const AUTOPLAY_INTERVAL = 4000;

//   let index = 0;

//   const originalItems = Array.from(slider.children);
//   originalItems.slice(0, SCROLL_BY).forEach(item => {
//     const clone = item.cloneNode(true);
//     clone.classList.add("clone");
//     slider.appendChild(clone);
//   });

//   const getItemWidth = () =>
//     slider.querySelector(".service__item").getBoundingClientRect().width + GAP;

//   const goTo = (i) => {
//     const totalItems = slider.children.length;
//     const itemWidth = getItemWidth();
//     index = i;

//     slider.style.transition = "transform 0.4s ease";
//     slider.style.transform = `translateX(-${index * itemWidth}px)`;

//     if (index >= originalItems.length) {
//       setTimeout(() => {
//         slider.style.transition = "none";
//         index = 0;
//         slider.style.transform = `translateX(0px)`;
//       }, 400);
//     }

//     if (index < 0) {
//       slider.style.transition = "none";
//       index = originalItems.length - SCROLL_BY;
//       const offset = index * itemWidth;
//       slider.style.transform = `translateX(-${offset}px)`;
//     }
//   };

//   btnNext.addEventListener("click", () => {
//     clearInterval(autoScroll);
//     goTo(index + SCROLL_BY);
//   });

//   btnPrev.addEventListener("click", () => {
//     clearInterval(autoScroll);
//     goTo(index - SCROLL_BY);
//   });

//   window.addEventListener("resize", () => goTo(index));
//   goTo(0);

//   const autoScroll = setInterval(() => {
//     goTo(index + SCROLL_BY);
//   }, AUTOPLAY_INTERVAL);
// }

export function init() {
  const slider = document.getElementById("slider");
  const btnNext = document.querySelector(".slider-btn.next");
  const btnPrev = document.querySelector(".slider-btn.prev");
  if (!slider || !btnNext || !btnPrev) return;

  const GAP = 20;
  const SCROLL_BY = 2;
  const AUTOPLAY_INTERVAL = 4000;

  let index = 0;
  let autoScroll = null;

  const originalItems = Array.from(slider.children);
  originalItems.slice(0, SCROLL_BY).forEach(item => {
    const clone = item.cloneNode(true);
    clone.classList.add("clone");
    slider.appendChild(clone);
  });

  const getItemWidth = () =>
    slider.querySelector(".service__item").getBoundingClientRect().width + GAP;

  const goTo = (i, animate = true) => {
    const totalOriginal = originalItems.length;
    const itemWidth = getItemWidth();
    index = i;
    slider.style.transition = animate ? "transform 0.4s ease" : "none";
    slider.style.transform = `translateX(-${index * itemWidth}px)`;

    if (index >= totalOriginal) {
      const delay = animate ? 400 : 0;
      setTimeout(() => {
        slider.style.transition = "none";
        index = 0;
        slider.style.transform = `translateX(0px)`;
      }, delay);
    }
    if (index < 0) {
      slider.style.transition = "none";
      index = Math.max(0, totalOriginal - SCROLL_BY);
      slider.style.transform = `translateX(-${index * itemWidth}px)`;
    }
  };

  const stopAutoplay   = () => { if (autoScroll) { clearInterval(autoScroll); autoScroll = null; } };
  const startAutoplay  = () => { if (!autoScroll) autoScroll = setInterval(() => goTo(index + SCROLL_BY, true), AUTOPLAY_INTERVAL); };
  const restartAutoplay= () => { stopAutoplay(); startAutoplay(); };

  btnNext.addEventListener("click", () => { stopAutoplay(); goTo(index + SCROLL_BY, true); restartAutoplay(); });
  btnPrev.addEventListener("click", () => { stopAutoplay(); goTo(index - SCROLL_BY, true); restartAutoplay(); });
  window.addEventListener("resize", () => goTo(index, false));

  goTo(0, false);
  startAutoplay();

  let isDown = false;
  let startX = 0, startY = 0;
  let startTranslate = 0;
  let currentTranslate = 0;
  let isHorizontal = null; 
  const SWIPE_THRESHOLD_FRAC = 0.25;
  const VELOCITY_THRESHOLD = 0.35;
  let lastX = 0, lastT = 0;

  const getCurrentTranslate = () => {
    const m = new DOMMatrixReadOnly(getComputedStyle(slider).transform);
    return m.m41; 
  };

  const onStart = (x, y) => {
    stopAutoplay();
    isDown = true;
    startX = x;
    startY = y;
    startTranslate = getCurrentTranslate();
    currentTranslate = startTranslate;
    isHorizontal = null;
    lastX = x;
    lastT = performance.now();
    slider.style.transition = "none";
  };

  const onMove = (x, y, canPreventDefault = () => {}) => {
    if (!isDown) return;

    const dx = x - startX;
    const dy = y - startY;

    if (isHorizontal === null) {
      if (Math.abs(dx) > 6 || Math.abs(dy) > 6) {
        isHorizontal = Math.abs(dx) > Math.abs(dy);
      }
    }

    if (isHorizontal) {
      canPreventDefault();

      const itemWidth = getItemWidth();
      const totalOriginal = originalItems.length;
      const minTranslate = -((totalOriginal - 1) * itemWidth);
      const maxTranslate = 0;

      let next = startTranslate + dx;
      if (next > maxTranslate) {
        next = maxTranslate + (next - maxTranslate) * 0.35;
      } else if (next < minTranslate) {
        next = minTranslate + (next - minTranslate) * 0.35;
      }

      currentTranslate = next;
      slider.style.transform = `translateX(${currentTranslate}px)`;

      const now = performance.now();
      if (now - lastT > 16) {
        lastX = x;
        lastT = now;
      }
    }
  };

  const onEnd = (x) => {
    if (!isDown) return;
    isDown = false;

    if (isHorizontal) {
      const dxTotal = x - startX;
      const dt = Math.max(1, performance.now() - lastT);
      const vx = (x - lastX) / dt; // px/ms

      const itemWidth = getItemWidth();
      const passed = Math.abs(dxTotal) > itemWidth * SWIPE_THRESHOLD_FRAC;

      let delta = 0;
      if (vx > VELOCITY_THRESHOLD || (passed && dxTotal > 0)) {
        delta = -SCROLL_BY; 
      } else if (vx < -VELOCITY_THRESHOLD || (passed && dxTotal < 0)) {
        delta = SCROLL_BY;  
      }
      goTo(index + delta, true);
    }
    restartAutoplay();
  };

  if (window.PointerEvent) {
    slider.addEventListener("pointerdown", (e) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      slider.setPointerCapture?.(e.pointerId);
      onStart(e.clientX, e.clientY);
    });

    slider.addEventListener("pointermove", (e) => {
      if (!isDown) return;
      onMove(e.clientX, e.clientY, () => e.preventDefault());
    });

    const endPointer = (e) => {
      slider.releasePointerCapture?.(e.pointerId);
      onEnd(e.clientX);
    };
    slider.addEventListener("pointerup", endPointer);
    slider.addEventListener("pointercancel", endPointer);
  } else {
    slider.addEventListener("touchstart", (e) => {
      const t = e.changedTouches[0];
      onStart(t.clientX, t.clientY);
    }, { passive: true });

    slider.addEventListener("touchmove", (e) => {
      const t = e.changedTouches[0];
      onMove(t.clientX, t.clientY, () => e.preventDefault());
    }, { passive: false });

    slider.addEventListener("touchend", (e) => {
      const t = e.changedTouches[0];
      onEnd(t.clientX);
    }, { passive: true });

    slider.addEventListener("touchcancel", (e) => {
      const t = e.changedTouches[0];
      onEnd(t.clientX);
    }, { passive: true });
  }

  slider.querySelectorAll("img").forEach(img => {
    img.setAttribute("draggable", "false");
  });
}
