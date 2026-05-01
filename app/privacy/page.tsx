import { ShieldCheck, Lock, Eye, FileText } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Ahlanandaman.in",
  description: "Learn how Ahlan Homestays protects your privacy and manages your personal data.",
};

export default function PrivacyPolicy() {
  return (
    <div className="bg-pearl dark:bg-midnight min-h-screen pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="badge-gold mx-auto mb-6 w-fit">
            <ShieldCheck className="w-3.5 h-3.5" /> Legal Information
          </div>
          <h1 className="section-title text-midnight dark:text-white mb-4">
            Privacy <span className="text-gradient-gold">Policy</span>
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
              <Eye className="w-6 h-6 text-champagne" /> 1. Information We Collect
            </h2>
            <p>
              At Ahlan Homestays, we collect information necessary to provide you with a premium hospitality experience. This includes:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Contact details (Name, Email, Phone Number)</li>
              <li>Government-issued ID (Required by local law for check-in)</li>
              <li>Booking details and travel dates</li>
              <li>Special requests or dietary preferences</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-midnight dark:text-white mb-4 flex items-center gap-3">
              <Lock className="w-6 h-6 text-champagne" /> 2. How We Use Your Data
            </h2>
            <p>
              Your data is used exclusively to enhance your stay and comply with legal requirements:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Processing your room bookings and payments</li>
              <li>Coordinating airport transfers and island packages</li>
              <li>Communicating important travel information and updates</li>
              <li>Maintaining mandatory guest registries for local authorities</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-midnight dark:text-white mb-4 flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-champagne" /> 3. Data Security
            </h2>
            <p>
              We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, or alteration. Your payment information is processed through secure, encrypted gateways and is never stored on our local servers.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-midnight dark:text-white mb-4 flex items-center gap-3">
              <FileText className="w-6 h-6 text-champagne" /> 4. Sharing of Information
            </h2>
            <p>
              We do not sell or rent your personal information to third parties. We only share information with:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Local government authorities as required by Andaman & Nicobar administration laws.</li>
              <li>Trusted service partners (e.g., ferry operators, private cab drivers) only as necessary to fulfill your booked services.</li>
            </ul>
          </section>

          <section className="pt-8 border-t border-gray-100 dark:border-white/10">
            <h2 className="font-serif text-2xl font-bold text-midnight dark:text-white mb-4">Contact Us</h2>
            <p>
              If you have any questions regarding this Privacy Policy, please contact our data privacy coordinator at:
            </p>
            <p className="mt-4 font-bold text-midnight dark:text-white">
              Email: ahlanbb786@gmail.com<br />
              Phone: +91 94342 81386, +91 80758 74340<br />
              Address: New Pahargaon, Behind Old Sapna Theater, Sri Vijaya Puram - 744 105
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
