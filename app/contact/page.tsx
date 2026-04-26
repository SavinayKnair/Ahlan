"use client";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="pt-24 min-h-screen bg-pearl dark:bg-midnight">
      <div className="bg-gradient-ocean py-20 text-center text-white">
        <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4">Get In <span className="text-champagne">Touch</span></h1>
        <p className="font-sans text-white/80 text-lg max-w-xl mx-auto">We respond within minutes on WhatsApp. Your dream Andaman trip is just a message away.</p>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="font-serif text-3xl font-bold text-midnight dark:text-white mb-8">Contact Details</h2>
            <div className="space-y-6">
              {[
                { icon: Phone, label: "Phone / WhatsApp", value: "+91 94342 81386", href: "tel:+919434281386" },
                { icon: Mail, label: "Email", value: "ahlanhomestays@gmail.com", href: "mailto:ahlanhomestays@gmail.com" },
                { icon: MapPin, label: "Address", value: "Port Blair, Andaman & Nicobar Islands, India – 744101", href: "#" },
              ].map(({ icon: Icon, label, value, href }) => (
                <a key={label} href={href} className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-champagne/10 flex items-center justify-center shrink-0 group-hover:bg-champagne/20 transition-colors">
                    <Icon className="w-5 h-5 text-champagne" />
                  </div>
                  <div>
                    <div className="text-xs text-warmgray dark:text-gray-400 font-sans mb-1">{label}</div>
                    <div className="font-sans font-medium text-midnight dark:text-white group-hover:text-champagne transition-colors">{value}</div>
                  </div>
                </a>
              ))}
            </div>

            {/* Quick Booking Buttons */}
            <div className="mt-10 space-y-3 hidden">
              <h3 className="font-serif font-semibold text-xl text-midnight dark:text-white mb-4">Quick Booking</h3>
              {[
                { label: "🛏️ Book a Room", msg: "Hi! I'd like to book a room at Ahlan Homestay." },
                { label: "📦 Package Inquiry", msg: "Hi! I'd like to know about your Andaman packages." },
                { label: "💑 Honeymoon Package", msg: "Hi! We're planning our honeymoon at Ahlan Homestay." },
                { label: "👨‍👩‍👧‍👦 Family Booking", msg: "Hi! We're a family interested in staying at Ahlan Homestay." },
              ].map((b) => (
                <a key={b.label} href={`https://wa.me/919434281386?text=${encodeURIComponent(b.msg)}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full p-4 rounded-2xl bg-white dark:bg-white/5 hover:bg-champagne/5 border border-gray-100 dark:border-white/10 hover:border-champagne/30 transition-all font-sans text-sm font-medium text-midnight dark:text-white">
                  <MessageCircle className="w-4 h-4 text-green-500 shrink-0" />{b.label}
                </a>
              ))}
            </div>

            {/* Quick Enquiry Form */}
            <div className="mt-10 bg-white dark:bg-white/5 rounded-3xl p-6 md:p-8 border border-gray-100 dark:border-white/10 shadow-luxury">
              <h3 className="font-serif font-semibold text-xl text-midnight dark:text-white mb-6">Send Quick Enquiry</h3>
              <form onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                const msg = `Hello Ahlan Homestay,\n\nName: ${fd.get('name')}\nPhone: ${fd.get('phone')}\nMessage: ${fd.get('message')}`;
                window.open(`https://wa.me/919434281386?text=${encodeURIComponent(msg)}`, '_blank');
              }} className="space-y-4">
                <div>
                  <input required name="name" type="text" placeholder="Your Name *" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#0A0A0F] text-sm focus:border-champagne outline-none transition-colors" />
                </div>
                <div>
                  <input required name="phone" type="tel" placeholder="Your Phone / WhatsApp *" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#0A0A0F] text-sm focus:border-champagne outline-none transition-colors" />
                </div>
                <div>
                  <textarea required name="message" rows={4} placeholder="How can we help you plan your trip?" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#0A0A0F] text-sm focus:border-champagne outline-none transition-colors resize-none"></textarea>
                </div>
                <button type="submit" className="w-full btn-whatsapp py-3.5 flex justify-center items-center gap-2 text-sm font-medium">
                  <MessageCircle className="w-4 h-4" /> Send to WhatsApp
                </button>
              </form>
            </div>
          </div>

          {/* Map */}
          <div>
            <h2 className="font-serif text-3xl font-bold text-midnight dark:text-white mb-8">Find Us</h2>
            <div className="rounded-3xl overflow-hidden shadow-luxury border border-champagne/10">
              <iframe
                title="Ahlan Homestay Port Blair Map"
                src="https://maps.google.com/maps?q=Ahlan%20Homestays,%20Port%20Blair&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%" height="400" loading="lazy" className="border-0 w-full block" allowFullScreen
              />
            </div>
            <a href="https://maps.app.goo.gl/f2yTZAG5MkH2AbfDA" target="_blank" rel="noopener noreferrer" className="btn-primary w-full text-center mt-4 block">
              📍 Get Directions
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
