import './globals.css';
import type { Metadata } from 'next';
import { getProfileFromServer } from '../lib/auth/getserverprofile';
import { SessionProvider } from '../lib/providers/auth.provider';
import BannerProvider from '../lib/components/banner/banner';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';

const mono = Inter({
  weight: '400',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Domio',
  description: 'Home management platform',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${mono.className}`}>
        <NextIntlClientProvider>
          <SessionProvider session={await getProfileFromServer()}>
            <BannerProvider>{children}</BannerProvider>
          </SessionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
