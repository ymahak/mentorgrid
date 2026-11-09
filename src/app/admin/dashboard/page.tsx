import { prisma } from "@/lib/prisma";
import Card from "@/components/ui/Card";
import { MessageSquare, BookOpen, FileText, Users } from "lucide-react";

// Use dynamic rendering to avoid build-time database queries
export const dynamic = 'force-dynamic';

async function getStats() {
  const [enquiriesCount, unreadEnquiries, coursesCount, articlesCount] = await Promise.all([
    prisma.enquiry.count(),
    prisma.enquiry.count({ where: { isRead: false } }),
    prisma.course.count({ where: { isVisible: true } }),
    prisma.article.count({ where: { isPublished: true } }),
  ]);

  return {
    enquiriesCount,
    unreadEnquiries,
    coursesCount,
    articlesCount,
  };
}

async function getRecentEnquiries() {
  return prisma.enquiry.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    select: {
      id: true,
      name: true,
      email: true,
      courseInterested: true,
      isRead: true,
      createdAt: true,
    },
  });
}

export default async function AdminDashboardPage() {
  const stats = await getStats();
  const recentEnquiries = await getRecentEnquiries();

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card padding="md">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-brand-purple/20 flex items-center justify-center">
              <MessageSquare size={24} className="text-brand-purple" />
            </div>
            <div>
              <p className="text-text-muted text-sm">Total Enquiries</p>
              <p className="text-2xl font-bold text-white">{stats.enquiriesCount}</p>
            </div>
          </div>
        </Card>

        <Card padding="md">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center">
              <MessageSquare size={24} className="text-yellow-400" />
            </div>
            <div>
              <p className="text-text-muted text-sm">Unread Enquiries</p>
              <p className="text-2xl font-bold text-white">{stats.unreadEnquiries}</p>
            </div>
          </div>
        </Card>

        <Card padding="md">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-brand-blue/20 flex items-center justify-center">
              <BookOpen size={24} className="text-brand-blue" />
            </div>
            <div>
              <p className="text-text-muted text-sm">Active Courses</p>
              <p className="text-2xl font-bold text-white">{stats.coursesCount}</p>
            </div>
          </div>
        </Card>

        <Card padding="md">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
              <FileText size={24} className="text-green-400" />
            </div>
            <div>
              <p className="text-text-muted text-sm">Published Articles</p>
              <p className="text-2xl font-bold text-white">{stats.articlesCount}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Enquiries */}
      <Card padding="lg">
        <h2 className="text-xl font-bold text-white mb-6">Recent Enquiries</h2>
        {recentEnquiries.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-text-muted text-sm font-medium">Name</th>
                  <th className="text-left py-3 px-4 text-text-muted text-sm font-medium">Email</th>
                  <th className="text-left py-3 px-4 text-text-muted text-sm font-medium">Course</th>
                  <th className="text-left py-3 px-4 text-text-muted text-sm font-medium">Status</th>
                  <th className="text-left py-3 px-4 text-text-muted text-sm font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentEnquiries.map((enquiry) => (
                  <tr key={enquiry.id} className="border-b border-white/5 hover:bg-white/5">
                    <td className="py-3 px-4 text-white">{enquiry.name}</td>
                    <td className="py-3 px-4 text-text-secondary">{enquiry.email}</td>
                    <td className="py-3 px-4 text-text-secondary">{enquiry.courseInterested || "-"}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-xs ${
                        enquiry.isRead 
                          ? "bg-green-500/20 text-green-400" 
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}>
                        {enquiry.isRead ? "Read" : "Unread"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-text-muted text-sm">
                      {new Date(enquiry.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-text-secondary text-center py-8">No enquiries yet.</p>
        )}
      </Card>
    </div>
  );
}
