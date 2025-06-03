
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
import { ChevronRight, DollarSign, CreditCard } from "lucide-react";

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
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-gray-100 bg-gray-50">
            <TableHead className="px-6 py-4 text-gray-700 font-medium text-sm">
              Amount
            </TableHead>
            <TableHead className="px-6 py-4 text-gray-700 font-medium text-sm">
              From
            </TableHead>
            <TableHead className="px-6 py-4 text-gray-700 font-medium text-sm">
              Date
            </TableHead>
            <TableHead className="px-6 py-4 text-gray-700 font-medium text-sm">
              Category
            </TableHead>
            <TableHead className="px-6 py-4 text-gray-700 font-medium text-sm">
              Payment
            </TableHead>
            <TableHead className="px-6 py-4 text-gray-700 font-medium text-sm">
              Status
            </TableHead>
            <TableHead className="w-12" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((tx) => (
            <TableRow
              key={tx.id}
              className="border-b border-gray-50 hover:bg-gray-25 cursor-pointer group"
              onClick={() => onEdit(tx)}
            >
              <TableCell className="px-6 py-4">
                <span className={`font-medium text-sm ${
                  tx.type === "revenue" ? "text-emerald-600" : "text-red-600"
                }`}>
                  {formatAmount(tx.amount, tx.type)}
                </span>
              </TableCell>
              
              <TableCell className="px-6 py-4">
                <span className="text-gray-900 text-sm">{tx.from}</span>
              </TableCell>
              
              <TableCell className="px-6 py-4">
                <span className="text-gray-600 text-sm">
                  {tx.date.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric'
                  })}
                </span>
              </TableCell>
              
              <TableCell className="px-6 py-4">
                <span className="text-gray-700 text-sm">{tx.category}</span>
              </TableCell>
              
              <TableCell className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-3.5 w-3.5 text-gray-400" />
                  <span className="text-gray-600 text-sm">{tx.paymentMethod}</span>
                </div>
              </TableCell>
              
              <TableCell className="px-6 py-4">
                <span className={`text-sm capitalize ${
                  tx.status === "completed" ? "text-emerald-600" : 
                  tx.status === "failed" ? "text-red-600" : 
                  "text-amber-600"
                }`}>
                  {tx.status}
                </span>
              </TableCell>
              
              <TableCell className="px-6 py-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(tx);
                  }}
                >
                  <ChevronRight className="h-3.5 w-3.5 text-gray-400" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {transactions.length === 0 && (
        <div className="py-16 text-center">
          <DollarSign className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <h3 className="text-gray-900 font-medium text-lg mb-2">No transactions found</h3>
          <p className="text-gray-500 text-sm">
            Try adjusting your filters to find transactions.
          </p>
        </div>
      )}
    </div>
  );
};
