(() => {
  'use strict';

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

  /* Header: compact on scroll, hide down / reveal up. */
  const header = $('.site-header');
  let lastY = Math.max(window.scrollY, 0);
  let ticking = false;

  const syncHeader = () => {
    if (!header) return;
    const y = Math.max(window.scrollY, 0);
    header.classList.toggle('scrolled', y > 24);
    if (y <= 24 || y < lastY - 4) header.classList.remove('nav-hidden');
    else if (y > lastY + 4) header.classList.add('nav-hidden');
    lastY = y;
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(syncHeader);
      ticking = true;
    }
  }, { passive: true });
  syncHeader();

  /* Reveal animation. */
  const reveal = $$('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    reveal.forEach(el => observer.observe(el));
  } else reveal.forEach(el => el.classList.add('visible'));

  /* Mobile menu. */
  const mobileMenu = $('.mobile-menu');
  const menuButton = $('.menu-btn');
  const closeMenu = () => {
    mobileMenu?.classList.remove('open');
    mobileMenu?.setAttribute('aria-hidden', 'true');
    menuButton?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };
  menuButton?.addEventListener('click', () => {
    mobileMenu?.classList.add('open');
    mobileMenu?.setAttribute('aria-hidden', 'false');
    menuButton?.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  });
  $$('[data-close-mobile]').forEach(el => el.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

  /* Smooth same-page navigation. */
  $$('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const id = link.getAttribute('href');
      if (!id || id === '#') return;
      const target = $(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      closeMenu();
    });
  });

  /* Search drawer. */
  const drawer = $('.drawer');
  const searchInput = $('#searchInput');
  const searchResults = $('#searchResults');
  const searchData = [
    ['3 BHK Bhopal', 'Real Estate', 'real-estate.html'],
    ['Plots & Land', 'Real Estate', 'real-estate.html'],
    ['Dubai', 'Travel', 'travel.html'],
    ['Honeymoon', 'Travel', 'travel.html'],
    ['Hajj & Umrah', 'Travel', 'travel.html'],
    ['MBBS', 'Education & Admissions', 'education.html'],
    ['Engineering', 'Education & Admissions', 'education.html'],
    ['Study Abroad', 'Education & Admissions', 'education.html'],
    ['GST', 'Consultancy & Business Services', 'consultancy.html'],
    ['MSME UDYAM', 'Consultancy & Business Services', 'consultancy.html'],
    ['Wedding Venue', 'Events & Weddings', 'events.html'],
    ['Corporate Event', 'Events & Weddings', 'events.html']
  ];

  const renderSearch = (query = '') => {
    if (!searchResults) return;
    const term = query.trim().toLowerCase();
    if (!term) {
      searchResults.innerHTML = '<div class="result"><strong>Start typing a requirement</strong><small>Try “3 BHK Bhopal”, “Dubai”, “MBBS” or “GST”.</small></div>';
      return;
    }
    const matches = searchData.filter(item => item[0].toLowerCase().includes(term) || item[1].toLowerCase().includes(term));
    searchResults.innerHTML = matches.length
      ? matches.map(item => `<a class="result" href="${item[2]}"><strong>${item[0]}</strong><small>→ ${item[1]}</small></a>`).join('')
      : '<div class="result"><strong>No exact match found</strong><small>Try a different requirement.</small></div>';
  };

  $$('[data-search]').forEach(btn => btn.addEventListener('click', () => {
    drawer?.classList.add('open');
    drawer?.setAttribute('aria-hidden', 'false');
    setTimeout(() => searchInput?.focus(), 80);
  }));
  $$('[data-close-search]').forEach(btn => btn.addEventListener('click', () => {
    drawer?.classList.remove('open');
    drawer?.setAttribute('aria-hidden', 'true');
  }));
  drawer?.addEventListener('click', e => {
    if (e.target === drawer) {
      drawer.classList.remove('open');
      drawer.setAttribute('aria-hidden', 'true');
    }
  });
  searchInput?.addEventListener('input', e => renderSearch(e.target.value));
  renderSearch();

  /* Service View More. */
  $$('.service-more').forEach(details => {
    const summary = $('summary', details);
    if (!summary) return;
    details.addEventListener('toggle', () => {
      const text = details.open ? 'View Less' : 'View More';
      summary.childNodes[0].textContent = text;
    });
  });

  /* Requirement forms: frontend confirmation only, ready for backend wiring. */
  $$('form.requirement-form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      const success = $('.form-success', form);
      if (success) success.textContent = 'Thank you. Your requirement has been received. Our team will connect with you shortly.';
      form.reset();
    });
  });

  /* Five-wing C-orbit on the homepage. */
  const orbit = $('#layeredOrbit');
  const wings = $$('.layered-wing');
  const prev = $('#layeredPrev');
  const next = $('#layeredNext');
  const dots = $('#layeredDots');
  const slots = ['position-left', 'position-far-left', 'is-active', 'position-right', 'position-far-right'];
  const count = wings.length;
  let currentSlot = 0;
  let timer = null;
  let paused = false;

  const updateDots = () => {
    $$('.layered-dot', dots).forEach((dot, i) => {
      const relative = (i - currentSlot + count) % count;
      dot.classList.toggle('active', relative === 2);
    });
  };

  const updateOrbit = () => {
    if (!orbit || count !== 5) return;
    wings.forEach((wing, i) => {
      slots.forEach(cls => wing.classList.remove(cls));
      const relative = (i - currentSlot + count) % count;
      wing.classList.add(slots[relative]);
      wing.setAttribute('aria-current', relative === 2 ? 'true' : 'false');
    });
    updateDots();
  };

  const nextWing = () => { currentSlot = (currentSlot - 1 + count) % count; updateOrbit(); };
  const previousWing = () => { currentSlot = (currentSlot + 1) % count; updateOrbit(); };
  const stop = () => { if (timer) clearInterval(timer); timer = null; };
  const start = () => {
    stop();
    if (!orbit || count !== 5 || paused) return;
    timer = setInterval(() => { if (!paused) nextWing(); }, 4300);
  };

  if (orbit && count === 5) {
    wings.forEach((wing, i) => {
      wing.addEventListener('mouseenter', () => { paused = true; stop(); });
      wing.addEventListener('mouseleave', () => { paused = false; start(); });
      wing.addEventListener('click', e => {
        const relative = (i - currentSlot + count) % count;
        if (relative !== 2) {
          e.preventDefault();
          currentSlot = (i - 2 + count) % count;
          updateOrbit();
          start();
        }
      });
    });
    if (dots) {
      wings.forEach((wing, i) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'layered-dot';
        dot.setAttribute('aria-label', `Select ${wing.innerText.replace(/\s+/g, ' ').trim()}`);
        dot.addEventListener('click', () => {
          currentSlot = (i - 2 + count) % count;
          updateOrbit();
          start();
        });
        dots.appendChild(dot);
      });
    }
    next?.addEventListener('click', () => { nextWing(); start(); });
    prev?.addEventListener('click', () => { previousWing(); start(); });
    let touchX = 0;
    orbit.addEventListener('touchstart', e => { touchX = e.changedTouches[0].screenX; paused = true; stop(); }, { passive: true });
    orbit.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].screenX - touchX;
      if (Math.abs(dx) > 45) dx < 0 ? nextWing() : previousWing();
      paused = false;
      start();
    }, { passive: true });
    updateOrbit();
    start();
  }
})();
