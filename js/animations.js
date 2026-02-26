// animations.js — GSAP ScrollTrigger animations

document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  initHeroAnimations();
  initScrollAnimations();
  initStatsCounter();
  initGoldLines();
  initTimelineProgress();
});

function initHeroAnimations() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  // Hero entrance is handled by CSS keyframes (hero__fade classes).
  // GSAP adds parallax scroll effect on the hero content.
  const center = hero.querySelector('.hero__center-inner');
  if (center) {
    gsap.to(center, {
      y: -60,
      opacity: 0.3,
      ease: 'none',
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
  }

  const partners = hero.querySelector('.hero__partners');
  if (partners) {
    gsap.to(partners, {
      y: -30,
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: hero,
        start: '60% top',
        end: 'bottom top',
        scrub: true
      }
    });
  }
}

function initScrollAnimations() {
  // Fade up
  gsap.utils.toArray('[data-animate="fade-up"]').forEach(el => {
    gsap.to(el, {
      opacity: 1, y: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true }
    });
  });

  // Fade in
  gsap.utils.toArray('[data-animate="fade-in"]').forEach(el => {
    gsap.to(el, {
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true }
    });
  });

  // Scale in
  gsap.utils.toArray('[data-animate="scale-in"]').forEach(el => {
    gsap.to(el, {
      opacity: 1, scale: 1,
      duration: 0.6,
      ease: 'back.out(1.5)',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true }
    });
  });

  // Staggered children
  gsap.utils.toArray('[data-stagger]').forEach(parent => {
    gsap.fromTo(parent.children,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: { trigger: parent, start: 'top 80%', once: true }
      }
    );
  });
}

function initStatsCounter() {
  gsap.utils.toArray('.stat__number[data-count]').forEach(el => {
    const raw = el.dataset.count;
    const hasDot = raw.includes('.');
    const target = parseInt(raw.replace(/\./g, ''), 10);

    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: 'power2.out',
          onUpdate: () => {
            const v = Math.floor(obj.val);
            if (hasDot) {
              el.textContent = v.toLocaleString('nl-NL');
            } else {
              el.textContent = v.toLocaleString('nl-NL');
            }
          }
        });
      }
    });
  });
}

function initGoldLines() {
  gsap.utils.toArray('.gold-line[data-animate]').forEach(line => {
    // Skip hero gold lines (handled by hero timeline)
    if (line.closest('.hero')) return;

    gsap.fromTo(line,
      { width: 0 },
      {
        width: 60,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: { trigger: line, start: 'top 85%', once: true }
      }
    );
  });
}

function initTimelineProgress() {
  const container = document.querySelector('.tl');
  const track = document.querySelector('.tl__track');
  const progress = document.querySelector('.tl__progress');

  if (!container || !track || !progress) return;

  const trackHeight = track.offsetHeight;

  // Scroll-driven progress line (replicates framer-motion useScroll)
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: 'top 10%',
      end: 'bottom 50%',
      scrub: true,
    }
  });

  // Opacity: fade in during first 10% of scroll
  tl.fromTo(progress, { opacity: 0 }, { opacity: 1, duration: 0.1 }, 0);
  // Height: grow from 0 to full track height over entire scroll
  tl.fromTo(progress, { height: 0 }, { height: trackHeight + 'px', duration: 1, ease: 'none' }, 0);

  // Stagger entry reveal
  gsap.utils.toArray('.tl__entry').forEach(entry => {
    gsap.fromTo(entry,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: { trigger: entry, start: 'top 85%', once: true }
      }
    );
  });
}
