import { createSystem, defaultConfig, defineRecipe } from '@chakra-ui/react';

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      fonts: {
        heading: { value: 'Outfit, serif' },
        body: { value: 'Outfit, sans-serif' },
      },
      colors: {
        gray: {
          50: { value: '#e8e9e9' },
          100: { value: '#d1d2d2' },
          200: { value: '#a3a5a5' },
          300: { value: '#747978' },
          400: { value: '#464c4b' },
          500: { value: '#181f1e' },
          600: { value: '#131918' },
          700: { value: '#0e1312' },
          800: { value: '#0a0c0c' },
          900: { value: '#050606' },
          950: { value: '#020303' },
        },
      },
    },
    semanticTokens: {
      colors: {
        // Custom brand colors can be added here
      },
    },
    recipes: {
      button: defineRecipe({
        base: {
          borderRadius: 12,
          shadow: 'lg',
        },
      }),
    },
  },
});
