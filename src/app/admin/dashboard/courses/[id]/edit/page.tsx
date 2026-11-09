"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Plus, Trash2, GripVertical, Loader2 } from "lucide-react";

interface ModuleInput {
  id?: string;
  title: string;
  description: string;
  topics: string[];
  order: number;
}

interface CourseData {
  id: string;
  title: string;
  slug: string;
  description: string;
  overview: string;
  level: string;
  duration: string;
  technologies: string[];
  prerequisites: string[];
  whoShouldEnroll: string[];
  learningOutcomes: string[];
  isVisible: boolean;
  order: number;
  modules: ModuleInput[];
}

export default function EditCoursePage() {
  const router = useRouter();
  const params = useParams();
  const courseId = params.id as string;

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    overview: "",
    level: "Beginner",
    duration: "",
    technologies: [] as string[],
    prerequisites: [] as string[],
    whoShouldEnroll: [] as string[],
    learningOutcomes: [] as string[],
    isVisible: true,
    order: 1,
  });

  const [modules, setModules] = useState<ModuleInput[]>([
    { title: "", description: "", topics: [""], order: 1 },
  ]);

  const [techInput, setTechInput] = useState("");
  const [prereqInput, setPrereqInput] = useState("");
  const [enrollInput, setEnrollInput] = useState("");
  const [outcomeInput, setOutcomeInput] = useState("");

  useEffect(() => {
    async function fetchCourse() {
      try {
        const response = await fetch(`/api/admin/courses/${courseId}`);
        if (!response.ok) throw new Error("Failed to fetch course");
        const course: CourseData = await response.json();

        setFormData({
          title: course.title,
          slug: course.slug,
          description: course.description,
          overview: course.overview || "",
          level: course.level,
          duration: course.duration,
          technologies: course.technologies || [],
          prerequisites: course.prerequisites || [],
          whoShouldEnroll: course.whoShouldEnroll || [],
          learningOutcomes: course.learningOutcomes || [],
          isVisible: course.isVisible,
          order: course.order,
        });

        if (course.modules && course.modules.length > 0) {
          setModules(course.modules.map((m) => ({
            id: m.id,
            title: m.title,
            description: m.description || "",
            topics: m.topics || [""],
            order: m.order,
          })));
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load course");
      } finally {
        setIsLoading(false);
      }
    }

    fetchCourse();
  }, [courseId]);

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

  const addArrayItem = (field: "technologies" | "prerequisites" | "whoShouldEnroll" | "learningOutcomes", value: string, setter: (v: string) => void) => {
    if (value.trim()) {
      setFormData({
        ...formData,
        [field]: [...formData[field], value.trim()],
      });
      setter("");
    }
  };

  const removeArrayItem = (field: "technologies" | "prerequisites" | "whoShouldEnroll" | "learningOutcomes", index: number) => {
    setFormData({
      ...formData,
      [field]: formData[field].filter((_, i) => i !== index),
    });
  };

  const addModule = () => {
    setModules([
      ...modules,
      { title: "", description: "", topics: [""], order: modules.length + 1 },
    ]);
  };

  const removeModule = (index: number) => {
    if (modules.length > 1) {
      setModules(modules.filter((_, i) => i !== index).map((m, i) => ({ ...m, order: i + 1 })));
    }
  };

  const updateModule = (index: number, field: keyof ModuleInput, value: string | string[]) => {
    const updated = [...modules];
    updated[index] = { ...updated[index], [field]: value };
    setModules(updated);
  };

  const addModuleTopic = (moduleIndex: number) => {
    const updated = [...modules];
    updated[moduleIndex].topics.push("");
    setModules(updated);
  };

  const updateModuleTopic = (moduleIndex: number, topicIndex: number, value: string) => {
    const updated = [...modules];
    updated[moduleIndex].topics[topicIndex] = value;
    setModules(updated);
  };

  const removeModuleTopic = (moduleIndex: number, topicIndex: number) => {
    const updated = [...modules];
    if (updated[moduleIndex].topics.length > 1) {
      updated[moduleIndex].topics = updated[moduleIndex].topics.filter((_, i) => i !== topicIndex);
      setModules(updated);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch(`/api/admin/courses/${courseId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          modules: modules.filter(m => m.title.trim()),
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to update course");
      }

      router.push("/admin/dashboard/courses");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this course? This action cannot be undone.")) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/courses/${courseId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete course");
      }

      router.push("/admin/dashboard/courses");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete course");
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
        <h1 className="text-3xl font-bold text-white">Edit Course</h1>
        <Button variant="ghost" onClick={handleDelete} className="text-red-400 hover:text-red-300">
          <Trash2 size={18} className="mr-2" />
          Delete Course
        </Button>
      </div>

      <form onSubmit={handleSubmit}>
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400">
            {error}
          </div>
        )}

        {/* Basic Info */}
        <Card padding="lg" className="mb-6">
          <h2 className="text-xl font-semibold text-white mb-6">Basic Information</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Input
              label="Course Title"
              value={formData.title}
              onChange={handleTitleChange}
              required
              placeholder="e.g., Full Stack Web Development"
            />
            <Input
              label="URL Slug"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              required
              placeholder="full-stack-web-development"
            />
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Short Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-text-muted focus:outline-none focus:border-brand-purple/50 focus:ring-2 focus:ring-brand-purple/20 transition-all"
              rows={2}
              required
              placeholder="Brief description of the course"
            />
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Full Overview
            </label>
            <textarea
              value={formData.overview}
              onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-text-muted focus:outline-none focus:border-brand-purple/50 focus:ring-2 focus:ring-brand-purple/20 transition-all"
              rows={4}
              required
              placeholder="Detailed overview of what students will learn"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Level
              </label>
              <select
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-purple/50 focus:ring-2 focus:ring-brand-purple/20 transition-all"
              >
                <option value="Beginner">Beginner</option>
                <option value="Beginner to Intermediate">Beginner to Intermediate</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Intermediate to Advanced">Intermediate to Advanced</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            <Input
              label="Duration"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              required
              placeholder="e.g., 12 weeks"
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
              Make course visible on the website
            </label>
          </div>
        </Card>

        {/* Technologies */}
        <Card padding="lg" className="mb-6">
          <h2 className="text-xl font-semibold text-white mb-6">Technologies & Tools</h2>
          <div className="flex gap-3 mb-4">
            <Input
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              placeholder="Add technology (e.g., React, Node.js)"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addArrayItem("technologies", techInput, setTechInput);
                }
              }}
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => addArrayItem("technologies", techInput, setTechInput)}
            >
              <Plus size={18} />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.technologies.map((tech, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 px-3 py-1 bg-brand-purple/20 text-brand-purple-light rounded-lg text-sm"
              >
                {tech}
                <button
                  type="button"
                  onClick={() => removeArrayItem("technologies", i)}
                  className="hover:text-red-400"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </Card>

        {/* Prerequisites */}
        <Card padding="lg" className="mb-6">
          <h2 className="text-xl font-semibold text-white mb-6">Prerequisites</h2>
          <div className="flex gap-3 mb-4">
            <Input
              value={prereqInput}
              onChange={(e) => setPrereqInput(e.target.value)}
              placeholder="Add prerequisite"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addArrayItem("prerequisites", prereqInput, setPrereqInput);
                }
              }}
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => addArrayItem("prerequisites", prereqInput, setPrereqInput)}
            >
              <Plus size={18} />
            </Button>
          </div>
          <ul className="space-y-2">
            {formData.prerequisites.map((prereq, i) => (
              <li key={i} className="flex items-center gap-2 text-text-secondary">
                <span className="flex-1">{prereq}</span>
                <button
                  type="button"
                  onClick={() => removeArrayItem("prerequisites", i)}
                  className="text-text-muted hover:text-red-400"
                >
                  <Trash2 size={16} />
                </button>
              </li>
            ))}
          </ul>
        </Card>

        {/* Who Should Enroll */}
        <Card padding="lg" className="mb-6">
          <h2 className="text-xl font-semibold text-white mb-6">Who Should Enroll</h2>
          <div className="flex gap-3 mb-4">
            <Input
              value={enrollInput}
              onChange={(e) => setEnrollInput(e.target.value)}
              placeholder="Add target audience"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addArrayItem("whoShouldEnroll", enrollInput, setEnrollInput);
                }
              }}
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => addArrayItem("whoShouldEnroll", enrollInput, setEnrollInput)}
            >
              <Plus size={18} />
            </Button>
          </div>
          <ul className="space-y-2">
            {formData.whoShouldEnroll.map((item, i) => (
              <li key={i} className="flex items-center gap-2 text-text-secondary">
                <span className="flex-1">{item}</span>
                <button
                  type="button"
                  onClick={() => removeArrayItem("whoShouldEnroll", i)}
                  className="text-text-muted hover:text-red-400"
                >
                  <Trash2 size={16} />
                </button>
              </li>
            ))}
          </ul>
        </Card>

        {/* Learning Outcomes */}
        <Card padding="lg" className="mb-6">
          <h2 className="text-xl font-semibold text-white mb-6">Learning Outcomes</h2>
          <div className="flex gap-3 mb-4">
            <Input
              value={outcomeInput}
              onChange={(e) => setOutcomeInput(e.target.value)}
              placeholder="Add learning outcome"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addArrayItem("learningOutcomes", outcomeInput, setOutcomeInput);
                }
              }}
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => addArrayItem("learningOutcomes", outcomeInput, setOutcomeInput)}
            >
              <Plus size={18} />
            </Button>
          </div>
          <ul className="space-y-2">
            {formData.learningOutcomes.map((outcome, i) => (
              <li key={i} className="flex items-center gap-2 text-text-secondary">
                <span className="flex-1">{outcome}</span>
                <button
                  type="button"
                  onClick={() => removeArrayItem("learningOutcomes", i)}
                  className="text-text-muted hover:text-red-400"
                >
                  <Trash2 size={16} />
                </button>
              </li>
            ))}
          </ul>
        </Card>

        {/* Curriculum / Modules */}
        <Card padding="lg" className="mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Curriculum</h2>
            <Button type="button" variant="outline" size="sm" onClick={addModule}>
              <Plus size={16} className="mr-1" />
              Add Module
            </Button>
          </div>

          <div className="space-y-6">
            {modules.map((module, moduleIndex) => (
              <div
                key={moduleIndex}
                className="p-4 bg-white/5 border border-white/10 rounded-xl"
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="text-text-muted mt-2">
                    <GripVertical size={20} />
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-brand-purple font-semibold">
                        Module {moduleIndex + 1}
                      </span>
                      {modules.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeModule(moduleIndex)}
                          className="text-text-muted hover:text-red-400"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                    <Input
                      value={module.title}
                      onChange={(e) => updateModule(moduleIndex, "title", e.target.value)}
                      placeholder="Module title"
                    />
                    <textarea
                      value={module.description}
                      onChange={(e) => updateModule(moduleIndex, "description", e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-text-muted focus:outline-none focus:border-brand-purple/50 focus:ring-2 focus:ring-brand-purple/20 transition-all"
                      rows={2}
                      placeholder="Module description"
                    />

                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">
                        Topics
                      </label>
                      <div className="space-y-2">
                        {module.topics.map((topic, topicIndex) => (
                          <div key={topicIndex} className="flex gap-2">
                            <Input
                              value={topic}
                              onChange={(e) => updateModuleTopic(moduleIndex, topicIndex, e.target.value)}
                              placeholder={`Topic ${topicIndex + 1}`}
                            />
                            {module.topics.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeModuleTopic(moduleIndex, topicIndex)}
                                className="text-text-muted hover:text-red-400 px-2"
                              >
                                <Trash2 size={16} />
                              </button>
                            )}
                          </div>
                        ))}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => addModuleTopic(moduleIndex)}
                        >
                          <Plus size={14} className="mr-1" />
                          Add Topic
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Submit */}
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
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}
