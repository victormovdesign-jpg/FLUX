"use client";

import { useState } from "react";
import type { SanityPortfolioProject } from "@/sanity/types";

interface ProjectsGridProps {
  projects: SanityPortfolioProject[];
}

function ProjectCard({ project }: { project: SanityPortfolioProject }) {
  return (
    <div className="flex flex-col gap-[10px]">
      <div className="relative w-full aspect-[3/4] overflow-hidden">
        <img
          src={project.imageUrl ?? ""}
          alt={project.name ?? ""}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {(project.tags ?? []).length > 0 && (
          <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
            {(project.tags ?? []).map((tag) => (
              <div key={tag} className="backdrop-blur-[10px] bg-[rgba(255,255,255,0.3)] px-2 py-1 rounded-3xl">
                <span className="font-[family-name:var(--font-inter)] font-medium text-[14px] text-[#111] tracking-[-0.04em] whitespace-nowrap">
                  {tag}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <p className="font-[family-name:var(--font-inter)] font-black text-[24px] md:text-[36px] text-black uppercase tracking-[-0.04em] leading-[1.1]">
            {project.name}
          </p>
          {(project.client || project.year) && (
            <span className="font-[family-name:var(--font-geist-mono)] text-[12px] text-[#555] uppercase leading-[1.1]">
              {[project.client, project.year].filter(Boolean).join(" · ")}
            </span>
          )}
        </div>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true" className="shrink-0">
          <path d="M9 23L23 9M23 9H13M23 9V19" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = Array.from(new Set(projects.flatMap((p) => p.tags ?? [])));

  const filtered = activeTag ? projects.filter((p) => (p.tags ?? []).includes(activeTag)) : projects;

  const leftCol = filtered.filter((_, i) => i % 2 === 0);
  const rightCol = filtered.filter((_, i) => i % 2 !== 0);

  return (
    <div className="flex flex-col gap-8">
      {/* Tag filter */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTag(null)}
            className={`px-3 py-1.5 rounded-3xl font-[family-name:var(--font-inter)] font-medium text-[14px] tracking-[-0.04em] transition-colors ${
              activeTag === null
                ? "bg-black text-white"
                : "border border-black text-black hover:bg-zinc-100"
            }`}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag === activeTag ? null : tag)}
              className={`px-3 py-1.5 rounded-3xl font-[family-name:var(--font-inter)] font-medium text-[14px] tracking-[-0.04em] transition-colors ${
                activeTag === tag
                  ? "bg-black text-white"
                  : "border border-black text-black hover:bg-zinc-100"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* Mobile: stacked */}
      <div className="flex flex-col gap-6 md:hidden">
        {filtered.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>

      {/* Desktop: two-column */}
      <div className="hidden md:flex gap-6 items-start">
        <div className="flex-1 flex flex-col gap-6">
          {leftCol.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
        <div className="flex-1 flex flex-col gap-6 pt-[120px]">
          {rightCol.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}
