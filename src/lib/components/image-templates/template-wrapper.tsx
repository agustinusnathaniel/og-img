/* eslint-disable react/no-unknown-property */

import { COLOR_TEMPLATE } from '@/lib/constants/template-option';
import type { OgImageOption } from '@/lib/types/og-image-option';

import BaseTemplate from './base-template';
import ColorTemplate from './color-template';

type TemplateSwitcherProps = OgImageOption & {
  gradient?: string;
};

const TemplateSwitcher = ({
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
}: TemplateSwitcherProps) => {
  if (template === COLOR_TEMPLATE) {
    return (
      <ColorTemplate
        {...{
          baseUrl,
          center,
          gradient,
          gradientDegree,
          gradientFrom,
          gradientTo,
          heading,
          height,
          text,
          width,
        }}
      />
    );
  }

  return <BaseTemplate {...{ center, heading, height, text, width }} />;
};

export default TemplateSwitcher;
