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
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Why Choose Ahlan Homestay for Your Andaman Vacation?</h1>
          <p className="text-gray-600 mb-6 italic">"Ahlan" means welcome in Arabic, and that''s exactly how you''ll feel the moment you step into our property.</p>
          <h2 className="text-2xl font-semibold mt-12 mb-4">The Premium Difference</h2>
          <p className="text-gray-600">Unlike standard homestays, Ahlan provides a curated experience. We focus on three things: Space, Privacy, and Service.</p>
          <div className="mt-12 p-8 bg-black text-white rounded-2xl text-center">
            <h3 className="text-2xl font-bold mb-4">Experience the Welcome</h3>
            <Link href="/#booking" className="inline-block bg-gold text-black px-8 py-3 rounded-full font-bold hover:bg-gold/90 transition-all">Book Now</Link>
          </div>
        </article>
      </div>
    </div>
  );
}
