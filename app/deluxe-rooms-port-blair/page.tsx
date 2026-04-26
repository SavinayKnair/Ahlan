import type { Metadata } from "next";
import Link from "next/link";
import { BedDouble, Check, Maximize } from "lucide-react";

export const metadata: Metadata = {
  title: "Ahlan Homestay | Deluxe Rooms in Port Blair | 300+ sq ft Premium AC Rooms",
  description: "Book deluxe rooms in Port Blair at Ahlan Homestay. Spacious 300+ sq ft AC rooms with Smart TV, premium bathrooms, high-speed WiFi & daily housekeeping. Gold Category Certified. From ₹2,999/night.",
  keywords: "deluxe rooms Port Blair, premium rooms Port Blair, AC rooms Port Blair, luxury rooms Andaman, 300 sqft room Port Blair",
  alternates: { canonical: "https://ahlanandaman.in/deluxe-rooms-port-blair" },
};

export default function DeluxeRoomsPortBlair() {
  return (
    <main className="pt-24 min-h-screen bg-pearl dark:bg-midnight">
      <div className="bg-gradient-ocean py-20 text-center text-white px-4">
        <div className="text-5xl mb-4">🛏️</div>
        <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6">Deluxe Rooms in <span className="text-champagne">Port Blair</span></h1>
        <p className="font-sans text-white/80 text-xl max-w-2xl mx-auto mb-8">
          Spacious 300+ sq ft deluxe AC rooms. Smart TV, premium washrooms, high-speed WiFi. Hotel comfort, homestay price.
        </p>
        <a href="https://wa.me/919434281386?text=Hi! I'd like to book a deluxe room at Ahlan Homestay in Port Blair." target="_blank" rel="noopener noreferrer" className="btn-primary text-base py-4 px-10 inline-block">
          💬 Check Room Availability
        </a>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="font-serif text-4xl font-bold text-midnight dark:text-white mb-8">What Makes Our Rooms Special</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {[
            ["Spacious 300-420 sq ft rooms", "Maximize"],
            ["Central Air Conditioning", "Wind"],
            ["King-size premium beds", "BedDouble"],
            ["Premium washrooms with hot water", "ShowerHead"],
            ["100 Mbps high-speed WiFi", "Wifi"],
            ["43-inch Smart TV", "Tv"],
            ["Daily housekeeping", "Sparkles"],
            ["24/7 room service", "Clock"],
          ].map(([f]) => (
            <div key={f} className="flex items-start gap-3 p-4 rounded-2xl bg-white dark:bg-white/5 border border-champagne/10">
              <Check className="w-5 h-5 text-champagne shrink-0 mt-0.5" />
              <span className="font-sans text-gray-700 dark:text-gray-300 text-sm">{f}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { name: "Deluxe Double", size: "320 sq ft", price: "₹2,999/night", emoji: "🛏️" },
            { name: "Family Suite", size: "420 sq ft", price: "₹4,499/night", emoji: "👨‍👩‍👧‍👦" },
            { name: "Honeymoon Suite", size: "380 sq ft", price: "₹4,999/night", emoji: "💑" },
          ].map((r) => (
            <div key={r.name} className="card-luxury p-6 text-center">
              <div className="text-4xl mb-3">{r.emoji}</div>
              <h3 className="font-serif font-bold text-lg text-midnight dark:text-white mb-1">{r.name}</h3>
              <div className="flex items-center justify-center gap-1 text-sm text-warmgray dark:text-gray-400 font-sans mb-3"><Maximize className="w-3.5 h-3.5" />{r.size}</div>
              <div className="font-serif text-xl font-bold text-champagne mb-4">{r.price}</div>
              <a href={`https://wa.me/919434281386?text=Hi! I want to book the ${r.name} at Ahlan Homestay.`} target="_blank" rel="noopener noreferrer" className="btn-primary text-xs py-2.5 px-5 w-full block text-center">Book Now</a>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/rooms" className="btn-primary">Full Room Details</Link>
          <Link href="/packages" className="btn-secondary">View Packages</Link>
        </div>
      </div>
    </main>
  );
}
