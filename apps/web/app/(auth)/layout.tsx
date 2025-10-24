import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getProfileFromServer } from '../../lib/auth/getserverprofile';


export const metadata: Metadata = {
  title: 'Domio',
  description: "A platform for managing your home's",
};

export const dynamic = 'force-dynamic';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getProfileFromServer();
  console.log(session)
  if(session != null){
    return redirect('/app/'+session.user.id);
  }
  return <>
    {children}
  </>
}
