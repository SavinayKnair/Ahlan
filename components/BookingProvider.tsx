"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import BookingModal from "./BookingModal";

type BookingContextType = {
  openBooking: (type?: "general" | "room" | "package", room?: string, pkg?: string) => void;
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formType, setFormType] = useState<"general" | "room" | "package">("general");
  const [room, setRoom] = useState("");
  const [pkg, setPkg] = useState("");

  const openBooking = (type: "general" | "room" | "package" = "general", r = "", p = "") => {
    setFormType(type);
    setRoom(r);
    setPkg(p);
    setIsOpen(true);
  };

  return (
    <BookingContext.Provider value={{ openBooking }}>
      {children}
      <BookingModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        formType={formType}
        initialRoom={room}
        initialPackage={pkg}
      />
    </BookingContext.Provider>
  );
}

export const useBooking = () => {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within BookingProvider");
  return ctx;
};
