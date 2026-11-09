"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const beforeCode = `# Beginner Code 😅
def calc(n):
    x = []
    for i in range(len(n)):
        if n[i] % 2 == 0:
            x.append(n[i] * 2)
        else:
            x.append(n[i])
    return x

nums = [1, 2, 3, 4, 5]
result = calc(nums)
print(result)`;

const afterCode = `# Professional Code ✨
from typing import List

def transform_numbers(numbers: List[int]) -> List[int]:
    """Double even numbers, keep odd numbers unchanged."""
    return [
        num * 2 if num % 2 == 0 else num 
        for num in numbers
    ]

if __name__ == "__main__":
    numbers = [1, 2, 3, 4, 5]
    result = transform_numbers(numbers)
    print(f"Transformed: {result}")`;

const improvements = [
  { label: "Type Hints", description: "Clear input/output types" },
  { label: "Docstrings", description: "Self-documenting code" },
  { label: "List Comprehension", description: "Pythonic & efficient" },
  { label: "Meaningful Names", description: "Readable variables" },
  { label: "Main Guard", description: "Proper module structure" },
];

export function CodeComparison() {
  const [activeTab, setActiveTab] = useState<"before" | "after">("before");

  return (
    <section className="py-16 bg-[#140D08] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#FF6B1A]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FFC83D]/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-12">
          <span className="inline-block bg-[#FFC83D] text-[#140D08] font-extrabold text-xs tracking-wider px-4 py-2 rounded-full mb-4">
            TRANSFORMATION
          </span>
          <h2
            className="text-4xl md:text-5xl font-extrabold text-[#FFF6EC] mb-4"
            style={{ fontFamily: "var(--font-inter), sans-serif", letterSpacing: "-2px" }}
          >
            From Beginner to Pro
          </h2>
          <p className="text-[#A89785] max-w-xl mx-auto">
            See how your code transforms with proper training. Clean, professional, and industry-ready.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Code Panels */}
          <div className="space-y-4">
            {/* Mobile Tabs */}
            <div className="flex gap-2 lg:hidden">
              <button
                onClick={() => setActiveTab("before")}
                className={`flex-1 py-2 px-4 rounded-full font-bold text-sm transition-all ${
                  activeTab === "before"
                    ? "bg-red-500/20 text-red-400 border-2 border-red-500/50"
                    : "bg-[#22160E] text-[#A89785] border-2 border-transparent"
                }`}
              >
                Before 😅
              </button>
              <button
                onClick={() => setActiveTab("after")}
                className={`flex-1 py-2 px-4 rounded-full font-bold text-sm transition-all ${
                  activeTab === "after"
                    ? "bg-green-500/20 text-green-400 border-2 border-green-500/50"
                    : "bg-[#22160E] text-[#A89785] border-2 border-transparent"
                }`}
              >
                After ✨
              </button>
            </div>

            {/* Before Code */}
            <motion.div
              className={`lg:block ${activeTab === "before" ? "block" : "hidden"}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="rounded-2xl overflow-hidden border-2 border-red-500/30 bg-[#1a1a2e]">
                <div className="flex items-center justify-between px-4 py-3 bg-[#16162a] border-b border-red-500/20">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-red-500" />
                      <span className="w-3 h-3 rounded-full bg-yellow-500" />
                      <span className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <span className="text-xs text-red-400 font-mono ml-2">before.py</span>
                  </div>
                  <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded-full font-bold">
                    BEFORE
                  </span>
                </div>
                <pre className="p-4 text-sm overflow-x-auto">
                  <code className="text-[#e0e0e0] font-mono whitespace-pre">{beforeCode}</code>
                </pre>
              </div>
            </motion.div>

            {/* After Code */}
            <motion.div
              className={`lg:block ${activeTab === "after" ? "block" : "hidden"}`}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="rounded-2xl overflow-hidden border-2 border-green-500/30 bg-[#1a1a2e]">
                <div className="flex items-center justify-between px-4 py-3 bg-[#16162a] border-b border-green-500/20">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-red-500" />
                      <span className="w-3 h-3 rounded-full bg-yellow-500" />
                      <span className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <span className="text-xs text-green-400 font-mono ml-2">after.py</span>
                  </div>
                  <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full font-bold">
                    AFTER
                  </span>
                </div>
                <pre className="p-4 text-sm overflow-x-auto">
                  <code className="text-[#e0e0e0] font-mono whitespace-pre">{afterCode}</code>
                </pre>
              </div>
            </motion.div>
          </div>

          {/* Improvements List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-[#22160E] rounded-2xl p-6 border border-[#3A2A1D]"
          >
            <h3 className="text-xl font-bold text-[#FFF6EC] mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#FFC83D]" />
              What You'll Learn
            </h3>

            <div className="space-y-4">
              {improvements.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-start gap-3 p-3 rounded-xl bg-[#140D08]/50 hover:bg-[#FF6B1A]/10 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#FF6B1A]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#FF6B1A]/30 transition-colors">
                    <span className="text-[#FF6B1A] font-bold text-sm">{index + 1}</span>
                  </div>
                  <div>
                    <div className="font-bold text-[#FFF6EC]">{item.label}</div>
                    <div className="text-sm text-[#A89785]">{item.description}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.a
              href="/courses/python-programming"
              className="mt-6 w-full bg-gradient-to-r from-[#FF6B1A] to-[#FFC83D] text-[#140D08] font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Start Your Transformation
              <ArrowRight className="w-5 h-5" />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
