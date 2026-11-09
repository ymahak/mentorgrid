"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui";
import Button from "@/components/ui/Button";
import GradientBackground from "@/components/ui/GradientBackground";
import { pricingPlans } from "@/lib/constants";

export default function PricingSection() {
  return (
    <GradientBackground variant="subtle" className="section">
      <div className="container-custom">
        <SectionHeading
          subtitle="Flexible Plans"
          title="Choose Your Learning Path"
          description="Flexible pricing options designed to fit your learning goals and budget."
        />

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-2xl ${
                plan.highlighted
                  ? "bg-gradient-to-b from-brand-purple/20 to-brand-blue/20 border-2 border-brand-purple/50 shadow-[0_0_40px_rgba(128,87,245,0.2)]"
                  : "bg-white/[0.03] border border-white/[0.08]"
              }`}
            >
              {/* Popular Badge */}
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-brand-purple to-brand-blue text-white text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="p-6 md:p-8">
                {/* Plan Name */}
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-text-secondary text-sm mb-6">{plan.description}</p>

                {/* Price */}
                <div className="mb-6">
                  <span className="text-3xl font-bold text-white">{plan.cta}</span>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-brand-purple/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check size={12} className="text-brand-purple" />
                      </div>
                      <span className="text-text-secondary text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Link href="/contact">
                  <Button
                    variant={plan.highlighted ? "primary" : "secondary"}
                    fullWidth
                    rightIcon={<ArrowRight size={18} />}
                  >
                    Get Started
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center text-text-muted text-sm mt-8"
        >
          All plans include access to learning resources and community support.
          <br />
          Contact us for custom enterprise solutions.
        </motion.p>
      </div>
    </GradientBackground>
  );
}
