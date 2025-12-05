import React from 'react';
import { createContext } from 'react';
import '../../map/index.css';
import { CreatePropertyDto } from '../../../../../../packages/ui/src';

export type catpureStateType = 'location' | 'details' | 'images';

export type PropertyFormContextType = {
  isEdit: boolean;
  captureState: catpureStateType;
  setData: (data: CreatePropertyDto) => void;
  data: CreatePropertyDto | null;
  updateData?: (data: CreatePropertyDto) => void;
  nextStep: () => void;
  prevStep: () => void;
};

/**
 * Context for managing the state of a Property form.
 * Provides the current Property object or null if not set.
 * Use this context to share property data between form components.
 */
export const PropertyFormContext =
  createContext<PropertyFormContextType | null>(null);

export function usePropertyFormContext() {
  const context = React.useContext(PropertyFormContext);
  if (!context) {
    throw new Error("Please use this hook inside of it's provider");
  }
  return context;
}
