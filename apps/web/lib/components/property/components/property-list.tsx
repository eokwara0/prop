'use client';
import {
  ArmchairIcon,
  BathIcon,
  BedIcon,
  ChevronDown,
  Edit2Icon,
  HouseIcon,
  MapPin,
  PinIcon,
  Ruler,
  SearchIcon,
  Trash2Icon,
} from 'lucide-react';
import { formatter } from '@/lib/providers/number.format';
import { Badge } from '@/lib/shadcn/components/ui/badge';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/lib/shadcn/components/ui/popover';
import { PopoverArrow } from '@radix-ui/react-popover';
import {
  CreatePropertyDto,
  Flex,
  getOwnersProperty,
  PropertyResult,
} from '../../../../../../packages/ui/src';
import { useProperties, useProperty } from '@/lib/providers/property.provider';
import { Skeleton } from '@/lib/shadcn/components/ui/skeleton';
import { Switch } from '@/lib/shadcn/components/ui/switch';
import { TT } from '../../tooltip';
import { DeleteDialog } from '../../dialog/delete.dialog';
import { EditPropertyDialog } from '../../dialog/edit.property.dialog';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/lib/shadcn/components/ui/dialog';
import { PropertyFormProvider } from '../forms/add.property.form';
import { usePropertyFormContext } from '../forms/property.form.provider';
import { useEffect, useState } from 'react';

export function PropertyList() {
  const { properties } = useProperty();
  console.log('properties', properties);
  return (
    <PropertyFormProvider>
      <div className="p-2 bg-[#yellow] w-full rounded-md overflow-hidden">
        <PropertyFilter />
        <div className=" w-full">
          <div className="flex w-full overflow-auto p-4 scrollbar-hidden gap-5 ">
            {properties.map((a, b) => (
              <PropertyDetailDialog key={'pd' + b}>
                <PropertyCard key={b} a={a} b={b} />
              </PropertyDetailDialog>
            ))}
          </div>
        </div>
      </div>
    </PropertyFormProvider>
  );
}

const PropertyDetailDialog = ({ children }: { children: React.ReactNode }) => {
  const { data: c } = useProperty();
  const { setData } = usePropertyFormContext();

  useEffect(() => {
    setData(c as CreatePropertyDto);
    return () => {};
  }, []);

  return (
    <Dialog modal={false}>
      <DialogTrigger asChild>
        <div>{children}</div>
      </DialogTrigger>
      <DialogContent className=" flex justify-center w-3/4 h-3/4 items-center bg-gradient-to-r from-l_f_f  to-l_f_s  data-[state=open]:border-[0.5px] data-[state=open]:border-button">
        <DialogTitle></DialogTitle>
        <Flex
          iscol
          className="w-full gap-3 h-full overflow-y-scroll scrollbar-hidden shrink-0"
        >
          <Flex
            iscol
            center={true}
            className=" p-1 w-full  max-md:w-full min-md:w-full gap-3 scrollbar-hidden"
          >
            <Flex className="w-full gap-2 items-center justify-between ">
              <Flex className="gap-2 items-center">
                <div className="bg-button rounded-sm h-fit p-1">
                  <HouseIcon size={20} />
                </div>
                <p className="text-2xl text-gray-400">Property Detail</p>
                {/* <Badge className="ring ring-button h-fit">{c?.type}</Badge> */}
                <div className=" bg-[linear-gradient(125deg,rgba(255,255,255,0.10),rgba(255,255,255,0.02))] border-t border-t-[rgba(255,255,255,0.25)] rounded-xl px-4 py-1 text-xs ">
                  apartment
                </div>
              </Flex>

              <Flex className="gap-4">
                <DeleteDialog>
                  <TT message="delete property">
                    <Trash2Icon size={15} className="" />
                  </TT>
                </DeleteDialog>
                <EditPropertyDialog property={c as CreatePropertyDto}>
                  <TT message={'edit property'}>
                    <Edit2Icon size={15} className="cursor-pointer" />
                  </TT>
                </EditPropertyDialog>
              </Flex>
            </Flex>
            <Flex className="w-full gap-2">
              <Flex className="w-full gap-5">
                <Skeleton className="h-100 w-full bg-gray-500/40">
                  {''}
                </Skeleton>
                <Skeleton className="h-100 w-full bg-gray-500/40">
                  {''}
                </Skeleton>
              </Flex>
              <Flex iscol className="gap-2 justify-between h-100">
                <Skeleton className="w-28 h-30 bg-gray-500/20 rounded-md"></Skeleton>
                <Skeleton className="w-28 h-30 bg-gray-500/20 rounded-md"></Skeleton>
                <Skeleton className="w-28 h-30 bg-gray-500/20 rounded-md"></Skeleton>
                <Skeleton className="w-28 h-30 bg-gray-500/20 rounded-md"></Skeleton>
              </Flex>
            </Flex>
            <Flex className="w-full">
              <Flex iscol className="w-full gap-2">
                <Flex className="w-full justify-between">
                  <p className="text-2xl text-muted">{c?.name}</p>
                  <p className="text-2xl text-muted">
                    R {formatter.format(Number(c?.price))}
                  </p>
                </Flex>
                <Flex className="gap-3">
                  <Badge className="rounded-sm ring-indigo-400 ring">
                    <BathIcon /> <p>{c?.bathrooms} baths</p>
                  </Badge>
                  <Badge className="rounded-sm  text-xs ring ring-emerald-500">
                    <BedIcon /> <p>{c?.bedrooms} bed</p>
                  </Badge>
                  <Badge className="rounded-sm  text-xs ring ring-amber-500">
                    <Ruler />{' '}
                    <p>
                      {c?.squareFeet}m<sup>2</sup>
                    </p>
                  </Badge>
                </Flex>
                <Flex className=" items-center gap-2 text-muted-foreground">
                  <PinIcon size={17} />
                  <span>
                    {c?.address} {c?.country}
                  </span>
                </Flex>
                <Flex iscol className="gap-2">
                  <h1 className="text-lg font-light">Description</h1>
                  <p className="text-sm text-muted-foreground">
                    {c?.description}
                  </p>
                </Flex>

                <Flex className="gap-2 items-center text-sm">
                  <Badge className="ring ring-button p-1">
                    <ArmchairIcon size={20} /> <span>furnished</span>
                    <Switch
                      checked={c?.isFurnished}
                      className="data-[state=checked]:bg-button"
                    />
                  </Badge>
                  <Badge className="ring ring-button p-1">
                    <ArmchairIcon size={20} /> <span>isForRent</span>
                    <Switch
                      checked={c?.isForRent}
                      className="data-[state=checked]:bg-button"
                    />
                  </Badge>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
          <Flex iscol className="gap-2 w-full  shrink-0">
            <p className="text-xl">Units</p>
            <Flex className=" gap-5 overflow-hidden w-full">
              <div className=" flex gap-2 overflow-x-scroll bar rounded-md p-2">
                {[1, 2, 3, 4, 5, 6, 7, 223, 24334, 323, 33].map((c) => (
                  <Skeleton
                    key={c}
                    className="shrink-0 bg-gray-500/40 w-[300px] h-[200px] max-sm:w-full"
                  ></Skeleton>
                ))}
              </div>
            </Flex>
          </Flex>
        </Flex>
      </DialogContent>
    </Dialog>
  );
};

const PropertyFilter = () => {
  return (
    <div className="flex flex-col gap-3 mb-5">
      <div>
        <h1 className="text-xl">Property List</h1>
        <p className="text-sm text-muted-foreground">
          Browse and manage all properties associated with your account. Each
          item shows a thumbnail and key details such as address, price, and
          status, with quick actions for viewing, editing, or sharing.
        </p>
      </div>
      <div className="w-full flex justify-between p-2  #ring rounded-xl">
        <div className="flex gap-2 ">
          <Popover>
            <PopoverTrigger className="flex  gap-2">
              <label
                htmlFor="prop-search"
                className="flex items-center ring-1 ring-muted/40 rounded-md px-1"
              >
                <SearchIcon size={20} />
                <input
                  id="prop-search"
                  name="prop-search"
                  list="search-suggestions"
                  className="placeholder:text-sm p-1 placeholder:p-2 text-sm  outline-none"
                  placeholder="search for property"
                />
              </label>
              <div>
                <div className="p-2 rounded-md text-xs cursor-pointer bg-button">
                  search
                </div>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] bg-l_f_f p-0  rounded-md ">
              <PopoverArrow />
              <div className="text-xs cursor-pointer text-white rounded-md p-1 px-4 bg-l_f_s hover:bg-button">
                {'name:"Sunset Dream Estate"'}
              </div>
              <div className="text-xs cursor-pointer text-white rounded-md p-1 px-4 bg-l_f_s hover:bg-button">
                {'name:"Sunset Dream Estate"'}
              </div>
              <div className="text-xs cursor-pointer text-white rounded-md p-1 px-4 bg-l_f_s hover:bg-button">
                {'name:"Sunset Dream Estate"'}
              </div>
              <div className="text-xs cursor-pointer text-white rounded-md p-1 px-4 bg-l_f_s hover:bg-button">
                {'name:"Sunset Dream Estate"'}
              </div>
            </PopoverContent>
          </Popover>
          <div className="flex justify-center items-center bg-button px-2 text-sm rounded-md ">
            sort
            <ChevronDown size={15} />
          </div>
        </div>

        <div className="bg-button flex rounded-md p-0.5 text-sm items-center px-2 gap-2">
          filter <ChevronDown size={15} />
        </div>
      </div>
    </div>
  );
};
function PropertyCard({ b, a }: { b: number; a: PropertyResult }) {
  const { setProperty } = useProperty();
  return (
    <div
      onClick={() => setProperty(a)}
      key={b}
      className="h-fit  rounded-lg gap flex flex-col gap-2 ring ring-button  cursor-pointer w-fit shadow-black shadow-2xs"
    >
      <div className=' rounded-t-lg h-40 w-full bg-[url("/prop.jpg")] bg-cover bg-no-repeat'>
        <div className="w-full px-2 py-2 flex justify-end">
          <Badge className="bg-gradient-to-r from-dialog-color backdrop-blur-xs ring to-dsc  flex text-[10px]">
            {a.isForRent ? 'Available' : 'rented'}
          </Badge>
        </div>
      </div>
      <div className="flex text-2xs">
        <div className="flex justify-between w-full text-xs px-2">
          <p>{a.name}</p>
          <p>R {formatter.format(Number(a.price))}</p>
        </div>
      </div>
      <div className="flex px-2  w-[300px] justify-left gap-2 items-center">
        <MapPin size={20} />
        <p className=" break-words text-muted-foreground overflow-hidden w-full text-[10px] h-4">
          {a.address}
        </p>
      </div>
      <div className="px-2 mb-5 flex gap-2">
        {/* <Badge className='text-xs bg-d-background ring rounded-sm'>{a.type}</Badge> */}
        <Badge className="rounded-sm">
          <BathIcon /> <p>{a.bathrooms}</p>
        </Badge>
        <Badge className="rounded-sm  text-xs">
          <BedIcon /> <p>{a.bedrooms}</p>
        </Badge>
        <Badge className="rounded-sm  text-xs">
          <Ruler />{' '}
          <p>
            {a.squareFeet}m<sup>2</sup>
          </p>
        </Badge>
      </div>
    </div>
  );
}
