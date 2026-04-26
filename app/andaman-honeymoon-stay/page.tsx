import type { Metadata } from "next";
import Link from "next/link";
import { Heart, Star, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Ahlan Homestay | Andaman Honeymoon Stay 2026 | Romantic Packages Port Blair",
  description: "Plan your dream honeymoon in Andaman with Ahlan Homestay. Romantic room décor, candlelight dinner, beach photoshoot, couples spa, ferry & all sightseeing. Packages from ₹29,999/couple.",
  keywords: "Andaman honeymoon stay, honeymoon homestay Andaman, romantic package Port Blair, couples stay Andaman, Andaman honeymoon 2026",
  alternates: { canonical: "https://ahlanandaman.in/andaman-honeymoon-stay" },
};

export default function AndamanHoneymoonStay() {
  return (
    <main className="pt-24 min-h-screen bg-pearl dark:bg-midnight">
      <div className="py-20 text-center text-white px-4" style={{ background: "linear-gradient(135deg, #4a0f2e 0%, #8b1a4a 50%, #c2185b 100%)" }}>
        <div className="text-5xl mb-4">💑</div>
        <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6">Andaman <span className="text-champagne">Honeymoon Stay</span></h1>
        <p className="font-sans text-white/80 text-xl max-w-2xl mx-auto mb-8">
          Begin forever in paradise. Romantic beach dinners, couple photoshoots, and curated island experiences at Ahlan Homestay.
        </p>
        <a href="https://wa.me/919434281386?text=Hi! We're planning our honeymoon in Andaman. Please share the Honeymoon Bliss Package details!" target="_blank" rel="noopener noreferrer" className="btn-primary text-base py-4 px-10 inline-block">
          💬 Plan Our Honeymoon
        </a>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="font-serif text-4xl font-bold text-midnight dark:text-white mb-8">Honeymoon Bliss Package</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {["Romantic room décor with rose petals & candles","Candlelight dinner on the beach","1-hour beach photoshoot session","Couples spa & massage session","All ferry tickets (Havelock, Neil Islands)","Airport pickup & drop","Dedicated honeymoon coordinator","Champagne welcome on arrival"].map((f) => (
            <div key={f} className="flex items-start gap-3 p-4 rounded-2xl bg-white dark:bg-white/5 border border-rose-200 dark:border-rose-900/30">
              <Heart className="w-5 h-5 text-rose-500 shrink-0 mt-0.5 fill-rose-200" />
              <span className="font-sans text-gray-700 dark:text-gray-300 text-sm">{f}</span>
            </div>
          ))}
        </div>
        <div className="p-8 rounded-3xl text-white text-center mb-8" style={{ background: "linear-gradient(135deg, #4a0f2e, #8b1a4a)" }}>
          <div className="font-serif text-4xl font-bold text-champagne mb-2">₹29,999 / couple</div>
          <p className="text-white/80 font-sans text-sm mb-6">4 Nights / 5 Days | Includes ferry, stay, meals, photoshoot & all experiences</p>
          <a href="https://wa.me/919434281386?text=Hi! We'd like to book the Honeymoon Bliss Package at Ahlan Homestay! 💑" target="_blank" rel="noopener noreferrer" className="btn-primary">Book Honeymoon Package</a>
        </div>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/packages" className="btn-secondary">All Packages</Link>
          <Link href="/rooms" className="btn-ocean">View Rooms</Link>
        </div>
      </div>
    </main>
  );
}
