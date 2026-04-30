import { sanityFetch } from "@/sanity/client";
import { newsPageQuery, newsItemsQuery } from "@/sanity/queries";
import type { SanityNewsPage, SanityNewsItem } from "@/sanity/types";

export const revalidate = 3600;

const FB_NEWS: SanityNewsItem[] = [
  { _id: "n1", title: "Studio News", date: "2024-03-01", imageUrl: "https://www.figma.com/api/mcp/asset/622cb910-26a1-4fa7-9a1c-61fe4705fdea", summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
  { _id: "n2", title: "Featured Work", date: "2024-02-15", imageUrl: "https://www.figma.com/api/mcp/asset/393f3f3b-8a3b-480c-8879-60d5bf404102", summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
  { _id: "n3", title: "Award Winner", date: "2024-01-10", imageUrl: "https://www.figma.com/api/mcp/asset/f75547d1-a4d7-4f2c-96e1-2d6fdb901eb2", summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
];

export default async function NewsPage() {
  const [pageData, newsData] = await Promise.all([
    sanityFetch<SanityNewsPage | null>(newsPageQuery, null),
    sanityFetch<SanityNewsItem[]>(newsItemsQuery, []),
  ]);

  const headline = pageData?.headline || "Latest News";
  const items = newsData.length > 0 ? newsData : FB_NEWS;

  return (
    <>
      {/* Page header */}
      <section className="bg-white px-4 pt-[120px] pb-12 md:px-8 md:pt-[160px] md:pb-[80px]">
        <span className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] uppercase leading-[1.1] block mb-8">
          [ News ]
        </span>
        <p
          className="font-[family-name:var(--font-inter)] font-light text-black uppercase leading-[0.84] tracking-[-0.08em]"
          style={{ fontSize: "clamp(48px, 8.33vw, 120px)" }}
        >
          {headline}
        </p>
      </section>

      {/* News grid */}
      <section className="bg-white px-4 pb-16 md:px-8 md:pb-[120px]">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          {items.map((item) => {
            const year = item.date ? item.date.slice(0, 4) : null;
            return (
              <div key={item._id} className="flex flex-col gap-4">
                <div className="relative w-full aspect-[3/4] overflow-hidden">
                  <img
                    src={item.imageUrl ?? ""}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                {year && (
                  <span className="font-[family-name:var(--font-geist-mono)] text-[12px] text-[#555] uppercase leading-[1.1]">
                    [ {year} ]
                  </span>
                )}
                {item.title && (
                  <p className="font-[family-name:var(--font-inter)] font-black text-[20px] text-black uppercase tracking-[-0.04em] leading-[1.1]">
                    {item.title}
                  </p>
                )}
                <p className="font-[family-name:var(--font-inter)] font-normal text-[14px] text-[#1f1f1f] leading-[1.5] tracking-[-0.04em]">
                  {item.summary}
                </p>
                {item.externalUrl ? (
                  <a
                    href={item.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="self-start flex items-center gap-[10px] border-b border-black py-1"
                  >
                    <span className="font-[family-name:var(--font-inter)] font-medium text-[14px] text-black tracking-[-0.04em] whitespace-nowrap leading-normal">
                      Read more
                    </span>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                      <path d="M4 14L14 4M14 4H8M14 4V10" stroke="#111" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                ) : null}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
