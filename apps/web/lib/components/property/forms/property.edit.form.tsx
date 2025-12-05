import { ChevronsRight, MapIcon } from 'lucide-react';
import { PropertyFormData, PropertyFormProvider } from './add.property.form';
import ImageStep from './image.form';
import DetailsStep from './property.detail.form';
import { usePropertyFormContext } from './property.form.provider';
import { CreatePropertyDto } from '../../../../../../packages/ui/src';
import LeafletMap from '../../map/leaflet.map';
import { useProperty } from '@/lib/providers/property.provider';
import LocationStep from './maps.form';

export default function PropertyEditForm({
  data,
}: {
  data: CreatePropertyDto;
}) {
  return (
    <PropertyFormProvider property={data} isEdit={true}>
      <PropertyEditFormData />
    </PropertyFormProvider>
  );
}

export function PropertyEditFormData() {
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
