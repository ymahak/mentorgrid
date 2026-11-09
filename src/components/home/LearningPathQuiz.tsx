"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, ChevronLeft, Sparkles, BookOpen, Code, Brain, BarChart3, Rocket } from "lucide-react";
import Link from "next/link";

interface QuizProps {
  isOpen: boolean;
  onClose: () => void;
}

const questions = [
  {
    id: 1,
    question: "What's your current coding experience?",
    options: [
      { id: "beginner", label: "Complete Beginner", icon: "🌱", description: "Never written code before" },
      { id: "basic", label: "Basic Knowledge", icon: "📚", description: "Know some basics, built small projects" },
      { id: "intermediate", label: "Intermediate", icon: "💻", description: "Comfortable with one language" },
      { id: "advanced", label: "Advanced", icon: "🚀", description: "Professional experience" },
    ],
  },
  {
    id: 2,
    question: "What's your primary career goal?",
    options: [
      { id: "web", label: "Web Developer", icon: "🌐", description: "Build websites & web apps" },
      { id: "data", label: "Data Scientist", icon: "📊", description: "Analyze data & build ML models" },
      { id: "ai", label: "AI/ML Engineer", icon: "🤖", description: "Build intelligent systems" },
      { id: "analyst", label: "Business Analyst", icon: "📈", description: "Data visualization & insights" },
    ],
  },
  {
    id: 3,
    question: "How much time can you dedicate weekly?",
    options: [
      { id: "5hrs", label: "5-10 hours", icon: "⏰", description: "Part-time learning" },
      { id: "15hrs", label: "10-20 hours", icon: "📅", description: "Dedicated weekends" },
      { id: "25hrs", label: "20-30 hours", icon: "🔥", description: "Serious commitment" },
      { id: "fulltime", label: "30+ hours", icon: "💪", description: "Full-time focus" },
    ],
  },
  {
    id: 4,
    question: "What's your preferred learning style?",
    options: [
      { id: "1on1", label: "1:1 Mentorship", icon: "👤", description: "Personal attention & guidance" },
      { id: "batch", label: "Small Batch", icon: "👥", description: "Learn with peers (3-5 students)" },
      { id: "self", label: "Self-Paced", icon: "📖", description: "Learn at your own speed" },
      { id: "hybrid", label: "Hybrid", icon: "🔄", description: "Mix of live & self-paced" },
    ],
  },
  {
    id: 5,
    question: "When do you want to start?",
    options: [
      { id: "now", label: "Right Away!", icon: "⚡", description: "I'm ready to begin" },
      { id: "week", label: "This Week", icon: "📆", description: "Within the next few days" },
      { id: "month", label: "This Month", icon: "🗓️", description: "Planning ahead" },
      { id: "exploring", label: "Just Exploring", icon: "🔍", description: "Researching options" },
    ],
  },
];

const courseRecommendations: Record<string, { course: string; slug: string; reason: string; duration: string }> = {
  "web": { course: "Full-Stack Web Development", slug: "full-stack-web-development", reason: "Perfect for building modern web applications", duration: "2-3 months" },
  "data": { course: "Data Science & Analytics", slug: "data-science-analytics", reason: "Master data analysis and visualization", duration: "2-3 months" },
  "ai": { course: "AI & Machine Learning", slug: "artificial-intelligence-machine-learning", reason: "Build intelligent AI systems", duration: "2-3 months" },
  "analyst": { course: "Data Analytics & Business Intelligence", slug: "data-analytics-business-intelligence", reason: "Excel at data-driven decisions", duration: "2-3 months" },
};

export function LearningPathQuiz({ isOpen, onClose }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (answerId: string) => {
    setAnswers({ ...answers, [currentQuestion]: answerId });
    
    if (currentQuestion < questions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300);
    } else {
      setTimeout(() => setShowResult(true), 300);
    }
  };

  const goBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResult(false);
  };

  const getRecommendation = () => {
    const careerGoal = answers[1] || "web";
    return courseRecommendations[careerGoal] || courseRecommendations["web"];
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-[#FFF6EC] rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-[#140D08] text-[#FFF6EC] p-6 relative overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 right-0 w-40 h-40 bg-[#FF6B1A] rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#FFC83D] rounded-full blur-3xl" />
              </div>
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#FF6B1A] flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-[#140D08]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Find Your Learning Path</h2>
                    <p className="text-sm text-[#A89785]">Answer 5 quick questions</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-[#22160E] flex items-center justify-center hover:bg-[#3A2A1D] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {/* Progress Bar */}
              {!showResult && (
                <div className="mt-4 h-2 bg-[#22160E] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#FF6B1A] to-[#FFC83D]"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6">
              <AnimatePresence mode="wait">
                {!showResult ? (
                  <motion.div
                    key={currentQuestion}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-6">
                      <span className="text-sm font-bold text-[#FF6B1A]">
                        Question {currentQuestion + 1} of {questions.length}
                      </span>
                      <h3 className="text-2xl font-bold text-[#140D08] mt-2">
                        {questions[currentQuestion].question}
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {questions[currentQuestion].options.map((option) => (
                        <motion.button
                          key={option.id}
                          onClick={() => handleAnswer(option.id)}
                          className={`p-4 rounded-xl border-2 text-left transition-all ${
                            answers[currentQuestion] === option.id
                              ? "border-[#FF6B1A] bg-[#FF6B1A]/10"
                              : "border-[#140D08]/10 hover:border-[#FF6B1A]/50 hover:bg-[#FF6B1A]/5"
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-start gap-3">
                            <span className="text-2xl">{option.icon}</span>
                            <div>
                              <div className="font-bold text-[#140D08]">{option.label}</div>
                              <div className="text-sm text-[#6B5B4F]">{option.description}</div>
                            </div>
                          </div>
                        </motion.button>
                      ))}
                    </div>

                    {currentQuestion > 0 && (
                      <button
                        onClick={goBack}
                        className="mt-4 flex items-center gap-2 text-[#6B5B4F] hover:text-[#140D08] transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Back
                      </button>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                  >
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#FF6B1A] to-[#FFC83D] flex items-center justify-center">
                      <Rocket className="w-10 h-10 text-[#140D08]" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#140D08] mb-2">
                      Your Perfect Course Match! 🎯
                    </h3>
                    <p className="text-[#6B5B4F] mb-6">
                      Based on your answers, we recommend:
                    </p>

                    <div className="bg-[#140D08] text-[#FFF6EC] rounded-2xl p-6 mb-6">
                      <h4 className="text-xl font-bold text-[#FF6B1A] mb-2">
                        {getRecommendation().course}
                      </h4>
                      <p className="text-[#C9B9A8] mb-4">{getRecommendation().reason}</p>
                      <div className="flex items-center justify-center gap-4 text-sm">
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-4 h-4 text-[#FFC83D]" />
                          {getRecommendation().duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Code className="w-4 h-4 text-[#FFC83D]" />
                          Hands-on Projects
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link
                        href={`/courses/${getRecommendation().slug}`}
                        className="flex-1 bg-[#FF6B1A] text-[#140D08] font-bold py-3 px-6 rounded-full hover:scale-105 transition-transform flex items-center justify-center gap-2"
                      >
                        View Course Details
                        <ChevronRight className="w-5 h-5" />
                      </Link>
                      <Link
                        href="/contact"
                        className="flex-1 border-2 border-[#140D08] text-[#140D08] font-bold py-3 px-6 rounded-full hover:bg-[#140D08] hover:text-[#FFF6EC] transition-all"
                      >
                        Book Free Consultation
                      </Link>
                    </div>

                    <button
                      onClick={resetQuiz}
                      className="mt-4 text-[#6B5B4F] hover:text-[#140D08] transition-colors text-sm"
                    >
                      Take quiz again
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Trigger Button Component
export function QuizTriggerButton() {
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsQuizOpen(true)}
        className="group relative overflow-hidden bg-gradient-to-r from-[#FF6B1A] to-[#FFC83D] text-[#140D08] font-bold px-6 py-3 rounded-full hover:scale-105 transition-transform flex items-center gap-2"
      >
        <Sparkles className="w-5 h-5" />
        Find My Learning Path
        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      </button>
      <LearningPathQuiz isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
    </>
  );
}
