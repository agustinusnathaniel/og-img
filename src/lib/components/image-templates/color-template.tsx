/* eslint-disable react/no-unknown-property */

import clsx from 'clsx';

import type { OgImageOption } from '@/lib/types/og-image-option';

type ColorTemplateProps = Omit<OgImageOption, 'template' | 'baseUrl'> & {
  gradientFrom?: string;
  gradientTo?: string;
};

const ColorTemplate = ({
  heading,
  text,
  center,
  width,
  height,
  gradientFrom = '#0f0f0f',
  gradientTo = '#2d1b4e',
}: ColorTemplateProps) => {
  const aHeight = height ?? 0;
  const aWidth = width ?? 0;

  return (
    <div
      style={{
        position: 'relative',
        fontFamily: 'Geologica',
        height: `${aHeight}px`,
        width: `${aWidth}px`,
      }}
      tw="w-screen h-screen flex flex-col justify-center items-start bg-gray-900"
    >
      {/* Gradient background */}
      <div
        style={{
          position: 'absolute',
          height: `${aHeight}px`,
          width: `${aWidth}px`,
          backgroundImage: `linear-gradient(135deg, ${gradientFrom} 0%, #1a1a1a 50%, ${gradientTo} 100%)`,
        }}
      />

      {/* Content layer */}
      <div
        style={{ position: 'relative' }}
        tw={clsx(
          'flex flex-col p-32',
          center && 'w-screen items-center text-center'
        )}
      >
        {heading && (
          <h1 tw="text-6xl font-bold text-gray-300 leading-tight">{heading}</h1>
        )}
        {text && <p tw="font-medium text-3xl text-gray-300">{text}</p>}
      </div>
    </div>
  );
};

export default ColorTemplate;
