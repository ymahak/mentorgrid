"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export function AnimatedContactElements() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const cards = [
    {
      type: "email",
      href: "mailto:ymahaky@gmail.com",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#140D08" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
      iconBg: "#FF6B1A",
      label: "Email",
      value: "ymahaky@gmail.com",
      shadowColor: "#140D08",
    },
    {
      type: "location",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#140D08" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
      iconBg: "#FFC83D",
      label: "Location",
      value: "India",
      shadowColor: "#FFC83D",
    },
  ];

  return (
    <div ref={ref} className="space-y-6">
      {/* Email & Location Cards */}
      {cards.map((card, index) => (
        <div
          key={card.type}
          className={`p-6 rounded-[24px] bg-white border-[3px] border-[#140D08] group ${
            card.href ? "cursor-pointer" : ""
          }`}
          style={{
            boxShadow: `6px 6px 0 ${card.shadowColor}`,
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateX(0)" : "translateX(-30px)",
            transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 100}ms`,
          }}
          onClick={() => card.href && window.open(card.href)}
        >
          <div className="flex items-start gap-4">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300"
              style={{ backgroundColor: card.iconBg }}
            >
              {card.icon}
            </div>
            <div>
              <p className="text-sm text-[#6B5847] mb-1">{card.label}</p>
              <p className="text-[#140D08] font-bold group-hover:text-[#FF6B1A] transition-colors">
                {card.value}
              </p>
            </div>
          </div>
        </div>
      ))}

      {/* Quick Response Card */}
      <div
        className="p-6 rounded-[24px] bg-[#140D08] text-[#FFF6EC] border-[3px] border-[#140D08] group"
        style={{
          boxShadow: "6px 6px 0 #FF6B1A",
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateX(0)" : "translateX(-30px)",
          transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 200ms",
        }}
      >
        <div className="flex items-center gap-3 mb-4">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FF6B1A"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="group-hover:scale-110 transition-transform"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <h4
            className="font-bold"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            Quick Response
          </h4>
        </div>
        <p className="text-[#C9B9A8] text-sm">
          We typically respond within 24 hours. For urgent queries,
          please mention it in your message.
        </p>
        
        {/* Animated dots */}
        <div className="flex gap-1 mt-4">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-2 h-2 rounded-full bg-[#FF6B1A] animate-bounce"
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: "1s",
              }}
            />
          ))}
        </div>
      </div>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/919817748915"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-3 w-full p-4 rounded-full bg-[#25D366] text-white font-bold hover:scale-105 hover:shadow-xl transition-all duration-300 group"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 300ms",
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="group-hover:scale-110 transition-transform"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        Chat on WhatsApp
      </a>
    </div>
  );
}
