'use client';
import {
  BathIcon,
  BedIcon,
  ChevronDown,
  HouseIcon,
  MapPin,
  Ruler,
  SearchIcon,
} from 'lucide-react';
import { useProperty } from './property-table';
import { formatter } from '@/lib/providers/number.format';
import { Badge } from '@/lib/shadcn/components/ui/badge';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/lib/shadcn/components/ui/popover';
import { PopoverArrow } from '@radix-ui/react-popover';
import { FlexContainer, PropertyResult } from '../../../../../../packages/ui/src';
import { usePropertyEdit } from '@/lib/providers/property.provider';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/lib/shadcn/components/ui/drawer';
import { Skeleton } from '@/lib/shadcn/components/ui/skeleton';

export function PropertyList() {
  const data = useProperty();
  return (
    <div className="w-full p-2">
      <PropertyFilter />
      <div className="flex flex-wrap gap-5 gap-x-15 w-full  justify-center">
        {...data.map((a, b) => (
          <PropertyEditDrawer>
            <PropertyCard key={b} a={a} b={b} />
          </PropertyEditDrawer>
        ))}
      </div>
    </div>
  );
}

const PropertyEditDrawer = ({ children }: { children: React.ReactNode }) => {
  const { data: c } = usePropertyEdit();
  return (
    <Drawer modal={false} >
      <DrawerTrigger>{children}</DrawerTrigger>
      <DrawerContent className='flex justify-center items-center bg-gradient-to-tr from-dialog-color to-dsc'>
        <DrawerTitle></DrawerTitle>
        <FlexContainer iscol center={true} className='p-4 h-1/2  w-1/2 gap-3'>
          <FlexContainer className='w-full gap-2 items-center'>
            <div className='bg-indigo-300 rounded-sm h-fit p-1'>
              <HouseIcon size={20}/>
            </div>
            <p className='text-2xl text-gray-400'>Property Detail Page</p>
          </FlexContainer>
          <FlexContainer  className='w-full gap-2'>
            <Skeleton className='h-100 w-full bg-gray-500/40'>
              {''}
            </Skeleton>
            <FlexContainer iscol className='gap-2 justify-between h-100'>
               <Skeleton className='w-28 h-30 bg-gray-500/20 rounded-md'></Skeleton>
               <Skeleton className='w-28 h-30 bg-gray-500/20 rounded-md'></Skeleton>
               <Skeleton className='w-28 h-30 bg-gray-500/20 rounded-md'></Skeleton>
               <Skeleton className='w-28 h-30 bg-gray-500/20 rounded-md'></Skeleton>
            </FlexContainer>
          </FlexContainer>
          <FlexContainer className='w-full'>
            <FlexContainer iscol className='w-full gap-2'>
            <p className='text-2xl text-muted'>{c?.name}</p>
            <p className='text-sm text-muted-foregro'>{c?.description}</p>
            </FlexContainer>

          </FlexContainer>
        </FlexContainer>
      </DrawerContent>
    </Drawer>
  );
};

const PropertyFilter = () => {
  return (
    <div className="flex flex-col gap-3 mb-5">
      <div>
        <h1 className="text-xl"> View Properties</h1>
        <p className="text-sm text-muted-foreground">
          Browse and manage all properties associated with your account. Each
          item shows a thumbnail and key details such as address, price, and
          status, with quick actions for viewing, editing, or sharing. Use the
          filters and sorting controls to narrow results by location, price, or
          availability — the list updates responsively for smaller screens.
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
function PropertyCard({
  b,
  a,
}: {
  b: number;
  a: PropertyResult;
}) {
  const { setProperty: cc } = usePropertyEdit();
  return (
    <div
      onClick={() => cc(a)}
      key={b}
      className="h-fit flex-1 rounded-lg gap flex flex-col gap-2 ring ring-button  cursor-pointer w-fit shadow-black shadow-2xs"
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
