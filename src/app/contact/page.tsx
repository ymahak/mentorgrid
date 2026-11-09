import { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { EnquiryForm } from "@/components/forms";
import { AnimatedContactElements } from "@/components/contact/AnimatedContactElements";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Mahak Yadav. Enquire about courses, programs, or corporate training. We're here to help you start your learning journey.",
};

async function getCourses() {
  const courses = await prisma.course.findMany({
    where: { isVisible: true },
    select: { title: true },
    orderBy: { order: "asc" },
  });
  return courses;
}

export default async function ContactPage() {
  const courses = await getCourses();
  const courseOptions = courses.map((c) => ({ value: c.title, label: c.title }));

  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className="bg-[#140D08] text-[#FFF6EC] relative overflow-hidden min-h-[50vh] flex items-center">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Large gradient orbs - animated */}
          <div className="absolute -top-40 right-0 w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-[#FF6B1A]/20 via-[#FF6B1A]/5 to-transparent blur-3xl animate-blob" />
          <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#FFC83D]/15 via-[#FFC83D]/5 to-transparent blur-3xl animate-blob" style={{ animationDelay: "-5s" }} />
          <div className="absolute top-1/2 left-1/3 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-[#FF6B1A]/10 to-[#FFC83D]/10 blur-3xl animate-gradient-move" />
          
          {/* Spinning circles */}
          <div className="absolute top-20 left-20 w-[250px] h-[250px] rounded-full border-2 border-[#FF6B1A]/20 animate-spin-slow" />
          <div className="absolute bottom-20 left-32 w-[180px] h-[180px] rounded-full border border-[#FFC83D]/15 animate-spin-slow-reverse" />
          
          {/* Message-like floating elements */}
          <div className="absolute top-[25%] left-[5%] w-40 h-10 rounded-2xl rounded-br-none bg-[#FF6B1A]/10 border border-[#FF6B1A]/20 animate-float" />
          <div className="absolute top-[35%] left-[8%] w-32 h-8 rounded-2xl rounded-bl-none bg-[#FFC83D]/10 border border-[#FFC83D]/20 animate-float" style={{ animationDelay: "0.5s" }} />
          <div className="absolute top-[45%] left-[3%] w-36 h-8 rounded-2xl rounded-br-none bg-[#FF6B1A]/10 border border-[#FF6B1A]/20 animate-float" style={{ animationDelay: "1s" }} />
          
          {/* Floating geometric shapes */}
          <div className="absolute top-1/4 left-[15%] w-8 h-8 border-2 border-[#FF6B1A]/30 rounded-lg rotate-45 animate-float" />
          <div className="absolute bottom-1/4 left-[20%] w-10 h-10 border-2 border-[#FFC83D]/25 rounded-xl -rotate-12 animate-float" style={{ animationDelay: "1s" }} />
          
          {/* Glowing dots */}
          <div className="absolute top-1/4 left-1/4 w-3 h-3 rounded-full bg-[#FF6B1A] shadow-[0_0_20px_rgba(255,107,26,0.6)] animate-pulse" />
          <div className="absolute top-1/3 left-[35%] w-2 h-2 rounded-full bg-[#FFC83D] shadow-[0_0_15px_rgba(255,200,61,0.5)] animate-pulse" style={{ animationDelay: "0.5s" }} />
          <div className="absolute bottom-1/3 left-1/4 w-2 h-2 rounded-full bg-[#FF6B1A] shadow-[0_0_15px_rgba(255,107,26,0.4)] animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute top-[60%] left-[10%] w-4 h-4 rounded-full bg-[#FFC83D]/80 shadow-[0_0_25px_rgba(255,200,61,0.5)] animate-pulse" style={{ animationDelay: "1.5s" }} />
          
          {/* Moving lines */}
          <div className="absolute top-[30%] left-0 w-[200px] h-[2px] bg-gradient-to-r from-transparent via-[#FF6B1A]/30 to-transparent animate-float" style={{ animationDelay: "0.3s" }} />
          <div className="absolute top-[50%] left-[10%] w-[150px] h-[2px] bg-gradient-to-r from-transparent via-[#FFC83D]/25 to-transparent animate-float" style={{ animationDelay: "0.8s" }} />
          <div className="absolute top-[70%] left-[5%] w-[180px] h-[2px] bg-gradient-to-r from-transparent via-[#FF6B1A]/20 to-transparent animate-float" style={{ animationDelay: "1.3s" }} />
        </div>

        {/* Grid pattern */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(#22160E 1px, transparent 1px), linear-gradient(90deg, #22160E 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />

        <div className="relative max-w-[1280px] mx-auto px-6 py-20 w-full">
          <nav className="text-sm text-[#A89785] mb-8">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">Contact</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <span className="inline-block bg-[#FF6B1A] text-[#140D08] font-extrabold text-xs tracking-wider px-4 py-2 rounded-full mb-6">
                LET&apos;S CONNECT
              </span>
              <h1
                className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[0.9] tracking-tight mb-6"
                style={{ fontFamily: "var(--font-inter), sans-serif", letterSpacing: "-3px" }}
              >
                Ready when{" "}
                <span className="text-[#FF6B1A] inline-block hover:scale-105 transition-transform cursor-default">
                  you are.
                </span>
              </h1>
              <p className="text-xl text-[#C9B9A8] max-w-[600px]">
                Have questions? We&apos;re here to help you start your learning
                journey. Book a call or send us a message.
              </p>
            </div>

            {/* Right Image */}
            <div className="hidden lg:block relative">
              <div 
                className="relative w-full h-[380px] rounded-[32px] overflow-hidden border-[3px] border-[#3A2A1D]"
                style={{ boxShadow: "12px 12px 0 #FF6B1A" }}
              >
                <img
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=90"
                  alt="Get in touch"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#140D08]/50 to-transparent" />
              </div>
              
              {/* Floating badge */}
              <div 
                className="absolute -bottom-4 -left-4 bg-[#FFC83D] text-[#140D08] px-5 py-3 rounded-2xl border-[3px] border-[#140D08]"
                style={{ boxShadow: "4px 4px 0 #140D08" }}
              >
                <div className="text-2xl font-extrabold" style={{ fontFamily: "var(--font-inter), sans-serif" }}>24h</div>
                <div className="text-xs font-bold">Response</div>
              </div>
              
              {/* Floating badge 2 */}
              <div 
                className="absolute -top-4 -right-4 bg-[#FF6B1A] text-[#140D08] px-5 py-3 rounded-2xl border-[3px] border-[#140D08]"
                style={{ boxShadow: "4px 4px 0 #140D08" }}
              >
                <div className="text-2xl font-extrabold" style={{ fontFamily: "var(--font-inter), sans-serif" }}>Free</div>
                <div className="text-xs font-bold">Consultation</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-[#FFF6EC] relative overflow-hidden">
        {/* Animated background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Large morphing gradient blobs */}
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-gradient-to-bl from-[#FF6B1A]/10 via-[#FF6B1A]/3 to-transparent rounded-full blur-3xl animate-blob" />
          <div className="absolute -bottom-40 -left-40 w-[450px] h-[450px] bg-gradient-to-tr from-[#FFC83D]/12 via-[#FFC83D]/4 to-transparent rounded-full blur-3xl animate-blob" style={{ animationDelay: "-5s" }} />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-r from-[#FF6B1A]/4 via-transparent to-[#FFC83D]/4 rounded-full blur-3xl animate-gradient-move" />
          
          {/* Floating geometric shapes */}
          <div className="absolute top-20 right-[10%] w-20 h-20 border-2 border-[#FF6B1A]/10 rounded-2xl rotate-12 animate-float" />
          <div className="absolute bottom-32 left-[8%] w-16 h-16 border-2 border-[#FFC83D]/12 rounded-full animate-float" style={{ animationDelay: "1s" }} />
          <div className="absolute top-1/2 left-[5%] w-12 h-12 border border-[#140D08]/5 rounded-xl -rotate-6 animate-float" style={{ animationDelay: "0.5s" }} />
          <div className="absolute bottom-20 right-[15%] w-24 h-24 border-2 border-[#FF6B1A]/8 rounded-3xl rotate-45 animate-float" style={{ animationDelay: "1.5s" }} />
          
          {/* Message-like decorative elements */}
          <div className="absolute top-40 left-[3%] w-32 h-8 rounded-xl bg-[#FF6B1A]/5 border border-[#FF6B1A]/10" />
          <div className="absolute top-52 left-[5%] w-24 h-6 rounded-xl bg-[#FFC83D]/5 border border-[#FFC83D]/10" />
          
          {/* Subtle dots */}
          <div className="absolute top-1/4 left-1/3 w-2 h-2 rounded-full bg-[#FF6B1A]/20" />
          <div className="absolute top-2/5 right-1/4 w-3 h-3 rounded-full bg-[#FFC83D]/15" />
          <div className="absolute bottom-1/4 left-1/4 w-2 h-2 rounded-full bg-[#FF6B1A]/15" />
          <div className="absolute bottom-1/3 right-1/3 w-2 h-2 rounded-full bg-[#FFC83D]/20" />
        </div>
        
        <div className="relative max-w-[1280px] mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <AnimatedContactElements />

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div
                className="p-6 md:p-8 rounded-[28px] bg-white border-[3px] border-[#140D08] hover:shadow-2xl transition-shadow duration-500 relative overflow-hidden"
                style={{ boxShadow: "8px 8px 0 #140D08" }}
              >
                {/* Form background decoration */}
                <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-bl from-[#FF6B1A]/5 to-transparent blur-2xl" />
                
                <h3
                  className="relative text-2xl font-extrabold text-[#140D08] mb-6"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}
                >
                  Send us a Message
                </h3>
                <EnquiryForm courseOptions={courseOptions} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
