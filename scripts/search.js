// export function init() {
// const products = [
//   {
//     name: "Business Card Magnets",
//     category: "Marketing Materials",
//     image: "./images/magnet.jpg"
//   },
//   {
//     name: "Business Cards",
//     category: "Marketing Materials",
//     image: "./images/business-cards.jpg"
//   },
//   {
//     name: "Circle Business Cards",
//     category: "Marketing Materials > Special Shapes",
//     image: "./images/circle-cards.jpg"
//   },
//   {
//     name: "Acrylic Boards",
//     category: "Signs & Banners > Rigid Signs",
//     image: "./images/acrylic.jpg"
//   },
//   {
//     name: "Folded Business Cards",
//     category: "Marketing Materials",
//     image: "./images/folded.jpg"
//   },
//   {
//     name: "Business Card Templates: Popular",
//     category: "Design Gallery",
//     image: "./images/templates.jpg"
//   }
// ];

// const searchInput = document.getElementById("searchInput");
// const suggestions = document.getElementById("suggestions");

// searchInput.addEventListener("input", () => {
//   const query = searchInput.value.toLowerCase();
//   suggestions.innerHTML = "";

//   if (query.length === 0) return;

//   const filtered = products.filter(product =>
//     product.name.toLowerCase().includes(query)
//   );

//   if (filtered.length === 0) {
//     suggestions.innerHTML = `<li>No results found</li>`;
//     return;
//   }

//   filtered.forEach(product => {
//     const li = document.createElement("li");
//     li.innerHTML = `
//       <img src="${product.image}" alt="${product.name}" />
//       <div>
//         <strong>${product.name}</strong><br/>
//         <small>${product.category}</small>
//       </div>
//     `;
//     suggestions.appendChild(li);
//   });
// });
// }

export function init() {
  const products = [
    {
      name: "Brown Kraft Cards",
      category: "Business Cards Products",
      link: "https://www.primeprint.net/store/product-view.html/105-Brown-Kraft-Cards"
    },
    {
      name: "Business Cards",
      category: "Business Cards Products",
      link: "https://www.primeprint.net/store/product-view.html/33-Business-Cards"
    },
    {
      name: "EDGE Cards",
      category: "Business Cards Products",
      link: "https://www.primeprint.net/store/product-view.html/101-Edge-Cards"
    },
    {
      name: "Postcards",
      category: "Marketing Products",
      link: "https://www.primeprint.net/store/product-view.html/74-Postcards"
    },
    {
      name: "Booklets",
      category: "Marketing Products",
      link: "https://www.primeprint.net/store/product-view.html/97-Booklets"
    },
    {
      name: "Announcement Cards",
      category: "Stationery Products",
      link: "phttps://www.primeprint.net/store/product-view.html/30-Announcement-Cards"
    },
    {
      name: "Pearl Cards",
      category: "Stationery Products",
      link: "https://www.primeprint.net/store/product-view.html/72-Pearl-Cards"
    },
    {
      name: "Event Tents",
      category: "Displays",
      link: "https://www.primeprint.net/store/product-view.html/293-Event-Tents"
    },
  ];

  const searchInput = document.getElementById("searchInput");
  const suggestions = document.getElementById("suggestions");

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    suggestions.innerHTML = "";

    if (query.length === 0) return;

    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(query)
    );

    if (filtered.length === 0) {
      suggestions.innerHTML = `<li>No results found</li>`;
      return;
    }

    filtered.forEach(product => {
      const li = document.createElement("li");
      li.innerHTML = `<a href="${product.link}">${product.name}</a>`;
      suggestions.appendChild(li);
    });
  });
}

