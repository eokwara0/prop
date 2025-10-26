'use client'
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemHeader,
  ItemMedia,
  ItemTitle,
} from '@/lib/shadcn/components/ui/item';
import { useProperty } from './property-table';
import { usePropertyStats } from './property-stas';

export function PropertyList() {
  const data = useProperty();
  return (
        <div className='overflow-y-scroll w-[400px] h-200 scrollbar-hidden px-2 gap-4 flex flex-col '>
        <div> <h2 className='text-2xl'>Properties</h2></div>

            {...data.map((c) => (
        <Item key={c.id} className='ring'>
          <ItemHeader>{c.name}</ItemHeader>
          <ItemMedia />
          <ItemContent>
            <ItemTitle>{c.description}</ItemTitle>
            <ItemDescription>{c.ownerId}</ItemDescription>
          </ItemContent>
          <ItemActions />
        </Item>
      ))}
        </div>
      
  );
}
