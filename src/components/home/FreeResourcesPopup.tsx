"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Download, Gift, Sparkles } from "lucide-react";

export function FreeResourcesPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Check if popup was already shown in this session
    const shown = sessionStorage.getItem("freeResourcesPopupShown");
    if (shown) {
      setHasShown(true);
      return;
    }

    // Show popup after 15 seconds or on scroll
    const timer = setTimeout(() => {
      if (!hasShown) {
        setIsOpen(true);
        setHasShown(true);
        sessionStorage.setItem("freeResourcesPopupShown", "true");
      }
    }, 15000);

    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercent > 40 && !hasShown) {
        setIsOpen(true);
        setHasShown(true);
        sessionStorage.setItem("freeResourcesPopupShown", "true");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasShown]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the email to your backend
    setIsSubmitted(true);
    setTimeout(() => {
      setIsOpen(false);
    }, 3000);
  };

  const resources = [
    { name: "SQL Complete Notes", file: "/resources/SQL_Notes.pdf", icon: "📊" },
    { name: "DBMS & SQL Notes", file: "/resources/DBMS_SQL_Notes.pdf", icon: "🗄️" },
    { name: "Aptitude Notes (71 pages)", file: "/resources/Aptitude_Complete_Notes.pdf", icon: "🧮" },
    { name: "DeepBrain AI Guide", file: "/resources/DeepBrain_AI_Guide.pdf", icon: "🤖" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-[#FFF6EC] rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-[#140D08]/10 flex items-center justify-center hover:bg-[#140D08]/20 transition-colors"
            >
              <X className="w-5 h-5 text-[#140D08]" />
            </button>

            {/* Header with Gift Animation */}
            <div className="bg-gradient-to-br from-[#FF6B1A] to-[#FFC83D] p-8 text-center relative overflow-hidden">
              <motion.div
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                className="w-20 h-20 mx-auto mb-4 bg-[#140D08] rounded-2xl flex items-center justify-center"
              >
                <Gift className="w-10 h-10 text-[#FFC83D]" />
              </motion.div>
              <h2 className="text-2xl font-bold text-[#140D08] mb-2">
                🎁 Free Learning Resources!
              </h2>
              <p className="text-[#4A3626]">
                Get instant access to premium study materials
              </p>
              
              {/* Floating sparkles */}
              <motion.div
                animate={{ y: [-5, 5, -5], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute top-4 left-8"
              >
                <Sparkles className="w-6 h-6 text-[#140D08]/30" />
              </motion.div>
              <motion.div
                animate={{ y: [5, -5, 5], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                className="absolute bottom-4 right-8"
              >
                <Sparkles className="w-6 h-6 text-[#140D08]/30" />
              </motion.div>
            </div>

            {/* Content */}
            <div className="p-6">
              {!isSubmitted ? (
                <>
                  {/* Resources List */}
                  <div className="mb-6">
                    <h3 className="text-sm font-bold text-[#6B5B4F] mb-3">WHAT YOU'LL GET:</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {resources.map((resource) => (
                        <div
                          key={resource.name}
                          className="flex items-center gap-2 p-2 rounded-lg bg-[#140D08]/5"
                        >
                          <span className="text-xl">{resource.icon}</span>
                          <span className="text-xs font-medium text-[#140D08]">{resource.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Email Form */}
                  <form onSubmit={handleSubmit}>
                    <div className="relative mb-4">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B5B4F]" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-[#140D08]/10 focus:border-[#FF6B1A] outline-none transition-colors bg-white"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-[#140D08] text-[#FFF6EC] font-bold py-3 px-6 rounded-xl hover:bg-[#22160E] transition-colors flex items-center justify-center gap-2"
                    >
                      <Download className="w-5 h-5" />
                      Get Free Resources
                    </button>
                  </form>

                  <p className="text-xs text-center text-[#6B5B4F] mt-4">
                    No spam, ever. Unsubscribe anytime.
                  </p>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 10 }}
                    className="w-16 h-16 mx-auto mb-4 bg-green-500 rounded-full flex items-center justify-center"
                  >
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                  <h3 className="text-xl font-bold text-[#140D08] mb-2">You're All Set! 🎉</h3>
                  <p className="text-[#6B5B4F]">Check your email for download links</p>
                  
                  {/* Direct download links */}
                  <div className="mt-4 space-y-2">
                    {resources.map((resource) => (
                      <a
                        key={resource.name}
                        href={resource.file}
                        download
                        className="block text-sm text-[#FF6B1A] hover:underline"
                      >
                        Download {resource.name} →
                      </a>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Manual trigger button for resources section
export function FreeResourcesButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="group relative overflow-hidden bg-[#FFC83D] text-[#140D08] font-bold px-6 py-3 rounded-full hover:scale-105 transition-transform flex items-center gap-2"
      >
        <Gift className="w-5 h-5" />
        Get Free Resources
        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative w-full max-w-md bg-[#FFF6EC] rounded-3xl p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#140D08]/10 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
              
              <h3 className="text-xl font-bold text-[#140D08] mb-4 flex items-center gap-2">
                <Gift className="w-6 h-6 text-[#FF6B1A]" />
                Free Learning Resources
              </h3>
              
              <div className="space-y-3">
                <a
                  href="/resources/SQL_Notes.pdf"
                  download
                  className="flex items-center gap-3 p-3 rounded-xl bg-[#140D08]/5 hover:bg-[#FF6B1A]/10 transition-colors"
                >
                  <span className="text-2xl">📊</span>
                  <div>
                    <div className="font-bold text-[#140D08]">SQL Complete Notes</div>
                    <div className="text-xs text-[#6B5B4F]">PDF Download</div>
                  </div>
                  <Download className="w-5 h-5 ml-auto text-[#FF6B1A]" />
                </a>
                <a
                  href="/resources/DBMS_SQL_Notes.pdf"
                  download
                  className="flex items-center gap-3 p-3 rounded-xl bg-[#140D08]/5 hover:bg-[#FF6B1A]/10 transition-colors"
                >
                  <span className="text-2xl">🗄️</span>
                  <div>
                    <div className="font-bold text-[#140D08]">DBMS & SQL Notes</div>
                    <div className="text-xs text-[#6B5B4F]">PDF Download</div>
                  </div>
                  <Download className="w-5 h-5 ml-auto text-[#FF6B1A]" />
                </a>
                <a
                  href="/resources/Aptitude_Complete_Notes.pdf"
                  download
                  className="flex items-center gap-3 p-3 rounded-xl bg-[#140D08]/5 hover:bg-[#FF6B1A]/10 transition-colors"
                >
                  <span className="text-2xl">🧮</span>
                  <div>
                    <div className="font-bold text-[#140D08]">Aptitude Notes (71 pages)</div>
                    <div className="text-xs text-[#6B5B4F]">PDF Download</div>
                  </div>
                  <Download className="w-5 h-5 ml-auto text-[#FF6B1A]" />
                </a>
                <a
                  href="/resources/DeepBrain_AI_Guide.pdf"
                  download
                  className="flex items-center gap-3 p-3 rounded-xl bg-[#140D08]/5 hover:bg-[#FF6B1A]/10 transition-colors"
                >
                  <span className="text-2xl">🤖</span>
                  <div>
                    <div className="font-bold text-[#140D08]">DeepBrain AI Guide</div>
                    <div className="text-xs text-[#6B5B4F]">PDF Download</div>
                  </div>
                  <Download className="w-5 h-5 ml-auto text-[#FF6B1A]" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
