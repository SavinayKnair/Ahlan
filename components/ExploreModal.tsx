"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Map as MapIcon, Clock, Sun, Info, Navigation, Anchor, ChevronRight, ExternalLink } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useBooking } from "./BookingProvider";

export interface Attraction {
  name: string;
  image: string;
  description: string;
  distance: string;
  timings: string;
  bestTime: string;
  mapLink: string;
}

export interface Destination {
  id: string;
  name: string;
  shortDesc: string;
  longDesc: string;
  image: string;
  gallery: string[];
  location: string;
  distance: string;
  bestTime: string;
  facts: string[];
  thingsToDo: string[];
  travelTips: string[];
  mapLink: string;
  attractions?: Attraction[];
}

interface ExploreModalProps {
  destination: Destination | null;
  onClose: () => void;
}

export default function ExploreModal({ destination, onClose }: ExploreModalProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "attractions" | "gallery">("overview");
  const { openBooking } = useBooking();

  if (!destination) return null;

  const hasAttractions = destination.attractions && destination.attractions.length > 0;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl max-h-[92vh] bg-white dark:bg-midnight rounded-3xl shadow-2xl overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 bg-black/30 hover:bg-black/50 backdrop-blur-md rounded-full text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Hero Header */}
          <div className="relative h-64 sm:h-80 w-full shrink-0">
            <Image src={destination.image} alt={destination.name} fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-12">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="bg-champagne/90 text-midnight text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">Must Visit</span>
                <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {destination.location}
                </span>
              </div>
              <h2 className="font-serif font-bold text-3xl sm:text-4xl text-white leading-tight">{destination.name}</h2>
            </div>
          </div>

          {/* Tabs */}
          {hasAttractions && (
            <div className="flex border-b border-gray-200 dark:border-white/10 bg-white dark:bg-midnight px-6 shrink-0">
              <button
                onClick={() => setActiveTab("overview")}
                className={`py-3.5 px-4 text-sm font-sans font-semibold border-b-2 transition-colors ${activeTab === "overview" ? "border-champagne text-champagne" : "border-transparent text-gray-500 dark:text-gray-400 hover:text-champagne"}`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("attractions")}
                className={`py-3.5 px-4 text-sm font-sans font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${activeTab === "attractions" ? "border-champagne text-champagne" : "border-transparent text-gray-500 dark:text-gray-400 hover:text-champagne"}`}
              >
                Attractions
                <span className="bg-champagne/15 text-champagne text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {destination.attractions!.length}
                </span>
              </button>
              {destination.gallery && destination.gallery.length > 0 && (
                <button
                  onClick={() => setActiveTab("gallery")}
                  className={`py-3.5 px-4 text-sm font-sans font-semibold border-b-2 transition-colors ${activeTab === "gallery" ? "border-champagne text-champagne" : "border-transparent text-gray-500 dark:text-gray-400 hover:text-champagne"}`}
                >
                  Gallery
                </button>
              )}
            </div>
          )}

          {/* Scrollable Content */}
          <div className="overflow-y-auto flex-1" style={{ scrollbarWidth: "none" }}>
            {/* OVERVIEW TAB */}
            {activeTab === "overview" && (
              <div className="p-6 sm:p-8 flex flex-col lg:flex-row gap-8">
                {/* Left Column */}
                <div className="flex-1 space-y-7">
                  <div>
                    <h3 className="font-serif font-bold text-2xl text-midnight dark:text-white mb-3">About {destination.name}</h3>
                    <p className="text-sm text-warmgray dark:text-gray-400 font-sans leading-relaxed">{destination.longDesc}</p>
                  </div>

                  <div>
                    <h4 className="flex items-center gap-2 font-serif font-semibold text-lg text-midnight dark:text-white mb-4">
                      <Info className="w-5 h-5 text-champagne" /> Quick Facts
                    </h4>
                    <ul className="space-y-2.5">
                      {destination.facts.map((fact, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300 font-sans">
                          <span className="w-1.5 h-1.5 rounded-full bg-champagne shrink-0 mt-2" />
                          {fact}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="flex items-center gap-2 font-serif font-semibold text-lg text-midnight dark:text-white mb-3">
                      <Anchor className="w-5 h-5 text-champagne" /> Things to Do
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {destination.thingsToDo.map((thing, i) => (
                        <span key={i} className="bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 text-xs px-3 py-1.5 rounded-lg font-sans">
                          {thing}
                        </span>
                      ))}
                    </div>
                  </div>

                  {destination.travelTips.length > 0 && (
                    <div>
                      <h4 className="flex items-center gap-2 font-serif font-semibold text-lg text-midnight dark:text-white mb-3">
                        <ChevronRight className="w-5 h-5 text-champagne" /> Travel Tips
                      </h4>
                      <ul className="space-y-2">
                        {destination.travelTips.map((tip, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300 font-sans">
                            <span className="text-champagne mt-0.5">💡</span> {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Right Column Sidebar */}
                <div className="w-full lg:w-64 shrink-0 space-y-5">
                  <div className="bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl p-5">
                    <h4 className="font-serif font-semibold text-midnight dark:text-white mb-4 border-b border-gray-200 dark:border-white/10 pb-2 text-sm">Travel Info</h4>
                    <div className="space-y-4">
                      <div>
                        <div className="text-[10px] text-warmgray uppercase tracking-wider mb-1 flex items-center gap-1"><Navigation className="w-3 h-3" /> From Ahlan</div>
                        <div className="text-sm font-semibold text-midnight dark:text-white font-sans">{destination.distance}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-warmgray uppercase tracking-wider mb-1 flex items-center gap-1"><Sun className="w-3 h-3" /> Best Time</div>
                        <div className="text-sm font-semibold text-midnight dark:text-white font-sans">{destination.bestTime}</div>
                      </div>
                    </div>
                    <a href={destination.mapLink} target="_blank" rel="noopener noreferrer" className="mt-5 w-full btn-secondary text-xs py-2.5 flex items-center justify-center gap-2">
                      <MapIcon className="w-4 h-4" /> Open in Maps
                    </a>
                  </div>

                  <div className="bg-gradient-to-br from-[#0D3D52] to-[#0A2A38] rounded-2xl p-5 border border-ocean-light/20 relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 w-20 h-20 bg-champagne/10 rounded-full blur-2xl" />
                    <h4 className="font-serif font-bold text-white text-base mb-2">Plan This Trip</h4>
                    <p className="text-xs text-ocean-light mb-4 font-sans leading-relaxed">Let Ahlan arrange your seamless visit to {destination.name}.</p>
                    <button
                      onClick={() => openBooking("general")}
                      className="w-full bg-champagne hover:bg-white text-midnight font-bold text-xs py-2.5 px-4 rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-lg"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> Inquire on WhatsApp
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ATTRACTIONS TAB */}
            {activeTab === "attractions" && hasAttractions && (
              <div className="p-6 sm:p-8">
                <p className="text-sm text-warmgray dark:text-gray-400 font-sans mb-6">Top tourist attractions to visit in {destination.name}. Click any attraction for directions.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {destination.attractions!.map((attr, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl overflow-hidden group hover:border-champagne/30 transition-colors"
                    >
                      <div className="relative h-44 overflow-hidden">
                        <Image
                          src={attr.image}
                          alt={attr.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <h5 className="absolute bottom-3 left-3 font-serif font-bold text-white text-base">{attr.name}</h5>
                      </div>
                      <div className="p-4">
                        <p className="text-xs text-gray-600 dark:text-gray-400 font-sans leading-relaxed mb-3">{attr.description}</p>
                        <div className="grid grid-cols-2 gap-2 mb-3">
                          <div className="bg-white dark:bg-white/5 rounded-lg p-2">
                            <div className="text-[9px] uppercase tracking-wider text-warmgray mb-0.5 flex items-center gap-1"><Navigation className="w-2.5 h-2.5" /> Distance</div>
                            <div className="text-[11px] font-semibold text-midnight dark:text-white font-sans">{attr.distance}</div>
                          </div>
                          <div className="bg-white dark:bg-white/5 rounded-lg p-2">
                            <div className="text-[9px] uppercase tracking-wider text-warmgray mb-0.5 flex items-center gap-1"><Sun className="w-2.5 h-2.5" /> Best Time</div>
                            <div className="text-[11px] font-semibold text-midnight dark:text-white font-sans">{attr.bestTime}</div>
                          </div>
                        </div>
                        <div className="text-[11px] text-warmgray font-sans mb-3 flex items-center gap-1"><Clock className="w-3 h-3 text-champagne" /> {attr.timings}</div>
                        <a
                          href={attr.mapLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full btn-secondary text-[11px] py-2 flex items-center justify-center gap-1.5"
                        >
                          <MapPin className="w-3.5 h-3.5" /> Get Directions
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* GALLERY TAB */}
            {activeTab === "gallery" && destination.gallery && (
              <div className="p-6 sm:p-8">
                <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
                  {destination.gallery.map((img, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="relative rounded-2xl overflow-hidden break-inside-avoid shadow-lg group"
                    >
                      <Image 
                        src={img} 
                        alt={`${destination.name} gallery ${i}`} 
                        width={400} 
                        height={600} 
                        className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500" 
                        loading="lazy"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
