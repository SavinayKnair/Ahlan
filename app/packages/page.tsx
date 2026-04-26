import type { Metadata } from "next";
import PackageSection from "@/components/sections/PackageSection";

export const metadata: Metadata = {
  title: "Ahlan Homestay | Andaman Tour Packages 2026 – Port Blair",
  description: "Best Andaman tour packages from Ahlan Homestay. 3N/4D, 4N/5D (₹21,999), 5N/6D (₹25,555), Honeymoon, Family, Workation packages. Ferry, stay, sightseeing included. Use code A&NLUV10% for 10% off!",
  keywords: "Andaman tour package, Port Blair package, honeymoon package Andaman, family package Andaman, Ahlan Homestay packages",
};

export default function PackagesPage() {
  return (
    <main className="pt-24">
      <div className="bg-gradient-ocean py-20 text-center text-white">
        <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4">Our Island <span className="text-champagne">Packages</span></h1>
        <p className="font-sans text-white/80 text-lg max-w-2xl mx-auto">
          All-inclusive Andaman packages with deluxe stay, ferry tickets, sightseeing & dedicated coordinator. Use <strong className="text-champagne">A&NLUV10%</strong> for 10% off!
        </p>
      </div>
      <PackageSection />
    </main>
  );
}
