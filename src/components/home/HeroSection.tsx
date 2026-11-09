"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Users, BookOpen, Award, Briefcase } from "lucide-react";
import Button from "@/components/ui/Button";

// Curved Image Gallery Component
const CurvedImageGallery = () => {
  const images = [
    { src: "/images/mahak-yadav.jpg", alt: "Mahak Yadav", rotate: -15, x: -120, y: 20 },
    { src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=200&h=280&fit=crop", alt: "Team collaboration", rotate: -8, x: -60, y: -10 },
    { src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=200&h=280&fit=crop", alt: "Learning", rotate: 0, x: 0, y: -20 },
    { src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=200&h=280&fit=crop", alt: "Office work", rotate: 8, x: 60, y: -10 },
    { src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=200&h=280&fit=crop", alt: "Team meeting", rotate: 15, x: 120, y: 20 },
  ];

  return (
    <div className="relative flex justify-center items-end h-[320px] mt-8">
      {images.map((img, index) => (
        <motion.div
          key={index}
          className="absolute w-[140px] h-[180px] md:w-[160px] md:h-[200px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/90"
          style={{
            transform: `translateX(${img.x}px) translateY(${img.y}px) rotate(${img.rotate}deg)`,
            zIndex: index === 2 ? 10 : 5 - Math.abs(index - 2),
          }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: img.y }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          whileHover={{ 
            scale: 1.05, 
            zIndex: 20,
            transition: { duration: 0.2 }
          }}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            className="object-cover"
          />
        </motion.div>
      ))}
    </div>
  );
};

// Floating Feature Card
const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description,
  className = "",
  delay = 0
}: { 
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  description: string;
  className?: string;
  delay?: number;
}) => (
  <motion.div
    className={`px-4 py-3 rounded-xl bg-white/80 backdrop-blur-sm border border-amber-200/50 shadow-lg ${className}`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
  >
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center flex-shrink-0">
        <Icon size={20} className="text-white" />
      </div>
      <div>
        <h4 className="font-semibold text-gray-800 text-sm">{title}</h4>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
    </div>
  </motion.div>
);

// Stats Component
const StatsSection = () => {
  const stats = [
    { value: "400+", label: "Students Trained" },
    { value: "10+", label: "Training Programs" },
    { value: "100%", label: "Practical Learning" },
    { value: "1:1", label: "Personalized Support" },
  ];

  return (
    <motion.div 
      className="flex flex-wrap justify-center gap-8 md:gap-16 py-8"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {stats.map((stat, index) => (
        <div key={index} className="text-center">
          <div className="text-3xl md:text-4xl font-bold text-gray-800">{stat.value}</div>
          <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
        </div>
      ))}
    </motion.div>
  );
};

// Skill Tags
const SkillTags = () => {
  const skills = [
    { label: "Python", active: false },
    { label: "React.js", active: true },
    { label: "AI/ML", active: false },
    { label: "Data Science", active: true },
    { label: "Node.js", active: false },
    { label: "Full Stack", active: true },
  ];

  return (
    <motion.div 
      className="absolute right-4 md:right-8 top-1/3 p-4 rounded-2xl bg-white/90 backdrop-blur-sm border border-amber-200/50 shadow-xl max-w-[200px]"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      <p className="text-sm text-gray-600 mb-3">What would you like to learn?</p>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <span
            key={index}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
              skill.active 
                ? "bg-amber-500 text-white" 
                : "bg-amber-100 text-amber-700 hover:bg-amber-200"
            }`}
          >
            + {skill.label}
          </span>
        ))}
      </div>
      <p className="text-xs text-gray-400 mt-3 italic">&quot;Your journey starts where you are&quot;</p>
    </motion.div>
  );
};

export default function HeroSection() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-amber-50 via-orange-50 to-amber-100">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-200/40 via-transparent to-transparent" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-orange-200/30 to-transparent rounded-full blur-3xl" />
        </div>

        {/* Top Banner */}
        <motion.div 
          className="relative z-10 bg-gradient-to-r from-amber-600 to-orange-500 text-white text-center py-2.5 text-sm"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="font-medium">🎓 New Batch Starting Soon!</span>
          <Link href="/courses" className="ml-2 underline underline-offset-2 hover:text-amber-100 transition-colors">
            Enroll Now →
          </Link>
        </motion.div>

        <div className="container-custom relative z-10 pt-16 pb-8">
          {/* Badge */}
          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-300 bg-white/60 backdrop-blur-sm text-amber-700 text-sm font-medium">
              <Sparkles size={16} className="text-amber-500" />
              PERSONALIZED TECH TRAINING & MENTORSHIP
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.div 
            className="text-center max-w-4xl mx-auto mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight mb-6">
              Make space for a{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-500">
                brighter career
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Personalized training in AI/ML, Data Science, and Full-Stack Development 
              with hands-on projects for lasting career growth.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Link href="/contact">
              <button className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-600 to-orange-500 text-white font-medium shadow-lg shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-500/40 transition-all flex items-center gap-2">
                Book Your First Session
                <ArrowRight size={18} />
              </button>
            </Link>
            <Link href="/courses">
              <button className="px-6 py-3 rounded-full bg-white/80 backdrop-blur-sm border border-amber-200 text-gray-700 font-medium hover:bg-white transition-all flex items-center gap-2">
                Explore Our Programs
                <ArrowRight size={18} />
              </button>
            </Link>
          </motion.div>

          {/* Floating Feature Cards - Left Side */}
          <div className="hidden lg:block">
            <motion.div
              className="absolute left-4 xl:left-12 top-[45%]"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <FeatureCard 
                icon={Users} 
                title="Personalized" 
                description="Training tailored to you"
                delay={0.6}
              />
            </motion.div>
            <motion.div
              className="absolute left-8 xl:left-20 top-[60%]"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <FeatureCard 
                icon={BookOpen} 
                title="Hands-on" 
                description="Learn by building projects"
                delay={0.7}
              />
            </motion.div>
            <motion.div
              className="absolute left-4 xl:left-12 top-[75%]"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <FeatureCard 
                icon={Briefcase} 
                title="Industry Ready" 
                description="Real-world skills"
                delay={0.8}
              />
            </motion.div>
          </div>

          {/* Skill Tags - Right Side */}
          <div className="hidden lg:block">
            <SkillTags />
          </div>

          {/* Curved Image Gallery */}
          <CurvedImageGallery />
        </div>
      </section>

      {/* About Section */}
      <section className="relative py-20 bg-gradient-to-b from-amber-100 to-amber-50">
        <div className="container-custom">
          {/* Section Badge */}
          <motion.div
            className="flex justify-center mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-300 bg-white/60 backdrop-blur-sm text-amber-700 text-sm font-medium">
              <Award size={16} className="text-amber-500" />
              ABOUT MAHAK YADAV
            </span>
          </motion.div>

          {/* Section Title */}
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              Helping people find clarity,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-500">
                skills, and confidence
              </span>
            </h2>
            <p className="text-lg text-gray-600">
              I believe meaningful learning starts with understanding. My goal is to help 
              students succeed in tech through practical, hands-on training and personalized mentorship.
            </p>
          </motion.div>

          {/* CTA Button */}
          <motion.div 
            className="flex justify-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link href="/mentor">
              <button className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-600 to-orange-500 text-white font-medium shadow-lg shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-500/40 transition-all flex items-center gap-2">
                Learn More About Me
                <ArrowRight size={18} />
              </button>
            </Link>
          </motion.div>

          {/* Stats */}
          <StatsSection />
        </div>
      </section>
    </>
  );
}
