'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/lib/shadcn/components/ui/dialog';
import PropertyForm from '../property/forms/add.property.form';

export function EditPropertyDialog({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className=" px-0 bg-gradient-to-tr from-dialog-color to-dsc w-fit backdrop-blur-xs">
        <DialogTitle className=''>
        </DialogTitle>
        <PropertyForm />
      </DialogContent>
    </Dialog>
  );
}
