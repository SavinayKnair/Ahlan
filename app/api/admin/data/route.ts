import { NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';
export const revalidate = 0;

export async function GET() {
  try {
    const { env } = getRequestContext();
    const db = env.DB;

    if (db) {
      // Ensure feedback table exists
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

      const rooms = await db.prepare("SELECT * FROM rooms").all();
      const packages = await db.prepare("SELECT * FROM packages").all();
      const bookings = await db.prepare("SELECT * FROM bookings ORDER BY timestamp DESC").all();
      const feedback = await db.prepare("SELECT * FROM feedback ORDER BY timestamp DESC").all();
      const settingsResult = await db.prepare("SELECT * FROM settings").all();

      const settings: any = {};
      settingsResult.results.forEach((s: any) => {
        try { settings[s.key] = JSON.parse(s.value); } catch { settings[s.key] = s.value; }
      });

      return NextResponse.json({
        rooms: rooms.results.map((r: any) => ({ ...r, features: JSON.parse(r.features as string || '[]') })),
        packages: packages.results.map((p: any) => ({ 
          ...p, 
          destinations: JSON.parse(p.destinations as string || '[]'),
          inclusions: JSON.parse(p.inclusions as string || '[]'),
          itinerary: JSON.parse(p.itinerary as string || '[]')
        })),
        bookings: bookings.results,
        feedback: feedback.results || [],
        settings
      });
    }

    return NextResponse.json({ error: 'Database not bound' }, { status: 500 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const authCookie = req.headers.get('cookie')?.includes('ahlan_admin_session=true');
    if (!authCookie) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { env } = getRequestContext();
    const db = env.DB;

    if (db) {
      // Update Rooms
      if (body.rooms) {
        for (const room of body.rooms) {
          await db.prepare(`
            INSERT INTO rooms (id, name, size, guests, basePrice, image, desc, features, tag, tagColor, availability)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(id) DO UPDATE SET 
              name=excluded.name, size=excluded.size, guests=excluded.guests, 
              basePrice=excluded.basePrice, image=excluded.image, desc=excluded.desc, 
              features=excluded.features, tag=excluded.tag, tagColor=excluded.tagColor, 
              availability=excluded.availability
          `).bind(
            room.id, room.name, room.size, room.guests, room.basePrice, 
            room.image, room.desc, JSON.stringify(room.features), 
            room.tag, room.tagColor, room.availability
          ).run();
        }
      }

      // Update Packages
      if (body.packages) {
        for (const pkg of body.packages) {
          await db.prepare(`
            INSERT INTO packages (id, title, duration, basePrice, priceSuffix, image, badge, badgeColor, desc, destinations, inclusions, itinerary)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(id) DO UPDATE SET 
              title=excluded.title, duration=excluded.duration, basePrice=excluded.basePrice, 
              priceSuffix=excluded.priceSuffix, image=excluded.image, badge=excluded.badge, 
              badgeColor=excluded.badgeColor, desc=excluded.desc, destinations=excluded.destinations, 
              inclusions=excluded.inclusions, itinerary=excluded.itinerary
          `).bind(
            pkg.id, pkg.title, pkg.duration, pkg.basePrice, pkg.priceSuffix, 
            pkg.image, pkg.badge, pkg.badgeColor, pkg.desc, 
            JSON.stringify(pkg.destinations), JSON.stringify(pkg.inclusions), JSON.stringify(pkg.itinerary)
          ).run();
        }
      }

      // Update Settings
      if (body.settings) {
        for (const [key, value] of Object.entries(body.settings)) {
          await db.prepare("INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value=excluded.value")
            .bind(key, typeof value === 'object' ? JSON.stringify(value) : String(value))
            .run();
        }
      }

      // Update Feedback
      if (body.feedback) {
        for (const item of body.feedback) {
          await db.prepare(`
            INSERT INTO feedback (id, timestamp, status, name, phone, email, rating, cleanlinessRating, hospitalityRating, locationRating, valueRating, stayType, review, recommend)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(id) DO UPDATE SET status=excluded.status, review=excluded.review
          `).bind(
            item.id, item.timestamp, item.status || 'Approved',
            item.name, item.phone || 'N/A', item.email || 'N/A',
            item.rating, item.cleanlinessRating || item.rating,
            item.hospitalityRating || item.rating, item.locationRating || item.rating,
            item.valueRating || item.rating, item.stayType || 'Room Stay',
            item.review, item.recommend || 'Yes, absolutely!'
          ).run();
        }
      }

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Database not bound' }, { status: 500 });
  } catch (error) {
    console.error("Admin Save Error:", error);
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
  }
}
