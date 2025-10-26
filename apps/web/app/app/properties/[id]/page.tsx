import { getTranslations } from 'next-intl/server';
import { AnimatedHeader } from '../../../../lib/components/animated/animated.header';
import { DialogComponent } from '../../../../lib/components/dialog/dialog';
import { BadgePlusIcon } from 'lucide-react';
import PropertyStats from '@/lib/components/property/components/property-stas';

export default async function Properties() {
  const t = await getTranslations('Property');
  return (
      <div className=" min-h-full w-full flex flex-col items-center  bg-gradient-to-r from-l_f_f to-l_f_s min-md:px-10">
      <div className="h-10"></div>
      <div className="flex flex-col justify-start w-full p-2 gap-3">
        <div className="flex justify-between max-sm:flex-col max-sm:gap-3 max-sm:justify-start">
          <AnimatedHeader />
          <DialogComponent>
            <div className=" p-2 flex justify-center gap-2 items-center rounded-md w-full cursor-pointer bg-button py-2 px-5  shadow-xs shadow-black/50  inset-shadow-2xs inset-shadow-accent/50 text-sm">
              <BadgePlusIcon size={20}/>
              Add
            </div>
          </DialogComponent>
        </div>
        <p className=" w-full text-muted-foreground text-[1rem] max-md:w-full max-md:p-2">
          {t('description')}
        </p>
      </div>
      <PropertyStats>
      </PropertyStats>
    </div>
  );
    
}
