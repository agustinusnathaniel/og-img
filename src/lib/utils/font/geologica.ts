import { fontLoaderNode } from './font-loader-node';

let cachedFont: Buffer | null = null;

export function getGeologicaFont(): Buffer {
  if (cachedFont) {
    return cachedFont;
  }
  cachedFont = fontLoaderNode('assets/fonts/geologica.woff2');
  return cachedFont;
}
