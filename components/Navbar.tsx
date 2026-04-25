"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Menu, X, Sun, Moon, MessageCircle, Volume2, VolumeX, Globe, ChevronDown, UserCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAudio } from "./AudioProvider";
import Image from "next/image";
import AdminLoginModal from "./AdminLoginModal";
import { useBooking } from "./BookingProvider";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Rooms", href: "/rooms" },
  { label: "Packages", href: "/packages" },
  { label: "Explore Andaman", href: "/#things-to-do" },
  { label: "Contact", href: "/contact" },
];

const WHATSAPP_NUMBER = "919434281386";

const LANGUAGES = [
  // Indian
  { code: "en", label: "English", flag: "🇮🇳" },
  { code: "hi", label: "हिन्दी", flag: "🇮🇳" },
  { code: "ta", label: "தமிழ்", flag: "🇮🇳" },
  { code: "te", label: "తెలుగు", flag: "🇮🇳" },
  { code: "ml", label: "മലയാളം", flag: "🇮🇳" },
  { code: "kn", label: "ಕನ್ನಡ", flag: "🇮🇳" },
  { code: "bn", label: "বাংলা", flag: "🇮🇳" },
  { code: "mr", label: "मराठी", flag: "🇮🇳" },
  // International
  { code: "ar", label: "العربية", flag: "🇸🇦" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "ru", label: "Русский", flag: "🇷🇺" },
  { code: "ja", label: "日本語", flag: "🇯🇵" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "it", label: "Italiano", flag: "🇮🇹" },
];

function setGoogleTranslateCookie(lang: string) {
  const value = lang === "en" ? "/en/en" : `/en/${lang}`;
  document.cookie = `googtrans=${value}; path=/`;
  document.cookie = `googtrans=${value}; path=/; domain=${window.location.hostname}`;
  // Try using the widget if available
  const select = document.querySelector<HTMLSelectElement>(".goog-te-combo");
  if (select) {
    select.value = lang;
    select.dispatchEvent(new Event("change"));
  } else {
    window.location.reload();
  }
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [activeLang, setActiveLang] = useState("en");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { isMuted, toggleMute } = useAudio();
  const { openBooking } = useBooking();
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    // Restore saved language
    const saved = localStorage.getItem("ahlan_lang");
    if (saved) setActiveLang(saved);

    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close language dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLangSelect = (code: string) => {
    setActiveLang(code);
    localStorage.setItem("ahlan_lang", code);
    setLangOpen(false);
    setGoogleTranslateCookie(code);
  };

  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=Hi! I'd like to book a stay at Ahlan Homestays.`;
  const currentLang = LANGUAGES.find((l) => l.code === activeLang);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href === "#translation") {
      e.preventDefault();
      setLangOpen(!langOpen);
      return;
    }
    if (href.startsWith("/#") && pathname === "/") {
      e.preventDefault();
      const id = href.replace("/#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        setMobileOpen(false);
      }
    }
  };

  return (
    <>
      <header
        className={`navbar fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "navbar-scrolled py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            onClick={(e) => {
              if (pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="flex items-center gap-3 group"
          >
            <div className="relative w-12 h-12 rounded-full overflow-hidden shadow-gold-glow flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
              <Image
                src="/favicon.png"
                alt="Ahlan Homestays Logo"
                fill
                className="object-cover"
                sizes="48px"
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-serif font-bold text-2xl tracking-tight text-gradient-gold">Ahlan</span>
              <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-champagne/90 font-medium">Homestays</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href) && !link.href.startsWith("/#"));
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className={`font-sans font-medium text-sm tracking-wide transition-colors relative group ${scrolled ? "text-gray-700 dark:text-gray-200 hover:text-champagne" : "text-white/90 hover:text-champagne"} ${isActive ? "!text-champagne" : ""}`}
                >
                  {link.label}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-champagne transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`} />
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Controls */}
            <div className="flex items-center gap-1">
              {mounted && (
                <button onClick={toggleMute} className={`p-2 rounded-full transition-colors ${scrolled ? "text-gray-600 dark:text-gray-300 hover:bg-champagne/10" : "text-white/80 hover:bg-white/10"}`} aria-label="Toggle audio">
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-champagne" />}
                </button>
              )}
              {mounted && (
                <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className={`p-2 rounded-full transition-colors ${scrolled ? "text-gray-600 dark:text-gray-300 hover:bg-champagne/10" : "text-white/80 hover:bg-white/10"}`} aria-label="Toggle theme">
                  {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
              )}
            </div>

            {/* Language Selector */}
            <div ref={langRef} className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className={`flex items-center gap-1.5 p-2 rounded-full transition-colors text-sm font-sans ${scrolled ? "text-gray-600 dark:text-gray-300 hover:bg-champagne/10" : "text-white/80 hover:bg-white/10"}`}
                aria-label="Select language"
              >
                <Globe className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider">{currentLang?.flag}</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${langOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full right-0 mt-2 w-56 glass dark:bg-midnight/95 rounded-2xl overflow-hidden shadow-luxury border border-white/20 dark:border-white/10 backdrop-blur-xl z-50"
                  >
                    <div className="p-2">
                      <div className="text-[10px] font-bold uppercase tracking-widest text-champagne px-2 py-1.5">Indian Languages</div>
                      {LANGUAGES.slice(0, 8).map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => handleLangSelect(lang.code)}
                          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-sm font-sans transition-colors ${activeLang === lang.code ? "bg-champagne/15 text-champagne" : "text-gray-700 dark:text-gray-200 hover:bg-champagne/5 hover:text-champagne"}`}
                        >
                          <span>{lang.flag}</span>
                          <span>{lang.label}</span>
                          {activeLang === lang.code && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-champagne" />}
                        </button>
                      ))}
                      <div className="text-[10px] font-bold uppercase tracking-widest text-champagne px-2 py-1.5 mt-1 border-t border-white/10">International</div>
                      {LANGUAGES.slice(8).map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => handleLangSelect(lang.code)}
                          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-sm font-sans transition-colors ${activeLang === lang.code ? "bg-champagne/15 text-champagne" : "text-gray-700 dark:text-gray-200 hover:bg-champagne/5 hover:text-champagne"}`}
                        >
                          <span>{lang.flag}</span>
                          <span>{lang.label}</span>
                          {activeLang === lang.code && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-champagne" />}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button 
              onClick={() => openBooking("general")}
              className="btn-primary text-xs py-2.5 px-5 flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp Booking
            </button>
            
            <button 
              onClick={() => setAdminOpen(true)}
              className={`p-2 rounded-full transition-colors ${scrolled ? "text-gray-600 dark:text-gray-300 hover:bg-champagne/10" : "text-white/80 hover:bg-white/10"}`}
              aria-label="Admin Login"
            >
              <UserCircle2 className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Hamburger */}
          <div className="lg:hidden flex items-center gap-2">
            {/* Mobile lang + theme quick buttons */}
            {mounted && (
              <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className={`p-2 rounded-full transition-colors ${scrolled ? "text-midnight dark:text-white" : "text-white"}`}>
                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            )}
            <button onClick={() => setMobileOpen(!mobileOpen)} className={`p-2 rounded-full transition-colors ${scrolled ? "text-midnight dark:text-white" : "text-white"}`} aria-label="Toggle menu">
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mobile-menu lg:hidden overflow-hidden"
            >
              <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={(e) => { handleSmoothScroll(e, link.href); setMobileOpen(false); }}
                    className="block font-sans font-medium text-base text-gray-700 dark:text-gray-200 hover:text-champagne transition-colors py-3 border-b border-gray-100 dark:border-white/5"
                  >
                    {link.label}
                  </Link>
                ))}

                {/* Mobile Language Selector */}
                <div className="pt-4">
                  <div className="text-[10px] uppercase tracking-wider text-warmgray mb-2 font-sans">Select Language</div>
                  <div className="grid grid-cols-3 gap-2">
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLangSelect(lang.code)}
                        className={`flex flex-col items-center gap-1 p-2 rounded-xl text-xs font-sans border transition-colors ${activeLang === lang.code ? "border-champagne bg-champagne/10 text-champagne" : "border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400"}`}
                      >
                        <span className="text-lg">{lang.flag}</span>
                        <span className="text-[10px] truncate w-full text-center">{lang.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={() => { openBooking("general"); setMobileOpen(false); }}
                  className="btn-primary text-sm py-3 flex items-center justify-center gap-2 mt-4"
                >
                  <MessageCircle className="w-4 h-4" /> WhatsApp Booking
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <AdminLoginModal isOpen={adminOpen} onClose={() => setAdminOpen(false)} />
    </>
  );
}
