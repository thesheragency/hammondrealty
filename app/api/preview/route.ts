import { NextRequest, NextResponse } from 'next/server';
import { draftMode } from 'next/headers';
import { GraphQLClient, gql } from 'graphql-request';

const GET_POST_URI_QUERY = gql`
  query GetPostUri($id: ID!) {
    post(id: $id, idType: DATABASE_ID, asPreview: true) {
      uri
      slug
    }
  }
`;

const GET_PAGE_URI_QUERY = gql`
  query GetPageUri($id: ID!) {
    page(id: $id, idType: DATABASE_ID, asPreview: true) {
      uri
      slug
    }
  }
`;

function getAuthenticatedClient() {
  const wpApiUrl = process.env.WP_API_URL;
  
  if (!wpApiUrl) {
    throw new Error('WP_API_URL environment variable is not set');
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (process.env.WP_AUTH_USER && process.env.WP_AUTH_PASSWORD) {
    const credentials = Buffer.from(
      `${process.env.WP_AUTH_USER}:${process.env.WP_AUTH_PASSWORD}`
    ).toString('base64');
    headers['Authorization'] = `Basic ${credentials}`;
  }

  return new GraphQLClient(wpApiUrl, { headers });
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const secret = searchParams.get('secret');
  const id = searchParams.get('id');
  const type = searchParams.get('type') || 'post';

  if (!secret || secret !== process.env.WP_PREVIEW_SECRET) {
    return NextResponse.json(
      { error: 'Invalid preview secret' },
      { status: 401 }
    );
  }

  if (!id) {
    return NextResponse.json(
      { error: 'Missing id parameter' },
      { status: 400 }
    );
  }

  try {
    const client = getAuthenticatedClient();
    
    let content: { uri: string; slug: string } | null = null;
    
    if (type === 'page') {
      const response = await client.request<{
        page: { uri: string; slug: string } | null;
      }>(GET_PAGE_URI_QUERY, { id: id.toString() });
      content = response.page;
    } else {
      const response = await client.request<{
        post: { uri: string; slug: string } | null;
      }>(GET_POST_URI_QUERY, { id: id.toString() });
      content = response.post;
    }

    if (!content) {
      return NextResponse.json(
        { error: 'Content not found' },
        { status: 404 }
      );
    }

    const draft = await draftMode();
    draft.enable();

    let redirectPath: string;
    
    if (content.uri) {
      redirectPath = content.uri;
    } else if (type === 'post' && content.slug) {
      redirectPath = `/blog/${content.slug}`;
    } else if (type === 'page' && content.slug) {
      redirectPath = `/${content.slug}`;
    } else {
      redirectPath = '/';
    }

    const baseUrl = request.nextUrl.origin;
    const redirectUrl = new URL(redirectPath, baseUrl);

    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error('Preview error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch preview content' },
      { status: 500 }
    );
  }
}
