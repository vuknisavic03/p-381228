import React from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronRight } from "lucide-react";

type Transaction = {
  id: number;
  type: "revenue" | "expense";
  amount: number;
  date: Date;
  category: string;
  paymentMethod: string;
  from: string;
  notes?: string;
  status: string;
  selectedListingId: string; // Added this field
};

interface TransactionTableProps {
  transactions: Transaction[];
  onEdit: (tx: Transaction) => void;
}

export const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
  onEdit,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto transition-all">
      <Table className="text-sm font-normal">
        <TableHeader className="sticky top-0 bg-white/95 backdrop-blur z-20 border-b border-gray-100">
          <TableRow>
            <TableHead className="pl-6 py-3 font-semibold text-gray-700">Amount</TableHead>
            <TableHead className="min-w-[100px] font-semibold text-gray-700">Type</TableHead>
            <TableHead className="min-w-[120px] font-semibold text-gray-700">Date</TableHead>
            <TableHead className="min-w-[110px] font-semibold text-gray-700">Category</TableHead>
            <TableHead className="min-w-[120px] font-semibold text-gray-700">From/To</TableHead>
            <TableHead className="min-w-[110px] font-semibold text-gray-700">Payment</TableHead>
            <TableHead className="min-w-[110px] font-semibold text-gray-700">Status</TableHead>
            <TableHead className="min-w-[110px] font-semibold text-gray-700">Notes</TableHead>
            <TableHead className="w-10 text-right pr-4" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((tx) => (
            <TableRow
              key={tx.id}
              className="border-b last:border-b-0 border-gray-100 group text-sm transition-all hover:bg-gray-50"
              style={{ background: "none" }}
            >
              <TableCell className="pl-6 font-medium text-gray-900 py-4">
                <span className="flex items-center gap-1">
                  {tx.type === "revenue" ? (
                    <span className="text-green-600 font-semibold bg-green-50 rounded px-2 py-0.5">
                      +${tx.amount.toLocaleString()}
                    </span>
                  ) : (
                    <span className="text-red-500 font-semibold bg-red-50 rounded px-2 py-0.5">
                      -${tx.amount.toLocaleString()}
                    </span>
                  )}
                </span>
              </TableCell>
              <TableCell className="py-4">
                <span className="text-gray-700">{tx.type === "revenue" ? "Revenue" : "Expense"}</span>
              </TableCell>
              <TableCell className="py-4">
                <span className="text-gray-500">{tx.date.toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}</span>
              </TableCell>
              <TableCell className="py-4">
                <span className="px-2 py-0.5 rounded bg-gray-50 text-gray-600 border border-gray-100">
                  {tx.category}
                </span>
              </TableCell>
              <TableCell className="py-4">
                <span className="text-gray-700">{tx.from}</span>
              </TableCell>
              <TableCell className="py-4">
                <span className="px-2 py-0.5 rounded bg-gray-50 text-gray-600 border border-gray-100">
                  {tx.paymentMethod}
                </span>
              </TableCell>
              <TableCell className="py-4">
                <span
                  className={`px-2 py-0.5 rounded text-xs font-medium ${
                    tx.status === "completed"
                      ? "bg-green-50 text-green-700 border border-green-100"
                      : tx.status === "failed"
                      ? "bg-red-50 text-red-600 border border-red-100"
                      : "bg-gray-50 text-gray-700 border border-gray-100"
                  }`}
                >
                  {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                </span>
              </TableCell>
              <TableCell className="py-4">
                <span className="text-gray-400 truncate block max-w-[140px]">{tx.notes || "-"}</span>
              </TableCell>
              <TableCell className="pr-4 text-right py-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-gray-100 h-8 w-8 flex items-center justify-center transition"
                  onClick={() => onEdit(tx)}
                  aria-label="Edit transaction"
                >
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {transactions.length === 0 && (
        <div className="py-12 text-center text-gray-400 text-sm">
          No transactions found.
        </div>
      )}
    </div>
  );
};
