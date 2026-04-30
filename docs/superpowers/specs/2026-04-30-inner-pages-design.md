# Inner Pages — Design Spec
**Date:** 2026-04-30
**Branch:** sanity-integration

## Overview

Add five separate URL routes — `/about`, `/services`, `/projects`, `/news`, `/contact` — to the H.Studio portfolio site. Each page uses Sanity CMS content via a page-level singleton schema. Existing document collections (services, projects, news items) are reused and extended. A Formspark-powered contact form handles message submissions.

---

## Architecture

### Routing

Five new Server Component page files following the existing `page.tsx` pattern:

```
src/app/about/page.tsx
src/app/services/page.tsx
src/app/projects/page.tsx
src/app/news/page.tsx
src/app/contact/page.tsx
```

Each fetches its own data from Sanity using `sanityFetch`, merges with fallback data, and renders the page. `export const revalidate = 3600` on each, matching the home page.

### StickyNav moves to layout.tsx

`StickyNav` is currently rendered inside `src/app/page.tsx`. It must move to `src/app/layout.tsx` so it is shared across all routes.

`layout.tsx` changes:
- Becomes `async` to fetch `studioName` from Sanity using `settingsQuery`
- Renders `<StickyNav studioName={studioName} navLinks={navLinks} />` above `{children}`
- The `navLinks` constant moves from `page.tsx` to `layout.tsx`

`page.tsx` changes:
- Remove the `<StickyNav>` render call (now in layout)
- Remove the `navLinks` constant
- Remove the `StickyNav` import

### Nav links become real routes

In `StickyNav.tsx`:
- Import `usePathname` from `next/navigation`
- Map each nav link to its route: `About → /about`, `Services → /services`, `Projects → /projects`, `News → /news`, `Contact → /contact`
- The active link (matching `usePathname()`) gets a permanent underline (GSAP `scaleX: 1`, no hover needed)

In `MobileMenu.tsx`:
- Same route mapping for the overlay links
- Accept `navLinks` as a prop (array of `{label, href}`) so routes are defined in one place

### Nav color switching on inner pages

The ScrollTrigger in `StickyNav` targets `#section-services` and `#section-footer`, which only exist on the home page. On inner pages, `document.querySelector` returns `null` — ScrollTrigger skips silently. Nav stays its default black throughout inner pages, which is correct since inner pages use white/light backgrounds. No changes required to StickyNav's animation logic.

### Shared nav link structure

Define a single source of truth for nav links in `layout.tsx`:

```ts
const NAV_LINKS = [
  { label: "About",    href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "News",     href: "/news" },
  { label: "Contact",  href: "/contact" },
];
```

Pass to both `StickyNav` and `MobileMenu`.

### StickyNav and MobileMenu prop interface update

`StickyNav` prop interface changes from `navLinks: string[]` to `navLinks: { label: string; href: string }[]`.

`MobileMenu` receives the same `navLinks: { label: string; href: string }[]` prop (currently it has a hardcoded internal `navLinks` array — that is removed and replaced with the prop).

---

## Sanity Schemas

### New: 5 page-level singleton schemas

All follow the same pattern as existing singletons (`about`, `bio`, `hero`): plain `defineType` documents with no special actions. The app always fetches `[0]`, so duplicates are harmless. The Sanity Studio has no custom structure configured — default document list applies.

**`aboutPage`**
```ts
fields: [
  { name: 'headline', type: 'string' },       // large page header text
  { name: 'intro', type: 'text', rows: 4 },   // supporting paragraph
  { name: 'disciplines', type: 'array', of: [{ type: 'string' }] },
]
```

**`servicesPage`**
```ts
fields: [
  { name: 'headline', type: 'string' },
  { name: 'intro', type: 'text', rows: 3 },
]
```

**`projectsPage`**
```ts
fields: [
  { name: 'headline', type: 'string' },
  { name: 'intro', type: 'text', rows: 3 },
]
```

**`newsPage`**
```ts
fields: [
  { name: 'headline', type: 'string' },
  { name: 'intro', type: 'text', rows: 3 },
]
```

**`contactPage`**
```ts
fields: [
  { name: 'headline', type: 'string' },
  { name: 'intro', type: 'text', rows: 3 },
  { name: 'email', type: 'string' },
  { name: 'phone', type: 'string' },
  { name: 'address', type: 'text', rows: 2 },
  { name: 'formActionUrl', type: 'url', description: 'Formspark form action URL' },
  {
    name: 'socialLinks',
    type: 'array',
    of: [{
      type: 'object',
      fields: [
        { name: 'platform', type: 'string' },
        { name: 'url', type: 'url' },
      ],
    }],
  },
]
```

### Existing schemas extended (backwards-compatible)

**`newsItem`** — add three optional fields:
```ts
{ name: 'title', type: 'string' }
{ name: 'date', type: 'date' }
{ name: 'externalUrl', type: 'url' }
```

**`portfolioProject`** — add three optional fields:
```ts
{ name: 'client', type: 'string' }
{ name: 'year', type: 'number' }
{ name: 'description', type: 'text', rows: 3 }
```

The home page ignores these new fields. Adding them is non-breaking.

### Schema index update

Register all 5 new schemas in `src/sanity/schemas/index.ts`.

### New GROQ queries in `src/sanity/queries.ts`

```groq
// Page singletons
aboutPageQuery    → *[_type == "aboutPage"][0]{ headline, intro, disciplines }
servicesPageQuery → *[_type == "servicesPage"][0]{ headline, intro }
projectsPageQuery → *[_type == "projectsPage"][0]{ headline, intro }
newsPageQuery     → *[_type == "newsPage"][0]{ headline, intro }
contactPageQuery  → *[_type == "contactPage"][0]{
  headline, intro, email, phone, address, formActionUrl,
  socialLinks[]{ platform, url }
}

// Extended existing queries
portfolioProjectsQuery — add client, year, description
newsItemsQuery         — add title, date, externalUrl
```

### New TypeScript types in `src/sanity/types.ts`

```ts
SanityAboutPage, SanityServicesPage, SanityProjectsPage,
SanityNewsPage, SanityContactPage
```

Update `SanityPortfolioProject` and `SanityNewsItem` with new optional fields.

---

## Page Designs

All inner pages share the H.Studio design language: Inter (text), Geist Mono (labels), Playfair Display (italic accents), tight tracking, mix of white and black sections. The `StickyNav` appears on all pages via `layout.tsx`.

### Fallback data

Each page defines its own fallback constants (similar to home page) used when Sanity documents don't exist yet.

---

### About Page (`/about`)

**Sections:**

1. **Page header** — Black background. Large staircase-style text in Inter Light uppercase, similar to the home bio section. Shows `headline` from `aboutPage` (e.g. "About me"). Mono label `[ About ]` top-left. Mono number `003` top-right.

2. **Portrait + bio** — White background. Two-column on desktop: portrait image (same from existing `about.portrait`) on the right (~44% width), extended `intro` text on the left in the bracket-corner frame style from the home About section. Below the text: `disciplines` rendered as a row of mono-label tags (e.g. `[ Brand Discovery ]  [ Web Design ]`).

3. **Full-bleed divider** — Reuses the full-bleed photo from `settings.fullBleedPhoto`.

**Data fetched:** `aboutPageQuery`, `aboutQuery`, `settingsQuery`

**Fallbacks:** headline = `"About me"`, intro = placeholder paragraph, disciplines = `["Brand Discovery", "Web Design & Dev", "Photography"]`

---

### Services Page (`/services`)

**Sections:**

1. **Page header** — Black background. `headline` from `servicesPage` (e.g. "What we do") in large Inter Light uppercase. Below: service count `[4] Deliverables` in the same style as home. Mono label `[ Services ]` top-left.

2. **Services list** — White background. Same accordion-style rows as home page but with the service image shown at full column width (not constrained to 151px square). Each service: mono number, divider line, italic bold title, description paragraph, full-width image below.

3. **CTA block** — Black background. Short italic text + "Let's talk" outline button, matching the footer CTA style.

**Data fetched:** `servicesPageQuery`, `servicesQuery`

**Fallbacks:** headline = `"What we do"`, intro = placeholder, services = same FB_SERVICES as home.

---

### Projects Page (`/projects`)

**Sections:**

1. **Page header** — White background. `headline` from `projectsPage` (e.g. "Selected Work") in large Inter Light uppercase staircase. Project count and mono label.

2. **Tag filter** — Single row of tag pills below the header (derived from all unique tags across projects). Clicking a tag filters the grid. Active tag gets a filled black pill. Implemented as a Client Component (`ProjectsGrid`).

3. **Projects grid** — Two-column masonry on desktop (matching home layout), single-column on mobile. Shows all projects. Each card: image, tag pills overlay, name + arrow link below. `client` and `year` shown as mono labels below the name if present.

**Data fetched:** `projectsPageQuery`, `portfolioProjectsQuery`

**Fallbacks:** headline = `"Selected Work"`, projects = same FB_PORTFOLIO as home.

**Note:** The tag filter requires a `"use client"` wrapper component (`ProjectsGrid`) that accepts all projects as props and handles filter state. The page itself stays a Server Component.

---

### News Page (`/news`)

**Sections:**

1. **Page header** — White background. `headline` from `newsPage` (e.g. "Latest News") in large Inter Light uppercase. Mono label `[ News ]` top-left.

2. **News grid** — Three columns on desktop, stacked on mobile. Each card: full-width image (aspect ratio 3:4), date in mono format `[ 2024 ]`, title in bold uppercase, summary paragraph, "Read more →" link to `externalUrl` (opens in new tab; button disabled/hidden if no URL).

**Data fetched:** `newsPageQuery`, `newsItemsQuery`

**Fallbacks:** headline = `"Latest News"`, items = same FB_NEWS as home with added title and date fallbacks.

---

### Contact Page (`/contact`)

**Sections:**

1. **Page header bar** — Black background, narrow (~120px tall). `headline` from `contactPage` (e.g. "Let's work together") in Inter Medium, centered. This is a thin black stripe at the top, not a full-screen hero.

2. **Split content** — White background, two columns on desktop (50/50), stacked on mobile.
   - **Left column:** Studio name as a large mono label, then `email`, `phone`, `address` each preceded by a small mono category label (`[ Email ]`, `[ Phone ]`, `[ Address ]`). Below: `socialLinks` as a vertical list of platform names.
   - **Right column:** The Formspark contact form. Fields: Name (text input), Email (email input), Subject (text input), Message (textarea, 5 rows), Submit button. On submit, `ContactForm` calls `event.preventDefault()` then `fetch(formActionUrl, { method: "POST", body: new FormData(form) })`. On a successful response, the form is replaced with an italic confirmation message. `formActionUrl` comes from Sanity (falls back to `"#"` if not yet set, in which case the form is inert).

**Data fetched:** `contactPageQuery`

**Fallbacks:** headline = `"Let's work together"`, email = `"hello@h.studio"`, phone/address empty, formActionUrl = `"#"`, socialLinks = Facebook/Instagram/X.com/LinkedIn.

**Form styling:** Inputs use bottom-border only (no box border), Inter font, same tracking as the rest of the site. Submit button matches the "Let's talk" button style (black, rounded-3xl). A success state shows an italic confirmation message replacing the form.

---

## File Impact Summary

| File | Change |
|---|---|
| `src/app/layout.tsx` | Make async, fetch studioName, render StickyNav, define NAV_LINKS |
| `src/app/page.tsx` | Remove StickyNav render + navLinks constant + StickyNav import |
| `src/components/StickyNav.tsx` | Update prop type, add usePathname for active state, use href from props |
| `src/components/MobileMenu.tsx` | Accept navLinks prop, remove hardcoded internal array, use href for links |
| `src/sanity/schemas/aboutPage.ts` | New |
| `src/sanity/schemas/servicesPage.ts` | New |
| `src/sanity/schemas/projectsPage.ts` | New |
| `src/sanity/schemas/newsPage.ts` | New |
| `src/sanity/schemas/contactPage.ts` | New |
| `src/sanity/schemas/service.ts` | No change |
| `src/sanity/schemas/newsItem.ts` | Add title, date, externalUrl |
| `src/sanity/schemas/portfolioProject.ts` | Add client, year, description |
| `src/sanity/schemas/index.ts` | Register 5 new schemas |
| `src/sanity/queries.ts` | Add 5 page queries, update 2 existing queries |
| `src/sanity/types.ts` | Add 5 new types, update 2 existing types |
| `src/app/about/page.tsx` | New |
| `src/app/services/page.tsx` | New |
| `src/app/projects/page.tsx` | New |
| `src/app/news/page.tsx` | New |
| `src/app/contact/page.tsx` | New |
| `src/components/ProjectsGrid.tsx` | New — client component for tag filtering |
| `src/components/ContactForm.tsx` | New — client component for form + success state |
