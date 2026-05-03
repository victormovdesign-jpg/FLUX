"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import MobileMenu from "@/components/MobileMenu";

interface NavLink {
  label: string;
  href: string;
}

interface StickyNavProps {
  studioName: string;
  navLinks: NavLink[];
}

export default function StickyNav({ studioName, navLinks }: StickyNavProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [navDark, setNavDark] = useState(false);

  useEffect(() => {
    const check = () => {
      const sections = document.querySelectorAll<HTMLElement>("[data-nav-dark]");
      let dark = false;
      sections.forEach((s) => {
        const { top, bottom } = s.getBoundingClientRect();
        if (top <= 72 && bottom >= 0) dark = true;
      });
      setNavDark(dark);
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, []);

  const fg = navDark ? "#fff" : "#000";
  const btnBg = navDark ? "#fff" : "#000";
  const btnFg = navDark ? "#000" : "#fff";

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between py-6 px-4 md:px-8"
        style={{ color: fg, transition: "color 0.3s" }}
      >
        {/* Logo */}
        <span className="font-[family-name:var(--font-inter)] font-semibold text-base tracking-[-0.04em] capitalize">
          {studioName}
        </span>

        {/* Desktop links — visibility controlled by CSS custom property in globals.css */}
        <div
          className="items-center gap-14 font-[family-name:var(--font-inter)] font-semibold text-base tracking-[-0.04em] capitalize"
          style={{ display: "var(--nav-desktop-display, none)" }}
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="group relative pb-0.5"
                style={{ color: "inherit" }}
              >
                {link.label}
                <span
                  className={`absolute bottom-0 left-0 right-0 h-px bg-current block origin-left transition-transform duration-[250ms] ease-out ${
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            );
          })}
        </div>

        {/* Desktop CTA */}
        <button
          className="font-[family-name:var(--font-inter)] font-medium text-sm tracking-[-0.04em] px-4 py-3 rounded-3xl cursor-pointer hover:scale-[1.04]"
          style={{
            backgroundColor: btnBg,
            color: btnFg,
            transition: "background-color 0.3s, color 0.3s, transform 0.2s",
            display: "var(--nav-desktop-display, none)",
          }}
        >
          Let&apos;s talk
        </button>

        {/* Mobile hamburger */}
        <button
          className="cursor-pointer"
          style={{ display: "var(--nav-mobile-display, block)", color: "inherit" }}
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect y="4" width="24" height="2" rx="1" fill="currentColor" />
            <rect y="11" width="24" height="2" rx="1" fill="currentColor" />
            <rect y="18" width="24" height="2" rx="1" fill="currentColor" />
          </svg>
        </button>
      </nav>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} navLinks={navLinks} />
    </>
  );
}
