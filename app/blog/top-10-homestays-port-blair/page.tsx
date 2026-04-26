import React from 'react';
import Link from 'next/link';

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-12">
      <div className="max-w-3xl mx-auto px-4">
        <nav className="mb-8">
          <Link href="/" className="text-gold hover:underline flex items-center gap-2">← Back to Home</Link>
        </nav>
        <article className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Top 10 Homestays in Port Blair: Why Ahlan Leads the List</h1>
          <p className="text-gray-600 leading-relaxed mb-8">Finding the right place to stay in Port Blair can be overwhelming. From budget rooms to luxury hotels, the choices are endless. However, the rise of "Gold Category" homestays has changed the landscape.</p>
          <h2 className="text-2xl font-semibold mt-12 mb-4">1. Ahlan Homestays (Gold Category)</h2>
          <p className="text-gray-600 mb-4 text-justify">Ahlan isn''t just a homestay; it''s a premium experience. With 300+ sq ft rooms, hotel-grade linens, and a prime location near the airport, it bridges the gap between home comfort and luxury hospitality.</p>
          <div className="mt-12 p-8 bg-black text-white rounded-2xl text-center">
            <h3 className="text-2xl font-bold mb-4">Book a Top-Rated Stay</h3>
            <Link href="/#booking" className="inline-block bg-gold text-black px-8 py-3 rounded-full font-bold hover:bg-gold/90 transition-all">Check Rates</Link>
          </div>
        </article>
      </div>
    </div>
  );
}
