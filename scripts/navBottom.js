export function init() {
  const resMenuItems = document.querySelectorAll(".responsive-nav-bottom li");
  const resSubmenu = document.querySelector(".respo-submenu");
  const resSubmenuContent = document.getElementById("respo-submenu-content");

  let hideTimeout;

  const menus = {
    majestic: `
      <div class="menu-columns">
        <h4>Business Cards Products</h4>
        <a href="https://www.primeprint.net/store/product-view.html/105-Brown-Kraft-Cards">Brown Kraft Cards</a>
        <a href="https://www.primeprint.net/store/product-view.html/33-Business-Cards">Business Cards</a>
        <a href="https://www.primeprint.net/store/product-view.html/101-Edge-Cards">EDGE Cards</a>
        <a href="https://www.primeprint.net/store/product-view.html/51-Hot-Foil">Hot Foil</a>
        <a href="https://www.primeprint.net/store/product-view.html/29-Inline-Foil">Inline Foil</a>
        <a href="https://www.primeprint.net/store/product-view.html/59-Linen-Uncoated">Linen Uncoated</a>
        <a href="https://www.primeprint.net/store/product-view.html/110-Painted-Edge-Cards">Painted Edge Cards</a>
        <a href="https://www.primeprint.net/store/product-view.html/73-Plastic-Cards">Plastic Cards</a>
        <a href="https://www.primeprint.net/store/product-view.html/107-Raised-Foil">Raised Foil</a>
        <a href="https://www.primeprint.net/store/product-view.html/108-Raised-Spot-Uv">Raised Spot UV</a>
        <a href="https://www.primeprint.net/store/product-view.html/85-Silk-Cards">Silk Cards</a>
        <a href="https://www.primeprint.net/store/product-view.html/88-Suede-Cards">Suede Cards</a>
        <a href="https://www.primeprint.net/store/product-view.html/45-Waterproof">Waterproof</a>
      </div>
      <div class="menu-columns">
        <h4>Marketing Products</h4>
        <a href="https://www.primeprint.net/store/product-view.html/97-Booklets">Booklets</a>
        <a href="https://www.primeprint.net/store/product-view.html/36-Calendars">Calendars</a>
        <a href="https://www.primeprint.net/store/product-view.html/35-Cd-And-Dvd">CD and DVD</a>
        <a href="https://www.primeprint.net/store/product-view.html/38-Catalogs">Catalogs</a>
        <a href="https://www.primeprint.net/store/product-view.html/43-Door-Hangers">Door Hangers</a>
        <a href="https://www.primeprint.net/store/product-view.html/47-Event-Tickets">Event Tickets</a>
        <a href="https://www.primeprint.net/store/product-view.html/50-Flyers-And-Brochures">Flyers and Brochures</a>
        <a href="https://www.primeprint.net/store/product-view.html/54-Hang-Tags">Hang Tags</a>
        <a href="https://www.primeprint.net/store/product-view.html/55-Header-Cards">Header Cards</a>
        <a href="https://www.primeprint.net/store/product-view.html/61-Magnets">Magnets</a>
        <a href="https://www.primeprint.net/store/product-view.html/192-Menus">Menus</a>
        <a href="https://www.primeprint.net/store/product-view.html/74-Postcards">Postcards</a>
        <a href="https://www.primeprint.net/store/product-view.html/76-Presentation-Folders">Presentation Folders</a>
        <a href="https://www.primeprint.net/store/product-view.html/79-Rack-Cards">Rack Cards</a>
        <a href="https://www.primeprint.net/store/product-view.html/81-Roll-Labels">Roll Labels</a>
        <a href="https://www.primeprint.net/store/product-view.html/83-Sell-Sheets">Sell Sheets</a>
        <a href="https://www.primeprint.net/store/product-view.html/87-Stickers">Stickers</a>
        <a href="https://www.primeprint.net/store/product-view.html/91-Tear-Off-Cards">Tear Off Cards</a>
        <a href="https://www.primeprint.net/store/product-view.html/93-Trading-Cards">Trading Cards</a>
      </div>
      <div class="menu-columns">
        <h4>Stationery Products</h4>
        <a href="https://www.primeprint.net/store/product-view.html/30-Announcement-Cards">Announcement Cards</a>
        <a href="https://www.primeprint.net/store/product-view.html/678-Envelope">Envelope</a>
        <a href="https://www.primeprint.net/store/product-view.html/53-Greeting-Cards">Greeting Cards</a>
        <a href="https://www.primeprint.net/store/product-view.html/58-Letterhead">Letterhead</a>
        <a href="https://www.primeprint.net/store/product-view.html/67-Ncr-Forms">NCR Forms</a>
        <a href="https://www.primeprint.net/store/product-view.html/68-Natural-Cards">Natural Cards</a>
        <a href="https://www.primeprint.net/store/product-view.html/69-Notepads">Notepads</a>
        <a href="https://www.primeprint.net/store/product-view.html/72-Pearl-Cards">Pearl Cards</a>
      </div>
      <div class="menu-columns">
        <h4>Signs & Posters</h4>
        <a href="https://www.primeprint.net/store/product-view.html/28-Adhesive-Vinyl">Adhesive Vinyl</a>
        <a href="https://www.primeprint.net/store/product-view.html/37-Car-Magnets">Car Magnets</a>
        <a href="https://www.primeprint.net/store/product-view.html/130-Fabric-Banners">Fabric Banners</a>
        <a href="https://www.primeprint.net/store/product-view.html/56-Indoor-Banners">Indoor Banners</a>
        <a href="https://www.primeprint.net/store/product-view.html/57-Large-Posters">Large Posters</a>
        <a href="https://www.primeprint.net/store/product-view.html/98-Outdoor-Banners">Outdoor Banners</a>
        <a href="https://www.primeprint.net/store/product-view.html/75-Posters">Posters</a>
        <a href="https://www.primeprint.net/store/product-view.html/126-Sidewalk-Signs">Sidewalk Signs</a>
        <a href="https://www.primeprint.net/store/product-view.html/84-Signs">Signs</a>
        <a href="https://www.primeprint.net/store/product-view.html/95-Window-Clings">Window Clings</a>
        <a href="https://www.primeprint.net/store/product-view.html/96-Window-Graphics">Window Graphics</a>
      </div>
      <div class="menu-columns">
        <h4>Displays</h4>
        <a href="https://www.primeprint.net/store/product-view.html/31-Banners-With-Stand">Banners with Stand</a>
        <a href="https://www.primeprint.net/store/product-view.html/39-Counter-Cards">Counter Cards</a>
        <a href="https://www.primeprint.net/store/product-view.html/637-Displays">Displays</a>
        <a href="https://www.primeprint.net/store/product-view.html/293-Event-Tents">Event Tents</a>
        <a href="https://www.primeprint.net/store/product-view.html/49-Flags">Flags</a>
        <a href="https://www.primeprint.net/store/product-view.html/129-Table-Covers">Table Covers</a>
        <a href="https://www.primeprint.net/store/product-view.html/90-Table-Tent-Cards">Table Tent Cards</a>
      </div>
      <div class="menu-columns">
        <h4>Specialty Products</h4>
        <a href="https://www.primeprint.net/store/product-view.html/64-Mounted-Canvas">Mounted Canvas</a>
        <a href="https://www.primeprint.net/store/product-view.html/70-Packaging">Packaging</a>
      </div>
      <div class="menu-columns">
        <h4>Promotional Items</h4>
        <a href="https://www.primeprint.net/store/product-view.html/34-Buttons">Buttons</a>
        <a href="https://www.primeprint.net/store/product-view.html/65-Mugs">Mugs</a>
        <a href="https://www.primeprint.net/store/product-view.html/89-T-Shirts">T-Shirts</a>
        <a href="https://www.primeprint.net/store/product-view.html/92-Tote-Bags">Tote Bags</a>
      </div>
    `,
  };

  resMenuItems.forEach(item => {
    const key = item.getAttribute("data-menu");
    if (!key) return;

    const showSubmenu = () => {
      clearTimeout(hideTimeout);
      resSubmenuContent.innerHTML = menus[key] || "";
      resSubmenu.classList.add("visible");
    };

    const hideSubmenu = () => {
      hideTimeout = setTimeout(() => {
        resSubmenu.classList.remove("visible");
      }, 200);
    };

    if (item.classList.contains("click-toggles")) {
      // Toggle on click
      item.addEventListener("click", (e) => {
        e.stopPropagation();
        const isVisible = resSubmenu.classList.contains("visible");
        resSubmenuContent.innerHTML = menus[key] || "";
        resSubmenu.classList.toggle("visible", !isVisible);
      });
    } else {
      // Show on hover
      item.addEventListener("mouseenter", showSubmenu);
      item.addEventListener("mouseleave", hideSubmenu);
    }

    resSubmenu.addEventListener("mouseenter", () => clearTimeout(hideTimeout));
    resSubmenu.addEventListener("mouseleave", hideSubmenu);
  });

  // Click outside to close
  document.addEventListener("click", (e) => {
    if (!resSubmenu.contains(e.target)) {
      resSubmenu.classList.remove("visible");
    }
  });
}
