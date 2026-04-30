"use client";

import { useState, Fragment } from "react";

const heroImage =
  "https://www.figma.com/api/mcp/asset/7426b46e-aa6c-4fd6-9b95-5f9595d2e444";

const aboutImage =
  "https://www.figma.com/api/mcp/asset/b63165b3-7ea4-4df7-81d8-7a442dc6a96c";

const fullBleedPhoto =
  "https://www.figma.com/api/mcp/asset/8262a925-4d6c-4be2-935c-00b97c0c0b43";

const serviceImages = [
  "https://www.figma.com/api/mcp/asset/cd2fc792-3d22-4d70-8171-e5f4d16930e9",
  "https://www.figma.com/api/mcp/asset/f1824594-9cc1-470b-b135-f08a0cb62a38",
  "https://www.figma.com/api/mcp/asset/a27e3c3c-4a19-48c0-8966-13fb77edd386",
  "https://www.figma.com/api/mcp/asset/b51a7305-3c91-46fe-8c03-999c2ee2b3a7",
];

const portfolioProjects = [
  {
    name: "Surfers paradise",
    tags: ["Social Media", "Photography"],
    img: "https://www.figma.com/api/mcp/asset/a838faf4-3e1e-425f-a500-6e95415f4c7d",
    tallDesktop: true,
  },
  {
    name: "Cyberpunk caffe",
    tags: ["Social Media", "Photography"],
    img: "https://www.figma.com/api/mcp/asset/90c6ecea-0f05-43d8-9bf2-13ca728dbe41",
    tallDesktop: false,
  },
  {
    name: "Agency 976",
    tags: ["Social Media", "Photography"],
    img: "https://www.figma.com/api/mcp/asset/764ce36c-1e30-4b3b-8676-5ecb435ff488",
    tallDesktop: false,
  },
  {
    name: "Minimal Playground",
    tags: ["Social Media", "Photography"],
    img: "https://www.figma.com/api/mcp/asset/9ff83d65-0924-49fb-aa67-002cdc9388e1",
    tallDesktop: true,
  },
];

const newsImages = [
  "https://www.figma.com/api/mcp/asset/622cb910-26a1-4fa7-9a1c-61fe4705fdea",
  "https://www.figma.com/api/mcp/asset/393f3f3b-8a3b-480c-8879-60d5bf404102",
  "https://www.figma.com/api/mcp/asset/f75547d1-a4d7-4f2c-96e1-2d6fdb901eb2",
];

const testimonials = [
  {
    logo: "https://www.figma.com/api/mcp/asset/0e6f511f-5c17-4997-a280-82ccf6199618",
    logoH: 19,
    text: "A brilliant creative partner who transformed our vision into a unique, high-impact brand identity. Their ability to craft everything from custom mascots to polished logos is truly impressive.",
    name: "Marko Stojković",
    rotate: "-6.85deg",
    left: "7%",
    top: "142px",
  },
  {
    logo: "https://www.figma.com/api/mcp/asset/ad6a50c0-e2bf-4d6c-9712-8a608f81caca",
    logoH: 19,
    text: "Professional, precise, and incredibly fast at handling complex product visualizations and templates.",
    name: "Lukas Weber",
    rotate: "2.9deg",
    left: "47%",
    top: "272px",
  },
  {
    logo: "https://www.figma.com/api/mcp/asset/4137eb8b-2c8f-4fac-a972-e5ffffe761ea",
    logoH: 31,
    text: "A strategic partner who balances stunning aesthetics with high-performance UX for complex platforms. They don't just make things look good; they solve business problems through visual clarity.",
    name: "Sarah Jenkins",
    rotate: "2.23deg",
    left: "21%",
    top: "553px",
  },
  {
    logo: "https://www.figma.com/api/mcp/asset/4abba437-67b2-42ea-9bcb-6d04bfdafaf7",
    logoH: 36,
    text: "An incredibly versatile designer who delivers consistent quality across a wide range of styles and formats.",
    name: "Sofia Martínez",
    rotate: "-4.15deg",
    left: "68.5%",
    top: "546px",
  },
];

const services = [
  { num: "[ 1 ]", name: "Brand Discovery" },
  { num: "[ 2 ]", name: "Web design & Dev" },
  { num: "[ 3 ]", name: "Marketing" },
  { num: "[ 4 ]", name: "Photography" },
];

const navLinks = ["About", "Services", "Projects", "News", "Contact"];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
    <section className="relative flex min-h-screen flex-col overflow-hidden bg-[#c3cdd2] px-4 md:px-8">

      {/* Background photo
          Simple full-cover: fills the section, no stretching, face anchored to top.
          As the viewport resizes the image scales proportionally. */}
      <div className="absolute inset-0 pointer-events-none md:left-[-34.79%] md:right-[-34.79%]">
        <img
          alt=""
          src={heroImage}
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
      </div>

      {/* Blur band — always pinned to the bottom of the section */}
      <div
        className="absolute inset-x-0 bottom-0 h-[349px] pointer-events-none backdrop-blur-[10px] bg-[rgba(217,217,217,0.01)]"
        style={{
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 40%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 40%)',
        }}
      />

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-50 flex flex-col px-4 py-6 bg-white transition-transform duration-300 ease-in-out md:hidden ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
        aria-hidden={!menuOpen}
      >
        <div className="flex items-center justify-between">
          <span className="font-[family-name:var(--font-inter)] font-semibold text-base tracking-[-0.04em] text-black capitalize">
            H.Studio
          </span>
          <button onClick={() => setMenuOpen(false)} aria-label="Close menu" className="p-1">
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
              onClick={() => setMenuOpen(false)}
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

      {/* Navigation */}
      <nav className="relative z-10 shrink-0 flex items-center justify-between py-6">
        <span className="font-[family-name:var(--font-inter)] font-semibold text-base tracking-[-0.04em] text-black capitalize">
          H.Studio
        </span>

        {/* Mobile: hamburger */}
        <button className="md:hidden" onClick={() => setMenuOpen(true)} aria-label="Open menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect y="4" width="24" height="2" rx="1" fill="black" />
            <rect y="11" width="24" height="2" rx="1" fill="black" />
            <rect y="18" width="24" height="2" rx="1" fill="black" />
          </svg>
        </button>

        {/* Desktop: nav links */}
        <div className="hidden md:flex items-center gap-14 font-[family-name:var(--font-inter)] font-semibold text-base tracking-[-0.04em] text-black capitalize">
          {navLinks.map((link) => (
            <a key={link} href="#" className="hover:opacity-70 transition-opacity">
              {link}
            </a>
          ))}
        </div>

        {/* Desktop: CTA */}
        <button className="hidden md:flex bg-black text-white font-[family-name:var(--font-inter)] font-medium text-sm tracking-[-0.04em] px-4 py-3 rounded-3xl cursor-pointer hover:bg-zinc-800 transition-colors">
          Let&apos;s talk
        </button>
      </nav>

      {/* Hero content
          Mobile:  justify-end  — name + description pushed to the bottom of the photo
          Desktop: justify-center — name vertically centered in the viewport */}
      <div className="relative flex-1 flex flex-col justify-end pb-6 md:justify-center md:pb-0">

        {/* Name block */}
        <div className="relative flex flex-col w-full">

          {/* "[ Hello I'm ]"
              Mobile:  self-center — sits centered above the name in the flow
              Desktop: absolute top-0 left-[18px] — floats at the top-left of the name block */}
          <p
            className="
              font-[family-name:var(--font-geist-mono)] font-normal text-[14px]
              text-white uppercase mix-blend-overlay leading-[1.1] whitespace-nowrap
              self-center
              md:absolute md:top-0 md:left-[18px] md:self-auto
            "
          >
            [ Hello i&apos;m ]
          </p>

          {/* Harvey Specter — fluid 96 px → 198 px, wraps at the spaces */}
          <p
            className="
              font-[family-name:var(--font-inter)] font-medium text-white
              text-center capitalize mix-blend-overlay w-full whitespace-pre-wrap
              leading-[0.8] tracking-[-0.07em]
              md:leading-[1.1]
            "
            style={{ fontSize: "clamp(96px, 13.75vw, 198px)" }}
          >
            {"Harvey   Specter"}
          </p>
        </div>

        {/* Description + CTA
            Mobile:  in-flow, below the name, horizontally centered
            Desktop: absolute — bottom-right, independent of the centered name */}
        <div className="mt-6 flex justify-center md:absolute md:bottom-16 md:right-0 md:mt-0 md:justify-end">
          <div className="flex flex-col gap-[17px] items-start w-[294px]">
            <p className="font-[family-name:var(--font-inter)] font-bold italic text-[#1f1f1f] text-[14px] tracking-[-0.04em] uppercase leading-[1.1]">
              <span>H.Studio is a </span>
              <span className="font-normal">full-service</span>
              <span>{` creative studio creating beautiful digital experiences and products. We are an `}</span>
              <span className="font-normal">award winning</span>
              <span>{` design and art group specializing in branding, web design and engineering.`}</span>
            </p>
            <button className="bg-black text-white font-[family-name:var(--font-inter)] font-medium text-sm tracking-[-0.04em] px-4 py-3 rounded-3xl cursor-pointer hover:bg-zinc-800 transition-colors">
              Let&apos;s talk
            </button>
          </div>
        </div>
      </div>

    </section>

    {/* Bio / staircase section */}
    <section className="bg-white px-4 py-12 md:px-8 md:py-[120px]">
      <div className="flex flex-col gap-6">

        {/* "[ 8+ years in industry ]" + rule */}
        <div className="flex flex-col gap-3 items-end">
          <span className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">
            [ 8+ years in industry ]
          </span>
          <div className="w-full border-t border-[#1f1f1f]" />
        </div>

        {/* Staircase text */}
        <div className="flex flex-col gap-2 items-center md:items-start">

          {/* Mobile: 001 above line 1 */}
          <span className="md:hidden font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">
            001
          </span>

          {/* Line 1: "A creative director   /" + 001 label (desktop) */}
          <div className="flex gap-3 items-start justify-center md:justify-start">
            <p
              className="font-[family-name:var(--font-inter)] font-light text-black uppercase whitespace-pre leading-[0.84]"
              style={{ fontSize: "clamp(32px, 6.67vw, 96px)", letterSpacing: "-0.08em" }}
            >
              {"A creative director   /"}
            </p>
            <span className="hidden md:block font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] uppercase leading-[1.1] shrink-0 mt-1">
              001
            </span>
          </div>

          {/* Line 2: Photographer */}
          <p
            className="font-[family-name:var(--font-inter)] font-light text-black uppercase whitespace-nowrap leading-[0.84] md:w-full md:pl-[15.55%]"
            style={{ fontSize: "clamp(32px, 6.67vw, 96px)", letterSpacing: "-0.08em" }}
          >
            Photographer
          </p>

          {/* Line 3: Born & raised */}
          <p
            className="font-[family-name:var(--font-inter)] font-light text-black uppercase whitespace-nowrap leading-[0.84] md:w-full md:pl-[44.3%]"
            style={{ fontSize: "clamp(32px, 6.67vw, 96px)", letterSpacing: "-0.08em" }}
          >
            {"Born "}
            <span className="font-[family-name:var(--font-playfair)] italic font-normal">{"&"}</span>
            {" raised"}
          </p>

          {/* Line 4: On the south side */}
          <p
            className="font-[family-name:var(--font-inter)] font-light text-black uppercase whitespace-nowrap leading-[0.84] md:w-full"
            style={{ fontSize: "clamp(32px, 6.67vw, 96px)", letterSpacing: "-0.08em" }}
          >
            On the south side
          </p>

          {/* Line 5: Of chicago. — mobile (stacked) */}
          <div className="md:hidden flex flex-col items-center gap-3">
            <p
              className="font-[family-name:var(--font-inter)] font-light text-black uppercase whitespace-nowrap leading-[0.84]"
              style={{ fontSize: "clamp(32px, 6.67vw, 96px)", letterSpacing: "-0.08em" }}
            >
              Of chicago.
            </p>
            <span className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">
              [ creative freelancer ]
            </span>
          </div>

          {/* Line 5: Of chicago. — desktop (inline with label) */}
          <div className="hidden md:flex items-baseline gap-4 pl-[44%]">
            <p
              className="font-[family-name:var(--font-inter)] font-light text-black uppercase whitespace-nowrap leading-[0.84]"
              style={{ fontSize: "clamp(32px, 6.67vw, 96px)", letterSpacing: "-0.08em" }}
            >
              Of chicago.
            </p>
            <span className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] uppercase leading-[1.1] whitespace-nowrap">
              [ creative freelancer ]
            </span>
          </div>

        </div>
      </div>
    </section>

    {/* About + portrait section */}
    <section className="bg-white px-4 py-12 md:px-8 md:py-[80px]">
      <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">

        {/* [ ABOUT ] — left label, desktop only */}
        <span className="hidden md:block font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] uppercase leading-[1.1] whitespace-nowrap shrink-0">
          [ About ]
        </span>

        {/* Right content block */}
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:gap-8 md:w-[72%]">

          {/* Mobile-only: 002 + [ ABOUT ] labels */}
          <div className="flex flex-col gap-5 md:hidden">
            <span className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">002</span>
            <span className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">[ About ]</span>
          </div>

          {/* Bracketed text frame */}
          <div className="flex gap-3 flex-1 min-w-0">
            {/* Left corners: TL top, BL bottom */}
            <div className="flex flex-col justify-between w-6 shrink-0">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M15 1H1V15" stroke="#1f1f1f" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M15 15H1V1" stroke="#1f1f1f" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="flex-1 min-w-0 py-3 font-[family-name:var(--font-inter)] font-normal text-[14px] leading-[1.3] tracking-[-0.04em] text-[#1f1f1f]">
              Placeholder paragraph one. This is where you introduce yourself — your background, your passion for your craft, and what drives you creatively. Two to three sentences work best here. Placeholder paragraph two. Here you can describe your technical approach, how you collaborate with clients, or what sets your work apart from others in your field.
            </p>
            {/* Right corners: TR top, BR bottom */}
            <div className="flex flex-col justify-between w-6 shrink-0">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M1 1H15V15" stroke="#1f1f1f" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M1 15H15V1" stroke="#1f1f1f" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          {/* Photo column */}
          <div className="flex flex-col shrink-0 md:w-[44%]">
            <span className="hidden md:block mb-6 font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">002</span>
            <div className="relative w-full aspect-[422/594] overflow-hidden">
              <img
                alt=""
                src={aboutImage}
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
    {/* Full-bleed photo section */}
    <section className="relative w-full h-[565px] md:h-[900px] overflow-hidden">
      <img
        alt=""
        src={fullBleedPhoto}
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
    </section>
    {/* Services section */}
    <section className="bg-black px-4 py-12 flex flex-col gap-8 md:px-8 md:py-[80px] md:gap-12">

      {/* [ SERVICES ] */}
      <span className="font-[family-name:var(--font-geist-mono)] text-[14px] text-white uppercase leading-[1.1] whitespace-nowrap">
        [ services ]
      </span>

      {/* [4] ————— DELIVERABLES */}
      <div
        className="flex justify-between items-center uppercase text-white font-[family-name:var(--font-inter)] font-light tracking-[-0.08em] whitespace-nowrap"
        style={{ fontSize: "clamp(32px, 6.67vw, 96px)", lineHeight: "normal" }}
      >
        <span>[4]</span>
        <span>Deliverables</span>
      </div>

      {/* Service rows */}
      <div className="flex flex-col gap-12">
        {services.map((service, i) => (
          <div key={service.num} className="flex flex-col gap-[9px]">

            {/* Number + rule */}
            <div className="flex flex-col gap-[9px]">
              <span className="font-[family-name:var(--font-geist-mono)] text-[14px] text-white uppercase leading-[1.1]">
                {service.num}
              </span>
              <div className="w-full border-t border-white" />
            </div>

            {/* Content — desktop: row (name left, desc+img right); mobile: col */}
            <div className="flex flex-col gap-4 md:flex-row md:flex-wrap md:items-start md:justify-between">
              <p className="font-[family-name:var(--font-inter)] font-bold italic text-[36px] text-white uppercase tracking-[-0.04em] leading-[1.1] whitespace-nowrap">
                {service.name}
              </p>
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-6">
                <p className="font-[family-name:var(--font-inter)] font-normal text-[14px] text-white leading-[1.3] tracking-[-0.04em] md:w-[393px]">
                  Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.
                </p>
                <div className="relative size-[151px] shrink-0 overflow-hidden">
                  <img
                    alt=""
                    src={serviceImages[i]}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>

    </section>

    {/* Selected Work / Portfolio section */}
    <section className="bg-white px-4 py-12 md:px-8 md:py-[80px]">

      {/* Mobile header */}
      <div className="flex flex-col gap-4 mb-8 md:hidden">
        <span className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">
          [ portfolio ]
        </span>
        <div className="flex items-start justify-between">
          <div
            className="font-[family-name:var(--font-inter)] font-light text-black uppercase leading-[0.86] tracking-[-0.08em]"
            style={{ fontSize: "clamp(32px, 6.67vw, 96px)" }}
          >
            <p>Selected</p>
            <p>Work</p>
          </div>
          <span className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] leading-[1.1]">
            004
          </span>
        </div>
      </div>

      {/* Desktop header */}
      <div className="hidden md:flex items-start justify-between mb-[61px]">
        <div className="flex gap-[10px] items-start">
          <div
            className="font-[family-name:var(--font-inter)] font-light text-black uppercase leading-[0.86] tracking-[-0.08em]"
            style={{ fontSize: "clamp(32px, 6.67vw, 96px)" }}
          >
            <p>Selected</p>
            <p>Work</p>
          </div>
          <span className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] leading-[1.1]">
            004
          </span>
        </div>
        <div className="flex h-[110px] w-[15px] items-center justify-center">
          <span className="-rotate-90 font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] uppercase leading-[1.1] whitespace-nowrap">
            [ portfolio ]
          </span>
        </div>
      </div>

      {/* Mobile: all 4 cards stacked + CTA */}
      <div className="flex flex-col gap-6 md:hidden">
        {portfolioProjects.map((project) => (
          <div key={project.name} className="flex flex-col gap-[10px]">
            <div className="relative w-full h-[390px] overflow-hidden">
              <img src={project.img} alt="" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute bottom-4 left-4 flex gap-3">
                {project.tags.map((tag) => (
                  <div key={tag} className="backdrop-blur-[10px] bg-[rgba(255,255,255,0.3)] px-2 py-1 rounded-3xl">
                    <span className="font-[family-name:var(--font-inter)] font-medium text-[14px] text-[#111] tracking-[-0.04em] whitespace-nowrap">
                      {tag}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-[family-name:var(--font-inter)] font-black text-[24px] text-black uppercase tracking-[-0.04em] leading-[1.1] whitespace-nowrap">
                {project.name}
              </p>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true" className="shrink-0">
                <path d="M9 23L23 9M23 9H13M23 9V19" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        ))}

        {/* Mobile CTA */}
        <div className="flex gap-3 items-stretch">
          <div className="flex flex-col justify-between w-6 shrink-0">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M15 1H1V15" stroke="#1f1f1f" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M15 15H1V1" stroke="#1f1f1f" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="flex-1 flex flex-col gap-[10px] py-3">
            <p className="font-[family-name:var(--font-inter)] font-normal italic text-[14px] text-[#1f1f1f] leading-[1.3] tracking-[-0.04em]">
              Discover how my creativity transforms ideas into impactful digital experiences — schedule a call with me to get started.
            </p>
            <button className="bg-black text-white font-[family-name:var(--font-inter)] font-medium text-[14px] tracking-[-0.04em] px-4 py-3 rounded-3xl self-start hover:bg-zinc-800 transition-colors">
              Let&apos;s talk
            </button>
          </div>
          <div className="flex flex-col justify-between w-6 shrink-0">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M1 1H15V15" stroke="#1f1f1f" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M1 15H15V1" stroke="#1f1f1f" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* Desktop: two-column masonry */}
      <div className="hidden md:flex gap-6 items-start">

        {/* Left column: Surfers paradise + Cyberpunk caffe + CTA */}
        <div className="flex-1 flex flex-col gap-6">
          {portfolioProjects.slice(0, 2).map((project) => (
            <div key={project.name} className="flex flex-col gap-[10px]">
              <div className={`relative w-full overflow-hidden ${project.tallDesktop ? "h-[744px]" : "h-[699px]"}`}>
                <img src={project.img} alt="" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute bottom-4 left-4 flex gap-3">
                  {project.tags.map((tag) => (
                    <div key={tag} className="backdrop-blur-[10px] bg-[rgba(255,255,255,0.3)] px-2 py-1 rounded-3xl">
                      <span className="font-[family-name:var(--font-inter)] font-medium text-[14px] text-[#111] tracking-[-0.04em] whitespace-nowrap">
                        {tag}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-[family-name:var(--font-inter)] font-black text-[36px] text-black uppercase tracking-[-0.04em] leading-[1.1] whitespace-nowrap">
                  {project.name}
                </p>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true" className="shrink-0">
                  <path d="M9 23L23 9M23 9H13M23 9V19" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          ))}

          {/* Desktop CTA */}
          <div className="mt-[37px] flex gap-3 items-stretch w-[465px]">
            <div className="flex flex-col justify-between w-6 shrink-0">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M15 1H1V15" stroke="#1f1f1f" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M15 15H1V1" stroke="#1f1f1f" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="flex-1 flex flex-col gap-[10px] py-3">
              <p className="font-[family-name:var(--font-inter)] font-normal italic text-[14px] text-[#1f1f1f] leading-[1.3] tracking-[-0.04em]">
                Discover how my creativity transforms ideas into impactful digital experiences — schedule a call with me to get started.
              </p>
              <button className="bg-black text-white font-[family-name:var(--font-inter)] font-medium text-[14px] tracking-[-0.04em] px-4 py-3 rounded-3xl self-start hover:bg-zinc-800 transition-colors">
                Let&apos;s talk
              </button>
            </div>
            <div className="flex flex-col justify-between w-6 shrink-0">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M1 1H15V15" stroke="#1f1f1f" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M1 15H15V1" stroke="#1f1f1f" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>

        {/* Right column: Agency 976 + Minimal Playground, offset 240px from top */}
        <div className="flex-1 flex flex-col gap-[117px] pt-[240px]">
          {portfolioProjects.slice(2, 4).map((project) => (
            <div key={project.name} className="flex flex-col gap-[10px]">
              <div className={`relative w-full overflow-hidden ${project.tallDesktop ? "h-[744px]" : "h-[699px]"}`}>
                <img src={project.img} alt="" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute bottom-4 left-4 flex gap-3">
                  {project.tags.map((tag) => (
                    <div key={tag} className="backdrop-blur-[10px] bg-[rgba(255,255,255,0.3)] px-2 py-1 rounded-3xl">
                      <span className="font-[family-name:var(--font-inter)] font-medium text-[14px] text-[#111] tracking-[-0.04em] whitespace-nowrap">
                        {tag}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-[family-name:var(--font-inter)] font-black text-[36px] text-black uppercase tracking-[-0.04em] leading-[1.1] whitespace-nowrap">
                  {project.name}
                </p>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true" className="shrink-0">
                  <path d="M9 23L23 9M23 9H13M23 9V19" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          ))}
        </div>

      </div>

    </section>

    {/* Testimonials section */}
    <section className="relative bg-white px-4 py-16 flex flex-col items-center gap-8 md:px-8 md:py-[120px] md:gap-0 md:min-h-[900px] md:justify-center md:overflow-hidden">

      {/* Title */}
      <p
        className="font-[family-name:var(--font-inter)] font-medium capitalize text-black text-center w-full tracking-[-0.07em] leading-[1.1]"
        style={{ fontSize: "clamp(64px, 13.75vw, 198px)" }}
      >
        Testimonials
      </p>

      {/* Mobile: horizontal scroll */}
      <div className="flex gap-4 overflow-x-auto pb-2 w-full md:hidden">
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="shrink-0 w-[260px] bg-[#f1f1f1] border border-[#ddd] rounded-[4px] p-6 flex flex-col gap-4"
            style={{ transform: `rotate(${t.rotate})` }}
          >
            <img src={t.logo} alt="" style={{ height: `${t.logoH}px`, width: "auto" }} />
            <p className="font-[family-name:var(--font-inter)] font-normal text-[18px] text-[#1f1f1f] leading-[1.3] tracking-[-0.04em]">
              {t.text}
            </p>
            <p className="font-[family-name:var(--font-inter)] font-black text-[16px] text-black uppercase tracking-[-0.04em] leading-[1.1] whitespace-nowrap">
              {t.name}
            </p>
          </div>
        ))}
      </div>

      {/* Desktop: scattered absolute cards */}
      {testimonials.map((t) => (
        <div
          key={t.name}
          className="hidden md:flex absolute w-[353px] flex-col gap-4 bg-[#f1f1f1] border border-[#ddd] rounded-[4px] p-6"
          style={{ left: t.left, top: t.top, transform: `rotate(${t.rotate})` }}
        >
          <img src={t.logo} alt="" style={{ height: `${t.logoH}px`, width: "auto" }} />
          <p className="font-[family-name:var(--font-inter)] font-normal text-[18px] text-[#1f1f1f] leading-[1.3] tracking-[-0.04em]">
            {t.text}
          </p>
          <p className="font-[family-name:var(--font-inter)] font-black text-[16px] text-black uppercase tracking-[-0.04em] leading-[1.1] whitespace-nowrap">
            {t.name}
          </p>
        </div>
      ))}

    </section>

    {/* News section */}
    <section className="bg-[#f3f3f3] px-4 py-16 md:px-8 md:py-[120px]">

      {/* Mobile: title + horizontal scroll */}
      <div className="flex flex-col gap-8 md:hidden">
        <p
          className="font-[family-name:var(--font-inter)] font-light text-black uppercase leading-[0.86] tracking-[-0.08em]"
          style={{ fontSize: "clamp(32px, 4.44vw, 64px)" }}
        >
          Keep up with my latest news &amp; achievements
        </p>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {newsImages.map((img) => (
            <div key={img} className="shrink-0 w-[300px] flex flex-col gap-4">
              <div className="relative w-full h-[398px] overflow-hidden">
                <img src={img} alt="" className="absolute inset-0 w-full h-full object-cover" />
              </div>
              <p className="font-[family-name:var(--font-inter)] font-normal text-[14px] text-[#1f1f1f] leading-[1.3] tracking-[-0.04em]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <button className="self-start flex items-center gap-[10px] border-b border-black py-1">
                <span className="font-[family-name:var(--font-inter)] font-medium text-[14px] text-black tracking-[-0.04em] whitespace-nowrap leading-normal">Read more</span>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <path d="M4 14L14 4M14 4H8M14 4V10" stroke="#111" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: rotated title left + staggered cards right */}
      <div className="hidden md:flex items-end gap-8">

        {/* Rotated title block */}
        <div className="shrink-0 w-[110px] h-[706px] flex items-center justify-center">
          <div
            className="font-[family-name:var(--font-inter)] font-light text-black uppercase leading-[0.86] tracking-[-0.08em] whitespace-nowrap -rotate-90"
            style={{ fontSize: "64px" }}
          >
            <p>Keep up with my latest</p>
            <p>news &amp; achievements</p>
          </div>
        </div>

        {/* Three staggered cards with dashed dividers */}
        <div className="flex-1 flex items-start">
          {newsImages.map((img, i) => (
            <Fragment key={img}>
              {i > 0 && (
                <div className="mx-8 shrink-0" style={{ width: "1px", borderLeft: "1px dashed #aaa", minHeight: "540px" }} />
              )}
              <div className={`flex-1 flex flex-col gap-4 ${i === 1 ? "pt-[120px]" : ""}`}>
                <div className="relative w-full h-[469px] overflow-hidden">
                  <img src={img} alt="" className="absolute inset-0 w-full h-full object-cover" />
                </div>
                <p className="font-[family-name:var(--font-inter)] font-normal text-[14px] text-[#1f1f1f] leading-[1.3] tracking-[-0.04em]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <button className="self-start flex items-center gap-[10px] border-b border-black py-1">
                  <span className="font-[family-name:var(--font-inter)] font-medium text-[14px] text-black tracking-[-0.04em] whitespace-nowrap leading-normal">Read more</span>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    <path d="M4 14L14 4M14 4H8M14 4V10" stroke="#111" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </Fragment>
          ))}
        </div>

      </div>

    </section>

    {/* Footer */}
    <footer className="bg-black px-4 pt-12 flex flex-col gap-12 md:px-8 md:pt-[48px] md:gap-[120px]">

      {/* Top block: CTA + socials + rule */}
      <div className="flex flex-col gap-6 md:gap-[48px]">

        {/* Mobile: stacked CTA then socials */}
        <div className="flex flex-col gap-4 md:hidden">
          <div className="flex flex-col gap-3">
            <p className="font-[family-name:var(--font-inter)] font-light italic text-[24px] text-white uppercase tracking-[-0.04em] leading-[1.1]">
              Have a <span className="font-black not-italic">project</span> in mind?
            </p>
            <button className="self-start border border-white text-white font-[family-name:var(--font-inter)] font-medium text-[14px] tracking-[-0.04em] px-4 py-3 rounded-3xl whitespace-nowrap">
              Let&apos;s talk
            </button>
          </div>
          {["Facebook", "Instagram", "X.com", "Linkedin"].map((s) => (
            <p key={s} className="font-[family-name:var(--font-inter)] font-normal text-[18px] text-white uppercase tracking-[-0.04em] leading-[1.1]">
              {s}
            </p>
          ))}
        </div>

        {/* Desktop: 3-column */}
        <div className="hidden md:flex items-start justify-between">
          <div className="flex flex-col gap-3 w-[298px]">
            <p className="font-[family-name:var(--font-inter)] font-light italic text-[24px] text-white uppercase tracking-[-0.04em] leading-[1.1]">
              Have a <span className="font-black not-italic">project</span> in mind?
            </p>
            <button className="self-start border border-white text-white font-[family-name:var(--font-inter)] font-medium text-[14px] tracking-[-0.04em] px-4 py-3 rounded-3xl whitespace-nowrap hover:bg-white hover:text-black transition-colors">
              Let&apos;s talk
            </button>
          </div>
          <div className="w-[298px] text-center font-[family-name:var(--font-inter)] font-normal text-[18px] text-white uppercase tracking-[-0.04em] leading-[1.1]">
            <p>Facebook</p>
            <p>Instagram</p>
          </div>
          <div className="w-[298px] text-right font-[family-name:var(--font-inter)] font-normal text-[18px] text-white uppercase tracking-[-0.04em] leading-[1.1]">
            <p>X.com</p>
            <p>Linkedin</p>
          </div>
        </div>

        {/* Horizontal rule */}
        <div className="w-full border-t border-white" />
      </div>

      {/* Bottom block: brand */}

      {/* Mobile */}
      <div className="flex flex-col items-center gap-4 md:hidden">
        <div className="flex gap-[34px] items-center text-white text-[12px] uppercase tracking-[-0.04em] leading-[1.1] whitespace-nowrap">
          <a href="#" className="underline">Licences</a>
          <a href="#" className="underline">Privacy policy</a>
        </div>
        <div className="w-full flex flex-col gap-3 overflow-hidden">
          <span className="font-[family-name:var(--font-geist-mono)] text-[10px] text-white uppercase leading-[1.1]">
            [ Coded By Claude ]
          </span>
          <p
            className="font-[family-name:var(--font-inter)] font-semibold capitalize text-white leading-[0.8] tracking-[-0.06em] whitespace-nowrap"
            style={{ fontSize: "clamp(91px, 20.14vw, 290px)" }}
          >
            H.Studio
          </p>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden md:flex items-end justify-between">
        <div className="relative h-[219px] overflow-hidden flex-1">
          {/* [ Coded By Claude ] rotated label at left edge */}
          <div className="absolute left-0 top-0 h-full w-5 flex items-center justify-center">
            <span className="-rotate-90 font-[family-name:var(--font-geist-mono)] text-[14px] text-white uppercase leading-[1.1] whitespace-nowrap">
              [ Coded By Claude ]
            </span>
          </div>
          <p
            className="font-[family-name:var(--font-inter)] font-semibold capitalize text-white leading-[0.8] tracking-[-0.06em] whitespace-nowrap"
            style={{ fontSize: "290px" }}
          >
            H.Studio
          </p>
        </div>
        <div className="flex gap-[34px] items-center pb-8 text-white text-[12px] uppercase tracking-[-0.04em] leading-[1.1] whitespace-nowrap shrink-0">
          <a href="#" className="underline">Licences</a>
          <a href="#" className="underline">Privacy policy</a>
        </div>
      </div>

    </footer>
    </>
  );
}
