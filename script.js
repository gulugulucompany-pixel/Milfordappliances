// Milford Appliance Repairs: small progressive-enhancement script (no dependencies)
(() => {
  const menuBtn = document.getElementById('menu');
  const drawer = document.getElementById('drawer');

  const setMenu = (open) => {
    if (!menuBtn || !drawer) return;
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    drawer.hidden = !open;
  };

  if (menuBtn && drawer) {
    menuBtn.addEventListener('click', () => setMenu(menuBtn.getAttribute('aria-expanded') !== 'true'));
    drawer.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !drawer.hidden) { setMenu(false); menuBtn.focus(); }
    });
    document.addEventListener('click', (e) => {
      if (!drawer.hidden && !e.target.closest('#drawer') && !e.target.closest('#menu')) setMenu(false);
    });
    window.matchMedia('(min-width: 900px)').addEventListener('change', (m) => { if (m.matches) setMenu(false); });
  }

  // Reveal on scroll
  const items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    items.forEach((el) => io.observe(el));
  } else {
    items.forEach((el) => el.classList.add('is-in'));
  }

  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
