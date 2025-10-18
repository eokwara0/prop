import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { getProfileFromServer } from '../lib/auth/getserverprofile';
import { SessionProvider } from '../lib/providers/auth.provider';

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
        <SessionProvider session={(await getProfileFromServer())}>
        {children}
        </SessionProvider>
      </body>
    </html>
  );
}
