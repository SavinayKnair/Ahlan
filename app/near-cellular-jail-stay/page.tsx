import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Homestay Near Cellular Jail Port Blair | Ahlan Homestays – Andaman",
  description: "Stay near the historic Cellular Jail in Port Blair at Ahlan Homestays. Premium deluxe AC rooms just minutes from Cellular Jail. Don't miss the famous Sound & Light Show. Book now!",
  keywords: "homestay near Cellular Jail, stay near Cellular Jail Port Blair, accommodation near Cellular Jail Andaman, Port Blair Cellular Jail hotel",
  alternates: { canonical: "https://ahlanhomestays.com/near-cellular-jail-stay" },
};

export default function NearCellularJailStay() {
  return (
    <main className="pt-24 min-h-screen bg-pearl dark:bg-midnight">
      <div className="bg-gradient-ocean py-20 text-center text-white px-4">
        <div className="text-5xl mb-4">🏛️</div>
        <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6">Stay Near <span className="text-champagne">Cellular Jail</span></h1>
        <p className="font-sans text-white/80 text-xl max-w-2xl mx-auto mb-8">
          Ahlan Homestays is just 2.5 km from the historic Cellular Jail, Port Blair. Don&apos;t miss the iconic Sound & Light Show!
        </p>
        <a href="https://wa.me/919434281386?text=Hi! I'm visiting Cellular Jail and need a room nearby at Ahlan Homestays." target="_blank" rel="noopener noreferrer" className="btn-primary text-base py-4 px-10 inline-block">
          📍 Book Nearby Stay
        </a>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="font-serif text-4xl font-bold text-midnight dark:text-white mb-6">Perfect Base for Exploring Port Blair</h2>
        <p className="text-warmgray dark:text-gray-300 font-sans leading-relaxed mb-8">
          The Cellular Jail (Kala Pani) is Port Blair&apos;s most iconic landmark — a colonial-era prison that bears testament to India&apos;s freedom struggle. The famous Sound & Light Show every evening is a must-see experience. Staying at Ahlan Homestays puts you just <strong>2.5 km from Cellular Jail</strong>, making it the most convenient base for your visit.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {["2.5 km from Cellular Jail","We arrange Cellular Jail tickets","Sound & Light Show access included in some packages","Near Corbyn's Cove, Ross Island & Port Blair Jetty","Premium AC rooms from ₹2,999/night","Complimentary airport pickup"].map((f) => (
            <div key={f} className="flex items-start gap-3 p-4 rounded-2xl bg-white dark:bg-white/5 border border-champagne/10">
              <Check className="w-5 h-5 text-champagne shrink-0 mt-0.5" />
              <span className="font-sans text-gray-700 dark:text-gray-300 text-sm">{f}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/rooms" className="btn-primary">Book a Room</Link>
          <Link href="/packages" className="btn-secondary">Explore Packages</Link>
        </div>
      </div>
    </main>
  );
}
