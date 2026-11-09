"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AptitudeContent } from "./AptitudeContent";

interface Module {
  id: string;
  title: string;
  description: string | null;
  topics: string[];
  order: number;
}

interface CurriculumAccordionProps {
  modules: Module[];
  showFreeContent?: boolean;
  courseSlug?: string;
}

export default function CurriculumAccordion({ modules, showFreeContent = false, courseSlug }: CurriculumAccordionProps) {
  const [openModules, setOpenModules] = useState<string[]>([modules[0]?.id || ""]);
  const [showContent, setShowContent] = useState<string | null>(null);

  const toggleModule = (moduleId: string) => {
    setOpenModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const isAptitudeCourse = courseSlug === "aptitude-logical-reasoning";

  return (
    <div className="space-y-4">
      {modules.map((module, index) => {
        const isOpen = openModules.includes(module.id);
        const isContentOpen = showContent === module.id;
        return (
          <div
            key={module.id}
            className="rounded-xl border border-amber-100 overflow-hidden bg-white shadow-sm"
          >
            {/* Module Header */}
            <button
              onClick={() => toggleModule(module.id)}
              className="w-full flex items-center justify-between p-5 text-left hover:bg-amber-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <span className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white font-semibold shadow-lg shadow-amber-500/20">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{module.title}</h3>
                  {module.description && (
                    <p className="text-sm text-gray-500 mt-0.5">{module.description}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500 hidden sm:block">
                  {module.topics.length} topics
                </span>
                {isAptitudeCourse && (
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">
                    FREE
                  </span>
                )}
                {isOpen ? (
                  <ChevronUp size={20} className="text-amber-500" />
                ) : (
                  <ChevronDown size={20} className="text-gray-400" />
                )}
              </div>
            </button>

            {/* Module Content */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="px-5 pb-5 pt-2 border-t border-amber-100 bg-amber-50/50">
                    <ul className="grid sm:grid-cols-2 gap-3">
                      {module.topics.map((topic, topicIndex) => (
                        <li
                          key={topicIndex}
                          className="flex items-start gap-3 text-gray-600 text-sm"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                          {topic}
                        </li>
                      ))}
                    </ul>
                    
                    {/* Free Content Button for Aptitude */}
                    {isAptitudeCourse && (
                      <div className="mt-4 pt-4 border-t border-amber-200">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowContent(isContentOpen ? null : module.id);
                          }}
                          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-[#FF6B1A] to-[#FFC83D] text-[#140D08] font-bold rounded-lg hover:opacity-90 transition-opacity"
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                          </svg>
                          {isContentOpen ? "Hide Study Material" : "📚 View Free Study Material"}
                        </button>
                        
                        {isContentOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="mt-4 p-4 bg-white rounded-lg border-2 border-[#FF6B1A]/30"
                          >
                            <div className="flex items-center gap-2 mb-3 pb-3 border-b border-[#E3CDB4]">
                              <span className="text-lg">📖</span>
                              <h4 className="font-bold text-[#140D08]">{module.title} - Complete Notes</h4>
                            </div>
                            <AptitudeContent moduleTitle={module.title} />
                          </motion.div>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
      
      {/* Download PDF Link for Aptitude */}
      {isAptitudeCourse && (
        <div className="mt-6 p-4 bg-gradient-to-r from-[#140D08] to-[#22160E] rounded-xl text-center">
          <p className="text-[#C9B9A8] text-sm mb-3">Want all notes in one place?</p>
          <a
            href="/resources/Aptitude_Complete_Notes.pdf"
            download
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF6B1A] text-[#140D08] font-bold rounded-lg hover:bg-[#FFC83D] transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download Complete PDF (71 pages)
          </a>
        </div>
      )}
    </div>
  );
}
