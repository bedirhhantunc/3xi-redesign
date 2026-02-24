# 3XI Website Redesign — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a 4-page premium website redesign for 3XI (Triple I) financial media company as a job application differentiator.

**Architecture:** Static HTML/CSS/JS site with GSAP 3 for animations, Canvas API for particle effects, and CSS Custom Properties for the design system. Each page shares a common navigation, footer, and design system. All content in Dutch.

**Tech Stack:** HTML5, CSS3 (Custom Properties), Vanilla JavaScript, GSAP 3 (ScrollTrigger, SplitText), Canvas 2D API, Google Fonts (Plus Jakarta Sans, Inter, JetBrains Mono), GitHub Pages for hosting.

**Design doc reference:** `docs/plans/2026-02-24-3xi-redesign-design.md`

---

### Task 1: Design System Foundation

**Files:**
- Create: `css/variables.css`
- Create: `css/base.css`

**Step 1: Create CSS custom properties file**

Create `css/variables.css` with all design tokens:

```css
:root {
  /* Colors - Primary */
  --color-navy: #0A1628;
  --color-charcoal: #1A1A2E;
  --color-navy-light: #0F1D32;

  /* Colors - Accent */
  --color-gold: #C9A96E;
  --color-gold-light: #D4B87A;
  --color-gold-glow: rgba(201, 169, 110, 0.3);

  /* Colors - Neutral */
  --color-white: #F5F5F7;
  --color-gray: #E8E8ED;
  --color-gray-mid: #8A8A9A;
  --color-black: #0D0D0D;

  /* Colors - Semantic */
  --color-success: #4CAF50;
  --color-glass: rgba(10, 22, 40, 0.7);

  /* Typography */
  --font-heading: 'Plus Jakarta Sans', sans-serif;
  --font-body: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Font sizes */
  --text-h1: 72px;
  --text-h2: 48px;
  --text-h3: 32px;
  --text-h4: 24px;
  --text-body: 18px;
  --text-small: 14px;
  --text-stats: 56px;

  /* Line heights */
  --leading-h1: 80px;
  --leading-h2: 56px;
  --leading-h3: 40px;
  --leading-body: 28px;
  --leading-small: 20px;

  /* Spacing */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;
  --space-3xl: 64px;
  --space-4xl: 96px;
  --space-5xl: 128px;
  --space-6xl: 192px;

  /* Layout */
  --container-max: 1200px;
  --grid-gap: 24px;
  --section-padding: 128px;
  --section-padding-mobile: 64px;

  /* Effects */
  --shadow-card: 0 8px 32px rgba(0, 0, 0, 0.12);
  --shadow-card-hover: 0 16px 48px rgba(0, 0, 0, 0.2);
  --shadow-gold: 0 0 40px rgba(201, 169, 110, 0.3);
  --radius-card: 12px;
  --radius-btn: 8px;
  --radius-full: 50%;

  /* Glass */
  --glass-bg: rgba(10, 22, 40, 0.7);
  --glass-blur: blur(20px);

  /* Gradient */
  --gradient-hero: linear-gradient(135deg, #0A1628 0%, #1A1A2E 50%, #0F1D32 100%);

  /* Transitions */
  --transition-fast: 0.2s ease;
  --transition-base: 0.3s ease;
  --transition-slow: 0.6s ease;
}

/* Mobile overrides */
@media (max-width: 768px) {
  :root {
    --text-h1: 40px;
    --text-h2: 32px;
    --text-h3: 24px;
    --text-h4: 20px;
    --text-stats: 40px;
    --leading-h1: 48px;
    --leading-h2: 40px;
    --leading-h3: 32px;
    --section-padding: 64px;
  }
}
```

**Step 2: Create base CSS file**

Create `css/base.css` with reset, typography, and global styles:

```css
/* Reset */
*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-family: var(--font-body);
  font-size: var(--text-body);
  line-height: var(--leading-body);
  color: var(--color-white);
  background-color: var(--color-navy);
  overflow-x: hidden;
}

/* Typography */
h1, h2, h3, h4 {
  font-family: var(--font-heading);
  font-weight: 800;
  letter-spacing: -0.02em;
}

h1 { font-size: var(--text-h1); line-height: var(--leading-h1); }
h2 { font-size: var(--text-h2); line-height: var(--leading-h2); }
h3 { font-size: var(--text-h3); line-height: var(--leading-h3); }
h4 { font-size: var(--text-h4); }

p { margin-bottom: var(--space-md); }

a {
  color: var(--color-gold);
  text-decoration: none;
  transition: color var(--transition-base);
}

a:hover { color: var(--color-gold-light); }

img { max-width: 100%; height: auto; display: block; }

/* Labels / Accent text */
.label {
  font-family: var(--font-body);
  font-weight: 500;
  font-size: var(--text-small);
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--color-gold);
}

/* Stats numbers */
.stat-number {
  font-family: var(--font-mono);
  font-size: var(--text-stats);
  font-weight: 700;
  color: var(--color-white);
}

/* Container */
.container {
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 var(--space-lg);
}

/* Section */
.section {
  padding: var(--section-padding) 0;
}

.section--dark {
  background-color: var(--color-navy);
  color: var(--color-white);
}

.section--light {
  background-color: var(--color-white);
  color: var(--color-navy);
}

.section--charcoal {
  background-color: var(--color-charcoal);
  color: var(--color-white);
}

/* Gold line separator */
.gold-line {
  width: 60px;
  height: 2px;
  background: var(--color-gold);
  margin-bottom: var(--space-lg);
}

/* Utility */
.text-center { text-align: center; }
.text-gold { color: var(--color-gold); }
.text-gray { color: var(--color-gray-mid); }

/* Selection */
::selection {
  background: var(--color-gold);
  color: var(--color-navy);
}
```

**Step 3: Verify files exist**

Run: `ls -la /Users/bedirhantunc/Desktop/3xi-redesign/css/`
Expected: variables.css and base.css listed

**Step 4: Commit**

```bash
cd /Users/bedirhantunc/Desktop/3xi-redesign
git add css/variables.css css/base.css
git commit -m "feat: add design system foundation (variables + base CSS)"
```

---

### Task 2: Component CSS (Navigation, Buttons, Cards)

**Files:**
- Create: `css/components.css`
- Create: `css/animations.css`

**Step 1: Create components CSS**

Create `css/components.css`:

```css
/* ============================================
   NAVIGATION
   ============================================ */
.nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  padding: var(--space-lg) 0;
  transition: all var(--transition-base);
}

.nav--scrolled {
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  padding: var(--space-md) 0;
  border-bottom: 1px solid rgba(201, 169, 110, 0.1);
}

.nav__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 var(--space-lg);
}

.nav__logo {
  font-family: var(--font-heading);
  font-size: 28px;
  font-weight: 800;
  color: var(--color-white);
  letter-spacing: 0.05em;
  transition: font-size var(--transition-base);
}

.nav--scrolled .nav__logo {
  font-size: 22px;
}

.nav__logo span {
  color: var(--color-gold);
}

.nav__links {
  display: flex;
  align-items: center;
  gap: var(--space-xl);
  list-style: none;
}

.nav__link {
  font-size: var(--text-small);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-gray);
  transition: color var(--transition-base);
  position: relative;
}

.nav__link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 1px;
  background: var(--color-gold);
  transition: width var(--transition-base);
}

.nav__link:hover {
  color: var(--color-white);
}

.nav__link:hover::after,
.nav__link--active::after {
  width: 100%;
}

/* Hamburger */
.nav__hamburger {
  display: none;
  flex-direction: column;
  gap: 6px;
  cursor: pointer;
  padding: 8px;
}

.nav__hamburger span {
  width: 28px;
  height: 2px;
  background: var(--color-white);
  transition: all var(--transition-base);
}

.nav__hamburger.active span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 6px);
}

.nav__hamburger.active span:nth-child(2) {
  opacity: 0;
}

.nav__hamburger.active span:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -6px);
}

/* Mobile menu */
.nav__mobile-menu {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: var(--color-navy);
  z-index: 999;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-xl);
}

.nav__mobile-menu.active {
  display: flex;
}

.nav__mobile-menu a {
  font-family: var(--font-heading);
  font-size: var(--text-h3);
  color: var(--color-white);
  opacity: 0;
  transform: translateY(20px);
}

@media (max-width: 768px) {
  .nav__links { display: none; }
  .nav__hamburger { display: flex; }
}

/* ============================================
   BUTTONS
   ============================================ */
.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-sm);
  padding: 14px 32px;
  font-family: var(--font-body);
  font-size: var(--text-small);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  border: none;
  border-radius: var(--radius-btn);
  cursor: pointer;
  transition: all var(--transition-base);
  position: relative;
  overflow: hidden;
}

.btn--gold {
  background: var(--color-gold);
  color: var(--color-navy);
}

.btn--gold:hover {
  background: var(--color-gold-light);
  box-shadow: var(--shadow-gold);
  transform: translateY(-2px);
}

.btn--outline {
  background: transparent;
  color: var(--color-white);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.btn--outline:hover {
  border-color: var(--color-gold);
  color: var(--color-gold);
}

.btn--large {
  padding: 18px 48px;
  font-size: var(--text-body);
}

.btn__arrow {
  transition: transform var(--transition-base);
}

.btn:hover .btn__arrow {
  transform: translateX(4px);
}

/* ============================================
   CARDS
   ============================================ */
.card {
  background: var(--color-charcoal);
  border-radius: var(--radius-card);
  padding: var(--space-xl);
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all var(--transition-base);
  transform-style: preserve-3d;
  will-change: transform;
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-card-hover);
  border-color: rgba(201, 169, 110, 0.2);
}

.card__icon {
  width: 48px;
  height: 48px;
  margin-bottom: var(--space-lg);
  color: var(--color-gold);
}

.card__title {
  font-family: var(--font-heading);
  font-size: var(--text-h4);
  font-weight: 700;
  margin-bottom: var(--space-sm);
}

.card__text {
  font-size: var(--text-small);
  color: var(--color-gray-mid);
  line-height: var(--leading-small);
}

/* ============================================
   STATS
   ============================================ */
.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-xl);
  text-align: center;
}

.stats--four {
  grid-template-columns: repeat(4, 1fr);
}

.stat__number {
  font-family: var(--font-mono);
  font-size: var(--text-stats);
  font-weight: 700;
  color: var(--color-white);
  line-height: 1;
}

.stat__label {
  font-size: var(--text-small);
  color: var(--color-gray-mid);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-top: var(--space-sm);
}

@media (max-width: 768px) {
  .stats { grid-template-columns: repeat(3, 1fr); gap: var(--space-md); }
  .stats--four { grid-template-columns: repeat(2, 1fr); }
}

/* ============================================
   FOOTER
   ============================================ */
.footer {
  background: var(--color-black);
  padding: var(--space-3xl) 0 var(--space-xl);
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.footer__grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: var(--space-2xl);
  margin-bottom: var(--space-2xl);
}

.footer__heading {
  font-size: var(--text-small);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-gold);
  margin-bottom: var(--space-md);
}

.footer__text {
  font-size: var(--text-small);
  color: var(--color-gray-mid);
  line-height: 1.8;
}

.footer__link {
  display: block;
  font-size: var(--text-small);
  color: var(--color-gray-mid);
  margin-bottom: var(--space-sm);
  transition: color var(--transition-base);
}

.footer__link:hover {
  color: var(--color-gold);
}

.footer__bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: var(--space-xl);
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  font-size: var(--text-small);
  color: var(--color-gray-mid);
}

@media (max-width: 768px) {
  .footer__grid { grid-template-columns: 1fr; gap: var(--space-xl); }
  .footer__bottom { flex-direction: column; gap: var(--space-md); }
}

/* ============================================
   LOGO CAROUSEL
   ============================================ */
.carousel {
  overflow: hidden;
  position: relative;
}

.carousel::before,
.carousel::after {
  content: '';
  position: absolute;
  top: 0;
  width: 200px;
  height: 100%;
  z-index: 2;
  pointer-events: none;
}

.carousel::before {
  left: 0;
  background: linear-gradient(to right, var(--color-navy), transparent);
}

.carousel::after {
  right: 0;
  background: linear-gradient(to left, var(--color-navy), transparent);
}

.carousel__track {
  display: flex;
  gap: var(--space-3xl);
  animation: scroll-left 30s linear infinite;
}

.carousel__track--reverse {
  animation: scroll-right 30s linear infinite;
}

.carousel__item {
  flex-shrink: 0;
  opacity: 0.4;
  filter: grayscale(1) brightness(2);
  transition: all var(--transition-base);
  height: 40px;
}

.carousel__item:hover {
  opacity: 1;
  filter: grayscale(0) brightness(1);
}

@keyframes scroll-left {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

@keyframes scroll-right {
  0% { transform: translateX(-50%); }
  100% { transform: translateX(0); }
}
```

**Step 2: Create animations CSS**

Create `css/animations.css`:

```css
/* ============================================
   SCROLL ANIMATIONS (GSAP will trigger these)
   ============================================ */

/* Fade in up - default hidden state */
[data-animate="fade-up"] {
  opacity: 0;
  transform: translateY(40px);
}

[data-animate="fade-in"] {
  opacity: 0;
}

[data-animate="scale-in"] {
  opacity: 0;
  transform: scale(0.9);
}

[data-animate="slide-left"] {
  opacity: 0;
  transform: translateX(-40px);
}

[data-animate="slide-right"] {
  opacity: 0;
  transform: translateX(40px);
}

/* Gold line animation */
.gold-line[data-animate] {
  width: 0;
}

/* ============================================
   CSS KEYFRAME ANIMATIONS
   ============================================ */

/* Scroll indicator bounce */
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(8px); }
}

.scroll-indicator {
  animation: bounce 2s ease-in-out infinite;
}

/* Gold glow pulse */
@keyframes glow-pulse {
  0%, 100% { box-shadow: 0 0 20px rgba(201, 169, 110, 0.2); }
  50% { box-shadow: 0 0 40px rgba(201, 169, 110, 0.4); }
}

.glow-pulse {
  animation: glow-pulse 3s ease-in-out infinite;
}

/* Gradient shift for hero bg */
@keyframes gradient-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Spin for loading */
@keyframes spin {
  to { transform: rotate(360deg); }
}

/* ============================================
   PAGE TRANSITIONS
   ============================================ */
.page-transition {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--color-navy);
  z-index: 9999;
  transform: scaleY(0);
  transform-origin: bottom;
}

/* ============================================
   REDUCED MOTION
   ============================================ */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }

  [data-animate] {
    opacity: 1 !important;
    transform: none !important;
  }

  .carousel__track {
    animation: none;
  }
}
```

**Step 3: Commit**

```bash
cd /Users/bedirhantunc/Desktop/3xi-redesign
git add css/components.css css/animations.css
git commit -m "feat: add component styles and animation base classes"
```

---

### Task 3: Homepage HTML Structure

**Files:**
- Create: `index.html`
- Create: `css/home.css`

**Step 1: Create homepage HTML**

Create `index.html` with full semantic HTML structure. Include:
- Google Fonts link (Plus Jakarta Sans, Inter, JetBrains Mono)
- GSAP CDN (gsap, ScrollTrigger, SplitText from Club GSAP or sharedstatic)
- All CSS files in order: variables, base, components, animations, home
- All JS files at bottom: main.js, particles.js, animations.js, components.js

The HTML must contain these sections in order:
1. `<nav>` — Logo "TRIPLE<span>i</span>" + links (Home, Over Ons, Diensten, Contact) + Book a Call btn + hamburger
2. `<section id="hero">` — Full viewport. Canvas element for particles. Content: gold-line, label "FINANCIELE MEDIA", h1 "30 Jaar Toonaangevend in Financiele Beslissingen", subtitle "Content die raakt. Resultaten die tellen.", two buttons, stats grid (33 merken, 24.500 adviseurs, 68.000 beleggers), scroll indicator arrow
3. `<section id="about-teaser">` — Light bg. Two column: left SVG "30" number, right text + "Lees meer" link
4. `<section id="services-preview">` — 4 cards grid with data-tilt attribute. Each card: SVG icon, h3 title, p description
5. `<section id="brands">` — Dark bg. Brand showcase cards (Beleggersfair, HypoVak, CashCow), Vimeo video iframe
6. `<section id="partners">` — "Vertrouwd door 300+ partners" h2. Two carousel tracks with partner logo placeholder images (use text-based logos for now: ABN AMRO, ING, BlackRock, Robeco, BNP Paribas, Aegon, Rabobank, Triodos, DeGiro, Allianz, Franklin Templeton, Amundi)
7. `<section id="insights">` — 3 article cards grid. Each: placeholder gradient bg, category label, h3 title, date
8. `<section id="cta">` — "Klaar om samen te werken?" h2, subtitle, large gold CTA button
9. `<footer>` — 4-column grid: company info (address, KVK, email), Quick Links, Platforms (Portfoliofacts, Beleggersfair etc.), Contact. Bottom bar: copyright + "Concept by Bedirhan Tunc"

**Step 2: Create homepage-specific CSS**

Create `css/home.css`:

```css
/* ============================================
   HERO
   ============================================ */
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: var(--gradient-hero);
  overflow: hidden;
}

.hero__canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.hero__content {
  position: relative;
  z-index: 2;
  max-width: 800px;
}

.hero__label {
  margin-bottom: var(--space-lg);
}

.hero__title {
  margin-bottom: var(--space-lg);
}

.hero__subtitle {
  font-size: 22px;
  color: var(--color-gray);
  margin-bottom: var(--space-2xl);
  font-weight: 300;
}

.hero__buttons {
  display: flex;
  gap: var(--space-md);
  margin-bottom: var(--space-4xl);
}

.hero__scroll {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  color: var(--color-gray-mid);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-sm);
  font-size: var(--text-small);
}

.hero__scroll svg {
  width: 24px;
  height: 24px;
}

@media (max-width: 768px) {
  .hero { padding-top: 120px; min-height: auto; padding-bottom: 80px; }
  .hero__buttons { flex-direction: column; }
  .hero__subtitle { font-size: 18px; }
}

/* ============================================
   ABOUT TEASER
   ============================================ */
.about-teaser {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-3xl);
  align-items: center;
}

.about-teaser__number {
  font-family: var(--font-heading);
  font-size: 200px;
  font-weight: 800;
  color: transparent;
  -webkit-text-stroke: 2px var(--color-gold);
  line-height: 1;
}

.about-teaser__text h2 {
  margin-bottom: var(--space-md);
  color: var(--color-navy);
}

.about-teaser__text p {
  color: var(--color-gray-mid);
  margin-bottom: var(--space-lg);
}

@media (max-width: 768px) {
  .about-teaser { grid-template-columns: 1fr; text-align: center; }
  .about-teaser__number { font-size: 120px; }
}

/* ============================================
   SERVICES PREVIEW
   ============================================ */
.services-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-lg);
}

@media (max-width: 768px) {
  .services-grid { grid-template-columns: 1fr; }
}

/* ============================================
   BRANDS
   ============================================ */
.brands__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-lg);
  margin-bottom: var(--space-2xl);
}

.brand-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: var(--radius-card);
  padding: var(--space-xl);
  text-align: center;
  transition: all var(--transition-base);
}

.brand-card:hover {
  border-color: var(--color-gold);
  background: rgba(201, 169, 110, 0.05);
}

.brand-card__name {
  font-family: var(--font-heading);
  font-size: var(--text-h4);
  font-weight: 700;
  margin-bottom: var(--space-sm);
}

.brand-card__desc {
  font-size: var(--text-small);
  color: var(--color-gray-mid);
}

.video-container {
  position: relative;
  padding-bottom: 56.25%;
  border-radius: var(--radius-card);
  overflow: hidden;
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}

@media (max-width: 768px) {
  .brands__grid { grid-template-columns: 1fr; }
}

/* ============================================
   PARTNERS
   ============================================ */
.partners {
  text-align: center;
}

.partners h2 {
  margin-bottom: var(--space-2xl);
}

.partners__carousels {
  display: flex;
  flex-direction: column;
  gap: var(--space-xl);
}

/* ============================================
   INSIGHTS
   ============================================ */
.insights-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-lg);
}

.insight-card {
  border-radius: var(--radius-card);
  overflow: hidden;
  background: var(--color-charcoal);
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all var(--transition-base);
}

.insight-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-card-hover);
}

.insight-card__image {
  height: 200px;
  background: linear-gradient(135deg, var(--color-charcoal), var(--color-navy));
  position: relative;
  overflow: hidden;
}

.insight-card__image::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 50%, var(--color-charcoal));
}

.insight-card__body {
  padding: var(--space-lg);
}

.insight-card__category {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--color-gold);
  margin-bottom: var(--space-sm);
}

.insight-card__title {
  font-size: var(--text-body);
  font-weight: 600;
  margin-bottom: var(--space-sm);
  line-height: 1.4;
}

.insight-card__date {
  font-size: var(--text-small);
  color: var(--color-gray-mid);
}

@media (max-width: 768px) {
  .insights-grid { grid-template-columns: 1fr; }
}

/* ============================================
   CTA SECTION
   ============================================ */
.cta-section {
  text-align: center;
  background: var(--gradient-hero);
  position: relative;
}

.cta-section h2 {
  margin-bottom: var(--space-md);
}

.cta-section p {
  color: var(--color-gray-mid);
  font-size: 20px;
  margin-bottom: var(--space-2xl);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}
```

**Step 3: Open in browser and verify structure**

Run: `open /Users/bedirhantunc/Desktop/3xi-redesign/index.html`
Expected: Dark navy background, all sections visible, correct typography and colors. No animations yet (JS not written).

**Step 4: Commit**

```bash
cd /Users/bedirhantunc/Desktop/3xi-redesign
git add index.html css/home.css
git commit -m "feat: add homepage HTML structure and page-specific CSS"
```

---

### Task 4: Core JavaScript — Navigation, Particles, GSAP Animations

**Files:**
- Create: `js/main.js`
- Create: `js/particles.js`
- Create: `js/animations.js`
- Create: `js/components.js`

**Step 1: Create main.js**

Navigation scroll behavior, smooth scroll, mobile menu toggle, page load detection.

```javascript
// main.js — Global functionality

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initSmoothScroll();
  initMobileMenu();
});

function initNavigation() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 80) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
    lastScroll = currentScroll;
  }, { passive: true });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

function initMobileMenu() {
  const hamburger = document.querySelector('.nav__hamburger');
  const mobileMenu = document.querySelector('.nav__mobile-menu');
  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';

    // Animate menu items with GSAP if available
    if (typeof gsap !== 'undefined' && mobileMenu.classList.contains('active')) {
      gsap.fromTo(mobileMenu.querySelectorAll('a'),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.4, ease: 'power2.out' }
      );
    }
  });
}
```

**Step 2: Create particles.js**

Canvas-based gold floating particles for hero background:

```javascript
// particles.js — Gold particle effect for hero section

function initParticles() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let animationId;
  const isMobile = window.innerWidth <= 768;

  if (isMobile) return; // Skip particles on mobile for performance

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.speedY = (Math.random() - 0.5) * 0.3;
      this.opacity = Math.random() * 0.5 + 0.1;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(201, 169, 110, ${this.opacity})`;
      ctx.fill();
    }
  }

  function init() {
    resize();
    const count = Math.floor((canvas.width * canvas.height) / 15000);
    particles = Array.from({ length: Math.min(count, 80) }, () => new Particle());
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          const opacity = (1 - distance / 150) * 0.15;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(201, 169, 110, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    drawConnections();
    animationId = requestAnimationFrame(animate);
  }

  window.addEventListener('resize', () => {
    resize();
    init();
  });

  init();
  animate();
}

document.addEventListener('DOMContentLoaded', initParticles);
```

**Step 3: Create animations.js**

GSAP ScrollTrigger animations for all data-animate elements and page-specific animations:

```javascript
// animations.js — GSAP ScrollTrigger animations

document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  initScrollAnimations();
  initHeroAnimations();
  initStatsCounter();
  initGoldLines();
});

function initScrollAnimations() {
  // Fade up
  gsap.utils.toArray('[data-animate="fade-up"]').forEach(el => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
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
      opacity: 1,
      scale: 1,
      duration: 0.6,
      ease: 'back.out(1.5)',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true }
    });
  });

  // Staggered children
  gsap.utils.toArray('[data-stagger]').forEach(parent => {
    const children = parent.children;
    gsap.fromTo(children,
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

  // Title — character reveal
  const title = hero.querySelector('.hero__title');
  if (title && typeof SplitText !== 'undefined') {
    const split = new SplitText(title, { type: 'chars' });
    tl.fromTo(split.chars,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.02, duration: 0.4, ease: 'power2.out' },
      '-=0.1'
    );
  } else if (title) {
    tl.fromTo(title, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.1');
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
}

function initStatsCounter() {
  gsap.utils.toArray('.stat__number[data-count]').forEach(el => {
    const target = parseFloat(el.dataset.count.replace('.', ''));
    const formatted = el.dataset.count;
    const hasDot = formatted.includes('.');

    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to({ val: 0 }, {
          val: target,
          duration: 2,
          ease: 'power2.out',
          onUpdate: function () {
            const current = Math.floor(this.targets()[0].val);
            if (hasDot) {
              el.textContent = current.toLocaleString('nl-NL');
            } else {
              el.textContent = current.toLocaleString('nl-NL');
            }
          }
        });
      }
    });
  });
}

function initGoldLines() {
  gsap.utils.toArray('.gold-line[data-animate]').forEach(line => {
    gsap.to(line, {
      width: 60,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: { trigger: line, start: 'top 85%', once: true }
    });
  });
}
```

**Step 4: Create components.js**

3D card tilt, magnetic buttons, and interactive components:

```javascript
// components.js — Interactive components

document.addEventListener('DOMContentLoaded', () => {
  initTiltCards();
  initMagneticButtons();
});

function initTiltCards() {
  if (window.innerWidth <= 768) return; // Skip on mobile

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
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
      card.style.transition = 'transform 0.5s ease';
      setTimeout(() => { card.style.transition = ''; }, 500);
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = '';
    });
  });
}

function initMagneticButtons() {
  if (window.innerWidth <= 768) return;

  document.querySelectorAll('[data-magnetic]').forEach(btn => {
    const strength = 20;

    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
      btn.style.transition = 'transform 0.4s ease';
      setTimeout(() => { btn.style.transition = ''; }, 400);
    });

    btn.addEventListener('mouseenter', () => {
      btn.style.transition = '';
    });
  });
}
```

**Step 5: Open browser, verify hero animations work**

Run: `open /Users/bedirhantunc/Desktop/3xi-redesign/index.html`
Expected: Particles floating in hero, navigation glass morphism on scroll, cards tilt on hover, stats count up on scroll.

**Step 6: Commit**

```bash
cd /Users/bedirhantunc/Desktop/3xi-redesign
git add js/
git commit -m "feat: add core JavaScript — nav, particles, GSAP animations, interactive components"
```

---

### Task 5: Over Ons Page

**Files:**
- Create: `over-ons.html`
- Create: `css/over-ons.css`

**Step 1: Create Over Ons HTML**

Same head as index.html (fonts, GSAP, CSS files + over-ons.css). Same nav and footer. Page sections:

1. `<section class="page-hero">` — 50vh, dark gradient, "Over 3XI" h1, "30 jaar ervaring in financiele media" subtitle
2. `<section class="story section--light">` — Two column grid. Left: long paragraph about company history in Dutch ("Al meer dan 30 jaar..."). Right: 3 stat boxes stacked (30 Jaar Ervaring, 300+ Partners, 68.000 Beleggers)
3. `<section class="timeline section--dark">` — Horizontal scroll timeline. 6 milestones: 1994 Opgericht, 2000 Eerste Beurs Event, 2005 Digitale Media, 2010 Beleggersfair, 2018 Crypto Services, 2024 Portfoliofacts. Gold dots on a horizontal line. GSAP ScrollTrigger pin for horizontal scroll.
4. `<section class="values section--light">` — "Onze Kernwaarden" h2. 3 cards: Integriteit (shield icon), Innovatie (lightbulb icon), Samenwerking (handshake icon). Each with short description in Dutch.
5. Same CTA section and footer as homepage.

**Step 2: Create over-ons.css**

```css
/* Page hero (shared pattern for inner pages) */
.page-hero {
  min-height: 50vh;
  display: flex;
  align-items: center;
  background: var(--gradient-hero);
  padding-top: 120px;
}

.page-hero__content {
  max-width: 700px;
}

.page-hero__title {
  margin-bottom: var(--space-md);
}

.page-hero__subtitle {
  font-size: 22px;
  color: var(--color-gray);
  font-weight: 300;
}

/* Story */
.story__grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: var(--space-3xl);
  align-items: start;
}

.story__text {
  color: var(--color-gray-mid);
  font-size: var(--text-body);
  line-height: 1.8;
}

.story__text h2 {
  color: var(--color-navy);
  margin-bottom: var(--space-lg);
}

.story__stats {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.story__stat-box {
  background: var(--color-navy);
  border-radius: var(--radius-card);
  padding: var(--space-xl);
  text-align: center;
}

.story__stat-box .stat__number {
  font-size: 40px;
}

/* Timeline */
.timeline-wrapper {
  overflow: hidden;
  position: relative;
}

.timeline__track {
  display: flex;
  gap: var(--space-3xl);
  padding: var(--space-2xl) 0;
  min-width: max-content;
}

.timeline__item {
  text-align: center;
  min-width: 200px;
  position: relative;
}

.timeline__dot {
  width: 16px;
  height: 16px;
  background: var(--color-gold);
  border-radius: 50%;
  margin: 0 auto var(--space-md);
  position: relative;
}

.timeline__dot::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 100%;
  width: 200px;
  height: 1px;
  background: rgba(201, 169, 110, 0.3);
}

.timeline__year {
  font-family: var(--font-mono);
  font-size: var(--text-h4);
  font-weight: 700;
  color: var(--color-gold);
  margin-bottom: var(--space-sm);
}

.timeline__desc {
  font-size: var(--text-small);
  color: var(--color-gray-mid);
  max-width: 160px;
  margin: 0 auto;
}

/* Values */
.values__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-lg);
}

.value-card {
  text-align: center;
  padding: var(--space-2xl);
  background: var(--color-white);
  border-radius: var(--radius-card);
  border: 1px solid var(--color-gray);
  transition: all var(--transition-base);
}

.value-card:hover {
  border-color: var(--color-gold);
  transform: translateY(-4px);
  box-shadow: var(--shadow-card);
}

.value-card__icon {
  font-size: 48px;
  margin-bottom: var(--space-lg);
}

.value-card__title {
  color: var(--color-navy);
  margin-bottom: var(--space-sm);
}

.value-card__text {
  color: var(--color-gray-mid);
  font-size: var(--text-small);
}

@media (max-width: 768px) {
  .story__grid { grid-template-columns: 1fr; }
  .values__grid { grid-template-columns: 1fr; }
  .timeline__track { flex-direction: column; min-width: auto; }
  .timeline__dot::before { display: none; }
}
```

**Step 3: Verify in browser**

Run: `open /Users/bedirhantunc/Desktop/3xi-redesign/over-ons.html`
Expected: Page hero, story section with stats, timeline, values cards, CTA, footer.

**Step 4: Commit**

```bash
cd /Users/bedirhantunc/Desktop/3xi-redesign
git add over-ons.html css/over-ons.css
git commit -m "feat: add Over Ons page with timeline and core values"
```

---

### Task 6: Diensten Page

**Files:**
- Create: `diensten.html`
- Create: `css/diensten.css`

**Step 1: Create Diensten HTML**

Same head/nav/footer pattern. Sections:

1. `<section class="page-hero">` — "Onze Diensten" h1, "Specialistische oplossingen voor de financiele sector" subtitle
2. `<section class="services-detail">` — 4 alternating layout service blocks (image left/text right, then reversed). Each service: number (01-04), label, h2 title, paragraph description, "Meer Info →" link. Services: Portfoliofacts, Events & Beurzen, Media & Publishing, Content & Strategie
3. `<section class="stats-bar section--charcoal">` — Full width dark bg, 4 stats inline: 33 Merken, 24.500 Adviseurs, 68.000 Beleggers, 300+ Partners
4. `<section class="process section--light">` — "Onze Aanpak" h2. 4 step horizontal flow: Brief → Concept → Creatie → Resultaat. Each step numbered, with title and 1-line description.
5. CTA + Footer

**Step 2: Create diensten.css**

```css
/* Service blocks - alternating layout */
.service-block {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-3xl);
  align-items: center;
  padding: var(--space-4xl) 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.service-block:nth-child(even) {
  direction: rtl;
}

.service-block:nth-child(even) > * {
  direction: ltr;
}

.service-block__visual {
  height: 400px;
  border-radius: var(--radius-card);
  background: linear-gradient(135deg, var(--color-charcoal), var(--color-navy-light));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 80px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.service-block__number {
  font-family: var(--font-mono);
  font-size: var(--text-small);
  color: var(--color-gold);
  margin-bottom: var(--space-md);
}

.service-block__title {
  margin-bottom: var(--space-md);
}

.service-block__text {
  color: var(--color-gray-mid);
  margin-bottom: var(--space-lg);
  line-height: 1.8;
}

.service-block__link {
  font-weight: 600;
  font-size: var(--text-small);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-gold);
  position: relative;
  display: inline-block;
}

.service-block__link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  background: var(--color-gold);
  transition: width var(--transition-base);
}

.service-block__link:hover::after {
  width: 100%;
}

/* Stats bar */
.stats-bar {
  text-align: center;
}

.stats-bar .stats {
  max-width: 1000px;
  margin: 0 auto;
}

/* Process */
.process__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-lg);
  position: relative;
}

.process__grid::before {
  content: '';
  position: absolute;
  top: 40px;
  left: 12.5%;
  width: 75%;
  height: 1px;
  background: var(--color-gray);
}

.process-step {
  text-align: center;
  position: relative;
}

.process-step__number {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--color-navy);
  color: var(--color-gold);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-mono);
  font-weight: 700;
  margin: 0 auto var(--space-md);
  position: relative;
  z-index: 2;
  border: 2px solid var(--color-gold);
}

.process-step__title {
  color: var(--color-navy);
  margin-bottom: var(--space-xs);
}

.process-step__text {
  font-size: var(--text-small);
  color: var(--color-gray-mid);
}

@media (max-width: 768px) {
  .service-block { grid-template-columns: 1fr; }
  .service-block:nth-child(even) { direction: ltr; }
  .service-block__visual { height: 250px; }
  .process__grid { grid-template-columns: repeat(2, 1fr); }
  .process__grid::before { display: none; }
}
```

**Step 3: Verify + Commit**

```bash
cd /Users/bedirhantunc/Desktop/3xi-redesign
open diensten.html
git add diensten.html css/diensten.css
git commit -m "feat: add Diensten page with service blocks and process flow"
```

---

### Task 7: Contact Page

**Files:**
- Create: `contact.html`
- Create: `css/contact.css`

**Step 1: Create Contact HTML**

Same head/nav/footer. Sections:

1. `<section class="page-hero">` — "Neem Contact Op" h1
2. `<section class="contact-main section--light">` — Split layout. Left (dark bg card): "Laten we samenwerken" h2, address (De Steiger 24, Unit 3, 1351 AB Almere), phone (+31 085 27 34 880), email (info@3xi.nl), KVK 67854532, social icons. Right: form with fields (Naam, E-mail, Telefoon, Onderwerp select, Bericht textarea, Verstuur button)
3. Footer

**Step 2: Create contact.css**

```css
.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 0;
  border-radius: var(--radius-card);
  overflow: hidden;
  box-shadow: var(--shadow-card);
}

.contact-info {
  background: var(--color-navy);
  padding: var(--space-3xl);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.contact-info h2 {
  margin-bottom: var(--space-md);
}

.contact-info__subtitle {
  color: var(--color-gray-mid);
  margin-bottom: var(--space-2xl);
}

.contact-info__item {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  margin-bottom: var(--space-lg);
  color: var(--color-gray);
  font-size: var(--text-small);
}

.contact-info__item svg {
  width: 20px;
  height: 20px;
  color: var(--color-gold);
  flex-shrink: 0;
}

.contact-info__socials {
  display: flex;
  gap: var(--space-md);
  margin-top: auto;
  padding-top: var(--space-2xl);
}

.contact-info__social {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-base);
  color: var(--color-gray-mid);
}

.contact-info__social:hover {
  border-color: var(--color-gold);
  color: var(--color-gold);
  transform: scale(1.1);
}

/* Form */
.contact-form {
  background: var(--color-white);
  padding: var(--space-3xl);
}

.form-group {
  margin-bottom: var(--space-lg);
  position: relative;
}

.form-group label {
  display: block;
  font-size: var(--text-small);
  font-weight: 500;
  color: var(--color-gray-mid);
  margin-bottom: var(--space-sm);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 14px 0;
  font-family: var(--font-body);
  font-size: var(--text-body);
  color: var(--color-navy);
  background: transparent;
  border: none;
  border-bottom: 2px solid var(--color-gray);
  outline: none;
  transition: border-color var(--transition-base);
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: var(--color-gold);
}

.form-group textarea {
  min-height: 120px;
  resize: vertical;
}

/* Focus underline animation */
.form-group::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--color-gold);
  transition: width var(--transition-base);
}

.form-group:focus-within::after {
  width: 100%;
}

.contact-form .btn {
  width: 100%;
  justify-content: center;
  margin-top: var(--space-md);
}

/* Success state */
.form-success {
  display: none;
  text-align: center;
  padding: var(--space-3xl);
}

.form-success.active {
  display: block;
}

.form-success svg {
  width: 64px;
  height: 64px;
  color: var(--color-success);
  margin-bottom: var(--space-lg);
}

@media (max-width: 768px) {
  .contact-grid { grid-template-columns: 1fr; }
  .contact-info { padding: var(--space-2xl); }
  .contact-form { padding: var(--space-2xl); }
}
```

**Step 3: Verify + Commit**

```bash
cd /Users/bedirhantunc/Desktop/3xi-redesign
open contact.html
git add contact.html css/contact.css
git commit -m "feat: add Contact page with split layout and animated form"
```

---

### Task 8: Polish, Cross-Page Consistency, Responsive Testing

**Files:**
- Modify: all HTML files (ensure consistent nav active states, meta tags)
- Modify: `css/base.css` (add any missing responsive fixes)

**Step 1: Add meta tags to all HTML files**

Each page must have:
- `<meta charset="UTF-8">`
- `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
- `<meta name="description" content="...">`
- `<title>3XI — [Page Name]</title>`
- Open Graph meta tags for sharing

**Step 2: Set active nav link per page**

Add `nav__link--active` class to the current page's nav link on each HTML file.

**Step 3: Test responsive at all breakpoints**

Open Chrome DevTools, test at: 375px (iPhone), 768px (iPad), 1024px (laptop), 1440px (desktop).
Fix any layout issues found.

**Step 4: Commit**

```bash
cd /Users/bedirhantunc/Desktop/3xi-redesign
git add -A
git commit -m "feat: polish cross-page consistency, responsive fixes, meta tags"
```

---

### Task 9: Performance Optimization

**Files:**
- Modify: all HTML files
- Modify: `js/particles.js`

**Step 1: Add lazy loading and performance optimizations**

- Add `loading="lazy"` to all images and iframes
- Add `will-change: transform` to animated elements in CSS
- Ensure particles.js uses `requestAnimationFrame` properly (already done)
- Add `<link rel="preconnect" href="https://fonts.googleapis.com">` to head
- Add `<link rel="preload">` for critical CSS

**Step 2: Minify check**

Verify all files are clean and no console errors in browser DevTools.

**Step 3: Commit**

```bash
cd /Users/bedirhantunc/Desktop/3xi-redesign
git add -A
git commit -m "perf: add lazy loading, preconnect, and rendering optimizations"
```

---

### Task 10: GitHub Pages Deploy

**Step 1: Create GitHub repo**

```bash
cd /Users/bedirhantunc/Desktop/3xi-redesign
gh repo create 3xi-redesign --public --source=. --push
```

**Step 2: Enable GitHub Pages**

```bash
gh api repos/bedirhhantunc/3xi-redesign/pages -X POST -f source.branch=main -f source.path=/
```

Or via GitHub Settings > Pages > Source: main branch, root folder.

**Step 3: Verify live site**

Open: `https://bedirhhantunc.github.io/3xi-redesign/`
Expected: Full working site with all animations.

**Step 4: Final commit if any changes**

```bash
cd /Users/bedirhantunc/Desktop/3xi-redesign
git add -A
git commit -m "chore: configure GitHub Pages deployment"
git push
```

---

### Task 11: Write Lisa Email Draft

**Not a code task.** After deploy, draft the email to Lisa in English. Tone: confident but not arrogant, "I was inspired" not "your site is bad". Include:
- Link to live site
- Brief explanation of what you did and why
- Design rationale highlights (3 psychological principles)
- Mention that all content is in Dutch (shows understanding of their market)
- Express enthusiasm for the role

This email should be sent ~1 week after Lisa's last message (around March 2).
