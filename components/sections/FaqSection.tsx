"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ChevronDown, ChevronUp, HelpCircle, Sparkles } from "lucide-react";

const faqs = [
  {
    q: "Where is Ahlan Homestays located in Port Blair?",
    a: "Ahlan Homestays is located in Port Blair, Andaman & Nicobar Islands — close to the Cellular Jail, Corbyn's Cove Beach, and Veer Savarkar International Airport. We are easily accessible from all major landmarks.",
  },
  {
    q: "What makes Ahlan Homestays different from a regular homestay?",
    a: "We are a Gold Category Certified Premium Homestay — offering 300+ sq ft spacious deluxe AC rooms, premium washrooms, Smart TV, high-speed WiFi, daily housekeeping, and personalized service. Think of it as hotel comfort with the warmth of a home.",
  },
  {
    q: "What is included in the Andaman packages?",
    a: "Our packages include: deluxe stay at Ahlan Homestays, ferry tickets (Port Blair ↔ Havelock ↔ Neil), daily breakfast, airport pickup & drop, sightseeing tours, and a dedicated trip coordinator. Premium packages also include scuba diving, parasailing, candlelight dinners and more.",
  },
  {
    q: "Is there a promo code available?",
    a: "Yes! Use promo code A&NLUV10% on our 4N/5D (₹21,999/pax) and 5N/6D (₹25,555/pax) packages to get an extra 10% off. Share this code via WhatsApp when booking.",
  },
  {
    q: "How do I book a room or package at Ahlan Homestays?",
    a: "You can book via WhatsApp at +91 9434281386, call us directly, or use the Book Now button on our website. We respond within minutes and confirm your booking same-day.",
  },
  {
    q: "Is Ahlan Homestays suitable for international tourists?",
    a: "Absolutely! We have a dedicated Foreign Traveler Elite Package with an English-speaking guide, airport concierge, SIM card, currency assistance, and 24/7 emergency support. Many of our guests are from the UK, UAE, USA, Germany and Japan.",
  },
  {
    q: "Do you offer airport pickup and drop?",
    a: "Yes. Airport pickup and drop is included in all our packages and can be added to standalone room bookings for a nominal fee. Just share your flight details when booking.",
  },
  {
    q: "What is the best time to visit Andaman?",
    a: "The ideal time to visit Andaman is October to May when the weather is sunny, seas are calm, and visibility for water sports is excellent. Peak season is December to February — book early! June to September is monsoon season.",
  },
  {
    q: "Are the rooms family-friendly?",
    a: "Yes! We have a Family Comfort Package with multi-bed rooms, child-friendly itineraries, family sightseeing plans, and a kids activity kit. Our staff are experienced with family travelers.",
  },
  {
    q: "Is high-speed WiFi available?",
    a: "Yes, we offer high-speed WiFi (100 Mbps) in all rooms — ideal for workation travelers, video calls, and remote work. Our Workation Package is specifically designed for remote workers.",
  },
];

function FaqItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
  const [open, setOpen] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: (index % 5) * 0.07 }}
      className="faq-item"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-4 group"
        aria-expanded={open}
      >
        <span className="font-serif font-semibold text-midnight dark:text-white text-base group-hover:text-champagne transition-colors">
          {faq.q}
        </span>
        <span className="shrink-0 w-8 h-8 rounded-full bg-champagne/10 flex items-center justify-center group-hover:bg-champagne/20 transition-colors">
          {open ? (
            <ChevronUp className="w-4 h-4 text-champagne" />
          ) : (
            <ChevronDown className="w-4 h-4 text-champagne" />
          )}
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-warmgray dark:text-gray-400 font-sans text-sm leading-relaxed">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FaqSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="faq" className="section-padding bg-white dark:bg-[#0D1A26]">
      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="badge-gold mx-auto mb-6 w-fit">
            <HelpCircle className="w-3.5 h-3.5" /> FAQs
          </div>
          <h2 className="section-title text-midnight dark:text-white mb-4">
            Frequently Asked <span className="text-gradient-gold">Questions</span>
          </h2>
          <div className="divider-gold" />
          <p className="section-subtitle max-w-xl mx-auto mt-6">
            Everything you need to know about Ahlan Homestays, our packages and visiting Andaman.
          </p>
        </motion.div>

        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {faqs.map((faq, i) => (
            <FaqItem key={i} faq={faq} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 text-center p-8 rounded-3xl bg-gradient-ocean text-white"
        >
          <h3 className="font-serif text-2xl font-bold mb-3">Still Have Questions?</h3>
          <p className="text-white/80 font-sans text-sm mb-6">
            Our team is available 24/7 on WhatsApp to help you plan your perfect Andaman trip.
          </p>
          <a
            href="https://wa.me/919434281386?text=Hi! I have a question about Ahlan Homestays."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            💬 Chat on WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
