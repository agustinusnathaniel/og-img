import type { NextRequest } from 'next/server';
import { ImageResponse } from 'takumi-js/response';

import TemplateSwitcher from '@/lib/components/image-templates/template-wrapper';
import { getGeologicaFont } from '@/lib/utils/font/geologica';

const HEX_COLOR = /^#[0-9a-fA-F]{3,8}$/;

function parseDimension(
  searchParams: URLSearchParams,
  key: string,
  fallback: number,
  min: number,
  max: number
): number {
  const raw = searchParams.get(key);
  const parsed = Number(raw ?? fallback) || fallback;
  return Math.min(Math.max(parsed, min), max);
}

function parseGradientColors(searchParams: URLSearchParams) {
  const rawFrom = searchParams.get('gradientFrom')?.slice(0, 30);
  const rawTo = searchParams.get('gradientTo')?.slice(0, 30);
  const gradientFrom = rawFrom && HEX_COLOR.test(rawFrom) ? rawFrom : undefined;
  const gradientTo = rawTo && HEX_COLOR.test(rawTo) ? rawTo : undefined;
  return { gradientFrom, gradientTo };
}

function parseGradientDegree(searchParams: URLSearchParams): string {
  const raw = searchParams.get('gradientDegree')?.slice(0, 3);
  const parsed = Number(raw);
  if (raw && !Number.isNaN(parsed) && parsed >= 0 && parsed <= 360) {
    return String(parsed);
  }
  return '45';
}

function buildTemplateProps(url: URL) {
  const { searchParams } = url;
  const baseUrl = url.origin;
  const heading = searchParams.get('heading')?.slice(0, 100);
  const text = searchParams.get('text')?.slice(0, 200);
  const template = searchParams.get('template') === 'color' ? 'color' : 'plain';
  const center = Boolean(searchParams.get('center'));
  const width = parseDimension(searchParams, 'width', 1200, 200, 1920);
  const height = parseDimension(searchParams, 'height', 630, 100, 1080);
  const gradient = searchParams.get('gradient')?.slice(0, 200);
  const { gradientFrom, gradientTo } = parseGradientColors(searchParams);
  const gradientDegree = parseGradientDegree(searchParams);
  return {
    baseUrl,
    center,
    gradient,
    gradientDegree,
    gradientFrom,
    gradientTo,
    heading,
    height,
    template,
    text,
    width,
  };
}

export function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const templateProps = buildTemplateProps(url);
    const { width, height } = templateProps;
    const response = new ImageResponse(
      <TemplateSwitcher {...templateProps} />,
      {
        fonts: [{ data: getGeologicaFont(), name: 'Geologica' }],
        height,
        width,
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
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
}
