"use Customer";
import { useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { PiCaretUpDown } from "react-icons/pi";
import { Button } from "@/components/ui/button";
import { BsThreeDots } from "react-icons/bs"; // import { Checkbox } from "@/components/ui/checkbox";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

const initialData: Customer[] = [
  {
    id: "m5gr84i9",
    name: "Luis Felipe Vanin",
    phone: "(84) 99118-8973",
    createdAt: new Date(),
    email: "ken99@yahoo.com",
  },
  {
    id: "3u1reuv4",
    name: "Ken House",
    phone: "(84) 99118-8973",
    createdAt: new Date(),
    email: "Abe45@gmail.com",
  },
  {
    id: "derv1ws0",
    name: "Jonh Doe",
    phone: "(84) 99118-8973",
    createdAt: new Date("2021-09-01"),
    email: "Monserrat44@gmail.com",
  },
  {
    id: "5kma53ae",
    name: "Kevin",
    phone: "(84) 99118-8973",
    createdAt: new Date(),
    email: "Silas22@gmail.com",
  },
  {
    id: "bhqecj4p",
    name: "Ken",
    phone: "(84) 99118-8973",
    createdAt: new Date(),
    email: "carmella@hotmail.com",
  },
];

export type Customer = {
  id: string;
  email: string;
  name: string;
  phone: string;
  createdAt: Date;
};

export function CustomerTable({
  onCustomerDelete,
}: {
  onCustomerDelete?: (id: string) => void;
}) {
  const [Customers, setCustomers] = useState<Customer[]>(initialData);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  setCustomers;

  const columns: ColumnDef<Customer>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "email",
      header: () => {
        return <div className="">Email</div>;
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("email")}</div>
      ),
    },
    {
      accessorKey: "phone",
      header: () => {
        return <div className="">Phone</div>;
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("phone")}</div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 pl-0 text-left hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <PiCaretUpDown />
        </Button>
      ),
      enableSorting: true,
      cell: ({ row }) => {
        const date = row.getValue<Date>("createdAt");

        return (
          <div className="text-left font-medium">
            {date.toLocaleDateString()}
          </div>
        );
      },
    },
    {
      accessorKey: "action",
      header: () => {
        return <div className=""></div>;
      },
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0"
            >
              <BsThreeDots size="1.5rem" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <Link to={`/customer/update/${row.original.id}`}>
              <DropdownMenuItem>Edit Customer</DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="hover:!bg-destructive/90 hover:!text-white"
              onClick={() => onCustomerDelete?.(row.original.id)}
            >
              Delete Customer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const table = useReactTable<Customer>({
    data: Customers,
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
    },
  });

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table className="rounded-md">
          <TableHeader className="">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
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
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
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
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            className="bg-popover"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            className="bg-popover"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
