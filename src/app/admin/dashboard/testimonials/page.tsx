"use client";

import { useState, useEffect } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Badge from "@/components/ui/Badge";
import { Plus, Edit, Trash2, Loader2, X } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  imageUrl: string | null;
  isVisible: boolean;
  order: number;
}

export default function TestimonialsAdminPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    content: "",
    imageUrl: "",
    isVisible: true,
    order: 1,
  });

  const fetchTestimonials = async () => {
    try {
      const response = await fetch("/api/admin/testimonials");
      if (!response.ok) throw new Error("Failed to fetch testimonials");
      const data = await response.json();
      setTestimonials(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load testimonials");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const resetForm = () => {
    setFormData({
      name: "",
      role: "",
      content: "",
      imageUrl: "",
      isVisible: true,
      order: testimonials.length + 1,
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (testimonial: Testimonial) => {
    setFormData({
      name: testimonial.name,
      role: testimonial.role,
      content: testimonial.content,
      imageUrl: testimonial.imageUrl || "",
      isVisible: testimonial.isVisible,
      order: testimonial.order,
    });
    setEditingId(testimonial.id);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const url = editingId
        ? `/api/admin/testimonials/${editingId}`
        : "/api/admin/testimonials";
      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to save testimonial");
      }

      await fetchTestimonials();
      resetForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;

    try {
      const response = await fetch(`/api/admin/testimonials/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete testimonial");
      await fetchTestimonials();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete testimonial");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-brand-purple" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">Testimonials</h1>
        <Button
          variant="primary"
          size="md"
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
        >
          <Plus size={18} className="mr-2" />
          Add Testimonial
        </Button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400">
          {error}
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <Card padding="lg" className="mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">
              {editingId ? "Edit Testimonial" : "New Testimonial"}
            </h2>
            <button onClick={resetForm} className="text-text-muted hover:text-white">
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-6">
              <Input
                label="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                placeholder="Student name"
              />
              <Input
                label="Role / Title"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                required
                placeholder="e.g., Software Developer at Google"
              />
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Testimonial Content
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-text-muted focus:outline-none focus:border-brand-purple/50 focus:ring-2 focus:ring-brand-purple/20 transition-all"
                rows={4}
                required
                placeholder="What the student said about their experience..."
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <Input
                label="Image URL (optional)"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                placeholder="https://..."
              />
              <Input
                label="Display Order"
                type="number"
                value={formData.order.toString()}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 1 })}
                min={1}
              />
            </div>

            <div className="mt-6 flex items-center gap-3">
              <input
                type="checkbox"
                id="isVisible"
                checked={formData.isVisible}
                onChange={(e) => setFormData({ ...formData, isVisible: e.target.checked })}
                className="w-5 h-5 rounded border-white/20 bg-white/5 text-brand-purple focus:ring-brand-purple/50"
              />
              <label htmlFor="isVisible" className="text-text-secondary">
                Show on website
              </label>
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <Button type="button" variant="ghost" onClick={resetForm}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : editingId ? "Update" : "Create"}
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Testimonials List */}
      <div className="grid gap-4">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} padding="md">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-white">{testimonial.name}</h3>
                  <Badge variant={testimonial.isVisible ? "success" : "warning"} size="sm">
                    {testimonial.isVisible ? "Visible" : "Hidden"}
                  </Badge>
                </div>
                <p className="text-text-secondary text-sm mb-2">{testimonial.role}</p>
                <p className="text-text-muted">&ldquo;{testimonial.content}&rdquo;</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(testimonial)}>
                  <Edit size={16} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(testimonial.id)}
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          </Card>
        ))}

        {testimonials.length === 0 && !showForm && (
          <Card padding="lg">
            <div className="text-center py-8">
              <p className="text-text-secondary mb-4">No testimonials yet.</p>
              <Button variant="primary" onClick={() => setShowForm(true)}>
                Add your first testimonial
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
