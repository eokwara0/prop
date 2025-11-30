'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/lib/shadcn/components/ui/dialog';
import PropertyEditForm from '../property/forms/property.edit.form';
import { CreatePropertyDto } from '../../../../../packages/ui/src';

type PropertyCardProps = {
  children: React.ReactNode;
  property: CreatePropertyDto;
};


export function EditPropertyDialog({
  children,
  property
}: PropertyCardProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>
          {children}
        </div>
      </DialogTrigger>
      <DialogContent className=" px-0 bg-gradient-to-tr from-dialog-color to-dsc w-fit backdrop-blur-xs">
        <DialogTitle className=''>
        </DialogTitle>
        <PropertyEditForm  data={property} />
      </DialogContent>
    </Dialog>
  );
}
