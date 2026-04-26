"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Timer, Tag } from "lucide-react";

function useCountdown(hours: number) {
  const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0 });
  const [targetDate, setTargetDate] = useState<Date | null>(null);

  useEffect(() => {
    const savedTarget = localStorage.getItem("ahlan_flash_sale_end");
    let targetTime: number;

    if (savedTarget) {
      targetTime = parseInt(savedTarget, 10);
      if (Date.now() > targetTime) {
        targetTime = Date.now() + hours * 3600000;
        localStorage.setItem("ahlan_flash_sale_end", targetTime.toString());
      }
    } else {
      targetTime = Date.now() + hours * 3600000;
      localStorage.setItem("ahlan_flash_sale_end", targetTime.toString());
    }

    setTargetDate(new Date(targetTime));
  }, [hours]);

  useEffect(() => {
    if (!targetDate) return;

    const tick = () => {
      const diff = targetDate.getTime() - Date.now();
      if (diff <= 0) { setTimeLeft({ h: 0, m: 0, s: 0 }); return; }
      setTimeLeft({ h: Math.floor(diff / 3600000), m: Math.floor((diff % 3600000) / 60000), s: Math.floor((diff % 60000) / 1000) });
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return timeLeft;
}

export default function CountdownSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { h, m, s } = useCountdown(24);
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section className="py-16 bg-gradient-ocean relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-ocean-deep/80 to-midnight/60" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <div className="flex justify-center mb-4">
            <span className="badge-gold"><Timer className="w-3.5 h-3.5" /> Limited Time Offer</span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
            🔥 Flash Sale Ending In...
          </h2>
          <p className="font-sans text-white/80 text-lg mb-8">Book any package in the next 24 hours and get <strong className="text-champagne">10% OFF</strong> + complimentary airport pickup!</p>

          <div className="flex items-center justify-center gap-4 mb-10">
            {[{ label: "Hours", val: h }, { label: "Minutes", val: m }, { label: "Seconds", val: s }].map(({ label, val }, i) => (
              <div key={label} className="flex items-center">
                <div className="text-center">
                  <div className="w-24 h-24 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <span className="font-serif text-5xl font-bold text-champagne">{pad(val)}</span>
                  </div>
                  <div className="text-white/60 text-xs font-sans mt-2 uppercase tracking-wider">{label}</div>
                </div>
                {i < 2 && <span className="font-serif text-4xl font-bold text-champagne/60 mx-1 mb-6">:</span>}
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="https://wa.me/919434281386?text=Hi! I want to claim the flash sale offer at Ahlan Homestay!" target="_blank" rel="noopener noreferrer" className="btn-primary flex items-center gap-2">
              <Tag className="w-4 h-4" /> Claim Offer Now
            </a>
            <a href="/packages" className="btn-secondary border-white text-white hover:bg-white hover:text-midnight">
              View All Packages
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
