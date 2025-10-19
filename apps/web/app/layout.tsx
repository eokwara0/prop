import './globals.css';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { getProfileFromServer } from '../lib/auth/getserverprofile';
import { SessionProvider } from '../../../packages/ui/src/providers/auth.provider';
import BannerProvider from '../../../packages/ui/src/components/banner/banner';
import {Inter} from 'next/font/google'

const mono = Inter({
  weight : "400",
  subsets : ['latin']
})

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
        <SessionProvider session={await getProfileFromServer()}>
          <BannerProvider>{children}</BannerProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
