"use client";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  imageUrl?: string | null;
  isVisible?: boolean;
  order?: number;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

const placeholderTestimonials = [
  {
    id: "1",
    name: "Saundarya Kalashetti",
    role: "Python | Power BI | Data Analytics",
    content:
      "Mahak's teaching method is outstanding. The clarity and practical examples really help in understanding complex concepts better. Highly recommend for anyone starting their tech journey.",
  },
  {
    id: "2",
    name: "Rohit Verma",
    role: "Full Stack Developer | React & Node.js",
    content:
      "The hands-on approach to learning made all the difference. Every session was focused on building real projects, not just theory. I landed my first developer job within 3 months.",
  },
  {
    id: "3",
    name: "Priya Sharma",
    role: "Data Science Intern | B.Tech CSE",
    content:
      "Mahak's mentorship helped me transition from a complete beginner to confidently working on ML projects. The personalized guidance and code reviews were invaluable.",
  },
];

const rotations = ["-1.5deg", "1deg", "-0.5deg"];

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const displayTestimonials =
    testimonials.length > 0 ? testimonials : placeholderTestimonials;

  return (
    <section className="bg-[#FFC83D] border-t-[2px] border-b-[2px] border-[#140D08]">
      <div className="max-w-[1280px] mx-auto px-6 py-20">
        <h2
          className="m-0 mb-10 font-extrabold leading-[0.98] tracking-tight"
          style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "clamp(32px, 4vw, 56px)",
            letterSpacing: "-1.5px",
          }}
        >
          Reviews
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayTestimonials.slice(0, 3).map((testimonial, i) => (
            <figure
              key={testimonial.id}
              className="m-0 rounded-[20px] p-6 border-[2px] border-[#140D08]"
              style={{
                background: i === 1 ? "#140D08" : "#FFF6EC",
                color: i === 1 ? "#FFF6EC" : "#140D08",
                transform: `rotate(${rotations[i]})`,
              }}
            >
              <svg
                width="32"
                height="26"
                viewBox="0 0 40 32"
                aria-hidden="true"
              >
                <path
                  d="M0 32V18C0 8 6 2 16 0l2 5c-6 2-9 6-9 11h7v16zm22 0V18c0-10 6-16 16-18l2 5c-6 2-9 6-9 11h7v16z"
                  fill={i === 1 ? "#FFC83D" : "#FF6B1A"}
                />
              </svg>
              <blockquote
                className="m-0 mt-3 font-bold text-base leading-[1.4]"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                {testimonial.content}
              </blockquote>
              <figcaption
                className="mt-4 text-xs"
                style={{ color: i === 1 ? "#C9B9A8" : undefined }}
              >
                <strong style={{ color: i === 1 ? "#FFF6EC" : undefined }}>
                  {testimonial.name}
                </strong>{" "}
                · {testimonial.role}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
