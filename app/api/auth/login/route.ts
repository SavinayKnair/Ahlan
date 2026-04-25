import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    // Default admin credentials (can be overridden via env vars)
    const validUser = process.env.ADMIN_USERNAME || 'ahlanhomestays@gmail.com';
    const validPass = process.env.ADMIN_PASSWORD || 'Ahlan@1234';

    if (username === validUser && password === validPass) {
      const response = NextResponse.json({ success: true });
      
      // Set secure cookie
      response.cookies.set({
        name: 'ahlan_admin_session',
        value: 'true',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7 // 1 week
      });
      
      return response;
    }

    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
