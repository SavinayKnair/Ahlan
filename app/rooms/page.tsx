import type { Metadata } from "next";
import RoomSection from "@/components/sections/RoomSection";

export const metadata: Metadata = {
  title: "Ahlan Homestays | Deluxe Rooms in Port Blair – 300+ sq ft Premium AC Rooms",
  description: "Book spacious 300+ sq ft deluxe AC rooms at Ahlan Homestays, Port Blair. Smart TV, premium washrooms, high-speed WiFi, daily cleaning, airport transfers. Gold Category Homestay.",
  keywords: "deluxe rooms Port Blair, premium AC room Andaman, luxury homestay room Port Blair, 300 sq ft room Andaman",
};

export default function RoomsPage() {
  return (
    <main className="pt-24">
      <div className="bg-gradient-ocean py-20 text-center text-white">
        <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4">Our <span className="text-champagne">Deluxe Rooms</span></h1>
        <p className="font-sans text-white/80 text-lg max-w-2xl mx-auto">
          Spacious 300+ sq ft premium AC rooms with hotel-grade comfort. Smart TV, high-speed WiFi, premium washrooms & daily housekeeping.
        </p>
      </div>
      <RoomSection />
    </main>
  );
}
