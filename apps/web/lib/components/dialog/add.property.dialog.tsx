'use client';
import { ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { useIsMobile } from '../sidebar/use-mobile';
import { Separator } from '@radix-ui/react-dropdown-menu';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/lib/shadcn/components/ui/sheet';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
} from '@/lib/shadcn/components/ui/dialog';
import PropertyForm from '../property/forms/add.property.form';

export function AddPropertyDialog({ children }: { children: ReactNode }) {
  const t = useTranslations('Property');
  const ismobile = useIsMobile();
  return ismobile ? (
    <Sheet modal={false}>
      <SheetTrigger
        className=" max-sm:w-full max-sm:flex max-sm:justify-start"
        asChild
      >
        <div className="w-full flex justify-start">{children}</div>
      </SheetTrigger>
      <SheetContent
        style={{ height: 400 }}
        side="bottom"
        className="shadow-md shadow-black/40 inset-shadow-2xs inset-shadow-muted/10 m-3 rounded-md outline-none  border-none  ring-1 ring-muted/40  backdrop-blur-md bg-gradient-to-br from-dialog-color to-dialog-color"
      >
        <SheetHeader className="p-0">
          <SheetTitle className="flex items-center text-sm text-muted/80 font-light px-3 py-2">
            {t('AddHeader')}
          </SheetTitle>
          <Separator className=" bg-button/30" style={{ height: 0.5 }} />
        </SheetHeader>
        <div className="flex flex-col gap-4 px-1 py-1 justify-between items-center overflow-y-auto">
          <div className="flex flex-col justify-start w-full gap-2">
            <div className="w-full overflow-y-auto">
              <div className="size-10"></div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  ) : (
    <Dialog modal={false}>
      <DialogTrigger className="" asChild>
        {children}
      </DialogTrigger>
      <DialogContent className=" rounded-2xl gap-0 w-fit  min-h-fit ring-1 ring-muted/30 outline-none  border-none  p-0 backdrop-blur-md bg-gradient-to-br from-dialog-color to-dialog-color shadow-md shadow-black/30  inset-shadow-2xs inset-shadow-muted/10 text-xs #bg-pink-500">
        <DialogHeader className="h-fit gap-0  py-2 border-b border-b-muted/30">
          <DialogTitle className="  text-lg text-left  text-muted/40 font-light px-5">
            {t('AddHeader')}
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 h-full #bg-amber-200  items-center">
          <div className="flex flex-col justify-start w-full gap-2">
            <div className="w-full flex flex-col justify-start">
              <PropertyForm />
            </div>
          </div>
          <div className="size-5"></div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
