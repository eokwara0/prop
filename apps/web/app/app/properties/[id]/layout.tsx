import { PropertyProvider } from '@/lib/providers/property.provider';
import React from 'react';

export default function PropertyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PropertyProvider>{children}</PropertyProvider>;
}
