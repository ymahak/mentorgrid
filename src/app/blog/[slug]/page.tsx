import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { ArticleContent } from "@/components/blog/ArticleContent";
import { formatDate } from "@/lib/utils";
import { ArticleSchema, BreadcrumbSchema } from "@/components/seo/SchemaMarkup";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getArticle(slug: string) {
  const article = await prisma.article.findUnique({
    where: { slug, isPublished: true },
  });

  return article;
}

async function getRelatedArticles(category: string, currentSlug: string) {
  const articles = await prisma.article.findMany({
    where: {
      category,
      isPublished: true,
      slug: { not: currentSlug },
    },
    take: 2,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      slug: true,
      title: true,
      excerpt: true,
      readingTime: true,
    },
  });

  return articles;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    return { title: "Article Not Found" };
  }

  return {
    title: article.title,
    description: article.excerpt,
  };
}

export async function generateStaticParams() {
  const articles = await prisma.article.findMany({
    where: { isPublished: true },
    select: { slug: true },
  });

  return articles.map((article) => ({
    slug: article.slug,
  }));
}

const categoryColors: Record<string, string> = {
  "AI & Machine Learning": "#FF6B1A",
  "Artificial Intelligence": "#FF6B1A",
  "Data Science": "#FFC83D",
  "Full Stack Development": "#FFC83D",
  "Python Programming": "#FF6B1A",
  "Career Guidance": "#FFC83D",
  "Interview Preparation": "#FF6B1A",
  "Learning Resources": "#FFC83D",
};

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = await getRelatedArticles(article.category, slug);

  return (
    <PageWrapper>
      {/* SEO Schema */}
      <ArticleSchema
        headline={article.title}
        description={article.excerpt}
        author="Mahak Yadav"
        datePublished={article.createdAt.toISOString()}
        dateModified={article.updatedAt.toISOString()}
        url={`https://mahakyadav.vercel.app/blog/${article.slug}`}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://mahakyadav.vercel.app" },
          { name: "Blog", url: "https://mahakyadav.vercel.app/blog" },
          { name: article.title, url: `https://mahakyadav.vercel.app/blog/${article.slug}` },
        ]}
      />
      
      {/* Compact Header */}
      <section className="bg-[#140D08] text-[#FFF6EC] relative overflow-hidden">
        {/* Subtle animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-[300px] h-[300px] rounded-full bg-gradient-to-br from-[#FF6B1A]/10 to-transparent blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-[250px] h-[250px] rounded-full bg-gradient-to-tr from-[#FFC83D]/8 to-transparent blur-3xl" />
        </div>
        
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(#22160E 1px, transparent 1px), linear-gradient(90deg, #22160E 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative max-w-[1400px] mx-auto px-6 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[10px] text-[#A89785] mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-[#C9B9A8] truncate max-w-[200px]">{article.title}</span>
          </nav>

          {/* Article Header */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex-1">
              <span
                className="inline-block font-bold text-[9px] tracking-wider px-2.5 py-1 rounded-full mb-3 text-[#140D08] uppercase"
                style={{ backgroundColor: categoryColors[article.category] || "#FFC83D" }}
              >
                {article.category}
              </span>
              <h1
                className="text-xl md:text-2xl lg:text-3xl font-extrabold leading-tight tracking-tight"
                style={{ fontFamily: "var(--font-inter), sans-serif", letterSpacing: "-0.5px" }}
              >
                {article.title}
              </h1>
            </div>
            
            {/* Meta Info - Right Side */}
            <div className="flex md:flex-col items-center md:items-end gap-3 md:gap-1 text-[10px] text-[#A89785] md:text-right flex-shrink-0">
              <span>{formatDate(article.createdAt)}</span>
              <span className="flex items-center gap-1">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#FF6B1A" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                {article.readingTime} min
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-6 bg-[#FFF6EC]">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid lg:grid-cols-4 gap-5">
            {/* Main Content - 3/4 width */}
            <div className="lg:col-span-3">
              <div
                className="bg-white rounded-xl p-5 border-2 border-[#140D08]"
                style={{ boxShadow: "3px 3px 0 #140D08" }}
              >
                <ArticleContent content={article.content} category={article.category} />
              </div>
            </div>

            {/* Sidebar - 1/4 width - Sticky */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-24 space-y-3">
                {/* Quick Info */}
                <div
                  className="bg-white rounded-lg p-3 border-2 border-[#140D08]"
                  style={{ boxShadow: "2px 2px 0 #FFC83D" }}
                >
                  <h3 className="text-[10px] font-bold text-[#6B5847] uppercase tracking-wider mb-2">Article Info</h3>
                  <div className="space-y-1.5 text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-[#6B5847]">Category</span>
                      <span className="font-semibold text-[#FF6B1A]">{article.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#6B5847]">Read time</span>
                      <span className="font-semibold text-[#140D08]">{article.readingTime} min</span>
                    </div>
                  </div>
                </div>

                {/* Summary */}
                <div className="bg-gradient-to-br from-[#FF6B1A]/8 to-[#FFC83D]/8 rounded-lg p-3 border border-[#E3CDB4]">
                  <h3 className="text-[10px] font-bold text-[#140D08] uppercase tracking-wider mb-1.5">Summary</h3>
                  <p className="text-[10px] text-[#4A3626] leading-relaxed line-clamp-4">
                    {article.excerpt}
                  </p>
                </div>

                {/* CTA */}
                <div className="bg-[#140D08] rounded-lg p-3 text-center">
                  <p className="text-[9px] text-[#A89785] mb-2">Want to master this topic?</p>
                  <Link
                    href="/courses"
                    className="block w-full px-3 py-2 bg-[#FF6B1A] text-[#140D08] text-[10px] font-bold rounded-md hover:bg-[#FFC83D] transition-colors"
                  >
                    Explore Courses
                  </Link>
                </div>

                {/* Back Button */}
                <Link
                  href="/blog"
                  className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-md bg-white border border-[#140D08] text-[#140D08] font-semibold hover:bg-[#FFC83D] transition-colors text-[10px]"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                  Back to Blog
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles - Compact */}
      {relatedArticles.length > 0 && (
        <section className="py-5 bg-[#FFF6EC] border-t border-[#E3CDB4]">
          <div className="max-w-[1400px] mx-auto px-6">
            <h2 className="text-xs font-bold text-[#140D08] mb-3 uppercase tracking-wider">
              Related Articles
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {relatedArticles.map((related) => (
                <Link key={related.id} href={`/blog/${related.slug}`}>
                  <article
                    className="p-3 rounded-lg bg-white border border-[#140D08] hover:border-[#FF6B1A] hover:translate-y-[-2px] transition-all"
                    style={{ boxShadow: "2px 2px 0 #E3CDB4" }}
                  >
                    <h3 className="text-[11px] font-bold text-[#140D08] mb-1 line-clamp-2">
                      {related.title}
                    </h3>
                    <p className="text-[9px] text-[#6B5847] line-clamp-2 mb-2">
                      {related.excerpt.slice(0, 80)}...
                    </p>
                    <span className="text-[#FF6B1A] text-[9px] font-bold">
                      Read more →
                    </span>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </PageWrapper>
  );
}
