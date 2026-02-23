import { NextResponse } from 'next/server';
import { fetchPosts } from '@/lib/wordpress';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const allPosts = await fetchPosts();
    const featured = allPosts.filter(p => p.isFeatured);
    const posts = featured.length > 0 ? featured : allPosts.slice(0, 6);
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching featured posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch featured posts' },
      { status: 500 }
    );
  }
}
