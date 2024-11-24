import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { formatRibuan } from "@/utils";
import * as React from "react";

export type TMember = {
  id: string;
  name: string;
  address?: string | undefined;
  phone?: string | undefined;
  saldo?: number | undefined;
};

export const columns: ColumnDef<TMember>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <CaretSortIcon className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => <div className='uppercase'>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "address",
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Address
          <CaretSortIcon className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className='lowercase'>{row.getValue("address")}</div>
    ),
  },
  {
    accessorKey: "phone",
    header: () => <div className='text-right'>phone</div>,
    cell: ({ row }) => <div className='lowercase'>{row.getValue("phone")}</div>,
  },
  {
    accessorKey: "saldo",
    header: () => <div className='text-right'>Saldo</div>,
    cell: ({ row }) => (
      <div className='text-right lowercase'>
        {formatRibuan(row.getValue("saldo"))}
      </div>
    ),
  },
];
