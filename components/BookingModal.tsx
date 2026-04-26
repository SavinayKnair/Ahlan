"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plane, MessageSquare, ChevronRight, ChevronLeft, Check, CheckCircle } from "lucide-react";

export default function BookingModal({
  isOpen, onClose, formType = "general", initialRoom = "", initialPackage = "",
}: {
  isOpen: boolean; onClose: () => void;
  formType?: "general" | "room" | "package";
  initialRoom?: string; initialPackage?: string;
}) {
  const [step, setStep] = useState(1);
  const [showPreview, setShowPreview] = useState(false);
  const [preparedMessage, setPreparedMessage] = useState("");
  const [pricing, setPricing] = useState<any>(null);

  // Room form state
  const [room, setRoom] = useState({
    name: "", phone: "", whatsapp: "", email: "", country: "India", city: "",
    checkIn: "", checkOut: "", adults: "2", children: "0",
    arrivalTime: "", departureTime: "", roomType: initialRoom,
    vibe: "", smoking: "Non-Smoking", special: "",
    addons: [] as string[],
  });

  // Package form state
  const [pkg, setPkg] = useState({
    name: "", phone: "", email: "", country: "India",
    travelDate: "", adults: "2", children: "0", tripType: "",
    packageDuration: initialPackage, addons: [] as string[], notes: "",
  });

  // General form state
  const [gen, setGen] = useState({
    name: "", phone: "", country: "India",
    travelDates: "", guests: "2", inquiryType: "Stay", notes: "",
  });

  useEffect(() => {
    if (isOpen) {
      fetch(`/api/pricing?t=${Date.now()}`).then(r => r.json()).then(data => setPricing(data)).catch(console.error);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setRoom(r => ({ ...r, roomType: initialRoom }));
      setPkg(p => ({ ...p, packageDuration: initialPackage }));
    }
  }, [isOpen, initialRoom, initialPackage]);

  if (!isOpen) return null;


  // Derive add-on lists dynamically from admin pricing config (fallback to hardcoded defaults)
  const ALL_ADDONS = pricing?.settings?.addonPrices ? Object.keys(pricing.settings.addonPrices) : [
    "Airport Pickup", "Airport Drop", "Honeymoon Decoration",
    "Anniversary Decoration", "Extra Mattress", "Candlelight Setup",
    "Early Check-in", "Late Check-out", "Breakfast Upgrade",
    "Ferry Assistance", "Tour Planning Support",
    "Scuba Diving", "Snorkeling", "Parasailing",
    "Candlelight Dinner", "Ferry Upgrade", "Photography",
    "Room Decoration", "Private Cab", "Island Guide",
  ];

  const ROOM_ADDONS = ALL_ADDONS;
  const PKG_ADDONS = ALL_ADDONS;

  const PKG_DURATIONS = ["3N/4D", "4N/5D", "5N/6D", "6N/7D", "Custom Package"];

  const inputCls = "w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-midnight dark:text-white focus:outline-none focus:border-champagne focus:ring-1 focus:ring-champagne transition-all text-sm font-sans";
  const labelCls = "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1 font-sans";
  const selectCls = inputCls + " appearance-none";

  const toggleAddon = (list: string[], item: string, setter: (fn: (prev: any) => any) => void, key: string) => {
    setter(prev => ({
      ...prev,
      [key]: prev[key].includes(item) ? prev[key].filter((a: string) => a !== item) : [...prev[key], item],
    }));
  };

  const nights = () => {
    if (!room.checkIn || !room.checkOut) return 0;
    const diff = new Date(room.checkOut).getTime() - new Date(room.checkIn).getTime();
    return Math.max(0, Math.round(diff / (1000 * 60 * 60 * 24)));
  };

  const SEP = "----------------------------------------";
  const DSEP = "========================================";

  const handleFinalRedirect = (msg: string) => {
    window.location.href = `https://wa.me/919434281386?text=${encodeURIComponent(msg)}`;
    onClose();
    setShowPreview(false);
  };

  const stripEmoji = (str: string) => str ? str.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F000}-\u{1F02F}\u{1F0A0}-\u{1F0FF}\u{1F100}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{2B50}\u{2B55}\u{FE0F}]/gu, '').trim() : '';

  const submitRoom = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const n = nights();

    try {
      await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: "Room Booking",
          name: room.name, phone: room.phone, email: room.email, country: room.country,
          checkIn: room.checkIn, checkOut: room.checkOut, guests: `${room.adults}A, ${room.children}C`,
          roomType: room.roomType, addons: room.addons.join(", "), notes: room.special
        })
      });
    } catch (err) { console.error(err); }

    let basePrice = 0;
    let roomKnown = false;
    if (pricing && pricing.rooms) {
      const matched = pricing.rooms.find((r:any) => r.name === room.roomType);
      if (matched) {
        basePrice = matched.basePrice || 0;
        roomKnown = true;
      }
    }

    let extraHours = 0;
    if (room.arrivalTime) {
      const h = parseInt(room.arrivalTime.split(':')[0] || "12");
      if (h < 12) extraHours += (12 - h);
    }
    if (room.departureTime) {
      const h = parseInt(room.departureTime.split(':')[0] || "10");
      if (h > 10) extraHours += (h - 10);
    }

    const hourlyRate = (pricing && pricing.settings && pricing.settings.hourlyRate) ? pricing.settings.hourlyRate : 0;
    const extraTimeCost = extraHours * hourlyRate;

    let addonsCost = 0;
    let addonsUnknown = false;
    const addonsBlock = room.addons.length
      ? room.addons.map(a => {
          const p = pricing?.settings?.addonPrices?.[a];
          if (p) {
            addonsCost += p;
            return `  + ${stripEmoji(a).padEnd(25)} : ₹${p}`;
          } else {
            addonsUnknown = true;
            return `  + ${stripEmoji(a).padEnd(25)} : Extra Charge Applicable`;
          }
        }).join("\n")
      : "  (none selected)";

    const roomSubtotal = basePrice * n;
    let subtotal = roomSubtotal + extraTimeCost + addonsCost;
    
    let seasonalStr = "";
    if (pricing?.settings?.seasonalRateMultiplier && pricing.settings.seasonalRateMultiplier !== 1) {
       subtotal = Math.round(subtotal * pricing.settings.seasonalRateMultiplier);
       seasonalStr = ` (Includes x${pricing.settings.seasonalRateMultiplier} Seasonal Rate)`;
    }

    let taxStr = "";
    if (pricing?.settings?.taxes > 0) {
       const tax = Math.round(subtotal * (pricing.settings.taxes / 100));
       subtotal += tax;
       taxStr = `Taxes (${pricing.settings.taxes}%)  : ₹${tax.toLocaleString('en-IN')}`;
    }

    const formatRupee = (v: number) => "₹" + v.toLocaleString('en-IN');

    const msg = [
      DSEP,
      "  AHLAN HOMESTAYS - ROOM BOOKING REQUEST  ",
      DSEP,
      "",
      "[ GUEST INFORMATION ]",
      `Name           : ${stripEmoji(room.name)}`,
      `Phone          : ${stripEmoji(room.phone)}`,
      `WhatsApp       : ${stripEmoji(room.whatsapp) || stripEmoji(room.phone)}`,
      `Email          : ${stripEmoji(room.email) || "not provided"}`,
      `Country        : ${stripEmoji(room.country)}`,
      `City           : ${stripEmoji(room.city) || "not provided"}`,
      "",
      SEP,
      "[ STAY DETAILS ]",
      `Room Type      : ${stripEmoji(room.roomType) || "Any Available"}`,
      `Check-in       : ${new Date(room.checkIn).toDateString()} (Arr: ${room.arrivalTime || "TBD"})`,
      `Check-out      : ${new Date(room.checkOut).toDateString()} (Dep: ${room.departureTime || "TBD"})`,
      `Total Nights   : ${n}`,
      `Guests         : ${room.adults} Adults, ${room.children} Children`,
      `Room Vibe      : ${stripEmoji(room.vibe) || "No Preference"}`,
      `Smoking        : ${stripEmoji(room.smoking)}`,
      "",
      SEP,
      "[ PRICE SUMMARY ]",
      roomKnown ? `Room Rate      : ${formatRupee(basePrice)} x ${n} Nights` : `Room Rate      : Variable / Unknown`,
      roomKnown && extraHours > 0 ? `Extra Hours    : ${extraHours} hrs @ ${formatRupee(hourlyRate)}/hr` : null,
      roomKnown ? `Subtotal       : ${formatRupee(roomSubtotal + extraTimeCost)}${seasonalStr}` : null,
      `Add-ons:`,
      addonsBlock,
      taxStr ? taxStr : null,
      SEP,
      "[ ESTIMATED TOTAL ]",
      (!roomKnown || addonsUnknown) ? `${roomKnown ? formatRupee(subtotal) : ""} + Extra Charges (To Be Confirmed)` : `${formatRupee(subtotal)}`,
      "",
      SEP,
      "[ SPECIAL REQUESTS ]",
      `  ${room.special || "none"}`,
      "",
      DSEP,
      "Sent via Ahlan Homestay Website",
      "Please confirm availability and final bill.",
      "Thank you!",
      DSEP,
    ].filter(l => l !== null).join("\n");

    setPreparedMessage(msg);
    setShowPreview(true);
  };

  const submitPkg = async (ev: React.FormEvent) => {
    ev.preventDefault();

    try {
      await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: "Package Booking",
          name: pkg.name, phone: pkg.phone, email: pkg.email, country: pkg.country,
          checkIn: pkg.travelDate, checkOut: "N/A", guests: `${pkg.adults}A, ${pkg.children}C`,
          roomType: pkg.packageDuration, addons: pkg.addons.join(", "), notes: pkg.notes
        })
      });
    } catch (err) { console.error(err); }

    let basePrice = 0;
    let pkgKnown = false;
    if (pricing && pricing.packages) {
      const durationPrefix = pkg.packageDuration ? pkg.packageDuration.split('/')[0] : "";
      const matched = pricing.packages.find((p:any) => p.duration.includes(durationPrefix));
      if (matched) {
        basePrice = matched.basePrice || 0;
        pkgKnown = true;
      }
    }

    let addonsCost = 0;
    let addonsUnknown = false;
    const addonsBlock = pkg.addons.length
      ? pkg.addons.map(a => {
          const p = pricing?.settings?.addonPrices?.[a];
          if (p) {
            addonsCost += p;
            return `  + ${stripEmoji(a).padEnd(25)} : ₹${p}`;
          } else {
            addonsUnknown = true;
            return `  + ${stripEmoji(a).padEnd(25)} : Extra Charge Applicable`;
          }
        }).join("\n")
      : "  (none selected)";

    const adults = parseInt(pkg.adults || "2");
    const pkgSubtotal = basePrice * adults;
    let subtotal = pkgSubtotal + addonsCost;
    
    let seasonalStr = "";
    if (pricing?.settings?.seasonalRateMultiplier && pricing.settings.seasonalRateMultiplier !== 1) {
       subtotal = Math.round(subtotal * pricing.settings.seasonalRateMultiplier);
       seasonalStr = ` (Includes x${pricing.settings.seasonalRateMultiplier} Seasonal Rate)`;
    }

    let taxStr = "";
    if (pricing?.settings?.taxes > 0) {
       const tax = Math.round(subtotal * (pricing.settings.taxes / 100));
       subtotal += tax;
       taxStr = `Taxes (${pricing.settings.taxes}%)  : ₹${tax.toLocaleString('en-IN')}`;
    }

    const formatRupee = (v: number) => "₹" + v.toLocaleString('en-IN');

    const msg = [
      DSEP,
      " AHLAN HOMESTAYS - PACKAGE BOOKING REQUEST ",
      DSEP,
      "",
      "[ GUEST INFORMATION ]",
      `Guest Name     : ${stripEmoji(pkg.name)}`,
      `Phone          : ${stripEmoji(pkg.phone)}`,
      `Email          : ${stripEmoji(pkg.email) || "not provided"}`,
      `Country        : ${stripEmoji(pkg.country)}`,
      "",
      SEP,
      "[ TRAVEL DETAILS ]",
      `Package        : ${stripEmoji(pkg.packageDuration) || "To be decided"}`,
      `Travel Date    : ${pkg.travelDate ? new Date(pkg.travelDate).toDateString() : "To be decided"}`,
      `Guests         : ${pkg.adults} Adults, ${pkg.children} Children`,
      `Trip Type      : ${stripEmoji(pkg.tripType) || "not specified"}`,
      "",
      SEP,
      "[ PRICE SUMMARY ]",
      pkgKnown ? `Package Cost   : ${formatRupee(basePrice)} x ${adults} Adults` : `Package Cost   : Variable / Unknown`,
      pkgKnown ? `Subtotal       : ${formatRupee(pkgSubtotal)}${seasonalStr}` : null,
      `Add-ons:`,
      addonsBlock,
      taxStr ? taxStr : null,
      SEP,
      "[ ESTIMATED TOTAL ]",
      (!pkgKnown || addonsUnknown) ? `${pkgKnown ? formatRupee(subtotal) : ""} + Extra Charges (To Be Confirmed)` : `${formatRupee(subtotal)}`,
      "",
      SEP,
      "[ SPECIAL NOTES ]",
      `  ${pkg.notes || "none"}`,
      "",
      DSEP,
      "Sent via Ahlan Homestay Website",
      "Please share full itinerary and pricing.",
      "Thank you!",
      DSEP,
    ].filter(l => l !== null).join("\n");

    setPreparedMessage(msg);
    setShowPreview(true);
  };

  const submitGen = async (ev: React.FormEvent) => {
    ev.preventDefault();

    try {
      await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: "General Inquiry",
          name: gen.name, phone: gen.phone, email: "N/A", country: gen.country,
          checkIn: gen.travelDates, checkOut: "N/A", guests: gen.guests,
          roomType: gen.inquiryType, addons: "", notes: gen.notes
        })
      });
    } catch (err) { console.error(err); }

    const msg = [
      DSEP,
      "        AHLAN HOMESTAYS - INQUIRY         ",
      DSEP,
      "",
      "[ MY DETAILS ]",
      `Name       : ${stripEmoji(gen.name)}`,
      `Phone      : ${stripEmoji(gen.phone)}`,
      `Country    : ${stripEmoji(gen.country)}`,
      "",
      SEP,
      "[ TRAVEL INFORMATION ]",
      `Dates      : ${stripEmoji(gen.travelDates) || "not decided yet"}`,
      `Guests     : ${gen.guests}`,
      `Inquiry For: ${stripEmoji(gen.inquiryType)}`,
      "",
      SEP,
      "[ MESSAGE ]",
      `  ${stripEmoji(gen.notes) || "Please share availability and pricing."}`,
      "",
      DSEP,
      "Sent via Ahlan Homestay Website",
      "Kindly assist me. Thank you!",
      DSEP,
    ].join("\n");

    setPreparedMessage(msg);
    setShowPreview(true);
  };

  const TOTAL_PKG_STEPS = 5;
  const progressPct = ((step - 1) / (TOTAL_PKG_STEPS - 1)) * 100;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
          onClick={e => e.stopPropagation()}
          className="bg-white dark:bg-[#0A0A0F] rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden my-auto border border-champagne/20"
        >
          {/* Header */}
          <div className="bg-gradient-ocean p-6 text-center relative">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-1">
              {formType === "room" ? "Book Your Room" : formType === "package" ? "Book a Package" : "WhatsApp Inquiry"}
            </h2>
            <p className="font-sans text-white/70 text-xs sm:text-sm">
              {formType === "room" ? "Fill your details for a personalised quote sent to WhatsApp." :
               formType === "package" ? "Plan your perfect Andaman trip in a few steps." :
               "Tell us about your trip and we'll respond in minutes."}
            </p>
            {formType === "package" && (
              <div className="mt-4 mx-auto max-w-xs">
                <div className="flex justify-between text-[10px] text-white/60 mb-1 font-sans">
                  {["Info","Travel","Package","Add-ons","Notes"].map((l,i) => (
                    <span key={i} className={step > i ? "text-champagne font-bold" : ""}>{l}</span>
                  ))}
                </div>
                <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-champagne rounded-full transition-all duration-500" style={{ width: `${progressPct}%` }} />
                </div>
              </div>
            )}
            <button onClick={onClose} className="absolute top-4 right-4 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* ── GENERAL FORM ── */}
          {formType === "general" && !showPreview && (
            <form onSubmit={submitGen} className="p-6 md:p-8 space-y-5 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className={labelCls}>Full Name *</label><input required className={inputCls} value={gen.name} onChange={e => setGen({...gen, name: e.target.value})} /></div>
                <div><label className={labelCls}>Phone / WhatsApp *</label><input required type="tel" className={inputCls} value={gen.phone} onChange={e => setGen({...gen, phone: e.target.value})} /></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div><label className={labelCls}>Country</label><input className={inputCls} value={gen.country} onChange={e => setGen({...gen, country: e.target.value})} /></div>
                <div><label className={labelCls}>Travel Dates</label><input className={inputCls} placeholder="e.g. 15–20 June" value={gen.travelDates} onChange={e => setGen({...gen, travelDates: e.target.value})} /></div>
                <div><label className={labelCls}>Guests</label><input className={inputCls} value={gen.guests} onChange={e => setGen({...gen, guests: e.target.value})} /></div>
              </div>
              <div><label className={labelCls}>Inquiry Type</label>
                <select className={selectCls} value={gen.inquiryType} onChange={e => setGen({...gen, inquiryType: e.target.value})}>
                  {["Stay","Package","General Info","Workation","Group Booking"].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div><label className={labelCls}>Notes</label><textarea className={inputCls} rows={3} placeholder="Any questions or requirements?" value={gen.notes} onChange={e => setGen({...gen, notes: e.target.value})} /></div>
              <button type="submit" className="w-full btn-whatsapp py-4 flex items-center justify-center gap-2 font-semibold">
                <MessageSquare className="w-5 h-5" /> Send on WhatsApp
              </button>
            </form>
          )}

          {/* ── ROOM FORM ── */}
          {formType === "room" && !showPreview && (
            <form onSubmit={submitRoom} className="p-6 md:p-8 space-y-5 max-h-[72vh] overflow-y-auto">
              {/* Personal info */}
              <p className="text-xs font-bold text-champagne uppercase tracking-widest font-sans">Personal Info</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className={labelCls}>Full Name *</label><input required className={inputCls} value={room.name} onChange={e => setRoom({...room, name: e.target.value})} /></div>
                <div><label className={labelCls}>Phone Number *</label><input required type="tel" className={inputCls} value={room.phone} onChange={e => setRoom({...room, phone: e.target.value})} /></div>
                <div><label className={labelCls}>WhatsApp Number</label><input type="tel" className={inputCls} placeholder="If different from phone" value={room.whatsapp} onChange={e => setRoom({...room, whatsapp: e.target.value})} /></div>
                <div><label className={labelCls}>Email Address</label><input type="email" className={inputCls} value={room.email} onChange={e => setRoom({...room, email: e.target.value})} /></div>
                <div><label className={labelCls}>Country</label><input className={inputCls} value={room.country} onChange={e => setRoom({...room, country: e.target.value})} /></div>
                <div><label className={labelCls}>City</label><input className={inputCls} value={room.city} onChange={e => setRoom({...room, city: e.target.value})} /></div>
              </div>

              {/* Stay details */}
              <p className="text-xs font-bold text-champagne uppercase tracking-widest font-sans pt-2">Stay Details</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div><label className={labelCls}>Check-in *</label><input required type="date" className={inputCls} value={room.checkIn} onChange={e => setRoom({...room, checkIn: e.target.value})} /></div>
                <div><label className={labelCls}>Check-out *</label><input required type="date" className={inputCls} value={room.checkOut} onChange={e => setRoom({...room, checkOut: e.target.value})} /></div>
                <div><label className={labelCls}>Adults</label><input type="number" min="1" className={inputCls} value={room.adults} onChange={e => setRoom({...room, adults: e.target.value})} /></div>
                <div><label className={labelCls}>Children</label><input type="number" min="0" className={inputCls} value={room.children} onChange={e => setRoom({...room, children: e.target.value})} /></div>
              </div>
              {nights() > 0 && <p className="text-xs text-champagne font-sans font-semibold">✨ {nights()} Night{nights()>1?"s":""} selected</p>}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className={labelCls}>Arrival Time</label><input type="time" className={inputCls} value={room.arrivalTime} onChange={e => setRoom({...room, arrivalTime: e.target.value})} /></div>
                <div><label className={labelCls}>Departure Time</label><input type="time" className={inputCls} value={room.departureTime} onChange={e => setRoom({...room, departureTime: e.target.value})} /></div>
              </div>

              {/* Room preferences */}
              <p className="text-xs font-bold text-champagne uppercase tracking-widest font-sans pt-2">Room Preferences</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div><label className={labelCls}>Room Type</label>
                  <select className={selectCls} value={room.roomType} onChange={e => setRoom({...room, roomType: e.target.value})}>
                    <option value="">Any Available</option>
                    {["Deluxe Garden View Room","Deluxe Premium Stay Room","Deluxe Family Comfort Room","Deluxe Couple Retreat Room"].map(r => <option key={r}>{r}</option>)}
                  </select>
                </div>
                <div><label className={labelCls}>Room Vibe</label>
                  <select className={selectCls} value={room.vibe} onChange={e => setRoom({...room, vibe: e.target.value})}>
                    <option value="">No Preference</option>
                    {["Quiet Room","Family Friendly","Couple Friendly"].map(v => <option key={v}>{v}</option>)}
                  </select>
                </div>
                <div><label className={labelCls}>Smoking</label>
                  <select className={selectCls} value={room.smoking} onChange={e => setRoom({...room, smoking: e.target.value})}>
                    <option>Non-Smoking</option><option>Smoking</option>
                  </select>
                </div>
              </div>

              {/* Add-ons */}
              <p className="text-xs font-bold text-champagne uppercase tracking-widest font-sans pt-2">Add-ons</p>
              <div className="flex flex-wrap gap-2">
                {ROOM_ADDONS.map(addon => (
                  <button type="button" key={addon}
                    onClick={() => toggleAddon(room.addons, addon, setRoom as any, "addons")}
                    className={`text-xs px-3 py-1.5 rounded-full border font-sans font-medium transition-all ${room.addons.includes(addon) ? "bg-champagne text-midnight border-champagne" : "bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:border-champagne/60"}`}
                  >
                    {room.addons.includes(addon) && <Check className="w-3 h-3 inline mr-1" />}{addon}
                  </button>
                ))}
              </div>

              {/* Special request */}
              <div><label className={labelCls}>Special Requests</label><textarea className={inputCls} rows={2} placeholder="Dietary needs, accessibility, occasion, etc." value={room.special} onChange={e => setRoom({...room, special: e.target.value})} /></div>

              <button type="submit" className="w-full btn-whatsapp py-4 flex items-center justify-center gap-2 font-semibold">
                <MessageSquare className="w-5 h-5" /> Send Booking Request on WhatsApp
              </button>
            </form>
          )}

          {/* ── PACKAGE FORM (multi-step) ── */}
          {formType === "package" && !showPreview && (
            <div className="p-6 md:p-8 max-h-[72vh] overflow-y-auto">
              {/* Step 1: Basic Info */}
              {step === 1 && (
                <div className="space-y-4">
                  <p className="text-xs font-bold text-champagne uppercase tracking-widest font-sans mb-4">Step 1 — Basic Info</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div><label className={labelCls}>Full Name *</label><input required className={inputCls} value={pkg.name} onChange={e => setPkg({...pkg, name: e.target.value})} /></div>
                    <div><label className={labelCls}>Phone / WhatsApp *</label><input required type="tel" className={inputCls} value={pkg.phone} onChange={e => setPkg({...pkg, phone: e.target.value})} /></div>
                    <div><label className={labelCls}>Email</label><input type="email" className={inputCls} value={pkg.email} onChange={e => setPkg({...pkg, email: e.target.value})} /></div>
                    <div><label className={labelCls}>Country</label><input className={inputCls} value={pkg.country} onChange={e => setPkg({...pkg, country: e.target.value})} /></div>
                  </div>
                  <button onClick={() => { if (!pkg.name || !pkg.phone) return; setStep(2); }} className="w-full btn-primary py-3.5 flex items-center justify-center gap-2 mt-4">
                    Next <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Step 2: Travel Details */}
              {step === 2 && (
                <div className="space-y-4">
                  <p className="text-xs font-bold text-champagne uppercase tracking-widest font-sans mb-4">Step 2 — Travel Details</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div><label className={labelCls}>Travel Date *</label><input type="date" className={inputCls} value={pkg.travelDate} onChange={e => setPkg({...pkg, travelDate: e.target.value})} /></div>
                    <div><label className={labelCls}>Trip Type</label>
                      <select className={selectCls} value={pkg.tripType} onChange={e => setPkg({...pkg, tripType: e.target.value})}>
                        <option value="">Select Type</option>
                        {["Honeymoon 💑","Family 👨‍👩‍👧‍👦","Friends 👯","Solo 🏄","Corporate 💼"].map(t => <option key={t}>{t}</option>)}
                      </select>
                    </div>
                    <div><label className={labelCls}>Adults</label><input type="number" min="1" className={inputCls} value={pkg.adults} onChange={e => setPkg({...pkg, adults: e.target.value})} /></div>
                    <div><label className={labelCls}>Children</label><input type="number" min="0" className={inputCls} value={pkg.children} onChange={e => setPkg({...pkg, children: e.target.value})} /></div>
                  </div>
                  <div className="flex gap-3 mt-4">
                    <button type="button" onClick={() => setStep(1)} className="flex-1 btn-secondary py-3 flex items-center justify-center gap-2 text-sm"><ChevronLeft className="w-4 h-4" /> Back</button>
                    <button type="button" onClick={() => setStep(3)} className="flex-1 btn-primary py-3 flex items-center justify-center gap-2 text-sm">Next <ChevronRight className="w-4 h-4" /></button>
                  </div>
                </div>
              )}

              {/* Step 3: Package Selection */}
              {step === 3 && (
                <div className="space-y-4">
                  <p className="text-xs font-bold text-champagne uppercase tracking-widest font-sans mb-4">Step 3 — Package Duration</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {PKG_DURATIONS.map(d => (
                      <button type="button" key={d}
                        onClick={() => setPkg({...pkg, packageDuration: d})}
                        className={`p-4 rounded-2xl border-2 font-serif font-bold text-base transition-all ${pkg.packageDuration === d ? "border-champagne bg-champagne/10 text-champagne" : "border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:border-champagne/50"}`}
                      >{d}</button>
                    ))}
                  </div>
                  <div className="flex gap-3 mt-4">
                    <button type="button" onClick={() => setStep(2)} className="flex-1 btn-secondary py-3 flex items-center justify-center gap-2 text-sm"><ChevronLeft className="w-4 h-4" /> Back</button>
                    <button type="button" onClick={() => setStep(4)} className="flex-1 btn-primary py-3 flex items-center justify-center gap-2 text-sm">Next <ChevronRight className="w-4 h-4" /></button>
                  </div>
                </div>
              )}

              {/* Step 4: Add-ons */}
              {step === 4 && (
                <div className="space-y-4">
                  <p className="text-xs font-bold text-champagne uppercase tracking-widest font-sans mb-4">Step 4 — Add-ons <span className="text-gray-400 normal-case font-normal">(select any)</span></p>
                  <div className="flex flex-wrap gap-2">
                    {PKG_ADDONS.map(addon => (
                      <button type="button" key={addon}
                        onClick={() => toggleAddon(pkg.addons, addon, setPkg as any, "addons")}
                        className={`text-xs px-3 py-2 rounded-full border font-sans font-medium transition-all ${pkg.addons.includes(addon) ? "bg-champagne text-midnight border-champagne" : "bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:border-champagne/60"}`}
                      >
                        {pkg.addons.includes(addon) && <Check className="w-3 h-3 inline mr-1" />}{addon}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-3 mt-4">
                    <button type="button" onClick={() => setStep(3)} className="flex-1 btn-secondary py-3 flex items-center justify-center gap-2 text-sm"><ChevronLeft className="w-4 h-4" /> Back</button>
                    <button type="button" onClick={() => setStep(5)} className="flex-1 btn-primary py-3 flex items-center justify-center gap-2 text-sm">Next <ChevronRight className="w-4 h-4" /></button>
                  </div>
                </div>
              )}

              {/* Step 5: Notes + Submit */}
              {step === 5 && (
                <form onSubmit={submitPkg} className="space-y-4">
                  <p className="text-xs font-bold text-champagne uppercase tracking-widest font-sans mb-4">Step 5 — Special Notes</p>
                  <textarea className={inputCls} rows={4} placeholder="Any special requirements, dietary needs, accessibility, occasion details..." value={pkg.notes} onChange={e => setPkg({...pkg, notes: e.target.value})} />
                  <div className="bg-gray-50 dark:bg-white/5 rounded-2xl p-4 text-xs font-sans text-gray-600 dark:text-gray-400 space-y-1 border border-gray-100 dark:border-white/10">
                    <p className="font-semibold text-midnight dark:text-white mb-2">📋 Summary</p>
                    <p>👤 {pkg.name} · {pkg.phone} · {pkg.country}</p>
                    <p>📅 {pkg.travelDate || "TBD"} · {pkg.adults} Adults, {pkg.children} Children · {pkg.tripType || "—"}</p>
                    <p>📦 {pkg.packageDuration || "Not selected"}</p>
                    {pkg.addons.length > 0 && <p>✨ {pkg.addons.join(", ")}</p>}
                  </div>
                  <div className="flex gap-3">
                    <button type="button" onClick={() => setStep(4)} className="flex-1 btn-secondary py-3 flex items-center justify-center gap-2 text-sm"><ChevronLeft className="w-4 h-4" /> Back</button>
                    <button type="submit" className="flex-1 btn-whatsapp py-3 flex items-center justify-center gap-2 text-sm font-semibold">
                      <MessageSquare className="w-4 h-4" /> Send on WhatsApp
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* ── MESSAGE PREVIEW POPUP ── */}
          {showPreview && (
            <div className="p-6 md:p-8 space-y-6">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-green-50 dark:bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-midnight dark:text-white">Your message is ready</h3>
                <p className="text-sm text-warmgray font-sans">Review your details before we redirect you to WhatsApp.</p>
              </div>

              <div className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-6 relative group overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-champagne" />
                <pre className="text-[13px] text-midnight dark:text-white/90 font-mono whitespace-pre-wrap leading-relaxed max-h-[300px] overflow-y-auto custom-scrollbar pr-4">
                  {preparedMessage}
                </pre>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => handleFinalRedirect(preparedMessage)}
                  className="w-full btn-whatsapp py-4 flex items-center justify-center gap-3 font-bold text-sm shadow-lg shadow-green-500/20"
                >
                  <MessageSquare className="w-5 h-5" />
                  Send via WhatsApp
                </button>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setShowPreview(false)}
                    className="py-3 border border-gray-200 dark:border-white/10 rounded-xl text-warmgray hover:bg-gray-50 dark:hover:bg-white/5 transition-all font-sans font-semibold text-sm"
                  >
                    Edit Message
                  </button>
                  <button
                    onClick={onClose}
                    className="py-3 border border-red-100 dark:border-red-500/10 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-500/5 transition-all font-sans font-semibold text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>

  );
}
