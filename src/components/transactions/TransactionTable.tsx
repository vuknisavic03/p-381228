
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
            <TableHead className="pl-6 py-3 text-left font-medium text-gray-700 text-[15px]">Amount</TableHead>
            <TableHead className="min-w-[120px] font-normal text-gray-700 text-[15px]">Type</TableHead>
            <TableHead className="min-w-[140px] font-normal text-gray-700 text-[15px]">Date</TableHead>
            <TableHead className="min-w-[120px] font-normal text-gray-700 text-[15px]">Category</TableHead>
            <TableHead className="min-w-[140px] font-normal text-gray-700 text-[15px]">From/To</TableHead>
            <TableHead className="min-w-[120px] font-normal text-gray-700 text-[15px]">Payment</TableHead>
            <TableHead className="min-w-[120px] font-normal text-gray-700 text-[15px]">Status</TableHead>
            <TableHead className="min-w-[140px] font-normal text-gray-700 text-[15px]">Notes</TableHead>
            <TableHead className="w-12 text-right pr-4" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((tx) => (
            <TableRow
              key={tx.id}
              className="border-b border-gray-100 hover:bg-gray-50 transition-all"
            >
              <TableCell className="pl-6">
                <span
                  className={`font-medium text-[15px] ${
                    tx.type === "revenue" ? "text-black" : "text-black"
                  }`}
                >
                  {tx.type === "revenue" ? "+" : "-"}${tx.amount.toLocaleString()}
                </span>
              </TableCell>
              <TableCell>
                <span
                  className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium border bg-gray-50 text-gray-700`}
                >
                  {tx.type === "revenue" ? "Revenue" : "Expense"}
                </span>
              </TableCell>
              <TableCell>
                <div className="text-[15px] text-gray-700">
                  {tx.date.toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              </TableCell>
              <TableCell>
                <span className="rounded px-2.5 py-1 text-xs bg-gray-50 text-gray-700 border border-gray-100">
                  {tx.category}
                </span>
              </TableCell>
              <TableCell>
                <div className="text-[15px] text-gray-700">{tx.from}</div>
              </TableCell>
              <TableCell>
                <span className="rounded px-2 py-1 text-xs border border-gray-100 bg-gray-50 text-gray-700">
                  {tx.paymentMethod}
                </span>
              </TableCell>
              <TableCell>
                <span
                  className={`rounded px-2 py-1 text-xs border border-gray-200 bg-gray-100 text-gray-700`}
                >
                  {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                </span>
              </TableCell>
              <TableCell>
                <div className="text-xs text-gray-400 max-w-[150px] whitespace-nowrap overflow-hidden text-ellipsis">
                  {tx.notes || "-"}
                </div>
              </TableCell>
              <TableCell className="pr-4 text-right">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-gray-100 h-8 w-8 flex items-center justify-center transition"
                  onClick={() => onEdit(tx)}
                  aria-label="Edit transaction"
                >
                  <ChevronRight className="h-4 w-4 text-gray-500" />
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

