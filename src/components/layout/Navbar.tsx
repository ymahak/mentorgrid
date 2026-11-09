"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight, Sparkles } from "lucide-react";
import { navLinks } from "@/lib/constants";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-xl border-b border-amber-100 shadow-sm"
            : "bg-amber-50/95 backdrop-blur-sm"
        }`}
      >
        <nav className="container-custom">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div 
                className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center overflow-hidden shadow-lg shadow-amber-500/20"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-white font-bold text-lg relative z-10">MY</span>
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
              <div className="flex flex-col">
                <span className={`text-xl font-bold transition-colors ${isScrolled ? "text-gray-800" : "text-gray-800"} group-hover:text-amber-600`}>
                  Mahak Yadav
                </span>
                <span className={`text-[10px] -mt-1 hidden sm:block ${isScrolled ? "text-gray-500" : "text-gray-500"}`}>Tech Mentor & Trainer</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 group"
                >
                  <span className={`relative z-10 ${
                    pathname === link.href
                      ? "text-amber-600"
                      : `${isScrolled ? "text-gray-600" : "text-gray-700"} group-hover:text-amber-600`
                  }`}>
                    {link.label}
                  </span>
                  {pathname === link.href && (
                    <motion.div
                      layoutId="navbar-active"
                      className="absolute inset-0 bg-amber-100 rounded-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <div className="absolute inset-0 bg-amber-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>

            {/* Desktop CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <Link href="/courses">
                <button className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  isScrolled 
                    ? "text-gray-600 hover:text-amber-600 hover:bg-amber-50" 
                    : "text-gray-700 hover:text-amber-600 hover:bg-amber-50"
                }`}>
                  Explore Courses
                </button>
              </Link>
              <Link href="/contact">
                <button className="px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-medium shadow-lg shadow-amber-500/20 hover:shadow-xl hover:shadow-amber-500/30 transition-all flex items-center gap-2">
                  <Sparkles size={16} />
                  Get Started
                </button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-xl transition-colors ${
                isScrolled 
                  ? "text-gray-700 hover:bg-amber-50" 
                  : "text-gray-700 hover:bg-amber-50"
              }`}
              aria-label="Toggle menu"
              whileTap={{ scale: 0.95 }}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Slide-in Menu */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[320px] bg-white border-l border-amber-100 lg:hidden shadow-[-20px_0_60px_rgba(0,0,0,0.1)]"
            >
              <div className="flex flex-col h-full">
                {/* Menu Header */}
                <div className="flex items-center justify-between p-5 border-b border-amber-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                      <span className="text-white font-bold text-xs">MY</span>
                    </div>
                    <span className="text-lg font-bold text-gray-800">Menu</span>
                  </div>
                  <motion.button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-amber-50 transition-colors"
                    whileTap={{ scale: 0.95 }}
                  >
                    <X size={20} />
                  </motion.button>
                </div>

                {/* Menu Links */}
                <div className="flex-1 overflow-y-auto py-4">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        className={`flex items-center justify-between px-6 py-4 text-base font-medium transition-all duration-300 ${
                          pathname === link.href
                            ? "text-amber-600 bg-amber-50 border-l-2 border-amber-500"
                            : "text-gray-600 hover:text-amber-600 hover:bg-amber-50"
                        }`}
                      >
                        {link.label}
                        <ChevronRight size={18} className={`transition-transform ${pathname === link.href ? "text-amber-500" : "opacity-30"}`} />
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Menu Footer - CTA Buttons */}
                <div className="p-5 border-t border-amber-100 space-y-3 bg-amber-50/50">
                  <Link href="/courses" className="block">
                    <button className="w-full px-4 py-3 rounded-full bg-white border border-amber-200 text-gray-700 font-medium hover:bg-amber-50 transition-all">
                      Explore Courses
                    </button>
                  </Link>
                  <Link href="/contact" className="block">
                    <button className="w-full px-4 py-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium shadow-lg shadow-amber-500/20 hover:shadow-xl transition-all flex items-center justify-center gap-2">
                      <Sparkles size={16} />
                      Get Started
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
