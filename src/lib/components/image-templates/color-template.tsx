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
}: ColorTemplateProps) => {
  const aHeight = height ?? 0;
  const aWidth = width ?? 0;

  return (
    <div
      style={{ fontFamily: 'Inter' }}
      tw="w-screen h-screen flex flex-col justify-center bg-gray-900"
    >
      <div
        style={{
          position: 'absolute',
          height: `${aHeight.toString()}px`,
          width: `${aWidth.toString()}px`,
          backgroundImage: `radial-gradient(
            ellipse at 50% 50%,
            rgba(163, 78, 17, 0.9) 0%,
            rgba(25, 159, 157, 0.7) 30%,
            rgba(16, 37, 50, 0.5) 60%,
            transparent 80%
          )`,
          opacity: 0.92,
        }}
      />
      <div
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
