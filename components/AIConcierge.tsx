"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, Minimize2, Maximize2, Sparkles, Phone, MapPin, Ambulance, MessageCircle } from "lucide-react";

type Message = { role: "user" | "bot"; text: string };

const QUICK_CATEGORIES = [
  {
    label: "🗺️ Plan Trip",
    replies: ["Honeymoon package?", "Family trip plan", "Adventure itinerary", "Budget 5 days trip"],
  },
  {
    label: "🏨 Stay",
    replies: ["Room availability?", "Best room for couple", "Check-in & check-out time", "Workation facilities"],
  },
  {
    label: "🌊 Local Info",
    replies: ["Ferry timings today?", "Weather in Andaman?", "Best restaurants nearby", "Hidden gems 🪨"],
  },
  {
    label: "🚨 Emergency",
    replies: ["Nearest hospital?", "Police number?", "Ferry cancelled – help!", "Lost my wallet"],
  },
];

function getBotReply(msg: string): string {
  const m = msg.toLowerCase();

  // Greetings
  if (m.includes("hello") || m.includes("hi") || m.includes("hey") || m.includes("namaste") || m.includes("salam"))
    return "🌴 **Namaste Explorer!** Welcome to Ahlan Homestay — your basecamp for the ultimate Andaman adventure!\n\nI'm **Island Voyager**, your advanced travel guide. I don't just plan stays; I craft legendary experiences. Whether you're looking for hidden bioluminescent lagoons, the best local seafood, or a perfect island route, I've got the map ready.\n\nWhat's on your travel bucket list today?";

  // Honeymoon
  if (m.includes("honeymoon") || m.includes("couple") || m.includes("romantic") || m.includes("anniversary"))
    return "💑 **Ah, a romantic escape!** Our **Honeymoon Bliss Package** is designed to be purely magical.\n\nImagine waking up to the sound of the ocean, followed by a day of exploring secret coves. We handle the logistics (ferries, transfers, decor) so you can focus on each other.\n\n✨ **The Voyager Touch:**\n• 4N/5D in our Deluxe Couple Retreat\n• Private beach dinner under the starlight\n• Professional couple's shoot in hidden scenic spots\n• Hand-picked ferry upgrades for peak comfort\n\n💰 Starting ₹29,999/couple. Ready to start your forever in paradise?";

  // Family
  if (m.includes("family") || m.includes("kids") || m.includes("children") || m.includes("child"))
    return "👨‍👩‍👧‍👦 **Family Expeditions!** Nothing beats an Andaman family trip when done with expert planning.\n\nOur **Family Comfort Package** ensures everyone from toddlers to grandparents has a blast. We skip the generic tourist traps and take you to the most engaging marine parks and safe snorkeling lagoons.\n\n✨ **The Scout's Choice:**\n• Spacious 350+ sqft suites for family bonding\n• Private city tours with expert local storytellers\n• Interactive Samudrika Marine Museum visits\n• Jolly Buoy boat rides (the kids love the glass-bottom view!)\n\n💰 Starting ₹18,999/person. How many explorers are in your group?";

  // Adventure
  if (m.includes("adventure") || m.includes("scuba") || m.includes("dive") || m.includes("trekking") || m.includes("thrilling"))
    return "🤿 **Adrenaline seekers, welcome!** Andaman is a playground for the brave.\n\nI recommend our **Grand Adventure Package**. We go beyond the surface—to the deeper reefs and the most secluded jungle trekking trails.\n\n🔥 **The High-Octane Lineup:**\n• Deep-sea diving at Havelock’s premium reefs\n• Sea walking at Elephant Beach\n• Night kayaking through mangroves (Bioluminescence!)\n• Trekking to the Limestone Caves of Baratang\n\n✨ 5N/6D starting ₹22,999/person. Best diving window: **Nov – Apr**. Ready to dive deep?";

  // Budget
  if (m.includes("budget") || m.includes("cheap") || m.includes("affordable") || m.includes("economical") || m.includes("low cost"))
    return "💰 **Travel Smart, See More.** You don't need a fortune to experience the archipelago.\n\nOur **Explorer's Budget Plan** focuses on high value without compromising the vibe. Local ferries, authentic food spots, and the best public beaches that are often better than private ones.\n\n✅ Stay in our Deluxe Garden Rooms (Premium feel, smart price)\n✅ Guided sunset visits to Chidiya Tapu (The local's favorite)\n✅ DIY walking tours of Port Blair's colonial history\n\n📍 Est: ₹8,000-12,000/person. Pro Tip: Visit in **March** for the absolute best weather-to-price ratio!";

  // Itinerary
  if (m.includes("itinerary") || m.includes("plan") || m.includes("schedule") || m.includes("day plan"))
    return "🗺️ **The Ultimate 5-Day Voyager Route:**\n\n📅 **Day 1:** Arrival & Sunset at Corbyn's Cove. Chill vibes only.\n📅 **Day 2:** History & Lights. Cellular Jail + Ross Island exploration.\n📅 **Day 3:** The Havelock Crossing. Radhanagar Beach is world-class for a reason.\n📅 **Day 4:** Underwater Worlds. Elephant Beach snorkeling → Neil Island.\n📅 **Day 5:** The Natural Bridge → Final seafood feast → Homeward bound.\n\n**Want this tailored to your pace?** Just tell me your dates!";

  // Ferry
  if (m.includes("ferry") || m.includes("havelock") || m.includes("neil island") || m.includes("boat"))
    return "⛴️ **The Island Pulse (Ferry Secrets):**\n\n🚢 **Havelock & Neil:** Private ferries like Makruzz and Nautika are the gold standard for speed and comfort (~1.5h).\n🚢 **Local Vibe:** Govt ferries are slower (~2.5h) but offer a great deck view and a fraction of the cost.\n\n⚠️ **Voyager Alert:** Ferry tickets sell out weeks in advance for peak season. **We arrange all tickets** as part of our packages to ensure your journey is seamless!";

  // Best time / weather
  if (m.includes("best time") || m.includes("season") || m.includes("weather") || m.includes("when to visit") || m.includes("monsoon"))
    return "🌤️ **Timing is everything in the islands.**\n\n✅ **Jan – March:** Perfect. Clear blue skies, zero rain, everything is open.\n✅ **Oct – Dec:** Post-monsoon lushness. Great for photography and slightly cooler breeze.\n✅ **April – May:** Getting hot, but the water is crystal clear—ideal for serious divers.\n\n⚠️ **Monsoon (Jun-Sep):** The 'wild' side. Rougher seas, but incredible if you love the smell of rain and total solitude.\n\n**Island Scout Tip:** Always pack a light rain jacket. The island weather likes to surprise!";

  // Hidden gems
  if (m.includes("hidden") || m.includes("gem") || m.includes("secret") || m.includes("offbeat") || m.includes("unique"))
    return "💎 **Secrets of the Archipelago:**\n\n🌿 **Munda Pahad:** A deserted cliffside beach where the primeval jungle meets the sea.\n🐬 **Cinque Island:** A crystal-clear lagoon with pristine snorkeling (Permit required, we can help!).\n✨ **Night Kayaking:** Float in Havelock's bioluminescent waters—it feels like space travel.\n🌺 **Diglipur:** The far north. Turtle nesting beaches and the highest peak in the islands.\n\nWhich of these 'off the map' spots should we add to your trip?";

  // Food
  if (m.includes("food") || m.includes("breakfast") || m.includes("eat") || m.includes("restaurant") || m.includes("vegetarian") || m.includes("veg"))
    return "🍽️ **A Voyager's Guide to Island Flavors:**\n\n🏠 **At Ahlan:** We serve a fresh, home-cooked breakfast to fuel your day.\n🍜 **Local Legends:**\n• **Annapurna:** The best pure veg spot in Port Blair (Try the thali!)\n• **Lighthouse Residency:** For when you want serious seafood.\n• **Icy Spicy:** Great for a quick local street food fix.\n\nWant our curated 'Island Foodie Map'? We'll WhatsApp it to you!";

  // Emergency
  if (m.includes("hospital") || m.includes("medical") || m.includes("police") || m.includes("emergency"))
    return "🚨 **Safety First, Always.**\n\n🏥 **GB Pant Hospital:** The main medical hub in Port Blair (3km from us).\n🚨 **Ambulance:** Dial 108.\n🚔 **Police:** Dial 100.\n📞 **Ahlan Emergency Desk:** +91 9434281386.\n\nOur team is on call 24/7. If you ever feel lost or need help, one call to us is all it takes.";

  // Booking
  if (m.includes("book") || m.includes("reserve") || m.includes("confirm") || m.includes("availability"))
    return "🏝️ **Ready to lock in your voyage?**\n\nThe fastest way is a quick chat on WhatsApp: **+91 9434281386**\n\nJust tell me your dates and group size, and I'll check the live availability for our Deluxe Rooms and Premium Packages immediately!";

  return "🚀 **Excellent question!** I'm here to ensure your Andaman journey is legendary.\n\nAsk me about:\n• 📍 Custom itineraries that avoid the crowds\n• 🌊 The best scuba spots for your skill level\n• ⛴️ Real-time ferry advice & bookings\n• 🍽️ Where the locals actually eat\n• 💑 Romantic secrets for honeymooners\n\nOr just tap a category above to start your voyage! ✨";
}

export default function AIConcierge() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "🌊 **Namaste Explorer!** I'm **Island Voyager**, your advanced guide to the Andaman Islands.\n\nFrom secret beaches to the best local seafood and seamless island transfers, I'm here to ensure your trip is nothing short of perfect.\n\nReady to dive into your next adventure?" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    }
  }, [messages, typing, open]);

  const sendMessage = (text?: string) => {
    const msg = text || input.trim();
    if (!msg) return;
    setMessages((prev) => [...prev, { role: "user", text: msg }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [...prev, { role: "bot", text: getBotReply(msg) }]);
    }, 800 + Math.random() * 600);
  };

  const formatBotText = (text: string) => {
    // Bold **text**
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        id="ai-concierge-btn"
        onClick={() => { setOpen(true); setMinimized(false); }}
        className="ai-chat-bubble w-14 h-14 rounded-full bg-gradient-ocean flex items-center justify-center shadow-ocean-glow hover:scale-110 transition-transform duration-300 relative"
        aria-label="AI Travel Concierge"
      >
        <Bot className="w-7 h-7 text-white" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse" />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            transition={{ duration: 0.25, type: "spring", damping: 25 }}
            className="fixed bottom-32 right-6 z-[998] w-80 sm:w-96 rounded-3xl overflow-hidden shadow-luxury border border-white/10"
            style={{ maxHeight: "calc(100vh - 160px)" }}
          >
            {/* Header */}
            <div className="bg-gradient-ocean p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-5 h-5 text-white" />
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border border-white" />
                </div>
                <div>
                  <div className="text-white font-semibold text-sm font-sans">Island Voyager</div>
                  <div className="text-aqua/80 text-xs font-sans flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Online · Adventure Guide
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="https://wa.me/919434281386"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors"
                  title="WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
                <button onClick={() => setMinimized(!minimized)} className="text-white/70 hover:text-white transition-colors">
                  {minimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </button>
                <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <AnimatePresence>
              {!minimized && (
                <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }}>
                  {/* Messages */}
                  <div className="h-72 overflow-y-auto p-4 space-y-3 bg-white dark:bg-[#0D1A26]">
                    {messages.map((m, i) => (
                      <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                        {m.role === "bot" && (
                          <div className="w-7 h-7 rounded-full bg-gradient-ocean flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                            <Bot className="w-4 h-4 text-white" />
                          </div>
                        )}
                        <div
                          className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-xs font-sans leading-relaxed whitespace-pre-line ${
                            m.role === "user"
                              ? "bg-gradient-ocean text-white rounded-br-sm"
                              : "bg-gray-100 dark:bg-white/10 text-gray-800 dark:text-gray-200 rounded-bl-sm"
                          }`}
                        >
                          {m.role === "bot" ? formatBotText(m.text) : m.text}
                        </div>
                      </div>
                    ))}
                    {typing && (
                      <div className="flex justify-start items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-ocean flex items-center justify-center flex-shrink-0">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                        <div className="bg-gray-100 dark:bg-white/10 px-4 py-3 rounded-2xl rounded-bl-sm">
                          <div className="flex gap-1">
                            {[0, 1, 2].map((i) => (
                              <div key={i} className="w-2 h-2 rounded-full bg-champagne animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={bottomRef} />
                  </div>

                  {/* Category Tabs */}
                  <div className="flex border-b border-gray-100 dark:border-white/10 bg-gray-50 dark:bg-[#0D1A26]/80 overflow-x-auto hide-scrollbar">
                    {QUICK_CATEGORIES.map((cat, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveCategory(idx)}
                        className={`flex-shrink-0 px-3 py-2 text-[10px] font-bold font-sans whitespace-nowrap transition-colors ${activeCategory === idx ? "text-champagne border-b-2 border-champagne" : "text-gray-500 dark:text-gray-400 hover:text-champagne"}`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>

                  {/* Quick Replies */}
                  <div className="px-3 py-2 bg-gray-50 dark:bg-[#0D1A26]/80 flex gap-2 overflow-x-auto hide-scrollbar">
                    {QUICK_CATEGORIES[activeCategory].replies.map((q) => (
                      <button
                        key={q}
                        onClick={() => sendMessage(q)}
                        className="shrink-0 text-[11px] bg-champagne/10 text-champagne border border-champagne/20 rounded-full px-3 py-1.5 hover:bg-champagne/20 transition-colors font-sans whitespace-nowrap"
                      >
                        {q}
                      </button>
                    ))}
                  </div>

                  {/* Input */}
                  <div className="p-3 bg-white dark:bg-[#131323] border-t border-gray-100 dark:border-white/10 flex gap-2">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                      placeholder="Ask anything about Andaman..."
                      className="flex-1 text-xs bg-gray-50 dark:bg-white/5 rounded-xl px-4 py-2.5 outline-none border border-gray-200 dark:border-white/10 focus:border-champagne/50 text-gray-800 dark:text-white placeholder-gray-400 font-sans"
                    />
                    <button
                      onClick={() => sendMessage()}
                      disabled={!input.trim()}
                      className="w-10 h-10 rounded-xl bg-gradient-ocean flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-40"
                    >
                      <Send className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </>
  );
}
