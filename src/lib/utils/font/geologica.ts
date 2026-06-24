import { fontLoaderNode } from './font-loader-node';

const geologicaFontLoader = (weight: string) =>
  fontLoaderNode(`/assets/fonts/Geologica-${weight}.ttf`);

export const geologicaMedium = geologicaFontLoader('Medium');
export const geologicaBold = geologicaFontLoader('Bold');
