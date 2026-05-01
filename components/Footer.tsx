"use client";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Instagram, Facebook, Youtube, Star, Award } from "lucide-react";
import { useBooking } from "./BookingProvider";

const WHATSAPP_NUMBER = "919434281386";

const footerLinks = {
  quickLinks: [
    { label: "Home", href: "/" },
    { label: "Our Rooms", href: "/rooms" },
    { label: "Packages", href: "/packages" },
    { label: "Explore Andaman", href: "/#things-to-do" },
    { label: "Travel Guides", href: "/#blog" },
    { label: "Contact Us", href: "/contact" },
  ],
  seoPages: [
    { label: "Best Homestay in Port Blair", href: "/best-homestay-port-blair" },
    { label: "Andaman Honeymoon Stay", href: "/andaman-honeymoon-stay" },
    { label: "Family Stay in Andaman", href: "/family-stay-andaman" },
    { label: "Deluxe Rooms Port Blair", href: "/deluxe-rooms-port-blair" },
    { label: "Near Airport Stay", href: "/near-airport-stay-port-blair" },
    { label: "Near Cellular Jail Stay", href: "/near-cellular-jail-stay" },
    { label: "Havelock Tour Stay", href: "/havelock-tour-package-stay" },
  ],
  packages: [
    { label: "Romantic Escape (3N/4D)", href: "/packages#p1" },
    { label: "Adventure Explorer (4N/5D)", href: "/packages#p2" },
    { label: "Family Fun (5N/6D)", href: "/packages#p3" },
  ],
};

export default function Footer() {
  const { openBooking } = useBooking();

  return (
    <footer className="bg-ocean-deep dark:bg-midnight text-white relative overflow-hidden">
      {/* Ocean wave top */}
      <div className="absolute top-0 left-0 right-0 h-16 overflow-hidden">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-full">
          <path
            d="M0,30 C240,60 480,0 720,30 C960,60 1200,0 1440,30 L1440,0 L0,0 Z"
            fill="rgb(248,246,242)"
            className="dark:fill-midnight"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div className="relative w-14 h-14 rounded-full overflow-hidden shadow-gold-glow flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                <Image
                  src="/favicon.png"
                  alt="Ahlan Homestays Logo"
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-serif font-bold text-3xl tracking-tight text-gradient-gold">Ahlan</span>
                <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-champagne/90 font-medium">Homestays</span>
              </div>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed mb-6 font-sans">
              Premium Gold Category Homestay in Port Blair, Andaman & Nicobar Islands. 
              Where Hospitality Meets Paradise.
            </p>
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="badge-gold text-xs">
                <Award className="w-3 h-3" /> Gold Category
              </span>
              <span className="flex items-center gap-1 bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs">
                <Star className="w-3 h-3 star-gold fill-champagne" /> 5 Star Rating
              </span>
            </div>
            {/* Social */}
            <div className="flex gap-3">
              {[
                { Icon: Instagram, href: "https://www.instagram.com/_ahlan.homestays_?igsh=NGdveTIyYml4b2ty", label: "Instagram" },
                { Icon: Facebook, href: "#", label: "Facebook" },
                { Icon: Youtube, href: "#", label: "YouTube" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-champagne/20 hover:text-champagne transition-all duration-300 hover:scale-110"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif font-semibold text-white text-lg mb-6 relative">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-gold" />
            </h3>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-champagne text-sm font-sans transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-champagne/50 group-hover:bg-champagne transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SEO Pages */}
          <div>
            <h3 className="font-serif font-semibold text-white text-lg mb-6 relative">
              Explore Stays
              <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-gold" />
            </h3>
            <ul className="space-y-3">
              {footerLinks.seoPages.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-champagne text-sm font-sans transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-champagne/50 group-hover:bg-champagne transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif font-semibold text-white text-lg mb-6 relative">
              Get In Touch
              <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-gold" />
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+919434281386"
                  className="flex items-start gap-3 text-white/70 hover:text-champagne transition-colors group"
                >
                  <div className="w-8 h-8 rounded-full bg-champagne/10 flex items-center justify-center shrink-0 group-hover:bg-champagne/20 transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-white/50 font-sans">Call / WhatsApp</div>
                    <div className="text-sm font-medium">+91 94342 81386, +91 80758 74340</div>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="mailto:ahlanbb786@gmail.com"
                  className="flex items-start gap-3 text-white/70 hover:text-champagne transition-colors group"
                >
                  <div className="w-8 h-8 rounded-full bg-champagne/10 flex items-center justify-center shrink-0 group-hover:bg-champagne/20 transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-white/50 font-sans">Email Us</div>
                    <div className="text-sm font-medium">ahlanbb786@gmail.com</div>
                  </div>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-white/70">
                  <div className="w-8 h-8 rounded-full bg-champagne/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-white/50 font-sans">Location</div>
                    <div className="text-sm font-medium leading-relaxed">New Pahargaon, Behind Old Sapna Theater,<br />Sri Vijaya Puram - 744 105</div>
                  </div>
                </div>
              </li>
            </ul>
            <button
              onClick={() => openBooking("general")}
              className="btn-whatsapp mt-6 text-xs py-3 px-6 w-full text-center block"
            >
              💬 WhatsApp Booking
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-sans text-xs text-white/50">&copy; {new Date().getFullYear()} Ahlan Homestays. All rights reserved. | Sri Vijaya Puram, Andaman & Nicobar Islands</p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="text-white/50 hover:text-champagne text-xs font-sans transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-white/50 hover:text-champagne text-xs font-sans transition-colors">
                Terms & Conditions
              </Link>
              <Link href="/sitemap.xml" className="text-white/50 hover:text-champagne text-xs font-sans transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
          {/* SEO Text */}
          <p className="text-white/30 text-xs font-sans text-center mt-4 max-w-3xl mx-auto tracking-widest uppercase">
            Ahlan Homestays — Where Hospitality Meets Paradise
          </p>
        </div>
      </div>
    </footer>
  );
}
