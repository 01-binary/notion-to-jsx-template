import { NextResponse } from 'next/server';

export const createXmlResponse = (xml: string, cacheMaxAge = 300): NextResponse => {
  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': `public, s-maxage=${cacheMaxAge}, stale-while-revalidate=${cacheMaxAge * 2}`,
    },
  });
};

export const createXmlErrorResponse = (message: string, error?: unknown): NextResponse => {
  if (error) {
    console.error(message, error);
  }
  return new NextResponse(`Internal Server Error: ${message}`, {
    status: 500,
    headers: { 'Content-Type': 'text/plain' },
  });
};
