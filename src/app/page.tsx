import { Fragment } from "react";
import StickyNav from "@/components/StickyNav";
import HeroSection from "@/components/HeroSection";
import { sanityFetch } from "@/sanity/client";
import {
  heroQuery,
  bioQuery,
  aboutQuery,
  settingsQuery,
  servicesQuery,
  portfolioProjectsQuery,
  testimonialsQuery,
  newsItemsQuery,
} from "@/sanity/queries";
import type {
  SanityHero,
  SanityBio,
  SanityAbout,
  SanitySettings,
  SanityService,
  SanityPortfolioProject,
  SanityTestimonial,
  SanityNewsItem,
} from "@/sanity/types";

export const revalidate = 3600;

// ─── Fallback data (used until Sanity content is added) ───────────────────────

const FB_HERO_IMAGE = "https://www.figma.com/api/mcp/asset/7426b46e-aa6c-4fd6-9b95-5f9595d2e444";
const FB_ABOUT_IMAGE = "https://www.figma.com/api/mcp/asset/b63165b3-7ea4-4df7-81d8-7a442dc6a96c";
const FB_FULL_BLEED = "https://www.figma.com/api/mcp/asset/8262a925-4d6c-4be2-935c-00b97c0c0b43";

const FB_SERVICES = [
  { _id: "s1", num: "[ 1 ]", title: "Brand Discovery", description: "Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.", imageUrl: "https://www.figma.com/api/mcp/asset/cd2fc792-3d22-4d70-8171-e5f4d16930e9" },
  { _id: "s2", num: "[ 2 ]", title: "Web design & Dev", description: "Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.", imageUrl: "https://www.figma.com/api/mcp/asset/f1824594-9cc1-470b-b135-f08a0cb62a38" },
  { _id: "s3", num: "[ 3 ]", title: "Marketing", description: "Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.", imageUrl: "https://www.figma.com/api/mcp/asset/a27e3c3c-4a19-48c0-8966-13fb77edd386" },
  { _id: "s4", num: "[ 4 ]", title: "Photography", description: "Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.", imageUrl: "https://www.figma.com/api/mcp/asset/b51a7305-3c91-46fe-8c03-999c2ee2b3a7" },
];

const FB_PORTFOLIO = [
  { _id: "p1", name: "Surfers paradise", tags: ["Social Media", "Photography"], imageUrl: "https://www.figma.com/api/mcp/asset/a838faf4-3e1e-425f-a500-6e95415f4c7d", tallDesktop: true },
  { _id: "p2", name: "Cyberpunk caffe", tags: ["Social Media", "Photography"], imageUrl: "https://www.figma.com/api/mcp/asset/90c6ecea-0f05-43d8-9bf2-13ca728dbe41", tallDesktop: false },
  { _id: "p3", name: "Agency 976", tags: ["Social Media", "Photography"], imageUrl: "https://www.figma.com/api/mcp/asset/764ce36c-1e30-4b3b-8676-5ecb435ff488", tallDesktop: false },
  { _id: "p4", name: "Minimal Playground", tags: ["Social Media", "Photography"], imageUrl: "https://www.figma.com/api/mcp/asset/9ff83d65-0924-49fb-aa67-002cdc9388e1", tallDesktop: true },
];

const FB_TESTIMONIALS = [
  { _id: "t1", logoUrl: "https://www.figma.com/api/mcp/asset/0e6f511f-5c17-4997-a280-82ccf6199618", logoH: 19, quote: "A brilliant creative partner who transformed our vision into a unique, high-impact brand identity. Their ability to craft everything from custom mascots to polished logos is truly impressive.", clientName: "Marko Stojković" },
  { _id: "t2", logoUrl: "https://www.figma.com/api/mcp/asset/ad6a50c0-e2bf-4d6c-9712-8a608f81caca", logoH: 19, quote: "Professional, precise, and incredibly fast at handling complex product visualizations and templates.", clientName: "Lukas Weber" },
  { _id: "t3", logoUrl: "https://www.figma.com/api/mcp/asset/4137eb8b-2c8f-4fac-a972-e5ffffe761ea", logoH: 31, quote: "A strategic partner who balances stunning aesthetics with high-performance UX for complex platforms. They don't just make things look good; they solve business problems through visual clarity.", clientName: "Sarah Jenkins" },
  { _id: "t4", logoUrl: "https://www.figma.com/api/mcp/asset/4abba437-67b2-42ea-9bcb-6d04bfdafaf7", logoH: 36, quote: "An incredibly versatile designer who delivers consistent quality across a wide range of styles and formats.", clientName: "Sofia Martínez" },
];

const FB_NEWS = [
  { _id: "n1", imageUrl: "https://www.figma.com/api/mcp/asset/622cb910-26a1-4fa7-9a1c-61fe4705fdea", summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
  { _id: "n2", imageUrl: "https://www.figma.com/api/mcp/asset/393f3f3b-8a3b-480c-8879-60d5bf404102", summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
  { _id: "n3", imageUrl: "https://www.figma.com/api/mcp/asset/f75547d1-a4d7-4f2c-96e1-2d6fdb901eb2", summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
];

// Card positions are a design decision — not CMS content
const TESTIMONIAL_POSITIONS = [
  { rotate: "-6.85deg", left: "7%", top: "142px" },
  { rotate: "2.9deg", left: "47%", top: "272px" },
  { rotate: "2.23deg", left: "21%", top: "553px" },
  { rotate: "-4.15deg", left: "68.5%", top: "546px" },
];

const navLinks = ["About", "Services", "Projects", "News", "Contact"];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function Home() {
  const [heroData, bioData, aboutData, settingsData, servicesData, portfolioData, testimonialData, newsData] =
    await Promise.all([
      sanityFetch<SanityHero | null>(heroQuery, null),
      sanityFetch<SanityBio | null>(bioQuery, null),
      sanityFetch<SanityAbout | null>(aboutQuery, null),
      sanityFetch<SanitySettings | null>(settingsQuery, null),
      sanityFetch<SanityService[]>(servicesQuery, []),
      sanityFetch<SanityPortfolioProject[]>(portfolioProjectsQuery, []),
      sanityFetch<SanityTestimonial[]>(testimonialsQuery, []),
      sanityFetch<SanityNewsItem[]>(newsItemsQuery, []),
    ]);

  // Merge Sanity data with fallbacks
  const heroImageUrl = heroData?.heroImageUrl || FB_HERO_IMAGE;
  const heroName = heroData?.name || "Harvey   Specter";
  const heroDescription = heroData?.description || null;

  const yearsLabel = bioData?.yearsLabel || "8+ years in industry";
  const bioLine1 = bioData?.line1 || "A creative director   /";
  const bioLine2 = bioData?.line2 || "Photographer";
  const bioLine3 = bioData?.line3 || "Born & raised";
  const bioLine4 = bioData?.line4 || "On the south side";
  const bioLine5 = bioData?.line5 || "Of chicago.";

  const portraitUrl = aboutData?.portraitUrl || FB_ABOUT_IMAGE;
  const aboutBody = aboutData?.body || "Placeholder paragraph one. This is where you introduce yourself — your background, your passion for your craft, and what drives you creatively. Two to three sentences work best here. Placeholder paragraph two. Here you can describe your technical approach, how you collaborate with clients, or what sets your work apart from others in your field.";

  const studioName = settingsData?.studioName || "H.Studio";
  const fullBleedUrl = settingsData?.fullBleedPhotoUrl || FB_FULL_BLEED;

  const services = servicesData.length > 0 ? servicesData : FB_SERVICES;
  const portfolioProjects = portfolioData.length > 0 ? portfolioData : FB_PORTFOLIO;
  const testimonials = testimonialData.length > 0 ? testimonialData : FB_TESTIMONIALS;
  const newsItems = newsData.length > 0 ? newsData : FB_NEWS;

  return (
    <>
    <StickyNav studioName={studioName} navLinks={navLinks} />
    <HeroSection
      heroImageUrl={heroImageUrl}
      heroName={heroName}
      heroDescription={heroDescription}
    />

    {/* Bio / staircase section */}
    <section className="bg-white px-4 py-12 md:px-8 md:py-[120px]">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3 items-end">
          <span className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">
            [ {yearsLabel} ]
          </span>
          <div className="w-full border-t border-[#1f1f1f]" />
        </div>

        <div className="flex flex-col gap-2 items-center md:items-start">
          <span className="md:hidden font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">
            001
          </span>
          <div className="flex gap-3 items-start justify-center md:justify-start">
            <p
              className="font-[family-name:var(--font-inter)] font-light text-black uppercase whitespace-pre leading-[0.84]"
              style={{ fontSize: "clamp(32px, 6.67vw, 96px)", letterSpacing: "-0.08em" }}
            >
              {bioLine1}
            </p>
            <span className="hidden md:block font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] uppercase leading-[1.1] shrink-0 mt-1">
              001
            </span>
          </div>
          <p
            className="font-[family-name:var(--font-inter)] font-light text-black uppercase whitespace-nowrap leading-[0.84] md:w-full md:pl-[15.55%]"
            style={{ fontSize: "clamp(32px, 6.67vw, 96px)", letterSpacing: "-0.08em" }}
          >
            {bioLine2}
          </p>
          <p
            className="font-[family-name:var(--font-inter)] font-light text-black uppercase whitespace-nowrap leading-[0.84] md:w-full md:pl-[44.3%]"
            style={{ fontSize: "clamp(32px, 6.67vw, 96px)", letterSpacing: "-0.08em" }}
          >
            {bioLine3 === "Born & raised" ? (
              <>{"Born "}<span className="font-[family-name:var(--font-playfair)] italic font-normal">{"&"}</span>{" raised"}</>
            ) : bioLine3}
          </p>
          <p
            className="font-[family-name:var(--font-inter)] font-light text-black uppercase whitespace-nowrap leading-[0.84] md:w-full"
            style={{ fontSize: "clamp(32px, 6.67vw, 96px)", letterSpacing: "-0.08em" }}
          >
            {bioLine4}
          </p>
          <div className="md:hidden flex flex-col items-center gap-3">
            <p
              className="font-[family-name:var(--font-inter)] font-light text-black uppercase whitespace-nowrap leading-[0.84]"
              style={{ fontSize: "clamp(32px, 6.67vw, 96px)", letterSpacing: "-0.08em" }}
            >
              {bioLine5}
            </p>
            <span className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">
              [ creative freelancer ]
            </span>
          </div>
          <div className="hidden md:flex items-baseline gap-4 pl-[44%]">
            <p
              className="font-[family-name:var(--font-inter)] font-light text-black uppercase whitespace-nowrap leading-[0.84]"
              style={{ fontSize: "clamp(32px, 6.67vw, 96px)", letterSpacing: "-0.08em" }}
            >
              {bioLine5}
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
        <span className="hidden md:block font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] uppercase leading-[1.1] whitespace-nowrap shrink-0">
          [ About ]
        </span>
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:gap-8 md:w-[72%]">
          <div className="flex flex-col gap-5 md:hidden">
            <span className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">002</span>
            <span className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">[ About ]</span>
          </div>
          <div className="flex gap-3 flex-1 min-w-0">
            <div className="flex flex-col justify-between w-6 shrink-0">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M15 1H1V15" stroke="#1f1f1f" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M15 15H1V1" stroke="#1f1f1f" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="flex-1 min-w-0 py-3 font-[family-name:var(--font-inter)] font-normal text-[14px] leading-[1.3] tracking-[-0.04em] text-[#1f1f1f]">
              {aboutBody}
            </p>
            <div className="flex flex-col justify-between w-6 shrink-0">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M1 1H15V15" stroke="#1f1f1f" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M1 15H15V1" stroke="#1f1f1f" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
          <div className="flex flex-col shrink-0 md:w-[44%]">
            <span className="hidden md:block mb-6 font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">002</span>
            <div className="relative w-full aspect-[422/594] overflow-hidden">
              <img alt="" src={portraitUrl} className="absolute inset-0 w-full h-full object-cover object-center" />
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Full-bleed photo */}
    <section className="relative w-full h-[565px] md:h-[900px] overflow-hidden">
      <img alt="" src={fullBleedUrl} className="absolute inset-0 w-full h-full object-cover object-center" />
    </section>

    {/* Services section */}
    <section id="section-services" className="bg-black px-4 py-12 flex flex-col gap-8 md:px-8 md:py-[80px] md:gap-12">
      <span className="font-[family-name:var(--font-geist-mono)] text-[14px] text-white uppercase leading-[1.1] whitespace-nowrap">
        [ services ]
      </span>
      <div
        className="flex justify-between items-center uppercase text-white font-[family-name:var(--font-inter)] font-light tracking-[-0.08em] whitespace-nowrap"
        style={{ fontSize: "clamp(32px, 6.67vw, 96px)", lineHeight: "normal" }}
      >
        <span>[{services.length}]</span>
        <span>Deliverables</span>
      </div>
      <div className="flex flex-col gap-12">
        {services.map((service) => (
          <div key={service._id} className="flex flex-col gap-[9px]">
            <div className="flex flex-col gap-[9px]">
              <span className="font-[family-name:var(--font-geist-mono)] text-[14px] text-white uppercase leading-[1.1]">
                {service.num}
              </span>
              <div className="w-full border-t border-white" />
            </div>
            <div className="flex flex-col gap-4 md:flex-row md:flex-wrap md:items-start md:justify-between">
              <p className="font-[family-name:var(--font-inter)] font-bold italic text-[36px] text-white uppercase tracking-[-0.04em] leading-[1.1] whitespace-nowrap">
                {service.title}
              </p>
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-6">
                <p className="font-[family-name:var(--font-inter)] font-normal text-[14px] text-white leading-[1.3] tracking-[-0.04em] md:w-[393px]">
                  {service.description}
                </p>
                {service.imageUrl && (
                  <div className="relative size-[151px] shrink-0 overflow-hidden">
                    <img alt="" src={service.imageUrl} className="absolute inset-0 w-full h-full object-cover" />
                  </div>
                )}
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
          <span className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] leading-[1.1]">004</span>
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
          <span className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] leading-[1.1]">004</span>
        </div>
        <div className="flex h-[110px] w-[15px] items-center justify-center">
          <span className="-rotate-90 font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] uppercase leading-[1.1] whitespace-nowrap">
            [ portfolio ]
          </span>
        </div>
      </div>

      {/* Mobile: all cards stacked + CTA */}
      <div className="flex flex-col gap-6 md:hidden">
        {portfolioProjects.map((project) => (
          <div key={project._id} className="flex flex-col gap-[10px]">
            <div className="relative w-full h-[390px] overflow-hidden">
              <img src={project.imageUrl ?? ""} alt="" className="absolute inset-0 w-full h-full object-cover" />
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
        <div className="flex gap-3 items-stretch">
          <div className="flex flex-col justify-between w-6 shrink-0">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M15 1H1V15" stroke="#1f1f1f" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M15 15H1V1" stroke="#1f1f1f" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
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
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M1 1H15V15" stroke="#1f1f1f" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M1 15H15V1" stroke="#1f1f1f" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
        </div>
      </div>

      {/* Desktop: two-column masonry */}
      <div className="hidden md:flex gap-6 items-start">
        <div className="flex-1 flex flex-col gap-6">
          {portfolioProjects.slice(0, 2).map((project) => (
            <div key={project._id} className="flex flex-col gap-[10px]">
              <div className={`relative w-full overflow-hidden ${project.tallDesktop ? "h-[744px]" : "h-[699px]"}`}>
                <img src={project.imageUrl ?? ""} alt="" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute bottom-4 left-4 flex gap-3">
                  {(project.tags ?? []).map((tag) => (
                    <div key={tag} className="backdrop-blur-[10px] bg-[rgba(255,255,255,0.3)] px-2 py-1 rounded-3xl">
                      <span className="font-[family-name:var(--font-inter)] font-medium text-[14px] text-[#111] tracking-[-0.04em] whitespace-nowrap">{tag}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-[family-name:var(--font-inter)] font-black text-[36px] text-black uppercase tracking-[-0.04em] leading-[1.1] whitespace-nowrap">{project.name}</p>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true" className="shrink-0">
                  <path d="M9 23L23 9M23 9H13M23 9V19" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          ))}
          <div className="mt-[37px] flex gap-3 items-stretch w-[465px]">
            <div className="flex flex-col justify-between w-6 shrink-0">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M15 1H1V15" stroke="#1f1f1f" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M15 15H1V1" stroke="#1f1f1f" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
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
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M1 1H15V15" stroke="#1f1f1f" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M1 15H15V1" stroke="#1f1f1f" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-[117px] pt-[240px]">
          {portfolioProjects.slice(2, 4).map((project) => (
            <div key={project._id} className="flex flex-col gap-[10px]">
              <div className={`relative w-full overflow-hidden ${project.tallDesktop ? "h-[744px]" : "h-[699px]"}`}>
                <img src={project.imageUrl ?? ""} alt="" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute bottom-4 left-4 flex gap-3">
                  {(project.tags ?? []).map((tag) => (
                    <div key={tag} className="backdrop-blur-[10px] bg-[rgba(255,255,255,0.3)] px-2 py-1 rounded-3xl">
                      <span className="font-[family-name:var(--font-inter)] font-medium text-[14px] text-[#111] tracking-[-0.04em] whitespace-nowrap">{tag}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-[family-name:var(--font-inter)] font-black text-[36px] text-black uppercase tracking-[-0.04em] leading-[1.1] whitespace-nowrap">{project.name}</p>
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
      <p
        className="font-[family-name:var(--font-inter)] font-medium capitalize text-black text-center w-full tracking-[-0.07em] leading-[1.1]"
        style={{ fontSize: "clamp(64px, 13.75vw, 198px)" }}
      >
        Testimonials
      </p>

      {/* Mobile: horizontal scroll */}
      <div className="flex gap-4 overflow-x-auto pb-2 w-full md:hidden">
        {testimonials.map((t) => {
          const pos = TESTIMONIAL_POSITIONS[testimonials.indexOf(t)] ?? TESTIMONIAL_POSITIONS[0];
          return (
            <div
              key={t._id}
              className="shrink-0 w-[260px] bg-[#f1f1f1] border border-[#ddd] rounded-[4px] p-6 flex flex-col gap-4"
              style={{ transform: `rotate(${pos.rotate})` }}
            >
              {t.logoUrl && <img src={t.logoUrl} alt="" style={{ height: `${t.logoH ?? 20}px`, width: "auto" }} />}
              <p className="font-[family-name:var(--font-inter)] font-normal text-[18px] text-[#1f1f1f] leading-[1.3] tracking-[-0.04em]">
                {t.quote}
              </p>
              <p className="font-[family-name:var(--font-inter)] font-black text-[16px] text-black uppercase tracking-[-0.04em] leading-[1.1] whitespace-nowrap">
                {t.clientName}
              </p>
            </div>
          );
        })}
      </div>

      {/* Desktop: scattered absolute cards */}
      {testimonials.map((t, i) => {
        const pos = TESTIMONIAL_POSITIONS[i] ?? TESTIMONIAL_POSITIONS[0];
        return (
          <div
            key={t._id}
            className="hidden md:flex absolute w-[353px] flex-col gap-4 bg-[#f1f1f1] border border-[#ddd] rounded-[4px] p-6"
            style={{ left: pos.left, top: pos.top, transform: `rotate(${pos.rotate})` }}
          >
            {t.logoUrl && <img src={t.logoUrl} alt="" style={{ height: `${t.logoH ?? 20}px`, width: "auto" }} />}
            <p className="font-[family-name:var(--font-inter)] font-normal text-[18px] text-[#1f1f1f] leading-[1.3] tracking-[-0.04em]">
              {t.quote}
            </p>
            <p className="font-[family-name:var(--font-inter)] font-black text-[16px] text-black uppercase tracking-[-0.04em] leading-[1.1] whitespace-nowrap">
              {t.clientName}
            </p>
          </div>
        );
      })}
    </section>

    {/* News section */}
    <section className="bg-[#f3f3f3] px-4 py-16 md:px-8 md:py-[120px]">

      {/* Mobile */}
      <div className="flex flex-col gap-8 md:hidden">
        <p
          className="font-[family-name:var(--font-inter)] font-light text-black uppercase leading-[0.86] tracking-[-0.08em]"
          style={{ fontSize: "clamp(32px, 4.44vw, 64px)" }}
        >
          Keep up with my latest news &amp; achievements
        </p>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {newsItems.map((item) => (
            <div key={item._id} className="shrink-0 w-[300px] flex flex-col gap-4">
              <div className="relative w-full h-[398px] overflow-hidden">
                <img src={item.imageUrl ?? ""} alt="" className="absolute inset-0 w-full h-full object-cover" />
              </div>
              <p className="font-[family-name:var(--font-inter)] font-normal text-[14px] text-[#1f1f1f] leading-[1.3] tracking-[-0.04em]">
                {item.summary}
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

      {/* Desktop */}
      <div className="hidden md:flex items-end gap-8">
        <div className="shrink-0 w-[110px] h-[706px] flex items-center justify-center">
          <div
            className="font-[family-name:var(--font-inter)] font-light text-black uppercase leading-[0.86] tracking-[-0.08em] whitespace-nowrap -rotate-90"
            style={{ fontSize: "64px" }}
          >
            <p>Keep up with my latest</p>
            <p>news &amp; achievements</p>
          </div>
        </div>
        <div className="flex-1 flex items-start">
          {newsItems.map((item, i) => (
            <Fragment key={item._id}>
              {i > 0 && (
                <div className="mx-8 shrink-0" style={{ width: "1px", borderLeft: "1px dashed #aaa", minHeight: "540px" }} />
              )}
              <div className={`flex-1 flex flex-col gap-4 ${i === 1 ? "pt-[120px]" : ""}`}>
                <div className="relative w-full h-[469px] overflow-hidden">
                  <img src={item.imageUrl ?? ""} alt="" className="absolute inset-0 w-full h-full object-cover" />
                </div>
                <p className="font-[family-name:var(--font-inter)] font-normal text-[14px] text-[#1f1f1f] leading-[1.3] tracking-[-0.04em]">
                  {item.summary}
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
    <footer id="section-footer" className="bg-black px-4 pt-12 flex flex-col gap-12 md:px-8 md:pt-[48px] md:gap-[120px]">
      <div className="flex flex-col gap-6 md:gap-[48px]">
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
            <p key={s} className="font-[family-name:var(--font-inter)] font-normal text-[18px] text-white uppercase tracking-[-0.04em] leading-[1.1]">{s}</p>
          ))}
        </div>
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
        <div className="w-full border-t border-white" />
      </div>

      <div className="flex flex-col items-center gap-4 md:hidden">
        <div className="flex gap-[34px] items-center text-white text-[12px] uppercase tracking-[-0.04em] leading-[1.1] whitespace-nowrap">
          <a href="#" className="underline">Licences</a>
          <a href="#" className="underline">Privacy policy</a>
        </div>
        <div className="w-full flex flex-col gap-3 overflow-hidden">
          <span className="font-[family-name:var(--font-geist-mono)] text-[10px] text-white uppercase leading-[1.1]">[ Coded By Claude ]</span>
          <p
            className="font-[family-name:var(--font-inter)] font-semibold capitalize text-white leading-[0.8] tracking-[-0.06em] whitespace-nowrap"
            style={{ fontSize: "clamp(91px, 20.14vw, 290px)" }}
          >
            {studioName}
          </p>
        </div>
      </div>

      <div className="hidden md:flex items-end justify-between">
        <div className="relative h-[219px] overflow-hidden flex-1">
          <div className="absolute left-0 top-0 h-full w-5 flex items-center justify-center">
            <span className="-rotate-90 font-[family-name:var(--font-geist-mono)] text-[14px] text-white uppercase leading-[1.1] whitespace-nowrap">
              [ Coded By Claude ]
            </span>
          </div>
          <p
            className="font-[family-name:var(--font-inter)] font-semibold capitalize text-white leading-[0.8] tracking-[-0.06em] whitespace-nowrap"
            style={{ fontSize: "290px" }}
          >
            {studioName}
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
