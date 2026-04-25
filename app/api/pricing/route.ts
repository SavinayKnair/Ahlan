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
      const rooms = roomsResult.results.map((r: any) => ({
        ...r,
        features: JSON.parse(r.features as string || '[]')
      }));

      const packages = packagesResult.results.map((p: any) => ({
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

    return NextResponse.json({ error: 'Database not bound' }, { status: 500 });
  } catch (error) {
    console.error("Pricing API Error:", error);
    return NextResponse.json({ error: 'Failed to load pricing data' }, { status: 500 });
  }
}
