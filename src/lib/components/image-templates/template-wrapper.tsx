/* eslint-disable react/no-unknown-property */

import { COLOR_TEMPLATE } from 'lib/constants/template-option';
import type { OgImageOption } from 'lib/types/og-image-option';

import BaseTemplate from './base-template';
import ColorTemplate from './color-template';

type TemplateSwitcherProps = OgImageOption;

const TemplateSwitcher = ({
  heading,
  text,
  template,
  center,
  width,
  height,
}: TemplateSwitcherProps) => {
  if (template === COLOR_TEMPLATE) {
    return <ColorTemplate {...{ heading, text, center, width, height }} />;
  }

  return <BaseTemplate {...{ heading, text, width, height, center }} />;
};

export default TemplateSwitcher;
