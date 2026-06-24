import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';

import TemplateSwitcher from '@/lib/components/image-templates/template-wrapper';
import { geologicaBold, geologicaMedium } from '@/lib/utils/font/geologica';

export const runtime = 'nodejs';

export function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const { searchParams } = url;
    const baseUrl = url.origin;

    const heading = searchParams.get('heading')?.slice(0, 100);
    const text = searchParams.get('text')?.slice(0, 200);
    const template =
      searchParams.get('template') === 'color' ? 'color' : 'plain';
    const center = Boolean(searchParams.get('center'));
    const width = Math.min(
      Math.max(Number(searchParams.get('width') ?? 1200) || 1200, 200),
      1920
    );
    const height = Math.min(
      Math.max(Number(searchParams.get('height') ?? 630) || 630, 100),
      1080
    );

    const templateProps = {
      heading,
      text,
      template,
      center,
      width,
      height,
      baseUrl,
    };

    const response = new ImageResponse(
      <TemplateSwitcher {...templateProps} />,
      {
        width,
        height,
        fonts: [
          {
            name: 'Geologica',
            data: geologicaMedium,
            weight: 500,
          },
          {
            name: 'Geologica',
            data: geologicaBold,
            weight: 700,
          },
        ],
      }
    );

    response.headers.set(
      'Cache-Control',
      'public, s-maxage=31536000, max-age=0, immutable'
    );

    return response;
  } catch (error) {
    console.error('OG image generation failed:', error);
    return new Response(JSON.stringify({ error: 'Failed to generate image' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
