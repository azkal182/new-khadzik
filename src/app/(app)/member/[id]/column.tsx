import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { formatDate, formatRibuan } from "@/utils";

export interface IMemberDebts {
  id: number;
  name: string;
  type?: null;
  qty?: number;
  price: string;
  debit?: number;
  credit?: number;
  remainingDebt?: number;
  createdAt: Date;
}

export const columns: ColumnDef<IMemberDebts>[] = [
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
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tanggal
          <CaretSortIcon className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className='uppercase'>{formatDate(row.getValue("createdAt"))}</div>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nama
          <CaretSortIcon className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => <div className='uppercase'>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tipe
          <CaretSortIcon className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => <div className='lowercase'>{row.getValue("type")}</div>,
  },
  {
    accessorKey: "qty",
    header: () => <div className='text-right'>Jumlah</div>,
    cell: ({ row }) => (
      <div className='text-right lowercase'>{row.getValue("qty")}</div>
    ),
  },
  {
    accessorKey: "price",
    header: () => <div className='text-right'>Harga</div>,
    cell: ({ row }) => (
      <div className='text-right lowercase'>
        {row.original.price !== undefined &&
        row.original.price.toString() !== "0"
          ? formatRibuan(row.original.price as any)
          : ""}
      </div>
    ),
  },
  {
    accessorKey: "debit",
    header: () => <div className='text-right'>Total</div>,
    cell: ({ row }) => (
      <div className='text-right lowercase'>
        {row.original.debit !== undefined &&
        row.original.debit.toString() !== "0"
          ? formatRibuan(row.original.debit)
          : ""}
      </div>
    ),
  },
  {
    accessorKey: "credit",
    header: () => <div className='text-right'>Bayar</div>,
    cell: ({ row }) => (
      <div className='text-right lowercase'>
        {row.original.credit !== undefined &&
        row.original.credit.toString() !== "0"
          ? formatRibuan(row.original.credit)
          : ""}
      </div>
    ),
  },
  {
    accessorKey: "remainingDebt",
    header: () => <div className='text-right'>Sisa</div>,
    cell: ({ row }) => (
      <div className='text-right lowercase'>
        {row.original.remainingDebt !== undefined &&
        row.original.remainingDebt.toString() !== "0"
          ? formatRibuan(row.original.remainingDebt)
          : ""}
      </div>
    ),
  },
];
