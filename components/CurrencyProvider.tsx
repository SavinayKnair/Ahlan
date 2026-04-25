"use client";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type Currency = "INR" | "USD" | "EUR" | "GBP" | "AED" | "SGD" | "AUD";

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (inrAmount: number) => string;
}

const RATES: Record<Currency, number> = {
  INR: 1,
  USD: 0.012,
  EUR: 0.011,
  GBP: 0.0094,
  AED: 0.044,
  SGD: 0.016,
  AUD: 0.018,
};

const SYMBOLS: Record<Currency, string> = {
  INR: "₹",
  USD: "$",
  EUR: "€",
  GBP: "£",
  AED: "د.إ",
  SGD: "S$",
  AUD: "A$",
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>("INR");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("ahlan_currency") as Currency;
    if (saved && RATES[saved]) {
      setCurrency(saved);
    }
    setMounted(true);
  }, []);

  const handleSetCurrency = (c: Currency) => {
    setCurrency(c);
    localStorage.setItem("ahlan_currency", c);
  };

  const formatPrice = (inrAmount: number) => {
    if (!mounted) return `₹${inrAmount.toLocaleString("en-IN")}`;
    const converted = inrAmount * RATES[currency];
    
    // Formatting logic: INR uses en-IN, others use standard with 0 decimal places if large, 2 if small
    if (currency === "INR") {
      return `₹${inrAmount.toLocaleString("en-IN")}`;
    }
    
    return `${SYMBOLS[currency]}${Math.round(converted).toLocaleString()}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency: handleSetCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}
