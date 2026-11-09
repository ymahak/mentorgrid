import Link from "next/link";
import { prisma } from "@/lib/prisma";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { Plus, Edit, Eye } from "lucide-react";
import { formatDate } from "@/lib/utils";

async function getArticles() {
  return prisma.article.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export default async function BlogAdminPage() {
  const articles = await getArticles();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">Blog Articles</h1>
        <Link href="/admin/dashboard/blog/new">
          <Button variant="primary" size="md">
            <Plus size={18} className="mr-2" />
            New Article
          </Button>
        </Link>
      </div>

      <Card padding="none">
        {articles.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="text-left py-4 px-6 text-text-muted text-sm font-medium">Title</th>
                  <th className="text-left py-4 px-6 text-text-muted text-sm font-medium">Category</th>
                  <th className="text-left py-4 px-6 text-text-muted text-sm font-medium">Status</th>
                  <th className="text-left py-4 px-6 text-text-muted text-sm font-medium">Date</th>
                  <th className="text-left py-4 px-6 text-text-muted text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {articles.map((article) => (
                  <tr key={article.id} className="border-b border-white/5 hover:bg-white/5">
                    <td className="py-4 px-6">
                      <p className="text-white font-medium">{article.title}</p>
                      <p className="text-text-muted text-sm">{article.readingTime} min read</p>
                    </td>
                    <td className="py-4 px-6">
                      <Badge variant="secondary" size="sm">{article.category}</Badge>
                    </td>
                    <td className="py-4 px-6">
                      <Badge 
                        variant={article.isPublished ? "success" : "warning"} 
                        size="sm"
                      >
                        {article.isPublished ? "Published" : "Draft"}
                      </Badge>
                    </td>
                    <td className="py-4 px-6 text-text-muted text-sm">
                      {formatDate(article.createdAt)}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <Link href={`/blog/${article.slug}`} target="_blank">
                          <Button variant="ghost" size="sm">
                            <Eye size={16} />
                          </Button>
                        </Link>
                        <Link href={`/admin/dashboard/blog/${article.id}/edit`}>
                          <Button variant="outline" size="sm">
                            <Edit size={16} />
                          </Button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-text-secondary mb-4">No articles yet.</p>
            <Link href="/admin/dashboard/blog/new">
              <Button variant="primary">Write your first article</Button>
            </Link>
          </div>
        )}
      </Card>
    </div>
  );
}
