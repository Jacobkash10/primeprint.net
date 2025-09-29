export function init() {
const services = [
  {
      id: 'graphic-design',
      icon: 'bxs-eyedropper',
      title: 'Graphic Design',
      description: 'Creative visuals that bring your brand to life. From logos to marketing materials, our expert designers turn your ideas into high-impact graphics tailored to your needs.',
      link: 'service.html?id=graphic-design'
  },
  {
      id: 'passport-photos',
      icon: 'bxs-picture-in-picture-close',
      title: 'Passport Photos',
      description: 'Our passport photo service is 100% online. Easily take a photo of yourself or your baby from home. We’ll crop, adjust, and format it to meet official standards. Choose printed, digital, or both – we deliver to your door.',
      link: 'service.html?id=passport-photos'
  },
  {
      id: 'eddm',
      icon: 'bxs-vector-square',
      title: 'EDDM',
      description: 'Reach every household in your area affordably and effectively. USPS® EDDM® lets you blanket neighborhoods with postcards or flyers—no mailing list needed.',
      link: 'service.html?id=eddm'
  },
  {
      id: 'custom-printing',
      icon: 'bxs-printer',
      title: 'Custom Printing Solutions',
      description: 'High-quality printing for business cards, flyers, signs, and more. We offer fast turnaround and premium print options for every type of material—from business essentials to marketing tools.',
      link: 'service.html?id=custom-printing'
  },
  {
      id: 'mailing-services',
      icon: 'bxs-diamond',
      title: 'Mailing Services',
      description: "Get the most out of your campaign with print + mail in one place. We print, label, and mail your materials directly to your audience—saving you time and increasing your campaign's impact.",
      link: 'service.html?id=mailing-services'
  },
  {
      id: 'mailing-lists',
      icon: 'bxs-cube',
      title: 'Mailing lists',
      description: 'Build precise, up-to-date mailing lists for your campaign. Access high-quality data filters and instantly create custom lists based on demographics, location, credit, income, and more.',
      link: 'service.html?id=mailing-lists'
  }
];

const container = document.getElementById("services-container");

services.forEach(service => {
  const item = document.createElement("div");
  item.className = "list__item";

  const shortDesc = service.description.length > 70
  ? service.description.substring(0, 70) + "..."
  : service.description;

  item.innerHTML = `
    <a href="${service.link}">
      <div class="list__top">
        <i class='bxr ${service.icon} bx-flip-vertical'></i>
        <h3>${service.title}</h3>
      </div>
      <p class="list__text">${shortDesc}</p>
      <div class="list__more">
        <p>Learn More</p>
        <i class='bxr bxs-arrow-right-stroke'></i>
      </div>
    </a>
  `;

  container.appendChild(item);
});

  // Back to top button
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  const SHOW_AFTER = 300;

  const setVisible = (v) => {
    btn.setAttribute('data-visible', v ? 'true' : 'false');
    btn.setAttribute('aria-hidden', v ? 'false' : 'true');
  };

  const onScroll = () => {
    const y = window.pageYOffset || document.documentElement.scrollTop;
    setVisible(y > SHOW_AFTER);
  };

  const scrollToTop = () => {
    const prefersReduced =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      window.scrollTo(0, 0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  btn.addEventListener('click', scrollToTop);

  btn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      scrollToTop();
    }
  });

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('load', onScroll);
}