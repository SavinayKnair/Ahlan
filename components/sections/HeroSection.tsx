"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, MessageCircle, Map, Bot, Star } from "lucide-react";
import Image from "next/image";
import { useBooking } from "../BookingProvider";

const WHATSAPP_NUMBER = "919434281386";

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  const [clientParticles, setClientParticles] = useState<{id: number, size: number, left: number, delay: number, duration: number}[]>([]);
  const { openBooking } = useBooking();

  useEffect(() => {
    setClientParticles(Array.from({ length: 20 }, (_, i) => ({
      id: i,
      size: Math.random() * 4 + 2,
      left: Math.random() * 100,
      delay: Math.random() * 8,
      duration: Math.random() * 6 + 8,
    })));
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  const scrollDown = () => {
    const el = document.getElementById("about");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Ahlan Homestay – Luxury Homestay in Andaman"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.png"
          alt="Andaman Beach Sunrise - Ahlan Homestay"
          fill
          priority
          sizes="100vw"
          quality={100}
          className="object-cover"
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
      </div>

      {/* Floating particles */}
      {clientParticles.map((p) => (
        <div
          key={p.id}
          className="particle z-10"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            bottom: "-10px",
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            background: p.id % 3 === 0
              ? "rgba(201,168,76,0.8)"
              : p.id % 3 === 1
              ? "rgba(0,206,209,0.6)"
              : "rgba(255,255,255,0.5)",
          }}
        />
      ))}

      {/* Ocean wave bottom */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden z-20">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-16 md:h-24">
          <path
            d="M0,80 C180,20 360,100 540,60 C720,20 900,100 1080,60 C1260,20 1380,80 1440,60 L1440,120 L0,120 Z"
            fill="rgb(248,246,242)"
            className="dark:fill-[#0A0A0F]"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto pt-24 sm:pt-32">
        {/* Gold badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : -20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-6 sm:mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase border border-champagne/40 bg-black/30 text-champagne backdrop-blur-md shadow-gold-glow">
            <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-champagne" />
            Gold Category Premium Homestay
            <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-champagne" />
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 40 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.1] mb-6 drop-shadow-xl"
        >
          Stay in{" "}
          <span className="text-gradient-gold drop-shadow-2xl">Paradise</span>
          <br />
          <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white/90 italic drop-shadow-lg">
            Luxury Homestay in Andaman
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 30 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="font-serif italic text-lg sm:text-xl md:text-2xl text-champagne mb-4 drop-shadow-md"
        >
          Where Hospitality Meets Paradise
        </motion.p>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 20 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="font-sans text-white/90 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-10 sm:mb-12 leading-relaxed drop-shadow-md"
        >
          Premium 300+ sq ft deluxe rooms • Curated island packages • Unforgettable hospitality
          <br />
          <span className="text-xs sm:text-sm text-white/70">Port Blair, Andaman & Nicobar Islands</span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 20 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-16"
        >
          <button
            id="hero-whatsapp"
            onClick={() => openBooking("general")}
            className="btn-primary text-xs sm:text-sm py-3.5 px-6 sm:py-4 sm:px-8 flex items-center gap-2 animate-pulse-glow"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp Booking
          </button>
          <a
            id="hero-packages"
            href="/packages"
            className="btn-secondary text-xs sm:text-sm py-3.5 px-6 sm:py-4 sm:px-8 flex items-center gap-2 bg-white/10 border-white/20 hover:bg-white/20 backdrop-blur-md"
          >
            <Map className="w-4 h-4" />
            Explore Packages
          </a>
          <button
            id="hero-ai-planner"
            onClick={() => document.getElementById("ai-concierge-btn")?.click()}
            className="btn-ocean text-xs sm:text-sm py-3.5 px-6 sm:py-4 sm:px-8 flex items-center gap-2 backdrop-blur-md"
          >
            <Bot className="w-4 h-4" />
            AI Travel Planner
          </button>
        </motion.div>

        {/* Scroll Down */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: loaded ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          onClick={scrollDown}
          className="flex flex-col items-center gap-2 text-white/70 hover:text-champagne transition-colors mx-auto group"
          aria-label="Scroll down"
        >
          <span className="text-[10px] sm:text-xs font-sans tracking-[0.2em] uppercase drop-shadow-md">Discover More</span>
          <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 animate-bounce group-hover:text-champagne drop-shadow-md" />
        </motion.button>
      </div>
    </section>
  );
}
