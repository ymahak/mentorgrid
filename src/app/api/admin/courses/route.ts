import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

// GET all courses (admin)
export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const courses = await prisma.course.findMany({
      orderBy: { order: "asc" },
      include: {
        modules: {
          orderBy: { order: "asc" },
        },
      },
    });

    return NextResponse.json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 });
  }
}

// POST create new course
export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      title,
      slug,
      description,
      overview,
      level,
      duration,
      technologies,
      prerequisites,
      whoShouldEnroll,
      learningOutcomes,
      isVisible,
      order,
      modules,
    } = body;

    // Check if slug already exists
    const existingCourse = await prisma.course.findUnique({
      where: { slug },
    });

    if (existingCourse) {
      return NextResponse.json({ error: "A course with this slug already exists" }, { status: 400 });
    }

    const course = await prisma.course.create({
      data: {
        title,
        slug,
        description,
        overview,
        level,
        duration,
        technologies,
        prerequisites,
        whoShouldEnroll,
        learningOutcomes,
        isVisible: isVisible ?? true,
        order: order ?? 1,
        modules: {
          create: modules?.map((m: { title: string; description: string; topics: string[]; order: number }) => ({
            title: m.title,
            description: m.description,
            topics: m.topics.filter((t: string) => t.trim()),
            order: m.order,
          })) || [],
        },
      },
      include: {
        modules: true,
      },
    });

    return NextResponse.json(course, { status: 201 });
  } catch (error) {
    console.error("Error creating course:", error);
    return NextResponse.json({ error: "Failed to create course" }, { status: 500 });
  }
}
