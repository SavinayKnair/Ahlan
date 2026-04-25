"use client";
import { useEffect, useRef } from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { Users, Star, BedDouble, Repeat } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: 10000,
    suffix: "+",
    label: "Guests Hosted",
    desc: "Happy travelers from across the world",
    color: "text-champagne",
  },
  {
    icon: BedDouble,
    value: 300,
    suffix: "+ sq ft",
    label: "Deluxe Rooms",
    desc: "Spacious premium rooms with hotel comfort",
    color: "text-ocean-light",
  },
  {
    icon: Star,
    value: 4.9,
    suffix: "/5",
    label: "Star Rating",
    desc: "Consistently rated 5-star by guests",
    color: "text-champagne",
    decimals: 1,
  },
  {
    icon: Repeat,
    value: 65,
    suffix: "%",
    label: "Repeat Visitors",
    desc: "Guests who come back for more",
    color: "text-palm-light",
  },
];

export default function AnimatedStats() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section ref={ref} className="relative bg-white dark:bg-[#0D1A26] py-16 overflow-hidden">
      {/* Gold accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-champagne to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-champagne to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="text-center group"
              >
                {/* Icon */}
                <div className="inline-flex w-14 h-14 rounded-2xl bg-champagne/10 dark:bg-champagne/5 items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className={`w-7 h-7 ${stat.color}`} />
                </div>

                {/* Counter */}
                <div className={`font-serif text-4xl md:text-5xl font-bold ${stat.color} mb-2`}>
                  {inView ? (
                    <CountUp
                      start={0}
                      end={stat.value}
                      duration={2.5}
                      delay={i * 0.2}
                      decimals={stat.decimals ?? 0}
                      suffix={stat.suffix}
                    />
                  ) : (
                    `0${stat.suffix}`
                  )}
                </div>

                {/* Label */}
                <div className="font-serif font-semibold text-gray-800 dark:text-white text-base mb-1">
                  {stat.label}
                </div>
                <div className="font-sans text-xs text-warmgray dark:text-gray-400 leading-snug">
                  {stat.desc}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
