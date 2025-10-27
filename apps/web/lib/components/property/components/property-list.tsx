'use client';
import {
  BathIcon,
  BedIcon,
  ChevronDown,
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
import { Button } from '@/lib/shadcn/components/ui/button';

export function PropertyList() {
  const data = useProperty();
  return (
    <div className="w-full p-2">
      <PropertyFilter />
      <div className="flex flex-wrap gap-5 gap-x-10 w-full  justify-center">
        {...data.map((a, b) => (
          <div
            key={b}
            className="h-fit rounded-lg gap flex flex-col gap-2 ring  cursor-pointer w-fit"
          >
            <div className=' rounded-t-lg h-40 w-[300px] bg-[url("/prop.jpg")] bg-cover bg-no-repeat'>
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
        ))}
      </div>
    </div>
  );
}

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
          {/* <datalist id="search-suggestions" className='bg-button'>
                <option value="name:'Sunset Gardens'"></option>
                <option value="type:condo"></option>
            </datalist> */}
          <Popover>
            <PopoverTrigger className="flex  gap-2">
              <label
                htmlFor="prop-search"
                className="flex items-center ring-1 ring-muted/40 rounded-md p-1"
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
                <Button type="submit" className="cursor-pointer bg-button">
                  search
                </Button>
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
