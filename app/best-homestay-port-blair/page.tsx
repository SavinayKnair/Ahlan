import type { Metadata } from "next";
import Link from "next/link";
import { Check, Star, MapPin, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Best Homestay in Port Blair 2026 | Ahlan Homestays – Gold Category",
  description: "Looking for the best homestay in Port Blair, Andaman? Ahlan Homestays is a Gold Category certified premium homestay with 300+ sq ft AC rooms, 4.9★ Google rating, and all-inclusive island packages. Book now!",
  keywords: "best homestay in Port Blair, top homestay Port Blair, Port Blair homestay 2026, premium homestay Andaman, gold category homestay Port Blair",
  alternates: { canonical: "https://ahlanhomestays.com/best-homestay-port-blair" },
};

export default function BestHomestayPortBlair() {
  return (
    <main className="pt-24 min-h-screen bg-pearl dark:bg-midnight">
      <div className="bg-gradient-ocean py-20 text-center text-white px-4">
        <div className="badge-gold mx-auto mb-6 w-fit"><Star className="w-3.5 h-3.5 fill-champagne" /> #1 Rated</div>
        <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6">Best Homestay in <span className="text-champagne">Port Blair</span></h1>
        <p className="font-sans text-white/80 text-xl max-w-2xl mx-auto mb-8">
          Ahlan Homestays — Port Blair&apos;s only Gold Category Certified Premium Homestay. Hotel comfort, homely warmth, 4.9★ Google rating.
        </p>
        <a href="https://wa.me/919434281386?text=Hi! I want to book the best homestay in Port Blair — Ahlan Homestays!" target="_blank" rel="noopener noreferrer" className="btn-primary text-base py-4 px-10 inline-block">
          📞 Book Now – +91 94342 81386
        </a>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="font-serif text-4xl font-bold text-midnight dark:text-white mb-8">Why Ahlan Homestays is the Best in Port Blair</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {[
            "Gold Category Certified by A&N Administration",
            "300+ sq ft Spacious Deluxe AC Rooms",
            "4.9/5 Google Rating (450+ verified reviews)",
            "Premium washrooms & daily housekeeping",
            "High-speed WiFi (100 Mbps)",
            "Smart TV in every room",
            "Airport pickup & drop included",
            "All-inclusive Andaman packages available",
            "Dedicated trip coordinator",
            "Personalized local travel guidance",
          ].map((f) => (
            <div key={f} className="flex items-start gap-3 p-4 rounded-2xl bg-white dark:bg-white/5 border border-champagne/10">
              <Check className="w-5 h-5 text-champagne shrink-0 mt-0.5" />
              <span className="font-sans text-gray-700 dark:text-gray-300 text-sm">{f}</span>
            </div>
          ))}
        </div>

        <div className="p-8 rounded-3xl bg-gradient-ocean text-white text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3"><MapPin className="w-5 h-5 text-champagne" /><span className="font-serif text-xl font-bold">Location</span></div>
          <p className="font-sans text-white/80 mb-6">Port Blair, Andaman & Nicobar Islands, India — Near Cellular Jail, Corbyn&apos;s Cove & Airport</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="https://wa.me/919434281386" target="_blank" rel="noopener noreferrer" className="btn-whatsapp">💬 WhatsApp Now</a>
            <a href="tel:+919434281386" className="btn-primary flex items-center gap-2 justify-center"><Phone className="w-4 h-4" /> Call Us</a>
          </div>
        </div>

        <div className="prose max-w-none">
          <h2 className="font-serif text-3xl font-bold text-midnight dark:text-white mb-4">About Ahlan Homestays — Port Blair</h2>
          <p className="text-warmgray dark:text-gray-300 font-sans leading-relaxed mb-4">
            Ahlan Homestays is widely regarded as the best homestay in Port Blair for good reason. As a <strong>Gold Category Certified</strong> premium homestay, we are held to the highest standards set by the Andaman & Nicobar Islands Administration.
          </p>
          <p className="text-warmgray dark:text-gray-300 font-sans leading-relaxed mb-4">
            Our <strong>spacious 300+ sq ft deluxe AC rooms</strong> feature premium furnishings, Smart TV, high-speed WiFi, and luxury washrooms. Unlike typical Port Blair homestays, every detail at Ahlan is crafted to provide a 5-star experience at a reasonable price.
          </p>
          <p className="text-warmgray dark:text-gray-300 font-sans leading-relaxed">
            Whether you&apos;re a <strong>honeymooner, family, solo traveler, or international tourist</strong> — our team provides personalized service, airport transfers, island packages, and round-the-clock support to make your Andaman vacation truly unforgettable.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap gap-4 justify-center">
          <Link href="/packages" className="btn-primary">View Our Packages</Link>
          <Link href="/rooms" className="btn-secondary">See Our Rooms</Link>
        </div>
      </div>
    </main>
  );
}
