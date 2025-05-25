
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
import { ChevronRight, ArrowUpRight, ArrowDownLeft } from "lucide-react";

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-50 text-green-700 border-green-200";
      case "failed":
        return "bg-red-50 text-red-600 border-red-200";
      case "pending":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <Table className="text-sm">
        <TableHeader className="bg-gray-50/80">
          <TableRow className="border-b border-gray-200 hover:bg-gray-50/80">
            <TableHead className="pl-6 py-4 font-semibold text-gray-800 w-[140px]">Amount</TableHead>
            <TableHead className="py-4 font-semibold text-gray-800 w-[200px]">Transaction</TableHead>
            <TableHead className="py-4 font-semibold text-gray-800 w-[120px]">Date</TableHead>
            <TableHead className="py-4 font-semibold text-gray-800 w-[130px]">Category</TableHead>
            <TableHead className="py-4 font-semibold text-gray-800 w-[120px]">Payment</TableHead>
            <TableHead className="py-4 font-semibold text-gray-800 w-[100px]">Status</TableHead>
            <TableHead className="py-4 font-semibold text-gray-800">Notes</TableHead>
            <TableHead className="w-12 pr-4" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((tx, index) => (
            <TableRow
              key={tx.id}
              className={`
                border-b border-gray-100 group transition-all duration-200 hover:bg-gray-50/50 cursor-pointer
                ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}
              `}
              onClick={() => onEdit(tx)}
            >
              <TableCell className="pl-6 py-4">
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-lg ${tx.type === "revenue" ? "bg-green-100" : "bg-red-100"}`}>
                    {tx.type === "revenue" ? (
                      <ArrowUpRight className="h-3.5 w-3.5 text-green-600" />
                    ) : (
                      <ArrowDownLeft className="h-3.5 w-3.5 text-red-500" />
                    )}
                  </div>
                  <span className={`font-semibold text-base ${
                    tx.type === "revenue" ? "text-green-700" : "text-red-600"
                  }`}>
                    {formatAmount(tx.amount, tx.type)}
                  </span>
                </div>
              </TableCell>
              
              <TableCell className="py-4">
                <div className="space-y-1">
                  <div className="font-medium text-gray-900 text-sm">{tx.from}</div>
                  <div className="text-xs text-gray-500 capitalize">{tx.type}</div>
                </div>
              </TableCell>
              
              <TableCell className="py-4">
                <div className="text-sm text-gray-700">
                  {tx.date.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: '2-digit'
                  })}
                </div>
              </TableCell>
              
              <TableCell className="py-4">
                <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-200 text-xs font-medium">
                  {tx.category}
                </span>
              </TableCell>
              
              <TableCell className="py-4">
                <span className="text-sm text-gray-600 font-medium">
                  {tx.paymentMethod}
                </span>
              </TableCell>
              
              <TableCell className="py-4">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(tx.status)}`}>
                  <div className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                    tx.status === "completed" ? "bg-green-500" : 
                    tx.status === "failed" ? "bg-red-500" : "bg-yellow-500"
                  }`} />
                  {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                </span>
              </TableCell>
              
              <TableCell className="py-4">
                <span className="text-sm text-gray-500 truncate block max-w-[200px]">
                  {tx.notes || "—"}
                </span>
              </TableCell>
              
              <TableCell className="pr-4 text-right py-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-gray-100 h-8 w-8 opacity-0 group-hover:opacity-100 transition-all duration-200"
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
        <div className="py-20 text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <span className="text-2xl text-gray-400">📊</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">No transactions found</h3>
          <p className="text-sm text-gray-500">Try adjusting your filters or search criteria</p>
        </div>
      )}
    </div>
  );
};
