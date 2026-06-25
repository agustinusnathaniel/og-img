import fs from 'node:fs';
import path from 'node:path';

const fontCache = new Map<string, Buffer>();

export const fontLoaderNode = (fontPath: string): Buffer => {
  const cached = fontCache.get(fontPath);
  if (cached) {
    return cached;
  }

  const fullPath = path.isAbsolute(fontPath)
    ? fontPath
    : path.join(process.cwd(), 'public', fontPath);

  if (!fs.existsSync(fullPath)) {
    throw new Error(
      `Font file not found: ${fullPath} (relative path: ${fontPath}). Ensure the font exists in the public/ directory.`
    );
  }

  const data = fs.readFileSync(fullPath);
  fontCache.set(fontPath, data);
  return data;
};
