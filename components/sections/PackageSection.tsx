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
    title: "Romantic Honeymoon Escape",
    duration: "4 Nights / 5 Days",
    basePrice: 29999,
    priceSuffix: "/couple",
    image: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&q=80&w=800",
    badge: "Couple Favourite",
    badgeColor: "bg-rose-500",
    desc: "A magical romantic getaway featuring private beach dinners, photoshoots, and sunset cruises.",
    destinations: ["Port Blair", "Havelock Island", "Neil Island"],
    inclusions: ["Deluxe Stay", "All Ferry Tickets", "Candlelight Dinner", "Beach Photoshoot", "Couples Spa", "Airport Transfers"],
    itinerary: [
      { day: 1, title: "Arrival & Sunset Cruise", desc: "Airport pickup, check-in to Honeymoon Suite. Evening sunset cruise at Port Blair harbour." },
      { day: 2, title: "Havelock Island & Radhanagar", desc: "Premium ferry to Havelock. Visit Asia's best beach, Radhanagar. Evening candlelight dinner." },
      { day: 3, title: "Elephant Beach Snorkeling", desc: "Private boat to Elephant Beach for snorkeling. Afternoon couples spa session." },
      { day: 4, title: "Neil Island Romance", desc: "Ferry to Neil Island. Visit Natural Bridge and Laxmanpur beach sunset. Return to Port Blair." },
      { day: 5, title: "Departure", desc: "Breakfast and airport drop with unforgettable memories." }
    ]
  },
  {
    id: "p2",
    title: "Family Discovery Tour",
    duration: "5 Nights / 6 Days",
    basePrice: 18999,
    priceSuffix: "/person",
    image: "https://images.unsplash.com/photo-1602088113235-229c19758e9f?auto=format&fit=crop&q=80&w=800",
    badge: "Family Recommended",
    badgeColor: "bg-palm",
    desc: "Safe, comfortable, and engaging trip designed perfectly for families with children of all ages.",
    destinations: ["Port Blair", "Havelock Island", "Ross Island"],
    inclusions: ["Family Suite Stay", "All Ferry Tickets", "Glass-Bottom Boat", "Kids Activity Kit", "Daily Breakfast", "Airport Transfers"],
    itinerary: [
      { day: 1, title: "Arrival & Cellular Jail", desc: "Airport pickup. Evening visit to Cellular Jail and Light & Sound show." },
      { day: 2, title: "Ross Island & North Bay", desc: "Glass bottom boat ride to see corals. Historical tour of Ross Island." },
      { day: 3, title: "Havelock Island", desc: "Ferry to Havelock. Family time at Radhanagar beach." },
      { day: 4, title: "Elephant Beach", desc: "Safe snorkeling and water sports for the family at Elephant Beach." },
      { day: 5, title: "Return to Port Blair", desc: "Souvenir shopping and visit to Samudrika Marine Museum." },
      { day: 6, title: "Departure", desc: "Airport drop." }
    ]
  },
  {
    id: "p3",
    title: "Premium Island Luxury Tour",
    duration: "6 Nights / 7 Days",
    basePrice: 34555,
    priceSuffix: "/person",
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80&w=800",
    badge: "Most Popular",
    badgeColor: "bg-champagne",
    desc: "The ultimate Andaman experience. VIP transfers, premium stays, and exclusive island tours.",
    destinations: ["Port Blair", "Havelock", "Neil", "Baratang"],
    inclusions: ["Premium Room", "Makruzz VIP Ferry", "Private Cab", "Scuba Diving", "Limestone Caves", "All Meals"],
    itinerary: [
      { day: 1, title: "VIP Arrival", desc: "Welcome drinks, check-in. Evening at Corbyn's Cove beach." },
      { day: 2, title: "Baratang Island", desc: "Early morning trip through Jarawa reserve to Limestone Caves." },
      { day: 3, title: "Havelock Island", desc: "VIP ferry to Havelock. Sunset at Radhanagar Beach." },
      { day: 4, title: "Scuba Experience", desc: "Introductory scuba diving with PADI certified instructors." },
      { day: 5, title: "Neil Island", desc: "Ferry to Neil Island. Relax at Bharatpur beach." },
      { day: 6, title: "Port Blair Heritage", desc: "Return to Port Blair. City tour and shopping." },
      { day: 7, title: "Departure", desc: "VIP airport transfer." }
    ]
  },
  {
    id: "p4",
    title: "Workation + Vacation Plan",
    duration: "14 Nights / 15 Days",
    basePrice: 45000,
    priceSuffix: "/person",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
    badge: "Long Stay",
    badgeColor: "bg-ocean-light",
    desc: "Work remotely with 100Mbps WiFi during the week, explore tropical paradise on the weekends.",
    destinations: ["Port Blair Base", "Weekend Islands"],
    inclusions: ["Deluxe Room", "100Mbps WiFi", "Work Desk", "Weekend Island Trips", "Laundry", "Breakfast"],
    itinerary: [
      { day: "Mon-Fri", title: "Remote Work Setup", desc: "High-speed WiFi, dedicated workspace, endless coffee." },
      { day: "Weekends", title: "Island Hopping", desc: "Guided weekend trips to Havelock, Neil, and Ross Islands." },
      { day: "Anytime", title: "Local Exploration", desc: "Evening visits to local cafes and sunset points." }
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
            <div className="text-[10px] uppercase tracking-wider text-warmgray font-sans mb-1">Starting from</div>
            <div className="font-serif text-3xl font-bold text-gradient-gold">{formatPrice(pkg.basePrice)}<span className="text-sm text-warmgray font-sans font-medium">{pkg.priceSuffix}</span></div>
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
