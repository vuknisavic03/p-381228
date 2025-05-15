
import React from "react";
import { Badge } from "@/components/ui/badge";
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
      <Table>
        <TableHeader className="sticky top-0 bg-white/90 backdrop-blur z-20 border-b border-gray-100">
          <TableRow>
            <TableHead className="pl-6 py-3 w-32 text-left">Amount</TableHead>
            <TableHead className="min-w-[120px]">Type</TableHead>
            <TableHead className="min-w-[140px]">Date</TableHead>
            <TableHead className="min-w-[120px]">Category</TableHead>
            <TableHead className="min-w-[140px]">From/To</TableHead>
            <TableHead className="min-w-[120px]">Payment</TableHead>
            <TableHead className="min-w-[120px]">Status</TableHead>
            <TableHead className="min-w-[140px]">Notes</TableHead>
            <TableHead className="w-12 text-right pr-4" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((tx) => (
            <TableRow
              key={tx.id}
              className="group border-b border-gray-100 hover:bg-gray-50 transition-all"
            >
              <TableCell className="pl-6">
                <span
                  className={`font-semibold text-lg ${
                    tx.type === "revenue" ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {tx.type === "revenue" ? "+" : "-"}${tx.amount.toLocaleString()}
                </span>
              </TableCell>
              <TableCell>
                <span
                  className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-gray-50 ${
                    tx.type === "revenue"
                      ? "text-green-700 border border-green-100"
                      : "text-red-600 border border-red-100"
                  }`}
                >
                  {tx.type === "revenue" ? "Revenue" : "Expense"}
                </span>
              </TableCell>
              <TableCell>
                <div className="text-sm text-gray-700">
                  {tx.date.toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className="rounded px-3.5 py-1 text-xs bg-gray-50 text-gray-800 border border-gray-100"
                >
                  {tx.category}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="text-sm text-gray-700">{tx.from}</div>
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className="rounded px-3 py-1 text-xs border border-blue-100 bg-blue-50 text-blue-700"
                >
                  {tx.paymentMethod}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={`rounded px-3 py-1 text-xs border ${
                    tx.status === "completed"
                      ? "border-green-200 bg-green-50 text-green-700"
                      : "border-gray-200 bg-gray-100 text-gray-500"
                  }`}
                >
                  {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="text-xs text-gray-500 max-w-[150px] whitespace-nowrap overflow-hidden text-ellipsis">
                  {tx.notes || "-"}
                </div>
              </TableCell>
              <TableCell className="pr-4 text-right">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-blue-50 h-8 w-8 flex items-center justify-center group-hover:bg-blue-50 transition"
                  onClick={() => onEdit(tx)}
                  aria-label="Edit transaction"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {transactions.length === 0 && (
        <div className="py-12 text-center text-gray-500 text-sm">
          No transactions found.
        </div>
      )}
    </div>
  );
};
