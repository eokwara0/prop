'use client';
import { createContext, useCallback, useContext, useState } from 'react';
import { PropertyResult } from '../../../../packages/ui/src';

export type PropertyEditType = {
  data: PropertyResult | null;
  setProperty: (data: PropertyResult) => void;
};

export const PropertyEditContext = createContext<PropertyEditType | null>(null);

export const usePropertyEdit = () => {
  const context = useContext(PropertyEditContext);
  if (!context) {
    throw new Error('Invalid context , please use within the right provider');
  }
  return context;
};
export function PropertyEditProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [data, setData] = useState<PropertyResult | null>(null);
  const setProperty = useCallback(
    (data_: PropertyResult) => {
      setData(data_);
      return;
    },
    [setData],
  );
  return (
    <PropertyEditContext.Provider
      value={{
        data: data,
        setProperty: setProperty,
      }}
    >
      {children}
    </PropertyEditContext.Provider>
  );
}
