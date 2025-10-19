import './globals.css';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { getProfileFromServer } from '../lib/auth/getserverprofile';
import { SessionProvider } from '../lib/providers/auth.provider';
import BannerProvider from '../../../packages/ui/src/components/banner/banner';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
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
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <SessionProvider session={await getProfileFromServer()}>
          <BannerProvider>{children}</BannerProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
