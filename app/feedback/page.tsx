"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Sparkles,
  Send,
  MessageCircle,
  Mail,
  CheckCircle2,
  ThumbsUp,
  MapPin,
  Calendar,
  Users,
  Award,
  QrCode as QrIcon,
  Copy,
  Check,
  ShieldCheck,
  Loader2,
  ExternalLink
} from "lucide-react";
import QRCodeCard from "@/components/QRCodeCard";
import toast from "react-hot-toast";

const RATING_LABELS: Record<number, string> = {
  1: "Poor - Needed improvement",
  2: "Fair - Okay stay",
  3: "Good - Satisfactory experience",
  4: "Very Good - Really enjoyed it!",
  5: "Exceptional! - Exceeded expectations"
};

const STAY_OPTIONS = [
  "Deluxe Room Stay (General)",
  "Deluxe Forest View Room",
  "Deluxe Premium Stay Room",
  "Deluxe Family Comfort Room",
  "Deluxe Couple Retreat Room",
  "Deluxe Runway View Room",
  "3 NIGHTS 4 DAYS Package",
  "4 NIGHTS 5 DAYS Package",
  "5 NIGHTS 6 DAYS Package",
  "Custom Island Tour / Other"
];

export default function FeedbackPage() {
  const [activeTab, setActiveTab] = useState<"form" | "qr" | "reviews">("form");

  // Form State
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);

  const [cleanlinessRating, setCleanlinessRating] = useState<number>(5);
  const [hospitalityRating, setHospitalityRating] = useState<number>(5);
  const [locationRating, setLocationRating] = useState<number>(5);
  const [valueRating, setValueRating] = useState<number>(5);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [stayType, setStayType] = useState(STAY_OPTIONS[0]);
  const [review, setReview] = useState("");
  const [recommend, setRecommend] = useState("Yes, absolutely!");

  // Submission State
  const [submitting, setSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<any>(null);
  const [copiedReview, setCopiedReview] = useState(false);

  // Reviews list from backend
  const [reviewsList, setReviewsList] = useState<any[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(true);

  useEffect(() => {
    fetch("/api/feedback")
      .then((res) => res.json())
      .then((data) => {
        if (data.feedback) setReviewsList(data.feedback);
        setLoadingReviews(false);
      })
      .catch(() => setLoadingReviews(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (!phone.trim()) {
      toast.error("Please enter your phone / WhatsApp number");
      return;
    }
    if (!review.trim()) {
      toast.error("Please share your feedback or experience");
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        name,
        phone,
        email,
        rating,
        cleanlinessRating,
        hospitalityRating,
        locationRating,
        valueRating,
        stayType,
        review,
        recommend
      };

      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const json = await res.json();

      if (res.ok && json.success) {
        toast.success("Thank you! Your feedback has been saved.");
        setSubmittedData(json);
        // Prepend to current list
        setReviewsList((prev) => [json.feedback, ...prev]);
      } else {
        toast.error(json.error || "Failed to submit feedback");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error while submitting feedback");
    } finally {
      setSubmitting(false);
    }
  };

  const copyReviewText = () => {
    if (!submittedData?.feedback?.review) return;
    navigator.clipboard.writeText(submittedData.feedback.review);
    setCopiedReview(true);
    toast.success("Review text copied! You can paste it on Google.");
    setTimeout(() => setCopiedReview(false), 2500);
  };

  const resetForm = () => {
    setSubmittedData(null);
    setName("");
    setPhone("");
    setEmail("");
    setReview("");
    setRating(5);
  };

  return (
    <main className="min-h-screen bg-pearl dark:bg-midnight pt-24 pb-20 font-sans">
      {/* Hero Banner */}
      <div className="bg-gradient-ocean text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-champagne/15 border border-champagne/30 text-champagne text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" /> Ahlan Homestays Experience
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold mb-4 tracking-tight">
            Guest Feedback &amp; <span className="text-champagne">Reviews</span>
          </h1>
          <p className="text-white/80 text-sm sm:text-base max-w-2xl mx-auto font-sans leading-relaxed">
            Your journey with us matters. Share your thoughts, rate your stay, or download our printable guest feedback QR code for your rooms.
          </p>

          {/* Quick Stats Pill */}
          <div className="mt-8 inline-flex flex-wrap items-center justify-center gap-6 bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10 text-xs sm:text-sm">
            <div className="flex items-center gap-1.5 text-champagne font-bold">
              <Star className="w-4 h-4 fill-champagne" /> 4.9 / 5.0 Average Guest Rating
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-white/40 hidden sm:block" />
            <div className="text-white/90">
              ✓ Verified Guest Reviews
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-white/40 hidden sm:block" />
            <div className="text-white/90">
              📍 Port Blair, Andaman
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-5xl mx-auto px-4 -mt-6">
        {/* Navigation Tabs */}
        <div className="bg-white dark:bg-[#131323] p-2 rounded-2xl shadow-luxury border border-gray-100 dark:border-white/10 flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveTab("form")}
            className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl font-medium text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${
              activeTab === "form"
                ? "bg-champagne text-midnight shadow-md font-semibold"
                : "text-warmgray dark:text-gray-400 hover:text-midnight dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5"
            }`}
          >
            <Send className="w-4 h-4" /> Share Feedback
          </button>

          <button
            onClick={() => setActiveTab("qr")}
            className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl font-medium text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${
              activeTab === "qr"
                ? "bg-champagne text-midnight shadow-md font-semibold"
                : "text-warmgray dark:text-gray-400 hover:text-midnight dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5"
            }`}
          >
            <QrIcon className="w-4 h-4" /> Download QR Code Standee
          </button>

          <button
            onClick={() => setActiveTab("reviews")}
            className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl font-medium text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${
              activeTab === "reviews"
                ? "bg-champagne text-midnight shadow-md font-semibold"
                : "text-warmgray dark:text-gray-400 hover:text-midnight dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5"
            }`}
          >
            <Award className="w-4 h-4" /> Guest Stories ({reviewsList.length})
          </button>
        </div>

        {/* Tab 1: Feedback Form */}
        {activeTab === "form" && (
          <div className="space-y-8">
            {!submittedData ? (
              <form
                onSubmit={handleSubmit}
                className="bg-white dark:bg-[#131323] rounded-3xl p-6 sm:p-10 border border-gray-100 dark:border-white/10 shadow-luxury space-y-8"
              >
                {/* 1. Overall Rating */}
                <div className="text-center space-y-3 pb-6 border-b border-gray-100 dark:border-white/5">
                  <label className="block text-xs font-bold text-champagne uppercase tracking-widest">
                    Overall Experience
                  </label>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-midnight dark:text-white">
                    How was your stay with us?
                  </h2>
                  <p className="text-xs text-warmgray dark:text-gray-400">
                    Tap a star to rate your overall experience
                  </p>

                  {/* Big Stars */}
                  <div className="flex items-center justify-center gap-2 sm:gap-3 pt-2">
                    {[1, 2, 3, 4, 5].map((starVal) => {
                      const active = (hoverRating || rating) >= starVal;
                      return (
                        <button
                          key={starVal}
                          type="button"
                          onMouseEnter={() => setHoverRating(starVal)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => setRating(starVal)}
                          className="p-1 sm:p-2 transition-transform hover:scale-125 focus:outline-none"
                          title={`${starVal} Star`}
                        >
                          <Star
                            className={`w-8 h-8 sm:w-11 sm:h-11 transition-colors ${
                              active
                                ? "text-amber-400 fill-amber-400 drop-shadow-md"
                                : "text-gray-300 dark:text-gray-600"
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>

                  <div className="text-xs font-semibold text-champagne pt-1 animate-fadeIn">
                    {RATING_LABELS[hoverRating || rating]}
                  </div>
                </div>

                {/* 2. Detailed Category Ratings */}
                <div className="space-y-4">
                  <h3 className="font-serif text-lg font-bold text-midnight dark:text-white">
                    Rate Specific Aspects
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      {
                        label: "🧹 Cleanliness & Hygiene",
                        val: cleanlinessRating,
                        set: setCleanlinessRating
                      },
                      {
                        label: "🛎️ Host & Hospitality",
                        val: hospitalityRating,
                        set: setHospitalityRating
                      },
                      {
                        label: "📍 Location & Scenic Views",
                        val: locationRating,
                        set: setLocationRating
                      },
                      {
                        label: "💰 Value for Money",
                        val: valueRating,
                        set: setValueRating
                      }
                    ].map(({ label, val, set }) => (
                      <div
                        key={label}
                        className="p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 flex items-center justify-between"
                      >
                        <span className="text-xs font-semibold text-midnight dark:text-white">
                          {label}
                        </span>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => set(star)}
                              className="p-0.5 hover:scale-110 transition-transform"
                            >
                              <Star
                                className={`w-4 h-4 ${
                                  val >= star
                                    ? "text-amber-400 fill-amber-400"
                                    : "text-gray-300 dark:text-gray-600"
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Guest Details */}
                <div className="space-y-4 pt-2">
                  <h3 className="font-serif text-lg font-bold text-midnight dark:text-white">
                    Your Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-warmgray dark:text-gray-400 uppercase mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-midnight dark:text-white focus:outline-none focus:border-champagne transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-warmgray dark:text-gray-400 uppercase mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-midnight dark:text-white focus:outline-none focus:border-champagne transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-warmgray dark:text-gray-400 uppercase mb-1">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="yourname@gmail.com"
                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-midnight dark:text-white focus:outline-none focus:border-champagne transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-warmgray dark:text-gray-400 uppercase mb-1">
                        Stay or Package Chosen
                      </label>
                      <select
                        value={stayType}
                        onChange={(e) => setStayType(e.target.value)}
                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-midnight dark:text-white focus:outline-none focus:border-champagne transition-colors"
                      >
                        {STAY_OPTIONS.map((opt) => (
                          <option key={opt} value={opt} className="text-midnight">
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* 4. Written Review */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-warmgray dark:text-gray-400 uppercase">
                    Your Review &amp; Experience *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="Tell us what you loved about Ahlan Homestays, memorable moments, food, hospitality, or suggestions for future guests..."
                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl p-4 text-sm text-midnight dark:text-white focus:outline-none focus:border-champagne transition-colors resize-none leading-relaxed"
                  />
                </div>

                {/* 5. Recommendation */}
                <div className="p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <span className="text-xs font-semibold text-midnight dark:text-white flex items-center gap-2">
                    <ThumbsUp className="w-4 h-4 text-champagne" />
                    Would you recommend Ahlan Homestays to friends and family?
                  </span>
                  <div className="flex items-center gap-2">
                    {["Yes, absolutely!", "Likely", "No"].map((choice) => (
                      <button
                        key={choice}
                        type="button"
                        onClick={() => setRecommend(choice)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                          recommend === choice
                            ? "bg-champagne text-midnight shadow-sm"
                            : "bg-white dark:bg-white/10 text-warmgray hover:text-midnight dark:hover:text-white"
                        }`}
                      >
                        {choice}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full btn-primary py-4 text-sm font-semibold flex items-center justify-center gap-2 shadow-luxury"
                  >
                    {submitting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                    {submitting ? "Submitting Your Feedback..." : "Submit Guest Feedback"}
                  </button>
                  <p className="text-[11px] text-center text-warmgray dark:text-gray-400 mt-3 font-sans">
                    🔒 Your feedback is stored in our database and a notification is sent to our host team.
                  </p>
                </div>
              </form>
            ) : (
              /* Success Card */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white dark:bg-[#131323] rounded-3xl p-8 sm:p-12 border border-champagne/30 shadow-luxury text-center space-y-6"
              >
                <div className="w-16 h-16 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div>
                  <div className="text-xs uppercase tracking-widest text-champagne font-bold mb-1">
                    Feedback Successfully Recorded
                  </div>
                  <h2 className="font-serif text-3xl font-bold text-midnight dark:text-white">
                    Thank You, {submittedData.feedback.name}!
                  </h2>
                  <p className="text-sm text-warmgray dark:text-gray-300 max-w-lg mx-auto mt-2 font-sans">
                    We deeply appreciate you taking the time to share your feedback. Your review helps us continuously elevate the Ahlan luxury experience.
                  </p>
                </div>

                {/* Review Snippet Card */}
                <div className="bg-pearl dark:bg-white/5 p-6 rounded-2xl max-w-lg mx-auto border border-gray-100 dark:border-white/5 text-left space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-midnight dark:text-white font-serif">
                      {submittedData.feedback.stayType}
                    </span>
                    <div className="flex items-center text-amber-400">
                      {"★".repeat(submittedData.feedback.rating)}
                    </div>
                  </div>
                  <p className="text-xs text-warmgray dark:text-gray-300 italic font-sans">
                    &ldquo;{submittedData.feedback.review}&rdquo;
                  </p>
                </div>

                {/* Direct Action Buttons: WhatsApp & Email */}
                <div className="max-w-lg mx-auto space-y-3 pt-2">
                  <a
                    href={submittedData.notification.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full btn-whatsapp py-3.5 flex items-center justify-center gap-2 text-xs font-semibold rounded-xl"
                  >
                    <MessageCircle className="w-4 h-4" /> Send Copy to Host via WhatsApp
                  </a>

                  <a
                    href={submittedData.notification.mailtoUrl}
                    className="w-full py-3.5 border border-gray-200 dark:border-white/10 hover:border-champagne text-midnight dark:text-white hover:bg-gray-50 dark:hover:bg-white/5 flex items-center justify-center gap-2 text-xs font-semibold rounded-xl transition-all"
                  >
                    <Mail className="w-4 h-4 text-warmgray" /> Send Copy to Host via Email
                  </a>

                  <div className="pt-2 flex items-center justify-center gap-3">
                    <button
                      onClick={copyReviewText}
                      className="text-xs text-champagne hover:underline flex items-center gap-1.5"
                    >
                      {copiedReview ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                      {copiedReview ? "Copied!" : "Copy Review for Google"}
                    </button>
                    <span className="text-gray-300 dark:text-gray-600">•</span>
                    <button
                      onClick={resetForm}
                      className="text-xs text-warmgray hover:text-midnight dark:hover:text-white"
                    >
                      Submit Another Review
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        )}

        {/* Tab 2: Downloadable QR Code Standee */}
        {activeTab === "qr" && (
          <div className="space-y-6">
            <QRCodeCard />
          </div>
        )}

        {/* Tab 3: Reviews List */}
        {activeTab === "reviews" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-2xl font-bold text-midnight dark:text-white">
                  Real Guest Experiences
                </h3>
                <p className="text-xs text-warmgray dark:text-gray-400 mt-1">
                  What travellers say about their stay at Ahlan Homestays
                </p>
              </div>
              <button
                onClick={() => setActiveTab("form")}
                className="btn-primary py-2.5 px-4 text-xs font-semibold flex items-center gap-2"
              >
                <Star className="w-3.5 h-3.5 fill-current" /> Add Your Review
              </button>
            </div>

            {loadingReviews ? (
              <div className="flex justify-center p-12">
                <Loader2 className="w-6 h-6 animate-spin text-champagne" />
              </div>
            ) : reviewsList.length === 0 ? (
              <div className="bg-white dark:bg-[#131323] p-12 rounded-3xl text-center border border-gray-100 dark:border-white/5">
                <p className="text-sm text-warmgray">No reviews published yet. Be the first to share your experience!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reviewsList.map((item, idx) => (
                  <div
                    key={item.id || idx}
                    className="bg-white dark:bg-[#131323] p-6 rounded-3xl border border-gray-100 dark:border-white/10 shadow-sm flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-amber-400">
                          {[...Array(item.rating || 5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-amber-400" />
                          ))}
                        </div>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/30 px-2 py-0.5 rounded-full">
                          Verified Stay
                        </span>
                      </div>

                      <p className="text-sm text-midnight dark:text-gray-200 font-sans leading-relaxed">
                        &ldquo;{item.review}&rdquo;
                      </p>
                    </div>

                    <div className="pt-3 border-t border-gray-100 dark:border-white/5 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-semibold text-midnight dark:text-white font-serif">
                          {item.name}
                        </div>
                        <div className="text-[11px] text-warmgray dark:text-gray-400">
                          {item.stayType || "Room Stay"}
                        </div>
                      </div>
                      <div className="text-[10px] text-warmgray">
                        {item.timestamp ? new Date(item.timestamp).toLocaleDateString("en-IN", { month: "short", year: "numeric" }) : "Recent"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
