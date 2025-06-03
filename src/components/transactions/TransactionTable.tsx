
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
        return <CircleCheck className="h-4 w-4 text-green-600" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case "failed":
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getPaymentMethodIcon = (method: string) => {
    if (method.toLowerCase().includes('card')) {
      return <CreditCard className="h-4 w-4 text-gray-500" />;
    }
    return <DollarSign className="h-4 w-4 text-gray-500" />;
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      <Table className="text-sm">
        <TableHeader>
          <TableRow className="border-b border-gray-200 bg-gray-50/50">
            <TableHead className="pl-6 py-4 text-gray-700 font-semibold text-xs uppercase tracking-wide">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Amount
              </div>
            </TableHead>
            <TableHead className="py-4 text-gray-700 font-semibold text-xs uppercase tracking-wide">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                From
              </div>
            </TableHead>
            <TableHead className="py-4 text-gray-700 font-semibold text-xs uppercase tracking-wide">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Date
              </div>
            </TableHead>
            <TableHead className="py-4 text-gray-700 font-semibold text-xs uppercase tracking-wide">Category</TableHead>
            <TableHead className="py-4 text-gray-700 font-semibold text-xs uppercase tracking-wide">Payment</TableHead>
            <TableHead className="py-4 text-gray-700 font-semibold text-xs uppercase tracking-wide">Status</TableHead>
            <TableHead className="py-4 text-gray-700 font-semibold text-xs uppercase tracking-wide">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Notes
              </div>
            </TableHead>
            <TableHead className="w-12 pr-6" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((tx, index) => (
            <TableRow
              key={tx.id}
              className={`border-b border-gray-100 hover:bg-gray-50/50 cursor-pointer group transition-all duration-200 ${
                index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
              }`}
              onClick={() => onEdit(tx)}
            >
              <TableCell className="pl-6 py-4">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-8 rounded-full ${
                    tx.type === "revenue" ? "bg-green-500" : "bg-red-500"
                  }`} />
                  <span className={`font-semibold text-base ${
                    tx.type === "revenue" ? "text-green-700" : "text-red-700"
                  }`}>
                    {formatAmount(tx.amount, tx.type)}
                  </span>
                </div>
              </TableCell>
              
              <TableCell className="py-4">
                <div className="flex flex-col">
                  <span className="text-gray-900 font-medium">{tx.from}</span>
                </div>
              </TableCell>
              
              <TableCell className="py-4">
                <div className="flex flex-col">
                  <span className="text-gray-900 font-medium">
                    {tx.date.toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                  <span className="text-gray-500 text-xs">
                    {tx.date.getFullYear()}
                  </span>
                </div>
              </TableCell>
              
              <TableCell className="py-4">
                <div className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
                  {tx.category}
                </div>
              </TableCell>
              
              <TableCell className="py-4">
                <div className="flex items-center gap-2">
                  {getPaymentMethodIcon(tx.paymentMethod)}
                  <span className="text-gray-700 text-sm">{tx.paymentMethod}</span>
                </div>
              </TableCell>
              
              <TableCell className="py-4">
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${
                  tx.status === "completed" ? "bg-green-50 text-green-700 border border-green-200" : 
                  tx.status === "failed" ? "bg-red-50 text-red-700 border border-red-200" : 
                  "bg-yellow-50 text-yellow-700 border border-yellow-200"
                }`}>
                  {getStatusIcon(tx.status)}
                  <span className="capitalize">{tx.status}</span>
                </div>
              </TableCell>
              
              <TableCell className="py-4 max-w-[200px]">
                {tx.notes ? (
                  <div className="group relative">
                    <span className="text-gray-600 text-sm truncate block">
                      {tx.notes}
                    </span>
                    {tx.notes.length > 50 && (
                      <div className="absolute hidden group-hover:block bg-gray-900 text-white text-xs rounded-lg p-2 top-full left-0 z-10 mt-1 shadow-lg max-w-xs">
                        {tx.notes}
                      </div>
                    )}
                  </div>
                ) : (
                  <span className="text-gray-400 text-sm">—</span>
                )}
              </TableCell>
              
              <TableCell className="pr-6 text-right py-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-gray-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(tx);
                  }}
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
        <div className="py-20 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <DollarSign className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-gray-900 font-semibold text-lg mb-2">No transactions found</h3>
          <p className="text-gray-500 text-sm max-w-sm mx-auto">
            Try adjusting your filters or search criteria to find the transactions you're looking for.
          </p>
        </div>
      )}
    </div>
  );
};
