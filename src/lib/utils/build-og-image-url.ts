import pickBy from 'lodash-es/pickBy';

import { baseUrl } from '@/lib/constants/base-url';
import type {
  OgImageOption,
  OgImageOptionConverted,
} from '@/lib/types/og-image-option';

export const buildOgImageUrl = (options: OgImageOption) => {
  const converted: OgImageOptionConverted = {
    ...options,
    center: options.center ? String(options.center) : undefined,
    width: options.width?.toString(),
    height: options.height?.toString(),
  };
  const purgedOptions = pickBy(converted);
  const urlParams = new URLSearchParams(purgedOptions).toString();
  const params = urlParams ? `?${urlParams}` : '';

  return `${baseUrl}/api/generate${params}`;
};
