"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gift, Tag } from "lucide-react";

export default function ExitIntentPopup() {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 10 && !show) setShow(true);
    };
    const timer = setTimeout(() => { if (!dismissed) setShow(true); }, 45000);
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => { document.removeEventListener("mouseleave", handleMouseLeave); clearTimeout(timer); };
  }, [show, dismissed]);

  const dismiss = () => { setShow(false); setDismissed(true); };
  const copyCode = () => { navigator.clipboard.writeText("AHLAN10"); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <AnimatePresence>
      {show && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="exit-popup-overlay" onClick={dismiss}>
          <motion.div initial={{ scale: 0.8, y: 50 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.8, y: 50 }} transition={{ type: "spring", damping: 20 }} onClick={(e) => e.stopPropagation()} className="relative max-w-md mx-4 rounded-3xl overflow-hidden shadow-luxury">
            <div className="bg-gradient-gold p-8 text-midnight text-center">
              <div className="text-5xl mb-4">🏝️</div>
              <h2 className="font-serif text-3xl font-bold mb-2">Wait! Don&apos;t Leave Yet!</h2>
              <p className="font-sans text-midnight/80 text-sm">Get an exclusive <strong>10% discount</strong> on your Andaman booking today only.</p>
            </div>
            <div className="bg-white dark:bg-[#131323] p-8 text-center">
              <div className="inline-flex items-center gap-2 bg-champagne/10 border-2 border-dashed border-champagne rounded-2xl px-6 py-4 mb-6">
                <Tag className="w-5 h-5 text-champagne" />
                <span className="font-mono font-bold text-2xl text-champagne tracking-wider">AHLAN10</span>
              </div>
              <p className="text-sm text-warmgray dark:text-gray-400 font-sans mb-6">Copy this code and share it on WhatsApp when booking. Valid for 24 hours!</p>
              <div className="flex flex-col gap-3">
                <button onClick={copyCode} className="btn-primary w-full flex items-center justify-center gap-2">
                  <Gift className="w-4 h-4" />{copied ? "✅ Copied!" : "Copy Code & Book Now"}
                </button>
                <a href="https://wa.me/919434281386?text=Hi! I have the code AHLAN10 for 10% off. I'd like to book!" target="_blank" rel="noopener noreferrer" className="btn-whatsapp w-full text-center text-sm py-3" onClick={dismiss}>💬 Book on WhatsApp</a>
                <button onClick={dismiss} className="text-xs text-warmgray hover:text-champagne transition-colors font-sans">No thanks, I&apos;ll pay full price</button>
              </div>
            </div>
            <button onClick={dismiss} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-midnight/20 flex items-center justify-center text-midnight hover:bg-midnight/30 transition-colors" aria-label="Close"><X className="w-4 h-4" /></button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
