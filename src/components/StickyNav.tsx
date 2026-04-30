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
