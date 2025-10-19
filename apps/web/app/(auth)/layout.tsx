import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getProfileFromServer } from '../../lib/auth/getserverprofile';

export const metadata: Metadata = {
  title: 'Domio',
  description: "A platform for managing your home's",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userId = (await getProfileFromServer())?.user?.id;
  return <>{userId ? redirect(`/app/${userId}`) : children}</>;
}
