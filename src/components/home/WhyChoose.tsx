"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Code2, 
  Target, 
  UserCheck, 
  Video, 
  FolderGit2, 
  HeartHandshake,
  ArrowRight,
  CheckCircle2
} from "lucide-react";
import { whyChooseFeatures } from "@/lib/constants";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Code2,
  Target,
  UserCheck,
  Video,
  FolderGit2,
  HeartHandshake,
};

export default function WhyChoose() {
  return (
    <section className="relative py-20 bg-gradient-to-b from-amber-50 to-white overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-amber-100/50 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-gradient-to-tr from-orange-100/50 to-transparent rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        {/* Section Badge */}
        <motion.div
          className="flex justify-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-300 bg-white/60 backdrop-blur-sm text-amber-700 text-sm font-medium">
            <Target size={16} className="text-amber-500" />
            HOW MAHAK YADAV WORKS
          </span>
        </motion.div>

        {/* Section Title */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Your journey to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-500">
              tech excellence
            </span>{" "}
            starts here
          </h2>
          <p className="text-lg text-gray-600">
            A structured approach to learning that combines theory with practice, 
            ensuring you&apos;re ready for real-world challenges.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {whyChooseFeatures.map((feature, index) => {
            const Icon = iconMap[feature.icon] || Code2;
            return (
              <motion.div
                key={feature.title}
                className="group p-6 rounded-2xl bg-white border border-amber-100 shadow-sm hover:shadow-xl hover:shadow-amber-100/50 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon size={28} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA Card */}
        <motion.div
          className="relative rounded-3xl overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-orange-500" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6bTAtMThjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6bTE4IDBjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
          
          <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center p-8 md:p-12">
            {/* Left Content */}
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Ready to transform your career?
              </h3>
              <p className="text-amber-100 mb-6">
                Join 400+ students who have already started their journey to becoming 
                industry-ready professionals through personalized mentorship.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/courses">
                  <button className="px-6 py-3 rounded-full bg-white text-amber-600 font-medium hover:bg-amber-50 transition-all flex items-center gap-2">
                    View All Courses
                    <ArrowRight size={18} />
                  </button>
                </Link>
                <Link href="/contact">
                  <button className="px-6 py-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white font-medium hover:bg-white/30 transition-all">
                    Get in Touch
                  </button>
                </Link>
              </div>
            </div>

            {/* Right - Checklist */}
            <div className="space-y-4">
              {[
                "Personalized learning paths",
                "Real-world project experience",
                "1:1 mentorship sessions",
                "Industry-relevant curriculum",
                "Career guidance & support",
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-3 text-white"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 size={16} className="text-white" />
                  </div>
                  <span className="font-medium">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
