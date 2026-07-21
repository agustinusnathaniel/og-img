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
        fontFamily: 'Geologica',
        height: `${aHeight}px`,
        position: 'relative',
        width: `${aWidth}px`,
      }}
      tw="w-screen h-screen flex flex-col justify-center items-start bg-gray-900"
    >
      {/* Background layer - gradient or PNG */}
      <div
        style={{
          backgroundImage,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          height: `${aHeight}px`,
          left: 0,
          position: 'absolute',
          top: 0,
          width: `${aWidth}px`,
        }}
      />

      {/* Content layer */}
      <div
        style={{ position: 'relative' }}
        tw={clsx(
          'flex flex-col gap-8 p-32',
          center && 'w-screen items-center text-center'
        )}
      >
        {heading && (
          <h1 tw="m-0 text-6xl font-bold text-gray-300 leading-tight">
            {heading}
          </h1>
        )}
        {text && <p tw="m-0 text-4xl text-gray-300">{text}</p>}
      </div>
    </div>
  );
};

export default ColorTemplate;
