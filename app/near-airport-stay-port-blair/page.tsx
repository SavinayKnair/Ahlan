import type { Metadata } from "next";
import Link from "next/link";
import { Plane, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Ahlan Homestays | Stay Near Airport Port Blair | Andaman",
  description: "Looking for a homestay near Veer Savarkar Airport in Port Blair? Ahlan Homestays offers premium AC rooms with complimentary airport pickup & drop. 10 minutes from airport. Book now!",
  keywords: "stay near airport Port Blair, homestay near airport Andaman, airport hotel Port Blair, accommodation near Port Blair airport",
  alternates: { canonical: "https://ahlanandaman.in/near-airport-stay-port-blair" },
};

export default function NearAirportStayPortBlair() {
  return (
    <main className="pt-24 min-h-screen bg-pearl dark:bg-midnight">
      <div className="bg-gradient-ocean py-20 text-center text-white px-4">
        <div className="text-5xl mb-4">✈️</div>
        <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6">Stay Near <span className="text-champagne">Airport Port Blair</span></h1>
        <p className="font-sans text-white/80 text-xl max-w-2xl mx-auto mb-8">
          Ahlan Homestays is just 10 minutes from Veer Savarkar International Airport with complimentary pickup & drop.
        </p>
        <a href="https://wa.me/919434281386?text=Hi! I'm landing at Port Blair Airport. I need a room with airport pickup at Ahlan Homestays." target="_blank" rel="noopener noreferrer" className="btn-primary text-base py-4 px-10 inline-block">
          ✈️ Arrange Airport Pickup
        </a>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="font-serif text-4xl font-bold text-midnight dark:text-white mb-8">Why Choose Us for Airport Stay</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {["~10 minutes from Veer Savarkar International Airport","Complimentary airport pickup with name board","Early check-in and late check-out available","24/7 reception — we're ready whenever you land","On-site parking available","WhatsApp coordination for flight tracking","Premium deluxe AC rooms from ₹2,999/night","All Andaman packages arranged from here"].map((f) => (
            <div key={f} className="flex items-start gap-3 p-4 rounded-2xl bg-white dark:bg-white/5 border border-champagne/10">
              <Check className="w-5 h-5 text-champagne shrink-0 mt-0.5" />
              <span className="font-sans text-gray-700 dark:text-gray-300 text-sm">{f}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/rooms" className="btn-primary">View Rooms</Link>
          <Link href="/contact" className="btn-secondary">Contact Us</Link>
        </div>
      </div>
    </main>
  );
}
