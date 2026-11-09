import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ChatWidget } from "@/components/chat/ChatWidget";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "Mahak Yadav | Tech Mentor & Trainer",
    template: "%s | Mahak Yadav",
  },
  description:
    "1:1 and small-batch training in AI/ML, Data Science and Full-Stack Development. Learn by building real projects, at your pace, with a mentor who knows your goal.",
  keywords: [
    "Mahak Yadav",
    "Tech Mentor",
    "Data Science",
    "Full Stack Development",
    "AI",
    "Machine Learning",
    "Python",
    "React",
    "Node.js",
    "Online Courses",
    "Technical Training",
    "Mentorship",
  ],
  authors: [{ name: "Mahak Yadav" }],
  creator: "Mahak Yadav",
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Mahak Yadav",
    title: "Mahak Yadav | Tech Mentor & Trainer",
    description:
      "1:1 and small-batch training in AI/ML, Data Science and Full-Stack Development. Learn by building real projects.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mahak Yadav | Tech Mentor & Trainer",
    description:
      "1:1 and small-batch training in AI/ML, Data Science and Full-Stack Development. Learn by building real projects.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen antialiased">
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
