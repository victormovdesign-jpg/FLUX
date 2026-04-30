import { sanityFetch } from "@/sanity/client";
import { projectsPageQuery, portfolioProjectsQuery } from "@/sanity/queries";
import type { SanityProjectsPage, SanityPortfolioProject } from "@/sanity/types";
import ProjectsGrid from "@/components/ProjectsGrid";

export const revalidate = 3600;

const FB_PORTFOLIO: SanityPortfolioProject[] = [
  { _id: "p1", name: "Surfers paradise", tags: ["Social Media", "Photography"], imageUrl: "https://www.figma.com/api/mcp/asset/a838faf4-3e1e-425f-a500-6e95415f4c7d", tallDesktop: true },
  { _id: "p2", name: "Cyberpunk caffe", tags: ["Social Media", "Photography"], imageUrl: "https://www.figma.com/api/mcp/asset/90c6ecea-0f05-43d8-9bf2-13ca728dbe41", tallDesktop: false },
  { _id: "p3", name: "Agency 976", tags: ["Social Media", "Photography"], imageUrl: "https://www.figma.com/api/mcp/asset/764ce36c-1e30-4b3b-8676-5ecb435ff488", tallDesktop: false },
  { _id: "p4", name: "Minimal Playground", tags: ["Social Media", "Photography"], imageUrl: "https://www.figma.com/api/mcp/asset/9ff83d65-0924-49fb-aa67-002cdc9388e1", tallDesktop: true },
];

export default async function ProjectsPage() {
  const [pageData, projectsData] = await Promise.all([
    sanityFetch<SanityProjectsPage | null>(projectsPageQuery, null),
    sanityFetch<SanityPortfolioProject[]>(portfolioProjectsQuery, []),
  ]);

  const headline = pageData?.headline || "Selected Work";
  const projects = projectsData.length > 0 ? projectsData : FB_PORTFOLIO;

  return (
    <>
      {/* Page header */}
      <section className="bg-white px-4 pt-[120px] pb-12 md:px-8 md:pt-[160px] md:pb-[80px]">
        <div className="flex justify-between items-start mb-6">
          <span className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">
            [ Projects ]
          </span>
          <span className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">
            {projects.length} projects
          </span>
        </div>
        <p
          className="font-[family-name:var(--font-inter)] font-light text-black uppercase leading-[0.84] tracking-[-0.08em]"
          style={{ fontSize: "clamp(48px, 8.33vw, 120px)" }}
        >
          {headline}
        </p>
      </section>

      {/* Projects grid with tag filter */}
      <section className="bg-white px-4 pb-16 md:px-8 md:pb-[120px]">
        <ProjectsGrid projects={projects} />
      </section>
    </>
  );
}
