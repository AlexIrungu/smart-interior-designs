import type { StaticImageData } from "next/image";

// Photos are WhatsApp re-compressions from 2026-08-19 — swap for originals before launch by
// replacing the files in assets/ (keep the names) or the imports below. Filename prefix = photo
// number in PLAN.md's index. Project groupings are Alex's reading of the photos, not yet confirmed
// by Samson — locations, years and materials are deliberately omitted until Samson supplies them.

import k02 from "@/assets/work/02-kitchen.jpg";
import k08 from "@/assets/work/08-kitchen.jpg";
import k11 from "@/assets/work/11-kitchen.jpg";
import k13 from "@/assets/work/13-kitchen.jpg";
import k15 from "@/assets/work/15-kitchen.jpg";
import k16 from "@/assets/work/16-kitchen.jpg";
import k18 from "@/assets/work/18-kitchen.jpg";
import k28 from "@/assets/work/28-kitchen.jpg";
import k29 from "@/assets/work/29-kitchen.jpg";
import k30 from "@/assets/work/30-kitchen.jpg";
import k31 from "@/assets/work/31-kitchen.jpg";
import k33 from "@/assets/work/33-kitchen.jpg";
import k35 from "@/assets/work/35-kitchen.jpg";
import k37 from "@/assets/work/37-kitchen.jpg";
import k38 from "@/assets/work/38-kitchen.jpg";
import k47 from "@/assets/work/47-kitchen.jpg";
import k50 from "@/assets/work/50-kitchen.jpg";
import w03 from "@/assets/work/03-wardrobe.jpg";
import w04 from "@/assets/work/04-wardrobe.jpg";
import w05 from "@/assets/work/05-wardrobe.jpg";
import w10 from "@/assets/work/10-wardrobe.jpg";
import w12 from "@/assets/work/12-wardrobe.jpg";
import w23 from "@/assets/work/23-wardrobe.jpg";
import w24 from "@/assets/work/24-wardrobe.jpg";
import w26 from "@/assets/work/26-wardrobe.jpg";
import w27 from "@/assets/work/27-wardrobe.jpg";
import w43 from "@/assets/work/43-wardrobe.jpg";
import w48 from "@/assets/work/48-wardrobe.jpg";
import t20 from "@/assets/work/20-tv-wall.jpg";
import t22 from "@/assets/work/22-tv-wall.jpg";
import t42 from "@/assets/work/42-tv-wall.jpg";
import v06 from "@/assets/work/06-vanity.jpg";
import v25 from "@/assets/work/25-vanity.jpg";
import v34 from "@/assets/work/34-vanity.jpg";
import o32 from "@/assets/work/32-office.jpg";

export type ServiceSlug = "kitchens" | "wardrobes" | "tv-walls" | "vanities" | "office";

export type Service = {
  slug: ServiceSlug;
  title: string;
  summary: string;
  // Only what's visible in Samson's photos — TODO(samson): add materials and anything else Samson offers
  features: string[];
};

export const services: Service[] = [
  {
    slug: "kitchens",
    title: "Kitchens",
    summary: "L-shaped, straight-run and island kitchens with tall oven units, open shelving and worktops, built to fit the room.",
    features: ["L-shaped, straight-run and island layouts","Tall oven, microwave and fridge housings","Glass-fronted and open wall cabinets","Drawer stacks","Granite worktops"],
  },
  {
    slug: "wardrobes",
    title: "Wardrobes & closets",
    summary: "Floor-to-ceiling built-in wardrobes, sliding-door units and walk-in closets with drawers, hanging space and shelving.",
    features: ["Floor-to-ceiling hinged and sliding-door wardrobes","Corner and L-shaped units","Walk-in closets with open shelf towers","Hanging rails, drawers and dressing niches"],
  },
  {
    slug: "tv-walls",
    title: "TV & feature walls",
    summary: "Media walls with slatted panels, LED-lit display shelving and floating consoles.",
    features: ["Slatted timber-look panelling","LED-lit display shelves","Floating TV consoles","Marble-effect feature panels"],
  },
  {
    slug: "vanities",
    title: "Vanities & dressing tables",
    summary: "Dressing tables with lit mirrors and bathroom vanity units with storage.",
    features: ["Dressing tables with LED-backlit mirrors","Bathroom vanity units with mirror cabinets","Built-in drawers and open shelving"],
  },
  {
    slug: "office",
    title: "Office storage",
    summary: "Lockable cabinets with glass-fronted shelving for offices and filing.",
    features: ["Glass-fronted display shelving","Lockable lower cupboards","Freestanding units on castors"],
  },
];

export type ProjectSlug = "grey-l-kitchen" | "apartment-fit-out" | "oak-island-kitchen";

export type Photo = {
  src: StaticImageData;
  alt: string;
  service: ServiceSlug;
  project?: ProjectSlug;
  // false = mid-install (bare walls, tools, dirty floors) — fine for process/galleries, never for heroes
  finished: boolean;
};

export const photos: Photo[] = [
  { src: k33, alt: "Grey L-shaped kitchen with tall pantry units and LED cove ceiling", service: "kitchens", project: "grey-l-kitchen", finished: false },
  { src: k18, alt: "Grey L-shaped kitchen with open end shelving under the window", service: "kitchens", project: "grey-l-kitchen", finished: false },
  { src: k13, alt: "Grey kitchen with tall appliance housing and drawer stacks", service: "kitchens", project: "grey-l-kitchen", finished: false },
  { src: k37, alt: "Grey kitchen wall of tall units with a microwave niche", service: "kitchens", project: "grey-l-kitchen", finished: false },
  { src: k11, alt: "Grey kitchen base units and wall cabinets around a window", service: "kitchens", project: "grey-l-kitchen", finished: false },

  { src: w05, alt: "White built-in wardrobe wall with a central dressing desk", service: "wardrobes", project: "apartment-fit-out", finished: false },
  { src: w26, alt: "White wardrobe with pull-out drawers and hanging sections", service: "wardrobes", project: "apartment-fit-out", finished: false },
  { src: w48, alt: "White wardrobes framing a dressing niche", service: "wardrobes", project: "apartment-fit-out", finished: false },
  { src: k50, alt: "Long white kitchen run with glass-fronted wall cabinets", service: "kitchens", project: "apartment-fit-out", finished: false },
  { src: k08, alt: "White kitchen with tall units and a drawer run under the window", service: "kitchens", project: "apartment-fit-out", finished: false },
  { src: k16, alt: "White kitchen wall cabinets with glass doors", service: "kitchens", project: "apartment-fit-out", finished: false },

  { src: k47, alt: "Oak-finish kitchen with black granite worktops and an island", service: "kitchens", project: "oak-island-kitchen", finished: true },
  { src: k30, alt: "Tall oak-finish oven and microwave housing beside the fridge", service: "kitchens", project: "oak-island-kitchen", finished: true },
  { src: k35, alt: "Oak kitchen island with granite top", service: "kitchens", project: "oak-island-kitchen", finished: false },
  { src: k38, alt: "Oak island and perimeter units with granite worktops", service: "kitchens", project: "oak-island-kitchen", finished: false },

  { src: k29, alt: "Charcoal kitchen base units with a white worktop and undermount sink", service: "kitchens", finished: true },
  { src: k31, alt: "Charcoal L-shaped kitchen with matching wall cabinets", service: "kitchens", finished: false },
  { src: k02, alt: "Charcoal wall cabinets over white base units", service: "kitchens", finished: false },
  { src: k15, alt: "Long white kitchen run with a dark worktop on a timber-look floor", service: "kitchens", finished: false },
  { src: k28, alt: "White and oak kitchen with open shelving and slatted base doors", service: "kitchens", finished: false },

  { src: w43, alt: "Walk-in closet with white wardrobes and a central open shelf tower", service: "wardrobes", finished: true },
  { src: w23, alt: "White corner wardrobe with drawers and black bar handles", service: "wardrobes", finished: true },
  { src: w03, alt: "Floor-to-ceiling white wardrobe with drawer stack", service: "wardrobes", finished: true },
  { src: w04, alt: "Walnut sliding-door wardrobe with overhead cabinets", service: "wardrobes", finished: true },
  { src: w27, alt: "Light oak three-door wardrobe", service: "wardrobes", finished: false },
  { src: w10, alt: "Open oak-finish wardrobe showing hanging rail, shelves and drawers", service: "wardrobes", finished: false },
  { src: w12, alt: "Installing a sliding-door wardrobe on site", service: "wardrobes", finished: false },
  { src: w24, alt: "Wardrobe carcasses being assembled on site", service: "wardrobes", finished: false },

  { src: t20, alt: "Oak slatted feature unit with LED-lit display shelves", service: "tv-walls", finished: true },
  { src: t22, alt: "Marble-effect TV wall with lit side shelving and a floating console", service: "tv-walls", finished: false },
  { src: t42, alt: "TV wall with slatted panels and a lit display column during installation", service: "tv-walls", finished: false },

  { src: v25, alt: "White dressing table with an LED-backlit mirror", service: "vanities", finished: true },
  { src: v06, alt: "White vanity unit with a wall mirror in a marble-tiled room", service: "vanities", finished: true },
  { src: v34, alt: "Light oak bathroom vanity with mirror cabinet and open shelving", service: "vanities", finished: true },

  { src: o32, alt: "White office cabinet with glass-fronted shelves and lockable lower doors", service: "office", finished: true },
];

export type Project = {
  slug: ProjectSlug;
  title: string;
  summary: string;
};

// TODO(samson): location, year, scope and materials for each; confirm the photo groupings
export const projects: Project[] = [
  {
    slug: "oak-island-kitchen",
    title: "Oak kitchen with island",
    summary: "An oak-finish kitchen with black granite worktops, a working island and a tall housing for the oven and microwave.",
  },
  {
    slug: "grey-l-kitchen",
    title: "Grey L-shaped kitchen",
    summary: "A grey L-shaped kitchen with full-height pantry and appliance towers, drawer stacks and open end shelving.",
  },
  {
    slug: "apartment-fit-out",
    title: "Apartment fit-out",
    summary: "Built-in wardrobes with a dressing desk and a full-length kitchen, all in white, fitted throughout one apartment.",
  },
];

export const photosFor = {
  project: (slug: ProjectSlug) => photos.filter((p) => p.project === slug),
  service: (slug: ServiceSlug) => photos.filter((p) => p.service === slug),
};
