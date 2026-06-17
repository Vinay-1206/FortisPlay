import type { Metadata, Viewport } from 'next';
import { Manrope } from 'next/font/google';
import { Suspense } from 'react';
// import { AppErrorBoundary } from '@/components/ErrorBoundary';
import { ToastProvider } from '@/components/ui/Toast';
import { PwaRegister } from '@/components/PwaRegister';
import './globals.css';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://admin.fortisplay.example'),
  title: {
    default: 'FortisPlay Admin',
    template: '%s · FortisPlay Admin',
  },
  description: 'FortisPlay control center for managing live events, masters, and operations.',
  manifest: '/manifest.json',
  applicationName: 'FortisPlay Admin',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'FortisPlay',
  },
  icons: {
    icon: [
      { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    shortcut: ['/favicon.ico'],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#2563FF',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={manrope.variable}>
      <body className="font-sans">
        {/* <AppErrorBoundary> */}
        <Suspense fallback={<div>Loading...</div>}>
          <ToastProvider>{children}</ToastProvider>
          <PwaRegister />
        </Suspense>

        {/* </AppErrorBoundary> */}
      </body>
    </html>
  );
}
