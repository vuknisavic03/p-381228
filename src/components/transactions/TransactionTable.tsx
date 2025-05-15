
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
      <Table className="text-sm">
        <TableHeader className="sticky top-0 bg-white/90 backdrop-blur z-20 border-b border-gray-100">
          <TableRow>
            <TableHead className="pl-6 py-3 font-semibold text-gray-700">Amount</TableHead>
            <TableHead className="min-w-[120px] font-normal text-gray-600">Type</TableHead>
            <TableHead className="min-w-[140px] font-normal text-gray-600">Date</TableHead>
            <TableHead className="min-w-[120px] font-normal text-gray-600">Category</TableHead>
            <TableHead className="min-w-[140px] font-normal text-gray-600">From/To</TableHead>
            <TableHead className="min-w-[120px] font-normal text-gray-600">Payment</TableHead>
            <TableHead className="min-w-[120px] font-normal text-gray-600">Status</TableHead>
            <TableHead className="min-w-[140px] font-normal text-gray-600">Notes</TableHead>
            <TableHead className="w-12 text-right pr-4" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((tx, idx) => (
            <TableRow
              key={tx.id}
              className={`
                border-b border-gray-100 
                ${idx % 2 === 1 ? "bg-[#F6F6F8]" : "bg-white"}
                hover:bg-[#F0F2F7] transition-all
              `}
            >
              <TableCell className="pl-6 font-medium text-gray-900">
                {tx.type === "revenue" ? "+" : "-"}${tx.amount.toLocaleString()}
              </TableCell>
              <TableCell>
                <span className="block font-normal text-gray-800">{tx.type === "revenue" ? "Revenue" : "Expense"}</span>
              </TableCell>
              <TableCell>
                <span className="text-gray-700">
                  {tx.date.toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </TableCell>
              <TableCell>
                <span className="px-2 py-1 rounded bg-[#F3F3F6] text-gray-700">
                  {tx.category}
                </span>
              </TableCell>
              <TableCell>
                <span className="text-gray-800">{tx.from}</span>
              </TableCell>
              <TableCell>
                <span className="px-2 py-1 rounded bg-[#F3F3F6] text-gray-700">
                  {tx.paymentMethod}
                </span>
              </TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded text-xs bg-[#EFF3F8] text-gray-700 border border-gray-200`}
                >
                  {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                </span>
              </TableCell>
              <TableCell>
                <span className="text-gray-400 truncate block max-w-[150px]">{tx.notes || "-"}</span>
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
