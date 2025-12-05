import { ChevronLeft } from 'lucide-react';
import { usePropertyFormContext } from './property.form.provider';
import { motion } from 'framer-motion';
import { PropertySchema } from '../../../types/schemas';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/lib/shadcn/components/ui/select';
import { Switch } from '@/lib/shadcn/components/ui/switch';
import { CreatePropertyDto } from '../../../../../../packages/ui/src';

export default function DetailsStep({
  data,
}: {
  data: CreatePropertyDto | null;
}) {
  const { updateData, nextStep, prevStep } = usePropertyFormContext();

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 80, damping: 18 }}
        className="w-full flex flex-col gap-3 px-5  py-3 text-xs"
      >
        <div className="flex justify-between ">
          <h2 className="w-full">Fill in property details</h2>
          <button
            onClick={prevStep}
            className=" flex items-center text-button cursor-pointer"
          >
            <ChevronLeft size={16} />
            <span>Back</span>
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-5">
            <label htmlFor="prop-name" className="flex gap-2 flex-col w-full">
              <p>Name</p>
              <input
                type="text"
                name="prop-name"
                id="prop-name"
                placeholder="Property name"
                className=" h-7 ring  w-full p-2 rounded-md"
                value={data?.name ?? ''}
                onChange={(e) =>
                  updateData!({
                    ...(data as CreatePropertyDto),
                    name: e.currentTarget.value,
                  })
                }
              />
            </label>
            <label htmlFor="prop-desc" className="flex flex-col gap-2 w-full">
              <p>description</p>
              <input
                type="text"
                name="prop-desc"
                id="prop-desc"
                placeholder="description"
                className=" h-7 ring w-full p-2 rounded-md"
                value={data?.description ?? ''}
                onChange={(e) =>
                  updateData!({
                    ...(data as CreatePropertyDto),
                    description: e.currentTarget.value,
                  })
                }
              />
            </label>
          </div>
          <div className="flex gap-5 items-center">
            <label htmlFor="" className="flex flex-col gap-2 w-full">
              <p>Property type</p>
              <Select
                value={data?.type}
                onValueChange={(e) => {
                  console.log(e);
                  updateData!({
                    ...(data as CreatePropertyDto),
                    type: PropertySchema.shape.type.parse(e),
                  });
                }}
              >
                <SelectTrigger className="w-full h-[30px] border-none ring ring-muted p-2">
                  <SelectValue
                    defaultValue={data?.type}
                    placeholder="Choose property type"
                    className=" placeholder:text-white"
                  />
                </SelectTrigger>
                <SelectContent className="bg-dialog-color">
                  <SelectGroup className="bg-dialog-color">
                    <SelectLabel>Property Types</SelectLabel>
                    {[
                      'house',
                      'apartment',
                      'townhouse',
                      'condo',
                      'duplex',
                      'commercial',
                      'land',
                    ].map((val) => (
                      <SelectItem
                        value={val}
                        key={val}
                        className="cursor-pointer text-muted/50"
                      >
                        {val}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </label>

            <label htmlFor="prop-price" className="flex flex-col w-full gap-2">
              <h5>Property Price</h5>
              <input
                type="number"
                value={data?.price ?? 10000}
                onChange={(e) =>
                  updateData!({
                    ...(data as CreatePropertyDto),
                    price: Number(e.currentTarget.value),
                  })
                }
                name="prop-price"
                id="prop-price"
                placeholder="property Price"
                className="w-full ring rounded-md p-2"
              />
            </label>
          </div>
          <div className="flex gap-5">
            <label htmlFor="prop-beds" className="flex flex-col gap-1">
              <p className="text-muted/70 ">Number of Bedrooms</p>
              <input
                type="number"
                value={data?.bedrooms ?? 2}
                onChange={(e) =>
                  updateData!({
                    ...(data as CreatePropertyDto),
                    bedrooms: Number(e.currentTarget.value),
                  })
                }
                name="prop-beds"
                id="prop-bed"
                placeholder="property bedrooms"
                className="w-full ring rounded-md p-2"
              />
            </label>
            <label htmlFor="prop-baths" className="flex flex-col gap-1">
              <p className="text-muted/70 ">Number of Bathrooms</p>
              <input
                type="number"
                value={data?.bathrooms ?? 2}
                onChange={(e) =>
                  updateData!({
                    ...(data as CreatePropertyDto),
                    bathrooms: Number(e.currentTarget.value),
                  })
                }
                name="prop-baths"
                id="prop-baths"
                placeholder="property bathrooms"
                className="w-full ring rounded-md p-2 placeholder:text-xs"
              />
            </label>
            <label htmlFor="prop-size" className="flex flex-col gap-1">
              <p className="text-muted/70 text-xs">Property Size</p>
              <input
                type="number"
                value={data?.squareFeet ?? 0}
                onChange={(e) =>
                  updateData!({
                    ...(data as CreatePropertyDto),
                    squareFeet: Number(e.currentTarget.value),
                  })
                }
                name="prop-size"
                id="prop-size"
                placeholder="property size"
                className="w-full ring rounded-md p-2"
              />
            </label>
          </div>
          <div className="flex justify-between">
            <label htmlFor="has-parking" className="flex gap-2  items-center">
              <p>HasParking</p>
              <Switch
                id="has-parking"
                className="cursor-pointer bg-button data-[state=checked]:bg-button "
                checked={data?.hasParking ?? false}
                onCheckedChange={(e) =>
                  updateData!({
                    ...(data as CreatePropertyDto),
                    hasParking: e,
                  })
                }
              />
            </label>
            <label htmlFor="IsFurnished" className="flex gap-2  items-center">
              <p>IsFurnished</p>
              <Switch
                id="IsFurnished"
                className="cursor-pointer bg-button data-[state=checked]:bg-button "
                checked={data?.isFurnished ?? false}
                onCheckedChange={(e) =>
                  updateData!({
                    ...(data as CreatePropertyDto),
                    isFurnished: e,
                  })
                }
              />
            </label>
            <label htmlFor="IsForRent" className="flex gap-2  items-center">
              <p>IsForRent</p>
              <Switch
                id="IsForRent"
                className="cursor-pointer bg-button data-[state=checked]:bg-button "
                checked={data?.isForRent ?? false}
                onCheckedChange={(e) =>
                  updateData!({
                    ...(data as CreatePropertyDto),
                    isForRent: e,
                  })
                }
              />
            </label>
            <label htmlFor="IsForSale" className="flex gap-2  items-center">
              <p>IsForSale</p>
              <Switch
                id="IsForSale"
                className="cursor-pointer bg-button data-[state=checked]:bg-button "
                checked={data?.isForSale ?? false}
                onCheckedChange={(e) =>
                  updateData!({
                    ...(data as CreatePropertyDto),
                    isForSale: e,
                  })
                }
              />
            </label>
          </div>
          <div className="flex gap-5 justify-between"></div>
        </div>
        <div className="w-full">
          <button
            onClick={nextStep}
            className="bg-button w-full rounded-md p-2 text-md cursor-pointer"
          >
            Continue
          </button>
        </div>
      </motion.div>
    </>
  );
}
