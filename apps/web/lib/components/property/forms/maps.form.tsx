'use client';
import { ChevronsRight } from 'lucide-react';
import { usePropertyFormContext } from './property.form.provider';
import dynamic from 'next/dynamic';
import { CreatePropertyDto } from '../../../../../../packages/ui/src';



const LeafletMap = dynamic(() => import('../../map/leaflet.map'), { ssr: false });
export default function LocationStep() {
  const { updateData, data, nextStep } = usePropertyFormContext();
  return (
    <div className="w-full flex flex-col gap-1">
      <div className="flex justify-between">
        <h1 className="text-2xl px-5 py-2">Maps</h1>
      </div>
      <p className="text-sm px-5 py-1 text-muted/50">
        Type in your properties location
      </p>
      <div className="">
        <LeafletMap />
        <form action="" className="flex flex-col gap-1 px-5 py-2">
          <div className="flex gap-5 ">
            <label htmlFor="" className="flex flex-col gap-2 w-full flex-1/4">
              <p className="text-muted">StreetNumber</p>
              <input
                value={data?.streetNumber ?? 1}
                onChange={(e) => {
                  updateData!({...data as CreatePropertyDto , streetNumber : Number(e.currentTarget.value) });
                }}
                type="text"
                name=""
                id=""
                className=" rounded-md ring-[1px] ring-muted-foreground p-1 h-7 w-full"
              />
            </label>

            <label htmlFor="" className="flex flex-col gap-2 w-full flex-1/2">
              <p className="text-muted">StreetName</p>
              <input
                value={data?.streetName ?? ''}
                onChange={(e) => {
                  updateData!({
                    ...data as CreatePropertyDto,
                    streetName: e.target.value,
                  });
                }}
                type="text"
                name=""
                id=""
                className=" rounded-md ring-[1px] ring-muted-foreground p-1 h-7 w-full"
              />
            </label>
            <label htmlFor="" className="flex flex-col gap-2 w-full flex-1/2">
              <p className="text-muted">Suburb</p>
              <input
                value={data?.suburb ?? ''}
                onChange={(e) => {
                  updateData!({
                    ...data as CreatePropertyDto,
                    suburb: e.target.value,
                  });
                }}
                type="text"
                name=""
                id=""
                className=" rounded-md ring-[1px] ring-muted-foreground p-1 h-7 w-full"
              />
            </label>
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex gap-5">
              <label htmlFor="" className="flex flex-col gap-2 w-full flex-1/2">
                <p className="text-muted">Address</p>
                <input
                  value={data?.address ?? ''}
                  onChange={(e) => {
                    updateData!({
                      ...data as CreatePropertyDto,
                      address: e.target.value,
                    });
                  }}
                  type="text"
                  name=""
                  id=""
                  className=" rounded-md ring-[1px] ring-muted-foreground p-1 h-7 w-full"
                />
              </label>

              <label className="flex flex-col gap-2 text-muted w-full">
                <p>City</p>
                <input
                  value={data?.city ?? ''}
                  onChange={(e) => {
                    updateData!({
                      ...data as CreatePropertyDto,
                      city: e.target.value,
                    });
                  }}
                  type="text"
                  name=""
                  id=""
                  className="rounded-md ring-[1px] ring-muted-foreground p-1 h-7 w-full"
                />
              </label>
            </div>

            <label className="flex flex-col gap-2 text-muted w-full">
              <p>Country</p>
              <input
                value={data?.country ?? ''}
                onChange={(e) => {
                  updateData!({
                    ...data as CreatePropertyDto,
                    country: e.target.value,
                  });
                }}
                type="text"
                name=""
                id=""
                className="rounded-md ring-[1px] ring-muted-foreground p-1 h-7 w-full"
              />
            </label>
          </div>

          <div>
            <div className="flex gap-5">
              <label className="flex flex-col gap-2 text-muted w-full">
                <p>State</p>
                <input
                  value={data?.state ?? ''}
                  onChange={(e) => {
                    updateData!({
                      ...data as CreatePropertyDto,
                      state: e.target.value,
                    });
                  }}
                  type="text"
                  name=""
                  id=""
                  className="rounded-md ring-[1px] ring-muted-foreground p-1 h-7 w-full"
                />
              </label>
              <label className="flex flex-col gap-2 text-muted w-full">
                <p>Postal Code</p>
                <input
                  value={data?.postalCode ?? ''}
                  onChange={(e) => {
                    updateData!({
                      ...data as CreatePropertyDto,
                      postalCode: e.target.value,
                    });
                  }}
                  type="text"
                  name=""
                  id=""
                  className="rounded-md  ring-[1px] ring-muted-foreground p-1 h-7 w-full"
                />
              </label>
            </div>
          </div>
        </form>
      </div>
      <div className="px-5">
        <button
          onClick={nextStep}
          type="button"
          className="flex cursor-pointer items-center justify-center w-full bg-button p-2 text-xs rounded-lg inset-shadow-2xs inset-shadow-muted/50 shadow-2xs shadow-black"
        >
          Next Step
          <div className="flex gap-0">
            <ChevronsRight size={20} />
          </div>
        </button>
      </div>
    </div>
  );
}
