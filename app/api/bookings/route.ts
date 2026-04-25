import { NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const booking = await req.json();
    
    // Validate basics
    if (!booking.name || !booking.phone) {
      return NextResponse.json({ error: 'Name and Phone are required' }, { status: 400 });
    }

    const ctx = getRequestContext();
    const db = ctx?.env?.DB;

    const newBookingId = `AHL-${Date.now().toString().slice(-6)}`;
    const timestamp = new Date().toISOString();

    if (db) {
      // Save to D1
      await db.prepare(`
        INSERT INTO bookings (id, timestamp, status, type, name, phone, email, country, checkIn, checkOut, guests, roomType, addons, notes)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).bind(
        newBookingId,
        timestamp,
        "Pending",
        booking.type || "General Inquiry",
        booking.name,
        booking.phone,
        booking.email || "N/A",
        booking.country || "India",
        booking.checkIn || "N/A",
        booking.checkOut || "N/A",
        booking.guests || "N/A",
        booking.roomType || "Stay",
        booking.addons || "",
        booking.notes || ""
      ).run();

      return NextResponse.json({ success: true, booking: { id: newBookingId, ...booking } });
    }

    return NextResponse.json({ error: 'Database not bound' }, { status: 500 });
  } catch (error) {
    console.error("Booking save error:", error);
    return NextResponse.json({ error: 'Failed to save booking' }, { status: 500 });
  }
}
