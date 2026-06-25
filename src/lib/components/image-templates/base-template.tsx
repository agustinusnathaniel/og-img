/* eslint-disable react/no-unknown-property */

import clsx from 'clsx';

import type { OgImageOption } from '@/lib/types/og-image-option';

type BaseTemplateProps = Omit<OgImageOption, 'template'>;

const BaseTemplate = ({ heading, text, center }: BaseTemplateProps) => {
  return (
    <div
      style={{ fontFamily: 'Geologica' }}
      tw="w-screen h-screen p-32 flex flex-col justify-center bg-[#121212]"
    >
      <div
        tw={clsx(
          'flex flex-col gap-8',
          center && 'w-full items-center text-center'
        )}
      >
        {heading && (
          <h1 tw="m-0 text-6xl font-bold text-gray-300 leading-tight">
            {heading}
          </h1>
        )}
        {text && <p tw="m-0 text-4xl text-gray-500">{text}</p>}
      </div>
    </div>
  );
};

export default BaseTemplate;
