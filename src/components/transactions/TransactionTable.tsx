
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
  selectedListingId: string;
};

interface TransactionTableProps {
  transactions: Transaction[];
  onEdit: (tx: Transaction) => void;
}

export const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
  onEdit,
}) => {
  const formatAmount = (amount: number, type: "revenue" | "expense") => {
    const formattedAmount = amount.toLocaleString();
    return type === "revenue" ? `+$${formattedAmount}` : `-$${formattedAmount}`;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <Table className="text-sm">
        <TableHeader>
          <TableRow className="border-b border-gray-200 bg-gray-50">
            <TableHead className="pl-4 py-3 text-gray-700 font-medium">Amount</TableHead>
            <TableHead className="py-3 text-gray-700 font-medium">From</TableHead>
            <TableHead className="py-3 text-gray-700 font-medium">Date</TableHead>
            <TableHead className="py-3 text-gray-700 font-medium">Category</TableHead>
            <TableHead className="py-3 text-gray-700 font-medium">Payment</TableHead>
            <TableHead className="py-3 text-gray-700 font-medium">Status</TableHead>
            <TableHead className="py-3 text-gray-700 font-medium">Notes</TableHead>
            <TableHead className="w-10 pr-4" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((tx) => (
            <TableRow
              key={tx.id}
              className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer group"
              onClick={() => onEdit(tx)}
            >
              <TableCell className="pl-4 py-3">
                <span className={`font-medium ${
                  tx.type === "revenue" ? "text-green-600" : "text-red-600"
                }`}>
                  {formatAmount(tx.amount, tx.type)}
                </span>
              </TableCell>
              
              <TableCell className="py-3">
                <span className="text-gray-900">{tx.from}</span>
              </TableCell>
              
              <TableCell className="py-3">
                <span className="text-gray-600">
                  {tx.date.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: '2-digit'
                  })}
                </span>
              </TableCell>
              
              <TableCell className="py-3">
                <span className="text-gray-900">{tx.category}</span>
              </TableCell>
              
              <TableCell className="py-3">
                <span className="text-gray-600">{tx.paymentMethod}</span>
              </TableCell>
              
              <TableCell className="py-3">
                <span className={`inline-flex items-center px-2 py-1 rounded text-xs ${
                  tx.status === "completed" ? "bg-green-50 text-green-700" : 
                  tx.status === "failed" ? "bg-red-50 text-red-700" : 
                  "bg-yellow-50 text-yellow-700"
                }`}>
                  {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                </span>
              </TableCell>
              
              <TableCell className="py-3">
                <span className="text-gray-500 truncate block max-w-[200px]">
                  {tx.notes || "—"}
                </span>
              </TableCell>
              
              <TableCell className="pr-4 text-right py-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(tx);
                  }}
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
        <div className="py-16 text-center">
          <div className="text-gray-400 mb-2">📊</div>
          <h3 className="text-gray-900 font-medium mb-1">No transactions found</h3>
          <p className="text-gray-500 text-sm">Try adjusting your filters or search criteria</p>
        </div>
      )}
    </div>
  );
};
