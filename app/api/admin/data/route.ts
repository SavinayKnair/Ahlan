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

export async function GET() {
  const data = getDbData();
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Simple authentication check using cookies
    const authCookie = req.headers.get('cookie')?.includes('ahlan_admin_session=true');
    if (!authCookie) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const currentData = getDbData();
    const newData = { ...currentData, ...body };
    saveDbData(newData);
    
    return NextResponse.json({ success: true, data: newData });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
  }
}
