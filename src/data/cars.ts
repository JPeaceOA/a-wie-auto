export interface CarSpecs {
  "0–100 km/h"?: string;
  "0–100"?: string;
  "Top Speed": string;
  Power: string;
  Torque?: string;
  Drive?: string;
  Weight?: string;
  Range?: string;
  Engine?: string;
  Gearbox?: string;
  Charging?: string;
  [key: string]: string | undefined;
}

export interface ManufacturerInfo {
  brand: string;
  founded: number;
  origin: string;
  about: string;
  relatedModels: string[];
}

export interface Car {
  id: string;
  name: string;
  brand: string;
  category: "Sedan" | "Sports" | "SUV" | "Electric" | "Supercar" | "Luxury";
  tagline: string;
  description: string;
  price: string;
  numericPrice: number;
  badge: string;
  images: string[];
  specs: CarSpecs;
  features: string[];
  manufacturerInfo: ManufacturerInfo;
}

export const CATEGORIES = ["All", "Sedan", "Sports", "SUV", "Electric", "Supercar", "Luxury"] as const;
export type Category = (typeof CATEGORIES)[number];

export const CARS: Car[] = [
  {
    id: "phantom-x9",
    name: "Phantom X9",
    brand: "Audi",
    category: "Sedan",
    tagline: "Silence is the new roar.",
    description:
      "The Phantom X9 redefines what a performance sedan can be. Four electric motors. Quattro all-wheel drive. A cockpit that reads your biometrics before you even touch the wheel.",
    price: "€142,000",
    numericPrice: 142000,
    badge: "New Arrival",
    images: [
      "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=1200&q=80",
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1200&q=80",
      "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=1200&q=80",
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
    numericPrice: 198500,
    badge: "Track Edition",
    images: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&q=80",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&q=80",
      "https://images.unsplash.com/photo-1542362567-b07e54358753?w=1200&q=80",
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
    numericPrice: 176000,
    badge: "Best Seller",
    images: [
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1200&q=80",
      "https://images.unsplash.com/photo-1617654112329-a8a88f0ca6d2?w=1200&q=80",
      "https://images.unsplash.com/photo-1614200179396-2bdb77ebf81b?w=1200&q=80",
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
    numericPrice: 164000,
    badge: "Electric",
    images: [
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=1200&q=80",
      "https://images.unsplash.com/photo-1611270629569-8b357cb88da9?w=1200&q=80",
      "https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=1200&q=80",
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
      "Naturally aspirated. Rear-wheel drive. Manual gearbox optional. The Obsidian Ultra is a deliberate provocation — a car that refuses to be domesticated in an era of driver aids and electric motors. One of 200 built.",
    price: "€398,000",
    numericPrice: 398000,
    badge: "Limited — 200 Units",
    images: [
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&q=80",
      "https://images.unsplash.com/photo-1621135802920-133df287f89c?w=1200&q=80",
      "https://images.unsplash.com/photo-1612208695882-02f2322b7fee?w=1200&q=80",
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
    numericPrice: 580000,
    badge: "Bespoke",
    images: [
      "https://images.unsplash.com/photo-1636633762833-5d1658f1e29b?w=1200&q=80",
      "https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=1200&q=80",
      "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=1200&q=80",
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
