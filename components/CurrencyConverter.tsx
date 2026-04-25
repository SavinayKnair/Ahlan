"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DollarSign, ChevronRight } from "lucide-react";
import { useCurrency } from "./CurrencyProvider";

const CURRENCIES = [
  { code: "INR", flag: "🇮🇳" },
  { code: "USD", flag: "🇺🇸" },
  { code: "EUR", flag: "🇪🇺" },
  { code: "GBP", flag: "🇬🇧" },
  { code: "AED", flag: "🇦🇪" },
  { code: "SGD", flag: "🇸🇬" },
  { code: "AUD", flag: "🇦🇺" },
] as const;

export default function CurrencyConverter() {
  const { currency, setCurrency } = useCurrency();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="fixed left-0 top-1/2 -translate-y-1/2 z-[990] flex items-center">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: -20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute left-14 bg-white dark:bg-[#1A1A24] border border-gray-100 dark:border-white/10 shadow-luxury rounded-2xl p-2 w-44 max-h-[320px] overflow-y-auto"
          >
            <div className="text-xs font-serif font-bold text-warmgray mb-2 px-2 pt-1 uppercase tracking-wider">Currency</div>
            <div className="flex flex-col gap-1">
              {CURRENCIES.map((c) => (
                <button
                  key={c.code}
                  onClick={() => { setCurrency(c.code); setOpen(false); }}
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-sans transition-colors ${
                    currency === c.code
                      ? "bg-champagne/10 text-champagne font-bold"
                      : "text-midnight dark:text-white hover:bg-gray-50 dark:hover:bg-white/5"
                  }`}
                >
                  <span className="text-base">{c.flag}</span>
                  {c.code}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen(!open)}
        className="w-12 h-14 bg-midnight/90 dark:bg-white/10 backdrop-blur-md rounded-r-2xl border border-l-0 border-white/20 shadow-lg flex flex-col items-center justify-center hover:bg-midnight dark:hover:bg-white/20 transition-all group"
        aria-label="Currency Converter"
      >
        <div className="text-champagne font-bold text-xs mb-0.5">{currency}</div>
        <ChevronRight className={`w-3.5 h-3.5 text-white/50 group-hover:text-white transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
    </div>
  );
}
