export function init() {
  const services = [
    {
      id: 'graphic-design',
      icon: 'bxs-eyedropper',
      title: 'Graphic Design',
      description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor.',
      fullText: 'Full content for Graphic Design service...'
    },
    {
      id: 'passport-pictures',
      icon: 'bxs-picture-in-picture-close',
      title: 'Passport Pictures',
      description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor.',
      fullText: 'Full content for Passport Pictures...'
    },
    {
      id: 'eddm',
      icon: 'bxs-vector-square',
      title: 'EDDM',
      description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor.',
      fullText: 'Full content for EDDM...'
    },
    {
      id: 'custom-printing',
      icon: 'bxs-printer',
      title: 'Custom Printing Solutions',
      description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor.',
      fullText: 'Full content for Custom Printing...'
    },
    {
      id: 'mailing-services',
      icon: 'bxs-diamond',
      title: 'Mailing Services',
      description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor.',
      fullText: 'Full content for Mailing Services...'
    },
    {
      id: 'mailing-lists',
      icon: 'bxs-cube',
      title: 'Mailing lists',
      description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor.',
      fullText: 'Full content for Mailing Lists...'
    }
  ];

  const params = new URLSearchParams(window.location.search);
  const serviceId = params.get("id");
  const container = document.getElementById("service-detail");

  const service = services.find(s => s.id === serviceId);

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
                              <a href="#">
                                    <button class="hero__button">Customize Now</button>
                              </a>
                              <a href="#">
                                    <button class="hero__button bg-white">View Requirements</button>
                              </a>
                        </div>
                  </div>
                  <div class="service-image">
                  </div>
            </div>
      </div>
    `;
  } else {
    container.innerHTML = `<p>Service not found.</p>`;
  }
}
