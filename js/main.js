// main.js — Global: navigation, smooth scroll, mobile menu

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  // initNavIndicator(); — removed: pill navbar no longer uses sliding indicator
  initSmoothScroll();
  initMobileMenu();
  initShutterText();
  initBrandTestimonials();
  initChannelCarousel();
  initValueGauges();
});

function initNavigation() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
  }, { passive: true });
}

// ============================================
// NAV INDICATOR — Sliding glow line
// ============================================
function initNavIndicator() {
  const navLinks = document.querySelector('.nav__links');
  if (!navLinks) return;

  const links = Array.from(navLinks.querySelectorAll('.nav__link'));
  if (!links.length) return;

  const activeLink = navLinks.querySelector('.nav__link--active');

  // Create indicator element
  const indicator = document.createElement('div');
  indicator.className = 'nav__indicator';
  navLinks.appendChild(indicator);

  function moveTo(el) {
    if (!el) { indicator.style.opacity = '0'; return; }
    const parentRect = navLinks.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    indicator.style.opacity = '1';
    indicator.style.left = (elRect.left - parentRect.left) + 'px';
    indicator.style.width = elRect.width + 'px';
  }

  // Init: position on active link
  if (activeLink) {
    // No transition on first paint
    indicator.style.transition = 'none';
    moveTo(activeLink);
    // Re-enable transition after paint
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        indicator.style.transition = '';
      });
    });
  } else {
    indicator.style.opacity = '0';
  }

  // Hover → slide to hovered link
  links.forEach(link => {
    link.addEventListener('mouseenter', () => moveTo(link));
  });

  // Leave nav → return to active
  navLinks.addEventListener('mouseleave', () => moveTo(activeLink));

  // Recalculate on resize
  window.addEventListener('resize', () => moveTo(activeLink), { passive: true });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

function initShutterText() {
  document.querySelectorAll('[data-shutter]').forEach((el, lineIndex) => {
    const text = el.textContent.trim();
    const baseDelay = lineIndex * 0.6 + 0.3;
    el.innerHTML = '';

    text.split('').forEach((char, i) => {
      const c = char === ' ' ? '\u00A0' : char;
      const delay = baseDelay + i * 0.04;

      const wrapper = document.createElement('span');
      wrapper.className = 'shutter-char';
      wrapper.style.setProperty('--d', delay + 's');

      const main = document.createElement('span');
      main.className = 'shutter-char__main';
      main.textContent = c;

      const top = document.createElement('span');
      top.className = 'shutter-char__slice shutter-char__slice--top';
      top.textContent = c;

      const mid = document.createElement('span');
      mid.className = 'shutter-char__slice shutter-char__slice--mid';
      mid.textContent = c;

      const bot = document.createElement('span');
      bot.className = 'shutter-char__slice shutter-char__slice--bot';
      bot.textContent = c;

      wrapper.appendChild(main);
      wrapper.appendChild(top);
      wrapper.appendChild(mid);
      wrapper.appendChild(bot);
      el.appendChild(wrapper);
    });
  });

  // Hover → replay shutter animation on each character the mouse touches
  const title = document.querySelector('.hero__title');
  if (!title) return;

  title.querySelectorAll('.shutter-char').forEach(wrapper => {
    wrapper.addEventListener('mouseenter', () => {
      const slices = wrapper.querySelectorAll('.shutter-char__slice');
      const main = wrapper.querySelector('.shutter-char__main');

      // Reset and replay main blur
      main.style.animation = 'none';
      main.offsetHeight; // force reflow
      main.style.animation = 'shutterFadeIn 0.8s ease-out forwards';
      main.style.animationDelay = '0s';

      // Reset and replay slices
      slices.forEach((s, i) => {
        s.style.animation = 'none';
        s.offsetHeight;
        const name = s.classList.contains('shutter-char__slice--mid') ? 'sliceRL' : 'sliceLR';
        s.style.animation = `${name} 0.7s ease-in-out forwards`;
        s.style.animationDelay = (i * 0.1) + 's';
      });
    });
  });
}

function initMobileMenu() {
  const nav = document.querySelector('.nav');
  const hamburger = document.querySelector('.nav__hamburger');
  const mobileLinks = document.querySelector('.nav__mobile-links');
  if (!hamburger || !mobileLinks || !nav) return;

  hamburger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('nav--open');
    hamburger.classList.toggle('active');

    if (typeof gsap !== 'undefined' && isOpen) {
      gsap.fromTo(mobileLinks.querySelectorAll('a'),
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, stagger: 0.06, duration: 0.35, ease: 'power2.out' }
      );
    }
  });

  // Close menu on link click
  mobileLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('nav--open');
      hamburger.classList.remove('active');
    });
  });
}

// ============================================
// CHANNEL CAROUSEL — Profile Card Testimonial style
// ============================================
function initChannelCarousel() {
  const carousel = document.querySelector('.channel-carousel');
  if (!carousel) return;

  const slides = Array.from(carousel.querySelectorAll('.channel-carousel__slide'));
  const dots = Array.from(carousel.querySelectorAll('.channel-carousel__dot'));
  const prevBtn = carousel.querySelector('[data-dir="prev"]');
  const nextBtn = carousel.querySelector('[data-dir="next"]');
  let current = 0;

  function goTo(index) {
    slides[current].classList.remove('channel-carousel__slide--active');
    dots[current].classList.remove('channel-carousel__dot--active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('channel-carousel__slide--active');
    dots[current].classList.add('channel-carousel__dot--active');
  }

  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

  // Auto-advance every 6s, pause on hover
  let timer = setInterval(() => goTo(current + 1), 6000);
  carousel.addEventListener('mouseenter', () => clearInterval(timer));
  carousel.addEventListener('mouseleave', () => {
    timer = setInterval(() => goTo(current + 1), 6000);
  });
}

// ============================================
// BRAND TESTIMONIALS — Typewriter tooltip on hover
// Adapted from React typewriter-testimonial
// ============================================
function initBrandTestimonials() {
  const container = document.querySelector('.brand-row');
  if (!container) return;

  const items = Array.from(container.querySelectorAll('.brand-item'));
  let typeTimer = null;
  let activeItem = null;

  items.forEach(item => {
    // Build tooltip DOM
    const tooltip = document.createElement('div');
    tooltip.className = 'brand-tooltip';
    tooltip.innerHTML =
      '<div class="brand-tooltip__text"></div>' +
      '<div class="brand-tooltip__footer">' +
        '<span class="brand-tooltip__name"></span>' +
        '<span class="brand-tooltip__tag"></span>' +
      '</div>' +
      '<div class="brand-tooltip__tail">' +
        '<div class="brand-tooltip__dot"></div>' +
        '<div class="brand-tooltip__dot"></div>' +
        '<div class="brand-tooltip__dot"></div>' +
      '</div>';
    item.appendChild(tooltip);

    const textEl = tooltip.querySelector('.brand-tooltip__text');
    const nameEl = tooltip.querySelector('.brand-tooltip__name');
    const tagEl = tooltip.querySelector('.brand-tooltip__tag');

    // Mouse enter → start typewriter
    item.addEventListener('mouseenter', () => {
      // Clear previous
      if (typeTimer) { clearTimeout(typeTimer); typeTimer = null; }
      if (activeItem && activeItem !== item) {
        const prev = activeItem.querySelector('.brand-tooltip');
        if (prev) prev.classList.remove('brand-tooltip--visible');
      }

      activeItem = item;
      item.classList.add('brand-item--visited');

      const text = item.dataset.text || '';
      const name = item.dataset.name || '';
      const tag = item.dataset.tag || '';

      nameEl.textContent = name;
      tagEl.textContent = tag;
      tooltip.classList.add('brand-tooltip--visible');

      // Typewriter effect
      let i = 0;
      textEl.innerHTML = '<span class="brand-tooltip__cursor">|</span>';

      function type() {
        if (i <= text.length) {
          textEl.innerHTML = text.slice(0, i) + '<span class="brand-tooltip__cursor">|</span>';
          i++;
          typeTimer = setTimeout(type, 35);
        }
      }
      type();
    });

    // Mouse leave → stop & hide
    item.addEventListener('mouseleave', () => {
      if (typeTimer) { clearTimeout(typeTimer); typeTimer = null; }
      tooltip.classList.remove('brand-tooltip--visible');
      activeItem = null;
    });

    // Click → open brand website
    item.addEventListener('click', () => {
      const href = item.dataset.href;
      if (href) window.open(href, '_blank', 'noopener');
    });
  });
}

// ============================================
// VALUE GAUGES — Half-circle SVG animation
// Animates stroke-dashoffset based on data-score
// ============================================
function initValueGauges() {
  const fills = document.querySelectorAll('.vcard__gauge-fill');
  if (!fills.length) return;

  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const half = circumference / 2;

  // Set initial state (hidden)
  fills.forEach(circle => {
    circle.style.strokeDasharray = `${half} ${half}`;
    circle.style.strokeDashoffset = '0';
  });

  // Animate on scroll into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const circle = entry.target;
        const score = parseInt(circle.dataset.score || '0', 10);
        const offset = Math.min(score / 100, 1) * -half;

        // Animate with WAAPI
        circle.animate([
          { strokeDashoffset: '0' },
          { strokeDashoffset: '0' },
          { strokeDashoffset: offset.toString() }
        ], {
          duration: 1400,
          easing: 'cubic-bezier(0.65, 0, 0.35, 1)',
          fill: 'forwards',
          delay: 400
        });

        observer.unobserve(circle);
      }
    });
  }, { threshold: 0.3 });

  fills.forEach(circle => observer.observe(circle));
}
