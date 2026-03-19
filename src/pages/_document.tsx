import { ColorModeScript } from '@chakra-ui/react';
import customTheme from 'lib/styles/custom-theme';
import type { DocumentContext } from 'next/document';
import Document, { Head, Html, Main, NextScript } from 'next/document';

const APP_NAME = 'nextarter-chakra';

class MyDocument extends Document {
  static getInitialProps(ctx: DocumentContext) {
    return Document.getInitialProps(ctx);
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta content={APP_NAME} name="application-name" />
          <meta content="yes" name="apple-mobile-web-app-capable" />
          <meta
            content="default"
            name="apple-mobile-web-app-status-bar-style"
          />
          <meta content={APP_NAME} name="apple-mobile-web-app-title" />
          <meta content="telephone=no" name="format-detection" />
          <meta content="yes" name="mobile-web-app-capable" />
          <meta content="#FFFFFF" name="theme-color" />

          {/* add your own app-icon */}
          {/* <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/icons/apple-touch-icon.png"
          /> */}
          <link href="/favicon.ico" rel="icon" />
          <link href="/manifest.json" rel="manifest" />
        </Head>
        <body>
          <ColorModeScript
            initialColorMode={customTheme.config?.intialColorMode}
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
