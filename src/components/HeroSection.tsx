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
