"use client";
import { useBooking } from "./BookingProvider";

export default function WhatsAppButton() {
  const { openBooking } = useBooking();

  return (
    <div className="fixed bottom-7 right-7 z-[999] animate-[pulseGlow_2s_ease-in-out_infinite] rounded-full">
      <button
        onClick={() => openBooking("general")}
        className="w-[60px] h-[60px] rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 drop-shadow-[0_4px_15px_rgba(37,211,102,0.5)]"
        aria-label="WhatsApp Booking"
      >
        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-[60px] h-[60px]" />
      </button>
    </div>
  );
}
