import type { Metadata, Viewport } from 'next';

import { Provider } from '@/lib/components/ui/provider';
import { Toaster } from '@/lib/components/ui/toaster';
import Layout from '@/lib/layout';
import '@fontsource/outfit/latin.css';
import '@/lib/styles/globals.css';

const APP_NAME = 'og-img';

export const metadata: Metadata = {
  title: {
    default: APP_NAME,
    template: '%s | og-img',
  },
  description: 'OpenGraph image edge service',
  applicationName: APP_NAME,
  authors: [{ name: 'agustinusnathaniel' }],
  keywords: ['opengraph', 'og:image', 'image generator', 'nextjs'],
  metadataBase: new URL('https://og.sznm.dev'),
  openGraph: {
    type: 'website',
    url: 'https://og.sznm.dev',
    title: APP_NAME,
    description: 'OpenGraph image edge service',
    images: [
      {
        url: 'https://og.sznm.dev/api/generate?heading=Open%20Graph%20Image%20Generator&text=https://og.sznm.dev',
        alt: 'og-img',
      },
    ],
    siteName: APP_NAME,
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@agstnsnathaniel',
    title: APP_NAME,
    description: 'OpenGraph image edge service',
    images: [
      'https://og.sznm.dev/api/generate?heading=Open%20Graph%20Image%20Generator&text=https://og.sznm.dev',
    ],
  },
  icons: {
    icon: '/favicon.ico',
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    title: APP_NAME,
    statusBarStyle: 'default',
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Provider>
          <Layout>{children}</Layout>
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
