"use client";

import { motion } from "framer-motion";
import { Trophy, Star, Users, Award, Zap } from "lucide-react";

const badges = [
  {
    icon: <Trophy className="w-5 h-5" />,
    label: "Top Rated Mentor",
    color: "#FF6B1A",
    position: { top: "15%", left: "5%" },
    delay: 0,
  },
  {
    icon: <Star className="w-5 h-5" />,
    label: "4.9/5 Rating",
    color: "#FFC83D",
    position: { top: "25%", right: "3%" },
    delay: 0.5,
  },
  {
    icon: <Users className="w-5 h-5" />,
    label: "400+ Students",
    color: "#FF6B1A",
    position: { bottom: "30%", left: "2%" },
    delay: 1,
  },
  {
    icon: <Award className="w-5 h-5" />,
    label: "Industry Expert",
    color: "#FFC83D",
    position: { bottom: "20%", right: "5%" },
    delay: 1.5,
  },
  {
    icon: <Zap className="w-5 h-5" />,
    label: "Fast Track Learning",
    color: "#FF6B1A",
    position: { top: "50%", left: "8%" },
    delay: 2,
  },
];

export function FloatingBadges() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden hidden lg:block">
      {badges.map((badge, index) => (
        <motion.div
          key={badge.label}
          className="absolute"
          style={badge.position as React.CSSProperties}
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            y: [0, -10, 0],
          }}
          transition={{
            opacity: { delay: badge.delay, duration: 0.5 },
            scale: { delay: badge.delay, duration: 0.5, type: "spring" },
            y: { 
              delay: badge.delay + 0.5, 
              duration: 3, 
              repeat: Infinity, 
              ease: "easeInOut" 
            },
          }}
        >
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-full shadow-lg backdrop-blur-sm border"
            style={{
              backgroundColor: `${badge.color}15`,
              borderColor: `${badge.color}40`,
            }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: badge.color }}
            >
              <span className="text-[#140D08]">{badge.icon}</span>
            </div>
            <span className="text-sm font-bold text-[#FFF6EC] whitespace-nowrap">
              {badge.label}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// Compact version for smaller sections
export function FloatingBadgesCompact() {
  const compactBadges = badges.slice(0, 3);
  
  return (
    <div className="flex flex-wrap justify-center gap-3 mt-6">
      {compactBadges.map((badge, index) => (
        <motion.div
          key={badge.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 }}
          whileHover={{ scale: 1.05, y: -2 }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full border cursor-default"
          style={{
            backgroundColor: `${badge.color}15`,
            borderColor: `${badge.color}40`,
          }}
        >
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center"
            style={{ backgroundColor: badge.color }}
          >
            <span className="text-[#140D08] scale-75">{badge.icon}</span>
          </div>
          <span className="text-xs font-bold text-[#FFF6EC]">
            {badge.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
