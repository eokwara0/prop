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
import { useProperty } from '@/lib/providers/property.provider';

export function PropertyFormProvider({
  children,
  property,
  isEdit,
}: {
  children: React.ReactNode;
  property?: CreatePropertyDto;
  isEdit?: boolean;
}) {
  const clientID = useAuthId();
  const [data, setData] = React.useState<CreatePropertyDto>(() => {
    if (property) {
      console.log('PROPERTY', property);
      return property;
    }
    return { ownerId: clientID } as CreatePropertyDto;
  });

  console.log('data', data);

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
          isEdit: isEdit ?? false,
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

export function PropertyFormData() {
  const { captureState, data } = usePropertyFormContext();
  switch (captureState) {
    case 'location':
      return <LocationStep data={data} />;
    case 'details':
      return <DetailsStep data={data} />;
    case 'images':
      return <ImageStep data={data} />;
  }
}
