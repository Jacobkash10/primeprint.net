export function init() {
  const services = [
    {
      id: 'graphic-design',
      icon: 'bxs-eyedropper',
      title: 'Graphic Design',
      description: 'Creative visuals that bring your brand to life. From logos to marketing materials, our expert designers turn your ideas into high-impact graphics tailored to your needs.',
      about: 'At PrimePrint, we provide professional graphic design services to help you stand out. Whether you need branding, flyers, social media assets, or custom packaging, our design team works closely with you to ensure your message is clear, attractive, and consistent across all platforms.',
      included: [
        'Logo & brand asset creation',
        'Print & web-ready files',
        'Custom layouts & typography',
        'Fast revisions & support',
        'Delivered in multiple formats'
      ],
      link: 'https://www.primeprint.net/store/product-view.html/109-Design-Services',
    },
    {
      id: 'passport-photos',
      icon: 'bxs-picture-in-picture-close',
      title: 'Passport Photos',
      description: 'Our passport photo service is 100% online. Easily take a photo of yourself or your baby from home. We’ll crop, adjust, and format it to meet official standards. Choose printed, digital, or both – we deliver to your door.',
      about: 'At PrimePrint, we make getting passport photos easy, fast, and fully online. Just snap a photo at home and upload it securely. We format your image to meet U.S. or international standards for passports, visas, and IDs—saving you a trip to the photo studio.',
      included: [
        'Government-compliant sizing',
        'High-resolution & white background',
        'Print-ready or digital JPG option',
        'Retouching',
        'Fast delivery available'
      ],
      image1: '../assets/images/passport.png',
      image2: '../assets/images/pass.png',
      image3: '../assets/images/pass.png',
      link: 'https://www.primeprint.net/store/product-view.html/780/90343'
    },
    {
      id: 'eddm',
      icon: 'bxs-vector-square',
      title: 'EDDM',
      description: 'Reach every household in your area affordably and effectively. USPS® EDDM® lets you blanket neighborhoods with postcards or flyers—no mailing list needed.',
      about: 'Our EDDM Full Service handles everything from printing to delivery to USPS®. Select your routes, upload your artwork, and we’ll print, bundle, and submit it—all in one step. Perfect for real estate, restaurants, and local promotions.',
      included: [
        'USPS® EDDM® approved sizes',
        'Route selection by ZIP code, income, or age',
        'Full-service print + mail handling',
        'Templates & online design tools',
        'Delivery to local post offices included'
      ],
      link: 'https://www.primeprint.net/store/product-view.html/48-Every-Door-Direct-Mail'
    },
    {
      id: 'custom-printing',
      icon: 'bxs-printer',
      title: 'Custom Printing Solutions',
      description: 'High-quality printing for business cards, flyers, signs, and more. We offer fast turnaround and premium print options for every type of material—from business essentials to marketing tools.',
      about: 'PrimePrint delivers exceptional printing services backed by cutting-edge technology. From one-color business cards to full-color booklets, our streamlined process ensures sharp quality and vibrant color with lightning-fast turnaround. Everything is handled in-house—from press to delivery.',
      included: [
        'Flyers, posters, business cards, & signs',
        'Offset & digital press options',
        'Same-day turnaround available',
        'Die cutting, binding & finishing',
        'Quality checks for consistent color & resolution'
      ],
      link: 'https://www.primeprint.net/contact/contact-form.html'
    },
    {
      id: 'mailing-services',
      icon: 'bxs-diamond',
      title: 'Mailing Services',
      description: "Get the most out of your campaign with print + mail in one place. We print, label, and mail your materials directly to your audience—saving you time and increasing your campaign's impact.",
      about: "PrimePrint simplifies direct mailing by offering an all-in-one solution. We help you create, print, and mail your campaign materials quickly and efficiently. Whether you're promoting a product or service, our targeted mail services let you reach your audience with precision and professionalism.",
      included: [
        'Design, print, and mail in one order',
        'Address verification & CASS certification',
        'Fast turnaround (2–5 business days)',
        'No shipping to mail house required',
        'Targeted mailing lists available'
      ],
      link: 'https://www.primeprint.net/contact/contact-form.html'
    },
    {
      id: 'mailing-lists',
      icon: 'bxs-cube',
      title: 'Mailing lists',
      description: 'Build precise, up-to-date mailing lists for your campaign. Access high-quality data filters and instantly create custom lists based on demographics, location, credit, income, and more.',
      about: "With PrimePrint’s mailing list service, you gain access to the most accurate, privacy-compliant data available. Whether you're targeting by income, ZIP code, age, or business type, our lists are optimized for effective direct mail marketing. Data is processed instantly and delivered in minutes.",
      included: [
        'Instant list building',
        'Filters for location, income, age, and more',
        'Up-to-date verified data',
        'Full list ownership upon purchase',
        'Best pricing on the web'
      ],
      link: 'https://www.primeprint.net/contact/contact-form.html'
    }
  ];

  const params = new URLSearchParams(window.location.search);
  const serviceId = params.get("id");
  const container = document.getElementById("service-detail");
  const service = services.find(s => s.id === serviceId);

  if (!container) return;

  if (service) {
    container.innerHTML = `
      <div>
        <div class="service-header">
          <div class="service-box">
            <div class="service-icon">
              <i class='bxr ${service.icon}'></i>
            </div>
            <h1>${service.title}</h1>
            <p class="short">${service.description}</p>
            <div class="service__passport__button">
              <a href="${service.link}">
                <button class="hero__button">Customize now</button>
              </a>
              ${
                service.id === 'passport-photos'
                  ? `<a href="passport-requirements.html">
                        <button class="hero__button bg-white">View requirements</button>
                    </a>`
                  : ''
              }
            </div>
          </div>
          ${service.image1 ? `
            <div class="service-image">
              <img src="${service.image1}" alt="${service.title}" class="img-service1" />
              <img src="${service.image2}" alt="${service.title}" class="img-service2" />
              <img src="${service.image3}" alt="${service.title}" class="img-service3" />
            </div>
          ` : ''}
        </div>

        <div class="tabs">
          <div class="tab-buttons">
            <button class="tab-btn active" data-tab="about">About</button>
            <button class="tab-btn" data-tab="included">What's Included?</button>
          </div>
          <div class="tab-content">
            <div class="tab-pane active" id="about">
              <h2>About</h2>
              <p>${service.about}</p>
            </div>
            <div class="tab-pane" id="included">
              <h2>What's Included?</h2>
              <ul>
                ${service.included.map(item => `<li>${item}</li>`).join('')}
              </ul>
            </div>
          </div>
        </div>

        <section>
          <div class="workss__container container">
            <div class="workss__content">
              <div class="work__item"><a href="#"><div class="inner"><img src="../assets/images/w1.jpg" alt="work1"></div></a></div>
              <div class="work__item"><a href="#"><div class="inner"><img src="../assets/images/w2.jpg" alt="work2"></div></a></div>
              <div class="work__items">
                <a href="#"><div class="inner"><img src="../assets/images/w3.jpg" alt="work3"></div></a>
                <a href="#"><div class="inner"><img src="../assets/images/w4.jpg" alt="work4"></div></a>
              </div>
            </div>
          </div>
        </section>

        <div class="more-services"></div>
      </div>
    `;

    const tabButtons = container.querySelectorAll('.tab-btn');
    const tabPanes = container.querySelectorAll('.tab-pane');
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        tabButtons.forEach(b => b.classList.remove('active'));
        tabPanes.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        container.querySelector(`#${btn.dataset.tab}`).classList.add('active');
      });
    });

    const moreContainer = container.querySelector('.more-services');
    const otherServices = services.filter(s => s.id !== serviceId).slice(0, 4);
    moreContainer.innerHTML = `
      <div class="prime__title">
        <div class="prime__text"><h2>More Services</h2></div>
        <div class="prime__buttons">
          <a href="services.html"><button class="prime__button bg-white">Browse all services</button></a>
        </div>
      </div>
      <br /><br />
      <div class="services__list__container">
        ${otherServices.map(s => `
          <div class="list__item">
            <a href="service.html?id=${s.id}">
              <div class="list__top">
                <i class='bxr ${s.icon} bx-flip-vertical'></i>
                <h3>${s.title}</h3>
              </div>
              <p class="list__text">
                ${s.description.length > 80 ? s.description.substring(0, 80) + "..." : s.description}
              </p>
              <div class="list__more">
                <p>Learn More</p>
                <i class='bxr bxs-arrow-right-stroke'></i>
              </div>
            </a>
          </div>
        `).join('')}
      </div>
    `;

    if (!document.getElementById('lightbox')) {
      const lbHtml = document.createElement('div');
      lbHtml.innerHTML = `
        <div class="lightbox" id="lightbox" aria-hidden="true">
          <button class="lightbox__close" id="lbClose" aria-label="Close">×</button>
          <button class="lightbox__nav prev" id="lbPrev" aria-label="Previous">‹</button>
          <div class="lightbox__inner">
            <img id="lbImage" alt="Preview"/>
          </div>
          <button class="lightbox__nav next" id="lbNext" aria-label="Next">›</button>
        </div>
      `;
      document.body.appendChild(lbHtml.firstElementChild);
    }

    (function initLightbox() {
      const gallery = container.querySelector('.workss__content');
      if (!gallery) return;

      const imgs = gallery.querySelectorAll('img');
      if (!imgs.length) return;

      const sources = Array.from(imgs).map(img => img.getAttribute('src'));

      const lb = document.getElementById('lightbox');
      const lbImg = document.getElementById('lbImage');
      const btnClose = document.getElementById('lbClose');
      const btnPrev = document.getElementById('lbPrev');
      const btnNext = document.getElementById('lbNext');

      let index = 0;
      let touchStartX = 0;

      const openAt = (i) => {
        index = ((i % sources.length) + sources.length) % sources.length;
        lbImg.src = sources[index];
        lb.classList.add('open');
        document.body.classList.add('lb-no-scroll');
        lb.setAttribute('aria-hidden', 'false');
      };
      const close = () => {
        lb.classList.remove('open');
        document.body.classList.remove('lb-no-scroll');
        lb.setAttribute('aria-hidden', 'true');
      };
      const showNext = (delta = 1) => {
        index = (index + delta + sources.length) % sources.length;
        lbImg.style.animation = 'none';
        requestAnimationFrame(() => {
          lbImg.src = sources[index];
          lbImg.style.animation = 'lbIn .2s ease';
        });
      };

      imgs.forEach((img, i) => {
        const a = img.closest('a');
        (a || img).addEventListener('click', (e) => {
          e.preventDefault();
          openAt(i);
        });
      });

      btnClose.addEventListener('click', close);
      btnPrev.addEventListener('click', () => showNext(-1));
      btnNext.addEventListener('click', () => showNext(+1));

      lb.addEventListener('click', (e) => { if (e.target === lb) close(); });

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
        if (Math.abs(dx) > 40) showNext(dx < 0 ? +1 : -1);
      });
    })();

  } else {
    container.innerHTML = `<p>Service not found.</p>`;
  }
}
