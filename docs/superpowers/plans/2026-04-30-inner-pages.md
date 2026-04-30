# Inner Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add five separate URL routes (/about, /services, /projects, /news, /contact) with Sanity CMS content and a Formspark contact form, sharing the existing H.Studio design language.

**Architecture:** StickyNav moves from page.tsx into layout.tsx so it's shared across all routes. Five new Sanity page-level singletons drive each page's header content; existing document collections (service, portfolioProject, newsItem) are reused and extended. Two new client components handle interactivity (tag filtering, contact form). StickyNav's hardcoded dark-section selectors are replaced with a `[data-nav-dark]` attribute so any page with a black section can trigger the white nav without code changes.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, Sanity CMS, GSAP, Formspark

> **Note on TDD:** No test framework is configured. Verification is visual via the dev server.

---

### Task 1: Extend existing Sanity schemas

**Files:**
- Modify: `src/sanity/schemas/newsItem.ts`
- Modify: `src/sanity/schemas/portfolioProject.ts`

- [ ] **Step 1: Update newsItem.ts**

Replace the full contents of `src/sanity/schemas/newsItem.ts`:

```ts
import { defineField, defineType } from 'sanity'

export const newsItem = defineType({
  name: 'newsItem',
  title: 'News item',
  type: 'document',
  fields: [
    defineField({ name: 'order', title: 'Order', type: 'number' }),
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'date', title: 'Date', type: 'date' }),
    defineField({ name: 'summary', title: 'Summary', type: 'text', rows: 3 }),
    defineField({ name: 'externalUrl', title: 'External URL', type: 'url' }),
  ],
  orderings: [{ title: 'Manual order', name: 'manualOrder', by: [{ field: 'order', direction: 'asc' }] }],
})
```

- [ ] **Step 2: Update portfolioProject.ts**

Replace the full contents of `src/sanity/schemas/portfolioProject.ts`:

```ts
import { defineField, defineType } from 'sanity'

export const portfolioProject = defineType({
  name: 'portfolioProject',
  title: 'Portfolio project',
  type: 'document',
  fields: [
    defineField({ name: 'order', title: 'Order', type: 'number' }),
    defineField({ name: 'name', title: 'Name', type: 'string' }),
    defineField({ name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'tallDesktop', title: 'Tall card on desktop', type: 'boolean' }),
    defineField({ name: 'client', title: 'Client', type: 'string' }),
    defineField({ name: 'year', title: 'Year', type: 'number' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
  ],
  orderings: [{ title: 'Manual order', name: 'manualOrder', by: [{ field: 'order', direction: 'asc' }] }],
})
```

- [ ] **Step 3: Commit**

```bash
git add src/sanity/schemas/newsItem.ts src/sanity/schemas/portfolioProject.ts
git commit -m "feat: extend newsItem and portfolioProject schemas with new optional fields"
```

---

### Task 2: Create 5 new page-level Sanity schemas

**Files:**
- Create: `src/sanity/schemas/aboutPage.ts`
- Create: `src/sanity/schemas/servicesPage.ts`
- Create: `src/sanity/schemas/projectsPage.ts`
- Create: `src/sanity/schemas/newsPage.ts`
- Create: `src/sanity/schemas/contactPage.ts`

- [ ] **Step 1: Create aboutPage.ts**

```ts
import { defineField, defineType } from 'sanity'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About page',
  type: 'document',
  fields: [
    defineField({ name: 'headline', title: 'Headline', type: 'string' }),
    defineField({ name: 'intro', title: 'Intro text', type: 'text', rows: 4 }),
    defineField({
      name: 'disciplines',
      title: 'Disciplines',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
})
```

- [ ] **Step 2: Create servicesPage.ts**

```ts
import { defineField, defineType } from 'sanity'

export const servicesPage = defineType({
  name: 'servicesPage',
  title: 'Services page',
  type: 'document',
  fields: [
    defineField({ name: 'headline', title: 'Headline', type: 'string' }),
    defineField({ name: 'intro', title: 'Intro text', type: 'text', rows: 3 }),
  ],
})
```

- [ ] **Step 3: Create projectsPage.ts**

```ts
import { defineField, defineType } from 'sanity'

export const projectsPage = defineType({
  name: 'projectsPage',
  title: 'Projects page',
  type: 'document',
  fields: [
    defineField({ name: 'headline', title: 'Headline', type: 'string' }),
    defineField({ name: 'intro', title: 'Intro text', type: 'text', rows: 3 }),
  ],
})
```

- [ ] **Step 4: Create newsPage.ts**

```ts
import { defineField, defineType } from 'sanity'

export const newsPage = defineType({
  name: 'newsPage',
  title: 'News page',
  type: 'document',
  fields: [
    defineField({ name: 'headline', title: 'Headline', type: 'string' }),
    defineField({ name: 'intro', title: 'Intro text', type: 'text', rows: 3 }),
  ],
})
```

- [ ] **Step 5: Create contactPage.ts**

```ts
import { defineField, defineType } from 'sanity'

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contact page',
  type: 'document',
  fields: [
    defineField({ name: 'headline', title: 'Headline', type: 'string' }),
    defineField({ name: 'intro', title: 'Intro text', type: 'text', rows: 3 }),
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({ name: 'phone', title: 'Phone', type: 'string' }),
    defineField({ name: 'address', title: 'Address', type: 'text', rows: 2 }),
    defineField({
      name: 'formActionUrl',
      title: 'Formspark form action URL',
      type: 'url',
      description: 'e.g. https://submit.formspark.io/f/xxxxxxxx',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social links',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'platform', title: 'Platform', type: 'string' }),
          defineField({ name: 'url', title: 'URL', type: 'url' }),
        ],
      }],
    }),
  ],
})
```

- [ ] **Step 6: Commit**

```bash
git add src/sanity/schemas/aboutPage.ts src/sanity/schemas/servicesPage.ts src/sanity/schemas/projectsPage.ts src/sanity/schemas/newsPage.ts src/sanity/schemas/contactPage.ts
git commit -m "feat: add page-level Sanity singleton schemas for all inner pages"
```

---

### Task 3: Register schemas, update queries, update types

**Files:**
- Modify: `src/sanity/schemas/index.ts`
- Modify: `src/sanity/queries.ts`
- Modify: `src/sanity/types.ts`

- [ ] **Step 1: Update index.ts**

Replace the full contents of `src/sanity/schemas/index.ts`:

```ts
import { hero } from './hero'
import { bio } from './bio'
import { about } from './about'
import { settings } from './settings'
import { service } from './service'
import { portfolioProject } from './portfolioProject'
import { testimonial } from './testimonial'
import { newsItem } from './newsItem'
import { aboutPage } from './aboutPage'
import { servicesPage } from './servicesPage'
import { projectsPage } from './projectsPage'
import { newsPage } from './newsPage'
import { contactPage } from './contactPage'

export const schemas = [
  hero, bio, about, settings, service, portfolioProject, testimonial, newsItem,
  aboutPage, servicesPage, projectsPage, newsPage, contactPage,
]
```

- [ ] **Step 2: Update queries.ts**

Replace the full contents of `src/sanity/queries.ts`:

```ts
export const heroQuery = `*[_type == "hero"][0]{
  "heroImageUrl": heroImage.asset->url,
  name,
  description
}`

export const bioQuery = `*[_type == "bio"][0]{
  yearsLabel,
  line1, line2, line3, line4, line5
}`

export const aboutQuery = `*[_type == "about"][0]{
  "portraitUrl": portrait.asset->url,
  body
}`

export const settingsQuery = `*[_type == "settings"][0]{
  studioName,
  "fullBleedPhotoUrl": fullBleedPhoto.asset->url
}`

export const servicesQuery = `*[_type == "service"] | order(order asc){
  _id,
  num,
  title,
  description,
  "imageUrl": image.asset->url
}`

export const portfolioProjectsQuery = `*[_type == "portfolioProject"] | order(order asc){
  _id,
  name,
  tags,
  "imageUrl": image.asset->url,
  tallDesktop,
  client,
  year,
  description
}`

export const testimonialsQuery = `*[_type == "testimonial"] | order(order asc){
  _id,
  "logoUrl": logo.asset->url,
  logoH,
  quote,
  clientName
}`

export const newsItemsQuery = `*[_type == "newsItem"] | order(order asc){
  _id,
  "imageUrl": image.asset->url,
  title,
  date,
  summary,
  externalUrl
}`

// Page-level singleton queries
export const aboutPageQuery = `*[_type == "aboutPage"][0]{
  headline,
  intro,
  disciplines
}`

export const servicesPageQuery = `*[_type == "servicesPage"][0]{
  headline,
  intro
}`

export const projectsPageQuery = `*[_type == "projectsPage"][0]{
  headline,
  intro
}`

export const newsPageQuery = `*[_type == "newsPage"][0]{
  headline,
  intro
}`

export const contactPageQuery = `*[_type == "contactPage"][0]{
  headline,
  intro,
  email,
  phone,
  address,
  formActionUrl,
  "socialLinks": socialLinks[]{ platform, url }
}`
```

- [ ] **Step 3: Update types.ts**

Replace the full contents of `src/sanity/types.ts`:

```ts
export interface SanityHero {
  heroImageUrl?: string | null
  name?: string | null
  description?: string | null
}

export interface SanityBio {
  yearsLabel?: string | null
  line1?: string | null
  line2?: string | null
  line3?: string | null
  line4?: string | null
  line5?: string | null
}

export interface SanityAbout {
  portraitUrl?: string | null
  body?: string | null
}

export interface SanitySettings {
  studioName?: string | null
  fullBleedPhotoUrl?: string | null
}

export interface SanityService {
  _id: string
  num?: string | null
  title?: string | null
  description?: string | null
  imageUrl?: string | null
}

export interface SanityPortfolioProject {
  _id: string
  name?: string | null
  tags?: string[] | null
  imageUrl?: string | null
  tallDesktop?: boolean | null
  client?: string | null
  year?: number | null
  description?: string | null
}

export interface SanityTestimonial {
  _id: string
  logoUrl?: string | null
  logoH?: number | null
  quote?: string | null
  clientName?: string | null
}

export interface SanityNewsItem {
  _id: string
  imageUrl?: string | null
  title?: string | null
  date?: string | null
  summary?: string | null
  externalUrl?: string | null
}

// Page-level singletons
export interface SanityAboutPage {
  headline?: string | null
  intro?: string | null
  disciplines?: string[] | null
}

export interface SanityServicesPage {
  headline?: string | null
  intro?: string | null
}

export interface SanityProjectsPage {
  headline?: string | null
  intro?: string | null
}

export interface SanityNewsPage {
  headline?: string | null
  intro?: string | null
}

export interface SanityContactSocialLink {
  platform?: string | null
  url?: string | null
}

export interface SanityContactPage {
  headline?: string | null
  intro?: string | null
  email?: string | null
  phone?: string | null
  address?: string | null
  formActionUrl?: string | null
  socialLinks?: SanityContactSocialLink[] | null
}
```

- [ ] **Step 4: Commit**

```bash
git add src/sanity/schemas/index.ts src/sanity/queries.ts src/sanity/types.ts
git commit -m "feat: register new schemas, add page queries, extend TypeScript types"
```

---

### Task 4: Upgrade StickyNav — data-nav-dark, navLinks prop, active state

**Files:**
- Modify: `src/components/StickyNav.tsx`

The `navLinks` prop type changes from `string[]` to `{ label: string; href: string }[]`. The hardcoded `#section-services` / `#section-footer` selectors are replaced with `[data-nav-dark]` so any element with that attribute triggers the white-nav transition. `usePathname` provides the active link.

- [ ] **Step 1: Replace StickyNav.tsx**

Replace the full contents of `src/components/StickyNav.tsx`:

```tsx
"use client";

import { useRef, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MobileMenu from "@/components/MobileMenu";

gsap.registerPlugin(ScrollTrigger);

interface NavLink {
  label: string;
  href: string;
}

interface StickyNavProps {
  studioName: string;
  navLinks: NavLink[];
}

export default function StickyNav({ studioName, navLinks }: StickyNavProps) {
  const navRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Set active link underline permanently; hover on non-active links
      linkRefs.current.forEach((link, i) => {
        if (!link) return;
        const underline = link.querySelector<HTMLSpanElement>("[data-underline]");
        if (!underline) return;
        const isActive = navLinks[i]?.href === pathname;
        if (isActive) {
          gsap.set(underline, { scaleX: 1 });
          return;
        }
        link.addEventListener("mouseenter", () =>
          gsap.to(underline, { scaleX: 1, transformOrigin: "left", duration: 0.25, ease: "power2.out" })
        );
        link.addEventListener("mouseleave", () =>
          gsap.to(underline, { scaleX: 0, transformOrigin: "right", duration: 0.2, ease: "power2.in" })
        );
      });

      // Button hover
      const btn = buttonRef.current;
      if (btn) {
        btn.addEventListener("mouseenter", () =>
          gsap.to(btn, { scale: 1.04, duration: 0.2, ease: "power2.out" })
        );
        btn.addEventListener("mouseleave", () =>
          gsap.to(btn, { scale: 1, duration: 0.15, ease: "power2.in" })
        );
      }

      // Scroll-driven color switching — any element with [data-nav-dark]
      const nav = navRef.current;
      if (!nav) return;

      document.querySelectorAll<HTMLElement>("[data-nav-dark]").forEach((section) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top 72px",
          end: "bottom 72px",
          onEnter: () => {
            gsap.to(nav, { color: "#fff", duration: 0.3 });
            if (btn) gsap.to(btn, { backgroundColor: "#fff", color: "#000", duration: 0.3 });
          },
          onLeave: () => {
            gsap.to(nav, { color: "#000", duration: 0.3 });
            if (btn) gsap.to(btn, { backgroundColor: "#000", color: "#fff", duration: 0.3 });
          },
          onEnterBack: () => {
            gsap.to(nav, { color: "#fff", duration: 0.3 });
            if (btn) gsap.to(btn, { backgroundColor: "#fff", color: "#000", duration: 0.3 });
          },
          onLeaveBack: () => {
            gsap.to(nav, { color: "#000", duration: 0.3 });
            if (btn) gsap.to(btn, { backgroundColor: "#000", color: "#fff", duration: 0.3 });
          },
        });
      });
    });

    return () => ctx.revert();
  }, [pathname, navLinks]);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between py-6 px-4 md:px-8"
      style={{ color: "#000" }}
    >
      <Link
        href="/"
        className="font-[family-name:var(--font-inter)] font-semibold text-base tracking-[-0.04em] capitalize"
        style={{ color: "inherit" }}
      >
        {studioName}
      </Link>

      <MobileMenu navLinks={navLinks} />

      <div className="hidden md:flex items-center gap-14 font-[family-name:var(--font-inter)] font-semibold text-base tracking-[-0.04em] capitalize">
        {navLinks.map((link, i) => (
          <Link
            key={link.href}
            href={link.href}
            ref={(el) => { linkRefs.current[i] = el; }}
            className="relative pb-0.5"
            style={{ color: "inherit" }}
          >
            {link.label}
            <span
              data-underline
              className="absolute bottom-0 left-0 right-0 h-px bg-current block"
              style={{ transform: "scaleX(0)" }}
            />
          </Link>
        ))}
      </div>

      <button
        ref={buttonRef}
        className="hidden md:flex font-[family-name:var(--font-inter)] font-medium text-sm tracking-[-0.04em] px-4 py-3 rounded-3xl cursor-pointer"
        style={{ backgroundColor: "#000", color: "#fff", transformOrigin: "center" }}
      >
        Let&apos;s talk
      </button>
    </nav>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/StickyNav.tsx
git commit -m "feat: upgrade StickyNav — data-nav-dark selector, navLinks prop shape, active state via usePathname"
```

---

### Task 5: Update MobileMenu — accept navLinks prop

**Files:**
- Modify: `src/components/MobileMenu.tsx`

Remove the hardcoded `navLinks` constant. Accept `navLinks: { label: string; href: string }[]` as a prop. Use `next/link` for navigation.

- [ ] **Step 1: Replace MobileMenu.tsx**

Replace the full contents of `src/components/MobileMenu.tsx`:

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";

interface MobileMenuProps {
  navLinks: { label: string; href: string }[];
}

export default function MobileMenu({ navLinks }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="md:hidden"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect y="4" width="24" height="2" rx="1" fill="currentColor" />
          <rect y="11" width="24" height="2" rx="1" fill="currentColor" />
          <rect y="18" width="24" height="2" rx="1" fill="currentColor" />
        </svg>
      </button>

      <div
        className={`fixed inset-0 z-50 flex flex-col px-4 py-6 bg-white transition-transform duration-300 ease-in-out md:hidden ${open ? "translate-x-0" : "translate-x-full"}`}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between">
          <span className="font-[family-name:var(--font-inter)] font-semibold text-base tracking-[-0.04em] text-black capitalize">
            H.Studio
          </span>
          <button onClick={() => setOpen(false)} aria-label="Close menu" className="p-1">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <line x1="5" y1="5" x2="19" y2="19" stroke="black" strokeWidth="2" strokeLinecap="round" />
              <line x1="19" y1="5" x2="5" y2="19" stroke="black" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <nav className="flex flex-col gap-8 mt-16">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-[family-name:var(--font-inter)] font-semibold text-[32px] tracking-[-0.04em] text-black capitalize leading-none hover:opacity-50 transition-opacity"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto">
          <button className="bg-black text-white font-[family-name:var(--font-inter)] font-medium text-sm tracking-[-0.04em] px-4 py-3 rounded-3xl">
            Let&apos;s talk
          </button>
        </div>
      </div>
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/MobileMenu.tsx
git commit -m "feat: MobileMenu accepts navLinks prop, uses next/link for navigation"
```

---

### Task 6: Update layout.tsx — move StickyNav here

**Files:**
- Modify: `src/app/layout.tsx`

Make the layout async, fetch `studioName` from Sanity, define `NAV_LINKS`, and render `<StickyNav>` above `{children}`.

- [ ] **Step 1: Replace layout.tsx**

Replace the full contents of `src/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import StickyNav from "@/components/StickyNav";
import { sanityFetch } from "@/sanity/client";
import { settingsQuery } from "@/sanity/queries";
import type { SanitySettings } from "@/sanity/types";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
});
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["italic"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "H.Studio",
  description: "Creative studio specializing in branding, web design and engineering.",
};

const NAV_LINKS = [
  { label: "About",    href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "News",     href: "/news" },
  { label: "Contact",  href: "/contact" },
];

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const settingsData = await sanityFetch<SanitySettings | null>(settingsQuery, null);
  const studioName = settingsData?.studioName || "H.Studio";

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <StickyNav studioName={studioName} navLinks={NAV_LINKS} />
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: layout.tsx fetches studioName and renders shared StickyNav"
```

---

### Task 7: Update page.tsx — remove StickyNav, add data-nav-dark

**Files:**
- Modify: `src/app/page.tsx`

Remove the `StickyNav` import and render call (now in layout). Remove `navLinks` constant. Add `data-nav-dark` attribute to the two existing black sections so the generic selector in StickyNav still triggers on the home page.

- [ ] **Step 1: Remove StickyNav import and navLinks**

In `src/app/page.tsx`, remove these two lines near the top:
```tsx
import StickyNav from "@/components/StickyNav";
// and
import HeroSection from "@/components/HeroSection";  // keep this one
```

Only remove the StickyNav import. Also remove the `navLinks` constant:
```tsx
// Remove this line:
const navLinks = ["About", "Services", "Projects", "News", "Contact"];
```

- [ ] **Step 2: Remove StickyNav from JSX**

Find and remove these two lines from the JSX return:
```tsx
<StickyNav studioName={studioName} navLinks={navLinks} />
```

- [ ] **Step 3: Add data-nav-dark to the services section (line ~237)**

Find:
```tsx
<section id="section-services" className="bg-black px-4 py-12 flex flex-col gap-8 md:px-8 md:py-[80px] md:gap-12">
```

Replace with:
```tsx
<section id="section-services" data-nav-dark className="bg-black px-4 py-12 flex flex-col gap-8 md:px-8 md:py-[80px] md:gap-12">
```

- [ ] **Step 4: Add data-nav-dark to the footer (line ~552)**

Find:
```tsx
<footer id="section-footer" className="bg-black px-4 pt-12 flex flex-col gap-12 md:px-8 md:pt-[48px] md:gap-[120px]">
```

Replace with:
```tsx
<footer id="section-footer" data-nav-dark className="bg-black px-4 pt-12 flex flex-col gap-12 md:px-8 md:pt-[48px] md:gap-[120px]">
```

- [ ] **Step 5: Run TypeScript check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: remove StickyNav from home page (now in layout), add data-nav-dark attributes"
```

---

### Task 8: Create ProjectsGrid client component

**Files:**
- Create: `src/components/ProjectsGrid.tsx`

Client component — receives all projects as props, manages tag-filter state, renders masonry grid.

- [ ] **Step 1: Create ProjectsGrid.tsx**

```tsx
"use client";

import { useState } from "react";
import type { SanityPortfolioProject } from "@/sanity/types";

interface ProjectsGridProps {
  projects: SanityPortfolioProject[];
}

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
  const allTags = Array.from(new Set(projects.flatMap((p) => p.tags ?? [])));
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = activeTag
    ? projects.filter((p) => p.tags?.includes(activeTag))
    : projects;

  const left = filtered.filter((_, i) => i % 2 === 0);
  const right = filtered.filter((_, i) => i % 2 === 1);

  return (
    <div>
      {/* Tag filter */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-3 mb-12">
          <button
            onClick={() => setActiveTag(null)}
            className={`font-[family-name:var(--font-inter)] font-medium text-[14px] tracking-[-0.04em] px-4 py-2 rounded-3xl border transition-colors ${
              activeTag === null
                ? "bg-black text-white border-black"
                : "bg-transparent text-black border-black hover:bg-black hover:text-white"
            }`}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              className={`font-[family-name:var(--font-inter)] font-medium text-[14px] tracking-[-0.04em] px-4 py-2 rounded-3xl border transition-colors ${
                activeTag === tag
                  ? "bg-black text-white border-black"
                  : "bg-transparent text-black border-black hover:bg-black hover:text-white"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* Mobile: stacked */}
      <div className="flex flex-col gap-6 md:hidden">
        {filtered.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>

      {/* Desktop: two-column masonry */}
      <div className="hidden md:flex gap-6 items-start">
        <div className="flex-1 flex flex-col gap-6">
          {left.map((project) => (
            <ProjectCard key={project._id} project={project} large />
          ))}
        </div>
        <div className="flex-1 flex flex-col gap-6 pt-[240px]">
          {right.map((project) => (
            <ProjectCard key={project._id} project={project} large />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, large = false }: { project: SanityPortfolioProject; large?: boolean }) {
  return (
    <div className="flex flex-col gap-[10px]">
      <div
        className={`relative w-full overflow-hidden ${
          large ? (project.tallDesktop ? "h-[744px]" : "h-[699px]") : "h-[390px]"
        }`}
      >
        {project.imageUrl && (
          <img
            src={project.imageUrl}
            alt={project.name ?? ""}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute bottom-4 left-4 flex gap-3">
          {(project.tags ?? []).map((tag) => (
            <div key={tag} className="backdrop-blur-[10px] bg-[rgba(255,255,255,0.3)] px-2 py-1 rounded-3xl">
              <span className="font-[family-name:var(--font-inter)] font-medium text-[14px] text-[#111] tracking-[-0.04em] whitespace-nowrap">
                {tag}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p
            className={`font-[family-name:var(--font-inter)] font-black text-black uppercase tracking-[-0.04em] leading-[1.1] ${
              large ? "text-[36px]" : "text-[24px]"
            }`}
          >
            {project.name}
          </p>
          {(project.client || project.year) && (
            <p className="font-[family-name:var(--font-geist-mono)] text-[12px] text-[#888] uppercase leading-[1.1] mt-1">
              {[project.client, project.year].filter(Boolean).join(" · ")}
            </p>
          )}
        </div>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true" className="shrink-0 mt-1">
          <path d="M9 23L23 9M23 9H13M23 9V19" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ProjectsGrid.tsx
git commit -m "feat: add ProjectsGrid client component with tag filtering and masonry layout"
```

---

### Task 9: Create ContactForm client component

**Files:**
- Create: `src/components/ContactForm.tsx`

Client component — handles Formspark form submission via `fetch`, shows success/error state.

- [ ] **Step 1: Create ContactForm.tsx**

```tsx
"use client";

import { useRef, useState } from "react";

interface ContactFormProps {
  formActionUrl: string;
}

export default function ContactForm({ formActionUrl }: ContactFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const disabled = !formActionUrl || formActionUrl === "#";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (disabled) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(formActionUrl, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(formRef.current!),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Could not send your message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass =
    "w-full bg-transparent border-b border-[#1f1f1f] py-3 font-[family-name:var(--font-inter)] text-[14px] text-[#1f1f1f] tracking-[-0.04em] placeholder:text-[#aaa] focus:outline-none focus:border-black transition-colors";

  if (submitted) {
    return (
      <p className="font-[family-name:var(--font-inter)] font-bold italic text-[#1f1f1f] text-[18px] tracking-[-0.04em] leading-[1.3] py-12">
        Message sent — we&apos;ll be in touch soon.
      </p>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6">
      <input name="name" type="text" required placeholder="Name" className={inputClass} />
      <input name="email" type="email" required placeholder="Email" className={inputClass} />
      <input name="subject" type="text" placeholder="Subject" className={inputClass} />
      <textarea
        name="message"
        required
        placeholder="Message"
        rows={5}
        className={`${inputClass} resize-none`}
      />
      {error && (
        <p className="font-[family-name:var(--font-inter)] text-[13px] text-red-600 tracking-[-0.04em]">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={submitting || disabled}
        className="self-start bg-black text-white font-[family-name:var(--font-inter)] font-medium text-sm tracking-[-0.04em] px-6 py-3 rounded-3xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-800 transition-colors"
      >
        {submitting ? "Sending…" : "Send message"}
      </button>
      {disabled && (
        <p className="font-[family-name:var(--font-geist-mono)] text-[12px] text-[#aaa] uppercase">
          [ Form URL not configured yet ]
        </p>
      )}
    </form>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ContactForm.tsx
git commit -m "feat: add ContactForm client component with Formspark fetch and success state"
```

---

### Task 10: Create /about page

**Files:**
- Create: `src/app/about/page.tsx`

- [ ] **Step 1: Create src/app/about/page.tsx**

```tsx
import { sanityFetch } from "@/sanity/client";
import { aboutPageQuery, aboutQuery, settingsQuery } from "@/sanity/queries";
import type { SanityAboutPage, SanityAbout, SanitySettings } from "@/sanity/types";

export const revalidate = 3600;

const FB_ABOUT_IMAGE = "https://www.figma.com/api/mcp/asset/b63165b3-7ea4-4df7-81d8-7a442dc6a96c";
const FB_FULL_BLEED = "https://www.figma.com/api/mcp/asset/8262a925-4d6c-4be2-935c-00b97c0c0b43";
const FB_DISCIPLINES = ["Brand Discovery", "Web Design & Dev", "Marketing", "Photography"];
const FB_INTRO =
  "Placeholder paragraph one. This is where you introduce yourself — your background, your passion for your craft, and what drives you creatively. Two to three sentences work best here.\n\nPlaceholder paragraph two. Here you can describe your technical approach, how you collaborate with clients, or what sets your work apart from others in your field.";

export default async function AboutPage() {
  const [pageData, aboutData, settingsData] = await Promise.all([
    sanityFetch<SanityAboutPage | null>(aboutPageQuery, null),
    sanityFetch<SanityAbout | null>(aboutQuery, null),
    sanityFetch<SanitySettings | null>(settingsQuery, null),
  ]);

  const headline = pageData?.headline || "About me";
  const intro = pageData?.intro || FB_INTRO;
  const disciplines = pageData?.disciplines?.length ? pageData.disciplines : FB_DISCIPLINES;
  const portraitUrl = aboutData?.portraitUrl || FB_ABOUT_IMAGE;
  const fullBleedUrl = settingsData?.fullBleedPhotoUrl || FB_FULL_BLEED;

  return (
    <>
      {/* Page header */}
      <section className="bg-white px-4 pt-[120px] pb-[60px] md:px-8">
        <div className="flex items-start justify-between mb-4">
          <span className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">
            [ About ]
          </span>
          <span className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">
            003
          </span>
        </div>
        <div className="w-full border-t border-[#1f1f1f] mb-8" />
        <p
          className="font-[family-name:var(--font-inter)] font-light text-black uppercase leading-[0.86] tracking-[-0.08em]"
          style={{ fontSize: "clamp(48px, 8vw, 120px)" }}
        >
          {headline}
        </p>
      </section>

      {/* Portrait + bio */}
      <section className="bg-white px-4 py-12 md:px-8 md:py-[80px]">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-12">
          {/* Text + disciplines */}
          <div className="flex flex-col gap-8 md:flex-1">
            <div className="flex gap-3 items-start flex-1">
              <div className="flex flex-col justify-between w-6 shrink-0 self-stretch">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M15 1H1V15" stroke="#1f1f1f" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M15 15H1V1" stroke="#1f1f1f" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="flex-1 min-w-0 py-3 font-[family-name:var(--font-inter)] font-normal text-[14px] leading-[1.5] tracking-[-0.04em] text-[#1f1f1f] whitespace-pre-wrap">
                {intro}
              </p>
              <div className="flex flex-col justify-between w-6 shrink-0 self-stretch">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M1 1H15V15" stroke="#1f1f1f" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M1 15H15V1" stroke="#1f1f1f" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              {disciplines.map((d) => (
                <span
                  key={d}
                  className="font-[family-name:var(--font-geist-mono)] text-[12px] text-[#1f1f1f] uppercase tracking-[0.02em] border border-[#1f1f1f] px-3 py-1"
                >
                  [ {d} ]
                </span>
              ))}
            </div>
          </div>

          {/* Portrait */}
          <div className="relative w-full md:w-[44%] shrink-0 overflow-hidden aspect-[422/594]">
            <img
              alt=""
              src={portraitUrl}
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* Full-bleed divider */}
      <section className="relative w-full h-[565px] md:h-[900px] overflow-hidden">
        <img alt="" src={fullBleedUrl} className="absolute inset-0 w-full h-full object-cover object-center" />
      </section>
    </>
  );
}
```

- [ ] **Step 2: Verify page loads**

Open http://localhost:3000/about — confirm header, bio text, disciplines tags, portrait, and full-bleed photo render correctly. No console errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/about/page.tsx
git commit -m "feat: add /about page with headline, bio, disciplines, and full-bleed divider"
```

---

### Task 11: Create /services page

**Files:**
- Create: `src/app/services/page.tsx`

- [ ] **Step 1: Create src/app/services/page.tsx**

```tsx
import { sanityFetch } from "@/sanity/client";
import { servicesPageQuery, servicesQuery } from "@/sanity/queries";
import type { SanityServicesPage, SanityService } from "@/sanity/types";

export const revalidate = 3600;

const FB_SERVICES: SanityService[] = [
  { _id: "s1", num: "[ 1 ]", title: "Brand Discovery", description: "Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.", imageUrl: "https://www.figma.com/api/mcp/asset/cd2fc792-3d22-4d70-8171-e5f4d16930e9" },
  { _id: "s2", num: "[ 2 ]", title: "Web design & Dev", description: "Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.", imageUrl: "https://www.figma.com/api/mcp/asset/f1824594-9cc1-470b-b135-f08a0cb62a38" },
  { _id: "s3", num: "[ 3 ]", title: "Marketing", description: "Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.", imageUrl: "https://www.figma.com/api/mcp/asset/a27e3c3c-4a19-48c0-8966-13fb77edd386" },
  { _id: "s4", num: "[ 4 ]", title: "Photography", description: "Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.", imageUrl: "https://www.figma.com/api/mcp/asset/b51a7305-3c91-46fe-8c03-999c2ee2b3a7" },
];

export default async function ServicesPage() {
  const [pageData, servicesData] = await Promise.all([
    sanityFetch<SanityServicesPage | null>(servicesPageQuery, null),
    sanityFetch<SanityService[]>(servicesQuery, []),
  ]);

  const headline = pageData?.headline || "What we do";
  const services = servicesData.length > 0 ? servicesData : FB_SERVICES;

  return (
    <>
      {/* Page header — black, triggers white nav */}
      <section data-nav-dark className="bg-black px-4 pt-[120px] pb-[60px] md:px-8">
        <span className="font-[family-name:var(--font-geist-mono)] text-[14px] text-white uppercase leading-[1.1]">
          [ Services ]
        </span>
        <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <p
            className="font-[family-name:var(--font-inter)] font-light text-white uppercase leading-[0.86] tracking-[-0.08em]"
            style={{ fontSize: "clamp(48px, 8vw, 120px)" }}
          >
            {headline}
          </p>
          <span
            className="font-[family-name:var(--font-inter)] font-light text-white uppercase leading-[0.86] tracking-[-0.08em] whitespace-nowrap"
            style={{ fontSize: "clamp(28px, 3.5vw, 56px)" }}
          >
            [{services.length}]&nbsp;Deliverables
          </span>
        </div>
      </section>

      {/* Services list */}
      <section className="bg-white px-4 py-12 md:px-8 md:py-[80px]">
        <div className="flex flex-col gap-16">
          {services.map((service) => (
            <div key={service._id} className="flex flex-col gap-6">
              <div>
                <span className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">
                  {service.num}
                </span>
                <div className="w-full border-t border-[#1f1f1f] mt-3" />
              </div>
              <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-12">
                <p className="font-[family-name:var(--font-inter)] font-bold italic text-[36px] md:text-[48px] text-black uppercase tracking-[-0.04em] leading-[1.1] md:w-[38%] shrink-0">
                  {service.title}
                </p>
                <div className="flex flex-col gap-6 flex-1">
                  <p className="font-[family-name:var(--font-inter)] font-normal text-[14px] text-[#1f1f1f] leading-[1.5] tracking-[-0.04em]">
                    {service.description}
                  </p>
                  {service.imageUrl && (
                    <div className="relative w-full aspect-[16/9] overflow-hidden">
                      <img
                        alt=""
                        src={service.imageUrl}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section data-nav-dark className="bg-black px-4 py-16 md:px-8 md:py-[80px]">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <p className="font-[family-name:var(--font-inter)] font-light italic text-[24px] text-white uppercase tracking-[-0.04em] leading-[1.1]">
            Have a <span className="font-black not-italic">project</span> in mind?
          </p>
          <button className="self-start border border-white text-white font-[family-name:var(--font-inter)] font-medium text-[14px] tracking-[-0.04em] px-4 py-3 rounded-3xl whitespace-nowrap hover:bg-white hover:text-black transition-colors">
            Let&apos;s talk
          </button>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Verify page loads**

Open http://localhost:3000/services — confirm black header triggers white nav text, services list renders on white, CTA section is black. No console errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/services/page.tsx
git commit -m "feat: add /services page with black header, expanded service list, and CTA"
```

---

### Task 12: Create /projects page

**Files:**
- Create: `src/app/projects/page.tsx`

- [ ] **Step 1: Create src/app/projects/page.tsx**

```tsx
import { sanityFetch } from "@/sanity/client";
import { projectsPageQuery, portfolioProjectsQuery } from "@/sanity/queries";
import type { SanityProjectsPage, SanityPortfolioProject } from "@/sanity/types";
import ProjectsGrid from "@/components/ProjectsGrid";

export const revalidate = 3600;

const FB_PORTFOLIO: SanityPortfolioProject[] = [
  { _id: "p1", name: "Surfers paradise", tags: ["Social Media", "Photography"], imageUrl: "https://www.figma.com/api/mcp/asset/a838faf4-3e1e-425f-a500-6e95415f4c7d", tallDesktop: true },
  { _id: "p2", name: "Cyberpunk caffe", tags: ["Social Media", "Photography"], imageUrl: "https://www.figma.com/api/mcp/asset/90c6ecea-0f05-43d8-9bf2-13ca728dbe41", tallDesktop: false },
  { _id: "p3", name: "Agency 976", tags: ["Social Media", "Photography"], imageUrl: "https://www.figma.com/api/mcp/asset/764ce36c-1e30-4b3b-8676-5ecb435ff488", tallDesktop: false },
  { _id: "p4", name: "Minimal Playground", tags: ["Social Media", "Photography"], imageUrl: "https://www.figma.com/api/mcp/asset/9ff83d65-0924-49fb-aa67-002cdc9388e1", tallDesktop: true },
];

export default async function ProjectsPage() {
  const [pageData, projectsData] = await Promise.all([
    sanityFetch<SanityProjectsPage | null>(projectsPageQuery, null),
    sanityFetch<SanityPortfolioProject[]>(portfolioProjectsQuery, []),
  ]);

  const headline = pageData?.headline || "Selected Work";
  const projects = projectsData.length > 0 ? projectsData : FB_PORTFOLIO;

  return (
    <>
      {/* Page header */}
      <section className="bg-white px-4 pt-[120px] pb-[60px] md:px-8">
        <div className="flex items-start justify-between mb-4">
          <span className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">
            [ Portfolio ]
          </span>
          <span className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] leading-[1.1]">
            004
          </span>
        </div>
        <div className="w-full border-t border-[#1f1f1f] mb-8" />
        <p
          className="font-[family-name:var(--font-inter)] font-light text-black uppercase leading-[0.86] tracking-[-0.08em]"
          style={{ fontSize: "clamp(48px, 8vw, 120px)" }}
        >
          {headline}
        </p>
      </section>

      {/* Projects grid with tag filter */}
      <section className="bg-white px-4 pb-16 md:px-8 md:pb-[120px]">
        <ProjectsGrid projects={projects} />
      </section>
    </>
  );
}
```

- [ ] **Step 2: Verify page loads**

Open http://localhost:3000/projects — confirm header, tag filter pills, masonry grid on desktop, stacked on mobile. Clicking a tag filters the grid. No console errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/projects/page.tsx
git commit -m "feat: add /projects page with tag-filtered masonry grid"
```

---

### Task 13: Create /news page

**Files:**
- Create: `src/app/news/page.tsx`

- [ ] **Step 1: Create src/app/news/page.tsx**

```tsx
import { sanityFetch } from "@/sanity/client";
import { newsPageQuery, newsItemsQuery } from "@/sanity/queries";
import type { SanityNewsPage, SanityNewsItem } from "@/sanity/types";

export const revalidate = 3600;

const FB_NEWS: SanityNewsItem[] = [
  { _id: "n1", imageUrl: "https://www.figma.com/api/mcp/asset/622cb910-26a1-4fa7-9a1c-61fe4705fdea", title: "News title one", date: "2024-03-01", summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
  { _id: "n2", imageUrl: "https://www.figma.com/api/mcp/asset/393f3f3b-8a3b-480c-8879-60d5bf404102", title: "News title two", date: "2024-02-15", summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
  { _id: "n3", imageUrl: "https://www.figma.com/api/mcp/asset/f75547d1-a4d7-4f2c-96e1-2d6fdb901eb2", title: "News title three", date: "2024-01-20", summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
];

function formatYear(date: string): string {
  return `[ ${date.slice(0, 4)} ]`;
}

export default async function NewsPage() {
  const [pageData, newsData] = await Promise.all([
    sanityFetch<SanityNewsPage | null>(newsPageQuery, null),
    sanityFetch<SanityNewsItem[]>(newsItemsQuery, []),
  ]);

  const headline = pageData?.headline || "Latest News";
  const items = newsData.length > 0 ? newsData : FB_NEWS;

  return (
    <>
      {/* Page header */}
      <section className="bg-white px-4 pt-[120px] pb-[60px] md:px-8">
        <div className="flex items-start justify-between mb-4">
          <span className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">
            [ News ]
          </span>
        </div>
        <div className="w-full border-t border-[#1f1f1f] mb-8" />
        <p
          className="font-[family-name:var(--font-inter)] font-light text-black uppercase leading-[0.86] tracking-[-0.08em]"
          style={{ fontSize: "clamp(48px, 8vw, 120px)" }}
        >
          {headline}
        </p>
      </section>

      {/* News grid */}
      <section className="bg-[#f3f3f3] px-4 py-12 md:px-8 md:py-[80px]">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
          {items.map((item) => (
            <div key={item._id} className="flex flex-col gap-4">
              <div className="relative w-full aspect-[3/4] overflow-hidden">
                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    alt={item.title ?? ""}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
              </div>
              {item.date && (
                <span className="font-[family-name:var(--font-geist-mono)] text-[12px] text-[#888] uppercase leading-[1.1]">
                  {formatYear(item.date)}
                </span>
              )}
              {item.title && (
                <p className="font-[family-name:var(--font-inter)] font-black text-[18px] text-black uppercase tracking-[-0.04em] leading-[1.1]">
                  {item.title}
                </p>
              )}
              <p className="font-[family-name:var(--font-inter)] font-normal text-[14px] text-[#1f1f1f] leading-[1.3] tracking-[-0.04em]">
                {item.summary}
              </p>
              {item.externalUrl ? (
                <a
                  href={item.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="self-start flex items-center gap-[10px] border-b border-black py-1"
                >
                  <span className="font-[family-name:var(--font-inter)] font-medium text-[14px] text-black tracking-[-0.04em] whitespace-nowrap leading-normal">
                    Read more
                  </span>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    <path d="M4 14L14 4M14 4H8M14 4V10" stroke="#111" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              ) : (
                <span className="self-start flex items-center gap-[10px] border-b border-[#ccc] py-1 opacity-40 cursor-default">
                  <span className="font-[family-name:var(--font-inter)] font-medium text-[14px] text-black tracking-[-0.04em] whitespace-nowrap leading-normal">
                    Read more
                  </span>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    <path d="M4 14L14 4M14 4H8M14 4V10" stroke="#111" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Verify page loads**

Open http://localhost:3000/news — confirm header, three-column grid on desktop, year labels, titles, summaries, and "Read more" links render. Disabled state shows when no externalUrl. No console errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/news/page.tsx
git commit -m "feat: add /news page with three-column grid, date labels, and external links"
```

---

### Task 14: Create /contact page

**Files:**
- Create: `src/app/contact/page.tsx`

- [ ] **Step 1: Create src/app/contact/page.tsx**

```tsx
import { sanityFetch } from "@/sanity/client";
import { contactPageQuery } from "@/sanity/queries";
import type { SanityContactPage } from "@/sanity/types";
import ContactForm from "@/components/ContactForm";

export const revalidate = 3600;

const FB_SOCIAL_LINKS = [
  { platform: "Facebook",  url: null },
  { platform: "Instagram", url: null },
  { platform: "X.com",     url: null },
  { platform: "LinkedIn",  url: null },
];

export default async function ContactPage() {
  const pageData = await sanityFetch<SanityContactPage | null>(contactPageQuery, null);

  const headline     = pageData?.headline     || "Let's work together";
  const intro        = pageData?.intro        || "Have a project in mind? Drop us a line.";
  const email        = pageData?.email        || "hello@h.studio";
  const phone        = pageData?.phone        || null;
  const address      = pageData?.address      || null;
  const formActionUrl = pageData?.formActionUrl || "#";
  const socialLinks  = pageData?.socialLinks?.length ? pageData.socialLinks : FB_SOCIAL_LINKS;

  return (
    <>
      {/* Page header bar — black */}
      <section
        data-nav-dark
        className="bg-black px-4 pt-[120px] pb-[60px] md:px-8 flex items-end"
      >
        <p
          className="font-[family-name:var(--font-inter)] font-light text-white uppercase leading-[0.86] tracking-[-0.08em] w-full"
          style={{ fontSize: "clamp(48px, 8vw, 120px)" }}
        >
          {headline}
        </p>
      </section>

      {/* Split content */}
      <section className="bg-white px-4 py-12 md:px-8 md:py-[80px]">
        <div className="flex flex-col gap-12 md:flex-row md:gap-16">

          {/* Left: contact info */}
          <div className="flex flex-col gap-8 md:w-[40%] shrink-0">
            <p className="font-[family-name:var(--font-inter)] font-normal italic text-[14px] text-[#1f1f1f] leading-[1.5] tracking-[-0.04em]">
              {intro}
            </p>

            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <span className="font-[family-name:var(--font-geist-mono)] text-[12px] text-[#888] uppercase leading-[1.1]">
                  [ Email ]
                </span>
                <a
                  href={`mailto:${email}`}
                  className="font-[family-name:var(--font-inter)] font-medium text-[16px] text-black tracking-[-0.04em] hover:opacity-60 transition-opacity"
                >
                  {email}
                </a>
              </div>

              {phone && (
                <div className="flex flex-col gap-1">
                  <span className="font-[family-name:var(--font-geist-mono)] text-[12px] text-[#888] uppercase leading-[1.1]">
                    [ Phone ]
                  </span>
                  <a
                    href={`tel:${phone}`}
                    className="font-[family-name:var(--font-inter)] font-medium text-[16px] text-black tracking-[-0.04em] hover:opacity-60 transition-opacity"
                  >
                    {phone}
                  </a>
                </div>
              )}

              {address && (
                <div className="flex flex-col gap-1">
                  <span className="font-[family-name:var(--font-geist-mono)] text-[12px] text-[#888] uppercase leading-[1.1]">
                    [ Address ]
                  </span>
                  <p className="font-[family-name:var(--font-inter)] font-medium text-[16px] text-black tracking-[-0.04em] whitespace-pre-wrap">
                    {address}
                  </p>
                </div>
              )}
            </div>

            {/* Social links */}
            <div className="flex flex-col gap-2">
              {socialLinks.map((s) =>
                s.url ? (
                  <a
                    key={s.platform ?? ""}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-[family-name:var(--font-inter)] font-normal text-[18px] text-black uppercase tracking-[-0.04em] leading-[1.1] hover:opacity-60 transition-opacity"
                  >
                    {s.platform}
                  </a>
                ) : (
                  <span
                    key={s.platform ?? ""}
                    className="font-[family-name:var(--font-inter)] font-normal text-[18px] text-black uppercase tracking-[-0.04em] leading-[1.1]"
                  >
                    {s.platform}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Right: form */}
          <div className="flex-1">
            <ContactForm formActionUrl={formActionUrl} />
          </div>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Verify page loads**

Open http://localhost:3000/contact — confirm black header triggers white nav text, split layout on desktop, contact info on left, form on right. Form submit is disabled (no URL configured yet). No console errors.

- [ ] **Step 3: Run final TypeScript check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/app/contact/page.tsx
git commit -m "feat: add /contact page with split layout, contact info, and Formspark form"
```
