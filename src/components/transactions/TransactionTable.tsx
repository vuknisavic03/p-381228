
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
import { ChevronRight, DollarSign, Calendar, CreditCard, User, FileText, CircleCheck, Clock, AlertCircle } from "lucide-react";

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CircleCheck className="h-3.5 w-3.5 text-emerald-500" />;
      case "pending":
        return <Clock className="h-3.5 w-3.5 text-amber-500" />;
      case "failed":
        return <AlertCircle className="h-3.5 w-3.5 text-red-500" />;
      default:
        return <Clock className="h-3.5 w-3.5 text-gray-400" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
      <Table className="text-sm">
        <TableHeader>
          <TableRow className="border-none bg-gray-50/70">
            <TableHead className="pl-8 py-5 text-gray-600 font-medium text-sm uppercase tracking-wider">
              Amount
            </TableHead>
            <TableHead className="py-5 text-gray-600 font-medium text-sm uppercase tracking-wider">
              From
            </TableHead>
            <TableHead className="py-5 text-gray-600 font-medium text-sm uppercase tracking-wider">
              Date
            </TableHead>
            <TableHead className="py-5 text-gray-600 font-medium text-sm uppercase tracking-wider">
              Category
            </TableHead>
            <TableHead className="py-5 text-gray-600 font-medium text-sm uppercase tracking-wider">
              Payment
            </TableHead>
            <TableHead className="py-5 text-gray-600 font-medium text-sm uppercase tracking-wider">
              Status
            </TableHead>
            <TableHead className="w-12 pr-8" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((tx) => (
            <TableRow
              key={tx.id}
              className="border-gray-50 hover:bg-gray-50/50 cursor-pointer group transition-all duration-200"
              onClick={() => onEdit(tx)}
            >
              <TableCell className="pl-8 py-6">
                <div className="flex items-center gap-4">
                  <div className={`w-3 h-3 rounded-full ${
                    tx.type === "revenue" ? "bg-emerald-500" : "bg-red-500"
                  }`} />
                  <span className={`font-semibold text-sm ${
                    tx.type === "revenue" ? "text-emerald-600" : "text-red-600"
                  }`}>
                    {formatAmount(tx.amount, tx.type)}
                  </span>
                </div>
              </TableCell>
              
              <TableCell className="py-6">
                <div className="text-gray-900 font-medium text-sm">{tx.from}</div>
              </TableCell>
              
              <TableCell className="py-6">
                <div className="text-gray-700 font-medium text-sm">
                  {tx.date.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </div>
              </TableCell>
              
              <TableCell className="py-6">
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-gray-100 text-gray-700">
                  {tx.category}
                </span>
              </TableCell>
              
              <TableCell className="py-6">
                <div className="flex items-center gap-2.5">
                  <CreditCard className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-700 text-sm">{tx.paymentMethod}</span>
                </div>
              </TableCell>
              
              <TableCell className="py-6">
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${
                  tx.status === "completed" ? "bg-emerald-50 text-emerald-700" : 
                  tx.status === "failed" ? "bg-red-50 text-red-700" : 
                  "bg-amber-50 text-amber-700"
                }`}>
                  {getStatusIcon(tx.status)}
                  <span className="capitalize">{tx.status}</span>
                </div>
              </TableCell>
              
              <TableCell className="pr-8 text-right py-6">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-gray-100 rounded-full"
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
        <div className="py-24 text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
            <DollarSign className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-gray-900 font-semibold text-xl mb-3">No transactions found</h3>
          <p className="text-gray-500 max-w-sm mx-auto leading-relaxed">
            Try adjusting your filters or search criteria to find the transactions you're looking for.
          </p>
        </div>
      )}
    </div>
  );
};
