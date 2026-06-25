import type { NextRequest } from 'next/server';
import { ImageResponse } from 'takumi-js/response';

import TemplateSwitcher from '@/lib/components/image-templates/template-wrapper';
import { getGeologicaFont } from '@/lib/utils/font/geologica';

export const runtime = 'nodejs';

const HEX_COLOR = /^#[0-9a-fA-F]{3,8}$/;

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

    const rawGradientFrom = searchParams.get('gradientFrom')?.slice(0, 30);
    const rawGradientTo = searchParams.get('gradientTo')?.slice(0, 30);
    const gradient = searchParams.get('gradient')?.slice(0, 200);

    // Only use CSS gradient when user explicitly provides colors; otherwise fall back to PNG
    const gradientFrom =
      rawGradientFrom && HEX_COLOR.test(rawGradientFrom)
        ? rawGradientFrom
        : undefined;
    const gradientTo =
      rawGradientTo && HEX_COLOR.test(rawGradientTo)
        ? rawGradientTo
        : undefined;

    const rawGradientDegree = searchParams.get('gradientDegree')?.slice(0, 3);
    const parsedDegree = Number(rawGradientDegree);
    const gradientDegree =
      rawGradientDegree &&
      !Number.isNaN(parsedDegree) &&
      parsedDegree >= 0 &&
      parsedDegree <= 360
        ? String(parsedDegree)
        : '45';

    const templateProps = {
      heading,
      text,
      template,
      center,
      width,
      height,
      baseUrl,
      gradientFrom,
      gradientTo,
      gradient,
      gradientDegree,
    };

    const response = new ImageResponse(
      <TemplateSwitcher {...templateProps} />,
      {
        width,
        height,
        fonts: [
          {
            name: 'Geologica',
            data: getGeologicaFont(),
            weight: 500,
            style: 'normal',
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
