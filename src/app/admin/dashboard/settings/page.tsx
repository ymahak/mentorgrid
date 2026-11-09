"use client";

import { useState, useEffect } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Loader2 } from "lucide-react";

interface Settings {
  [key: string]: string;
}

const settingsConfig = [
  { key: "contact_email", label: "Contact Email", placeholder: "ymahaky@gmail.com" },
  { key: "address", label: "Address", placeholder: "Your business address" },
  { key: "linkedin_url", label: "LinkedIn URL", placeholder: "https://linkedin.com/in/..." },
  { key: "github_url", label: "GitHub URL", placeholder: "https://github.com/..." },
  { key: "twitter_url", label: "Twitter URL", placeholder: "https://twitter.com/..." },
  { key: "instagram_url", label: "Instagram URL", placeholder: "https://instagram.com/..." },
  { key: "youtube_url", label: "YouTube URL", placeholder: "https://youtube.com/..." },
];

export default function SettingsAdminPage() {
  const [settings, setSettings] = useState<Settings>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    async function fetchSettings() {
      try {
        const response = await fetch("/api/admin/settings");
        if (!response.ok) throw new Error("Failed to fetch settings");
        const data = await response.json();
        
        // Convert array to object
        const settingsObj: Settings = {};
        data.forEach((s: { key: string; value: string }) => {
          settingsObj[s.key] = s.value;
        });
        setSettings(settingsObj);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load settings");
      } finally {
        setIsLoading(false);
      }
    }

    fetchSettings();
  }, []);

  const handleChange = (key: string, value: string) => {
    setSettings({ ...settings, [key]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to save settings");
      }

      setSuccess("Settings saved successfully!");
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

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Site Settings</h1>

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
          <h2 className="text-xl font-semibold text-white mb-6">Contact Information</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {settingsConfig.slice(0, 4).map((config) => (
              <Input
                key={config.key}
                label={config.label}
                value={settings[config.key] || ""}
                onChange={(e) => handleChange(config.key, e.target.value)}
                placeholder={config.placeholder}
              />
            ))}
          </div>
        </Card>

        <Card padding="lg" className="mb-6">
          <h2 className="text-xl font-semibold text-white mb-6">Social Media Links</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {settingsConfig.slice(4).map((config) => (
              <Input
                key={config.key}
                label={config.label}
                value={settings[config.key] || ""}
                onChange={(e) => handleChange(config.key, e.target.value)}
                placeholder={config.placeholder}
              />
            ))}
          </div>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" variant="primary" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Settings"}
          </Button>
        </div>
      </form>
    </div>
  );
}
