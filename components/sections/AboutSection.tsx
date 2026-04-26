"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Award, Wifi, Tv, Car, Coffee, Sparkles, Wind, ShowerHead, Clock } from "lucide-react";
import Image from "next/image";
import { useBooking } from "../BookingProvider";

const features = [
  { icon: Award, label: "Gold Category", desc: "Certified premium homestay" },
  { icon: Wind, label: "AC Rooms", desc: "Climate controlled comfort" },
  { icon: Wifi, label: "High-Speed WiFi", desc: "Seamless connectivity" },
  { icon: Tv, label: "Smart TV", desc: "Entertainment on demand" },
  { icon: ShowerHead, label: "Premium Bath", desc: "Luxury washroom experience" },
  { icon: Coffee, label: "Breakfast", desc: "Included in packages" },
  { icon: Car, label: "Airport Pickup", desc: "Hassle-free transfers" },
  { icon: Clock, label: "24/7 Support", desc: "Always here for you" },
  { icon: Sparkles, label: "Daily Cleaning", desc: "Fresh rooms every day" },
];

export default function AboutSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { openBooking } = useBooking();

  return (
    <section
      id="about"
      ref={ref}
      className="section-padding bg-pearl dark:bg-midnight"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image Stack */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-luxury aspect-[4/5] group">
              <Image
                src="/images/dest_radhanagar.png"
                alt="Luxury Andaman Experience"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-ocean opacity-80 mix-blend-multiply" />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/50 to-transparent" />
              
              {/* Subtle floating particles for luxury feel */}
              {typeof window !== 'undefined' && Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 rounded-full bg-champagne/60 shadow-gold-glow animate-pulse"
                  style={{
                    left: `${20 + Math.random() * 60}%`,
                    top: `${20 + Math.random() * 60}%`,
                    animationDelay: `${i * 1.5}s`,
                    animationDuration: `${3 + Math.random() * 2}s`
                  }}
                />
              ))}

              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-12 text-center z-10">
                <div className="w-20 h-20 rounded-full bg-champagne/20 border-2 border-champagne flex items-center justify-center mb-6 backdrop-blur-sm">
                  <span className="font-serif text-4xl font-bold text-champagne">A</span>
                </div>
                <h2 className="font-serif text-3xl font-bold mb-3 drop-shadow-lg">Ahlan Homestay</h2>
                <p className="font-serif italic text-champagne text-lg mb-6 drop-shadow-md">Where Hospitality Meets Paradise</p>
                <div className="grid grid-cols-2 gap-4 w-full max-w-xs relative">
                  <div className="bg-midnight/40 backdrop-blur-md rounded-2xl p-4 text-center border border-white/10 group-hover:border-champagne/30 transition-colors">
                    <div className="font-serif text-3xl font-bold text-champagne">300+</div>
                    <div className="text-xs text-white/70 font-sans mt-1">sq ft Rooms</div>
                  </div>
                  <div className="bg-midnight/40 backdrop-blur-md rounded-2xl p-4 text-center border border-white/10 group-hover:border-champagne/30 transition-colors">
                    <div className="font-serif text-3xl font-bold text-champagne">Gold</div>
                    <div className="text-xs text-white/70 font-sans mt-1">Category</div>
                  </div>
                  <div className="bg-midnight/40 backdrop-blur-md rounded-2xl p-4 text-center border border-white/10 group-hover:border-champagne/30 transition-colors">
                    <div className="font-serif text-3xl font-bold text-champagne">4.9★</div>
                    <div className="text-xs text-white/70 font-sans mt-1">Google Rating</div>
                  </div>
                  <div className="bg-midnight/40 backdrop-blur-md rounded-2xl p-4 text-center border border-white/10 group-hover:border-champagne/30 transition-colors">
                    <div className="font-serif text-3xl font-bold text-champagne">10K+</div>
                    <div className="text-xs text-white/70 font-sans mt-1">Guests</div>
                  </div>
                </div>
              </div>
            </div>
            {/* Gold Category badge - positioned cleanly inside the image card */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-4 right-4 glass-gold rounded-2xl p-4 shadow-gold-glow z-20 max-w-[180px]"
            >
              <div className="flex items-center gap-2">
                <Award className="w-6 h-6 text-champagne flex-shrink-0" />
                <div>
                  <div className="font-serif font-bold text-champagne text-xs leading-tight">Gold Category</div>
                  <div className="text-[10px] text-gray-600 dark:text-gray-300 font-sans leading-tight">AN Administration Certified</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="badge-gold mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              About Ahlan Homestay
            </div>

            <h2 className="section-title text-midnight dark:text-white mb-6">
              Not Just a Homestay —<br />
              <span className="text-gradient-gold">A Luxury Experience</span>
            </h2>

            <div className="divider-gold ml-0" />

            <p className="section-subtitle mb-6">
              Ahlan Homestay is a <strong>Gold Category Premium Homestay</strong> in Port Blair, 
              Andaman & Nicobar Islands. We redefine the homestay experience by combining 
              <strong> hotel-grade comfort</strong> with the warmth of a home.
            </p>

            <p className="font-sans text-warmgray dark:text-gray-400 leading-relaxed mb-10">
              From our <strong>spacious 300+ sq ft deluxe AC rooms</strong> to curated island 
              sightseeing packages, airport transfers, and personalized local guidance — every detail 
              is crafted to make your Andaman vacation unforgettable. Whether you&apos;re a 
              honeymooner, family, solo traveler or foreign tourist, we have the perfect experience for you.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-3 gap-4">
              {features.map((f, i) => {
                const Icon = f.icon;
                return (
                  <motion.div
                    key={f.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.07 }}
                    className="flex flex-col items-center text-center p-3 rounded-2xl bg-white dark:bg-white/5 hover:bg-champagne/5 dark:hover:bg-champagne/10 transition-colors group cursor-default border border-transparent hover:border-champagne/20"
                  >
                    <div className="w-10 h-10 rounded-xl bg-champagne/10 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5 text-champagne" />
                    </div>
                    <span className="font-sans text-xs font-semibold text-midnight dark:text-white">{f.label}</span>
                    <span className="font-sans text-[10px] text-warmgray dark:text-gray-500 mt-0.5">{f.desc}</span>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <button
                onClick={() => openBooking("general")}
                className="btn-primary"
              >
                Book Your Stay
              </button>
              <a href="/rooms" className="btn-secondary">
                View Rooms
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
