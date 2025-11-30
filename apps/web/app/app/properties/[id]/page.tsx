import { getTranslations } from 'next-intl/server';
import { AnimatedHeader } from '../../../../lib/components/animated/animated.header';
import { AddPropertyDialog } from '../../../../lib/components/dialog/add.property.dialog';
import { BadgePlusIcon } from 'lucide-react';
import PropertyStats from '@/lib/components/property/components/property-stats';
import { PropertyList } from '@/lib/components/property/components/property-list';
import { PropertyProvider } from '@/lib/providers/property.provider';

export default async function Properties() {
  const t = await getTranslations('Property');
  return (
      <div className=" min-h-full w-full overflow-y-scroll flex scrollbar-hidden flex-col items-center  bg-gradient-to-r from-l_f_f to-l_f_s min-md:px-10">
        <div className="h-10"></div>
        <div className="flex flex-col justify-start w-full p-2 gap-3">
          <div className="flex justify-between max-sm:flex-col max-sm:gap-3 max-sm:justify-start">
            <AnimatedHeader />
            <AddPropertyDialog>
              <div className="flex justify-between items-center gap-2  px-3 py-3 rounded-md  max-lg:flex-col max-lg:w-full cursor-pointer bg-button  shadow-xs shadow-black/50  inset-shadow-2xs inset-shadow-accent/50 text-sm">
                <BadgePlusIcon size={20} />
                Add
              </div>
            </AddPropertyDialog>
          </div>
          <p className=" w-full text-muted-foreground text-[1rem] max-md:w-full max-md:p-2">
            {t('description')}
          </p>
        </div>
        <PropertyStats/>
        <PropertyList />
      </div>
  );
}
