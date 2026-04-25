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
          <h1 className="text-4xl font-bold text-gray-900 mb-6">The Ultimate Andaman Honeymoon Guide 2026</h1>
          <p className="text-gray-600">Andaman is the most romantic destination in India. With its turquoise waters and white sand beaches, it''s the perfect place to start your new life together.</p>
          <h2 className="text-2xl font-semibold mt-12 mb-4">Honeymoon at Ahlan</h2>
          <p className="text-gray-600">Our Couple Retreat rooms are designed for romance, featuring private balconies and specialized decor for newlyweds.</p>
          <div className="mt-12 p-8 bg-black text-white rounded-2xl text-center">
            <h3 className="text-2xl font-bold mb-4">Start Your Journey Here</h3>
            <Link href="/#booking" className="inline-block bg-gold text-black px-8 py-3 rounded-full font-bold hover:bg-gold/90 transition-all">View Honeymoon Suite</Link>
          </div>
        </article>
      </div>
    </div>
  );
}
