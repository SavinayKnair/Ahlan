"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Sparkles, MapPin, Navigation } from "lucide-react";
import Image from "next/image";
import ExploreModal, { Destination } from "../ExploreModal";

const destinations: Destination[] = [
  {
    id: "port-blair",
    name: "Port Blair",
    shortDesc: "The historic capital city & your gateway to the Andaman Islands.",
    longDesc: "Port Blair is the vibrant capital city of the Andaman and Nicobar Islands. It serves as the entry point for visiting the islands and is rich in history, notably featuring the Cellular Jail. It offers a unique mix of historical tours, water sports, local culture, and seafood delicacies.",
    image: "/images/dest_port_blair.png",
    gallery: ["/images/dest_port_blair.png", "/images/attr_cellular_jail.png", "/images/attr_samudrika.png", "/images/dest_corbyns.png", "/images/dest_ross.png"],
    location: "South Andaman",
    distance: "0 km (Ahlan is here!)",
    bestTime: "October to May",
    facts: [
      "Home to the infamous Cellular Jail (Kala Pani) – a National Memorial",
      "Only commercial airport in Andaman – Veer Savarkar International Airport",
      "Features several world-class museums including Samudrika Marine Museum",
      "Population: ~100,000 | Area: 25 sq km"
    ],
    thingsToDo: ["Cellular Jail Sound & Light Show", "Corbyn's Cove Beach", "Chidiya Tapu Sunset", "Ross Island Tour", "North Bay Water Sports", "Museum Hopping"],
    travelTips: [
      "Book Cellular Jail Sound & Light Show tickets 1 day in advance",
      "Rent a two-wheeler for easy local sightseeing",
      "Best local food: Annapurna Cafeteria for vegetarian, Lighthouse for seafood"
    ],
    mapLink: "https://maps.google.com/?q=Port+Blair",
    attractions: [
      {
        name: "Cellular Jail (Kala Pani)",
        image: "/images/attr_cellular_jail.png",
        description: "India's most iconic national memorial. A colonial-era prison used by the British to exile political prisoners. The evening Sound & Light show is deeply moving.",
        distance: "2 km from Ahlan",
        timings: "9 AM–12 PM & 1 PM–5 PM | Show: 6 PM & 7:15 PM",
        bestTime: "Morning visit or evening show",
        mapLink: "https://maps.google.com/?q=Cellular+Jail+Port+Blair"
      },
      {
        name: "Samudrika Marine Museum",
        image: "/images/attr_samudrika.png",
        description: "A must-visit marine museum run by the Indian Navy. Showcases Andaman's rich marine ecosystem, tribal culture, and island history with live aquariums.",
        distance: "3 km from Ahlan",
        timings: "9 AM–12 PM & 2 PM–5 PM | Closed Mondays",
        bestTime: "Morning (9-11 AM)",
        mapLink: "https://maps.google.com/?q=Samudrika+Marine+Museum+Port+Blair"
      },
      {
        name: "Corbyn's Cove Beach",
        image: "/images/dest_corbyns.png",
        description: "Port Blair's closest beach, fringed with coconut palms. Great for jet skiing, speed boat rides, and a peaceful evening walk along the coast.",
        distance: "7 km from Ahlan",
        timings: "Open 24 hours",
        bestTime: "Early morning or late afternoon",
        mapLink: "https://maps.google.com/?q=Corbyns+Cove+Beach"
      },
      {
        name: "North Bay Island",
        image: "/images/dest_northbay.png",
        description: "Famous for scuba diving, sea walking, and the iconic lighthouse featured on the old ₹20 note. A hub for water sports right near Port Blair.",
        distance: "30 mins by boat",
        timings: "Day trip: 9 AM–4 PM",
        bestTime: "Oct – May (morning)",
        mapLink: "https://maps.google.com/?q=North+Bay+Island+Andaman"
      },
      {
        name: "Chidiya Tapu (Bird Island)",
        image: "/images/dest_chidiya.png",
        description: "Best sunset viewpoint in South Andaman. Lush mangrove forest, peaceful beach, and driftwood – perfect for photography and quiet reflection.",
        distance: "25 km from Ahlan",
        timings: "Open all day | Best: 4–6 PM",
        bestTime: "Sunset (5–6 PM)",
        mapLink: "https://maps.google.com/?q=Chidiya+Tapu"
      },
      {
        name: "Ross Island (NSCB Island)",
        image: "/images/dest_ross.png",
        description: "Former British administrative headquarters where nature has reclaimed colonial ruins. Friendly deer roam freely among overgrown churches and ballrooms.",
        distance: "15 mins by boat from Phoenix Bay Jetty",
        timings: "9 AM–5 PM",
        bestTime: "Morning (9–11 AM)",
        mapLink: "https://maps.google.com/?q=Ross+Island+Andaman"
      },
    ]
  },
  {
    id: "havelock",
    name: "Havelock Island (Swaraj Dweep)",
    shortDesc: "Famous for pristine white sand beaches and crystal clear waters.",
    longDesc: "Swaraj Dweep, formerly Havelock Island, is the crown jewel of Andaman tourism. Known worldwide for Radhanagar Beach voted Asia's Best, it offers unparalleled scuba diving, snorkeling, and lush tropical forests.",
    image: "/images/dest_havelock.png",
    gallery: ["/images/dest_havelock.png", "/images/attr_radhanagar.png", "/images/dest_elephant.png", "/images/attr_kalapathar.png"],
    location: "Ritchie's Archipelago",
    distance: "2.5 Hours by Ferry from Port Blair",
    bestTime: "October to Mid-May",
    facts: [
      "Radhanagar Beach voted 'Asia's Best Beach' by TIME Magazine",
      "India's premier scuba diving destination with 30+ dive sites",
      "Population: ~7,000 | Officially renamed Swaraj Dweep in 2018",
    ],
    thingsToDo: ["Scuba Diving", "Radhanagar Beach Sunset", "Elephant Beach Water Sports", "Kalapathar Sunrise", "Kayaking", "Snorkeling"],
    travelTips: [
      "Stay minimum 2 nights to truly experience Havelock",
      "Book Makruzz or Nautika ferry in advance (fills up fast)",
      "Rent a scooter on the island for easy access to beaches"
    ],
    mapLink: "https://maps.google.com/?q=Havelock+Island",
    attractions: [
      {
        name: "Radhanagar Beach (Beach No. 7)",
        image: "/images/attr_radhanagar.png",
        description: "Asia's best beach with fine white sand, turquoise water, and stunning sunset skies. Calm waves ideal for swimming. The most iconic beach in India.",
        distance: "12 km from Havelock Jetty",
        timings: "6 AM–6 PM",
        bestTime: "Sunset (5–6 PM)",
        mapLink: "https://maps.google.com/?q=Radhanagar+Beach+Havelock"
      },
      {
        name: "Elephant Beach",
        image: "/images/dest_elephant.png",
        description: "Water sports paradise with vibrant shallow coral reefs. Perfect for snorkeling, sea walking, glass bottom boats, and jet skiing.",
        distance: "20 mins by boat from Havelock Jetty",
        timings: "8 AM–4 PM",
        bestTime: "Early morning (8–10 AM)",
        mapLink: "https://maps.google.com/?q=Elephant+Beach+Havelock"
      },
      {
        name: "Kalapathar Beach",
        image: "/images/attr_kalapathar.png",
        description: "Dramatic black volcanic rocks meeting the turquoise sea. Famous for sunrise photography and peaceful seclusion. Lined with palm trees and jungle.",
        distance: "11 km from Havelock Jetty",
        timings: "Open 24 hours | Best: Sunrise 5:30–7 AM",
        bestTime: "Sunrise",
        mapLink: "https://maps.google.com/?q=Kalapathar+Beach+Havelock"
      },
    ]
  },
  {
    id: "neil",
    name: "Neil Island (Shaheed Dweep)",
    shortDesc: "The vegetable bowl of Andaman with laid-back vibes.",
    longDesc: "Shaheed Dweep, formerly Neil Island, offers a quieter, more rustic alternative to Havelock. Known for its agricultural lands, deserted beaches, and the spectacular Natural Rock Formation (Howrah Bridge).",
    image: "/images/dest_neil.png",
    gallery: ["/images/dest_neil.png", "/images/attr_neil_bridge.png", "/images/attr_bharatpur.png"],
    location: "Ritchie's Archipelago",
    distance: "1.5 Hours by Ferry from Port Blair",
    bestTime: "October to May",
    facts: [
      "Known as the 'vegetable bowl of Andaman' – supplies fresh produce to Port Blair",
      "Beaches named after Ramayana characters (Ramnagar, Laxmanpur, Bharatpur, Sitapur)",
      "Flatter terrain makes it perfect for cycling exploration"
    ],
    thingsToDo: ["Natural Rock Bridge", "Laxmanpur Sunset", "Bharatpur Beach Snorkeling", "Cycling", "Glass Bottom Boat"],
    travelTips: [
      "Rent a bicycle to explore (flat roads, very safe)",
      "Visit Laxmanpur Beach 1 for the best sunset in Neil Island",
      "Day trip from Havelock possible, or stay 1–2 nights"
    ],
    mapLink: "https://maps.google.com/?q=Neil+Island",
    attractions: [
      {
        name: "Natural Rock Bridge",
        image: "/images/attr_neil_bridge.png",
        description: "An iconic natural limestone arch formation over the sea. Best visited at sunset when the light creates magical photographs. Located at Laxmanpur Beach 2.",
        distance: "4 km from Neil Jetty",
        timings: "Low tide timing (check daily tide schedule)",
        bestTime: "Sunset (5–6 PM)",
        mapLink: "https://maps.google.com/?q=Natural+Rock+Bridge+Neil+Island"
      },
      {
        name: "Bharatpur Beach",
        image: "/images/attr_bharatpur.png",
        description: "Calm, shallow turquoise water with vibrant coral reefs visible from the surface. Perfect for snorkeling, glass bottom boats, and family swimming.",
        distance: "1 km from Neil Jetty",
        timings: "8 AM–5 PM",
        bestTime: "Morning (8–11 AM)",
        mapLink: "https://maps.google.com/?q=Bharatpur+Beach+Neil+Island"
      },
    ]
  },
  {
    id: "ross",
    name: "Ross Island (NSCB Island)",
    shortDesc: "Historic ruins of the former British administrative headquarters.",
    longDesc: "Netaji Subhash Chandra Bose Island, formerly Ross Island, is a captivating historical site where nature has reclaimed British colonial ruins. Giant banyan trees intertwine with old churches, bakeries, and ballrooms.",
    image: "/images/dest_ross.png",
    gallery: ["/images/dest_ross.png", "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=800"],
    location: "Near Port Blair",
    distance: "15 mins by Boat from Phoenix Bay Jetty",
    bestTime: "All Year (Morning preferred)",
    facts: [
      "Former administrative headquarters of British colonial Andaman",
      "Named after marine surveyor Daniel Ross in 1800s",
      "Home to friendly spotted deer and peacocks that roam freely"
    ],
    thingsToDo: ["Heritage Walk among ruins", "Light & Sound Show (evening)", "Wildlife Spotting (deer, peacocks)", "Photography"],
    travelTips: [
      "Wear comfortable walking shoes – uneven terrain",
      "Combine with North Bay Island for a full day trip",
      "Carry water – no shops inside"
    ],
    mapLink: "https://maps.google.com/?q=Ross+Island+Andaman",
    attractions: [
      {
        name: "Church Ruins",
        image: "/images/attr_ross_church.png",
        description: "The hauntingly beautiful colonial church ruins completely consumed by giant banyan trees. One of the most photographed spots in all of Andaman. A surreal blend of history and nature.",
        distance: "10-min walk from jetty",
        timings: "9 AM–5 PM",
        bestTime: "Morning for soft light photography",
        mapLink: "https://maps.google.com/?q=Ross+Island+Church+Ruins"
      },
    ]
  },
  {
    id: "chidiya-tapu",
    name: "Chidiya Tapu",
    shortDesc: "Bird island famous for the most spectacular sunsets in Port Blair.",
    longDesc: "Chidiya Tapu (Bird Island) is renowned for its lush green mangroves, forest cover, and a stunning coastline. It is the most popular sunset viewpoint in South Andaman, featuring driftwood scattered along the beach.",
    image: "/images/dest_chidiya.png",
    gallery: ["/images/dest_chidiya.png", "https://images.unsplash.com/photo-1528650392949-a681944510b6?auto=format&fit=crop&q=80&w=800"],
    location: "South Andaman",
    distance: "25 km from Ahlan Homestays",
    bestTime: "All Year (4 PM – 6 PM for sunset)",
    facts: [
      "Name translates to 'Bird Island' – rich birdwatching destination",
      "Munda Pahad trekking trail starts from here",
      "Known for the most dramatic and colourful sunsets in all of Andaman"
    ],
    thingsToDo: ["Sunset Viewing", "Munda Pahad Trek", "Bird Watching", "Photography", "Beach Walk"],
    travelTips: [
      "Arrive by 4:00 PM to secure a good sunset spot",
      "Water is not safe for swimming – crocodiles present",
      "Carry insect repellent for the forest trail"
    ],
    mapLink: "https://maps.google.com/?q=Chidiya+Tapu"
  },
  {
    id: "radhanagar",
    name: "Radhanagar Beach",
    shortDesc: "Crowned Asia's best beach, a pristine stretch of white sand.",
    longDesc: "Located on Havelock Island, Radhanagar Beach (Beach No. 7) is globally famous for its fine white sand, turquoise water, and lush forest border. The sunsets here are mesmerizing and the water is perfect for swimming.",
    image: "/images/dest_radhanagar.png",
    gallery: ["/images/dest_radhanagar.png", "https://images.unsplash.com/photo-1620216666838-8e68cf90da90?auto=format&fit=crop&q=80&w=800"],
    location: "Havelock Island",
    distance: "Ferry + 12km Drive from Havelock Jetty",
    bestTime: "October to May",
    facts: [
      "Awarded 'Asia's Best Beach' by TIME Magazine in 2004",
      "Also known as Beach No. 7",
      "Has eco-friendly changing facilities and beach guards"
    ],
    thingsToDo: ["Swimming", "Sunset Viewing", "Beach Walks", "Relaxing"],
    travelTips: [
      "Stay until sunset — absolutely magical",
      "Lockers available for valuables",
      "No swimming after 5 PM – no lifeguards"
    ],
    mapLink: "https://maps.google.com/?q=Radhanagar+Beach"
  },
  {
    id: "elephant",
    name: "Elephant Beach",
    shortDesc: "The water sports hub of Havelock Island with vibrant reefs.",
    longDesc: "Elephant Beach is the prime destination for water activities in Havelock. Accessible by boat or a short jungle trek, it boasts incredibly clear waters and shallow coral reefs perfect for snorkeling and sea walking.",
    image: "/images/dest_elephant.png",
    gallery: ["/images/dest_elephant.png", "https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&q=80&w=800"],
    location: "Havelock Island",
    distance: "20 mins by Boat from Havelock Dock",
    bestTime: "October to May (Morning)",
    facts: [
      "Famous for vibrant shallow coral reefs visible from surface",
      "Can be reached via a 2km jungle trek or 20-min boat ride",
      "Trees uprooted by the 2004 tsunami still line the beach"
    ],
    thingsToDo: ["Sea Walking", "Snorkeling", "Glass Bottom Boat", "Jet Skiing"],
    travelTips: [
      "Go early morning to avoid crowds and get best visibility",
      "Carry a change of dry clothes",
      "Book water activities online in advance"
    ],
    mapLink: "https://maps.google.com/?q=Elephant+Beach+Havelock"
  },
  {
    id: "northbay",
    name: "North Bay Island",
    shortDesc: "The island featured on the back of the old ₹20 note.",
    longDesc: "North Bay Island is synonymous with the iconic lighthouse seen on the old Indian 20 Rupee note. It is a major hub for scuba diving and snorkeling right near Port Blair, teeming with marine life.",
    image: "/images/dest_northbay.png",
    gallery: ["/images/dest_northbay.png", "https://images.unsplash.com/photo-1582967788606-a171c1080cb0?auto=format&fit=crop&q=80&w=800"],
    location: "Near Port Blair",
    distance: "30 mins by Boat from Aberdeen Jetty",
    bestTime: "October to May",
    facts: [
      "Lighthouse featured on the old ₹20 Indian currency note",
      "One of the best spots for water sports near Port Blair",
      "Offers semi-submarine rides for non-swimmers"
    ],
    thingsToDo: ["Scuba Diving", "Sea Walking", "Semi-Submarine Ride", "Snorkeling"],
    travelTips: [
      "Usually combined with Ross Island for a full day trip",
      "Pre-book water activities to avoid waiting",
      "Best visibility: November to March"
    ],
    mapLink: "https://maps.google.com/?q=North+Bay+Island"
  },
  {
    id: "baratang",
    name: "Baratang Island",
    shortDesc: "Adventure destination with limestone caves and mud volcanoes.",
    longDesc: "Baratang offers a wildly different Andaman experience. The journey involves driving through the Jarawa tribal reserve, followed by a fascinating boat ride through dense mangrove tunnels to reach ancient limestone caves.",
    image: "/images/dest_baratang.png",
    gallery: ["/images/dest_baratang.png", "https://images.unsplash.com/photo-1601614660946-b60098dfec5a?auto=format&fit=crop&q=80&w=800"],
    location: "Middle Andaman",
    distance: "100 km from Ahlan (3–4 Hours including convoy)",
    bestTime: "October to March (avoid monsoon)",
    facts: [
      "Home to India's only known mud volcanoes",
      "Journey passes through the protected Jarawa Tribal Reserve",
      "Access requires travelling in a regulated government convoy"
    ],
    thingsToDo: ["Limestone Caves", "Mud Volcano", "Mangrove Boat Ride", "Parrot Island (Evening)"],
    travelTips: [
      "Start very early (3 AM) to catch the first convoy at 6 AM",
      "Photography of Jarawa tribes is strictly prohibited by law",
      "Carry packed breakfast and sufficient water"
    ],
    mapLink: "https://maps.google.com/?q=Baratang"
  },
  {
    id: "corbyns",
    name: "Corbyn's Cove",
    shortDesc: "Port Blair's closest beach, fringed with picturesque palm trees.",
    longDesc: "Just a short drive from the city center, Corbyn's Cove is a serene, crescent-shaped beach lined with coconut palms. The coastal drive to the beach is stunning and offers great views of the ocean.",
    image: "/images/dest_corbyns.png",
    gallery: ["/images/dest_corbyns.png", "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800"],
    location: "Port Blair",
    distance: "7 km from Ahlan Homestays",
    bestTime: "All Year Round",
    facts: [
      "Closest beach to Port Blair city center",
      "Coastal road leading to it has historical Japanese WWII bunkers",
      "Safe for swimming with relatively calm, sheltered waters"
    ],
    thingsToDo: ["Jet Skiing", "Speed Boat Rides", "Beachside Cafes", "Evening Walk"],
    travelTips: [
      "Great for a quick morning or evening visit from Port Blair",
      "Try fresh coconut water from beach vendors",
      "Visit the Japanese bunkers along the coastal road"
    ],
    mapLink: "https://maps.google.com/?q=Corbyns+Cove"
  }
];

export default function ThingsToDo() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });
  const [selectedDest, setSelectedDest] = useState<Destination | null>(null);

  return (
    <>
      <section id="things-to-do" className="section-padding bg-pearl dark:bg-[#0D1A26]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="badge-gold mx-auto mb-6 w-fit">
              <Sparkles className="w-3.5 h-3.5" /> Island Guide
            </div>
            <h2 className="section-title text-midnight dark:text-white mb-4">
              Explore <span className="text-gradient-gold">Andaman</span> With Us
            </h2>
            <div className="divider-gold" />
            <p className="section-subtitle max-w-2xl mx-auto mt-6">
              Discover breathtaking beauty, historic landmarks, and thrilling adventures. Click any destination to explore nested attractions, travel tips, and distances from Ahlan.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {destinations.map((dest, i) => (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.04 }}
                onClick={() => setSelectedDest(dest)}
                className="relative card-luxury overflow-hidden group cursor-pointer h-[300px]"
                style={{ willChange: "transform" }}
              >
                {/* Image */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={dest.image}
                    alt={dest.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    loading={i < 4 ? "eager" : "lazy"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight/95 via-midnight/30 to-transparent" />
                </div>

                {/* Attraction count badge */}
                {dest.attractions && dest.attractions.length > 0 && (
                  <div className="absolute top-4 right-4 z-10 bg-champagne/90 text-midnight text-[9px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                    {dest.attractions.length} Attractions
                  </div>
                )}

                {/* Content */}
                <div className="relative z-10 p-5 flex flex-col h-full justify-end">
                  <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-serif font-bold text-lg text-white mb-1.5 leading-tight">{dest.name}</h3>
                    <div className="flex items-center gap-1.5 text-champagne text-[10px] font-sans font-semibold uppercase tracking-wider mb-2">
                      <MapPin className="w-3 h-3" /> {dest.location}
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-xs text-gray-300 font-sans leading-relaxed mb-3 line-clamp-2">{dest.shortDesc}</p>
                      <div className="flex items-center gap-2 text-[10px] text-white/80 bg-white/10 w-fit px-2.5 py-1 rounded-lg backdrop-blur-md border border-white/10">
                        <Navigation className="w-3 h-3" /> {dest.distance}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ExploreModal destination={selectedDest} onClose={() => setSelectedDest(null)} />
    </>
  );
}
