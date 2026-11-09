"use client";

import { motion } from "framer-motion";
import { 
  Compass, 
  BookOpen, 
  PenTool, 
  Rocket, 
  MessageSquare, 
  Trophy,
  ArrowRight
} from "lucide-react";
import { learningJourneySteps } from "@/lib/constants";

const iconMap = [Compass, BookOpen, PenTool, Rocket, MessageSquare, Trophy];

export default function LearningJourney() {
  return (
    <section id="learning-journey" className="relative py-20 bg-gradient-to-b from-amber-50 to-white overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-gradient-to-br from-amber-100/50 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-gradient-to-tl from-orange-100/50 to-transparent rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        {/* Section Badge */}
        <motion.div
          className="flex justify-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-300 bg-amber-50 text-amber-700 text-sm font-medium">
            <Compass size={16} className="text-amber-500" />
            YOUR PATH TO SUCCESS
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
            The{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-500">
              learning journey
            </span>
          </h2>
          <p className="text-lg text-gray-600">
            A structured approach to help you go from beginner to industry-ready professional.
          </p>
        </motion.div>

        {/* Timeline - Horizontal on desktop, vertical on mobile */}
        <div className="relative">
          {/* Horizontal line - desktop only */}
          <div className="hidden lg:block absolute top-[60px] left-0 right-0 h-0.5 bg-gradient-to-r from-amber-200 via-amber-400 to-orange-400" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 lg:gap-4">
            {learningJourneySteps.map((step, index) => {
              const Icon = iconMap[index];

              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Step Card */}
                  <div className="group p-6 rounded-2xl bg-white border border-amber-100 shadow-sm hover:shadow-xl hover:shadow-amber-100/50 transition-all duration-300 h-full">
                    {/* Icon Circle */}
                    <div className="relative mb-4">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-110 transition-transform duration-300">
                        <Icon size={28} className="text-white" />
                      </div>
                      {/* Step Number Badge */}
                      <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white border-2 border-amber-400 flex items-center justify-center">
                        <span className="text-xs font-bold text-amber-600">{step.step}</span>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-gray-800 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Arrow connector - desktop only, not on last item */}
                  {index < learningJourneySteps.length - 1 && (
                    <div className="hidden lg:flex absolute top-[60px] -right-4 w-8 items-center justify-center z-10">
                      <ArrowRight size={16} className="text-amber-400" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
