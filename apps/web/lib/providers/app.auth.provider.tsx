'use client';

import React, { createContext, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { SideBarDataType } from '../components/sidebar/sidebar';
import { SideBarData } from '../components/sidebar/sidebar-data';

/**
 * Authentication + Route Guard context
 */
export type AppAuthProviderType = {
  sideBarData: SideBarDataType[];
  userId: string;
};

export const AuthProviderContext = createContext<AppAuthProviderType | null>(
  null,
);

export function AppAuthContextProvider({
  data,
  children,
}: {
  data: string | null | undefined;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  // build sidebar links with userId
  const sdata = SideBarData.map((c) => ({
    ...c,
    href: `${c.href}/${data}`,
  }));

  useEffect(() => {
    if (!data) return;

    // redirect if path does not contain the userId
    if (!pathname.includes(data)) {
      router.replace(`/app/${data}`);
    }
  }, [pathname, data, router]);

  return (
    <AuthProviderContext.Provider value={{ userId: data!, sideBarData: sdata }}>
      {children}
    </AuthProviderContext.Provider>
  );
}
