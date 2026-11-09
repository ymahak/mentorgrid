"use client";

import { useState } from "react";
import Link from "next/link";
import { blogCategories } from "@/lib/constants";
import { formatDate } from "@/lib/utils";

interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readingTime: number;
  createdAt: Date;
}

const categoryColors: Record<string, string> = {
  "AI & Machine Learning": "#FF6B1A",
  "Artificial Intelligence": "#FF6B1A",
  "Data Science": "#FFC83D",
  "Full Stack Development": "#FFF6EC",
  Python: "#FF6B1A",
  "Python Programming": "#FF6B1A",
  "Career Guidance": "#FFC83D",
  "Industry Insights": "#FFF6EC",
  "Interview Preparation": "#FF6B1A",
  "Learning Resources": "#FFC83D",
};

export function BlogContent({ articles }: { articles: Article[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredArticles =
    selectedCategory === "All"
      ? articles
      : articles.filter((article) => article.category === selectedCategory);

  return (
    <>
      {/* Categories */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        <button
          onClick={() => setSelectedCategory("All")}
          className={`px-5 py-2 rounded-full text-sm font-bold cursor-pointer border-[2px] border-[#140D08] transition-colors ${
            selectedCategory === "All"
              ? "bg-[#FF6B1A] text-[#140D08]"
              : "bg-white text-[#140D08] hover:bg-[#FFC83D]"
          }`}
        >
          All
        </button>
        {blogCategories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-5 py-2 rounded-full text-sm font-medium cursor-pointer border-[2px] border-[#140D08] transition-colors ${
              selectedCategory === category
                ? "bg-[#FF6B1A] text-[#140D08] font-bold"
                : "bg-white text-[#140D08] hover:bg-[#FFC83D]"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      {filteredArticles.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <Link key={article.id} href={`/blog/${article.slug}`}>
              <article
                className="h-full flex flex-col p-6 rounded-[24px] bg-white border-[3px] border-[#140D08] hover:translate-x-[-4px] hover:translate-y-[-4px] transition-transform cursor-pointer"
                style={{ boxShadow: "6px 6px 0 #140D08" }}
              >
                {/* Category */}
                <span
                  className="self-start px-3 py-1 rounded-full text-xs font-bold text-[#140D08] mb-4"
                  style={{
                    backgroundColor:
                      categoryColors[article.category] || "#FFC83D",
                  }}
                >
                  {article.category}
                </span>

                {/* Title */}
                <h3
                  className="text-xl font-extrabold text-[#140D08] mb-3"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}
                >
                  {article.title}
                </h3>

                {/* Excerpt */}
                <p className="text-[#6B5847] text-sm mb-4 flex-grow line-clamp-3">
                  {article.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center justify-between pt-4 border-t border-[#E3CDB4]">
                  <span className="text-[#A89785] text-sm">
                    {formatDate(article.createdAt)}
                  </span>
                  <span className="text-[#A89785] text-sm flex items-center gap-1">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#FF6B1A"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    {article.readingTime} min read
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div
            className="w-20 h-20 rounded-full bg-[#FFC83D] flex items-center justify-center mx-auto mb-6 border-[3px] border-[#140D08]"
            style={{ boxShadow: "4px 4px 0 #140D08" }}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#140D08"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
          </div>
          <h3
            className="text-2xl font-extrabold text-[#140D08] mb-2"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            {selectedCategory === "All" ? "Coming Soon!" : "No articles found"}
          </h3>
          <p className="text-[#6B5847]">
            {selectedCategory === "All"
              ? "No articles published yet. Check back soon!"
              : `No articles in "${selectedCategory}" category yet.`}
          </p>
          {selectedCategory !== "All" && (
            <button
              onClick={() => setSelectedCategory("All")}
              className="mt-4 px-6 py-2 rounded-full bg-[#FF6B1A] text-[#140D08] font-bold border-[2px] border-[#140D08] hover:scale-105 transition-transform"
            >
              View All Articles
            </button>
          )}
        </div>
      )}
    </>
  );
}
