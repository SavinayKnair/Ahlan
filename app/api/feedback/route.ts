import { NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

const FALLBACK_FEEDBACK = [
  {
    id: "FB-101",
    timestamp: "2026-05-02T10:30:00.000Z",
    name: "Rahul & Priya Sharma",
    phone: "+91 98765 43210",
    email: "rahul.sharma@example.com",
    rating: 5,
    cleanlinessRating: 5,
    hospitalityRating: 5,
    locationRating: 5,
    valueRating: 5,
    stayType: "3 NIGHTS 4 DAYS",
    review: "Had the most wonderful stay at Ahlan Homestays! The rooms were spotless, the hosts treated us like family, and the island tour was seamless. Watching the sunset at Chidiya Tapu was unforgettable. Highly recommended!",
    recommend: "Yes, absolutely!",
    status: "Approved"
  },
  {
    id: "FB-102",
    timestamp: "2026-05-05T14:15:00.000Z",
    name: "Dr. Ananya Sen",
    phone: "+91 91234 56789",
    email: "ananya.sen@example.com",
    rating: 5,
    cleanlinessRating: 5,
    hospitalityRating: 5,
    locationRating: 4,
    valueRating: 5,
    stayType: "Deluxe Premium Stay Room",
    review: "Quiet, peaceful, and super hospitable. The airport pickup was punctual and the home-cooked breakfast was delicious. Will definitely stay here again on our next trip to Port Blair.",
    recommend: "Yes, absolutely!",
    status: "Approved"
  },
  {
    id: "FB-103",
    timestamp: "2026-05-09T09:00:00.000Z",
    name: "Vikramaditya Verma",
    phone: "+91 94444 12345",
    email: "vikram.verma@example.com",
    rating: 5,
    cleanlinessRating: 5,
    hospitalityRating: 5,
    locationRating: 5,
    valueRating: 5,
    stayType: "4 NIGHTS 5 DAYS",
    review: "The best experience in Andaman. From the scuba diving coordination to comfortable rooms, everything was managed with top professionalism. Five stars all the way!",
    recommend: "Yes, absolutely!",
    status: "Approved"
  }
];

export async function GET() {
  try {
    const { env } = getRequestContext();
    const db = env?.DB;

    if (db) {
      await db.prepare(`
        CREATE TABLE IF NOT EXISTS feedback (
          id TEXT PRIMARY KEY,
          timestamp TEXT DEFAULT CURRENT_TIMESTAMP,
          status TEXT DEFAULT 'New',
          name TEXT NOT NULL,
          phone TEXT,
          email TEXT,
          rating INTEGER NOT NULL,
          cleanlinessRating INTEGER,
          hospitalityRating INTEGER,
          locationRating INTEGER,
          valueRating INTEGER,
          stayType TEXT,
          review TEXT NOT NULL,
          recommend TEXT
        )
      `).run();

      const result = await db.prepare("SELECT * FROM feedback ORDER BY timestamp DESC").all();
      if (result.results && result.results.length > 0) {
        return NextResponse.json({ feedback: result.results });
      }
    }

    return NextResponse.json({ feedback: FALLBACK_FEEDBACK });
  } catch (error) {
    console.error("Failed to load feedback:", error);
    return NextResponse.json({ feedback: FALLBACK_FEEDBACK });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    if (!data.name || !data.rating || !data.review) {
      return NextResponse.json(
        { error: "Name, rating, and review are required" },
        { status: 400 }
      );
    }

    const id = `FB-${Date.now().toString().slice(-6)}`;
    const timestamp = new Date().toISOString();
    const status = "New";

    const feedbackItem = {
      id,
      timestamp,
      status,
      name: data.name.trim(),
      phone: data.phone?.trim() || "N/A",
      email: data.email?.trim() || "N/A",
      rating: Number(data.rating),
      cleanlinessRating: Number(data.cleanlinessRating || data.rating),
      hospitalityRating: Number(data.hospitalityRating || data.rating),
      locationRating: Number(data.locationRating || data.rating),
      valueRating: Number(data.valueRating || data.rating),
      stayType: data.stayType || "Room Stay",
      review: data.review.trim(),
      recommend: data.recommend || "Yes, absolutely!"
    };

    const { env } = getRequestContext();
    const db = env?.DB;

    if (db) {
      await db.prepare(`
        CREATE TABLE IF NOT EXISTS feedback (
          id TEXT PRIMARY KEY,
          timestamp TEXT DEFAULT CURRENT_TIMESTAMP,
          status TEXT DEFAULT 'New',
          name TEXT NOT NULL,
          phone TEXT,
          email TEXT,
          rating INTEGER NOT NULL,
          cleanlinessRating INTEGER,
          hospitalityRating INTEGER,
          locationRating INTEGER,
          valueRating INTEGER,
          stayType TEXT,
          review TEXT NOT NULL,
          recommend TEXT
        )
      `).run();

      await db.prepare(`
        INSERT INTO feedback (
          id, timestamp, status, name, phone, email, rating,
          cleanlinessRating, hospitalityRating, locationRating, valueRating,
          stayType, review, recommend
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).bind(
        feedbackItem.id,
        feedbackItem.timestamp,
        feedbackItem.status,
        feedbackItem.name,
        feedbackItem.phone,
        feedbackItem.email,
        feedbackItem.rating,
        feedbackItem.cleanlinessRating,
        feedbackItem.hospitalityRating,
        feedbackItem.locationRating,
        feedbackItem.valueRating,
        feedbackItem.stayType,
        feedbackItem.review,
        feedbackItem.recommend
      ).run();
    }

    // Build notifications for Hosts (Email & WhatsApp)
    const emailSubject = `⭐ New ${feedbackItem.rating}-Star Feedback from ${feedbackItem.name} | Ahlan Homestays`;
    const emailBody = `New Guest Feedback Received:

Guest Name: ${feedbackItem.name}
Rating: ${feedbackItem.rating} / 5 Stars ⭐
Cleanliness: ${feedbackItem.cleanlinessRating} / 5
Hospitality: ${feedbackItem.hospitalityRating} / 5
Location: ${feedbackItem.locationRating} / 5
Value: ${feedbackItem.valueRating} / 5
Stay Type: ${feedbackItem.stayType}
Phone: ${feedbackItem.phone}
Email: ${feedbackItem.email}
Would Recommend: ${feedbackItem.recommend}

Guest Review:
"${feedbackItem.review}"

Submitted on: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
Logged to Ahlan Homestays Database.`;

    const whatsappMessage = `*🌟 New Guest Feedback Received!*
*Name:* ${feedbackItem.name}
*Rating:* ${"⭐".repeat(feedbackItem.rating)} (${feedbackItem.rating}/5)
*Stay:* ${feedbackItem.stayType}
*Phone:* ${feedbackItem.phone}
*Recommend:* ${feedbackItem.recommend}

*Review:*
"${feedbackItem.review}"`;

    const mailtoUrl = `mailto:ahlanbb786@gmail.com,jabbarmam05@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    const whatsappUrl = `https://wa.me/919434281386?text=${encodeURIComponent(whatsappMessage)}`;

    return NextResponse.json({
      success: true,
      feedback: feedbackItem,
      notification: {
        mailtoUrl,
        whatsappUrl,
        emailSubject
      }
    });
  } catch (error) {
    console.error("Error submitting feedback:", error);
    return NextResponse.json(
      { error: "Failed to submit feedback" },
      { status: 500 }
    );
  }
}
