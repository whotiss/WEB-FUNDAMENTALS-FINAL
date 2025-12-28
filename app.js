/* app.js — with product image paths embedded */

const PRODUCTS = [
  { id: 1, title: "Antibacterial Surgical Mask (Box of 50)", category: "ppe", price: 50, sale: 62, desc: "Triple-layer with nose clip", img: "assets/products/product-1-mask-box.png", thumb: "assets/thumbs/t-product-1.png" },
  { id: 2, title: "Digital IR Thermometer", category: "devices", price: 50, sale: 62, desc: "Fast non-contact reading", img: "assets/products/product-2-thermometer.png", thumb: "assets/thumbs/t-product-2.png" },
  { id: 3, title: "Hand Sanitizer 500ml", category: "personal", price: 8, sale: 12, desc: "70% alcohol formula", img: "assets/products/product-3-sanitizer.png", thumb: "assets/thumbs/t-product-3.png" },
  { id: 4, title: "First Aid Kit (Portable)", category: "firstaid", price: 28, sale: 36, desc: "Bandages, antiseptic & more", img: "assets/products/product-4-firstaid.png", thumb: "assets/thumbs/t-product-4.png" },
  { id: 5, title: "Nitrile Gloves (100 pcs)", category: "ppe", price: 18, sale: 24, desc: "Powder-free disposable gloves", img: "assets/products/product-5-gloves.png", thumb: "assets/thumbs/t-product-5.png" },
  { id: 6, title: "Pulse Oximeter", category: "devices", price: 34, sale: 45, desc: "Accurate blood oxygen reading", img: "assets/products/product-6-oximeter.png", thumb: "assets/thumbs/t-product-6.png" },
  { id: 7, title: "Medical Face Shield", category: "ppe", price: 12, sale: 18, desc: "Reusable protective shield", img: "assets/products/product-7-faceshield.png", thumb: "assets/thumbs/t-product-7.png" },
  { id: 8, title: "Antiseptic Wipes (Pack of 30)", category: "personal", price: 5, sale: 8, desc: "Kills 99.9% germs", img: "assets/products/product-8-wipes.png", thumb: "assets/thumbs/t-product-8.png" },
];

// Items added from the shop page use string IDs; this list aligns those IDs to the cart renderer
const SHOP_PRODUCTS = [
  { id: 'med-1', title: "Moderna's Vaccine", category: 'devices', price: 168.99, sale: 264.99, desc: 'mRNA vial with controlled cold-chain packaging.', img: 'assets/products/vaccine.png', thumb: 'assets/products/vaccine.png' },
  { id: 'pers-1', title: 'Hand Sanitizer 500ml', category: 'personal', price: 108.99, sale: 264.99, desc: '70% alcohol with moisturizer, non-sticky finish.', img: 'assets/products/sanitizer.png', thumb: 'assets/products/sanitizer.png' },
  { id: 'ppe-1', title: 'Hand Gloves (Blue)', category: 'ppe', price: 18.99, sale: 264.99, desc: 'Latex-free disposable gloves for sensitive skin.', img: 'assets/products/gloves.png', thumb: 'assets/products/gloves.png' },
  { id: 'ppe-2', title: 'Medical Apron', category: 'ppe', price: 80.99, sale: 120.0, desc: 'Fluid-resistant apron with breathable back panel.', img: 'assets/products/apron.png', thumb: 'assets/products/apron.png' },
  { id: 'supp-1', title: 'Food Supplement', category: 'personal', price: 280.99, sale: 320.0, desc: 'Essential micronutrients for daily immunity.', img: 'assets/products/supplement.png', thumb: 'assets/products/supplement.png' },
  { id: 'dev-1', title: 'Mesh Nebulizer', category: 'devices', price: 200.99, sale: 240.0, desc: 'Portable mesh tech for quieter treatments.', img: 'assets/products/nebulizer.png', thumb: 'assets/products/nebulizer.png' },
  { id: 'ppe-3', title: 'White 3D Mask N95', category: 'ppe', price: 80.99, sale: 110.0, desc: 'N95-rated 3D mask with snug nose bridge.', img: 'assets/products/masks.png', thumb: 'assets/products/masks.png' },
  { id: 'dev-2', title: 'Blood Pressure Monitor', category: 'devices', price: 200.99, sale: 260.0, desc: 'Upper-arm digital monitor with memory log.', img: 'assets/products/bloodpressure.png', thumb: 'assets/products/bloodpressure.png' },
  { id: 'med-2', title: 'Medicine Box Pack', category: 'devices', price: 168.99, sale: 214.0, desc: 'Week-long organizer with tamper seals.', img: 'assets/products/medince.png', thumb: 'assets/products/medince.png' },
  { id: 'ppe-4', title: 'Antibacterial Surgical Mask (Box of 50)', category: 'ppe', price: 50.0, sale: 62.0, desc: 'Triple-layer surgical masks with nose clip and comfort fit.', img: 'assets/products/mask%202.png', thumb: 'assets/products/mask%202.png' },
  { id: 'dev-3', title: 'Digital IR Thermometer', category: 'devices', price: 50.0, sale: 62.0, desc: 'Fast non-contact readings with backlit display.', img: 'assets/products/thermometer.png', thumb: 'assets/products/thermometer.png' },
];

/* rest of the app.js remains the same as the animation-upgraded version,
   but the product rendering uses p.img / p.thumb for images.
   For convenience, below are the renderShopGrid and renderCartPage functions
   that render <img src="..."> with the embedded paths.
*/

function formatCurrency(n) { return '$' + n.toFixed(2); }
const STORAGE_KEY = 'medimela_cart_v1';
let cart = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
function saveCart() { localStorage.setItem(STORAGE_KEY, JSON.stringify(cart)); updateNavCartCounts(); }
function findProduct(id) {
  // Try numeric catalog first
  const numMatch = PRODUCTS.find(p => p.id === Number(id));
  if (numMatch) return numMatch;
  // Fallback to shop-page string IDs
  return SHOP_PRODUCTS.find(p => p.id === id) || null;
}
function cartTotalCount() { return Object.values(cart).reduce((s, q) => s + q, 0); }
function cartTotalAmount() {
  return Object.keys(cart).reduce((s, id) => {
    const prod = findProduct(id);
    if (!prod) return s;
    return s + (prod.price * cart[id]);
  }, 0);
}

/* update nav counts */
function updateNavCartCounts() {
  document.querySelectorAll('#navCartCount, #navCartCount2').forEach(el => {
    if (!el) return;
    el.textContent = cartTotalCount();
  });
}
updateNavCartCounts();

/* add / set / decrease / clear */
function addToCart(id, qty = 1) { id = String(id); cart[id] = (cart[id] || 0) + qty; saveCart(); }
function decreaseFromCart(id) { id = String(id); if (!cart[id]) return; cart[id]--; if (cart[id] <= 0) delete cart[id]; saveCart(); }
function setCartQty(id, qty) { id = String(id); if (qty <= 0) delete cart[id]; else cart[id] = qty; saveCart(); }
function clearCart() { cart = {}; saveCart(); }

/* helper for ripple (optional) */
function attachRipple(el) { el.addEventListener('click', function (e) { const r = document.createElement('span'); r.style.position = 'absolute'; r.style.borderRadius = '50%'; r.style.pointerEvents = 'none'; r.style.width = r.style.height = '10px'; r.style.background = 'rgba(255,255,255,0.18)'; r.style.transform = 'translate(-50%,-50%) scale(0)'; r.style.left = e.offsetX + 'px'; r.style.top = e.offsetY + 'px'; r.style.transition = 'transform .5s ease, opacity .5s ease'; this.style.position = 'relative'; this.appendChild(r); requestAnimationFrame(() => { r.style.transform = 'translate(-50%,-50%) scale(25)'; r.style.opacity = '0'; }); setTimeout(() => r.remove(), 520); }); }

/* render shop grid (uses product images) */
function renderShopGrid(containerId = 'shopGrid', opts = {}) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const params = new URLSearchParams(location.search);
  const initialCat = params.get('cat') || '';
  const urlFilter = opts.cat || initialCat;

  const catSel = document.getElementById('shopCat');
  const searchInput = document.getElementById('shopSearch');
  const sortSel = document.getElementById('shopSort');

  let cat = urlFilter || (catSel ? catSel.value : '');
  let q = (searchInput ? searchInput.value : '').toLowerCase();
  let sort = sortSel ? sortSel.value : 'pop';

  let items = PRODUCTS.filter(p =>
    (!cat || p.category === cat) &&
    (!q || p.title.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q))
  );

  if (sort === 'price-asc') items.sort((a, b) => a.price - b.price);
  if (sort === 'price-desc') items.sort((a, b) => b.price - a.price);

  container.innerHTML = '';

  items.forEach(p => {
    const el = document.createElement('div');

    /* 🔑 FORCE VISIBILITY FOR SHOP */
    el.className = 'card in';

    el.innerHTML = `
            <div class="sale-badge">${Math.round((1 - p.price / p.sale) * 100)}% OFF</div>

            <div class="img-wrap">
                <img src="${p.img}" alt="${p.title}">
            </div>

            <div class="product-title">${p.title}</div>
            <div class="product-sub">${p.desc}</div>

            <div class="product-footer">
                <div>
                    <div class="price">${formatCurrency(p.price)}</div>
                    <div class="muted"><del>${formatCurrency(p.sale)}</del></div>
                </div>
                <div style="display:flex; gap:8px">
                    <button class="ghost" data-wish="${p.id}">♡</button>
                    <button class="add" data-add="${p.id}">Add</button>
                </div>
            </div>
        `;

    container.appendChild(el);
  });

  /* add to cart */
  container.querySelectorAll('[data-add]').forEach(b => {
    b.addEventListener('click', () => {
      addToCart(b.dataset.add, 1);
      updateNavCartCounts();
      b.textContent = 'Added';
      setTimeout(() => b.textContent = 'Add', 700);
    });
    attachRipple(b);
  });

  /* wishlist */
  container.querySelectorAll('[data-wish]').forEach(b => {
    b.addEventListener('click', () => {
      b.classList.toggle('liked');
      b.textContent = b.classList.contains('liked') ? '♥' : '♡';
    });
  });
}

/* render cart page with thumbs */
function renderCartPage() {
  const container = document.getElementById('cartPage'); if (!container) return;
  const keys = Object.keys(cart);

  if (keys.length === 0) {
    container.innerHTML = `<div class="cart-empty card"><div class="muted">Your cart is empty. <a href="shop.html">Go shopping</a></div></div>`;
    return;
  }

  const list = document.createElement('div');
  list.className = 'cart-items';

  keys.forEach(id => {
    const p = findProduct(id); const qty = cart[id];
    if (!p) return; // skip unknown items
    const row = document.createElement('div'); row.className = 'cart-item card';
    row.innerHTML = `
      <div class="cart-item-left">
        <div class="miniimg"><img src="${p.thumb || p.img}" alt="${p.title}"></div>
        <div class="cart-item-info">
          <div class="cart-item-title">${p.title}</div>
          <div class="muted">${formatCurrency(p.price)} each</div>
          <div class="cart-qty">
            <button class="ghost" data-dec="${p.id}" aria-label="Decrease quantity">−</button>
            <input type="number" min="0" value="${qty}" data-qty="${p.id}">
            <button class="ghost" data-inc="${p.id}" aria-label="Increase quantity">+</button>
            <button class="ghost danger" data-rem="${p.id}">Remove</button>
          </div>
        </div>
      </div>
      <div class="cart-item-price">${formatCurrency(p.price * qty)}</div>
    `;
    list.appendChild(row);
  });

  const summary = document.createElement('aside');
  summary.className = 'cart-summary card';
  summary.innerHTML = `
    <h3>Order Summary</h3>
    <div class="sum-row"><span>Items</span><span>${cartTotalCount()}</span></div>
    <div class="sum-row"><span>Subtotal</span><span>${formatCurrency(cartTotalAmount())}</span></div>
    <div class="sum-row"><span>Shipping</span><span>Free</span></div>
    <div class="sum-row total"><span>Total</span><span>${formatCurrency(cartTotalAmount())}</span></div>
    <div class="pay-methods" aria-label="Payment methods">
      <span class="pay-badge">Visa</span>
      <span class="pay-badge">Mastercard</span>
      <span class="pay-badge">PayPal</span>
      <span class="pay-badge">Apple Pay</span>
    </div>
    <button class="cta" id="checkoutNow">Checkout</button>
    <button class="ghost" id="clearCartBtn">Clear cart</button>
  `;

  container.innerHTML = '';
  container.appendChild(list);
  container.appendChild(summary);

  container.querySelectorAll('[data-dec]').forEach(b => b.addEventListener('click', () => { decreaseFromCart(b.getAttribute('data-dec')); renderCartPage(); }));
  container.querySelectorAll('[data-inc]').forEach(b => b.addEventListener('click', () => { addToCart(b.getAttribute('data-inc'), 1); renderCartPage(); }));
  container.querySelectorAll('[data-rem]').forEach(b => b.addEventListener('click', () => { setCartQty(b.getAttribute('data-rem'), 0); renderCartPage(); }));
  container.querySelectorAll('input[data-qty]').forEach(inp => { inp.addEventListener('change', () => { const id = inp.getAttribute('data-qty'); const v = Number(inp.value) || 0; setCartQty(id, v); renderCartPage(); }); });

  const clearBtn = document.getElementById('clearCartBtn');
  if (clearBtn) clearBtn.addEventListener('click', () => { clearCart(); renderCartPage(); });
  const checkoutBtn = document.getElementById('checkoutNow');
  if (checkoutBtn) checkoutBtn.addEventListener('click', () => alert('Demo checkout — connect your payment gateway.'));
}

/* small inits omitted: hero parallax, header scroll, tilt, etc. Use the animation-capable app.js previously provided for those utilities. */

/* DOM loaded hook: render pages appropriately */
document.addEventListener('DOMContentLoaded', function () {
  updateNavCartCounts();
  if (document.getElementById('shopGrid')) renderShopGrid('shopGrid');
  if (document.getElementById('cartPage')) renderCartPage();

  // mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  if (navToggle && mobileMenu) {
    // force closed on load
    mobileMenu.setAttribute('hidden', '');
    navToggle.setAttribute('aria-expanded', 'false');

    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = mobileMenu.hasAttribute('hidden') === false;
      if (isOpen) {
        mobileMenu.setAttribute('hidden', '');
        navToggle.setAttribute('aria-expanded', 'false');
      } else {
        mobileMenu.removeAttribute('hidden');
        navToggle.setAttribute('aria-expanded', 'true');
      }
    });

    mobileMenu.addEventListener('click', () => {
      mobileMenu.setAttribute('hidden', '');
      navToggle.setAttribute('aria-expanded', 'false');
    });

    document.addEventListener('click', (evt) => {
      if (mobileMenu.hasAttribute('hidden')) return;
      const target = evt.target;
      if (mobileMenu.contains(target) || navToggle.contains(target)) return;
      mobileMenu.setAttribute('hidden', '');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  }
});
