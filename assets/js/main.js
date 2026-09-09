document.getElementById('year').textContent = new Date().getFullYear();

/* ---------- Header on scroll ---------- */
const header = document.getElementById('siteHeader');
const onScroll = () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ---------- Mobile nav ---------- */
const burger = document.getElementById('burger');
const nav = document.getElementById('mainNav');
burger.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  if (open) {
    nav.style.display = 'flex';
    nav.style.flexDirection = 'column';
    nav.style.position = 'fixed';
    nav.style.top = '64px';
    nav.style.left = '0';
    nav.style.right = '0';
    nav.style.background = 'rgba(11,12,14,.97)';
    nav.style.padding = '24px 32px';
    nav.style.borderTop = '1px solid rgba(255,255,255,.08)';
  } else {
    nav.removeAttribute('style');
  }
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  nav.removeAttribute('style');
}));

/* ---------- Cursor glow ---------- */
const glow = document.getElementById('cursorGlow');
let gx = 0, gy = 0, cx = 0, cy = 0;
window.addEventListener('mousemove', (e) => { gx = e.clientX; gy = e.clientY; });
(function loop() {
  cx += (gx - cx) * 0.12;
  cy += (gy - cy) * 0.12;
  glow.style.transform = `translate(${cx}px, ${cy}px)`;
  requestAnimationFrame(loop);
})();

/* ---------- Reveal on scroll (IntersectionObserver) ---------- */
const revealEls = document.querySelectorAll('[data-reveal]');
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const delay = (Array.from(el.parentElement.children).indexOf(el) % 4) * 90;
      el.style.animationDelay = `${delay}ms`;
      el.classList.add('is-visible');
      io.unobserve(el);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
revealEls.forEach(el => io.observe(el));

/* ---------- Tilt effect on material cards ---------- */
document.querySelectorAll('[data-tilt]').forEach(card => {
  const strength = 10;
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(900px) rotateX(${(-py * strength).toFixed(2)}deg) rotateY(${(px * strength).toFixed(2)}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(900px) rotateX(0) rotateY(0) translateY(0)';
  });
});

/* ---------- GSAP ScrollTrigger parallax ---------- */
if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);

  gsap.to('.parallax-bg', {
    yPercent: 20,
    ease: 'none',
    scrollTrigger: {
      trigger: '.advantages',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  });

  gsap.utils.toArray('.gallery-item').forEach((item, i) => {
    gsap.fromTo(item,
      { y: i % 2 === 0 ? 40 : -40 },
      {
        y: i % 2 === 0 ? -20 : 20,
        ease: 'none',
        scrollTrigger: {
          trigger: '.gallery-track',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      }
    );
  });

  gsap.to('.hero-grid', {
    yPercent: -15,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });
}

/* ---------- Form submit (demo) ---------- */
const calcForm = document.querySelector('.calc-form');
if (calcForm) {
  calcForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = calcForm.querySelector('button');
    const original = btn.textContent;
    btn.textContent = 'Дякуємо! Ми зв\'яжемось з вами';
    btn.style.pointerEvents = 'none';
    setTimeout(() => {
      btn.textContent = original;
      btn.style.pointerEvents = 'auto';
      calcForm.reset();
    }, 3000);
  });
}
