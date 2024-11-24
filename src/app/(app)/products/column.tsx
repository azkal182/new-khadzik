import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { CaretSortIcon } from "@radix-ui/react-icons";

export type TProduct = {
  id: string;
  description?: string;
  name: string;
  type?: string;
  regularPrice: number;
  packingPrice: number;
};

export const columns: ColumnDef<TProduct>[] = [
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
    accessorKey: "type",
    size: 25,
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Type
          <CaretSortIcon className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => <div className='lowercase'>{row.getValue("type")}</div>,
  },
  {
    accessorKey: "regularPrice",
    enableResizing: false,
    size: 200,
    header: () => <div className='text-right'>Price</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("regularPrice"));

      // Format the amount as a Rupiah
      const formatted = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(amount);

      return <div className='text-right font-medium'>{formatted}</div>;
    },
  },
  {
    accessorKey: "packingPrice",
    header: () => <div className='text-right'>Price+</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("packingPrice"));

      // Format the amount as a Rupiah
      const formatted = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(amount);

      return <div className='text-right font-medium'>{formatted}</div>;
    },
  },
];
