import { sanityFetch } from "@/sanity/client";
import { servicesPageQuery, servicesQuery } from "@/sanity/queries";
import type { SanityServicesPage, SanityService } from "@/sanity/types";

export const revalidate = 3600;

const FB_SERVICES: SanityService[] = [
  { _id: "s1", num: "[ 1 ]", title: "Brand Discovery", description: "Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.", imageUrl: "https://www.figma.com/api/mcp/asset/cd2fc792-3d22-4d70-8171-e5f4d16930e9" },
  { _id: "s2", num: "[ 2 ]", title: "Web design & Dev", description: "Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.", imageUrl: "https://www.figma.com/api/mcp/asset/f1824594-9cc1-470b-b135-f08a0cb62a38" },
  { _id: "s3", num: "[ 3 ]", title: "Marketing", description: "Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.", imageUrl: "https://www.figma.com/api/mcp/asset/a27e3c3c-4a19-48c0-8966-13fb77edd386" },
  { _id: "s4", num: "[ 4 ]", title: "Photography", description: "Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.", imageUrl: "https://www.figma.com/api/mcp/asset/b51a7305-3c91-46fe-8c03-999c2ee2b3a7" },
];

export default async function ServicesPage() {
  const [pageData, servicesData] = await Promise.all([
    sanityFetch<SanityServicesPage | null>(servicesPageQuery, null),
    sanityFetch<SanityService[]>(servicesQuery, []),
  ]);

  const headline = pageData?.headline || "What we do";
  const services = servicesData.length > 0 ? servicesData : FB_SERVICES;

  return (
    <>
      {/* Page header */}
      <section data-nav-dark className="bg-black px-4 pt-[120px] pb-12 md:px-8 md:pt-[160px] md:pb-[80px]">
        <span className="font-[family-name:var(--font-geist-mono)] text-[14px] text-white uppercase leading-[1.1] block mb-8">
          [ Services ]
        </span>
        <div className="flex items-end justify-between gap-4">
          <p
            className="font-[family-name:var(--font-inter)] font-light text-white uppercase leading-[0.84] tracking-[-0.08em]"
            style={{ fontSize: "clamp(48px, 8.33vw, 120px)" }}
          >
            {headline}
          </p>
          <span
            className="font-[family-name:var(--font-inter)] font-light text-white uppercase leading-[0.84] tracking-[-0.08em] whitespace-nowrap shrink-0"
            style={{ fontSize: "clamp(24px, 4.16vw, 60px)" }}
          >
            [{services.length}] Deliverables
          </span>
        </div>
      </section>

      {/* Services list */}
      <section className="bg-white px-4 py-12 md:px-8 md:py-[80px]">
        <div className="flex flex-col gap-16">
          {services.map((service) => (
            <div key={service._id} className="flex flex-col gap-4">
              <span className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">
                {service.num}
              </span>
              <div className="w-full border-t border-[#1f1f1f]" />
              <p className="font-[family-name:var(--font-inter)] font-bold italic text-[36px] md:text-[48px] text-black uppercase tracking-[-0.04em] leading-[1.1]">
                {service.title}
              </p>
              <p className="font-[family-name:var(--font-inter)] font-normal text-[14px] text-[#1f1f1f] leading-[1.5] tracking-[-0.04em] max-w-[600px]">
                {service.description}
              </p>
              {service.imageUrl && (
                <div className="relative w-full aspect-[16/9] mt-4 overflow-hidden">
                  <img
                    alt=""
                    src={service.imageUrl}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA block */}
      <section data-nav-dark className="bg-black px-4 py-16 md:px-8 md:py-[80px] flex flex-col items-center gap-6 text-center">
        <p className="font-[family-name:var(--font-inter)] font-light italic text-[24px] md:text-[32px] text-white uppercase tracking-[-0.04em] leading-[1.1]">
          Have a <span className="font-black not-italic">project</span> in mind?
        </p>
        <button className="border border-white text-white font-[family-name:var(--font-inter)] font-medium text-[14px] tracking-[-0.04em] px-6 py-3 rounded-3xl hover:bg-white hover:text-black transition-colors cursor-pointer">
          Let&apos;s talk
        </button>
      </section>
    </>
  );
}
