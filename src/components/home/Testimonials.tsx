"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

// Testimonials data from portfolio
const testimonials = [
  {
    name: "Saundarya Kalashetti",
    role: "Student",
    content: "Mahak ma'am's teaching style is incredibly engaging and practical. She made complex concepts easy to understand and always encouraged us to think critically. Her mentorship has been invaluable to my growth as a developer.",
    rating: 5,
  },
  {
    name: "Shalini P Tengil",
    role: "Student",
    content: "The hands-on approach to learning was exactly what I needed. Mahak ma'am's patience and dedication to each student's success is remarkable. I've gained confidence in my coding abilities thanks to her guidance.",
    rating: 5,
  },
  {
    name: "Syed Naveeth",
    role: "Student",
    content: "Learning from Mahak ma'am has been a transformative experience. Her industry insights and practical projects prepared me well for real-world challenges. I highly recommend her training programs to anyone serious about tech.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="relative py-20 bg-gradient-to-b from-white to-amber-50 overflow-hidden">
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
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-300 bg-amber-50 text-amber-700 text-sm font-medium">
            <Star size={16} className="text-amber-500 fill-amber-500" />
            STUDENT STORIES
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
            What our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-500">
              learners say
            </span>
          </h2>
          <p className="text-lg text-gray-600">
            Hear from students who have transformed their careers through personalized mentorship.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              className="relative p-6 rounded-2xl bg-white border border-amber-100 shadow-sm hover:shadow-xl hover:shadow-amber-100/50 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Quote Icon */}
              <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg">
                <Quote size={18} className="text-white" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4 pt-2">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} className="text-amber-500 fill-amber-500" />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-600 mb-6 leading-relaxed">
                &quot;{testimonial.content}&quot;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-amber-100">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
