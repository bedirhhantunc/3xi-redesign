// animations.js — GSAP ScrollTrigger animations

document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  initHeroAnimations();
  initScrollAnimations();
  initStatsCounter();
  initGoldLines();
});

function initHeroAnimations() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const tl = gsap.timeline({ delay: 0.3 });

  // Gold line
  const goldLine = hero.querySelector('.gold-line');
  if (goldLine) {
    tl.fromTo(goldLine, { width: 0 }, { width: 60, duration: 0.6, ease: 'power2.out' });
  }

  // Label
  const label = hero.querySelector('.hero__label');
  if (label) {
    tl.fromTo(label, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 }, '-=0.2');
  }

  // Title - split into words for reveal
  const title = hero.querySelector('.hero__title');
  if (title) {
    const text = title.textContent;
    const words = text.split(' ');
    title.innerHTML = words.map(w => `<span class="word" style="display:inline-block;opacity:0;transform:translateY(20px)">${w}</span>`).join(' ');
    const wordSpans = title.querySelectorAll('.word');
    tl.to(wordSpans, {
      opacity: 1, y: 0,
      stagger: 0.04,
      duration: 0.5,
      ease: 'power2.out'
    }, '-=0.1');
  }

  // Subtitle
  const subtitle = hero.querySelector('.hero__subtitle');
  if (subtitle) {
    tl.fromTo(subtitle, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3');
  }

  // Buttons
  const buttons = hero.querySelector('.hero__buttons');
  if (buttons) {
    tl.fromTo(buttons, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3');
  }

  // Stats
  const stats = hero.querySelectorAll('.stat');
  if (stats.length) {
    tl.fromTo(stats,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.5 },
      '-=0.2'
    );
  }

  // Scroll indicator
  const scroll = hero.querySelector('.hero__scroll');
  if (scroll) {
    tl.fromTo(scroll, { opacity: 0 }, { opacity: 1, duration: 0.5 }, '-=0.2');
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
