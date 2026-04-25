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
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Family Trip to Andaman: Fun, Safety, and Comfort</h1>
          <p className="text-gray-600 font-bold mb-8 italic">Planning a family vacation can be stressful, but Andaman makes it easy.</p>
          <p className="text-gray-600">From the Cellular Jail light and sound show to the glass-bottom boat rides, there is something for every generation here.</p>
          <div className="mt-12 p-8 bg-black text-white rounded-2xl text-center">
            <h3 className="text-2xl font-bold mb-4">Perfect for Large Families</h3>
            <Link href="/#booking" className="inline-block bg-gold text-black px-8 py-3 rounded-full font-bold hover:bg-gold/90 transition-all">Check Family Rooms</Link>
          </div>
        </article>
      </div>
    </div>
  );
}
