import Link from "next/link";
import { prisma } from "@/lib/prisma";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { Plus, Edit, Eye, EyeOff } from "lucide-react";

// Use dynamic rendering to avoid build-time database queries
export const dynamic = 'force-dynamic';

async function getCourses() {
  return prisma.course.findMany({
    orderBy: { order: "asc" },
    include: {
      modules: {
        select: { id: true },
      },
    },
  });
}

export default async function CoursesAdminPage() {
  const courses = await getCourses();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">Courses</h1>
        <Link href="/admin/dashboard/courses/new">
          <Button variant="primary" size="md">
            <Plus size={18} className="mr-2" />
            Add Course
          </Button>
        </Link>
      </div>

      <div className="grid gap-4">
        {courses.map((course) => (
          <Card key={course.id} padding="md">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-white">{course.title}</h3>
                  <Badge variant={course.isVisible ? "success" : "warning"} size="sm">
                    {course.isVisible ? "Visible" : "Hidden"}
                  </Badge>
                  <Badge variant="secondary" size="sm">{course.level}</Badge>
                </div>
                <p className="text-text-secondary text-sm mb-2">{course.description}</p>
                <div className="flex items-center gap-4 text-text-muted text-sm">
                  <span>{course.modules.length} modules</span>
                  <span>{course.duration}</span>
                  <span>Order: {course.order}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Link href={`/courses/${course.slug}`} target="_blank">
                  <Button variant="ghost" size="sm">
                    <Eye size={16} />
                  </Button>
                </Link>
                <Link href={`/admin/dashboard/courses/${course.id}/edit`}>
                  <Button variant="outline" size="sm">
                    <Edit size={16} className="mr-1" />
                    Edit
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        ))}

        {courses.length === 0 && (
          <Card padding="lg">
            <div className="text-center py-8">
              <p className="text-text-secondary mb-4">No courses yet.</p>
              <Link href="/admin/dashboard/courses/new">
                <Button variant="primary">Create your first course</Button>
              </Link>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
