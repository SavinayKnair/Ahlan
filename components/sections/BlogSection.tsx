"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Calendar, Clock, ArrowRight, BookOpen, X, MessageCircle, Phone } from "lucide-react";
import Image from "next/image";

const posts = [
  {
    id: "best-time",
    title: "Best Time to Visit Andaman & Nicobar",
    excerpt: "Discover the ideal months for perfect weather, calm seas, and the best island experiences.",
    category: "Travel Guide",
    readTime: "8 min",
    date: "May 2026",
    image: "/images/blog-1.png",
    content: [
      {
        heading: "Introduction",
        body: "When planning a trip to the spectacular Andaman Islands, timing is everything. The tropical climate means the weather stays warm year-round, but the best time to visit is between October and May. These months offer everything a traveller dreams of — calm emerald seas, clear blue skies, and just the right breeze to make every moment magical."
      },
      {
        heading: "Seasonal Travel Guide",
        body: "October to December is the post-monsoon golden window. The islands are lush green, waterfalls are full, and tourist numbers are still manageable. January to March is peak season — schools of fish fill the reefs, visibility underwater hits 30+ metres, and every beach radiates brilliance. April to May is the last warm window before monsoon arrives; a great time for budget travellers who want warm weather without the peak-season rush.\n\nJune to September is monsoon season. Ferry services become unpredictable, and many water activities close. Avoid unless you love the moody, dramatic side of nature."
      },
      {
        heading: "Best Attractions by Season",
        body: "November–January is perfect for Radhanagar Beach (Havelock), Ross Island, and Cellular Jail Sound & Light Show. February–April is ideal for scuba diving at North Bay, Elephant Beach sea walking, and night kayaking through bioluminescent waters at Havelock. October is the absolute best for waterfall treks at Baratang and limestone cave exploration."
      },
      {
        heading: "Ferry & Transport Tips",
        body: "Always book inter-island ferry tickets at least 2–3 days in advance during peak season (Dec–Feb). Private ferries like Makruzz and Nautika are significantly faster and more comfortable than government vessels. Reach the ferry terminal at least 45 minutes before departure — boarding stops early. Ahlan Homestays arranges all ferry tickets for guests as part of our concierge service."
      },
      {
        heading: "Food & Local Dining Tips",
        body: "Andaman seafood is world-class. Don't miss the fresh lobster at Lighthouse Residency or the local fish curry at Annapurna Cafeteria. Every meal at the local dhaba-style restaurants is an authentic experience. For vegetarians, options are available at most restaurants near Aberdeen Bazaar. Our team at Ahlan Homestays can guide you to the best hidden dining spots locals love."
      },
      {
        heading: "Why Stay at Ahlan Homestays",
        body: "Timing your trip perfectly is only half the equation. Where you stay defines the experience. Ahlan Homestays is Port Blair's premier Gold Category homestay, ideally located just 7 km from the airport and minutes from the ferry terminal. Our expert team provides personalised travel itineraries, instant ferry booking assistance, and private airport transfers — so your island adventure begins the moment you land.\n\nDon't let the peak season rush ruin your plans. Book your room at Ahlan Homestays early and let us handle everything!"
      }
    ]
  },
  {
    id: "honeymoon",
    title: "Honeymoon Guide to Andaman",
    excerpt: "Candlelight dinners, sunset cruises — your complete guide to a romantic honeymoon.",
    category: "Honeymoon",
    readTime: "7 min",
    date: "Feb 2026",
    image: "https://images.unsplash.com/photo-1543158266-0066955047b1?auto=format&fit=crop&q=80&w=800",
    content: [
      {
        heading: "Introduction",
        body: "The Andaman Islands offer a slice of paradise that rivals the Maldives, making it India's premier honeymoon destination. Imagine walking hand-in-hand on white sand beaches, snorkelling in crystal-clear coral lagoons, and ending each day with a private candlelight dinner under a canopy of stars. Romance is woven into every grain of Andaman sand."
      },
      {
        heading: "Most Romantic Beaches & Spots",
        body: "Radhanagar Beach (Havelock Island) is consistently rated one of Asia's best beaches — ideal for long sunset walks. Kalapathar Beach offers dramatic black rocks against turquoise water, perfect for couples photography. Neil Island's Natural Bridge at sunrise is ethereal. Chidiya Tapu (Bird Island) at sunset is a hidden gem that most tourists miss entirely."
      },
      {
        heading: "Seasonal Guide for Honeymooners",
        body: "December to February is ideal — calm seas, perfect weather, all water sports open. March to April is also excellent and slightly less crowded. Avoid monsoon (June–September) as ferry services can be disrupted and some islands become inaccessible. For beach lovers, January offers the warmest, clearest sea conditions of the year."
      },
      {
        heading: "Romantic Experiences You Must Try",
        body: "Private sunset cruise around North Bay Island. Underwater sea walking — holding hands 5 metres below the ocean. Bioluminescent kayaking at night through Havelock's mangroves. Couple's scuba dive with certified instructors. Private beachside dinner arranged by Ahlan Homestays — our most requested experience."
      },
      {
        heading: "Ferry & Island Hopping Tips",
        body: "Plan 2 nights in Port Blair, 2 nights in Havelock, and 1 night in Neil Island for the perfect honeymoon route. Book ferry tickets well in advance during peak season. Private speed boat charters are available for a more intimate island-hopping experience. Ahlan Homestays coordinates all inter-island logistics for honeymooning couples."
      },
      {
        heading: "Why Choose Ahlan Homestays",
        body: "A perfect honeymoon requires a perfect stay. Ahlan Homestays specialises in curating deeply romantic experiences. From flower-decorated luxury rooms upon arrival to arranging private sunset cruises and exclusive beachside dinners, our team handles every detail. Skip the crowded generic resorts. Ahlan Homestays offers the privacy, premium amenities, and personalised touch that your honeymoon truly deserves."
      }
    ]
  },
  {
    id: "family",
    title: "Family Trip Guide to Andaman",
    excerpt: "How to plan a safe, fun, and memorable tropical vacation for the entire family.",
    category: "Family Trip",
    readTime: "9 min",
    date: "Apr 2026",
    image: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&q=80&w=800",
    content: [
      {
        heading: "Introduction",
        body: "Traveling with family to the Andaman Islands can seem daunting, but it's one of India's most rewarding family destinations. The beaches have gentle slopes, the locals are wonderfully welcoming, and there are activities for every age group — from glass-bottom boat rides for toddlers to scuba diving for teenagers and yoga on the beach for parents."
      },
      {
        heading: "Best Family-Friendly Attractions",
        body: "Cellular Jail and Sound & Light Show — an emotional, educational experience for children above 8. Samudrika Marine Museum — fascinating marine life exhibits great for all ages. Glass-bottom boat ride at North Bay — perfect for young children who can't snorkel. Limestone caves at Baratang — a thrilling cave and creek adventure families love. Chidiya Tapu bird watching — hundreds of tropical birds in their natural habitat."
      },
      {
        heading: "Seasonal Guide for Families",
        body: "November to March is perfect for families. School holidays in December and May see the highest footfall, so book well in advance. April and October are ideal shoulder months — good weather, lower prices, fewer crowds. Avoid monsoon months (June–September) for family travel as rough seas make ferry rides uncomfortable for children."
      },
      {
        heading: "Food Tips for Families",
        body: "Andaman has excellent food options for families. Most restaurants cater to mixed dietary needs. Pure vegetarian options are widely available at Annapurna Cafeteria and New Lighthouse Restaurant. Seafood lovers should try the fresh catch at local restaurants near Aberdeen Bazaar. Street food at the night market is fun for teenagers. Ahlan Homestays can arrange home-style meals on request."
      },
      {
        heading: "Ferry Tips for Families with Children",
        body: "Always book enclosed, air-conditioned cabins on private ferries (Makruzz or Nautika) for young children. Open deck travel in choppy seas is inadvisable with toddlers. Carry motion sickness medication. Pack snacks and entertainment for the 1.5–2.5 hour ferry rides. Ahlan Homestays books all ferry tickets and ensures family-friendly cabin allocation."
      },
      {
        heading: "Why Families Choose Ahlan Homestays",
        body: "Safety, comfort, and space are every family's top priorities. Our spacious Deluxe Rooms and interconnecting family suites provide the room you need. At Ahlan Homestays, our dedicated travel desk arranges private, sanitised vehicles, curates family-friendly day itineraries, and ensures children are never bored. We also keep children's amenities available on request. Families with children consistently rate us as Port Blair's most family-friendly homestay."
      }
    ]
  },
  {
    id: "luxury",
    title: "Luxury Stay Guide in Andaman",
    excerpt: "Discover what sets a premium Gold Category homestay apart from standard hotels.",
    category: "Luxury Guide",
    readTime: "6 min",
    date: "Mar 2026",
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80&w=800",
    content: [
      {
        heading: "Introduction",
        body: "Luxury in the Andaman Islands has evolved dramatically. It is no longer just about massive hotel chains. Today's discerning traveller seeks exclusivity, highly personalised service, and authentic local experiences wrapped in premium comfort — all of which Ahlan Homestays delivers in abundance."
      },
      {
        heading: "What Makes a Gold Category Homestay",
        body: "India's Ministry of Tourism awards the coveted Gold Category rating to homestays that meet the highest standards of room quality, service, hygiene, amenities, and guest experience. Ahlan Homestays holds this prestigious certification — Port Blair's only Gold Category premium homestay — meaning every stay is independently verified to meet luxury standards."
      },
      {
        heading: "Luxury Amenities at Ahlan Homestays",
        body: "Plush high-thread-count linens and premium mattresses. State-of-the-art en-suite bathrooms with premium toiletries. 100 Mbps high-speed WiFi throughout. 24/7 power backup — zero power cuts. Dedicated concierge available round the clock. Daily housekeeping and turndown service. Complimentary airport pickup and drop. Daily gourmet breakfast included."
      },
      {
        heading: "Premium Experiences We Arrange",
        body: "Private sunset yacht charters. Exclusive beachside candlelight dinners. Custom photography sessions at iconic locations. Private snorkelling and scuba diving sessions with certified instructors. Luxury spa treatments arranged on request. Helicopter island tours (seasonal). VIP cellular jail sound and light show priority seating."
      },
      {
        heading: "Seasonal Luxury Travel Guide",
        body: "January to March offers the best luxury experience — all premium activities are open, weather is ideal, and the islands are at their most vibrant. December is peak luxury travel month; book rooms 2–3 months in advance. November and April are excellent value months with near-identical conditions at lower rates. For the ultimate luxury Andaman experience, we recommend a 5-night stay combining Port Blair, Havelock, and Neil Island."
      },
      {
        heading: "Why Ahlan Homestays Redefines Island Luxury",
        body: "Why settle for a tiny hotel room in an impersonal chain when you can experience the expansive, elegantly designed suites at Ahlan Homestays? Our obsessive attention to detail sets us apart — from the moment your personalised welcome gift arrives in your room to the private transfer that takes you back to the airport. Ahlan Homestays is not just accommodation. It is the centrepiece of your entire Andaman experience."
      }
    ]
  },
  {
    id: "reach",
    title: "How to Reach Andaman",
    excerpt: "Everything you need to know about flights, ships, and required travel permits.",
    category: "Travel Info",
    readTime: "6 min",
    date: "Jan 2026",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=800",
    content: [
      {
        heading: "Introduction",
        body: "Reaching the Andaman Islands is easier than ever before. The primary gateway is the Veer Savarkar International Airport (IXZ) in Port Blair, which receives direct daily flights from major Indian cities including Delhi, Mumbai, Chennai, Kolkata, and Bangalore. Flight duration is approximately 2 hours from Chennai and 2.5 hours from Kolkata."
      },
      {
        heading: "By Air — The Recommended Route",
        body: "Flying is strongly recommended to maximise your vacation time. Airlines operating regular flights include IndiGo, Air India, GoFirst, and SpiceJet. Book at least 4–6 weeks in advance during peak season (December–January) to secure the best fares. Early morning flights from Chennai (6–7 AM) arrive in time for a full day of sightseeing. No passport or visa is required for Indian citizens."
      },
      {
        heading: "By Ship — The Slow Route",
        body: "Passenger ships from Kolkata, Chennai, and Visakhapatnam sail to Port Blair. The journey takes 56–70 hours (3–4 days). While a unique experience, it is not recommended for those with limited vacation time. Ship services run 2–3 times per month per port. Advance booking through the Shipping Corporation of India website is essential."
      },
      {
        heading: "Permits & Documents",
        body: "Indian citizens do NOT need any special permit to visit Port Blair and most Andaman Islands. Foreign nationals require a Restricted Area Permit (RAP) issued free of charge on arrival at the airport. Entry to some specific islands (Nicobar, Little Andaman interior zones) requires additional permits. Carry a government-issued photo ID at all times. Ahlan Homestays handles all permit guidance for international guests."
      },
      {
        heading: "Getting Around After Arrival",
        body: "From the airport, taxis and auto-rickshaws are readily available. The airport is located at Veer Savarkar Marg, approximately 7 km from Aberdeen Bazaar. Renting a two-wheeler is popular for independent exploration within Port Blair. For inter-island travel, ferries are the primary mode of transport. Ahlan Homestays provides complimentary airport transfers for all guests — just share your flight details when booking."
      },
      {
        heading: "Your Arrival at Ahlan Homestays",
        body: "The moment you land, your true vacation should begin immediately. When you book with Ahlan Homestays, our premium airport transfer team will be waiting at the arrivals gate with a personalised welcome sign. We take the stress out of navigating a new destination entirely. From the airport straight to the luxurious comfort of your room, your Andaman adventure starts the right way — relaxed, welcomed, and excited."
      }
    ]
  }
];

export default function BlogSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [activePost, setActivePost] = useState<typeof posts[0] | null>(null);

  const closePost = useCallback(() => setActivePost(null), []);

  // ESC key + body scroll lock
  useEffect(() => {
    if (!activePost) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closePost(); };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [activePost, closePost]);

  return (
    <section id="blog" className="section-padding bg-pearl dark:bg-midnight relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="badge-gold mx-auto mb-6 w-fit">
            <BookOpen className="w-3.5 h-3.5" /> Travel Insights
          </div>
          <h2 className="section-title text-midnight dark:text-white mb-4">
            Andaman Travel <span className="text-gradient-gold">Guides</span>
          </h2>
          <div className="divider-gold" />
          <p className="section-subtitle max-w-2xl mx-auto mt-6">
            Expert tips, curated travel guides, and insider knowledge to help you plan the perfect tropical getaway.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onClick={() => setActivePost(post)}
              className="card-luxury overflow-hidden group flex flex-col h-full cursor-pointer"
            >
              <div className="relative h-56 w-full overflow-hidden">
                <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 33vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute top-4 left-4 text-[10px] font-bold text-midnight bg-champagne backdrop-blur-md px-3 py-1.5 rounded-full font-sans uppercase tracking-wider shadow-lg">
                  {post.category}
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col bg-white dark:bg-white/5">
                <div className="flex items-center gap-4 text-xs text-warmgray dark:text-gray-400 font-sans mb-3">
                  <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {post.readTime} read</span>
                </div>
                <h3 className="font-serif font-bold text-xl text-midnight dark:text-white mb-3 group-hover:text-champagne transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-sm text-warmgray dark:text-gray-400 font-sans leading-relaxed mb-6 flex-1">
                  {post.excerpt}
                </p>
                <div className="mt-auto flex items-center gap-2 text-champagne text-sm font-bold font-sans group-hover:gap-4 transition-all duration-300">
                  Read Article <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Premium Article Modal */}
      <AnimatePresence>
        {activePost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[500] flex items-center justify-center p-4 md:p-8"
            style={{ backdropFilter: "blur(12px)", backgroundColor: "rgba(10,10,20,0.75)" }}
            onClick={closePost}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, type: "spring", damping: 28, stiffness: 300 }}
              onClick={e => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-white dark:bg-[#131323] rounded-3xl shadow-2xl border border-gray-200 dark:border-white/10 flex flex-col overflow-hidden"
              style={{ maxHeight: "90vh" }}
            >
              {/* Close Button */}
              <button
                onClick={closePost}
                className="absolute top-4 right-4 z-20 w-9 h-9 flex items-center justify-center bg-black/40 hover:bg-champagne text-white rounded-full transition-all duration-200 shadow-lg backdrop-blur-md"
                aria-label="Close article"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Hero Image */}
              <div className="relative h-52 md:h-64 w-full flex-shrink-0">
                <Image src={activePost.image} alt={activePost.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/40 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <span className="text-[10px] font-bold text-midnight bg-champagne px-3 py-1.5 rounded-full font-sans uppercase tracking-wider mb-3 inline-block">
                    {activePost.category}
                  </span>
                  <h2 className="font-serif text-2xl md:text-3xl font-bold text-white leading-tight drop-shadow-md">
                    {activePost.title}
                  </h2>
                </div>
              </div>

              {/* Scrollable Content Area */}
              <div className="overflow-y-auto flex-1 px-6 md:px-8 py-6" style={{ overscrollBehavior: "contain" }}>
                {/* Meta */}
                <div className="flex items-center gap-6 text-xs text-warmgray font-sans mb-6 pb-4 border-b border-gray-100 dark:border-white/10">
                  <span className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5 text-champagne" /> {activePost.date}</span>
                  <span className="flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-champagne" /> {activePost.readTime} read</span>
                </div>

                {/* Article Sections */}
                <div className="space-y-6 font-sans text-midnight dark:text-gray-200">
                  {activePost.content.map((section, idx) => (
                    <div key={idx}>
                      <h3 className="font-serif font-bold text-lg text-midnight dark:text-white mb-2 flex items-center gap-2">
                        <span className="w-1.5 h-5 rounded-full bg-champagne inline-block flex-shrink-0" />
                        {section.heading}
                      </h3>
                      <p className="text-sm leading-relaxed text-warmgray dark:text-gray-300 whitespace-pre-line">
                        {section.body}
                      </p>
                    </div>
                  ))}
                </div>

                {/* CTA Section */}
                <div className="mt-8 bg-gradient-to-br from-midnight to-[#1a1a2e] rounded-2xl p-6 text-center border border-champagne/20 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-champagne/10 rounded-full blur-3xl" />
                  <h3 className="font-serif text-xl font-bold mb-2 text-white relative z-10">Experience the Best of Andaman</h3>
                  <p className="text-gray-300 font-sans text-xs mb-5 max-w-sm mx-auto relative z-10">
                    Stop searching and start relaxing. Book your stay at Ahlan Homestays — Port Blair&apos;s most premium Gold Category homestay.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center relative z-10">
                    <a
                      href={`https://wa.me/919434281386?text=Hi! I read the "${activePost.title}" guide and want to book my stay at Ahlan Homestays!`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary inline-flex items-center justify-center gap-2 text-sm py-2.5 px-5"
                    >
                      <MessageCircle className="w-4 h-4" /> Book Stay via WhatsApp
                    </a>
                    <a
                      href="tel:+919434281386"
                      className="inline-flex items-center justify-center gap-2 text-sm py-2.5 px-5 rounded-xl border border-white/20 text-white hover:bg-white/10 transition-colors font-sans font-semibold"
                    >
                      <Phone className="w-4 h-4" /> Call Us Now
                    </a>
                  </div>
                </div>
                <div className="h-4" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
