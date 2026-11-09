"use client";

import { useState, useEffect } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Loader2, Plus, Trash2 } from "lucide-react";

interface MentorProfile {
  id: string;
  name: string;
  designation: string;
  bio: string;
  skills: string[];
  experience: string[];
  education: string[];
  certifications: string[];
  trainingPrograms: string[];
  imageUrl: string | null;
  linkedinUrl: string | null;
  githubUrl: string | null;
}

export default function MentorAdminPage() {
  const [profile, setProfile] = useState<MentorProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    bio: "",
    skills: [] as string[],
    experience: [] as string[],
    education: [] as string[],
    certifications: [] as string[],
    trainingPrograms: [] as string[],
    imageUrl: "",
    linkedinUrl: "",
    githubUrl: "",
  });

  const [skillInput, setSkillInput] = useState("");
  const [experienceInput, setExperienceInput] = useState("");
  const [educationInput, setEducationInput] = useState("");
  const [programInput, setProgramInput] = useState("");

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await fetch("/api/admin/mentor");
        if (!response.ok) throw new Error("Failed to fetch profile");
        const data = await response.json();
        
        if (data) {
          setProfile(data);
          setFormData({
            name: data.name || "",
            designation: data.designation || "",
            bio: data.bio || "",
            skills: data.skills || [],
            experience: data.experience || [],
            education: data.education || [],
            certifications: data.certifications || [],
            trainingPrograms: data.trainingPrograms || [],
            imageUrl: data.imageUrl || "",
            linkedinUrl: data.linkedinUrl || "",
            githubUrl: data.githubUrl || "",
          });
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load profile");
      } finally {
        setIsLoading(false);
      }
    }

    fetchProfile();
  }, []);

  const addArrayItem = (
    field: "skills" | "experience" | "education" | "certifications" | "trainingPrograms",
    value: string,
    setter: (v: string) => void
  ) => {
    if (value.trim() && !formData[field].includes(value.trim())) {
      setFormData({
        ...formData,
        [field]: [...formData[field], value.trim()],
      });
      setter("");
    }
  };

  const removeArrayItem = (
    field: "skills" | "experience" | "education" | "certifications" | "trainingPrograms",
    index: number
  ) => {
    setFormData({
      ...formData,
      [field]: formData[field].filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/admin/mentor", {
        method: profile ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to save profile");
      }

      const updatedProfile = await response.json();
      setProfile(updatedProfile);
      setSuccess("Profile saved successfully!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-brand-purple" />
      </div>
    );
  }

  const renderArraySection = (
    title: string,
    field: "skills" | "experience" | "education" | "certifications" | "trainingPrograms",
    input: string,
    setInput: (v: string) => void,
    placeholder: string
  ) => (
    <Card padding="lg" className="mb-6">
      <h2 className="text-xl font-semibold text-white mb-6">{title}</h2>
      <div className="flex gap-3 mb-4">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addArrayItem(field, input, setInput);
            }
          }}
        />
        <Button type="button" variant="outline" onClick={() => addArrayItem(field, input, setInput)}>
          <Plus size={18} />
        </Button>
      </div>
      <div className="space-y-2">
        {formData[field].map((item, i) => (
          <div key={i} className="flex items-center gap-2 p-2 bg-white/5 rounded-lg">
            <span className="flex-1 text-text-secondary">{item}</span>
            <button
              type="button"
              onClick={() => removeArrayItem(field, i)}
              className="text-text-muted hover:text-red-400"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </Card>
  );

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Mentor Profile</h1>

      {error && (
        <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <Card padding="lg" className="mb-6">
          <h2 className="text-xl font-semibold text-white mb-6">Basic Information</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Input
              label="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              placeholder="Mahak Yadav"
            />
            <Input
              label="Designation"
              value={formData.designation}
              onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
              required
              placeholder="Software Developer / Technical Trainer"
            />
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Bio
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-text-muted focus:outline-none focus:border-brand-purple/50 focus:ring-2 focus:ring-brand-purple/20 transition-all"
              rows={6}
              required
              placeholder="Write a detailed bio..."
            />
          </div>

          <div className="mt-6">
            <Input
              label="Profile Image URL"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              placeholder="https://..."
            />
          </div>
        </Card>

        {renderArraySection("Skills", "skills", skillInput, setSkillInput, "Add a skill (e.g., React.js, Python)")}
        {renderArraySection("Experience", "experience", experienceInput, setExperienceInput, "Add experience (e.g., Software Developer at Ivory)")}
        {renderArraySection("Education", "education", educationInput, setEducationInput, "Add education (e.g., B.Tech CSE from LPU)")}
        {renderArraySection("Training Programs Designed", "trainingPrograms", programInput, setProgramInput, "Add training program")}

        <Card padding="lg" className="mb-6">
          <h2 className="text-xl font-semibold text-white mb-6">Social Links</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Input
              label="LinkedIn URL"
              value={formData.linkedinUrl}
              onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
              placeholder="https://linkedin.com/in/..."
            />
            <Input
              label="GitHub URL"
              value={formData.githubUrl}
              onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
              placeholder="https://github.com/..."
            />
          </div>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" variant="primary" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Profile"}
          </Button>
        </div>
      </form>
    </div>
  );
}
