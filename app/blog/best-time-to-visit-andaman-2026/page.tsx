import React from 'react';
import Link from 'next/link';

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-12">
      <div className="max-w-3xl mx-auto px-4">
        <nav className="mb-8">
          <Link href="/" className="text-gold hover:underline flex items-center gap-2">
            ← Back to Home
          </Link>
        </nav>
        
        <article className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Best Time to Visit Andaman in 2026: A Local's Guide</h1>
          
          <div className="bg-gold/10 p-6 rounded-xl mb-8">
            <p className="text-gray-800 font-medium">Planning a trip to the Emerald Isles? Knowing when to visit is the difference between a perfect tropical vacation and getting caught in the monsoon rain.</p>
          </div>

          <h2 className="text-2xl font-semibold mt-12 mb-4">The Peak Season: October to May</h2>
          <p className="text-gray-600 leading-relaxed">
            The absolute best time to visit Port Blair and the surrounding islands is from late October to May. During these months, the weather is perfect for sightseeing, water sports, and beach activities.
          </p>
          
          <ul className="list-disc pl-6 space-y-3 text-gray-600 mt-6">
            <li><strong>Temperature:</strong> Comfortable 23°C to 30°C.</li>
            <li><strong>Sea Conditions:</strong> Calm and perfect for Scuba diving and Snorkeling.</li>
            <li><strong>Key Festivals:</strong> Island Tourism Festival (January).</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-12 mb-4">Why Stay at Ahlan During Your Visit?</h2>
          <p className="text-gray-600 leading-relaxed">
            Located just 10 minutes from the airport, Ahlan Homestays offers the perfect base for your Andaman discovery. Our Gold-category rooms provide hotel-grade luxury with the warmth of a local home.
          </p>

          <div className="mt-12 p-8 bg-black text-white rounded-2xl text-center">
            <h3 className="text-2xl font-bold mb-4">Ready for Your Island Escape?</h3>
            <p className="mb-6 text-gray-300">Book your premium stay at Ahlan and get personalized travel planning for your 2026 trip.</p>
            <Link href="/#booking" className="inline-block bg-gold text-black px-8 py-3 rounded-full font-bold hover:bg-gold/90 transition-all">
              Check Availability
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
