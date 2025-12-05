'use client';
import { ChevronLeft } from 'lucide-react';
import { usePropertyFormContext } from './property.form.provider';
import { useTransition } from 'react';
import { useAuthId } from '../../../providers/auth.provider';
import Modal from '../../banner/modal';
import Loader from '../../loader/loader';
import { useBanner } from '../../banner/banner';
import {
  createProperty,
  CreatePropertyDto,
  PropertyResult,
  UpdatePropertyDto,
} from '../../../../../../packages/ui/src';
import { useProperty } from '@/lib/providers/property.provider';

export default function ImageStep({
  data,
}: {
  data: CreatePropertyDto | null;
}) {
  const clientId = useAuthId();
  const { show } = useBanner();
  const { prevStep, isEdit, data: property } = usePropertyFormContext();
  const [isPending, startTransition] = useTransition();
  const { updateProperty, updateProperties, properties } = useProperty();

  const handleIsEdit = () => {
    startTransition(async () => {
      try {
        if (!clientId) {
          throw new Error('Invalid client id');
        }
        console.log(property);
        const res = await updateProperty({
          ...property,
        } as UpdatePropertyDto);

        updateProperties(
          properties.map((c) => {
            if (c.id === (property as UpdatePropertyDto).id) {
              return property as PropertyResult;
            }
            return c;
          }),
        );

        show(
          <Modal
            firstMessage="property successfully updated"
            secondMessage={''}
          />,
          'success',
        );
      } catch (err) {
        console.log('something happened here ❌');
        show(
          <Modal
            key={`property-modal`}
            firstMessage={'Error occured while updating property'}
            secondMessage={(err as Error).message}
          />,
          'error',
        );
        console.log(err);
      }
    });
  };
  const handleSubmit = () => {
    startTransition(async () => {
      try {
        if (!clientId) {
          throw new Error('Invalid client id');
        }
        const res = await createProperty({
          ...(data as CreatePropertyDto),
        });

        show(<Modal firstMessage="successful" secondMessage={''} />, 'success');
      } catch (err) {
        show(
          <Modal
            key={`property-modal`}
            firstMessage={'Error'}
            secondMessage={(err as Error).message}
          />,
          'error',
        );
        console.log(err);
      }
    });
  };
  return (
    <div className="px-5 gap-2 flex flex-col text-sm">
      <div className="flex justify-between items-center py-3">
        <h2 className="w-full">Image Step</h2>
        <button
          onClick={prevStep}
          className="text-button flex items-center cursor-pointer"
        >
          <ChevronLeft size={16} />
          <span>Back</span>
        </button>
      </div>
      <div className="w-[500px]"></div>
      <div className="w-full">
        {!isPending ? (
          <button
            onClick={!isEdit ? handleSubmit : handleIsEdit}
            className="w-full p-2 cursor-pointer bg-button rounded-md text-[1rem] "
          >
            Submit
          </button>
        ) : (
          <button className="w-full p-2 cursor-pointer bg-button rounded-md text-[1rem] ">
            <Loader />
          </button>
        )}
      </div>
    </div>
  );
}
