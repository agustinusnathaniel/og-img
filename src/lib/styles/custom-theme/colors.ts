import type { DeepPartial, Theme } from '@chakra-ui/react';

/** extend additional color here */
const extendedColors: DeepPartial<
  Record<string, Theme['colors']['blackAlpha']>
> = {
  brand: {
    100: '',
    200: '',
    300: '',
    400: '',
    500: '',
    600: '',
    700: '',
    800: '',
    900: '',
  },
};

/** override chakra colors here */
const overridenChakraColors: DeepPartial<Theme['colors']> = {
  gray: {
    50: '#e8e9e9',
    100: '#d1d2d2',
    200: '#a3a5a5',
    300: '#747978',
    400: '#464c4b',
    500: '#181f1e',
    600: '#131918',
    700: '#0e1312',
    800: '#0a0c0c',
    900: '#050606',
  },
};

export const colors = {
  ...overridenChakraColors,
  ...extendedColors,
};
