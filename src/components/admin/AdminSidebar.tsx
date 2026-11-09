"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  MessageSquare,
  BookOpen,
  FileText,
  Star,
  User,
  Settings,
  LogOut,
} from "lucide-react";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/dashboard/enquiries", label: "Enquiries", icon: MessageSquare },
  { href: "/admin/dashboard/courses", label: "Courses", icon: BookOpen },
  { href: "/admin/dashboard/blog", label: "Blog", icon: FileText },
  { href: "/admin/dashboard/testimonials", label: "Testimonials", icon: Star },
  { href: "/admin/dashboard/mentor", label: "Mentor Profile", icon: User },
  { href: "/admin/dashboard/settings", label: "Settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-navy-secondary border-r border-white/10 min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <Link href="/admin/dashboard" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-brand-purple to-brand-blue flex items-center justify-center">
            <span className="text-white font-bold text-lg">MY</span>
          </div>
          <div>
            <span className="text-lg font-bold text-white">Mahak Yadav</span>
            <span className="block text-xs text-text-muted">Admin Panel</span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== "/admin/dashboard" && pathname.startsWith(item.href));
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-brand-purple/20 text-white"
                      : "text-text-secondary hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-text-secondary hover:bg-white/5 hover:text-white transition-colors mb-2"
        >
          <span>View Site</span>
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <LogOut size={20} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
