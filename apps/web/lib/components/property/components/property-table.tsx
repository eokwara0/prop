'use client';
import { useEffect, useState } from 'react';
import {
  getOwnersProperty,
  PropertyResult,
} from '../../../../../../packages/ui/src';
import { useAuthId } from '@/lib/providers/auth.provider';
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import { Checkbox } from '@/lib/shadcn/components/ui/checkbox';
import { Button } from '@/lib/shadcn/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/lib/shadcn/components/ui/dropdown-menu';
import { ArrowUpDown, ChevronDown, MoreVerticalIcon } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/lib/shadcn/components/ui/table';
import { Switch } from '@/lib/shadcn/components/ui/switch';
import { Badge } from '@/lib/shadcn/components/ui/badge';
import { Input } from '@/lib/shadcn/components/ui/input';

export function useProperty(): PropertyResult[] {
  const userID = useAuthId();
  const [data, setData] = useState<PropertyResult[]>([]);
  useEffect(() => {
    const getData = async () => {
      const result = (await getOwnersProperty(userID as string)).data;
      setData(result);
    };
    getData();
    return () => {};
  }, [userID, setData]);
  return data;
}

export const columns: ColumnDef<PropertyResult>[] = [
//   {
//     id: 'select',
//     header: ({ table }) => (
//       <Checkbox
//         checked={
//           table.getIsAllPageRowsSelected() ||
//           (table.getIsSomePageRowsSelected() && 'indeterminate')
          
//         }
//         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
//         aria-label="Select all"
//       />
//     ),
//     cell: ({ row }) => (
//       <Checkbox
//         checked={row.getIsSelected()}
//         onCheckedChange={(value) => row.toggleSelected(!!value)}
//         aria-label="Select row"
//       />
//     ),
//     enableSorting: false,
//     enableHiding: false,
//   },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant={'link'}
          className="text-white text-xs"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize text-xs">{row.getValue('name')}</div>
    ),
  },
  {
    accessorKey: 'address',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-white text-xs"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Address
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase text-xs">{row.getValue('address')}</div>
    ),
  },
  {
    accessorKey: 'price',
    header: () => <div className="text-right text-white text-xs">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('price'));
      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount);
      return <div className="text-right font-medium text-xs">{formatted}</div>;
    },
  },
  {
    accessorKey: 'type',
    header: ({ column }) => (
      <div
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className="text-xs text-white"
      >
        Property Type
      </div>
    ),
    cell : ({ row}) => <Badge className='bg-indigo-500'>{row.getValue('type')}</Badge>,
    enableResizing : true
  },{
    accessorKey : 'isForRent'
    ,header : ({column}) => <div className='text-white text-xs'>IsForRent</div>,
    cell : ({row}) => <Switch className=' data-[state=checked]:bg-indigo-400' checked={Boolean(row.getValue('isForRent'))}/>
  },

  {
    accessorKey: 'isActive',
    header: () => <div className="text-white"> IsActive</div>,
    cell: ({ row }) => {
      return (
        <div>
          <Switch
            className="bg-emerald-700 data-[state=checked]:bg-emerald-400"
            checked={Boolean(row.getValue('isActive'))}
          />
        </div>
      );
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="size-7">
              <MoreVerticalIcon size={12} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function PropertyTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const data: PropertyResult[] = useProperty();

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      columnOrder : ["name","type", 'price', 'isForRent', 'isActive']
    },
  });

  return (
    <>
      <div className="overflow-hidden border-b ">
        <Table className="">
          <TableHeader className='' >
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className='border-0 outline-0'>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className=' outline-0'>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="cursor-pointer border-0"
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className=''>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
