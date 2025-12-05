'use client';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { getOwnersProperty, PropertyResult } from '../../../../packages/ui/src';
import { updateProperty } from '../../../../packages/ui/src';
import { createProperty } from '../../../../packages/ui/src';
import { useAuthId } from './auth.provider';

export function useProperties(): PropertyResult[] {
  const userID = useAuthId();
  const [data, setData] = useState<PropertyResult[]>([]);
  useEffect(() => {
    const getData = async () => {
      const result = (await getOwnersProperty(userID as string)).data;
      setData(result);
    };
    getData();
    return () => {};
  }, [userID, setData]);
  return data;
}

export type PropertyContextType = {
  properties: PropertyResult[];
  updateProperties: (data: PropertyResult[]) => void;
  data: PropertyResult | null;
  setProperty: (data: PropertyResult) => void;
  updateProperty: typeof updateProperty;
  createProperty: typeof createProperty;
};

export const PropertyContext = createContext<PropertyContextType | null>(null);

export const useProperty = () => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error('Invalid context , please use within the right provider');
  }
  return context;
};

export function PropertyProvider({ children }: { children: React.ReactNode }) {
  const props = useProperties();
  const [data, setData] = useState<PropertyResult | null>(null);
  const [properties, setProperties] = useState<PropertyResult[]>(props ?? []);

  const setProperty = useCallback(
    (data_: PropertyResult) => {
      setData(data_);
      return;
    },
    [setData],
  );

  const setProperties_ = useCallback((data_: PropertyResult[]) => {
    setProperties(data_);
    return;
  }, []);

  useEffect(() => {
    setProperties(props);
  }, [props]);

  return (
    <PropertyContext.Provider
      value={{
        updateProperties: setProperties_,
        properties,
        data,
        setProperty: setProperty,
        updateProperty: updateProperty,
        createProperty: createProperty,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
}
