import nectaSpeciality from "../assets/necta-speciality.jpg";
import nectaHouse from "../assets/necta-house.jpg";
import nectaSpecial from "../assets/necta-special.jpg";
import nectaValley from "../assets/necta-valley.jpg";
import nectaPeak from "../assets/necta-peak.jpg";

/* ------------------------------------------------------------------ *
 * The single source of truth for the coffee catalogue. Prices live here
 * as numbers so totals stay easy to compute — render them with
 * `npr()` rather than hard-coding "Rs" anywhere.
 * ------------------------------------------------------------------ */

export type Segment = "premium" | "commercial";

export interface Pack {
  size: string; // label shown to the customer
  kg: number; // used to total the order weight
  price: number;
}

export interface Product {
  id: string;
  name: string;
  segment: Segment;
  roast: string;
  tag: string;
  blurb: string;
  img: string;
  packs: Pack[];
}

/* the standard three pack sizes, priced off the 1 kg rate */
const packs = (kg1: number, g500: number, g250: number): Pack[] => [
  { size: "1 kg", kg: 1, price: kg1 },
  { size: "500 g", kg: 0.5, price: g500 },
  { size: "250 g", kg: 0.25, price: g250 },
];

export const PRODUCTS: Product[] = [
  {
    id: "speciality",
    name: "Speciality Coffee",
    segment: "premium",
    roast: "City · City Plus · Full City · Full City Plus",
    tag: "Speciality",
    blurb: "Our finest graded lots, cupped for clarity and character — roasted to the profile you choose.",
    img: nectaSpeciality,
    packs: packs(3500, 1850, 1000),
  },
  {
    id: "house-blend",
    name: "House Blend",
    segment: "premium",
    roast: "City · City Plus · Full City · Full City Plus",
    tag: "Signature",
    blurb: "A balanced signature blend built for everyday brewing, roasted to your preferred profile.",
    img: nectaHouse,
    packs: packs(3200, 1700, 900),
  },
  {
    id: "necta-special",
    name: "Necta Special",
    segment: "commercial",
    roast: "Medium · Medium Dark",
    tag: "Flagship",
    blurb: "Our flagship commercial roast — rich, rounded and dialled in for cafes and busy kitchens.",
    img: nectaSpecial,
    packs: packs(3000, 1600, 850),
  },
  {
    id: "valley-classic",
    name: "Valley Classic",
    segment: "commercial",
    roast: "Medium · Medium Dark",
    tag: "Classic",
    blurb: "A dependable medium roast with a smooth, classic cup that keeps regulars coming back.",
    img: nectaValley,
    packs: packs(2800, 1500, 800),
  },
  {
    id: "peak-strong",
    name: "Peak Strong",
    segment: "commercial",
    roast: "Medium · Medium Dark",
    tag: "Strong",
    blurb: "Bold and full-bodied with a strong finish — made for milk drinks and big flavour.",
    img: nectaPeak,
    packs: packs(2600, 1350, 700),
  },
];

export const COMMERCIAL = PRODUCTS.filter((p) => p.segment === "commercial");

/* ------------------------------------------------------------------ *
 * Single Origin Beans — the three growing districts we buy from.
 *
 * Deliberately no pricing, pack sizes or roast profiles: these are shown
 * as origins, not SKUs, and enquiries go through the contact page.
 *
 * PLACEHOLDER COPY — `blurb` and `notes` are written to shape only. Swap
 * them for the client's real cupping notes when they land; altitude and
 * harvest figures are intentionally left out rather than guessed at.
 * ------------------------------------------------------------------ */

export interface Origin {
  id: string;
  name: string;
  region: string;
  blurb: string;
  notes: string[];
  img: string;
}

export const ORIGINS: Origin[] = [
  {
    id: "nuwakot",
    name: "Nuwakot",
    region: "Bagmati Province",
    blurb:
      "Grown on the hill slopes north-west of the valley, where cool nights slow the cherry and build sweetness in the cup.",
    notes: ["Hill-grown", "Washed", "Smooth & sweet"],
    img: nectaSpeciality,
  },
  {
    id: "sindhupalchowk",
    name: "Sindhupalchowk",
    region: "Bagmati Province",
    blurb:
      "Smallholder plots along the high river valleys, hand-picked in small lots and processed close to where they grow.",
    notes: ["Smallholder lots", "Hand-picked", "Bright & clean"],
    img: nectaHouse,
  },
  {
    id: "kavre",
    name: "Kavre",
    region: "Bagmati Province",
    blurb:
      "Terraced farms east of Kathmandu with a long-standing coffee tradition — dependable lots with a rounded, balanced profile.",
    notes: ["Terraced farms", "Traceable", "Balanced body"],
    img: nectaValley,
  },
];

export const npr = (n: number) => `Rs ${n.toLocaleString("en-IN")}`;
