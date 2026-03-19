/* eslint-disable react/no-unknown-property */

import clsx from 'clsx';
import type { OgImageOption } from 'lib/types/og-image-option';

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
  const blurSize = (aWidth < aHeight ? aWidth : aHeight) / 3.2;

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
          filter: `blur(${blurSize}px) saturate(125%)`,
          backgroundImage:
            'linear-gradient(45deg, #231e26, #a34e11, #199f9d, #102532)',
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
