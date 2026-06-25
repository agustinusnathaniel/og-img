/* eslint-disable react/no-unknown-property */

import clsx from 'clsx';

import type { OgImageOption } from '@/lib/types/og-image-option';

type ColorTemplateProps = Omit<OgImageOption, 'template'> & {
  gradient?: string; // Full CSS gradient override
};

const ColorTemplate = ({
  heading,
  text,
  center,
  width,
  height,
  baseUrl,
  gradientFrom,
  gradientTo,
  gradient,
  gradientDegree,
}: ColorTemplateProps) => {
  const aHeight = height ?? 0;
  const aWidth = width ?? 0;

  // Use CSS gradient only when user explicitly provides gradient params; otherwise fall back to PNG
  const hasGradient = gradient || (gradientFrom && gradientTo);
  const backgroundImage = hasGradient
    ? gradient ||
      `linear-gradient(${gradientDegree ?? 45}deg, ${gradientFrom} 0%, ${gradientTo} 100%)`
    : `url(${baseUrl}/assets/color-bg.png)`;

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
      {/* Background layer - gradient or PNG */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: `${aHeight}px`,
          width: `${aWidth}px`,
          backgroundImage,
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
