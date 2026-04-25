import { NextResponse } from 'next/server';
import { getCloudflareContext } from '@opennextjs/cloudflare';

export const runtime = 'edge';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await params;
    const ctx = getCloudflareContext();
    const bucket = ctx?.env?.BUCKET;

    if (!bucket) {
      return new NextResponse('Bucket not found', { status: 500 });
    }

    const object = await bucket.get(filename);

    if (!object) {
      return new NextResponse('Image not found', { status: 404 });
    }

    const headers = new Headers();
    object.writeHttpMetadata(headers);
    headers.set('etag', object.httpEtag);
    headers.set('Cache-Control', 'public, max-age=31536000, immutable');

    return new NextResponse(object.body, {
      headers,
    });
  } catch (error) {
    console.error("Image proxy error:", error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
