"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Textarea, Select } from "@/components/ui/Input";
import { enquirySchema, type EnquiryFormData } from "@/lib/validations";

interface EnquiryFormProps {
  courseOptions?: { value: string; label: string }[];
  onSuccess?: () => void;
}

export default function EnquiryForm({ courseOptions = [], onSuccess }: EnquiryFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EnquiryFormData>({
    resolver: zodResolver(enquirySchema),
  });

  const onSubmit = async (data: EnquiryFormData) => {
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus({
          type: "success",
          message: "Thank you for your enquiry! We'll get back to you soon.",
        });
        reset();
        onSuccess?.();
      } else {
        setSubmitStatus({
          type: "error",
          message: result.error || "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Failed to submit enquiry. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {submitStatus.type && (
        <div
          className={`p-4 rounded-xl ${
            submitStatus.type === "success"
              ? "bg-emerald-50 border border-emerald-200 text-emerald-700"
              : "bg-red-50 border border-red-200 text-red-700"
          }`}
        >
          {submitStatus.message}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <Input
          label="Full Name"
          placeholder="Your name"
          error={errors.name?.message}
          {...register("name")}
          required
        />
        <Input
          label="Email Address"
          type="email"
          placeholder="your@email.com"
          error={errors.email?.message}
          {...register("email")}
          required
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Input
          label="Phone Number"
          type="tel"
          placeholder="10-digit mobile number"
          error={errors.phone?.message}
          {...register("phone")}
          required
        />
        {courseOptions.length > 0 && (
          <Select
            label="Course Interested In"
            options={courseOptions}
            {...register("courseInterested")}
          />
        )}
      </div>

      <Input
        label="Current Education / Profession"
        placeholder="e.g., B.Tech Student, Software Developer"
        {...register("education")}
      />

      <Textarea
        label="Learning Goals"
        placeholder="What do you hope to achieve? Any specific skills you want to learn?"
        {...register("learningGoals")}
        rows={3}
      />

      <Textarea
        label="Message"
        placeholder="Your message or questions..."
        error={errors.message?.message}
        {...register("message")}
        required
        rows={4}
      />

      <button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium shadow-lg shadow-amber-500/20 hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Submitting..." : "Submit Enquiry"}
      </button>

      <p className="text-gray-500 text-xs text-center">
        By submitting this form, you agree to be contacted regarding your enquiry.
      </p>
    </form>
  );
}
