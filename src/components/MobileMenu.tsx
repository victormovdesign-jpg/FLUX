"use client";

import { useState } from "react";

const navLinks = ["About", "Services", "Projects", "News", "Contact"];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="md:hidden"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect y="4" width="24" height="2" rx="1" fill="black" />
          <rect y="11" width="24" height="2" rx="1" fill="black" />
          <rect y="18" width="24" height="2" rx="1" fill="black" />
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
            <a
              key={link}
              href="#"
              onClick={() => setOpen(false)}
              className="font-[family-name:var(--font-inter)] font-semibold text-[32px] tracking-[-0.04em] text-black capitalize leading-none hover:opacity-50 transition-opacity"
            >
              {link}
            </a>
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
