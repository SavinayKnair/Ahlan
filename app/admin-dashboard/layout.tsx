"use client";
import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { LayoutDashboard, BedDouble, Map, CalendarCheck, FileText, LogOut, Loader2, Settings } from "lucide-react";
import toast from "react-hot-toast";

const navLinks = [
  { name: "Overview", href: "/admin-dashboard", tab: "" },
  { name: "Rooms", href: "/admin-dashboard?tab=rooms", tab: "rooms" },
  { name: "Packages", href: "/admin-dashboard?tab=packages", tab: "packages" },
  { name: "Bookings", href: "/admin-dashboard?tab=bookings", tab: "bookings" },
  { name: "Settings", href: "/admin-dashboard?tab=settings", tab: "settings" },
  { name: "Content", href: "/admin-dashboard?tab=content", tab: "content" },
];

const icons: Record<string, React.ElementType> = {
  "": LayoutDashboard,
  rooms: BedDouble,
  packages: Map,
  bookings: CalendarCheck,
  settings: Settings,
  content: FileText,
};

function SidebarNav() {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "";

  return (
    <nav className="flex-1 space-y-1.5 flex flex-row md:flex-col overflow-x-auto md:overflow-visible pb-2 md:pb-0 hide-scrollbar">
      {navLinks.map((link) => {
        const Icon = icons[link.tab];
        const isActive = currentTab === link.tab;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-sans text-sm font-medium transition-all whitespace-nowrap md:whitespace-normal shrink-0 md:shrink ${
              isActive
                ? "bg-champagne/10 text-champagne border border-champagne/20 shadow-sm"
                : "text-warmgray dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-midnight dark:hover:text-white"
            }`}
          >
            <Icon className="w-5 h-5 flex-shrink-0" />
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    await fetch("/api/auth/logout", { method: "POST" });
    toast.success("Logged out");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0A0A0F] flex flex-col md:flex-row pt-24 pb-12 px-4 md:px-0">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white dark:bg-[#131323] border-r border-gray-100 dark:border-white/5 md:fixed md:top-24 md:bottom-0 md:left-0 z-40 rounded-3xl md:rounded-none md:rounded-r-3xl shadow-luxury mb-6 md:mb-0 p-6 flex flex-col">
        <div className="mb-8 hidden md:block">
          <h2 className="font-serif text-2xl font-bold text-midnight dark:text-white">Admin Panel</h2>
          <p className="text-xs text-warmgray font-sans mt-1">Manage website content</p>
        </div>

        <Suspense fallback={
          <nav className="flex-1 space-y-1.5 flex flex-row md:flex-col">
            {navLinks.map(l => (
              <div key={l.name} className="h-11 bg-gray-100 dark:bg-white/5 rounded-xl animate-pulse" />
            ))}
          </nav>
        }>
          <SidebarNav />
        </Suspense>

        <div className="mt-auto pt-6 border-t border-gray-100 dark:border-white/5 hidden md:block">
          <button
            onClick={handleLogout}
            disabled={loading}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl font-sans text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <LogOut className="w-5 h-5" />}
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-0 md:p-8">
        <div className="max-w-5xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
