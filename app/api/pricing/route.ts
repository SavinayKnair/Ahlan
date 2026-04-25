import { NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

export async function GET() {
  try {
    const ctx = getRequestContext();
    const db = ctx?.env?.DB;

    if (db) {
      // Fetch from D1
      const roomsResult = await db.prepare("SELECT * FROM rooms").all();
      const packagesResult = await db.prepare("SELECT * FROM packages").all();
      const settingsResult = await db.prepare("SELECT * FROM settings").all();

      // Format results
      const rooms = roomsResult.results.map(r => ({
        ...r,
        features: JSON.parse(r.features as string || '[]')
      }));

      const packages = packagesResult.results.map(p => ({
        ...p,
        destinations: JSON.parse(p.destinations as string || '[]'),
        inclusions: JSON.parse(p.inclusions as string || '[]'),
        itinerary: JSON.parse(p.itinerary as string || '[]')
      }));

      const settings: any = {};
      settingsResult.results.forEach((s: any) => {
        try {
          settings[s.key] = JSON.parse(s.value);
        } catch {
          settings[s.key] = s.value;
        }
      });

      return NextResponse.json({ rooms, packages, settings });
    }

    // Fallback for local development without D1
    const fs = require('fs');
    const path = require('path');
    const dbPath = path.join(process.cwd(), 'database.json');
    
    if (!fs.existsSync(dbPath)) {
      return NextResponse.json({ rooms: [], packages: [], settings: {} });
    }
    
    const raw = fs.readFileSync(dbPath, 'utf8');
    const data = JSON.parse(raw);
    
    return NextResponse.json({
      rooms: data.rooms || [],
      packages: data.packages || [],
      settings: data.settings || {}
    });
  } catch (error) {
    console.error("Pricing API Error:", error);
    return NextResponse.json({ error: 'Failed to load pricing data' }, { status: 500 });
  }
}
