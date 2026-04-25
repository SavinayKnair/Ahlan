import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'database.json');

function getDbData() {
  if (!fs.existsSync(dbPath)) return { rooms: [], packages: [], bookings: [] };
  const raw = fs.readFileSync(dbPath, 'utf8');
  return JSON.parse(raw);
}

function saveDbData(data: any) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

export async function POST(req: Request) {
  try {
    const booking = await req.json();
    
    // Validate basics
    if (!booking.name || !booking.phone) {
      return NextResponse.json({ error: 'Name and Phone are required' }, { status: 400 });
    }

    // Append metadata
    const newBooking = {
      id: `AHL-${Date.now().toString().slice(-6)}`,
      timestamp: new Date().toISOString(),
      status: "Pending",
      ...booking
    };

    const db = getDbData();
    db.bookings = [newBooking, ...(db.bookings || [])];
    
    saveDbData(db);

    return NextResponse.json({ success: true, booking: newBooking });
  } catch (error) {
    console.error("Booking save error:", error);
    return NextResponse.json({ error: 'Failed to save booking' }, { status: 500 });
  }
}
