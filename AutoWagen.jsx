/**
 * =====================================================
 * AutoWagen — "A wie Auto / Personenkraftwagen"
 * A Mild Sci-Fi Auto Dealership Landing Page
 * =====================================================
 *
 * TECH STACK:
 *   - React (functional components + hooks)
 *   - CSS-in-JS via <style> tag (no external CSS file needed)
 *   - React Router (simulated with useState for single-file demo)
 *
 * COLOR PALETTE:
 *   --primary:    #E8001D  (deep red — dominates, commands attention)
 *   --accent:     #4A00FF  (electric blue flecks — sci-fi pulse)
 *   --secondary:  #8B0035  (red-purple — rich mid-tone)
 *   --tertiary:   #2E2E35  (dark grey/silver — grounding element)
 *   --silver:     #A8AABD  (metallic silver — details)
 *   --bg-dark:    #0A0A0F  (near-black — deep space base)
 *   --bg-card:    #12121A  (slightly lighter for cards)
 *
 * STRUCTURE:
 *   <App>                   — Router controller (manages which "page" shows)
 *     <LandingPage>         — Main dealership homepage
 *       <NavBar>            — Sticky navigation with logo
 *       <HeroSection>       — Full-viewport cinematic opener
 *       <CategoryStrip>     — Horizontal filter categories (Sedan, SUV, etc.)
 *       <CarGrid>           — 3-column responsive grid of <CarCard>
 *       <CarCard>           — Individual car with specs + CTA link
 *       <SpecsHighlight>    — Full-width feature section for a hero car
 *       <Footer>            — Links, contact, branding
 *     <CarDetailPage>       — Individual car deep-dive (navigated to on click)
 *       <CarCarousel>       — Image carousel with prev/next controls
 *       <SpecsTable>        — Full specs breakdown
 *       <ManufacturerInfo>  — Brand history and related models
 */

import { useState, useEffect, useRef } from "react";

// ─────────────────────────────────────────────────
// SECTION 1: DATA
// All car data lives here. In a real app this would
// come from an API (e.g. /api/cars/:id).
// ─────────────────────────────────────────────────

/**
 * CAR DATABASE
 * Each car object contains:
 *  - id: unique slug used in "routing"
 *  - name: display name
 *  - brand: manufacturer
 *  - category: used for filtering
 *  - tagline: short punchy marketing line
 *  - description: longer copy for landing card
 *  - price: formatted string
 *  - images: array of placeholder URLs (swap for real images)
 *  - specs: key performance/tech figures
 *  - features: bullet highlights for detail page
 *  - manufacturerInfo: brand backstory + related models
 */
const CARS = [
  {
    id: "phantom-x9",
    name: "Phantom X9",
    brand: "Audi",
    category: "Sedan",
    tagline: "Silence is the new roar.",
    description:
      "The Phantom X9 redefines what a performance sedan can be. Four electric motors. Quattro all-wheel drive. A cockpit that reads your biometrics before you even touch the wheel.",
    price: "€142,000",
    badge: "New Arrival",
    images: [
      "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800&q=80",
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80",
      "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&q=80",
    ],
    specs: {
      "0–100 km/h": "2.9 s",
      "Top Speed": "280 km/h",
      Range: "640 km",
      Power: "700 hp",
      Torque: "973 Nm",
      Drive: "AWD",
      Weight: "2,140 kg",
      Charging: "350 kW DC",
    },
    features: [
      "Biometric cabin pressure calibration",
      "Holographic HUD instrument cluster",
      "Matrix LED with predictive beam shaping",
      "Air suspension with road-scan preview",
      "Level 3 autonomous highway assist",
      "Acoustic glass cocoon — 14 dB quieter than rivals",
    ],
    manufacturerInfo: {
      brand: "Audi",
      founded: 1909,
      origin: "Ingolstadt, Germany",
      about:
        "Audi AG, member of the Volkswagen Group, has spent over a century engineering cars that balance technical innovation with refined aesthetics. Their motto 'Vorsprung durch Technik' (Advancement through Technology) is no marketing slogan — it is a philosophy baked into every platform.",
      relatedModels: ["Audi e-tron GT", "Audi RS7", "Audi Q8 e-tron"],
    },
  },
  {
    id: "tempest-gtr",
    name: "Tempest GTR",
    brand: "BMW",
    category: "Sports",
    tagline: "Born on the Nürburgring. Lives everywhere.",
    description:
      "Turbocharged fury wrapped in carbon fibre and German precision. The Tempest GTR isn't a car you drive — it's a car you wear, feeling every apex, every braking zone through the seat.",
    price: "€198,500",
    badge: "Track Edition",
    images: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80",
      "https://images.unsplash.com/photo-1542362567-b07e54358753?w=800&q=80",
    ],
    specs: {
      "0–100 km/h": "3.2 s",
      "Top Speed": "320 km/h",
      Engine: "4.4L V8 Biturbo",
      Power: "625 hp",
      Torque: "750 Nm",
      Drive: "RWD",
      Weight: "1,625 kg",
      Gearbox: "8-spd M Steptronic",
    },
    features: [
      "Active M rear differential",
      "Carbon ceramic brakes — 380 mm front",
      "M Adaptive suspension with track mode",
      "Heads-up display with lap timing overlay",
      "Merino leather/Alcantara racing interior",
      "Titanium exhaust system — 18 kg lighter",
    ],
    manufacturerInfo: {
      brand: "BMW",
      founded: 1916,
      origin: "Munich, Germany",
      about:
        "Bayerische Motoren Werke AG began as an aircraft engine manufacturer and has since become synonymous with driving pleasure. The M division, founded in 1972, exists solely to extract maximum performance while retaining daily usability — a balance few manufacturers achieve.",
      relatedModels: ["BMW M5 CS", "BMW XM", "BMW i8"],
    },
  },
  {
    id: "vela-noir",
    name: "Vela Noir",
    brand: "Mercedes-Benz",
    category: "SUV",
    tagline: "Command the road. Question nothing.",
    description:
      "A luxury SUV with the soul of a supercar. The Vela Noir draws on Mercedes-AMG's motorsport DNA and wraps it in the quietest, most sophisticated cabin ever engineered at Affalterbach.",
    price: "€176,000",
    badge: "Best Seller",
    images: [
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80",
      "https://images.unsplash.com/photo-1617654112329-a8a88f0ca6d2?w=800&q=80",
      "https://images.unsplash.com/photo-1614200179396-2bdb77ebf81b?w=800&q=80",
    ],
    specs: {
      "0–100 km/h": "3.7 s",
      "Top Speed": "290 km/h",
      Engine: "4.0L V8 Biturbo",
      Power: "630 hp",
      Torque: "850 Nm",
      Drive: "4MATIC+",
      Weight: "2,330 kg",
      Gearbox: "9-spd AMG Speedshift",
    },
    features: [
      "AMG Performance 4MATIC+ torque vectoring",
      "Active ride control at 4G cornering",
      "MBUX hyperscreen — 141 cm curved OLED",
      "Burmester 4D surround sound (1,750 W)",
      "Fragrance atomisation system (8 scents)",
      "Night vision assist with thermal pedestrian detection",
    ],
    manufacturerInfo: {
      brand: "Mercedes-Benz",
      founded: 1926,
      origin: "Stuttgart, Germany",
      about:
        "Karl Benz patented the first true automobile in 1886. From that invention grew one of the world's most iconic brands. The AMG sub-brand, originally an independent tuning company, was acquired by Daimler and now serves as the performance engineering heart of every high-output Mercedes.",
      relatedModels: ["Mercedes GLE 63 AMG", "Mercedes EQS SUV", "Mercedes G63 AMG"],
    },
  },
  {
    id: "corvus-ev",
    name: "Corvus EV",
    brand: "Porsche",
    category: "Electric",
    tagline: "The future is flat-floor and fast.",
    description:
      "Porsche's masterclass in electric performance. 800-volt architecture. Rear-axle steering. A Taycan-derived platform reimagined for the next decade of driving — with a sound system that synthesises the ghost of a flat-six.",
    price: "€164,000",
    badge: "Electric",
    images: [
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&q=80",
      "https://images.unsplash.com/photo-1611270629569-8b357cb88da9?w=800&q=80",
      "https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=800&q=80",
    ],
    specs: {
      "0–100 km/h": "2.8 s",
      "Top Speed": "260 km/h",
      Range: "590 km",
      Power: "761 hp",
      Torque: "1,050 Nm",
      Drive: "AWD",
      Weight: "2,195 kg",
      Charging: "270 kW (5 min = 100 km)",
    },
    features: [
      "800V architecture for ultrafast charging",
      "Porsche Dynamic Chassis Control Sport",
      "Rear-axle steering (±2.8°) for agility",
      "Synthetic drive sound (Porsche Sound Studio)",
      "Active aerodynamics — spoiler + diffuser coordination",
      "Porsche InnoDrive predictive cruise with map data",
    ],
    manufacturerInfo: {
      brand: "Porsche",
      founded: 1931,
      origin: "Zuffenhausen, Germany",
      about:
        "Ferdinand Porsche founded the company bearing his name with a single directive: build the sports car he always wanted to own. Decades later, Porsche engineers every car — from the Macan to the 918 Spyder — around driver involvement as the primary design constraint. Even their EVs are engineered to feel alive.",
      relatedModels: ["Porsche Taycan Turbo S", "Porsche 911 GT3 RS", "Porsche Cayenne Turbo GT"],
    },
  },
  {
    id: "obsidian-ultra",
    name: "Obsidian Ultra",
    brand: "Lamborghini",
    category: "Supercar",
    tagline: "Excess, perfected.",
    description:
      "Naturally aspirated. Rear-wheel drive. Manual gearbox optional. The Obsidian Ultra is a deliberate provocation — a car that refuses to be domesticated in an era of driver aids and electric motors.",
    price: "€398,000",
    badge: "Limited — 200 Units",
    images: [
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80",
      "https://images.unsplash.com/photo-1621135802920-133df287f89c?w=800&q=80",
      "https://images.unsplash.com/photo-1612208695882-02f2322b7fee?w=800&q=80",
    ],
    specs: {
      "0–100 km/h": "2.5 s",
      "Top Speed": "355 km/h",
      Engine: "6.5L V12 NA",
      Power: "830 hp",
      Torque: "720 Nm",
      Drive: "RWD",
      Weight: "1,422 kg",
      Gearbox: "6-spd Manual / 7-spd ISR",
    },
    features: [
      "Naturally aspirated V12 — zero turbo lag",
      "Full carbon monocoque chassis",
      "Push-rod suspension derived from Formula racing",
      "Optional 6-speed gated manual transmission",
      "Forged magnesium centre-lock wheels",
      "Aerodynamic ground effect — no wing required",
    ],
    manufacturerInfo: {
      brand: "Lamborghini",
      founded: 1963,
      origin: "Sant'Agata Bolognese, Italy",
      about:
        "Ferruccio Lamborghini founded his car company after a dispute with Enzo Ferrari — and that rebellious spirit has never left Sant'Agata. Every Lamborghini is designed to be outrageous: in sound, in looks, and in sensation. They are cars for people who find subtlety insufficient.",
      relatedModels: ["Lamborghini Huracán STO", "Lamborghini Urus Performante", "Lamborghini Revuelto"],
    },
  },
  {
    id: "argent-one",
    name: "Argent One",
    brand: "Rolls-Royce",
    category: "Luxury",
    tagline: "Not driven. Conveyed.",
    description:
      "The Argent One does not compete. It exists on a separate tier entirely. Hand-painted in six layers of bespoke lacquer, with 1,340 individual lambswool threads in each floor mat, it is the automotive equivalent of a private residence.",
    price: "€580,000",
    badge: "Bespoke",
    images: [
      "https://images.unsplash.com/photo-1636633762833-5d1658f1e29b?w=800&q=80",
      "https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&q=80",
      "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800&q=80",
    ],
    specs: {
      "0–100 km/h": "4.6 s",
      "Top Speed": "250 km/h (limited)",
      Engine: "6.75L V12 Biturbo",
      Power: "571 hp",
      Torque: "900 Nm",
      Drive: "RWD",
      Weight: "2,660 kg",
      Gearbox: "8-spd ZF Automatic",
    },
    features: [
      "Starlight headliner — 1,344 fibre-optic stars",
      "Gallery dashboard — bespoke artwork encased behind glass",
      "Self-closing doors with whisper-close mechanism",
      "Spirit of Ecstasy — retractable illuminated figurine",
      "Bespoke audio by Rolls-Royce Lyrical (18 speakers)",
      "Air suspension with camera-guided road-scan preview",
    ],
    manufacturerInfo: {
      brand: "Rolls-Royce",
      founded: 1906,
      origin: "Manchester / Goodwood, England",
      about:
        "Charles Rolls and Henry Royce met once at the Midland Hotel in Manchester and agreed to combine Royce's engineering excellence with Rolls's commercial vision. Over a century later, the Goodwood facility crafts each car by hand to the owner's exact specification. No two Rolls-Royces are the same.",
      relatedModels: ["Rolls-Royce Spectre EV", "Rolls-Royce Cullinan", "Rolls-Royce Phantom Series II"],
    },
  },
];

// All available filter categories (derived from data + "All")
const CATEGORIES = ["All", "Sedan", "Sports", "SUV", "Electric", "Supercar", "Luxury"];

// ─────────────────────────────────────────────────
// SECTION 2: GLOBAL STYLES
// Injected as a <style> tag so this works as a
// single JSX file without external stylesheets.
// ─────────────────────────────────────────────────

/**
 * GlobalStyles — injects all CSS into <head>
 * Uses CSS custom properties (variables) for the palette,
 * Google Fonts for typography, and keyframe animations.
 */
const GlobalStyles = () => (
  <style>{`
    /* ── FONTS ── */
    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=Rajdhani:wght@300;400;500;600;700&family=Inter:wght@300;400;500&display=swap');

    /* Orbitron   → Display / headings (sci-fi angular feel)    */
    /* Rajdhani   → Sub-headings / labels (technical, precise)  */
    /* Inter      → Body text (readable, modern)                */

    /* ── CSS VARIABLES (design tokens) ── */
    :root {
      --primary:    #E8001D;   /* dominant red          */
      --primary-dim:#9E0013;   /* darker red for hover  */
      --accent:     #4A00FF;   /* electric blue flecks  */
      --secondary:  #8B0035;   /* red-purple            */
      --tertiary:   #2E2E35;   /* dark grey             */
      --silver:     #A8AABD;   /* metallic silver       */
      --bg-dark:    #0A0A0F;   /* deep space black      */
      --bg-card:    #12121A;   /* card background       */
      --bg-mid:     #1A1A24;   /* mid-depth layer       */
      --text-primary:   #F0F0F0;
      --text-secondary: #A8AABD;
      --text-muted:     #5A5A70;
      --border:     rgba(232, 0, 29, 0.15);
      --border-bright: rgba(232, 0, 29, 0.5);
      --glow-red:   0 0 20px rgba(232, 0, 29, 0.4);
      --glow-blue:  0 0 20px rgba(74, 0, 255, 0.4);
      --radius:     4px;
      --radius-lg:  8px;
    }

    /* ── RESET & BASE ── */
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    html { scroll-behavior: smooth; }

    body {
      background: var(--bg-dark);
      color: var(--text-primary);
      font-family: 'Inter', sans-serif;
      font-size: 16px;
      line-height: 1.6;
      overflow-x: hidden;
      /* Subtle grid texture overlay for sci-fi depth */
      background-image:
        linear-gradient(rgba(232,0,29,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(232,0,29,0.03) 1px, transparent 1px);
      background-size: 60px 60px;
    }

    /* ── TYPOGRAPHY ── */
    h1, h2, h3 { font-family: 'Orbitron', monospace; letter-spacing: 0.05em; }
    h4, h5, h6, .label { font-family: 'Rajdhani', sans-serif; letter-spacing: 0.08em; }

    a { color: inherit; text-decoration: none; }

    /* ── SCROLLBAR ── */
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: var(--bg-dark); }
    ::-webkit-scrollbar-thumb { background: var(--primary); border-radius: 3px; }

    /* ── KEYFRAME ANIMATIONS ── */

    /* Fade + slide in from bottom — used for card reveals */
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(30px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    /* Horizontal scanning line (sci-fi HUD effect) */
    @keyframes scan {
      0%   { top: -4px; }
      100% { top: 100%; }
    }

    /* Pulsing red glow — used on hero badge and CTAs */
    @keyframes pulse-glow {
      0%, 100% { box-shadow: 0 0 10px rgba(232,0,29,0.3); }
      50%       { box-shadow: 0 0 30px rgba(232,0,29,0.7), 0 0 60px rgba(232,0,29,0.3); }
    }

    /* Typewriter cursor blink */
    @keyframes blink {
      0%, 100% { opacity: 1; }
      50%       { opacity: 0; }
    }

    /* Floating shimmer for hero car silhouette */
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50%       { transform: translateY(-12px); }
    }

    /* Rotate for decorative ring elements */
    @keyframes spin-slow {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }

    /* Data ticker scroll */
    @keyframes ticker {
      from { transform: translateX(0); }
      to   { transform: translateX(-50%); }
    }

    /* ── UTILITY CLASSES ── */
    .sr-only {
      position: absolute; width: 1px; height: 1px;
      padding: 0; margin: -1px; overflow: hidden;
      clip: rect(0,0,0,0); border: 0;
    }

    /* ── NAVBAR ── */
    .navbar {
      position: fixed; top: 0; left: 0; right: 0; z-index: 100;
      display: flex; align-items: center; justify-content: space-between;
      padding: 0 40px;
      height: 64px;
      background: rgba(10, 10, 15, 0.85);
      backdrop-filter: blur(16px);
      border-bottom: 1px solid var(--border);
      transition: border-color 0.3s;
    }
    .navbar:hover { border-color: var(--border-bright); }

    .nav-logo {
      font-family: 'Orbitron', monospace;
      font-size: 1.1rem;
      font-weight: 900;
      color: var(--text-primary);
      display: flex; align-items: center; gap: 10px;
      cursor: pointer;
    }
    .nav-logo span.red { color: var(--primary); }
    .nav-logo span.blue { color: var(--accent); }

    /* Logo diamond mark */
    .logo-mark {
      width: 28px; height: 28px;
      background: linear-gradient(135deg, var(--primary), var(--accent));
      clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
      flex-shrink: 0;
    }

    .nav-links {
      display: flex; gap: 32px; list-style: none;
      font-family: 'Rajdhani', sans-serif;
      font-size: 0.9rem; font-weight: 600;
      letter-spacing: 0.12em; text-transform: uppercase;
    }
    .nav-links a {
      color: var(--text-secondary);
      transition: color 0.2s;
      position: relative;
    }
    .nav-links a::after {
      content: '';
      position: absolute; bottom: -4px; left: 0; right: 0;
      height: 1px; background: var(--primary);
      transform: scaleX(0); transition: transform 0.2s;
    }
    .nav-links a:hover { color: var(--text-primary); }
    .nav-links a:hover::after { transform: scaleX(1); }

    .nav-cta {
      padding: 8px 20px;
      background: var(--primary);
      color: #fff;
      font-family: 'Rajdhani', sans-serif;
      font-size: 0.85rem; font-weight: 700;
      letter-spacing: 0.1em; text-transform: uppercase;
      border: none; cursor: pointer;
      clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
      transition: background 0.2s, transform 0.15s;
    }
    .nav-cta:hover { background: var(--primary-dim); transform: scale(1.03); }

    /* Mobile hamburger — hidden by default */
    .nav-hamburger {
      display: none; flex-direction: column; gap: 5px;
      background: none; border: none; cursor: pointer; padding: 4px;
    }
    .nav-hamburger span {
      width: 22px; height: 2px; background: var(--silver);
      display: block; transition: 0.2s;
    }

    /* ── HERO SECTION ── */
    .hero {
      min-height: 100vh;
      display: flex; flex-direction: column;
      justify-content: center; align-items: flex-start;
      padding: 120px 60px 80px;
      position: relative; overflow: hidden;
    }

    /* Diagonal red accent line across hero */
    .hero::before {
      content: '';
      position: absolute; top: 0; right: 0;
      width: 55%; height: 100%;
      background: linear-gradient(135deg,
        transparent 30%,
        rgba(232,0,29,0.04) 30%,
        rgba(232,0,29,0.08) 60%,
        rgba(74,0,255,0.05) 100%
      );
      pointer-events: none;
    }

    /* Scanning line HUD effect */
    .hero-scan-line {
      position: absolute; left: 0; right: 0; height: 2px;
      background: linear-gradient(90deg, transparent, var(--primary), transparent);
      opacity: 0.15;
      animation: scan 6s linear infinite;
      pointer-events: none;
    }

    .hero-eyebrow {
      font-family: 'Rajdhani', sans-serif;
      font-size: 0.8rem; font-weight: 600;
      letter-spacing: 0.3em; text-transform: uppercase;
      color: var(--primary);
      margin-bottom: 16px;
      display: flex; align-items: center; gap: 12px;
    }
    .hero-eyebrow::before {
      content: ''; width: 32px; height: 1px; background: var(--primary);
    }

    .hero-title {
      font-size: clamp(2.4rem, 6vw, 5.5rem);
      font-weight: 900;
      line-height: 1.05;
      max-width: 700px;
      margin-bottom: 24px;
    }
    .hero-title .line-accent { color: var(--primary); }
    .hero-title .line-ghost {
      color: transparent;
      -webkit-text-stroke: 1px rgba(168,170,189,0.3);
    }

    .hero-sub {
      font-size: 1.05rem;
      color: var(--text-secondary);
      max-width: 480px;
      margin-bottom: 40px;
      line-height: 1.7;
    }

    .hero-actions {
      display: flex; gap: 16px; flex-wrap: wrap;
    }

    /* Primary CTA button — skewed parallelogram */
    .btn-primary {
      padding: 14px 36px;
      background: var(--primary);
      color: #fff;
      font-family: 'Rajdhani', sans-serif;
      font-size: 1rem; font-weight: 700;
      letter-spacing: 0.1em; text-transform: uppercase;
      border: none; cursor: pointer;
      clip-path: polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%);
      animation: pulse-glow 3s ease-in-out infinite;
      transition: transform 0.15s;
    }
    .btn-primary:hover { transform: scale(1.04); }

    /* Secondary outline button */
    .btn-outline {
      padding: 13px 36px;
      background: transparent;
      color: var(--silver);
      font-family: 'Rajdhani', sans-serif;
      font-size: 1rem; font-weight: 600;
      letter-spacing: 0.1em; text-transform: uppercase;
      border: 1px solid rgba(168,170,189,0.3);
      cursor: pointer;
      clip-path: polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%);
      transition: border-color 0.2s, color 0.2s;
    }
    .btn-outline:hover { border-color: var(--silver); color: #fff; }

    /* Hero stats bar */
    .hero-stats {
      display: flex; gap: 40px; margin-top: 60px;
      padding-top: 32px;
      border-top: 1px solid var(--border);
    }
    .hero-stat-item { text-align: left; }
    .hero-stat-num {
      font-family: 'Orbitron', monospace;
      font-size: 1.8rem; font-weight: 700;
      color: var(--primary);
    }
    .hero-stat-label {
      font-family: 'Rajdhani', sans-serif;
      font-size: 0.75rem; letter-spacing: 0.15em;
      text-transform: uppercase; color: var(--text-muted);
    }

    /* ── DATA TICKER ── */
    .ticker-wrap {
      overflow: hidden;
      padding: 10px 0;
      background: rgba(232,0,29,0.06);
      border-top: 1px solid var(--border);
      border-bottom: 1px solid var(--border);
    }
    .ticker-inner {
      display: inline-flex; gap: 80px; white-space: nowrap;
      animation: ticker 30s linear infinite;
    }
    .ticker-item {
      font-family: 'Rajdhani', sans-serif;
      font-size: 0.8rem; letter-spacing: 0.2em;
      text-transform: uppercase; color: var(--text-muted);
      display: flex; align-items: center; gap: 16px;
    }
    .ticker-item span { color: var(--primary); font-weight: 600; }
    .ticker-dot {
      width: 4px; height: 4px;
      background: var(--primary); border-radius: 50%;
    }

    /* ── SECTION SHARED ── */
    .section {
      padding: 80px 60px;
    }
    .section-header {
      margin-bottom: 48px;
    }
    .section-label {
      font-family: 'Rajdhani', sans-serif;
      font-size: 0.75rem; font-weight: 600;
      letter-spacing: 0.3em; text-transform: uppercase;
      color: var(--primary);
      margin-bottom: 8px;
      display: flex; align-items: center; gap: 10px;
    }
    .section-label::before {
      content: ''; width: 20px; height: 1px; background: var(--primary);
    }
    .section-title {
      font-size: clamp(1.6rem, 3vw, 2.8rem);
      font-weight: 700;
      line-height: 1.15;
      max-width: 500px;
    }

    /* ── CATEGORY FILTER STRIP ── */
    .category-strip {
      display: flex; gap: 8px; flex-wrap: wrap;
      margin-bottom: 40px;
    }
    .category-btn {
      padding: 8px 20px;
      background: transparent;
      color: var(--text-muted);
      font-family: 'Rajdhani', sans-serif;
      font-size: 0.85rem; font-weight: 600;
      letter-spacing: 0.12em; text-transform: uppercase;
      border: 1px solid var(--tertiary);
      cursor: pointer;
      transition: all 0.2s;
    }
    .category-btn:hover {
      border-color: var(--silver);
      color: var(--text-primary);
    }
    .category-btn.active {
      background: var(--primary);
      border-color: var(--primary);
      color: #fff;
    }

    /* ── CAR GRID ── */
    /* 
     * CSS Grid with auto-fill and minmax creates a naturally
     * responsive layout without media queries for the breakpoints.
     * 3 columns on desktop → 2 on tablet → 1 on mobile.
     */
    .car-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
      gap: 24px;
    }

    /* ── CAR CARD ── */
    .car-card {
      background: var(--bg-card);
      border: 1px solid var(--border);
      position: relative; overflow: hidden;
      cursor: pointer;
      transition: border-color 0.25s, transform 0.25s;
      animation: fadeUp 0.5s ease both;
    }
    .car-card:hover {
      border-color: rgba(232,0,29,0.4);
      transform: translateY(-4px);
    }
    /* Top-left corner accent mark */
    .car-card::before {
      content: '';
      position: absolute; top: 0; left: 0;
      width: 40px; height: 40px;
      border-top: 2px solid var(--primary);
      border-left: 2px solid var(--primary);
      z-index: 1;
    }
    /* Bottom-right corner accent mark */
    .car-card::after {
      content: '';
      position: absolute; bottom: 0; right: 0;
      width: 40px; height: 40px;
      border-bottom: 2px solid var(--accent);
      border-right: 2px solid var(--accent);
      z-index: 1;
    }

    /* Card image container with aspect ratio */
    .card-img-wrap {
      position: relative;
      aspect-ratio: 16/9;
      overflow: hidden;
      background: var(--tertiary);
    }
    .card-img-wrap img {
      width: 100%; height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }
    .car-card:hover .card-img-wrap img { transform: scale(1.06); }

    /* Badge (e.g. "New Arrival", "Track Edition") */
    .card-badge {
      position: absolute; top: 12px; right: 12px;
      padding: 4px 10px;
      background: var(--primary);
      font-family: 'Rajdhani', sans-serif;
      font-size: 0.7rem; font-weight: 700;
      letter-spacing: 0.15em; text-transform: uppercase;
      color: #fff;
      z-index: 2;
    }

    .card-body { padding: 20px 24px 24px; }

    .card-brand {
      font-family: 'Rajdhani', sans-serif;
      font-size: 0.75rem; font-weight: 700;
      letter-spacing: 0.2em; text-transform: uppercase;
      color: var(--primary);
      margin-bottom: 4px;
    }
    .card-name {
      font-family: 'Orbitron', monospace;
      font-size: 1.3rem; font-weight: 700;
      margin-bottom: 8px;
      line-height: 1.2;
    }
    .card-tagline {
      font-style: italic;
      color: var(--text-secondary);
      font-size: 0.85rem;
      margin-bottom: 12px;
    }

    /* Mini specs row inside card */
    .card-specs {
      display: flex; gap: 16px; flex-wrap: wrap;
      border-top: 1px solid var(--border);
      padding-top: 14px; margin-top: 14px;
    }
    .card-spec {
      display: flex; flex-direction: column;
      gap: 2px;
    }
    .card-spec-val {
      font-family: 'Orbitron', monospace;
      font-size: 0.85rem; font-weight: 600;
      color: var(--text-primary);
    }
    .card-spec-key {
      font-family: 'Rajdhani', sans-serif;
      font-size: 0.7rem; letter-spacing: 0.12em;
      text-transform: uppercase; color: var(--text-muted);
    }

    .card-footer {
      display: flex; justify-content: space-between; align-items: center;
      padding: 14px 24px;
      border-top: 1px solid var(--border);
      background: rgba(255,255,255,0.02);
    }
    .card-price {
      font-family: 'Orbitron', monospace;
      font-size: 1.05rem; font-weight: 700;
      color: var(--primary);
    }
    .card-cta {
      font-family: 'Rajdhani', sans-serif;
      font-size: 0.8rem; font-weight: 700;
      letter-spacing: 0.12em; text-transform: uppercase;
      color: var(--silver);
      display: flex; align-items: center; gap: 6px;
      transition: color 0.2s;
    }
    .car-card:hover .card-cta { color: var(--text-primary); }
    .card-arrow {
      display: inline-block;
      transition: transform 0.2s;
    }
    .car-card:hover .card-arrow { transform: translateX(4px); }

    /* ── SPECS HIGHLIGHT STRIP ── */
    .specs-highlight {
      background: var(--bg-mid);
      border: 1px solid var(--border);
      padding: 60px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 60px;
      align-items: center;
    }
    .sh-content h2 {
      font-size: clamp(1.4rem, 2.5vw, 2.2rem);
      margin-bottom: 16px;
      line-height: 1.2;
    }
    .sh-content p {
      color: var(--text-secondary);
      line-height: 1.7;
      margin-bottom: 28px;
    }
    .sh-specs-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }
    .sh-spec-item {
      border-left: 2px solid var(--primary);
      padding-left: 12px;
    }
    .sh-spec-val {
      font-family: 'Orbitron', monospace;
      font-size: 1.1rem; font-weight: 700;
      color: var(--text-primary);
    }
    .sh-spec-key {
      font-family: 'Rajdhani', sans-serif;
      font-size: 0.7rem; letter-spacing: 0.15em;
      text-transform: uppercase; color: var(--text-muted);
    }

    /* ── FOOTER ── */
    .footer {
      background: #08080E;
      border-top: 1px solid var(--border);
      padding: 48px 60px 32px;
    }
    .footer-grid {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1fr;
      gap: 40px;
      margin-bottom: 40px;
    }
    .footer-brand-name {
      font-family: 'Orbitron', monospace;
      font-size: 1rem; font-weight: 900;
      margin-bottom: 12px;
    }
    .footer-brand-desc {
      color: var(--text-muted);
      font-size: 0.85rem; line-height: 1.7;
      max-width: 260px;
    }
    .footer-col-title {
      font-family: 'Rajdhani', sans-serif;
      font-size: 0.7rem; font-weight: 700;
      letter-spacing: 0.25em; text-transform: uppercase;
      color: var(--primary);
      margin-bottom: 16px;
    }
    .footer-links { list-style: none; display: flex; flex-direction: column; gap: 10px; }
    .footer-links a {
      color: var(--text-muted);
      font-size: 0.85rem;
      transition: color 0.2s;
    }
    .footer-links a:hover { color: var(--text-primary); }
    .footer-bottom {
      border-top: 1px solid var(--border);
      padding-top: 20px;
      display: flex; justify-content: space-between; align-items: center;
    }
    .footer-copy {
      font-family: 'Rajdhani', sans-serif;
      font-size: 0.75rem; color: var(--text-muted);
      letter-spacing: 0.1em;
    }
    .footer-accent { color: var(--primary); }

    /* ── DETAIL PAGE ── */
    .detail-page {
      min-height: 100vh;
      padding-top: 64px; /* navbar height */
    }

    .detail-hero {
      padding: 48px 60px;
      background: var(--bg-mid);
      border-bottom: 1px solid var(--border);
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 60px;
      align-items: start;
    }

    /* ── CAROUSEL ── */
    .carousel { position: relative; }
    .carousel-main {
      width: 100%; aspect-ratio: 16/9;
      overflow: hidden; background: var(--tertiary);
      border: 1px solid var(--border);
      position: relative;
    }
    .carousel-main img {
      width: 100%; height: 100%;
      object-fit: cover;
      transition: opacity 0.4s ease;
    }

    /* Prev / Next buttons */
    .carousel-btn {
      position: absolute; top: 50%; transform: translateY(-50%);
      background: rgba(10,10,15,0.7);
      border: 1px solid var(--border-bright);
      color: var(--text-primary);
      width: 40px; height: 40px;
      font-size: 1.2rem; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      transition: background 0.2s;
      z-index: 5;
    }
    .carousel-btn:hover { background: var(--primary); }
    .carousel-btn.prev { left: 12px; }
    .carousel-btn.next { right: 12px; }

    /* Thumbnail strip */
    .carousel-thumbs {
      display: flex; gap: 8px; margin-top: 8px;
    }
    .carousel-thumb {
      flex: 1; aspect-ratio: 16/9;
      overflow: hidden; cursor: pointer;
      border: 1px solid transparent;
      transition: border-color 0.2s;
    }
    .carousel-thumb.active { border-color: var(--primary); }
    .carousel-thumb img { width: 100%; height: 100%; object-fit: cover; }

    /* Image count overlay */
    .carousel-count {
      position: absolute; bottom: 10px; right: 14px;
      font-family: 'Rajdhani', sans-serif;
      font-size: 0.75rem; letter-spacing: 0.1em;
      color: rgba(255,255,255,0.6);
      z-index: 5;
    }

    /* Detail page right column */
    .detail-info { padding: 8px 0; }
    .detail-brand {
      font-family: 'Rajdhani', sans-serif;
      font-size: 0.8rem; font-weight: 700;
      letter-spacing: 0.25em; text-transform: uppercase;
      color: var(--primary); margin-bottom: 6px;
    }
    .detail-name {
      font-size: clamp(1.8rem, 3vw, 3rem);
      font-weight: 900; line-height: 1.1;
      margin-bottom: 16px;
    }
    .detail-tagline {
      font-size: 1.05rem; font-style: italic;
      color: var(--text-secondary);
      border-left: 3px solid var(--primary);
      padding-left: 14px;
      margin-bottom: 24px; line-height: 1.6;
    }
    .detail-desc {
      color: var(--text-secondary);
      line-height: 1.75; margin-bottom: 28px;
      font-size: 0.95rem;
    }
    .detail-price {
      font-family: 'Orbitron', monospace;
      font-size: 2rem; font-weight: 700;
      color: var(--primary); margin-bottom: 28px;
    }
    .detail-price small {
      font-size: 0.8rem; color: var(--text-muted);
      font-family: 'Rajdhani', sans-serif;
    }
    .detail-actions { display: flex; gap: 12px; flex-wrap: wrap; }

    /* ── SPECS TABLE ── */
    .specs-section { padding: 60px; }
    .specs-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.9rem;
    }
    .specs-table th, .specs-table td {
      text-align: left;
      padding: 14px 20px;
      border-bottom: 1px solid var(--border);
    }
    .specs-table th {
      font-family: 'Rajdhani', sans-serif;
      font-size: 0.75rem; font-weight: 700;
      letter-spacing: 0.18em; text-transform: uppercase;
      color: var(--text-muted);
      background: var(--bg-mid);
      width: 40%;
    }
    .specs-table td {
      font-family: 'Orbitron', monospace;
      font-size: 0.85rem; color: var(--text-primary);
    }
    .specs-table tr:hover th { color: var(--primary); }
    .specs-table tr:hover td { color: var(--silver); }

    /* ── FEATURES LIST ── */
    .features-section { padding: 0 60px 60px; }
    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 16px;
    }
    .feature-item {
      display: flex; align-items: flex-start; gap: 12px;
      padding: 16px;
      background: var(--bg-card);
      border: 1px solid var(--border);
      font-size: 0.88rem; color: var(--text-secondary);
      line-height: 1.5;
    }
    .feature-icon {
      flex-shrink: 0; width: 20px; height: 20px;
      background: var(--primary);
      clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
      margin-top: 2px;
    }

    /* ── MANUFACTURER INFO ── */
    .mfr-section {
      padding: 60px;
      background: var(--bg-mid);
      border-top: 1px solid var(--border);
    }
    .mfr-grid {
      display: grid; grid-template-columns: 1fr 1fr; gap: 48px;
      align-items: start;
    }
    .mfr-facts { display: flex; flex-direction: column; gap: 12px; }
    .mfr-fact {
      display: flex; gap: 12px;
      padding-bottom: 12px;
      border-bottom: 1px solid var(--border);
    }
    .mfr-fact-key {
      font-family: 'Rajdhani', sans-serif;
      font-size: 0.75rem; letter-spacing: 0.15em;
      text-transform: uppercase; color: var(--text-muted);
      width: 80px; flex-shrink: 0; padding-top: 2px;
    }
    .mfr-fact-val {
      font-family: 'Orbitron', monospace;
      font-size: 0.85rem; color: var(--text-primary);
    }
    .mfr-about {
      color: var(--text-secondary);
      line-height: 1.75; font-size: 0.95rem;
      margin-bottom: 24px;
    }
    .mfr-related-title {
      font-family: 'Rajdhani', sans-serif;
      font-size: 0.75rem; font-weight: 700;
      letter-spacing: 0.2em; text-transform: uppercase;
      color: var(--primary); margin-bottom: 12px;
    }
    .mfr-related-list {
      display: flex; flex-direction: column; gap: 8px;
    }
    .mfr-related-item {
      padding: 10px 16px;
      background: var(--bg-card);
      border: 1px solid var(--border);
      font-family: 'Rajdhani', sans-serif;
      font-size: 0.9rem; color: var(--text-secondary);
      display: flex; align-items: center; gap: 10px;
    }
    .mfr-related-item::before {
      content: ''; width: 8px; height: 8px;
      background: var(--primary);
      clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
    }

    /* ── BACK BUTTON ── */
    .back-btn {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 10px 20px;
      background: transparent;
      border: 1px solid var(--border);
      color: var(--text-secondary);
      font-family: 'Rajdhani', sans-serif;
      font-size: 0.85rem; font-weight: 600;
      letter-spacing: 0.1em; text-transform: uppercase;
      cursor: pointer; margin: 24px 60px;
      transition: all 0.2s;
    }
    .back-btn:hover { border-color: var(--primary); color: var(--text-primary); }

    /* ── RESPONSIVE MEDIA QUERIES ── */

    /* Tablet: ≤ 900px */
    @media (max-width: 900px) {
      .navbar { padding: 0 20px; }
      .nav-links { display: none; }
      .nav-hamburger { display: flex; }

      .hero { padding: 100px 24px 60px; }
      .section { padding: 60px 24px; }

      .specs-highlight {
        grid-template-columns: 1fr;
        padding: 36px 24px;
      }

      .detail-hero {
        grid-template-columns: 1fr;
        padding: 32px 24px;
        gap: 32px;
      }
      .specs-section, .features-section, .mfr-section { padding: 40px 24px; }
      .back-btn { margin: 16px 24px; }

      .mfr-grid { grid-template-columns: 1fr; gap: 32px; }

      .footer-grid { grid-template-columns: 1fr 1fr; }
      .footer { padding: 40px 24px 24px; }
    }

    /* Mobile: ≤ 600px */
    @media (max-width: 600px) {
      .hero { padding: 90px 16px 48px; }
      .hero-stats { gap: 24px; flex-wrap: wrap; }
      .section { padding: 48px 16px; }

      .sh-specs-grid { grid-template-columns: 1fr; }

      .footer-grid { grid-template-columns: 1fr; }
      .footer { padding: 32px 16px 20px; }
      .footer-bottom { flex-direction: column; gap: 8px; text-align: center; }

      .specs-section, .features-section, .mfr-section { padding: 32px 16px; }
      .back-btn { margin: 12px 16px; }

      .detail-hero { padding: 24px 16px; gap: 24px; }
      .detail-actions { flex-direction: column; }
      .btn-primary, .btn-outline { width: 100%; text-align: center; }
    }
  `}</style>
);

// ─────────────────────────────────────────────────
// SECTION 3: SHARED COMPONENTS
// ─────────────────────────────────────────────────

/**
 * NavBar — fixed top navigation
 * Props:
 *  - onHome: function — called when logo is clicked (returns to landing)
 */
const NavBar = ({ onHome }) => (
  <nav className="navbar" role="navigation" aria-label="Main navigation">
    {/* Logo — clicking returns to landing */}
    <div className="nav-logo" onClick={onHome} role="button" tabIndex={0}
      onKeyDown={e => e.key === "Enter" && onHome()}>
      <div className="logo-mark" aria-hidden="true" />
      {/* A wie Auto — "A as in Automobile" (German pun) + Personenkraftwagen blend */}
      <span>
        <span className="red">A</span>WIE<span className="blue">wagen</span>
      </span>
    </div>

    {/* Desktop nav links */}
    <ul className="nav-links" role="list">
      {["Fleet", "Categories", "About", "Contact"].map(link => (
        <li key={link}><a href={`#${link.toLowerCase()}`}>{link}</a></li>
      ))}
    </ul>

    {/* Book a Test Drive CTA */}
    <button className="nav-cta" onClick={onHome}>Test Drive</button>

    {/* Mobile hamburger — in a full app, this would toggle a drawer */}
    <button className="nav-hamburger" aria-label="Open menu">
      <span /><span /><span />
    </button>
  </nav>
);

/**
 * DataTicker — scrolling marquee of brand/stats info
 * Creates an infinite horizontal scroll of factoids
 */
const DataTicker = () => {
  const items = [
    { label: "Models in Stock", val: "127+" },
    { label: "Test Drives This Month", val: "844" },
    { label: "Brands", val: "18" },
    { label: "Avg Delivery", val: "14 days" },
    { label: "Customer Rating", val: "4.97 ★" },
    { label: "Years of Excellence", val: "32" },
  ];
  // Duplicate for seamless infinite scroll
  const doubled = [...items, ...items];

  return (
    <div className="ticker-wrap" aria-hidden="true">
      <div className="ticker-inner">
        {doubled.map((item, i) => (
          <div key={i} className="ticker-item">
            <span className="ticker-dot" />
            {item.label}: <span>{item.val}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────
// SECTION 4: LANDING PAGE COMPONENTS
// ─────────────────────────────────────────────────

/**
 * HeroSection — cinematic full-viewport opener
 * Contains headline, subtext, CTAs, and stat bar
 */
const HeroSection = ({ onExplore }) => (
  <section className="hero" id="hero" aria-label="Hero">
    {/* Animated scanning line — purely decorative sci-fi effect */}
    <div className="hero-scan-line" aria-hidden="true" />

    <p className="hero-eyebrow">AWieWagen Autohaus · Est. 1993</p>

    <h1 className="hero-title">
      <span className="line-accent">Precision.</span>
      <br />
      <span>Power.</span>
      <br />
      <span className="line-ghost">Legend.</span>
    </h1>

    <p className="hero-sub">
      We don't sell cars. We place precision instruments into the hands
      of people who demand more from the road. From sub-3-second sedans
      to hand-built grand tourers — the fleet is waiting.
    </p>

    <div className="hero-actions">
      <button className="btn-primary" onClick={onExplore}>
        Explore the Fleet ›
      </button>
      <button className="btn-outline">
        Book a Test Drive
      </button>
    </div>

    {/* Quick-glance stats — social proof at a glance */}
    <div className="hero-stats" role="list" aria-label="Key statistics">
      {[
        { num: "127+", label: "Vehicles in Stock" },
        { num: "18",   label: "Premium Brands"    },
        { num: "32",   label: "Years of Service"  },
        { num: "4.97", label: "Customer Rating"   },
      ].map(stat => (
        <div key={stat.label} className="hero-stat-item" role="listitem">
          <div className="hero-stat-num">{stat.num}</div>
          <div className="hero-stat-label">{stat.label}</div>
        </div>
      ))}
    </div>
  </section>
);

/**
 * CarCard — individual vehicle card in the grid
 *
 * Props:
 *  - car: object from CARS array
 *  - onClick: function — triggers detail page navigation
 *  - index: number — used for staggered animation delay
 */
const CarCard = ({ car, onClick, index }) => {
  // The 3 most important quick specs to show on the card
  const quickSpecs = Object.entries(car.specs).slice(0, 3);

  return (
    <article
      className="car-card"
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${car.brand} ${car.name}`}
      onKeyDown={e => e.key === "Enter" && onClick()}
      // Stagger each card's animation by index × 80ms
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Car image with badge overlay */}
      <div className="card-img-wrap">
        <img
          src={car.images[0]}
          alt={`${car.brand} ${car.name}`}
          loading="lazy"
        />
        <div className="card-badge">{car.badge}</div>
      </div>

      {/* Card body — name, tagline, quick specs */}
      <div className="card-body">
        <p className="card-brand">{car.brand}</p>
        <h2 className="card-name">{car.name}</h2>
        <p className="card-tagline">"{car.tagline}"</p>

        {/* Quick spec pills — 0-100, top speed, power */}
        <div className="card-specs" aria-label="Quick specifications">
          {quickSpecs.map(([key, val]) => (
            <div key={key} className="card-spec">
              <span className="card-spec-val">{val}</span>
              <span className="card-spec-key">{key}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Card footer — price + CTA link */}
      <div className="card-footer">
        <span className="card-price">{car.price}</span>
        <span className="card-cta">
          View Details <span className="card-arrow">→</span>
        </span>
      </div>
    </article>
  );
};

/**
 * FleetSection — contains category filter + car grid
 *
 * Props:
 *  - onCarClick: function(carId) — navigates to detail page
 */
const FleetSection = ({ onCarClick }) => {
  // activeCategory controls which filter pill is selected
  const [activeCategory, setActiveCategory] = useState("All");

  // Filter the cars array based on the selected category
  const filteredCars = activeCategory === "All"
    ? CARS
    : CARS.filter(c => c.category === activeCategory);

  return (
    <section className="section" id="fleet" aria-label="Vehicle fleet">
      <div className="section-header">
        <p className="section-label">Our Fleet</p>
        <h2 className="section-title">Engineered for those who expect everything.</h2>
      </div>

      {/* Category filter strip */}
      <div
        className="category-strip"
        role="group"
        aria-label="Filter by category"
        id="categories"
      >
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`category-btn${activeCategory === cat ? " active" : ""}`}
            onClick={() => setActiveCategory(cat)}
            aria-pressed={activeCategory === cat}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 3-column responsive grid of car cards */}
      <div className="car-grid" role="list" aria-label="Available vehicles">
        {filteredCars.map((car, i) => (
          <div key={car.id} role="listitem">
            <CarCard
              car={car}
              index={i}
              onClick={() => onCarClick(car.id)}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

/**
 * SpecsHighlight — full-width feature panel for a hero/flagship car
 * Uses the first (or most expensive) car from the data set
 */
const SpecsHighlight = ({ onCarClick }) => {
  // Showcase the Lamborghini — the most extreme car in the fleet
  const car = CARS.find(c => c.id === "obsidian-ultra");
  const highlightSpecs = Object.entries(car.specs).slice(0, 4);

  return (
    <section
      className="section"
      style={{ paddingTop: 0 }}
      aria-label="Featured vehicle"
      id="about"
    >
      <div className="specs-highlight">
        {/* Left: marketing copy + CTA */}
        <div className="sh-content">
          <p className="section-label">Featured Vehicle</p>
          <h2>{car.brand} {car.name}</h2>
          <p>"{car.tagline}"</p>
          <p style={{ marginTop: 12 }}>{car.description}</p>
          <button
            className="btn-primary"
            onClick={() => onCarClick(car.id)}
            style={{ marginTop: 8 }}
          >
            Full Specifications →
          </button>
        </div>

        {/* Right: 4-stat specs grid */}
        <div>
          <div className="sh-specs-grid">
            {highlightSpecs.map(([key, val]) => (
              <div key={key} className="sh-spec-item">
                <div className="sh-spec-val">{val}</div>
                <div className="sh-spec-key">{key}</div>
              </div>
            ))}
          </div>

          {/* Price call-out */}
          <div style={{
            marginTop: 32,
            padding: "20px 24px",
            background: "rgba(232,0,29,0.06)",
            borderLeft: "3px solid var(--primary)",
          }}>
            <div style={{ fontFamily: "Rajdhani", fontSize: "0.75rem",
              letterSpacing: "0.2em", textTransform: "uppercase",
              color: "var(--text-muted)", marginBottom: 4 }}>
              Starting From
            </div>
            <div style={{ fontFamily: "Orbitron", fontSize: "1.8rem",
              fontWeight: 700, color: "var(--primary)" }}>
              {car.price}
            </div>
            <div style={{ fontFamily: "Rajdhani", fontSize: "0.75rem",
              color: "var(--text-muted)", marginTop: 4 }}>
              {car.badge} · {car.category}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/**
 * Footer — site-wide footer with links and branding
 */
const Footer = ({ onHome }) => (
  <footer className="footer" role="contentinfo" id="contact">
    <div className="footer-grid">
      {/* Brand column */}
      <div>
        <div className="footer-brand-name">
          <span style={{ color: "var(--primary)" }}>A</span>WIE
          <span style={{ color: "var(--accent)" }}>wagen</span>
        </div>
        <p className="footer-brand-desc">
          Germany's finest automotive collective. We source, curate, and
          deliver extraordinary vehicles to extraordinary people.
          Headquartered in Frankfurt, operating across Europe.
        </p>
      </div>

      {/* Fleet links */}
      <div>
        <p className="footer-col-title">Fleet</p>
        <ul className="footer-links">
          {CATEGORIES.filter(c => c !== "All").map(cat => (
            <li key={cat}><a href="#fleet">{cat}</a></li>
          ))}
        </ul>
      </div>

      {/* Services links */}
      <div>
        <p className="footer-col-title">Services</p>
        <ul className="footer-links">
          {["Test Drive", "Finance", "Insurance", "Delivery", "Trade-In", "Servicing"].map(s => (
            <li key={s}><a href="#">{s}</a></li>
          ))}
        </ul>
      </div>

      {/* Contact */}
      <div>
        <p className="footer-col-title">Contact</p>
        <ul className="footer-links">
          <li><a href="tel:+496912345678">+49 69 123 456 78</a></li>
          <li><a href="mailto:fleet@awiewagen.de">fleet@awiewagen.de</a></li>
          <li><a href="#">Kaiserstrasse 88, Frankfurt</a></li>
          <li><a href="#">Mon–Sat · 09:00–19:00</a></li>
        </ul>
      </div>
    </div>

    <div className="footer-bottom">
      <span className="footer-copy">
        © 2025 <span className="footer-accent">AWIEwagen GmbH</span> · All rights reserved.
      </span>
      <span className="footer-copy">
        Privacy · Terms · Imprint
      </span>
    </div>
  </footer>
);

// ─────────────────────────────────────────────────
// SECTION 5: LANDING PAGE
// Composes all landing sections
// ─────────────────────────────────────────────────

/**
 * LandingPage — the main homepage of the dealership
 *
 * Props:
 *  - onCarClick: function(carId) — navigates to car detail
 */
const LandingPage = ({ onCarClick }) => {
  // Scroll to the fleet section when "Explore the Fleet" is clicked
  const scrollToFleet = () => {
    document.getElementById("fleet")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main>
      <HeroSection onExplore={scrollToFleet} />
      <DataTicker />
      <FleetSection onCarClick={onCarClick} />
      <SpecsHighlight onCarClick={onCarClick} />
      <Footer />
    </main>
  );
};

// ─────────────────────────────────────────────────
// SECTION 6: CAR DETAIL PAGE COMPONENTS
// ─────────────────────────────────────────────────

/**
 * CarCarousel — image viewer with prev/next navigation + thumbnails
 *
 * Props:
 *  - images: string[] — array of image URLs
 *  - alt: string — accessible alt base text
 */
const CarCarousel = ({ images, alt }) => {
  // currentIndex tracks which image is displayed
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () =>
    setCurrentIndex(i => (i - 1 + images.length) % images.length);
  const next = () =>
    setCurrentIndex(i => (i + 1) % images.length);

  return (
    <div className="carousel" aria-label="Vehicle image gallery">
      {/* Main image display */}
      <div className="carousel-main">
        <img
          key={currentIndex} /* key change triggers CSS transition */
          src={images[currentIndex]}
          alt={`${alt} — view ${currentIndex + 1} of ${images.length}`}
        />

        {/* Previous button */}
        <button className="carousel-btn prev" onClick={prev} aria-label="Previous image">
          ‹
        </button>

        {/* Next button */}
        <button className="carousel-btn next" onClick={next} aria-label="Next image">
          ›
        </button>

        {/* Image counter overlay */}
        <div className="carousel-count" aria-live="polite">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnail strip — clicking a thumb jumps to that image */}
      <div className="carousel-thumbs" role="list" aria-label="Image thumbnails">
        {images.map((src, i) => (
          <div
            key={i}
            className={`carousel-thumb${i === currentIndex ? " active" : ""}`}
            onClick={() => setCurrentIndex(i)}
            role="button"
            tabIndex={0}
            aria-label={`View image ${i + 1}`}
            aria-current={i === currentIndex}
            onKeyDown={e => e.key === "Enter" && setCurrentIndex(i)}
          >
            <img src={src} alt={`${alt} thumbnail ${i + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * CarDetailPage — full detail page for a selected car
 *
 * Props:
 *  - carId: string — matches car.id in CARS array
 *  - onBack: function — returns to landing page
 */
const CarDetailPage = ({ carId, onBack }) => {
  // Find the car by its ID
  const car = CARS.find(c => c.id === carId);

  // Scroll to top on mount (simulates page navigation)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [carId]);

  // Guard: if car not found, show a friendly error
  if (!car) return (
    <div style={{ padding: "120px 60px", textAlign: "center" }}>
      <h2>Vehicle not found.</h2>
      <button className="btn-outline" onClick={onBack} style={{ marginTop: 20 }}>
        ← Return to Fleet
      </button>
    </div>
  );

  return (
    <div className="detail-page">
      {/* Back navigation */}
      <button className="back-btn" onClick={onBack} aria-label="Return to fleet">
        ← Back to Fleet
      </button>

      {/* Hero section: carousel (left) + info (right) */}
      <section className="detail-hero" aria-label={`${car.brand} ${car.name} details`}>
        {/* Left: image carousel */}
        <CarCarousel images={car.images} alt={`${car.brand} ${car.name}`} />

        {/* Right: car info */}
        <div className="detail-info">
          <p className="detail-brand">{car.brand} · {car.category}</p>
          <h1 className="detail-name">{car.name}</h1>
          <p className="detail-tagline">{car.tagline}</p>
          <p className="detail-desc">{car.description}</p>

          <div className="detail-price">
            {car.price}
            <br />
            <small>Starting price, excl. options · {car.badge}</small>
          </div>

          <div className="detail-actions">
            <button className="btn-primary">Request a Quote</button>
            <button className="btn-outline">Book Test Drive</button>
          </div>
        </div>
      </section>

      {/* Full specifications table */}
      <section className="specs-section" aria-label="Full specifications">
        <div className="section-header">
          <p className="section-label">Technical Data</p>
          <h2 className="section-title" style={{ fontSize: "1.8rem" }}>
            Full Specifications
          </h2>
        </div>
        <table className="specs-table" role="table" aria-label={`${car.name} specifications`}>
          <tbody>
            {Object.entries(car.specs).map(([key, val]) => (
              <tr key={key}>
                <th scope="row">{key}</th>
                <td>{val}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Feature highlights */}
      <section className="features-section" aria-label="Key features">
        <div className="section-header">
          <p className="section-label">Highlights</p>
          <h2 className="section-title" style={{ fontSize: "1.8rem" }}>
            What sets it apart
          </h2>
        </div>
        <div className="features-grid" role="list">
          {car.features.map((feat, i) => (
            <div key={i} className="feature-item" role="listitem">
              <div className="feature-icon" aria-hidden="true" />
              {feat}
            </div>
          ))}
        </div>
      </section>

      {/* Manufacturer background */}
      <section className="mfr-section" aria-label="Manufacturer information">
        <div className="section-header">
          <p className="section-label">The Maker</p>
          <h2 className="section-title" style={{ fontSize: "1.8rem" }}>
            {car.manufacturerInfo.brand}
          </h2>
        </div>

        <div className="mfr-grid">
          {/* Left: brand facts */}
          <div>
            <div className="mfr-facts">
              {[
                { key: "Founded", val: car.manufacturerInfo.founded },
                { key: "Origin",  val: car.manufacturerInfo.origin  },
                { key: "Category", val: car.category               },
              ].map(f => (
                <div key={f.key} className="mfr-fact">
                  <span className="mfr-fact-key">{f.key}</span>
                  <span className="mfr-fact-val">{f.val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: brand story + related models */}
          <div>
            <p className="mfr-about">{car.manufacturerInfo.about}</p>

            <p className="mfr-related-title">You may also like from {car.brand}</p>
            <div className="mfr-related-list" role="list">
              {car.manufacturerInfo.relatedModels.map(model => (
                <div key={model} className="mfr-related-item" role="listitem">
                  {model}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer onHome={onBack} />
    </div>
  );
};

// ─────────────────────────────────────────────────
// SECTION 7: ROOT APP COMPONENT
// Controls "routing" between landing and detail pages
// ─────────────────────────────────────────────────

/**
 * App — root component
 *
 * In a full React app you would use React Router:
 *   <Route path="/car/:id" element={<CarDetailPage />} />
 *
 * For this single-file demo, we simulate routing with
 * a `currentPage` state object that holds either:
 *   { type: "home" }
 *   { type: "detail", carId: "phantom-x9" }
 */
export default function App() {
  const [currentPage, setCurrentPage] = useState({ type: "home" });

  // Navigate to a car detail page
  const goToDetail = (carId) => {
    setCurrentPage({ type: "detail", carId });
  };

  // Return to the landing page
  const goHome = () => {
    setCurrentPage({ type: "home" });
  };

  return (
    <>
      {/* Inject global styles */}
      <GlobalStyles />

      {/* Navigation bar — always visible */}
      <NavBar onHome={goHome} />

      {/* Render the correct page based on state */}
      {currentPage.type === "home" ? (
        <LandingPage onCarClick={goToDetail} />
      ) : (
        <CarDetailPage carId={currentPage.carId} onBack={goHome} />
      )}
    </>
  );
}

/**
 * ─────────────────────────────────────────────────
 * REFINEMENT SUGGESTIONS FOR A HIGH-TIER DEALERSHIP
 * (implement these to elevate to production-grade)
 * ─────────────────────────────────────────────────
 *
 * 1. 3D CAR VIEWER
 *    Integrate Three.js (r3f / react-three-fiber) with a GLTF
 *    car model. Allow 360° rotation via mouse/touch drag.
 *    Libraries: @react-three/fiber, @react-three/drei
 *
 * 2. FINANCE CALCULATOR
 *    An interactive monthly payment calculator on the detail page.
 *    Inputs: deposit %, term (months), APR. Show live monthly cost.
 *
 * 3. REAL-TIME STOCK INDICATOR
 *    Show "3 remaining" or "Last unit" chips on cards.
 *    Pull from a simple API or CMS (Sanity, Contentful).
 *
 * 4. COMPARISON TOOL
 *    Let users add up to 3 cars to a side-by-side comparison table.
 *    Persist selections in localStorage.
 *
 * 5. WISHLISTING / SAVED VEHICLES
 *    Heart icon on each card. Persist to localStorage or user account.
 *    "Your Saved Cars" panel accessible from navbar.
 *
 * 6. ANIMATED PAGE TRANSITIONS
 *    Use Framer Motion AnimatePresence for smooth cross-fades or
 *    slide transitions between landing and detail pages.
 *
 * 7. VIDEO HERO
 *    Replace the static hero with a looping <video> of a car in motion.
 *    Muted autoplay with a poster frame fallback.
 *
 * 8. CMS / API INTEGRATION
 *    Move CARS data to a headless CMS (Contentful, Sanity) or a REST/
 *    GraphQL API so inventory updates without a code deploy.
 *
 * 9. SEARCH & ADVANCED FILTERS
 *    Price range slider, 0–100 filter, fuel type toggle, brand multi-select.
 *    Use URL params (?brand=BMW&category=Sports) for shareable filtered views.
 *
 * 10. BOOKING FLOW
 *     Multi-step test drive booking modal: choose date/time →
 *     enter contact info → confirmation email. Integrate with
 *     Calendly API or a custom backend.
 *
 * 11. LIVE CHAT / AI CONCIERGE
 *     Embed a chat widget (or build one using Claude's API) that can
 *     answer "Which car has the longest range?" style queries.
 *
 * 12. PERFORMANCE & SEO
 *     - Image optimisation via Next.js <Image> or Cloudinary
 *     - JSON-LD structured data (Product schema) per car page
 *     - OpenGraph tags for social sharing previews
 *     - lazy-load carousel images below the fold
 */
