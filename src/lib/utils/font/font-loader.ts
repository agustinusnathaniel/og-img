import { baseUrl } from 'lib/constants/base-url';

export const fontLoader = (url: string) =>
  fetch(new URL(url, baseUrl)).then((res) => res.arrayBuffer());
