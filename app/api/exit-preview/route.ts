import { NextRequest, NextResponse } from 'next/server';
import { draftMode } from 'next/headers';

export async function GET(request: NextRequest) {
  const draft = await draftMode();
  draft.disable();

  const searchParams = request.nextUrl.searchParams;
  const redirect = searchParams.get('redirect') || '/';

  const baseUrl = request.nextUrl.origin;
  
  const redirectPath = redirect.startsWith('/') ? redirect : `/${redirect}`;
  const redirectUrl = new URL(redirectPath, baseUrl);

  return NextResponse.redirect(redirectUrl);
}
