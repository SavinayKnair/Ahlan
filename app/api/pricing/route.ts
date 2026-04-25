import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

const dbPath = path.join(process.cwd(), 'database.json');

export async function GET() {
  try {
    if (!fs.existsSync(dbPath)) {
      return NextResponse.json({ rooms: [], packages: [], settings: {} });
    }
    
    const raw = fs.readFileSync(dbPath, 'utf8');
    const data = JSON.parse(raw);
    
    // Return ONLY safe, public pricing data. Exclude bookings (PII).
    return NextResponse.json({
      rooms: data.rooms || [],
      packages: data.packages || [],
      settings: data.settings || {}
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load pricing data' }, { status: 500 });
  }
}
