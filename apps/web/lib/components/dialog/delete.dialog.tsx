'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/lib/shadcn/components/ui/dialog';
import { AlertCircleIcon } from 'lucide-react';
import { useState, useTransition } from 'react';
import Loader from '../loader/loader';
export function DeleteDialog({ children }: { children: React.ReactNode }) {
  const [disabled, setEnable] = useState(true);
  const [pending] = useTransition();

  const handleSubmit = () => {};
  return (
    <Dialog modal={true}>
      <DialogTrigger asChild>
        <div>{children}</div>
      </DialogTrigger>
      <DialogContent className=" w-4/12 bg-gradient-to-tr from-dialog-color to-dsc ring-0 outline-0 border-0">
        <DialogHeader>
          <DialogTitle className="flex gap-2 items-center">
            <AlertCircleIcon size={20} />
            <span>Are you absolutely sure?</span>
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            property and remove your property data from our servers.
          </DialogDescription>
        </DialogHeader>
        <div>
          <input
            onChange={(e) => {
              if (e.currentTarget.value.toLowerCase() === 'delete') {
                setEnable(false);
              } else {
                setEnable(true);
              }
            }}
            type="text"
            name="delete-confirm"
            id="delete-confirm"
            className="ring-1 w-full rounded-md p-2 text-red-600 outline-0 placeholder:text-white placeholder:text-xs"
            placeholder="Type delete to erase your property"
          />
        </div>
        <DialogFooter>
          {!pending ? (
            <button
              disabled={disabled}
              onClick={handleSubmit}
              className={` ${disabled ? 'bg-muted-foreground' : 'bg-red-600'} cursor-pointer p-1 rounded-md `}
            >
              Continue
            </button>
          ) : (
            <Loader />
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
