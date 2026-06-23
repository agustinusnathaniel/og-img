import { fontLoaderNode } from './font-loader-node';

const outfitFontLoader = (weight: string) =>
  fontLoaderNode(`/assets/fonts/Outfit-${weight}.ttf`);

export const outfitMedium = outfitFontLoader('Medium');
export const outfitBold = outfitFontLoader('Bold');
