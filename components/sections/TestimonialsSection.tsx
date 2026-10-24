"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Star, Quote, CheckCircle, Sparkles, QrCode, Download } from "lucide-react";
import Link from "next/link";

const initialReviews = [
  {
    name: "Priya & Arjun Mehta",
    location: "Mumbai, India",
    avatar: "👩‍❤️‍👨",
    rating: 5,
    tag: "Honeymoon",
    text: "Ahlan Homestay exceeded every expectation! The room was huge, spotlessly clean, and the team arranged everything from our ferry to candlelight dinner on the beach. Best honeymoon decision we ever made!",
    date: "March 2026",
    isLive: false,
  },
  {
    name: "The Sharma Family",
    location: "Delhi, India",
    avatar: "👨‍👩‍👧‍👦",
    rating: 5,
    tag: "Family",
    text: "Travelling with three kids can be stressful, but Ahlan made it magical. They handled all the logistics, the rooms were spacious, and our kids loved every activity. Will be back!",
    date: "January 2026",
    isLive: false,
  },
  {
    name: "David & Emma Wilson",
    location: "London, UK 🇬🇧",
    avatar: "🇬🇧",
    rating: 5,
    tag: "International",
    text: "As international travelers we were nervous, but the team provided an English-speaking guide, SIM card and handled everything. The rooms were like a boutique hotel — immaculate and beautiful.",
    date: "February 2026",
    isLive: false,
  },
  {
    name: "Rajan Kumar",
    location: "Bangalore, India",
    avatar: "👨‍💻",
    rating: 5,
    tag: "Workation",
    text: "Spent 10 days working remotely from Ahlan. The WiFi was genuinely fast, work desk was ergonomic, and on weekends I was at Havelock. Perfect workation setup — highly recommended!",
    date: "April 2026",
    isLive: false,
  },
  {
    name: "Fatima Al-Rashid",
    location: "Dubai, UAE 🇦🇪",
    avatar: "🇦🇪",
    rating: 5,
    tag: "International",
    text: "Premium experience from start to finish. Airport pickup was right on time, the homestay felt like a luxury boutique hotel. The Andaman packages were perfectly organized. 10/10!",
    date: "December 2025",
    isLive: false,
  },
  {
    name: "Arundhati & Mohan",
    location: "Chennai, India",
    avatar: "💏",
    rating: 5,
    tag: "Anniversary",
    text: "Celebrated our 10th anniversary here and it was beyond words. The team decorated the room with flowers, arranged a beach dinner — it felt like a Maldives luxury resort on an Indian budget!",
    date: "November 2025",
    isLive: false,
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
  const [reviewsList, setReviewsList] = useState(initialReviews);

  useEffect(() => {
    fetch("/api/feedback")
      .then((res) => res.json())
      .then((data) => {
        if (data.feedback && data.feedback.length > 0) {
          const liveReviews = data.feedback.map((f: any) => ({
            name: f.name,
            location: f.stayType || "Port Blair Stay",
            avatar: "⭐",
            rating: Number(f.rating) || 5,
            tag: "Verified Guest",
            text: f.review,
            date: f.timestamp ? new Date(f.timestamp).toLocaleDateString("en-IN", { month: "short", year: "numeric" }) : "Recent",
            isLive: true,
          }));
          setReviewsList([...liveReviews, ...initialReviews]);
        }
      })
      .catch(() => {});
  }, []);

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
          {reviewsList.slice(0, 6).map((r, i) => (
            <motion.div
              key={r.name + i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="testimonial-card relative"
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
                  <span className="text-xs px-2 py-0.5 rounded-full bg-champagne/10 text-champagne font-sans font-medium">{r.tag}</span>
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

        {/* Feedback & Downloadable QR Standee Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-14 bg-gradient-ocean rounded-3xl p-6 sm:p-10 text-white text-left flex flex-col md:flex-row items-center justify-between gap-6 shadow-luxury border border-champagne/30 relative overflow-hidden"
        >
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-champagne uppercase tracking-widest">
              <QrCode className="w-4 h-4" /> Guest Feedback &amp; Room QR Standee
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold">
              Stayed with us? Share your experience!
            </h3>
            <p className="text-white/80 text-xs sm:text-sm font-sans leading-relaxed">
              Rate your stay, share your memories, or download our official high-resolution QR standee card for guest room bedside tables.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/feedback"
              className="btn-primary py-3 px-6 text-xs sm:text-sm font-semibold flex items-center gap-2"
            >
              <Star className="w-4 h-4 fill-current" />
              Give Feedback
            </Link>
            <Link
              href="/feedback"
              className="px-5 py-3 rounded-full border border-white/20 hover:border-champagne hover:bg-white/10 text-xs sm:text-sm font-semibold transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-champagne" />
              Download Room QR Card
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
