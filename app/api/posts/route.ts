import { NextResponse } from 'next/server';
import { storage } from '@/lib/storage';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const posts = await storage.getAllPosts();
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}
