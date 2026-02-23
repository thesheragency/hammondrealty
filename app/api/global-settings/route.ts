import { NextResponse } from 'next/server';
import { fetchAcfGlobalScripts } from '@/lib/wordpress';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const scripts = await fetchAcfGlobalScripts();
    return NextResponse.json({
      global_head_scripts: scripts.headScripts,
      global_body_scripts: scripts.bodyScripts,
    });
  } catch (error) {
    console.error('Error fetching global settings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch global settings' },
      { status: 500 }
    );
  }
}
