'use client';
import { ChevronLeft, Upload, X } from 'lucide-react';
import { usePropertyFormContext } from './property.form.provider';
import { useState, useTransition, ChangeEvent } from 'react';
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

  type ImageItem = { id: number; url: string; name: string };

  const [images, setImages] = useState<ImageItem[]>([]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    files.forEach((file: File) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();

        reader.onloadend = () => {
          const result = reader.result as string | null;
          if (!result) return;
          setImages((prev) => [
            ...prev,
            {
              id: Date.now() + Math.random(),
              url: result,
              name: file.name,
            },
          ]);
        };

        reader.readAsDataURL(file);
      }
    });

    if (e.target) e.target.value = '';
  };

  const removeImage = (id: number) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const handleIsEdit = () => {
    console.log('editing property...');
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
    <div className="px-5 gap-2 flex flex-col text-sm w-[700px]">
      <div className="flex justify-between p-2 text-button">
        <p>Property Images</p>
        <button
          onClick={() => prevStep()}
          className=" cursor-pointer flex justify-center items-center text-xs text-button"
        >
          <ChevronLeft size={15} />
          <p>Back</p>
        </button>
      </div>
      <div className="p-4">
        <label className="flex flex-col items-center justify-center p-3 w-full h-64 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-slate-50 transition-all">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-12 h-12 text-slate-400 mb-4" />
            <p className="mb-2 text-sm text-slate-600">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-slate-500">PNG, JPG, GIF up to 10MB</p>
          </div>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />
        </label>

        {images.length > 0 && (
          <div className="mt-8 w-full">
            <h2 className="text-sm font-semibold text-white mb-4">
              Preview ({images.length}{' '}
              {images.length === 1 ? 'image' : 'images'})
            </h2>
            <div className="relative shrink-0 flex w-full h-40 gap-4  overflow-x-scroll bar ">
              {images.map((image) => (
                <div key={image.id} className=" flex  h-full w-40 shrink-0">
                  <img
                    src={image.url}
                    alt={image.name}
                    className="w-full h-32 object-cover rounded-lg shadow-md"
                  />
                  <button
                    onClick={() => removeImage(image.id)}
                    className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                    aria-label="Remove image"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  {/* <div className="mt-2 px-1">
                      <p className="text-xs text-slate-600 truncate">{image.name}</p>
                    </div> */}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="w-[500px]"></div>
      <div className="w-full">
        {!isPending ? (
          <button
            onClick={!isEdit ? handleSubmit : handleIsEdit}
            className="w-full p-2 cursor-pointer bg-button rounded-md text-xs "
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
