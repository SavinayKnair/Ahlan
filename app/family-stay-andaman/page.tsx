import type { Metadata } from "next";
import Link from "next/link";
import { Users, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Ahlan Homestay | Family Stay in Andaman 2026 | Family Homestay Port Blair",
  description: "Best family stay in Andaman at Ahlan Homestay, Port Blair. Multi-bed family rooms, child-friendly itinerary, glass-bottom boat, family sightseeing & airport transfers. From ₹18,999/person.",
  keywords: "family stay Andaman, family homestay Port Blair, Andaman with kids, family rooms Port Blair, family package Andaman 2026",
  alternates: { canonical: "https://ahlanandaman.in/family-stay-andaman" },
};

export default function FamilyStayAndaman() {
  return (
    <main className="pt-24 min-h-screen bg-pearl dark:bg-midnight">
      <div className="bg-palm py-20 text-center text-white px-4">
        <div className="text-5xl mb-4">👨‍👩‍👧‍👦</div>
        <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6">Family Stay in <span className="text-champagne">Andaman</span></h1>
        <p className="font-sans text-white/80 text-xl max-w-2xl mx-auto mb-8">
          Create memories your whole family will cherish forever. Safe, comfortable, and fun for all ages at Ahlan Homestay.
        </p>
        <a href="https://wa.me/919434281386?text=Hi! We're a family planning a trip to Andaman. Please share your family stay packages!" target="_blank" rel="noopener noreferrer" className="btn-primary text-base py-4 px-10 inline-block">
          💬 Plan Family Trip
        </a>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="font-serif text-4xl font-bold text-midnight dark:text-white mb-8">Family Comfort Package</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {["Multi-bed family room (2 adults + 2 children)","Child-friendly sightseeing itinerary","Glass-bottom boat ride","Samudrika Marine Museum visit","Daily breakfast (child-friendly menu)","Kids Activity Kit on arrival","Family-sized airport transfer","Jolly Buoy Island snorkeling"].map((f) => (
            <div key={f} className="flex items-start gap-3 p-4 rounded-2xl bg-white dark:bg-white/5 border border-palm/20">
              <Check className="w-5 h-5 text-palm shrink-0 mt-0.5" />
              <span className="font-sans text-gray-700 dark:text-gray-300 text-sm">{f}</span>
            </div>
          ))}
        </div>
        <div className="p-8 rounded-3xl bg-gradient-to-br from-palm to-palm-light text-white text-center mb-8">
          <div className="font-serif text-4xl font-bold text-champagne mb-2">₹18,999 / person</div>
          <p className="text-white/80 font-sans text-sm mb-6">4 Nights / 5 Days | Perfect for families of 3-5 people</p>
          <a href="https://wa.me/919434281386?text=Hi! We'd like to book the Family Comfort Package at Ahlan Homestay." target="_blank" rel="noopener noreferrer" className="btn-primary">Book Family Package</a>
        </div>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/packages" className="btn-secondary">All Packages</Link>
          <Link href="/contact" className="btn-ocean">Contact Us</Link>
        </div>
      </div>
    </main>
  );
}
