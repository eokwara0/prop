'use client';

import { Dialog, DialogContent, DialogTrigger } from "@/lib/shadcn/components/ui/dialog";

export function DeleteDialog({children}:{children : React.ReactNode}){

    return (
        <Dialog modal={false}>
            <DialogTrigger>{children}</DialogTrigger>
            <DialogContent className="bg-gradient-to-br from-dialog-color to-dsc w-fit">
                <p>information</p>
            </DialogContent>
        </Dialog>
    );
}