export function init() {
const services = [
  {
      id: 'graphic-design',
      icon: 'bxs-eyedropper',
      title: 'Graphic Design',
      description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor.',
      link: 'service.html?id=graphic-design'
  },
  {
      id: 'passport-pictures',
      icon: 'bxs-picture-in-picture-close',
      title: 'Passport Pictures',
      description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor.',
      link: 'service.html?id=passport-pictures'
  },
  {
      id: 'eddm',
      icon: 'bxs-vector-square',
      title: 'EDDM',
      description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor.',
      link: 'service.html?id=eddm'
  },
  {
      id: 'custom-printing',
      icon: 'bxs-printer',
      title: 'Custom Printing Solutions',
      description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor.',
      link: 'service.html?id=custom-printing'
  },
  {
      id: 'mailing-services',
      icon: 'bxs-diamond',
      title: 'Mailing Services',
      description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor.',
      link: 'service.html?id=mailing-services'
  },
  {
      id: 'mailing-lists',
      icon: 'bxs-cube',
      title: 'Mailing lists',
      description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor.',
      link: 'service.html?id=mailing-lists'
  }
];

const container = document.getElementById("services-container");

services.forEach(service => {
  const item = document.createElement("div");
  item.className = "list__item";

  item.innerHTML = `
    <a href="${service.link}">
      <div class="list__top">
        <i class='bxr ${service.icon} bx-flip-vertical'></i>
        <h3>${service.title}</h3>
      </div>
      <p class="list__text">${service.description}</p>
      <div class="list__more">
        <p>Learn More</p>
        <i class='bxr bxs-arrow-right-stroke'></i>
      </div>
    </a>
  `;

  container.appendChild(item);
});
}