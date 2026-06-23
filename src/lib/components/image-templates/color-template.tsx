/* eslint-disable react/no-unknown-property */

import clsx from 'clsx';

import type { OgImageOption } from '@/lib/types/og-image-option';

type ColorTemplateProps = Omit<OgImageOption, 'template'>;

const ColorTemplate = ({
  heading,
  text,
  center,
  width,
  height,
  baseUrl,
}: ColorTemplateProps) => {
  const aHeight = height ?? 0;
  const aWidth = width ?? 0;

  return (
    <div
      style={{
        position: 'relative',
        fontFamily: 'Inter',
        height: `${aHeight}px`,
        width: `${aWidth}px`,
      }}
      tw="w-screen h-screen flex flex-col justify-center items-start bg-gray-900"
    >
      {/* Static gradient background */}
      <div
        style={{
          position: 'absolute',
          height: `${aHeight}px`,
          width: `${aWidth}px`,
          backgroundImage: `url(${baseUrl}/assets/color-bg.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
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
