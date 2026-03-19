/* eslint-disable react/jsx-props-no-spreading */
import { ChakraProvider, localStorageManager } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { DefaultSeo } from 'next-seo';
import '@fontsource/outfit/latin.css';

import Layout from 'lib/layout';
import customTheme from 'lib/styles/custom-theme';

import defaultSEOConfig from '../../next-seo.config';
import 'lib/styles/globals.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider colorModeManager={localStorageManager} theme={customTheme}>
      <Head>
        <meta
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
          name="viewport"
        />
      </Head>
      <DefaultSeo {...defaultSEOConfig} />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
};

export default MyApp;
