// components.js — 3D tilt cards, magnetic buttons

document.addEventListener('DOMContentLoaded', () => {
  initTiltCards();
  initMagneticButtons();
});

function initTiltCards() {
  if (window.innerWidth <= 768) return;
  if (matchMedia('(hover: none)').matches) return;

  document.querySelectorAll('[data-tilt]').forEach(card => {
    const maxTilt = 8;

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
      card.style.boxShadow = '0 16px 48px rgba(0, 0, 0, 0.2), 0 0 30px rgba(201, 169, 110, 0.1)';
      card.style.borderColor = 'rgba(201, 169, 110, 0.3)';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transition = 'all 0.5s ease';
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
      card.style.boxShadow = '';
      card.style.borderColor = '';
      setTimeout(() => { card.style.transition = ''; }, 500);
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = '';
    });
  });
}

function initMagneticButtons() {
  if (window.innerWidth <= 768) return;
  if (matchMedia('(hover: none)').matches) return;

  document.querySelectorAll('[data-magnetic]').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transition = 'transform 0.4s ease';
      btn.style.transform = 'translate(0, 0)';
      setTimeout(() => { btn.style.transition = ''; }, 400);
    });

    btn.addEventListener('mouseenter', () => {
      btn.style.transition = '';
    });
  });
}
