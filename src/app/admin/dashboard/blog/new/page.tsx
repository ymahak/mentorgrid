"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { blogCategories, type BlogCategory } from "@/lib/constants";

export default function NewArticlePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: blogCategories[0] as string,
    readingTime: 5,
    isPublished: false,
  });

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData({
      ...formData,
      title,
      slug: generateSlug(title),
    });
  };

  const calculateReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    return Math.max(1, Math.ceil(words / wordsPerMinute));
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const content = e.target.value;
    setFormData({
      ...formData,
      content,
      readingTime: calculateReadingTime(content),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/admin/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to create article");
      }

      router.push("/admin/dashboard/blog");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">New Article</h1>

      <form onSubmit={handleSubmit}>
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400">
            {error}
          </div>
        )}

        <Card padding="lg" className="mb-6">
          <h2 className="text-xl font-semibold text-white mb-6">Article Details</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Input
              label="Title"
              value={formData.title}
              onChange={handleTitleChange}
              required
              placeholder="Article title"
            />
            <Input
              label="URL Slug"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              required
              placeholder="article-slug"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-purple/50 focus:ring-2 focus:ring-brand-purple/20 transition-all"
              >
                {blogCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <Input
              label="Reading Time (minutes)"
              type="number"
              value={formData.readingTime.toString()}
              onChange={(e) => setFormData({ ...formData, readingTime: parseInt(e.target.value) || 1 })}
              min={1}
            />
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Excerpt
            </label>
            <textarea
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-text-muted focus:outline-none focus:border-brand-purple/50 focus:ring-2 focus:ring-brand-purple/20 transition-all"
              rows={2}
              required
              placeholder="Brief summary of the article"
            />
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Content (Markdown supported)
            </label>
            <textarea
              value={formData.content}
              onChange={handleContentChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-text-muted focus:outline-none focus:border-brand-purple/50 focus:ring-2 focus:ring-brand-purple/20 transition-all font-mono text-sm"
              rows={20}
              required
              placeholder="Write your article content here..."
            />
          </div>

          <div className="mt-6 flex items-center gap-3">
            <input
              type="checkbox"
              id="isPublished"
              checked={formData.isPublished}
              onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
              className="w-5 h-5 rounded border-white/20 bg-white/5 text-brand-purple focus:ring-brand-purple/50"
            />
            <label htmlFor="isPublished" className="text-text-secondary">
              Publish immediately
            </label>
          </div>
        </Card>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="ghost"
            onClick={() => router.back()}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Article"}
          </Button>
        </div>
      </form>
    </div>
  );
}
