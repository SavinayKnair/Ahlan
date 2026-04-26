"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Wifi, Wind, Tv, Sparkles, ShowerHead, BedDouble, Maximize, MapPin, Users } from "lucide-react";
import Image from "next/image";
import { useBooking } from "../BookingProvider";
import { useCurrency } from "../CurrencyProvider";

const rooms = [
  {
    id: "deluxe-forest",
    name: "Deluxe Forest View Room",
    size: "300+ sq ft",
    guests: "Max 3 Guests",
    basePrice: 2500,
    image: "/images/rooms/forest-view.png",
    desc: "Wake up to lush tropical forest greenery. Spacious deluxe room with premium furnishings and serene nature views.",
    features: ["King-Size Bed", "AC", "Smart TV", "Premium Bath", "Free WiFi", "Daily Cleaning"],
    tag: "Forest Views",
    tagColor: "bg-palm",
    availability: "3 Rooms Left Today",
  },
  {
    id: "deluxe-premium",
    name: "Deluxe Premium Stay Room",
    size: "300+ sq ft",
    guests: "Max 3 Guests",
    basePrice: 2500,
    image: "/images/rooms/premium-stay.png",
    desc: "Elevated comfort with higher floor views and upgraded amenities. Perfect for couples seeking a touch of extra luxury.",
    features: ["King-Size Bed", "AC", "Smart TV", "Premium Bath", "Free WiFi", "Daily Cleaning"],
    tag: "Most Popular",
    tagColor: "bg-champagne",
    availability: "Only 1 Left This Weekend",
  },
  {
    id: "deluxe-family",
    name: "Deluxe Family Comfort Room",
    size: "350+ sq ft",
    guests: "Max 4 Guests",
    basePrice: 2500,
    image: "/images/rooms/family-comfort.png",
    desc: "Generously sized for families. Extra bedding options, separate seating area, and child-friendly setup.",
    features: ["Multiple Beds", "AC", "Smart TV", "Premium Bath", "Free WiFi", "Daily Cleaning"],
    tag: "Family Favourite",
    tagColor: "bg-ocean-light",
    availability: "Available for Selected Dates",
  },
  {
    id: "deluxe-couple",
    name: "Deluxe Couple Retreat Room",
    size: "300+ sq ft",
    guests: "Max 2 Guests",
    basePrice: 2500,
    image: "/images/rooms/couple-retreat.png",
    desc: "Romantic premium setup with optional rose petal décor, private balcony access, and personalized turndown service.",
    features: ["King-Size Bed", "AC", "Smart TV", "Premium Bath", "Free WiFi", "Rose Décor Option"],
    tag: "Romantic",
    tagColor: "bg-rose-500",
    availability: "2 Rooms Available",
  },
  {
    id: "deluxe-runway",
    name: "Deluxe Runway View Room",
    size: "320+ sq ft",
    guests: "Max 3 Guests",
    basePrice: 2500,
    image: "/images/rooms/runway-view.png",
    desc: "Perfect for aviation enthusiasts. Watch planes land and take off from the comfort of your luxury premium room.",
    features: ["King-Size Bed", "AC", "Soundproof Windows", "Smart TV", "Free WiFi", "Premium Bath"],
    tag: "Unique View",
    tagColor: "bg-blue-600",
    availability: "Limited Availability",
  },
];

const amenityIcons: Record<string, React.ElementType> = {
  "King-Size Bed": BedDouble,
  "Multiple Beds": BedDouble,
  "AC": Wind,
  "Smart TV": Tv,
  "Premium Bath": ShowerHead,
  "Free WiFi": Wifi,
  "Daily Cleaning": Sparkles,
  "Rose Décor Option": HeartIcon,
  "Soundproof Windows": MapPin,
};

function HeartIcon(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
}

export default function RoomSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { openBooking } = useBooking();
  const { formatPrice } = useCurrency();
  const [liveRooms, setLiveRooms] = useState(rooms);

  useEffect(() => {
    fetch("/api/admin/data")
      .then(res => res.json())
      .then(data => { if (data?.rooms?.length) setLiveRooms(data.rooms); })
      .catch(() => {});
  }, []);

  return (
    <section id="rooms" className="section-padding bg-pearl dark:bg-[#0A0A0F] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <div className="badge-gold mx-auto mb-6 w-fit"><BedDouble className="w-3.5 h-3.5" /> Premium Accommodation</div>
          <h2 className="section-title text-midnight dark:text-white mb-4">
            Luxury <span className="text-gradient-gold">Deluxe Rooms</span>
          </h2>
          <div className="divider-gold" />
          <p className="section-subtitle max-w-2xl mx-auto mt-6">
            Every room is 300+ sq ft, AC-equipped, and designed for maximum comfort. Hotel quality, homestay warmth.
          </p>
        </motion.div>

        {/* Side-Scrolling Container */}
        <div className="relative">
          <div className="flex overflow-x-auto pb-12 gap-6 scrollbar-hide snap-x snap-mandatory">
            {liveRooms.map((room: any, i: number) => (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, x: 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="min-w-[300px] md:min-w-[350px] lg:min-w-[400px] card-luxury group flex flex-col snap-start"
              >
                {/* Room Visual */}
                <div className="relative h-64 overflow-hidden bg-gray-200">
                  <Image src={room.image} alt={room.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 400px" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {room.tag && (
                    <span className={`absolute top-4 left-4 ${room.tagColor} text-white text-[10px] font-bold px-3 py-1.5 rounded-full font-sans uppercase tracking-wider shadow-lg`}>
                      {room.tag}
                    </span>
                  )}
                  
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <div className="bg-white/20 backdrop-blur-md rounded-xl px-3 py-1.5 flex items-center gap-1.5 border border-white/30">
                      <Maximize className="w-3.5 h-3.5 text-white" />
                      <span className="text-white text-xs font-semibold font-sans">{room.size}</span>
                    </div>
                    <div className="bg-white/20 backdrop-blur-md rounded-xl px-3 py-1.5 flex items-center gap-1.5 border border-white/30">
                      <Users className="w-3.5 h-3.5 text-white" />
                      <span className="text-white text-xs font-semibold font-sans">{room.guests}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="mb-3">
                    <h3 className="font-serif font-bold text-xl text-midnight dark:text-white leading-tight">{room.name}</h3>
                  </div>
                  
                  {/* Availability Badge */}
                  <div className="mb-4 inline-flex items-center gap-1.5 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs font-semibold px-3 py-1.5 rounded-lg border border-green-200 dark:border-green-800/30 w-fit">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    {room.availability}
                  </div>

                  <p className="text-sm text-warmgray dark:text-gray-400 font-sans leading-relaxed mb-6 flex-1">{room.desc}</p>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-y-3 gap-x-2 mb-6">
                    {room.features.map((f: string) => {
                      const Icon = amenityIcons[f] || Sparkles;
                      return (
                        <div key={f} className="flex items-center gap-2 text-[11px] font-medium text-gray-700 dark:text-gray-300 font-sans">
                          <Icon className="w-3.5 h-3.5 text-champagne shrink-0" />{f}
                        </div>
                      );
                    })}
                  </div>

                  {/* Price + CTA */}
                  <div className="pt-5 border-t border-gray-100 dark:border-white/10 mt-auto">
                    <div className="flex items-end justify-between mb-4">
                      <div>
                        <div className="text-[10px] uppercase tracking-wider text-warmgray font-sans mb-1">Starting from</div>
                        <div className="font-serif text-2xl font-bold text-gradient-gold leading-none">{formatPrice(room.basePrice)}</div>
                      </div>
                      <div className="text-xs text-warmgray dark:text-gray-400 font-sans mb-0.5">/ night</div>
                    </div>
                    <button
                      onClick={() => openBooking("room", room.name, "")}
                      className="w-full btn-primary text-sm py-3.5 shadow-gold-glow hover:shadow-xl transition-shadow"
                    >
                      Book Room
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Custom Scroll Indicator */}
          <div className="flex justify-center gap-2 mt-4">
            <div className="w-12 h-1 bg-champagne/20 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gold"
                initial={{ width: "20%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
              />
            </div>
            <span className="text-[10px] text-warmgray font-sans uppercase tracking-widest">Scroll to explore</span>
          </div>
        </div>
      </div>
    </section>
              {/* Room Visual */}
              <div className="relative h-64 overflow-hidden bg-gray-200">
                <Image src={room.image} alt={room.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {room.tag && (
                  <span className={`absolute top-4 left-4 ${room.tagColor} text-white text-[10px] font-bold px-3 py-1.5 rounded-full font-sans uppercase tracking-wider shadow-lg`}>
                    {room.tag}
                  </span>
                )}
                
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="bg-white/20 backdrop-blur-md rounded-xl px-3 py-1.5 flex items-center gap-1.5 border border-white/30">
                    <Maximize className="w-3.5 h-3.5 text-white" />
                    <span className="text-white text-xs font-semibold font-sans">{room.size}</span>
                  </div>
                  <div className="bg-white/20 backdrop-blur-md rounded-xl px-3 py-1.5 flex items-center gap-1.5 border border-white/30">
                    <Users className="w-3.5 h-3.5 text-white" />
                    <span className="text-white text-xs font-semibold font-sans">{room.guests}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <div className="mb-3">
                  <h3 className="font-serif font-bold text-xl text-midnight dark:text-white leading-tight">{room.name}</h3>
                </div>
                
                {/* Availability Badge */}
                <div className="mb-4 inline-flex items-center gap-1.5 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs font-semibold px-3 py-1.5 rounded-lg border border-green-200 dark:border-green-800/30 w-fit">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  {room.availability}
                </div>

                <p className="text-sm text-warmgray dark:text-gray-400 font-sans leading-relaxed mb-6 flex-1">{room.desc}</p>

                {/* Features */}
                <div className="grid grid-cols-2 gap-y-3 gap-x-2 mb-6">
                  {room.features.map((f: string) => {
                    const Icon = amenityIcons[f] || Sparkles;
                    return (
                      <div key={f} className="flex items-center gap-2 text-[11px] font-medium text-gray-700 dark:text-gray-300 font-sans">
                        <Icon className="w-3.5 h-3.5 text-champagne shrink-0" />{f}
                      </div>
                    );
                  })}
                </div>

                {/* Price + CTA */}
                <div className="pt-5 border-t border-gray-100 dark:border-white/10 mt-auto">
                  <div className="flex items-end justify-between mb-4">
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-warmgray font-sans mb-1">Starting from</div>
                      <div className="font-serif text-2xl font-bold text-gradient-gold leading-none">{formatPrice(room.basePrice)}</div>
                    </div>
                    <div className="text-xs text-warmgray dark:text-gray-400 font-sans mb-0.5">/ night</div>
                  </div>
                  <button
                    onClick={() => openBooking("room", room.name, "")}
                    className="w-full btn-primary text-sm py-3.5 shadow-gold-glow hover:shadow-xl transition-shadow"
                  >
                    Book Room
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
