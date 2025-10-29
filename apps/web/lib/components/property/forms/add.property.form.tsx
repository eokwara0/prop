'use client';
import {
  catpureStateType,
  PropertyFormContext,
  usePropertyFormContext,
} from './property.form.provider';
import React from 'react';
import '@/app/globals.css';
import LocationStep from './maps.form';
import DetailsStep from './property.detail.form';
import ImageStep from './image.form';
import { useAuthId } from '../../../providers/auth.provider';
import { CreatePropertyDto } from '../../../../../../packages/ui/src';

export function PropertyFormProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const clientID = useAuthId();
  const [data, setData] = React.useState<CreatePropertyDto>(() => {
    return { ownerId: clientID } as CreatePropertyDto;
  });
  const [captureState, setCatpureState] =
    React.useState<catpureStateType>('location');
  const updateData = (newData: CreatePropertyDto) => {
    setData((prev) => ({
      ...prev,
      ...newData,
    }));
  };

  const updateCaptureState = (state: catpureStateType) => {
    setCatpureState(state);
  };

  const nextStep = () => {
    if (captureState === 'location') updateCaptureState('details');
    else if (captureState === 'details') updateCaptureState('images');
  };

  const prevStep = () => {
    if (captureState === 'images') updateCaptureState('details');
    else if (captureState === 'details') updateCaptureState('location');
    else if (captureState === 'location') updateCaptureState('images');
  };

  return (
    <>
      <PropertyFormContext.Provider
        value={{
          captureState,
          data,
          setData,
          updateData,
          nextStep,
          prevStep,
        }}
      >
        {children}
      </PropertyFormContext.Provider>
    </>
  );
}

export default function PropertyForm() {
  return (
    <PropertyFormProvider>
      <PropertyFormData />
    </PropertyFormProvider>
  );
}

function PropertyFormData() {
  const { captureState } = usePropertyFormContext();
  switch (captureState) {
    case 'location':
      return <LocationStep />;
    case 'details':
      return <DetailsStep />;
    case 'images':
      return <ImageStep />;
  }
}
