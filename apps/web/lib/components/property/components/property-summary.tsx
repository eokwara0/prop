'use client';

import { useAuthId } from '@/lib/providers/auth.provider';
import { useEffect, useState, useTransition } from 'react';
import {
  getOwnersProperty,
  PropertyResult,
} from '../../../../../../packages/ui/src';
import { Skeleton } from '@/lib/shadcn/components/ui/skeleton';

export function PropertySummaryCards() {
  const id = useAuthId();
  const [data, setData] = useState<PropertyResult[]>();
  const [ispending, start] = useTransition();
  useEffect(() => {
    const getData = async () => {
      if (id) {
        const result = await getOwnersProperty(id);
        setData(result.data);
      }
    };

    start(getData);
  }, [id]);
  return !ispending && data ?  (
    <>
      <div className="  max-md:grid  min-md:flex  max-md:grid-cols-1 gap-4 w-full p-2 overflow-x-scroll scrollbar-hidden">
        {...data!.slice(5).map((x) => (
          <div
            key={x.id}
            className={`text-center flex justify-center items-center w-90 rounded-lg backdrop-blur-lg shadow-md shadow-black  inset-shadow-2xs inset-shadow-accent/50 text-xs h-60`}
          >
            {x.name}
          </div>
        ))}
      </div>
    </>
  ) : <div className='max-md:grid  min-md:flex  max-md:grid-cols-1 gap-4 w-full p-2'>
    {
        ...[1,2,3,4,5].map((c) => (
            <Skeleton key={c} className='h-60 w-full'/>
        ))
    }
  </div>
}
