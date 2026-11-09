"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface PageWrapperProps {
  children: React.ReactNode;
}

export function PageWrapper({ children }: PageWrapperProps) {
  const pathname = usePathname();
  
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/courses", label: "Courses & Programs" },
    { href: "/projects", label: "Projects" },
    { href: "/blog", label: "Blog" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <div
      style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
      className="bg-[#FFF6EC] text-[#140D08] min-h-screen"
    >
      {/* Header */}
      <header className="bg-[#140D08] text-[#FFF6EC]">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex flex-wrap items-center justify-between gap-[18px] py-6">
            <Link
              href="/"
              className="flex items-center gap-3 no-underline text-[#FFF6EC]"
            >
              <span
                className="w-12 h-12 rounded-[14px] bg-[#FF6B1A] text-[#140D08] inline-flex items-center justify-center font-extrabold text-[19px] -rotate-6"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                MY
              </span>
              <span className="flex flex-col leading-tight">
                <span
                  className="font-extrabold text-[21px]"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}
                >
                  Mahak Yadav
                </span>
                <span className="text-xs text-[#C9B9A8] tracking-wide">
                  Tech Mentor & Trainer
                </span>
              </span>
            </Link>

            <nav
              aria-label="Main"
              className="hidden lg:flex flex-wrap items-center gap-[6px] bg-[#22160E] border border-[#3A2A1D] rounded-full p-[6px]"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`no-underline text-sm px-[18px] py-[10px] rounded-full transition-colors ${
                    isActive(link.href)
                      ? "bg-[#FFF6EC] text-[#140D08] font-bold"
                      : "text-[#E8DCCD] hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <Link
              href="/contact"
              className="bg-[#FF6B1A] text-[#140D08] no-underline font-extrabold text-[15px] px-[22px] py-[14px] rounded-full inline-flex items-center gap-2 border-2 border-[#FFF6EC] hover:scale-105 transition-transform"
            >
              Book a session
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M7 17L17 7M9 7h8v8" />
              </svg>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      {children}

      {/* Footer */}
      <footer className="bg-[#FFF6EC] border-t-[2px] border-[#140D08]">
        <div className="max-w-[1280px] mx-auto px-6 pt-10 pb-6 flex flex-col gap-8">
          <div className="flex flex-wrap justify-between gap-6 text-sm">
            <div className="flex flex-col gap-3 max-w-[300px]">
              <span className="flex items-center gap-2">
                <span
                  className="w-9 h-9 rounded-lg bg-[#FF6B1A] inline-flex items-center justify-center font-extrabold text-sm -rotate-6"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}
                >
                  MY
                </span>
                <span
                  className="font-extrabold text-lg"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}
                >
                  Mahak Yadav
                </span>
              </span>
              <span className="text-[#6B5847] text-xs">
                Personalised training in AI/ML, Data Science and Full-Stack
                Development.
              </span>
              {/* Contact Info in Footer */}
              <div className="flex flex-col gap-1 mt-2 text-xs">
                <a href="tel:+919817748915" className="flex items-center gap-2 text-[#4A3626] hover:text-[#FF6B1A]">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +91 98177 48915
                </a>
                <a href="mailto:ymahaky@gmail.com" className="flex items-center gap-2 text-[#4A3626] hover:text-[#FF6B1A]">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  ymahaky@gmail.com
                </a>
              </div>
            </div>

            <div className="flex flex-wrap gap-10">
              <div className="flex flex-col gap-2">
                <strong className="text-xs">Learn</strong>
                <Link
                  href="/courses"
                  className="no-underline text-[#4A3626] hover:text-[#140D08] text-xs"
                >
                  Courses & Programs
                </Link>
                <Link
                  href="/projects"
                  className="no-underline text-[#4A3626] hover:text-[#140D08] text-xs"
                >
                  Projects
                </Link>
                <Link
                  href="/blog"
                  className="no-underline text-[#4A3626] hover:text-[#140D08] text-xs"
                >
                  Blog
                </Link>
              </div>
              <div className="flex flex-col gap-2">
                <strong className="text-xs">Mahak</strong>
                <Link
                  href="/about"
                  className="no-underline text-[#4A3626] hover:text-[#140D08] text-xs"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="no-underline text-[#4A3626] hover:text-[#140D08] text-xs"
                >
                  Contact
                </Link>
              </div>
              <div className="flex flex-col gap-2">
                <strong className="text-xs">Connect</strong>
                <Link
                  href="https://www.linkedin.com/in/mahak-42675a39b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="no-underline text-[#4A3626] hover:text-[#140D08] text-xs"
                >
                  LinkedIn
                </Link>
                <Link
                  href="https://github.com/ymahak"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="no-underline text-[#4A3626] hover:text-[#140D08] text-xs"
                >
                  GitHub
                </Link>
                <a
                  href="https://wa.me/919817748915"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="no-underline text-[#4A3626] hover:text-[#140D08] text-xs"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="font-extrabold leading-[0.8] tracking-tight text-[#140D08]"
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "clamp(48px, 10vw, 140px)",
              letterSpacing: "-4px",
            }}
          >
            mahak yadav<span className="text-[#FF6B1A]">.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
