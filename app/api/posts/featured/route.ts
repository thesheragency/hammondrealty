import { NextResponse } from 'next/server';
import { storage } from '@/lib/storage';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const posts = await storage.getFeaturedPosts();
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching featured posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch featured posts' },
      { status: 500 }
    );
  }
}
