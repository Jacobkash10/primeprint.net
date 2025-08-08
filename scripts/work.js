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
}
