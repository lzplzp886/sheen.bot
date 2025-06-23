// src/app/(normal)/solutions/lab-sourcing/data.ts

/* ------------------------------------------------------------------ */
/*                             Robotics Kits                          */
/* ------------------------------------------------------------------ */
export const kits = [
  {
    id: "u10",
    title: "WhalesBot U10",
    img: "/images/solutions/kits/u10.webp",
    stage: "ECD 6+",
    price: "R 3 899",
    features: [
      "82 colourful large pcs",
      "IR sensor · buzzer · LED · motor",
      "Magnetic coding blocks",
      "16 courses included"
    ],
    href: "https://www.sheen.co.za/whalesbot-u10-stem-starter-kit-kids-6-plus" // :contentReference[oaicite:17]{index=17}
  },
  {
    id: "u20",
    title: "WhalesBot U20",
    img: "/images/solutions/kits/u20.webp",
    stage: "ECD 6+",
    price: "R 4 910",
    features: [
      "80 rounded-edge pcs",
      "Integrated controller · motors · LED · speaker",
      "Coding pen & cards (tap-to-code)",
      "16 courses included"
    ],
    href: "https://www.sheen.co.za/whalesbot-u20-stem-starter-kit-kids-6-plus" // :contentReference[oaicite:18]{index=18}
  },
  {
    id: "s30",
    title: "WhalesBot S30",
    img: "/images/solutions/kits/s30.webp",
    stage: "Intermediate 8+",
    price: "R 3 208",
    features: [
      "135 pcs, two-side joints",
      "5-in-1 grayscale sensor",
      "Screen-free pad coding (100+ cmds)",
      "32 courses included"
    ],
    href: "https://www.sheen.co.za/whalesbot-s30-basic-coding-kit-kids-8-plus" // :contentReference[oaicite:19]{index=19}
  },
  {
    id: "s40",
    title: "WhalesBot S40",
    img: "/images/solutions/kits/s40.webp",
    stage: "Intermediate 8+",
    price: "R 4 221",
    features: [
      "390 pcs & gear mechanisms",
      "5-in-1 grayscale sensor",
      "Scratch · C · Python software",
      "16 courses included"
    ],
    href: "https://www.sheen.co.za/whalesbot-s40-intermediate-coding-kit-kids-8-plus" // :contentReference[oaicite:20]{index=20}
  },
  {
    id: "ai1s",
    title: "WhalesBot AI Module 1S",
    img: "/images/solutions/kits/ai1s.webp",
    stage: "Senior 10+",
    price: "R 6 739",
    features: [
      "602 pcs advanced kit",
      "Touch · 5-in-1 grayscale · IR sensors",
      "Dot-matrix display & AI interaction",
      "Scratch · C · Python support",
      "48 courses included"
    ],
    href: "https://www.sheen.co.za/whalesbot-ai-module-1s-advanced-coding-robot-kit-kids-10-plus" // 
  }
];

/* ------------------------------------------------------------------ */
/*                           Lab Infrastructure                       */
/* ------------------------------------------------------------------ */
export const infra = [
  {
    id: "screen",
    title: "Smart Interactive Hub (4K)",
    img: "/images/solutions/infra/screen.webp",
    price: "R 21 399",
    specs: [
      "4K touch screen + stylus",
      "Android 13 & Windows 10 OPS",
      "Built-in 48 MP camera & 8-array mic",
      "HDMI · VGA · Type-C · S/PDIF"
    ],
    href: "https://www.sheen.co.za/4k-touch-screen-interactive-panel-android-win10-ops" // :contentReference[oaicite:21]{index=21}
  },
  {
    id: "hex",
    title: "Open-Hexagon Desk Set (6) + Chairs",
    img: "/images/solutions/infra/hex.webp",
    price: "R 11 389",
    specs: [
      "6 desks • 6 chairs",
      "122 × 60 cm desks (H 52 cm)",
      "Setup ⌀ ≤ 218 cm"
    ],
    href: "https://www.sheen.co.za/open-hexagon-style-classroom-desk-chair-set" // :contentReference[oaicite:22]{index=22}
  },
  {
    id: "diamond",
    title: "Diamond Desk Set (6) + Chairs",
    img: "/images/solutions/infra/diamond.webp",
    price: "R 9 288",
    specs: [
      "6 desks • 6 chairs",
      "60 cm per side",
      "Setup ⌀ ≤ 167 cm"
    ],
    href: "https://www.sheen.co.za/diamond-style-classroom-desk-chair-set" // :contentReference[oaicite:23]{index=23}
  },
  {
    id: "honey",
    title: "Honeycomb Desk Set (6) + 9 Chairs",
    img: "/images/solutions/infra/honey.webp",
    price: "R 8 328",
    specs: [
      "6 desks • 9 chairs",
      "100 × 50 cm desks (H 43 cm)",
      "Setup ⌀ ≤ 210 cm"
    ],
    href: "https://www.sheen.co.za/honeycomb-style-classroom-desk-chair-set" // :contentReference[oaicite:24]{index=24}
  },
  {
    id: "butterfly",
    title: "Butterfly Faculty Desk Set",
    img: "/images/solutions/infra/butterfly.webp",
    price: "R 12 628",
    specs: [
      "4 joint-desks + storage",
      "120 × 60 × 75 cm",
      "Faculty / demo station"
    ],
    href: "https://www.sheen.co.za/butterfly-style-4-person-office-workstation-set" // :contentReference[oaicite:25]{index=25}
  }
];

/* ------------------------------------------------------------------ */
/*                          Teacher Training                          */
/* ------------------------------------------------------------------ */
export const training = {
  img: "/images/solutions/training/training.webp",
  priceTotal: "R 12 500", // :contentReference[oaicite:26]{index=26}
  breakdown: [
    { item: "Training Materials", cost: "R 1 500" },    // :contentReference[oaicite:27]{index=27}
    { item: "Venue Setup & Logistics", cost: "R 2 400" }, // :contentReference[oaicite:28]{index=28}
    { item: "Refreshments (≤10 ppl)", cost: "R 2 100" },  // :contentReference[oaicite:29]{index=29}
    { item: "Contingency / Emergency", cost: "R 500" }    // :contentReference[oaicite:30]{index=30}
  ],
  desc:
    "3-Day intensive workshop covering pedagogy, hands-on practice with WhalesBot kits, troubleshooting, and lesson delivery. Includes printed lesson plans, venue setup, and refreshments." // :contentReference[oaicite:31]{index=31}
};
