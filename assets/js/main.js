document.getElementById('year').textContent = new Date().getFullYear();

/* ---------- Header on scroll ---------- */
const header = document.getElementById('siteHeader');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ---------- Mobile nav ---------- */
const burger = document.getElementById('burger');
const nav = document.getElementById('mainNav');
burger.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  if (open) {
    Object.assign(nav.style, {
      display: 'flex', flexDirection: 'column', position: 'fixed',
      top: '64px', left: '0', right: '0', background: 'rgba(60,49,37,.98)',
      padding: '24px 32px', borderTop: '1px solid rgba(255,255,255,.1)'
    });
    nav.querySelectorAll('a').forEach(a => a.style.color = '#fff');
  } else {
    nav.removeAttribute('style');
    nav.querySelectorAll('a').forEach(a => a.removeAttribute('style'));
  }
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  nav.removeAttribute('style');
  nav.querySelectorAll('a').forEach(el => el.removeAttribute('style'));
}));

/* ---------- Reveal on scroll ---------- */
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const siblings = Array.from(el.parentElement.children).filter(c => c.hasAttribute('data-reveal'));
      const delay = (siblings.indexOf(el) % 4) * 90;
      el.style.animationDelay = `${delay}ms`;
      el.classList.add('is-visible');
      io.unobserve(el);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));

/* ---------- Hero parallax (simple scroll-based) ---------- */
const heroBg = document.querySelector('.hero-bg');
if (heroBg) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < window.innerHeight) {
      heroBg.style.transform = `translateY(${y * 0.25}px) scale(1.02)`;
    }
  }, { passive: true });
}

/* ---------- GSAP parallax for "why" section ---------- */
if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
  gsap.to('.why .parallax-bg', {
    yPercent: 18, ease: 'none',
    scrollTrigger: { trigger: '.why', start: 'top bottom', end: 'bottom top', scrub: true }
  });
}

/* ---------- Product grid render + filter ---------- */
const grid = document.getElementById('productGrid');
if (grid && window.PRODUCTS) {
  grid.innerHTML = PRODUCTS.map((p, i) => `
    <div class="product-card" data-series="${p.series}" data-index="${i}" data-reveal>
      <span class="product-card-code">${p.code}</span>
      <img src="assets/img/${p.img}" alt="${p.code}" loading="lazy">
      <div class="product-card-overlay"><p>${p.desc}</p></div>
    </div>
  `).join('');
  grid.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));

  const tabs = document.querySelectorAll('.filter-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('is-active'));
      tab.classList.add('is-active');
      const filter = tab.dataset.filter;
      grid.querySelectorAll('.product-card').forEach(card => {
        card.classList.toggle('is-hidden', filter !== 'all' && card.dataset.series !== filter);
      });
    });
  });

  document.querySelectorAll('[data-filter-open]').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.filterOpen;
      const tab = document.querySelector(`.filter-tab[data-filter="${target}"]`);
      if (tab) tab.click();
      document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' });
    });
  });

  /* ---------- Lightbox ---------- */
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightboxImg');
  const lbCode = document.getElementById('lightboxCode');
  const lbDesc = document.getElementById('lightboxDesc');
  const lbMaterial = document.getElementById('lightboxMaterial');

  grid.addEventListener('click', (e) => {
    const card = e.target.closest('.product-card');
    if (!card) return;
    const p = PRODUCTS[Number(card.dataset.index)];
    lbImg.src = `assets/img/${p.img}`;
    lbImg.alt = p.code;
    lbCode.textContent = p.code;
    lbDesc.textContent = p.desc;
    lbMaterial.textContent = p.material;
    lightbox.classList.add('is-open');
  });

  const closeLightbox = () => lightbox.classList.remove('is-open');
  document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });
}

/* ---------- Form submit (demo) ---------- */
const orderForm = document.querySelector('.order-form');
if (orderForm) {
  orderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = orderForm.querySelector('button');
    const original = btn.textContent;
    btn.textContent = 'Дякуємо! Ми зв\'яжемось з вами';
    btn.style.pointerEvents = 'none';
    setTimeout(() => {
      btn.textContent = original;
      btn.style.pointerEvents = 'auto';
      orderForm.reset();
    }, 3000);
  });
}
