import { FileText, Clock, CreditCard, AlertCircle, Info } from "lucide-react";

export const metadata = {
  title: "Terms & Conditions | Ahlanandaman.in",
  description: "Read the terms and conditions for booking and staying at Ahlan Homestays.",
};

export default function TermsConditions() {
  return (
    <div className="bg-pearl dark:bg-midnight min-h-screen pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="badge-gold mx-auto mb-6 w-fit">
            <FileText className="w-3.5 h-3.5" /> Guest Agreement
          </div>
          <h1 className="section-title text-midnight dark:text-white mb-4">
            Terms & <span className="text-gradient-gold">Conditions</span>
          </h1>
          <div className="divider-gold" />
          <p className="text-warmgray dark:text-gray-400 mt-6 font-sans">
            Last Updated: April 2026
          </p>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-white/5 rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 dark:border-white/10 space-y-10 font-sans leading-relaxed text-warmgray dark:text-gray-300">
          
          <section>
            <h2 className="font-serif text-2xl font-bold text-midnight dark:text-white mb-4 flex items-center gap-3">
              <Info className="w-6 h-6 text-champagne" /> 1. Overview
            </h2>
            <p>
              By booking a stay at Ahlan Homestays, you agree to comply with and be bound by the following terms and conditions. These terms govern your relationship with us and apply to all bookings made directly through our website, WhatsApp, or phone.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-midnight dark:text-white mb-4 flex items-center gap-3">
              <Clock className="w-6 h-6 text-champagne" /> 2. Check-in & Check-out
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Check-in Time:</strong> 10:00 AM</li>
              <li><strong>Check-out Time:</strong> 08:00 AM (to facilitate island travel schedules)</li>
              <li>Early check-in and late check-out are subject to availability and may incur additional charges.</li>
              <li>A valid government-issued photo ID is mandatory for all guests at the time of check-in.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-midnight dark:text-white mb-4 flex items-center gap-3">
              <CreditCard className="w-6 h-6 text-champagne" /> 3. Booking & Cancellation
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>A 50% advance payment is required to confirm your booking.</li>
              <li>Full payment must be cleared at least 7 days prior to the arrival date.</li>
              <li><strong>Cancellation Policy:</strong> 
                <ul className="list-circle pl-6 mt-2 space-y-1">
                  <li>15+ days before arrival: Full refund (minus transaction fees).</li>
                  <li>7-14 days before arrival: 50% refund of the total booking value.</li>
                  <li>Less than 7 days before arrival: No refund.</li>
                </ul>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-midnight dark:text-white mb-4 flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-champagne" /> 4. House Rules
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Smoking is permitted only in designated outdoor areas.</li>
              <li>Pets are not allowed on the premises.</li>
              <li>Please maintain a peaceful environment; loud music is not permitted after 10:00 PM.</li>
              <li>Guests are responsible for any damage caused to property during their stay.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-midnight dark:text-white mb-4 flex items-center gap-3">
              <Info className="w-6 h-6 text-champagne" /> 5. Liability
            </h2>
            <p>
              While we provide assistance with island packages and transfers, Ahlan Homestays is not liable for disruptions caused by weather conditions, ferry cancellations, or airline delays. We strongly recommend travel insurance for all guests.
            </p>
          </section>

          <section className="pt-8 border-t border-gray-100 dark:border-white/10 text-center">
            <p className="text-sm font-serif italic">
              "At Ahlan Homestays, we strive to make your stay magical. We look forward to welcoming you to paradise."
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
