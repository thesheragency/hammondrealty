import { NextResponse } from 'next/server';
import { storage } from '@/lib/storage';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const settings = await storage.getAllGlobalSettings();
    const result: Record<string, string> = {};
    
    for (const setting of settings) {
      result[setting.key] = setting.value;
    }
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching global settings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch global settings' },
      { status: 500 }
    );
  }
}
