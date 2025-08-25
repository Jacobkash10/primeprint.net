export function init() {
  const slider = document.getElementById("slider__hero");
  const btnNext = document.querySelector(".sliders-btn.next");
  const btnPrev = document.querySelector(".sliders-btn.prev");
  if (!slider || !btnNext || !btnPrev) return;

  const GAP = 0;
  let index = 0;

  const getItemWidth = () =>
    slider.querySelector(".hero__item").getBoundingClientRect().width + GAP;

  const goTo = (i, withAnim = true) => {
    const maxIndex = slider.children.length - 1;
    index = Math.max(0, Math.min(i, maxIndex));
    const offset = index * getItemWidth();
    slider.style.transition = withAnim ? "transform 0.4s ease" : "none";
    slider.style.transform = `translateX(-${offset}px)`;

    btnPrev.disabled = index === 0;
    btnNext.disabled = index === maxIndex;
  };

  btnNext.addEventListener("click", () => goTo(index + 1, true));
  btnPrev.addEventListener("click", () => goTo(index - 1, true));
  window.addEventListener("resize", () => goTo(index, false));

  let isPointerDown = false;
  let startX = 0;              
  let startTranslate = 0;      
  let currentTranslate = 0;    
  let lastX = 0;               
  let lastT = 0;
  const SWIPE_THRESHOLD = 50;  
  const VELOCITY_THRESHOLD = 0.35; 

  const getCurrentTranslate = () => {
    const style = getComputedStyle(slider);
    const matrix = new DOMMatrixReadOnly(style.transform);
    return matrix.m41;
  };

  const onPointerDown = (e) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    isPointerDown = true;
    slider.setPointerCapture?.(e.pointerId);
    slider.style.transition = "none";

    startX = e.clientX;
    startTranslate = getCurrentTranslate();
    currentTranslate = startTranslate;

    lastX = e.clientX;
    lastT = performance.now();
  };

  const onPointerMove = (e) => {
    if (!isPointerDown) return;

    const dx = e.clientX - startX;
    const maxIndex = slider.children.length - 1;
    const minTranslate = -maxIndex * getItemWidth();
    const maxTranslate = 0;

    let next = startTranslate + dx;

    if (next > maxTranslate) {
      next = maxTranslate + (next - maxTranslate) * 0.3;
    } else if (next < minTranslate) {
      next = minTranslate + (next - minTranslate) * 0.3;
    }

    currentTranslate = next;
    slider.style.transform = `translateX(${currentTranslate}px)`;

    const now = performance.now();
    if (now - lastT > 16) { 
      lastX = e.clientX;
      lastT = now;
    }
  };

  const onPointerUp = (e) => {
    if (!isPointerDown) return;
    isPointerDown = false;
    slider.releasePointerCapture?.(e.pointerId);

    const dxTotal = e.clientX - startX;
    const dt = Math.max(1, performance.now() - lastT);
    const vx = (e.clientX - lastX) / dt; 

    const wantNext =
      dxTotal < -SWIPE_THRESHOLD || vx < -VELOCITY_THRESHOLD;
    const wantPrev =
      dxTotal > SWIPE_THRESHOLD || vx > VELOCITY_THRESHOLD;

    if (wantNext) {
      goTo(index + 1, true);
    } else if (wantPrev) {
      goTo(index - 1, true);
    } else {
      goTo(index, true);
    }
  };

  const preventDrag = (e) => e.preventDefault();

  slider.addEventListener("pointerdown", onPointerDown, { passive: true });
  slider.addEventListener("pointermove", onPointerMove, { passive: true });
  slider.addEventListener("pointerup", onPointerUp, { passive: true });
  slider.addEventListener("pointercancel", onPointerUp, { passive: true });
  slider.addEventListener("dragstart", preventDrag);

  goTo(index, false);
}
