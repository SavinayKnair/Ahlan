"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Star, Quote, CheckCircle, Sparkles } from "lucide-react";

const reviews = [
  {
    name: "Priya & Arjun Mehta",
    location: "Mumbai, India",
    avatar: "👩‍❤️‍👨",
    rating: 5,
    tag: "Honeymoon",
    text: "Ahlan Homestay exceeded every expectation! The room was huge, spotlessly clean, and the team arranged everything from our ferry to candlelight dinner on the beach. Best honeymoon decision we ever made!",
    date: "March 2026",
  },
  {
    name: "The Sharma Family",
    location: "Delhi, India",
    avatar: "👨‍👩‍👧‍👦",
    rating: 5,
    tag: "Family",
    text: "Travelling with three kids can be stressful, but Ahlan made it magical. They handled all the logistics, the rooms were spacious, and our kids loved every activity. Will be back!",
    date: "January 2026",
  },
  {
    name: "David & Emma Wilson",
    location: "London, UK 🇬🇧",
    avatar: "🇬🇧",
    rating: 5,
    tag: "International",
    text: "As international travelers we were nervous, but the team provided an English-speaking guide, SIM card and handled everything. The rooms were like a boutique hotel — immaculate and beautiful.",
    date: "February 2026",
  },
  {
    name: "Rajan Kumar",
    location: "Bangalore, India",
    avatar: "👨‍💻",
    rating: 5,
    tag: "Workation",
    text: "Spent 10 days working remotely from Ahlan. The WiFi was genuinely fast, work desk was ergonomic, and on weekends I was at Havelock. Perfect workation setup — highly recommended!",
    date: "April 2026",
  },
  {
    name: "Fatima Al-Rashid",
    location: "Dubai, UAE 🇦🇪",
    avatar: "🇦🇪",
    rating: 5,
    tag: "International",
    text: "Premium experience from start to finish. Airport pickup was right on time, the homestay felt like a luxury boutique hotel. The Andaman packages were perfectly organized. 10/10!",
    date: "December 2025",
  },
  {
    name: "Arundhati & Mohan",
    location: "Chennai, India",
    avatar: "💏",
    rating: 5,
    tag: "Anniversary",
    text: "Celebrated our 10th anniversary here and it was beyond words. The team decorated the room with flowers, arranged a beach dinner — it felt like a Maldives luxury resort on an Indian budget!",
    date: "November 2025",
  },
];

function StarRow({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-4 h-4 star-gold fill-champagne" />
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="reviews" className="section-padding bg-white dark:bg-[#0D1A26]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="badge-gold mx-auto mb-6 w-fit">
            <Star className="w-3.5 h-3.5 fill-champagne" /> Guest Reviews
          </div>
          <h2 className="section-title text-midnight dark:text-white mb-4">
            What Our Guests <span className="text-gradient-gold">Say</span>
          </h2>
          <div className="divider-gold" />

          {/* Google Rating Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="inline-flex items-center gap-4 mt-8 p-5 rounded-2xl bg-white dark:bg-white/5 shadow-luxury border border-champagne/10"
          >
            <div className="text-4xl">⭐</div>
            <div className="text-left">
              <div className="font-serif text-3xl font-bold text-champagne">4.9 / 5</div>
              <div className="font-sans text-sm text-warmgray dark:text-gray-400">Based on 450+ Google Reviews</div>
            </div>
            <div className="flex items-center gap-2 bg-green-50 dark:bg-green-900/20 px-3 py-2 rounded-xl">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-xs text-green-600 dark:text-green-400 font-semibold font-sans">Verified</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="testimonial-card"
            >
              <Quote className="w-8 h-8 text-champagne/30 mb-4" />
              <StarRow count={r.rating} />
              <p className="text-gray-700 dark:text-gray-300 font-sans text-sm leading-relaxed mt-4 mb-6 italic">
                &ldquo;{r.text}&rdquo;
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{r.avatar}</span>
                  <div>
                    <div className="font-serif font-semibold text-midnight dark:text-white text-sm">{r.name}</div>
                    <div className="font-sans text-xs text-warmgray dark:text-gray-400">{r.location}</div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-champagne/10 text-champagne font-sans">{r.tag}</span>
                  <span className="text-xs text-warmgray dark:text-gray-500 font-sans">{r.date}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="flex flex-wrap justify-center gap-4 mt-12"
        >
          {[
            { icon: "✅", label: "Safe & Clean Stay" },
            { icon: "👨‍👩‍👧", label: "Family Friendly" },
            { icon: "🏆", label: "Gold Category Host" },
            { icon: "🌍", label: "International Guests" },
            { icon: "⭐", label: "5-Star Rated" },
          ].map((b) => (
            <div
              key={b.label}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-white/5 shadow-glass border border-champagne/10 text-sm font-sans text-gray-700 dark:text-gray-300"
            >
              <span>{b.icon}</span>
              <span className="font-medium">{b.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
