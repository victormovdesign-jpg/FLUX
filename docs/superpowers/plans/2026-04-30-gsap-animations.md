# GSAP Animations Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add GSAP-powered hover effects, hero parallax, and sticky nav color-switching to the H.Studio portfolio page.

**Architecture:** Extract nav and hero into two `"use client"` Client Component islands (`StickyNav`, `HeroSection`) so GSAP can run in the browser while `page.tsx` stays a Server Component. GSAP ScrollTrigger drives the parallax and color-switching; GSAP tweens drive hover effects.

**Tech Stack:** Next.js 16, React 19, GSAP 3 (`gsap/react`, `gsap/ScrollTrigger`), Tailwind CSS 4, TypeScript

> **Note on TDD:** No test framework is configured in this project. Verification steps are visual, using the dev server.

---

### Task 1: Install GSAP

**Files:**
- Modify: `package.json` (via npm)

- [ ] **Step 1: Install gsap**

```bash
npm install gsap
```

- [ ] **Step 2: Verify installation**

```bash
grep '"gsap"' package.json
```

Expected: a `"gsap": "^3.x.x"` line in `dependencies`.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "feat: install gsap"
```

---

### Task 2: Update MobileMenu.tsx — fill → currentColor

**Files:**
- Modify: `src/components/MobileMenu.tsx`

The hamburger SVG rects currently use `fill="black"`. They must use `fill="currentColor"` so the nav's CSS `color` value propagates to the icon when StickyNav switches between light and dark sections.

- [ ] **Step 1: Replace the three hardcoded fills**

In `src/components/MobileMenu.tsx`, find the hamburger `<svg>` block (inside the first `<button>`) and replace it:

```tsx
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
  <rect y="4" width="24" height="2" rx="1" fill="currentColor" />
  <rect y="11" width="24" height="2" rx="1" fill="currentColor" />
  <rect y="18" width="24" height="2" rx="1" fill="currentColor" />
</svg>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/MobileMenu.tsx
git commit -m "feat: use currentColor for hamburger SVG fills"
```

---

### Task 3: Create StickyNav.tsx

**Files:**
- Create: `src/components/StickyNav.tsx`

Responsibilities:
- `position: fixed` nav always at the top
- Desktop nav link hover: underline slides in from left on enter, retracts from right on leave
- "Let's talk" button hover: slight scale-up via GSAP
- ScrollTrigger: when `#section-services` or `#section-footer` crosses the nav, smoothly switch nav text to white (and button to white bg / black text); revert on the way back

- [ ] **Step 1: Create the file**

Create `src/components/StickyNav.tsx`:

```tsx
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "gsap/react";
import MobileMenu from "@/components/MobileMenu";

gsap.registerPlugin(ScrollTrigger);

interface StickyNavProps {
  studioName: string;
  navLinks: string[];
}

export default function StickyNav({ studioName, navLinks }: StickyNavProps) {
  const navRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Nav link underline hover
    linkRefs.current.forEach((link) => {
      if (!link) return;
      const underline = link.querySelector<HTMLSpanElement>("[data-underline]");
      if (!underline) return;
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

    // Scroll-driven color switching
    const nav = navRef.current;
    if (!nav) return;

    ["#section-services", "#section-footer"].forEach((selector) => {
      const section = document.querySelector(selector);
      if (!section) return;

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

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between py-6 px-4 md:px-8"
      style={{ color: "#000" }}
    >
      <span
        className="font-[family-name:var(--font-inter)] font-semibold text-base tracking-[-0.04em] capitalize"
        style={{ color: "inherit" }}
      >
        {studioName}
      </span>

      <MobileMenu />

      <div className="hidden md:flex items-center gap-14 font-[family-name:var(--font-inter)] font-semibold text-base tracking-[-0.04em] capitalize">
        {navLinks.map((link, i) => (
          <a
            key={link}
            href="#"
            ref={(el) => { linkRefs.current[i] = el; }}
            className="relative pb-0.5"
            style={{ color: "inherit" }}
          >
            {link}
            <span
              data-underline
              className="absolute bottom-0 left-0 right-0 h-px bg-current block"
              style={{ transform: "scaleX(0)" }}
            />
          </a>
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

- [ ] **Step 2: Start dev server and verify nav renders**

```bash
npm run dev
```

Open http://localhost:3000. Verify:
- Nav is pinned at the top
- Logo, desktop links, and "Let's talk" button are black
- No console errors

- [ ] **Step 3: Commit**

```bash
git add src/components/StickyNav.tsx
git commit -m "feat: add StickyNav with GSAP hover effects and scroll color switching"
```

---

### Task 4: Create HeroSection.tsx

**Files:**
- Create: `src/components/HeroSection.tsx`

Owns the hero `<section>` with background image, blur gradient overlay, and three parallax-animated layers. The nav is no longer inside this section. `pt-[72px]` compensates for the fixed nav height.

Parallax layers (all driven by one scrubbed ScrollTrigger on the section):
- `tagRef` — `[ Hello I'm ]` label: `y: -80` (drifts up fast)
- `nameRef` — large name text: `scale: 0.92, opacity: 0` (shrinks and fades out)
- `descRef` — description + button block: `y: 40` (drifts down slowly)

- [ ] **Step 1: Create the file**

Create `src/components/HeroSection.tsx`:

```tsx
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  heroImageUrl: string;
  heroName: string;
  heroDescription: string | null;
}

export default function HeroSection({ heroImageUrl, heroName, heroDescription }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const tagRef = useRef<HTMLParagraphElement>(null);
  const nameRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

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
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen flex-col overflow-hidden bg-[#c3cdd2] px-4 pt-[72px] md:px-8"
    >
      <div className="absolute inset-0 pointer-events-none md:left-[-34.79%] md:right-[-34.79%]">
        <img
          alt=""
          src={heroImageUrl}
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
      </div>

      <div
        className="absolute inset-x-0 bottom-0 h-[349px] pointer-events-none backdrop-blur-[10px] bg-[rgba(217,217,217,0.01)]"
        style={{
          maskImage: "linear-gradient(to bottom, transparent 0%, black 40%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 40%)",
        }}
      />

      <div className="relative flex-1 flex flex-col justify-end pb-6 md:justify-center md:pb-0">
        <div className="relative flex flex-col w-full">
          <p
            ref={tagRef}
            className="font-[family-name:var(--font-geist-mono)] font-normal text-[14px] text-white uppercase mix-blend-overlay leading-[1.1] whitespace-nowrap self-center md:absolute md:top-0 md:left-[18px] md:self-auto"
          >
            [ Hello i&apos;m ]
          </p>
          <p
            ref={nameRef}
            className="font-[family-name:var(--font-inter)] font-medium text-white text-center capitalize mix-blend-overlay w-full whitespace-pre-wrap leading-[0.8] tracking-[-0.07em] md:leading-[1.1]"
            style={{ fontSize: "clamp(96px, 13.75vw, 198px)" }}
          >
            {heroName}
          </p>
        </div>

        <div
          ref={descRef}
          className="mt-6 flex justify-center md:absolute md:bottom-16 md:right-0 md:mt-0 md:justify-end"
        >
          <div className="flex flex-col gap-[17px] items-start w-[294px]">
            {heroDescription ? (
              <p className="font-[family-name:var(--font-inter)] font-bold italic text-[#1f1f1f] text-[14px] tracking-[-0.04em] uppercase leading-[1.1]">
                {heroDescription}
              </p>
            ) : (
              <p className="font-[family-name:var(--font-inter)] font-bold italic text-[#1f1f1f] text-[14px] tracking-[-0.04em] uppercase leading-[1.1]">
                <span>H.Studio is a </span>
                <span className="font-normal">full-service</span>
                <span>{` creative studio creating beautiful digital experiences and products. We are an `}</span>
                <span className="font-normal">award winning</span>
                <span>{` design and art group specializing in branding, web design and engineering.`}</span>
              </p>
            )}
            <button className="bg-black text-white font-[family-name:var(--font-inter)] font-medium text-sm tracking-[-0.04em] px-4 py-3 rounded-3xl cursor-pointer hover:bg-zinc-800 transition-colors">
              Let&apos;s talk
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify hero section renders**

Check http://localhost:3000:
- Hero image, name, and description are visible and correctly laid out
- Top of the hero content is not hidden behind the nav (pt-[72px] provides clearance)

- [ ] **Step 3: Commit**

```bash
git add src/components/HeroSection.tsx
git commit -m "feat: add HeroSection with GSAP ScrollTrigger multi-layer parallax"
```

---

### Task 5: Update page.tsx — wire in new components

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Update imports**

At the top of `src/app/page.tsx`, remove the `MobileMenu` import and add `StickyNav` and `HeroSection`:

```tsx
// Remove:
import MobileMenu from "@/components/MobileMenu";

// Add:
import StickyNav from "@/components/StickyNav";
import HeroSection from "@/components/HeroSection";
```

- [ ] **Step 2: Replace the hero section block**

Find the entire hero `<section>` opening tag through its closing `</section>` — this is the block starting with:
```tsx
<section className="relative flex min-h-screen flex-col overflow-hidden bg-[#c3cdd2] px-4 md:px-8">
```
and ending just before `{/* Bio / staircase section */}`.

Replace the entire block (nav + hero section) with:

```tsx
<StickyNav studioName={studioName} navLinks={navLinks} />
<HeroSection
  heroImageUrl={heroImageUrl}
  heroName={heroName}
  heroDescription={heroDescription}
/>
```

- [ ] **Step 3: Add id to the services section**

Find:
```tsx
<section className="bg-black px-4 py-12 flex flex-col gap-8 md:px-8 md:py-[80px] md:gap-12">
```

Replace with:
```tsx
<section id="section-services" className="bg-black px-4 py-12 flex flex-col gap-8 md:px-8 md:py-[80px] md:gap-12">
```

- [ ] **Step 4: Add id to the footer**

Find:
```tsx
<footer className="bg-black px-4 pt-12 flex flex-col gap-12 md:px-8 md:pt-[48px] md:gap-[120px]">
```

Replace with:
```tsx
<footer id="section-footer" className="bg-black px-4 pt-12 flex flex-col gap-12 md:px-8 md:pt-[48px] md:gap-[120px]">
```

- [ ] **Step 5: Full visual verification**

Check http://localhost:3000 and verify each animation:

- [ ] Nav is fixed at the top on all sections while scrolling
- [ ] Hovering desktop nav links shows an underline sliding in from the left, retracting from the right on leave
- [ ] Hovering the nav "Let's talk" button shows a subtle scale-up
- [ ] Scrolling into the Services section: nav text and hamburger icon turn white smoothly; button becomes white bg / black text
- [ ] Scrolling back out of Services: nav returns to black
- [ ] Scrolling into the Footer: same white transition
- [ ] Hero parallax: `[ Hello I'm ]` drifts upward, name shrinks and fades, description block drifts down
- [ ] Mobile: hamburger icon is visible and tappable; overlay menu opens and closes correctly
- [ ] No console errors

- [ ] **Step 6: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: wire StickyNav and HeroSection into page, add section IDs for color switching"
```
