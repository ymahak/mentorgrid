import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

// GET single course
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const course = await prisma.course.findUnique({
      where: { id },
      include: {
        modules: {
          orderBy: { order: "asc" },
        },
      },
    });

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    return NextResponse.json(course);
  } catch (error) {
    console.error("Error fetching course:", error);
    return NextResponse.json({ error: "Failed to fetch course" }, { status: 500 });
  }
}

// PUT update course
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
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

    // Check if slug already exists for another course
    const existingCourse = await prisma.course.findFirst({
      where: {
        slug,
        NOT: { id },
      },
    });

    if (existingCourse) {
      return NextResponse.json({ error: "A course with this slug already exists" }, { status: 400 });
    }

    // Delete existing modules and recreate
    await prisma.module.deleteMany({
      where: { courseId: id },
    });

    const course = await prisma.course.update({
      where: { id },
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
        isVisible,
        order,
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

    return NextResponse.json(course);
  } catch (error) {
    console.error("Error updating course:", error);
    return NextResponse.json({ error: "Failed to update course" }, { status: 500 });
  }
}

// DELETE course
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    
    // Delete modules first
    await prisma.module.deleteMany({
      where: { courseId: id },
    });

    // Delete course
    await prisma.course.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting course:", error);
    return NextResponse.json({ error: "Failed to delete course" }, { status: 500 });
  }
}
