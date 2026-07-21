import type { Metadata, Viewport } from 'next';

import { Provider } from '@/lib/components/ui/provider';
import { Toaster } from '@/lib/components/ui/toaster';
import Layout from '@/lib/layout';
import '@fontsource/outfit/latin.css';
import '@/lib/styles/globals.css';

const APP_NAME = 'og-img';

export const metadata: Metadata = {
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: APP_NAME,
  },
  applicationName: APP_NAME,
  authors: [{ name: 'agustinusnathaniel' }],
  description: 'OpenGraph image edge service',
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: '/favicon.ico',
  },
  keywords: ['opengraph', 'og:image', 'image generator', 'nextjs'],
  manifest: '/manifest.json',
  metadataBase: new URL('https://og.sznm.dev'),
  openGraph: {
    description: 'OpenGraph image edge service',
    images: [
      {
        alt: 'og-img',
        url: 'https://og.sznm.dev/api/generate?heading=Open%20Graph%20Image%20Generator&text=https://og.sznm.dev',
      },
    ],
    siteName: APP_NAME,
    title: APP_NAME,
    type: 'website',
    url: 'https://og.sznm.dev',
  },
  title: {
    default: APP_NAME,
    template: '%s | og-img',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@agstnsnathaniel',
    description: 'OpenGraph image edge service',
    images: [
      'https://og.sznm.dev/api/generate?heading=Open%20Graph%20Image%20Generator&text=https://og.sznm.dev',
    ],
    title: APP_NAME,
  },
};

export const viewport: Viewport = {
  initialScale: 1,
  minimumScale: 1,
  themeColor: '#FFFFFF',
  width: 'device-width',
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
