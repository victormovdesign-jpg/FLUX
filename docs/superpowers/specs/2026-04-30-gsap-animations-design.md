# GSAP Animations — Design Spec
**Date:** 2026-04-30
**Branch:** sanity-integration

## Overview

Add GSAP-powered animations to the H.Studio portfolio landing page: hover effects on nav links and buttons, a multi-layer parallax in the hero section, and a sticky nav that color-switches based on the section behind it.

---

## Architecture

`page.tsx` is a Next.js Server Component and must stay that way. GSAP is DOM-dependent and must live in Client Components. The approach is **targeted Client Component islands** — extract only the two animated regions into new `"use client"` components; leave everything else in the Server Component.

### New files

| File | Purpose |
|---|---|
| `src/components/StickyNav.tsx` | Fixed nav with GSAP hover effects and scroll-driven color switching |
| `src/components/HeroSection.tsx` | Hero section with GSAP ScrollTrigger parallax |

### Modified files

| File | Change |
|---|---|
| `package.json` | Add `gsap` dependency |
| `src/app/page.tsx` | Replace inline `<nav>` and hero `<section>` with `<StickyNav>` and `<HeroSection>`, passing required props |

`MobileMenu.tsx` needs one minor change: the hamburger SVG rects use hardcoded `fill="black"` — these must be changed to `fill="currentColor"` so they respond to the nav's CSS color when switching sections.

---

## GSAP Setup

Install: `npm install gsap`

In each Client Component, register ScrollTrigger once on mount:

```ts
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "gsap/react";

gsap.registerPlugin(ScrollTrigger);
```

Use `useGSAP` (from `gsap/react`) as the hook — it handles cleanup automatically on unmount and is the recommended pattern for React 18+/19.

---

## Component: StickyNav

### Props

```ts
interface StickyNavProps {
  studioName: string;
  navLinks: string[];
}
```

### Positioning

`position: fixed`, `top: 0`, `left: 0`, `right: 0`, `z-index: 50`. The hero section gets `padding-top` equal to nav height so content doesn't sit under it.

### Hover — nav links

Each nav link renders with a sibling `<span>` acting as an underline (`absolute bottom-0 left-0 right-0 h-px bg-current scaleX-0`). On `mouseenter`, `gsap.to(underline, { scaleX: 1, transformOrigin: "left", duration: 0.25, ease: "power2.out" })`. On `mouseleave`, `gsap.to(underline, { scaleX: 0, transformOrigin: "right", duration: 0.2, ease: "power2.in" })`.

Event listeners are attached inside `useGSAP` scope so they're auto-cleaned up.

### Hover — buttons

Each "Let's talk" button gets `mouseenter`/`mouseleave` handlers using `gsap.to(el, { scale: 1.04, duration: 0.2 })` / `gsap.to(el, { scale: 1, duration: 0.15 })`. The existing CSS `hover:bg-zinc-800` transition is removed and replaced with a GSAP color tween on the same events.

### Color switching

The nav starts with black text (`color: #000`, icon fills `#000`).

Two dark-background sections need white nav text:
- **Services section** (`bg-black`) — add `id="section-services"`
- **Footer** (`bg-black`) — add `id="section-footer"`

For each dark section, a `ScrollTrigger` watches `start: "top 64px"` (nav height) and `end: "bottom 64px"`. On `onEnter` and `onEnterBack`, `gsap.to(navEl, { color: "#fff", duration: 0.3 })`. On `onLeave` and `onLeaveBack`, `gsap.to(navEl, { color: "#000", duration: 0.3 })`.

The logo text and hamburger icon SVG fill are part of the nav element and inherit `currentColor`, so they switch automatically.

---

## Component: HeroSection

### Props

All values currently read from Sanity/fallbacks in `page.tsx`:

```ts
interface HeroSectionProps {
  heroImageUrl: string;
  heroName: string;
  heroDescription: string | null;
}
```

### Parallax layers

All three layers are driven by a single `ScrollTrigger` on the hero section, with `scrub: true`. The trigger fires from `start: "top top"` to `end: "bottom top"` (i.e., while the hero is in view scrolling away).

| Element | Ref name | Animation |
|---|---|---|
| `[ Hello I'm ]` tag | `tagRef` | `y: -80` (moves up fast) |
| Name (`heroName`) | `nameRef` | `scale: 0.92, opacity: 0` (shrinks and fades) |
| Description + button block | `descRef` | `y: 40` (drifts down slowly) |

Each layer is wrapped in a `<div>` with the corresponding ref. The `useGSAP` hook creates the timeline:

```ts
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: sectionRef.current,
    start: "top top",
    end: "bottom top",
    scrub: true,
  },
});
tl.to(tagRef.current, { y: -80 }, 0)
  .to(nameRef.current, { scale: 0.92, opacity: 0 }, 0)
  .to(descRef.current, { y: 40 }, 0);
```

All three start at position `0` in the timeline so they animate simultaneously and are purely scrub-driven (no easing delay).

---

## Sections that get IDs (page.tsx changes)

| Section | ID added |
|---|---|
| Services `<section>` | `id="section-services"` |
| Footer `<footer>` | `id="section-footer"` |

No other structural changes to `page.tsx`.

---

## Constraints & Edge Cases

- **SSR:** `useGSAP` and `ScrollTrigger` only run in the browser. No `window` access at import time — all DOM work is inside `useGSAP` callbacks.
- **Reduced motion:** Wrap all GSAP animations in a `window.matchMedia("(prefers-reduced-motion: reduce)")` check. If true, skip ScrollTrigger registration and hover animations entirely.
- **Mobile:** `StickyNav`'s desktop links and hover effects only apply to the `md:` breakpoint and up (matching existing Tailwind breakpoints). The hamburger menu behavior is unchanged.
- **Nav height:** Hero section needs `padding-top` of `~72px` (nav height) added so content isn't obscured. This replaces the current relative positioning.
