import { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { BlogContent } from "@/components/blog/BlogContent";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Explore articles on AI, Data Science, Full Stack Development, Python, career guidance, and more. Learn from practical insights and tutorials.",
};

async function getArticles() {
  const articles = await prisma.article.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      slug: true,
      title: true,
      excerpt: true,
      category: true,
      readingTime: true,
      createdAt: true,
    },
  });

  return articles;
}

export default async function BlogPage() {
  const articles = await getArticles();

  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className="bg-[#140D08] text-[#FFF6EC] relative overflow-hidden min-h-[50vh] flex items-center">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Large gradient orbs - animated */}
          <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#FF6B1A]/20 via-[#FF6B1A]/5 to-transparent blur-3xl animate-blob" />
          <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-tl from-[#FFC83D]/15 via-[#FFC83D]/5 to-transparent blur-3xl animate-blob" style={{ animationDelay: "-5s" }} />
          <div className="absolute top-1/2 left-1/3 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-[#FF6B1A]/10 to-[#FFC83D]/10 blur-3xl animate-gradient-move" />
          
          {/* Spinning circles */}
          <div className="absolute top-20 left-20 w-[250px] h-[250px] rounded-full border-2 border-[#FF6B1A]/20 animate-spin-slow" />
          <div className="absolute bottom-20 left-32 w-[180px] h-[180px] rounded-full border border-[#FFC83D]/15 animate-spin-slow-reverse" />
          
          {/* Article-like floating elements */}
          <div className="absolute top-[25%] left-[5%] w-48 h-4 rounded-full bg-[#FF6B1A]/15 animate-float" />
          <div className="absolute top-[32%] left-[8%] w-36 h-4 rounded-full bg-[#FFC83D]/10 animate-float" style={{ animationDelay: "0.3s" }} />
          <div className="absolute top-[39%] left-[3%] w-52 h-4 rounded-full bg-[#FF6B1A]/10 animate-float" style={{ animationDelay: "0.6s" }} />
          
          {/* Floating geometric shapes */}
          <div className="absolute top-1/4 left-[15%] w-8 h-8 border-2 border-[#FF6B1A]/30 rounded-lg rotate-45 animate-float" />
          <div className="absolute bottom-1/4 left-[20%] w-10 h-10 border-2 border-[#FFC83D]/25 rounded-xl -rotate-12 animate-float" style={{ animationDelay: "1s" }} />
          
          {/* Glowing dots */}
          <div className="absolute top-1/4 left-1/4 w-3 h-3 rounded-full bg-[#FF6B1A] shadow-[0_0_20px_rgba(255,107,26,0.6)] animate-pulse" />
          <div className="absolute top-1/3 left-[35%] w-2 h-2 rounded-full bg-[#FFC83D] shadow-[0_0_15px_rgba(255,200,61,0.5)] animate-pulse" style={{ animationDelay: "0.5s" }} />
          <div className="absolute bottom-1/3 left-1/4 w-2 h-2 rounded-full bg-[#FF6B1A] shadow-[0_0_15px_rgba(255,107,26,0.4)] animate-pulse" style={{ animationDelay: "1s" }} />
          
          {/* Moving lines */}
          <div className="absolute top-[30%] left-0 w-[200px] h-[2px] bg-gradient-to-r from-transparent via-[#FF6B1A]/30 to-transparent animate-float" style={{ animationDelay: "0.3s" }} />
          <div className="absolute top-[50%] left-[10%] w-[150px] h-[2px] bg-gradient-to-r from-transparent via-[#FFC83D]/25 to-transparent animate-float" style={{ animationDelay: "0.8s" }} />
        </div>

        {/* Grid pattern */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(#22160E 1px, transparent 1px), linear-gradient(90deg, #22160E 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />

        <div className="relative max-w-[1280px] mx-auto px-6 py-20 w-full">
          <nav className="text-sm text-[#A89785] mb-8">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">Blog</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <span className="inline-block bg-[#FF6B1A] text-[#140D08] font-extrabold text-xs tracking-wider px-4 py-2 rounded-full mb-6">
                KNOWLEDGE HUB
              </span>
              <h1
                className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[0.9] tracking-tight mb-6"
                style={{ fontFamily: "var(--font-inter), sans-serif", letterSpacing: "-3px" }}
              >
                Blog &{" "}
                <span className="text-[#FF6B1A] inline-block hover:scale-105 transition-transform cursor-default">Insights</span>
              </h1>
              <p className="text-xl text-[#C9B9A8] max-w-[600px]">
                Insights, tutorials, and resources to help you on your learning
                journey.
              </p>
            </div>

            {/* Right Image */}
            <div className="hidden lg:block relative">
              <div 
                className="relative w-full h-[380px] rounded-[32px] overflow-hidden border-[3px] border-[#3A2A1D]"
                style={{ boxShadow: "12px 12px 0 #FFC83D" }}
              >
                <img
                  src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=90"
                  alt="Writing and learning"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#140D08]/50 to-transparent" />
              </div>
              
              {/* Floating badge */}
              <div 
                className="absolute -bottom-4 -left-4 bg-[#FF6B1A] text-[#140D08] px-5 py-3 rounded-2xl border-[3px] border-[#140D08]"
                style={{ boxShadow: "4px 4px 0 #140D08" }}
              >
                <div className="text-2xl font-extrabold" style={{ fontFamily: "var(--font-inter), sans-serif" }}>{articles.length}+</div>
                <div className="text-xs font-bold">Articles</div>
              </div>
              
              {/* Floating badge 2 */}
              <div 
                className="absolute -top-4 -right-4 bg-[#FFC83D] text-[#140D08] px-5 py-3 rounded-2xl border-[3px] border-[#140D08]"
                style={{ boxShadow: "4px 4px 0 #140D08" }}
              >
                <div className="text-2xl font-extrabold" style={{ fontFamily: "var(--font-inter), sans-serif" }}>Free</div>
                <div className="text-xs font-bold">Resources</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-20 bg-[#FFF6EC] relative overflow-hidden">
        {/* Animated background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Large morphing gradient blobs */}
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-gradient-to-bl from-[#FF6B1A]/10 via-[#FF6B1A]/3 to-transparent rounded-full blur-3xl animate-blob" />
          <div className="absolute -bottom-40 -left-40 w-[450px] h-[450px] bg-gradient-to-tr from-[#FFC83D]/12 via-[#FFC83D]/4 to-transparent rounded-full blur-3xl animate-blob" style={{ animationDelay: "-5s" }} />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-r from-[#FF6B1A]/4 via-transparent to-[#FFC83D]/4 rounded-full blur-3xl animate-gradient-move" />
          
          {/* Article-like decorative lines */}
          <div className="absolute top-32 left-[3%] w-32 h-3 bg-[#FF6B1A]/8 rounded-full" />
          <div className="absolute top-40 left-[3%] w-24 h-3 bg-[#FFC83D]/10 rounded-full" />
          <div className="absolute top-48 left-[3%] w-40 h-3 bg-[#140D08]/5 rounded-full" />
          
          <div className="absolute bottom-32 right-[3%] w-28 h-3 bg-[#FF6B1A]/8 rounded-full" />
          <div className="absolute bottom-40 right-[3%] w-36 h-3 bg-[#FFC83D]/10 rounded-full" />
          <div className="absolute bottom-48 right-[3%] w-20 h-3 bg-[#140D08]/5 rounded-full" />
          
          {/* Floating geometric shapes */}
          <div className="absolute top-20 right-[10%] w-20 h-20 border-2 border-[#FF6B1A]/10 rounded-2xl rotate-12 animate-float" />
          <div className="absolute bottom-32 left-[8%] w-16 h-16 border-2 border-[#FFC83D]/12 rounded-full animate-float" style={{ animationDelay: "1s" }} />
          <div className="absolute top-1/2 right-[5%] w-12 h-12 border border-[#140D08]/5 rounded-xl -rotate-6 animate-float" style={{ animationDelay: "0.5s" }} />
          
          {/* Subtle dots */}
          <div className="absolute top-1/4 left-1/3 w-2 h-2 rounded-full bg-[#FF6B1A]/20" />
          <div className="absolute top-2/5 right-1/4 w-3 h-3 rounded-full bg-[#FFC83D]/15" />
          <div className="absolute bottom-1/4 left-1/4 w-2 h-2 rounded-full bg-[#FF6B1A]/15" />
        </div>
        
        <div className="relative max-w-[1280px] mx-auto px-6">
          <BlogContent articles={articles} />
        </div>
      </section>

      {/* Free Resources Section */}
      <section className="py-16 bg-[#140D08] relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full bg-gradient-to-bl from-[#FF6B1A]/10 to-transparent blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] rounded-full bg-gradient-to-tr from-[#FFC83D]/10 to-transparent blur-3xl" />
        </div>

        <div className="relative max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-10">
            <span className="inline-block bg-[#FF6B1A] text-[#140D08] font-extrabold text-xs tracking-wider px-4 py-2 rounded-full mb-4">
              FREE DOWNLOADS
            </span>
            <h2
              className="text-3xl md:text-4xl font-extrabold text-[#FFF6EC] mb-3"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              Free Learning Resources
            </h2>
            <p className="text-[#C9B9A8] max-w-xl mx-auto">
              Download comprehensive notes and cheat sheets to accelerate your learning journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* SQL Notes */}
            <a
              href="/resources/SQL_Notes.pdf"
              download
              className="group p-6 rounded-2xl bg-[#22160E] border-2 border-[#3A2A1D] hover:border-[#FF6B1A] transition-all hover:translate-y-[-4px]"
              style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.3)" }}
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-[#FF6B1A]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#FF6B1A]/30 transition-colors">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FF6B1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-[#FFF6EC] mb-1 group-hover:text-[#FF6B1A] transition-colors">
                    SQL Complete Notes
                  </h3>
                  <p className="text-sm text-[#A89785] mb-3">
                    Basics to Advanced - DDL, DML, Joins, Window Functions & more
                  </p>
                  <div className="flex items-center gap-2 text-[#FF6B1A] text-sm font-semibold">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    Download PDF
                  </div>
                </div>
              </div>
            </a>

            {/* DBMS & SQL Notes */}
            <a
              href="/resources/DBMS_SQL_Notes.pdf"
              download
              className="group p-6 rounded-2xl bg-[#22160E] border-2 border-[#3A2A1D] hover:border-[#FFC83D] transition-all hover:translate-y-[-4px]"
              style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.3)" }}
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-[#FFC83D]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#FFC83D]/30 transition-colors">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFC83D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <ellipse cx="12" cy="5" rx="9" ry="3" />
                    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-[#FFF6EC] mb-1 group-hover:text-[#FFC83D] transition-colors">
                    DBMS & SQL Notes
                  </h3>
                  <p className="text-sm text-[#A89785] mb-3">
                    27 pages - ER diagrams, Normalization, Transactions, ACID & SQL
                  </p>
                  <div className="flex items-center gap-2 text-[#FFC83D] text-sm font-semibold">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    Download PDF
                  </div>
                </div>
              </div>
            </a>

            {/* DeepBrain AI Guide */}
            <a
              href="/resources/DeepBrain_AI_Guide.pdf"
              download
              className="group p-6 rounded-2xl bg-[#22160E] border-2 border-[#3A2A1D] hover:border-[#FF6B1A] transition-all hover:translate-y-[-4px]"
              style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.3)" }}
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-[#FF6B1A]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#FF6B1A]/30 transition-colors">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FF6B1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a4 4 0 0 1 4 4v1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2V6a4 4 0 0 1 4-4z" />
                    <path d="M9 18h6" />
                    <path d="M10 22h4" />
                    <path d="M12 14v4" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-[#FFF6EC] mb-1 group-hover:text-[#FF6B1A] transition-colors">
                    DeepBrain AI Guide
                  </h3>
                  <p className="text-sm text-[#A89785] mb-3">
                    AI video generation, virtual avatars & text-to-speech technology
                  </p>
                  <div className="flex items-center gap-2 text-[#FF6B1A] text-sm font-semibold">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    Download PDF
                  </div>
                </div>
              </div>
            </a>

            {/* SQL Interview Questions */}
            <a
              href="/blog/sql-interview-questions-complete-guide"
              className="group p-6 rounded-2xl bg-[#22160E] border-2 border-[#3A2A1D] hover:border-[#FFC83D] transition-all hover:translate-y-[-4px]"
              style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.3)" }}
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-[#FFC83D]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#FFC83D]/30 transition-colors">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFC83D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-[#FFF6EC] mb-1 group-hover:text-[#FFC83D] transition-colors">
                    SQL Interview Questions
                  </h3>
                  <p className="text-sm text-[#A89785] mb-3">
                    21 essential questions - backups, replication, normalization
                  </p>
                  <div className="flex items-center gap-2 text-[#FFC83D] text-sm font-semibold">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    Read Article
                  </div>
                </div>
              </div>
            </a>

            {/* DBMS Complete Notes Article */}
            <a
              href="/blog/dbms-sql-complete-notes"
              className="group p-6 rounded-2xl bg-[#22160E] border-2 border-[#3A2A1D] hover:border-[#FF6B1A] transition-all hover:translate-y-[-4px]"
              style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.3)" }}
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-[#FF6B1A]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#FF6B1A]/30 transition-colors">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FF6B1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-[#FFF6EC] mb-1 group-hover:text-[#FF6B1A] transition-colors">
                    DBMS Complete Guide
                  </h3>
                  <p className="text-sm text-[#A89785] mb-3">
                    ER diagrams, Keys, Normalization, Transactions & SQL syntax
                  </p>
                  <div className="flex items-center gap-2 text-[#FF6B1A] text-sm font-semibold">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    Read Article
                  </div>
                </div>
              </div>
            </a>

            {/* DeepBrain AI Article */}
            <a
              href="/blog/deepbrain-ai-complete-guide"
              className="group p-6 rounded-2xl bg-[#22160E] border-2 border-[#3A2A1D] hover:border-[#FFC83D] transition-all hover:translate-y-[-4px]"
              style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.3)" }}
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-[#FFC83D]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#FFC83D]/30 transition-colors">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFC83D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a4 4 0 0 1 4 4v1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2V6a4 4 0 0 1 4-4z" />
                    <path d="M9 18h6" />
                    <path d="M10 22h4" />
                    <path d="M12 14v4" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-[#FFF6EC] mb-1 group-hover:text-[#FFC83D] transition-colors">
                    DeepBrain AI Guide
                  </h3>
                  <p className="text-sm text-[#A89785] mb-3">
                    AI avatars, video generation & NLP technology explained
                  </p>
                  <div className="flex items-center gap-2 text-[#FFC83D] text-sm font-semibold">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    Read Article
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
