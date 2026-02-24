# 3XI Website Redesign — Design Document

## Vizyon

30 yillik Hollanda finans medya devinin dijital varligini, Stripe + Bloomberg seviyesinde premium bir deneyime tasimak. Bu redesign, is basvurusunda ezici bir yetkinlik gosterisi olarak sunulacak.

## Stratejik Amac

- Hollandaca bilmeme dezavantajini tamamen silmek
- Lisa'ya ust yonetime sunabilecegi somut bir eser vermek
- "Bu adam dil bilmeden bile bunu yapti" dedirtmek
- Diger tum adaylardan ayrilmak

---

## 1. Sirket Profili (Tasarim Icin Bağlam)

| | |
|---|---|
| Sirket | 3XI (Triple I) — Financial Content BV |
| Sektor | Finansal medya, etkinlik yonetimi, icerik uretimi |
| Deneyim | 30 yil |
| Lokasyon | Almere / Amsterdam |
| Partnerler | 300+ (ABN AMRO, ING, BlackRock, Robeco, BNP Paribas) |
| Rakamlar | 33 marka, 24.500 danisman, 68.000 yatirimci |
| Markalar | Portfoliofacts, Beleggersfair, HypoVak, CashCow, InFinance |
| Mevcut Site | WordPress (Avada theme), turuncu accent, off-canvas menuler |

---

## 2. Psikolojik Prensip Haritasi

Her sayfada 3 prensip uygulanir ama her sayfanin bir "yildiz prensibi" vardir:

| Sayfa | Yildiz Prensip | Aciklama |
|-------|----------------|----------|
| Homepage | Halo Effect | Ilk 50ms'de "vay be" — hero section muhendisligi |
| Over Ons | Cognitive Fluency | 30 yillik hikayeyi sade ve akici anlatim |
| Diensten | Peak-End Rule | Her hizmet kartinda micro interaction doruk anlari |
| Contact | Peak-End Rule | Son izlenim = en guzel izlenim, CTA muhendisligi |

---

## 3. Tasarim Sistemi

### 3.1 Renk Paleti

```
Primary:
  Deep Navy     #0A1628   — Ana arka plan, hero, koyu sectionlar
  Charcoal      #1A1A2E   — Kart arka planlari, secondary bg

Accent:
  Gold          #C9A96E   — CTA, vurgular, separator cizgiler
  Gold Light    #D4B87A   — Hover state, glow efektleri

Neutral:
  Cool White    #F5F5F7   — Acik section bg, ana metin (koyu bg uzerinde)
  Soft Gray     #E8E8ED   — Ikincil metin, borderlar
  Mid Gray      #8A8A9A   — Placeholder, subtle text

Semantic:
  Success       #4CAF50   — Form onay
  Glass BG      rgba(10, 22, 40, 0.7) + backdrop-blur — Navigation
```

### 3.2 Tipografi

```
Basliklar:    Plus Jakarta Sans (Bold/ExtraBold, 800)
              - H1: 72px / 80px line-height (desktop), 40px (mobile)
              - H2: 48px / 56px
              - H3: 32px / 40px
              - Letter-spacing: -0.02em (basliklar), 0.15em (etiketler)

Body:         Inter (Regular 400, Medium 500)
              - Body: 18px / 28px
              - Small: 14px / 20px

Accent:       Inter (Medium 500, uppercase, letter-spacing: 0.15em)
              - Etiketler, kategori isimleri, nav linkleri

Monospace:    JetBrains Mono (istatistik sayilari icin)
              - Stats: 56px / bold
```

### 3.3 Spacing Sistemi

```
Base unit: 8px
Scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192
Section padding: 128px (desktop), 64px (mobile)
Container max-width: 1200px
Grid: 12 column, 24px gap
```

### 3.4 Efekt Sistemi

```
Shadow - Card:      0 8px 32px rgba(0, 0, 0, 0.12)
Shadow - Card Hover: 0 16px 48px rgba(0, 0, 0, 0.2)
Shadow - Gold Glow:  0 0 40px rgba(201, 169, 110, 0.3)
Border Radius:       12px (kartlar), 8px (butonlar), 50% (avatar)
Glass:               background: rgba(10, 22, 40, 0.7); backdrop-filter: blur(20px)
Gradient Hero:       linear-gradient(135deg, #0A1628 0%, #1A1A2E 50%, #0F1D32 100%)
```

---

## 4. Sayfa Tasarimlari

### 4.1 NAVIGATION (Tum Sayfalar)

```
Yapi:
  [Logo]  [Home]  [Over Ons]  [Diensten]  [Insights]  [■ Book a Call]

Davranis:
  - Baslangic: Transparent bg, beyaz logo + linkler
  - Scroll > 80px: Glass morphism bg (blur + semi-transparent navy)
  - Logo shrink: 40px → 32px
  - Transition: 0.3s ease

Mobile:
  - Hamburger menu (gold accent line)
  - Full-screen overlay menu (koyu bg, buyuk tipografi)
  - Staggered fade-in animasyon menu itemlari icin
```

### 4.2 HOMEPAGE — Halo Effect'in Saheseri

**HERO SECTION (Full Viewport)**

```
Layout:
  ┌─────────────────────────────────────────────────┐
  │  ░░ Canvas particle bg (gold floating dots) ░░  │
  │                                                 │
  │        ── gold thin line ──                     │
  │        FINANCIELE MEDIA                         │
  │                                                 │
  │        30 Jaar Toonaangevend                    │
  │        in Financiele Beslissingen               │
  │                                                 │
  │        Content die raakt.                       │
  │        Resultaten die tellen.                   │
  │                                                 │
  │        [Ontdek Meer →]   [Book a Call]          │
  │                                                 │
  │   ┌──────────┬──────────┬──────────┐            │
  │   │    33    │  24.500  │  68.000  │            │
  │   │  merken  │adviseurs │beleggers │            │
  │   └──────────┴──────────┴──────────┘            │
  │                                                 │
  │            ↓ scroll indicator                   │
  └─────────────────────────────────────────────────┘

Animasyonlar:
  - Canvas: Gold particle'lar yavas hareket (60fps, GPU accelerated)
  - Baslik: Karakter karakter reveal (GSAP SplitText), 0.8s stagger
  - Subtitle: Fade-up, 0.3s delay after title
  - Stats: Count-up animasyon (0 → hedef, 2s duration, easeOut)
  - CTA butonlar: Scale-in, 0.5s delay
  - Gold line: Width 0 → 100% animasyon
  - Scroll indicator: Subtle bounce loop
```

**ABOUT TEASER SECTION**

```
Layout:
  Acik bg (#F5F5F7)
  Sol: Buyuk "30" rakam (200px, gold outline, stroke animasyon)
  Sag: 2-3 satirlik kisa ozet + "Lees meer →" link

Animasyon:
  - "30" rakam: SVG stroke-dasharray animasyon (scroll-triggered)
  - Text: Fade-in-up
```

**SERVICES PREVIEW**

```
Layout:
  4 kart grid (2x2 desktop, 1x4 mobile)
  Her kart: Icon + baslik + tek satirlik aciklama

  ┌────────────────┐  ┌────────────────┐
  │  📊             │  │  🎪             │
  │  Portfoliofacts │  │  Events        │
  │  Data & Analyse │  │  Beurzen &     │
  │                 │  │  Congressen    │
  └────────────────┘  └────────────────┘
  ┌────────────────┐  ┌────────────────┐
  │  📰             │  │  🎯             │
  │  Media          │  │  Content       │
  │  Magazines &    │  │  Strategie &   │
  │  Newsletters    │  │  Creatie       │
  └────────────────┘  └────────────────┘

Animasyonlar:
  - 3D tilt: Mouse tracking ile perspective transform
  - Hover: Card lift (translateY -8px) + gold glow border
  - Scroll: Staggered fade-in (her kart 0.15s arayla)
```

**BRANDS SHOWCASE**

```
Layout:
  Koyu bg'ye gecis (clip-path diagonal veya wave)
  Beleggersfair + HypoVak + CashCow logolari/gorselleri
  Bir adet Vimeo video embed (Beleggersfair highlight)

Animasyonlar:
  - Clip-path reveal: Section koyu bg uste kayarak acilir
  - Video: Play butonu gold glow + magnetic hover
  - Brand kartlari: Horizontal scroll (drag destegi)
```

**PARTNER LOGOS**

```
Layout:
  "Vertrouwd door 300+ partners" baslik
  Infinite scroll logo carousel (2 satir, zit yonler)
  Logolar grayscale, hover'da renkli

Animasyonlar:
  - Carousel: CSS infinite scroll (performans icin transform-based)
  - Hover: Grayscale → color (0.3s transition)
  - Baslik: Count-up "300+"
```

**INSIGHTS PREVIEW**

```
Layout:
  3 makale karti (grid)
  Her kart: Gorsel + kategori etiketi + baslik + tarih
  "Bekijk alle inzichten →" link

Animasyonlar:
  - Kartlar: Fade-in-up staggered
  - Hover: Subtle lift + gorsel scale 1.05
```

**CTA SECTION**

```
Layout:
  Koyu bg, centered text
  "Klaar om samen te werken?"
  Alt text: "Neem contact op en ontdek wat wij voor u kunnen betekenen"
  [Neem Contact Op →] buyuk gold buton

Animasyonlar:
  - Buton: Magnetic hover (cursor yaklasinca buton cekimlenme)
  - Gold glow pulse (subtle, loop)
```

### 4.3 OVER ONS — Cognitive Fluency Masterclass

```
HERO:
  Kucuk hero (50vh), koyu gradient bg
  "Over 3XI" baslik + "30 jaar ervaring in financiele media"

HIKAYE SECTION:
  Sol: Buyuk paragraf (sirket hikayesi, Hollandaca)
  Sag: Anahtar rakamlar (3 kutu: 30 jaar, 300+ partners, 68.000 beleggers)

  Animasyon: Text fade-in satir satir (scroll-triggered)

TIMELINE (Horizontal Scroll):
  ┌──●──────●──────●──────●──────●──────●──┐
  │ 1994   2000   2005   2010   2018   2024 │
  │ Opge-  Eerste Digi-  Beleg- Crypto Port-│
  │ richt  Event  taal   gers   ser-   folio│
  │        Beurs  Media  fair   vices  facts│
  └─────────────────────────────────────────┘

  Animasyon: Scroll-linked horizontal movement, gold dot'lar pulse

KERNWAARDEN (Core Values):
  3 kart: Integriteit / Innovatie / Samenwerking
  Minimalist ikonlar, kisa aciklamalar

  Animasyon: Staggered scale-in

TEAM SECTION (opsiyonel placeholder):
  "Ons team" baslik + grid placeholder'lar
```

### 4.4 DIENSTEN — Micro Interaction Festivali

```
HERO:
  Kucuk hero, "Onze Diensten" baslik

HIZMET KARTLARI (Full-width, alternatif layout):
  Her hizmet icin: Sol gorsel/ikon | Sag text (veya tersi)

  ┌─────────────────────────────────────────┐
  │  [Gorsel/Anim]  │  PORTFOLIOFACTS       │
  │                 │  Specialistische       │
  │                 │  data en analyse...    │
  │                 │  [Meer Info →]         │
  └─────────────────────────────────────────┘
  ┌─────────────────────────────────────────┐
  │  EVENTS &       │  [Gorsel/Anim]        │
  │  BEURZEN        │                       │
  │  Van concept    │                       │
  │  tot uitvoer... │                       │
  └─────────────────────────────────────────┘

  4 hizmet:
  1. Portfoliofacts — Data & Analyse
  2. Events & Beurzen — Beleggersfair, HypoVak
  3. Media & Publishing — Magazines, Newsletters, Websites
  4. Content & Strategie — Creatie voor financiele doelgroepen

Animasyonlar:
  - Her section: Clip-path reveal (scroll-triggered)
  - Gorseller: Parallax subtle (0.1 rate)
  - Text: Line-by-line fade-in
  - Hover CTA: Gold underline expand (width 0 → 100%)

STATISTICS BAR:
  Koyu bg, 4 buyuk rakam yan yana
  33 Merken | 24.500 Adviseurs | 68.000 Beleggers | 300+ Partners
  Count-up animasyon (scroll-triggered)

PROCESS SECTION (opsiyonel):
  "Onze Aanpak" — 4 adimli yatay flow
  Brief → Concept → Creatie → Resultaat
```

### 4.5 CONTACT — Peak-End Rule Finali

```
LAYOUT:
  Split screen: Sol bilgi | Sag form

  SOL (Koyu bg):
    "Laten we samenwerken"
    Adres, telefon, email
    KVK nummer
    Sosyal medya ikonlari (LinkedIn, etc.)
    Kucuk harita veya lokasyon gorseli

  SAG (Acik bg):
    Form alanlari:
    - Naam (isim)
    - E-mail
    - Telefoon
    - Bericht (mesaj textarea)
    - [Verstuur →] gold buton

Animasyonlar:
  - Form field focus: Gold underline expand + label float-up
  - Buton hover: Magnetic + gold glow
  - Form submit: Success animasyon (checkmark draw SVG)
  - Sol bilgiler: Staggered fade-in
  - Sosyal ikonlar: Hover scale + gold tint
```

---

## 5. Animasyon ve Micro Interaction Katalogu

### 5.1 Global Animasyonlar

| Animasyon | Teknoloji | Trigger | Duration |
|-----------|-----------|---------|----------|
| Page load reveal | GSAP Timeline | DOMReady | 1.5s |
| Scroll fade-in-up | GSAP ScrollTrigger | Scroll | 0.6s |
| Staggered children | GSAP stagger | Scroll | 0.15s each |
| Parallax | GSAP ScrollTrigger | Scroll | Continuous |
| Count-up numbers | GSAP | Scroll (once) | 2s |
| Smooth scroll | CSS scroll-behavior + GSAP | Click | 0.8s |

### 5.2 Hero Ozel

| Animasyon | Teknoloji | Detay |
|-----------|-----------|-------|
| Particle bg | Canvas 2D | Gold dots, slow drift, connect lines |
| Text reveal | GSAP SplitText | Karakter karakter, stagger 0.03s |
| Gradient shift | CSS animation | Subtle color morph, 8s loop |
| Stats counter | GSAP | 0 → target, easeOutExpo |

### 5.3 Hover/Interaction

| Animasyon | Teknoloji | Detay |
|-----------|-----------|-------|
| 3D card tilt | Vanilla JS | Mouse tracking, perspective(1000px), max 10deg |
| Magnetic button | GSAP | Cursor proximity detection, 20px range |
| Gold glow | CSS box-shadow | transition 0.3s, gold rgba glow |
| Card lift | CSS transform | translateY(-8px) + shadow increase |
| Link underline | CSS pseudo-element | Width 0 → 100%, gold color |
| Logo grayscale | CSS filter | grayscale(1) → grayscale(0) |
| Nav blur | CSS backdrop-filter | blur(20px), triggered by scroll |

### 5.4 Section Transitions

| Animasyon | Teknoloji | Detay |
|-----------|-----------|-------|
| Clip-path reveal | GSAP ScrollTrigger | polygon/inset reveal on scroll |
| Horizontal scroll | GSAP ScrollTrigger pin | Timeline/About sections |
| Wave divider | SVG + CSS | Section separator, subtle animation |

---

## 6. Responsive Breakpoints

```
Desktop:   >= 1200px  (12 col, 24px gap, full animations)
Laptop:    >= 1024px  (12 col, 20px gap, full animations)
Tablet:    >= 768px   (8 col, 16px gap, reduced parallax)
Mobile:    >= 375px   (4 col, 12px gap, minimal animations)

Mobile ozel:
  - Particle bg: Disable (performans)
  - 3D tilt: Disable (touch device)
  - Horizontal scroll: Vertical stack'e donustur
  - Magnetic buttons: Disable
  - Typography scale: ~0.7x desktop
```

---

## 7. Teknoloji Stack

```
HTML5 + CSS3 + Vanilla JavaScript
  - GSAP 3 (ScrollTrigger, SplitText, TextPlugin)
  - Google Fonts (Plus Jakarta Sans, Inter)
  - Canvas API (particle efekt)
  - CSS Custom Properties (tema degiskenleri)
  - IntersectionObserver (lazy loading)

Hosting:
  - GitHub Pages (bedirhhantunc.github.io/3xi-redesign)
  - Tek link ile paylasim

Dosya Yapisi:
  3xi-redesign/
  ├── index.html          (Homepage)
  ├── over-ons.html       (About)
  ├── diensten.html        (Services)
  ├── contact.html         (Contact)
  ├── css/
  │   ├── variables.css    (Design tokens)
  │   ├── base.css         (Reset, typography, global)
  │   ├── components.css   (Kartlar, butonlar, nav)
  │   ├── animations.css   (Keyframes, transitions)
  │   ├── home.css         (Homepage ozel)
  │   ├── over-ons.css
  │   ├── diensten.css
  │   └── contact.css
  ├── js/
  │   ├── main.js          (Global: nav, scroll, cursor)
  │   ├── particles.js     (Canvas particle efekt)
  │   ├── animations.js    (GSAP animasyonlari)
  │   └── components.js    (3D tilt, magnetic, carousel)
  ├── assets/
  │   ├── images/          (Logolar, gorseller)
  │   ├── fonts/           (Fallback)
  │   └── video/           (Placeholder thumbnails)
  └── docs/
      └── plans/
          └── 2026-02-24-3xi-redesign-design.md
```

---

## 8. Icerik (Hollandaca)

Tum icerik Hollandaca olacak (3XI'in dili). Ana metinler:

### Homepage
- Hero: "30 Jaar Toonaangevend in Financiele Media"
- Subtitle: "Content die raakt. Resultaten die tellen."
- Sub: "Wij verbinden financiele beslissers via krachtige en bewezen formats."

### Over Ons
- "Al meer dan 30 jaar zijn wij de verbindende kracht in de financiele sector."
- Kernwaarden: Integriteit, Innovatie, Samenwerking

### Diensten
- Portfoliofacts: "Specialistische data en analyse voor beleggers en adviseurs"
- Events: "Van concept tot uitvoering — Beleggersfair, HypoVak en meer"
- Media: "Magazines, nieuwsbrieven en digitale platforms die impact maken"
- Content: "Strategische content creatie voor financiele doelgroepen"

### Contact
- "Laten we samenwerken"
- "Neem contact op en ontdek wat wij voor u kunnen betekenen"

---

## 9. Design Rationale Sayfasi

Site icinde gizli bir "/rationale" sayfasi veya ayri bir bölüm:
Lisa'ya sunulurken "neden bu tasarim kararlarini aldim" aciklamasi.

Icerik:
1. Mevcut sitenin analizi (diplomatik dilde)
2. 3 psikolojik prensip ve nasil uygulandiği
3. Renk secimi gerekceleri (finans = guven = koyu tonlar + gold)
4. Tipografi kararlari
5. Her sayfanin stratejik amaci

Bu, "sadece tasarlamiyorum, stratejik dusunuyorum" mesajini verir.

---

## 10. Teslimat Plani

1. GitHub repo olustur + GitHub Pages aktif et
2. Siteyi gelistir (4 sayfa + tum animasyonlar)
3. Lisa'ya mail at: "Ilham aldim, sizin icin bir konsept hazirladim"
4. Link: bedirhhantunc.github.io/3xi-redesign
5. Design rationale'i mailin icinde veya ayri sayfa olarak sun
