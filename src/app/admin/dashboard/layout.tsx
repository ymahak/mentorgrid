import { SessionProvider } from "next-auth/react";
import { AdminSidebar } from "@/components/admin";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <div className="flex min-h-screen bg-navy-deep">
        <AdminSidebar />
        <main className="flex-1 p-8">{children}</main>
      </div>
    </SessionProvider>
  );
}
