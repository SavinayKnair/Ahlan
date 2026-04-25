import { NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    // Auth check
    const authCookie = req.headers.get('cookie')?.includes('ahlan_admin_session=true');
    if (!authCookie) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await req.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;

    const ctx = getRequestContext();
    const bucket = ctx?.env?.BUCKET;

    if (bucket) {
      // Save to R2
      await bucket.put(filename, bytes, {
        httpMetadata: { contentType: file.type },
      });
      
      // Use a proxy URL or public bucket URL
      const publicUrl = `/api/images/${filename}`;
      return NextResponse.json({ success: true, url: publicUrl });
    }

    return NextResponse.json({ error: 'Storage bucket not bound' }, { status: 500 });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}
