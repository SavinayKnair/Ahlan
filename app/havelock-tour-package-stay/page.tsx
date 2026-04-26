import type { Metadata } from "next";
import Link from "next/link";
import { Ship, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Ahlan Homestay | Havelock Island Tour Package Stay Port Blair Andaman",
  description: "Best stay for Havelock Island tour package from Port Blair. Ahlan Homestay arranges all ferry tickets, Radhanagar Beach visits, Elephant Beach scuba, and Neil Island. From ₹21,999/person.",
  keywords: "Havelock tour package stay, Havelock Island package from Port Blair, Radhanagar Beach stay, Andaman Havelock Neil package",
  alternates: { canonical: "https://ahlanandaman.in/havelock-tour-package-stay" },
};

export default function HavelockTourPackageStay() {
  return (
    <main className="pt-24 min-h-screen bg-pearl dark:bg-midnight">
      <div className="bg-gradient-ocean py-20 text-center text-white px-4">
        <div className="text-5xl mb-4">🌴</div>
        <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6">Havelock Island <span className="text-champagne">Tour Package</span></h1>
        <p className="font-sans text-white/80 text-xl max-w-2xl mx-auto mb-8">
          The best Havelock Island tour starts from Ahlan Homestay, Port Blair. Radhanagar Beach, Elephant Beach, Neil Island — all arranged for you.
        </p>
        <a href="https://wa.me/919434281386?text=Hi! I want to visit Havelock Island. Please share your Havelock tour package details!" target="_blank" rel="noopener noreferrer" className="btn-primary text-base py-4 px-10 inline-block">
          ⛴️ Plan Havelock Trip
        </a>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="font-serif text-4xl font-bold text-midnight dark:text-white mb-8">What&apos;s Included in Havelock Packages</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {["Ferry tickets: Port Blair ↔ Havelock ↔ Neil","Radhanagar Beach visit (Asia's Best Beach)","Elephant Beach snorkeling","Kala Patthar beach sunset","Neil Island Natural Bridge visit","Scuba diving (intro) at Elephant Beach","Deluxe stay at Ahlan Homestay","Daily breakfast & airport transfers","Dedicated trip coordinator"].map((f) => (
            <div key={f} className="flex items-start gap-3 p-4 rounded-2xl bg-white dark:bg-white/5 border border-champagne/10">
              <Ship className="w-5 h-5 text-ocean shrink-0 mt-0.5" />
              <span className="font-sans text-gray-700 dark:text-gray-300 text-sm">{f}</span>
            </div>
          ))}
        </div>
        <div className="p-8 rounded-3xl bg-gradient-ocean text-white text-center mb-8">
          <div className="font-serif text-4xl font-bold text-champagne mb-2">From ₹21,999 / person</div>
          <p className="text-white/80 font-sans text-sm mb-2">4N/5D Island Bliss Package includes Havelock + Neil Islands</p>
          <p className="text-champagne font-semibold font-sans text-sm mb-6">Use code A&NLUV10% for extra 10% off!</p>
          <a href="https://wa.me/919434281386?text=Hi! I want to book the Havelock Island package. Code: A&NLUV10%" target="_blank" rel="noopener noreferrer" className="btn-primary">Book Havelock Package</a>
        </div>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/packages" className="btn-secondary">All Packages</Link>
          <Link href="/things-to-do" className="btn-ocean">Things To Do</Link>
        </div>
      </div>
    </main>
  );
}
