import { sanityFetch } from "@/sanity/client";
import { aboutPageQuery, aboutQuery, settingsQuery } from "@/sanity/queries";
import type { SanityAboutPage, SanityAbout, SanitySettings } from "@/sanity/types";

export const revalidate = 3600;

const FB_ABOUT_IMAGE = "https://www.figma.com/api/mcp/asset/b63165b3-7ea4-4df7-81d8-7a442dc6a96c";
const FB_FULL_BLEED = "https://www.figma.com/api/mcp/asset/8262a925-4d6c-4be2-935c-00b97c0c0b43";

const FB_HEADLINE = "About me";
const FB_INTRO =
  "Placeholder paragraph one. This is where you introduce yourself — your background, your passion for your craft, and what drives you creatively. Two to three sentences work best here.\n\nPlaceholder paragraph two. Here you can describe your technical approach, how you collaborate with clients, or what sets your work apart from others in your field.";
const FB_DISCIPLINES = ["Brand Discovery", "Web Design & Dev", "Photography"];

export default async function AboutPage() {
  const [pageData, aboutData, settingsData] = await Promise.all([
    sanityFetch<SanityAboutPage | null>(aboutPageQuery, null),
    sanityFetch<SanityAbout | null>(aboutQuery, null),
    sanityFetch<SanitySettings | null>(settingsQuery, null),
  ]);

  const headline = pageData?.headline || FB_HEADLINE;
  const intro = pageData?.intro || FB_INTRO;
  const disciplines = pageData?.disciplines?.length ? pageData.disciplines : FB_DISCIPLINES;
  const portraitUrl = aboutData?.portraitUrl || FB_ABOUT_IMAGE;
  const fullBleedUrl = settingsData?.fullBleedPhotoUrl || FB_FULL_BLEED;

  return (
    <>
      {/* Page header */}
      <section className="bg-black px-4 pt-[120px] pb-12 md:px-8 md:pt-[160px] md:pb-[80px]">
        <div className="flex justify-between items-start mb-8">
          <span className="font-[family-name:var(--font-geist-mono)] text-[14px] text-white uppercase leading-[1.1]">
            [ About ]
          </span>
          <span className="font-[family-name:var(--font-geist-mono)] text-[14px] text-white uppercase leading-[1.1]">
            003
          </span>
        </div>
        <p
          className="font-[family-name:var(--font-inter)] font-light text-white uppercase leading-[0.84] tracking-[-0.08em]"
          style={{ fontSize: "clamp(48px, 8.33vw, 120px)" }}
        >
          {headline}
        </p>
      </section>

      {/* Portrait + bio */}
      <section className="bg-white px-4 py-12 md:px-8 md:py-[80px]">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-12">
          {/* Left: text + disciplines */}
          <div className="flex-1 flex flex-col gap-6">
            <div className="flex gap-3 flex-1 min-w-0">
              <div className="flex flex-col justify-between w-6 shrink-0">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M15 1H1V15" stroke="#1f1f1f" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M15 15H1V1" stroke="#1f1f1f" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="flex-1 min-w-0 py-3 font-[family-name:var(--font-inter)] font-normal text-[14px] leading-[1.5] tracking-[-0.04em] text-[#1f1f1f] whitespace-pre-line">
                {intro}
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
            <div className="flex flex-wrap gap-2">
              {disciplines.map((d) => (
                <span
                  key={d}
                  className="font-[family-name:var(--font-geist-mono)] text-[12px] text-[#1f1f1f] uppercase leading-[1.1] border border-[#1f1f1f] px-2 py-1 rounded-3xl"
                >
                  [ {d} ]
                </span>
              ))}
            </div>
          </div>

          {/* Right: portrait */}
          <div className="relative w-full md:w-[44%] aspect-[422/594] overflow-hidden shrink-0">
            <img
              alt=""
              src={portraitUrl}
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* Full-bleed divider */}
      <section className="relative w-full h-[400px] md:h-[700px] overflow-hidden">
        <img
          alt=""
          src={fullBleedUrl}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      </section>
    </>
  );
}
