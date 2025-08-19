export function init() {
  const resMenuItems = document.querySelectorAll(".responsive-nav-bottom li");
  const resSubmenu = document.querySelector(".respo-submenu");
  const resSubmenuContent = document.getElementById("respo-submenu-content");

  let hideTimeout;

  const menus = {
  majestic: `
    <div class="menu-column">
      <h4>Business Cards Products</h4>
      <a href="product-detail.html?id=1">Brown Kraft Cards</a>
      <a href="product-detail.html?id=2">Business Cards</a>
      <a href="product-detail.html?id=3">EDGE Cards</a>
      <a href="product-detail.html?id=4">Hot Foil</a>
      <a href="product-detail.html?id=5">Inline Foil</a>
      <a href="product-detail.html?id=6">Linen Uncoated</a>
      <a href="product-detail.html?id=7">Painted Edge Cards</a>
      <a href="product-detail.html?id=8">Plastic Cards</a>
      <a href="product-detail.html?id=9">Raised Foil</a>
      <a href="product-detail.html?id=10">Raised Spot UV</a>
      <a href="product-detail.html?id=11">Silk Cards</a>
      <a href="product-detail.html?id=12">Suede Cards</a>
      <a href="product-detail.html?id=13">Waterproof</a>
    </div>
    <div class="menu-column">
      <h4>Marketing Products</h4>
      <a href="product-detail.html?id=14">Booklets</a>
      <a href="product-detail.html?id=15">Calendars</a>
      <a href="product-detail.html?id=16">CD and DVD</a>
      <a href="product-detail.html?id=17">Catalogs</a>
      <a href="product-detail.html?id=18">Door Hangers</a>
      <a href="product-detail.html?id=19">Event Tickets</a>
      <a href="product-detail.html?id=20">Flyers and Brochures</a>
      <a href="product-detail.html?id=21">Hang Tags</a>
      <a href="product-detail.html?id=22">Header Cards</a>
      <a href="product-detail.html?id=23">Magnets</a>
      <a href="product-detail.html?id=24">Menus</a>
      <a href="product-detail.html?id=25">Postcards</a>
      <a href="product-detail.html?id=26">Presentation Folders</a>
      <a href="product-detail.html?id=27">Rack Cards</a>
      <a href="product-detail.html?id=28">Roll Labels</a>
      <a href="product-detail.html?id=29">Sell Sheets</a>
      <a href="product-detail.html?id=30">Stickers</a>
      <a href="product-detail.html?id=31">Tear Off Cards</a>
      <a href="product-detail.html?id=32">Trading Cards</a>
    </div>
    <div class="menu-column">
      <h4>Stationery Products</h4>
      <a href="product-detail.html?id=33">Announcement Cards</a>
      <a href="product-detail.html?id=34">Envelope</a>
      <a href="product-detail.html?id=35">Greeting Cards</a>
      <a href="product-detail.html?id=36">Letterhead</a>
      <a href="product-detail.html?id=37">NCR Forms</a>
      <a href="product-detail.html?id=38">Natural Cards</a>
      <a href="product-detail.html?id=39">Notepads</a>
      <a href="product-detail.html?id=40">Pearl Cards</a>
    </div>
    <div class="menu-column">
      <h4>Signs & Posters</h4>
      <a href="product-detail.html?id=41">Adhesive Vinyl</a>
      <a href="product-detail.html?id=42">Car Magnets</a>
      <a href="product-detail.html?id=43">Fabric Banners</a>
      <a href="product-detail.html?id=44">Indoor Banners</a>
      <a href="product-detail.html?id=45">Large Posters</a>
      <a href="product-detail.html?id=46">Outdoor Banners</a>
      <a href="product-detail.html?id=47">Posters</a>
      <a href="product-detail.html?id=48">Sidewalk Signs</a>
      <a href="product-detail.html?id=49">Signs</a>
      <a href="product-detail.html?id=50">Window Clings</a>
      <a href="product-detail.html?id=51">Window Graphics</a>
    </div>
    <div class="menu-column">
      <h4>Displays</h4>
      <a href="product-detail.html?id=52">Banners with Stand</a>
      <a href="product-detail.html?id=53">Counter Cards</a>
      <a href="product-detail.html?id=54">Displays</a>
      <a href="product-detail.html?id=55">Event Tents</a>
      <a href="product-detail.html?id=56">Flags</a>
      <a href="product-detail.html?id=57">Table Covers</a>
      <a href="product-detail.html?id=58">Table Tent Cards</a>
    </div>
    <div class="menu-column">
      <h4>Specialty Products</h4>
      <a href="product-detail.html?id=59">Mounted Canvas</a>
      <a href="product-detail.html?id=60">Packaging</a>
    </div>
    <div class="menu-column">
      <h4>Promotional Items</h4>
      <a href="product-detail.html?id=61">Buttons</a>
      <a href="product-detail.html?id=62">Mugs</a>
      <a href="product-detail.html?id=63">T-Shirts</a>
      <a href="product-detail.html?id=64">Tote Bags</a>
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
      item.addEventListener("click", (e) => {
        e.stopPropagation();
        const isVisible = resSubmenu.classList.contains("visible");
        resSubmenuContent.innerHTML = menus[key] || "";
        resSubmenu.classList.toggle("visible", !isVisible);
      });
    } else {
      item.addEventListener("mouseenter", showSubmenu);
      item.addEventListener("mouseleave", hideSubmenu);
    }

    resSubmenu.addEventListener("mouseenter", () => clearTimeout(hideTimeout));
    resSubmenu.addEventListener("mouseleave", hideSubmenu);
  });

  document.addEventListener("click", (e) => {
    if (!resSubmenu.contains(e.target)) {
      resSubmenu.classList.remove("visible");
    }
  });
}
