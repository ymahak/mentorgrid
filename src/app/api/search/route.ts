import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q") || "";
    const type = searchParams.get("type") || "all"; // all, courses, articles

    if (query.length < 2) {
      return NextResponse.json({
        success: true,
        data: [],
        message: "Query must be at least 2 characters",
      });
    }

    const results: Array<{
      type: "course" | "article";
      id: string;
      slug: string;
      title: string;
      description: string;
      category?: string;
    }> = [];

    // Search courses
    if (type === "all" || type === "courses") {
      const courses = await prisma.course.findMany({
        where: {
          isVisible: true,
          OR: [
            { title: { contains: query } },
            { description: { contains: query } },
            { technologies: { contains: query } },
          ],
        },
        select: {
          id: true,
          slug: true,
          title: true,
          description: true,
        },
        take: 10,
      });

      results.push(
        ...courses.map((course) => ({
          type: "course" as const,
          id: course.id,
          slug: course.slug,
          title: course.title,
          description: course.description,
        }))
      );
    }

    // Search articles
    if (type === "all" || type === "articles") {
      const articles = await prisma.article.findMany({
        where: {
          isPublished: true,
          OR: [
            { title: { contains: query } },
            { excerpt: { contains: query } },
            { content: { contains: query } },
            { category: { contains: query } },
          ],
        },
        select: {
          id: true,
          slug: true,
          title: true,
          excerpt: true,
          category: true,
        },
        take: 10,
      });

      results.push(
        ...articles.map((article) => ({
          type: "article" as const,
          id: article.id,
          slug: article.slug,
          title: article.title,
          description: article.excerpt,
          category: article.category,
        }))
      );
    }

    return NextResponse.json({
      success: true,
      data: results,
      total: results.length,
    });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { success: false, error: "Search failed" },
      { status: 500 }
    );
  }
}
