"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  name: string;
  email: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  date: string;
};

const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
];

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-hidden rounded-md border">
      <Table>
        <TableHeader>
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export function TableExample() {
  const data: Payment[] = [
    {
      id: "728ed52f",
      name: "Meera Sharma",
      email: "m@example.com",
      amount: 100,
      status: "pending",
      date: "2026-03-01",
    },
    {
      id: "a3b1c9d4",
      name: "Sarah Johnson",
      email: "sarah@example.com",
      amount: 2500,
      status: "success",
      date: "2026-02-28",
    },
    {
      id: "e7f2a8b1",
      name: "John Doe",
      email: "john@example.com",
      amount: 750,
      status: "processing",
      date: "2026-03-03",
    },
    {
      id: "c4d6e9f2",
      name: "Priya Patel",
      email: "priya@example.com",
      amount: 4200,
      status: "failed",
      date: "2026-02-25",
    },
    {
      id: "b8a3d1e5",
      name: "Alex Chen",
      email: "alex@example.com",
      amount: 1800,
      status: "success",
      date: "2026-03-04",
    },
  ];

  return <DataTable columns={columns} data={data} />;
}
