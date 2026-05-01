"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Calendar, Users, Map, CheckCircle2, ChevronDown, ChevronUp, MapPin } from "lucide-react";
import Image from "next/image";
import { useBooking } from "../BookingProvider";
import { useCurrency } from "../CurrencyProvider";

const packages = [
  {
    id: "p1",
    title: "Romantic Escape",
    duration: "3 Nights / 4 Days",
    basePrice: 0,
    priceSuffix: " (Price on Request)",
    image: "https://images.unsplash.com/photo-1543158266-0066955047b1?auto=format&fit=crop&q=80&w=800",
    badge: "Couple Favourite",
    badgeColor: "bg-rose-500",
    desc: "A magical romantic getaway. All itineraries include a stay at AHLAN HOMESTAYS. Add extra thrills with optional water sports like Jet Skiing, Scuba Diving, and Parasailing.",
    destinations: ["Port Blair", "Havelock Island", "Ross Island", "Chidiya Tapu"],
    inclusions: ["Complimentary Breakfast", "Sightseeing & Entry Tickets", "Airport Transfers & Cab", "Ferry Tickets", "3-Star Accommodation", "Trip Coordinator & Taxes"],
    itinerary: [
      { day: 1, title: "Arrival & Port Blair", desc: "Arrive at Port Blair by flight, receive a transfer to Ahlan Homestays. Afternoon: Visit Corbyn's Cove Beach. Evening: Attend the enthralling Light and Sound show at Cellular Jail." },
      { day: 2, title: "Havelock Island", desc: "Early departure by inter-island ferry to Havelock Island. Afternoon: Visit Beach No. 7 (Radha Nagar), rated as one of Asia's most beautiful beaches. Evening: Enjoy dinner overlooking the scenic Taal Volcano." },
      { day: 3, title: "Ross Island & Chidiya Tapu", desc: "Visit Ross Island (former British governing headquarters). Evening: Return to Port Blair for a city tour and a trip to Chidiya Tapu sunset point." },
      { day: 4, title: "Departure", desc: "Morning airport drop-off for your journey home." }
    ]
  },
  {
    id: "p2",
    title: "Adventure Explorer",
    duration: "4 Nights / 5 Days",
    basePrice: 21999,
    priceSuffix: " / person",
    image: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&q=80&w=800",
    badge: "Adventure Pick",
    badgeColor: "bg-blue-600",
    desc: "Thrilling island hopping and water sports adventure. Includes complimentary beachside snorkeling. Optional Jet Skiing, Scuba Diving, and more available on request.",
    destinations: ["Port Blair", "Havelock Island", "Neil Island", "Ross Island"],
    inclusions: ["Complimentary Breakfast", "Sightseeing & Entry Tickets", "Airport Transfers & Cab", "Ferry Tickets", "3-Star Accommodation", "Trip Coordinator & Taxes"],
    itinerary: [
      { day: 1, title: "Arrival & Cellular Jail", desc: "Arrive in Port Blair, transfer to Ahlan Homestays. Visit Corbyn's Cove Beach in the afternoon, and attend the Light and Sound show at Cellular Jail in the evening." },
      { day: 2, title: "Havelock Island", desc: "Early morning ferry to Havelock Island, afternoon visit to Radha Nagar Beach, and evening dinner overlooking Taal Volcano." },
      { day: 3, title: "Elephanta Beach & Neil Island", desc: "Early checkout to visit Elephanta Beach for complimentary beachside snorkeling. Return to Port Blair in the evening OR proceed from Havelock to Neil Island for an overnight stay." },
      { day: 4, title: "Ross Island & Sunset", desc: "Visit Ross Island, return for a Port Blair city tour, and visit Chidiya Tapu for the sunset. Stay in Port Blair." },
      { day: 5, title: "Departure", desc: "Transfer to the airport for departure." }
    ]
  },
  {
    id: "p3",
    title: "Family Fun",
    duration: "5 Nights / 6 Days",
    basePrice: 25555,
    priceSuffix: " / person",
    image: "https://images.unsplash.com/photo-1602088113235-229c19758e9f?auto=format&fit=crop&q=80&w=800",
    badge: "Family Recommended",
    badgeColor: "bg-palm",
    desc: "Safe, comfortable, and engaging trip designed perfectly for families with children of all ages. Enjoy the best of Andaman's beaches and history.",
    destinations: ["Port Blair", "Havelock", "Neil Island", "Ross Island"],
    inclusions: ["Complimentary Breakfast", "Sightseeing & Entry Tickets", "Airport Transfers & Cab", "Ferry Tickets", "3-Star Accommodation", "Trip Coordinator & Taxes"],
    itinerary: [
      { day: 1, title: "Arrival & Port Blair", desc: "Arrive in Port Blair, transfer to Ahlan Homestays. Visit Corbyn's Cove Beach in the afternoon, and attend the Cellular Jail Light and Sound show in the evening." },
      { day: 2, title: "Havelock Island", desc: "Early morning ferry to Havelock Island, afternoon visit to Radha Nagar Beach, and evening dinner overlooking Taal Volcano." },
      { day: 3, title: "Elephanta & Neil Island", desc: "Early checkout for Elephanta Beach (complimentary snorkeling). In the afternoon, travel to Neil Island and stay overnight at a resort." },
      { day: 4, title: "Neil Island & Return", desc: "Visit Laxmanpur Beach at Neil Island for a photography spot. Return to Port Blair via Nautika/Makruzz ferry. Evening visit to Chidiya Tapu for the sunset." },
      { day: 5, title: "City Tour", desc: "After breakfast, embark on a Port Blair city tour. After lunch, visit Chidiya Tapu sunset point or Ross Island and North Bay Island." },
      { day: 6, title: "Departure", desc: "Transfer to the airport for departure." }
    ]
  }
];

function PackageCard({ pkg, index }: { pkg: typeof packages[0], index: number }) {
  const [expanded, setExpanded] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { openBooking } = useBooking();
  const { formatPrice } = useCurrency();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="card-luxury overflow-hidden flex flex-col md:flex-row group"
    >
      {/* Image Column */}
      <div className="relative w-full md:w-2/5 h-64 md:h-auto overflow-hidden">
        <Image src={pkg.image} alt={pkg.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 40vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {pkg.badge && (
          <span className={`absolute top-4 left-4 ${pkg.badgeColor} text-white text-[10px] font-bold px-3 py-1.5 rounded-full font-sans uppercase tracking-wider shadow-lg`}>
            {pkg.badge}
          </span>
        )}
        
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <h3 className="font-serif font-bold text-2xl leading-tight drop-shadow-md mb-2">{pkg.title}</h3>
          <div className="flex flex-wrap gap-2 text-xs font-sans">
            <span className="bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/20 flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {pkg.duration}</span>
            <span className="bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/20 flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {pkg.destinations.length} Places</span>
          </div>
        </div>
      </div>

      {/* Content Column */}
      <div className="p-6 md:p-8 w-full md:w-3/5 flex flex-col">
        <p className="text-sm text-warmgray dark:text-gray-400 font-sans leading-relaxed mb-6">{pkg.desc}</p>
        
        <div className="mb-6">
          <h4 className="font-serif font-semibold text-midnight dark:text-white mb-3 text-sm">Package Inclusions:</h4>
          <div className="grid grid-cols-2 gap-y-2 gap-x-4">
            {pkg.inclusions.map((inc) => (
              <div key={inc} className="flex items-start gap-2 text-xs text-gray-700 dark:text-gray-300 font-sans">
                <CheckCircle2 className="w-3.5 h-3.5 text-champagne shrink-0 mt-0.5" /> {inc}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-auto pt-6 border-t border-gray-100 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-warmgray font-sans mb-1">{pkg.basePrice > 0 ? "Starting from" : "Custom Quote"}</div>
            <div className="font-serif text-3xl font-bold text-gradient-gold">
              {pkg.basePrice > 0 ? formatPrice(pkg.basePrice) : "Price on Request"}
              <span className="text-sm text-warmgray font-sans font-medium">{pkg.basePrice > 0 ? pkg.priceSuffix : ""}</span>
            </div>
          </div>
          <div className="flex w-full sm:w-auto gap-3">
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex-1 sm:flex-none btn-secondary text-xs py-3 px-5 flex items-center justify-center gap-2"
            >
              {expanded ? "Hide Itinerary" : "View Itinerary"}
              {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            <button
              onClick={() => openBooking("package", "", pkg.title)}
              className="flex-1 sm:flex-none btn-primary text-xs py-3 px-6 shadow-gold-glow"
            >
              Book Package
            </button>
          </div>
        </div>

        {/* Expandable Itinerary */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mt-6"
            >
              <div className="bg-gray-50 dark:bg-white/5 rounded-2xl p-5 border border-gray-100 dark:border-white/10 space-y-4">
                {pkg.itinerary.map((day, idx) => (
                  <div key={idx} className="relative pl-6 before:absolute before:left-[11px] before:top-2 before:bottom-[-16px] last:before:bottom-0 before:w-px before:bg-champagne/30">
                    <div className="absolute left-0 top-1.5 w-[22px] h-[22px] rounded-full bg-champagne text-white text-[10px] font-bold flex items-center justify-center shadow-md">
                      {typeof day.day === 'number' ? `D${day.day}` : 'W'}
                    </div>
                    <h5 className="font-serif font-bold text-sm text-midnight dark:text-white mb-1">{day.title}</h5>
                    <p className="text-xs text-warmgray dark:text-gray-400 font-sans leading-relaxed">{day.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function PackageSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [livePackages, setLivePackages] = useState(packages);

  useEffect(() => {
    fetch("/api/admin/data")
      .then(res => res.json())
      .then(data => { if (data?.packages?.length) setLivePackages(data.packages); })
      .catch(() => {});
  }, []);

  return (
    <section id="packages" className="section-padding bg-white dark:bg-midnight">
      <div className="max-w-6xl mx-auto">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <div className="badge-gold mx-auto mb-6 w-fit"><Map className="w-3.5 h-3.5" /> Tailored For You</div>
          <h2 className="section-title text-midnight dark:text-white mb-4">
            Curated Island <span className="text-gradient-gold">Experiences</span>
          </h2>
          <div className="divider-gold" />
          <p className="section-subtitle max-w-2xl mx-auto mt-6">
            All-inclusive premium packages complete with deluxe stays, private transfers, ferry tickets, and unforgettable memories.
          </p>
        </motion.div>

        <div className="space-y-8">
          {livePackages.map((pkg: any, i: number) => (
            <PackageCard key={pkg.id} pkg={pkg} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
