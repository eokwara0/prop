import { Button } from '@/lib/shadcn/components/ui/button';
import { Flex } from '../../../../../../packages/ui/src';
import { PlusIcon } from 'lucide-react';

export default function Units() {
  return (
    <div className="min-h-full w-full overflow-y-scroll flex scrollbar-hidden flex-col items-center  bg-gradient-to-r from-l_f_f to-l_f_s min-md:px-10">
      <div className="h-10"></div>
      <Flex className=" justify-between w-full">
        <div className=" text-xl">Unit Management</div>
        <Button className="bg-button text-xs gap-1">
          <PlusIcon />
          <p>Add Unit</p>
        </Button>
      </Flex>
    </div>
  );
}
