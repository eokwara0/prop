'use client';
import { useEffect, useState } from 'react';
import {
  getPropertyStats,
  PropertyStatsResult,
} from '../../../../../../packages/ui/src';
import { useAuthId } from '@/lib/providers/auth.provider';
import { BadgeEuro, BirdIcon, CherryIcon, DramaIcon } from 'lucide-react';
import { formatter } from '@/lib/providers/number.format';

export function usePropertyStats() {
  const id = useAuthId();
  const [data, setState] = useState<PropertyStatsResult>();
  useEffect(() => {
    const getStats = async () => {
      const result = await getPropertyStats(id as string);
      setState(result.data);
    };
    getStats();
    return () => {};
  }, [id, setState]);
  return data;
}

export default function PropertyStats() {
  const data = usePropertyStats();

  if (data !== undefined) {
    console.log(Object.entries(data));
  }
  return (
    <div className="max-md:flex max-md:overflow-x-scroll scrollbar-hidden  min-md:flex  max-md:grid-cols-1 gap-4 w-full p-2">
      {data !== undefined ? (
        [
          ...Object.entries(data!)
            .slice(2)
            .map((a, b) => {
              return (
                <div
                  key={b}
                  className={`text-center flex flex-col gap-3 justify-left px-4 py-4 items-left w-full rounded-lg backdrop-blur-sm shadow-md shadow-black  inset-shadow-2xs inset-shadow-accent/50 text-xs ${
                    b == 0
                      ? 'bg-gradient-to-tr from-button to-emerald-500'
                      : b == 1
                        ? 'bg-gradient-to-tr from-sky-400 to-emerald-600'
                        : b == 2
                          ? 'bg-gradient-to-tr from-indigo-300 to-emerald-600'
                          : b == 3
                            ? '  bg-gradient-to-tr from-pink-400 to-pink-500'
                            : 'bg-gradient-to-br from-amber-300 to-amber-500'
                  } h-40`}
                >
                  {b == 0 ? (
                    <PropertyStatsCard title="Property count" value={`${a[1]}`}>
                      <BirdIcon />
                    </PropertyStatsCard>
                  ) : b === 1 ? (
                    <PropertyStatsCard
                      title="Portfolio value"
                      value={`R${formatter.format(Number(a[1]))}`}
                    >
                      <BadgeEuro />
                    </PropertyStatsCard>
                  ) : b === 2 ? (
                    <PropertyStatsCard
                      title="Available Properties"
                      value={`${a[1]}`}
                    >
                      <CherryIcon />
                    </PropertyStatsCard>
                  ) : b === 3 ? (
                    <PropertyStatsCard
                      title="Rented properties"
                      value={`${a[1]}`}
                    >
                      <DramaIcon />
                    </PropertyStatsCard>
                  ) : (
                    <></>
                  )}
                </div>
              );
            }),
        ]
      ) : (
        <div>ab</div>
      )}
    </div>
  );
}

function PropertyStatsCard({
  title,
  value,
  children,
}: {
  title: string;
  value: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col justify-between gap-10 max-md:w-[300px]">
      <div className="flex justify-between items-center">
        <h1 className=" text-muted text-lg text-left">{title}</h1>
        {children}
      </div>
      <div className="text-left text-2xl  h-20  rounded-md p-2 ">{value}</div>
    </div>
  );
}
