import path from 'node:path';

import { fontLoaderNode } from './font-loader-node';

// Variable WOFF2 covering weight 100-900 (wght axis), latin subset
// ~24 KB vs 325 KB for the two static TTF files
export const geologicaFont = fontLoaderNode(
  path.join(
    process.cwd(),
    'node_modules/@fontsource-variable/geologica/files/geologica-latin-wght-normal.woff2'
  )
);
