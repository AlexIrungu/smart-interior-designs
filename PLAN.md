# Smart Interior Design — Website Plan

Client: Samson (TikTok `@sammympole516`)
Source material: `~/Downloads/Smart Interior Design/` (50 JPEG + 5 MOV, received 2026-08-19)
Status: Scaffolded (Next 16.3.5) 2026-09-18 — building on current photos.

---

## 1. What the material tells us

### The business
Samson isn't a decorator. The business makes **custom fitted joinery**: designing, building and installing cabinetry on site. Every photo shows one of these:

| Service | Evidence (photo #) |
|---|---|
| Kitchens (L-shape, island, full-wall) | 02, 08, 11, 13–16, 18, 28–31, 33, 35, 37, 38, 47, 50 |
| Built-in wardrobes & walk-in closets | 03, 04, 05, 10, 12, 23, 24, 26, 27, 43, 48, V1, V2, V3 |
| TV walls & feature/display units (slats, LED) | 20, 22, 42 |
| Vanities, dressing tables, mirror units | 06, 19, 25, 34 |
| Office storage (glass-front, lockable) | 32, 39, V5 |
| Display cabinets (walnut finish) | 01, 09 |
| Slatted timber ceilings (commercial) | seen in the background of 17, 40 |

**Positioning:** "Custom kitchens, wardrobes & TV walls — designed, built and installed in Nairobi." That's what people actually search for ("kitchen cabinets Nairobi", "wardrobes Nairobi", "TV wall unit Kenya"). The generic phrase "interior design" won't bring the right leads.

### The brand — decided: **Smart Interior Design** (2026-09-18). No domain yet.
The name appears three different ways in the material:
- `©SmartInteriorDesign`: camera watermark on 02, 04, 08, 16, 26, 28, 29, 31, 43, 48, 50
- `Smart Interior Designs Kenya`: italic serif watermark on 25
- `Smart interior designs 🇰🇪`: handwritten-style text on 22

There is no logo, colour palette or tagline, and no text of any kind: no services list, prices, contacts, location or testimonials.

### Asset quality: the main risk
- **All images are WhatsApp re-compressions.** EXIF timestamps all fall within the same 90 seconds, and files are 80–330KB at around 1200×1600. They're fine for a grid but too small and soft for a full-bleed hero.
- **Most are progress shots, not finished work:** bare plaster, stained screed floors, tools, paint tins and workers in frame (e.g. 11, 13, 14, 18, 37, 42, 48). Only a handful look like finished work.
- **Burned-in watermarks:** "OPPO A9 2020 · ©SmartInteriorDesign" and a TikTok Lite overlay (14). These can't be cleanly removed.
- **Duplicates:** 01≈09, 06≈19, 07≈46, 17≈40, 30≈45, 32≈39, 35≈38. Also 13/14/18/33/37 all show the same kitchen.
- **⚠️ Video V4 isn't Samson's content.** It carries a **"JM Furniture Mart"** logo and the handle `@jmfurnituremart`. Leave it off the site unless Samson confirms building it and having the right to use it.

**Strongest usable shots (finished look):** 03, 15, 20, 22, 23, 25, 30, 32, 43, 47, 29, 31, 34, 04.
**People shots:** 17, 40, 41 are selfies of Samson; 21 and 49 look like handover/appreciation moments with clients; 07/36/46 show a hi-vis site visit at a high-rise. These are good for the About page and for trust, but we need consent from the other people in the photos.

### Probable project groupings (for Samson to confirm)
Showing complete projects converts better than a loose photo dump. These are my best guesses from finishes and rooms:
- **A.** Grey L-kitchen with LED cove ceiling: 13, 14, 18, 33, 37 (also 11?)
- **B.** Apartment with round ceiling recess, white wardrobes + long kitchen: 05, 26, 48 / 08, 16, 50
- **C.** Oak-finish kitchen with island, tall oven unit: 30, 35, 38, 45, 47
- **D.** Dark-grey kitchens: 02, 29, 31 (possibly separate jobs)
- **E.** Marble-tile vanity/dressing: 06, 19
- **F.** Office storage: 32, 39, V5
- **G.** TV/feature walls: 20, 22, 42
- **H.** Wardrobes (multiple sites): 03, 10, 12, 23, 24, 27, 43, V1–V3

---

## 2. Proposed site

### Goal / definition of done
A fast, mobile-first site that turns a homeowner or developer in Nairobi into a **WhatsApp chat or quote request**. Done means:
1. Live on the business domain
2. Every CTA opens WhatsApp with a pre-filled message
3. The quote form delivers to Samson's inbox
4. Projects are shown as grouped case studies
5. It's indexed with a Google Business Profile linked

### Sitemap
1. **Home:** hero (best finished shot or short video loop) · services strip · 3 featured projects · how we work · Samson intro · CTA
2. **Services:** Kitchens / Wardrobes & closets / TV & feature walls / Vanities & dressing / Office & commercial. Each gets its own anchor or page for SEO.
3. **Projects:** grid of grouped projects → project page (photos + short blurb: location, scope, finish)
4. **Process:** Site visit & measure → Design & quote → Workshop fabrication → Install & handover. This is the real workflow, and the photos show every stage.
5. **About:** Samson, the team and handover photos
6. **Contact / Get a quote:** WhatsApp button + form (name, phone, location, room type, rough size, budget band, optional photo upload)

A sticky WhatsApp button runs sitewide. In this market, WhatsApp is the primary channel and the form is the fallback.

### Stack (recommendation — matches Martin Munga, our closest similar build)
- Next.js 16 · React 19 · TypeScript · Tailwind v4 · App Router
- `next/image` for AVIF/WebP and responsive sizes, which these compressed JPEGs need
- Resend for the quote form
- Project content lives in a typed `lib/projects.ts`; no CMS for v1
- Hosting: **open decision.** Vercel is the simplest option. Hostinger (Node/Passenger) is possible if Samson wants it with our other sites.

---

## 3. What we need from Samson (blocking)
1. **Original photos/videos** straight from Samson's phone, gallery or TikTok, not WhatsApp forwards. Ask for them as *documents*, or via Google Drive.
2. **Photos of finished, cleaned-up rooms.** For the next 2–3 jobs, one visit after handover with the floor clear. This is the single biggest quality lever.
3. ~~Brand name~~ → **Smart Interior Design** (decided). No domain yet — buy before launch. Still need: is there a logo?
4. **Contacts:** ~~WhatsApp number, phone~~ (0718 258 961, received 2026-09-18), email, workshop location, areas served, working hours
5. **Social links:** TikTok (confirm `@sammympole516`), Instagram, Facebook
6. **Per project:** location (estate/area), what was done, materials/finish, year. Confirm the groupings above.
7. **V4 (JM Furniture Mart):** did Samson build this? If not, it's out.
8. **Consent** to show the clients in 21 and 49
9. **Pricing stance:** "from KSh X per ft" or "quote only"?
10. **Materials** used (MDF, melamine, marine board, laminate, granite/quartz tops?). This is good copy and good for SEO.
11. **Testimonials:** 2–3 short client quotes, or Google reviews
12. **Anything Samson wants that isn't shown:** gypsum ceilings, doors, full-house fit-outs?

---

## 4. Phases
- **Phase 0 — Content (now):** send the question list above → collect originals → confirm name/domain/hosting.
- **Phase 1 — Design direction:** a light, material-led look (warm neutrals, oak/walnut textures, one accent). It must stay credible even with phone photography.
- **Phase 2 — Build:** scaffold → pages → WhatsApp/quote flow → projects from `lib/projects.ts`.
- **Phase 3 — Launch & local SEO:** metadata, `LocalBusiness` schema, sitemap, Google Business Profile, TikTok bio link.

We can start Phase 1–2 on the current photos. We'd swap in originals as they arrive, but I wouldn't launch on the WhatsApp copies alone.

---

## Appendix — photo index
Numbering used above (sorted filename order), from `~/Downloads/Smart Interior Design/`:

```
01 029466ad  02 02a805bb  03 07bbb6d9  04 092bd959  05 0b9ee903
06 0bf45d14  07 0f40da48  08 0fa3a84a  09 1960f2db  10 2725ef20
11 2b5c5c21  12 31eebde3  13 347cf227  14 37ca0f94  15 3935b03f
16 40fcb95a  17 4caa80c0  18 50102dcf  19 5f42b0b3  20 61565836
21 64469674  22 6ad76d03  23 6c51f626  24 6d556915  25 720613e9
26 7a32b386  27 85736dcd  28 868acc93  29 89ba9acf  30 8bee023a
31 94807611  32 9d1ccc24  33 a7b00d76  34 afd6cc54  35 b02268c9
36 b07ee3f7  37 b7d6c8e0  38 b9dce27c  39 c9cb6bac  40 ce273b25
41 d159c406  42 d3db7594  43 d939da69  44 dc4948e4  45 e5d2468f
46 ed31d16f  47 f1ed2d76  48 f20db272  49 f73d3a21  50 f7ffa13b

V1 07eaf537 (0.9s, wardrobe)       V2 551c6d40 (33s, wardrobe walkthrough)
V3 5817bf44 (41s, Samson installing) V4 6260d31a (25s, TV wall — JM Furniture Mart ⚠️)
V5 67f7b347 (10s, office cabinet)
```
