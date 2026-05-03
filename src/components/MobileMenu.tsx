"use client";

import Link from "next/link";

interface NavLink {
  label: string;
  href: string;
}

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  navLinks: NavLink[];
}

export default function MobileMenu({ open, onClose, navLinks }: MobileMenuProps) {
  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col bg-white px-4 py-6"
      style={{
        transform: open ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.3s ease-in-out",
        pointerEvents: open ? "auto" : "none",
      }}
      aria-hidden={!open}
    >
      <div className="flex items-center justify-between">
        <span className="font-[family-name:var(--font-inter)] font-semibold text-base tracking-[-0.04em] text-black capitalize">
          H.Studio
        </span>
        <button onClick={onClose} aria-label="Close menu" className="p-1 cursor-pointer">
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
            onClick={onClose}
            className="font-[family-name:var(--font-inter)] font-semibold text-[32px] tracking-[-0.04em] text-black capitalize leading-none"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="mt-auto">
        <button className="bg-black text-white font-[family-name:var(--font-inter)] font-medium text-sm tracking-[-0.04em] px-4 py-3 rounded-3xl cursor-pointer">
          Let&apos;s talk
        </button>
      </div>
    </div>
  );
}
