
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronRight, DollarSign } from "lucide-react";

type Transaction = {
  id: number;
  type: "revenue" | "expense";
  amount: number;
  date: Date;
  category: string;
  paymentMethod: string;
  from: string;
  notes?: string;
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

  const getCategoryBadgeVariant = (category: string): "secondary" | "default" | "destructive" | "outline" => {
    return "secondary";
  };

  const handleRowClick = (transaction: Transaction) => {
    console.log('Row clicked, transaction ID:', transaction.id, 'transaction:', transaction);
    onEdit(transaction);
  };

  const handleButtonClick = (e: React.MouseEvent, transaction: Transaction) => {
    e.stopPropagation();
    console.log('Button clicked, transaction ID:', transaction.id, 'transaction:', transaction);
    onEdit(transaction);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-b bg-gray-50/80">
            <TableHead className="font-semibold text-gray-800 text-sm">Description</TableHead>
            <TableHead className="font-semibold text-gray-800 text-sm">Amount</TableHead>
            <TableHead className="font-semibold text-gray-800 text-sm">Date</TableHead>
            <TableHead className="font-semibold text-gray-800 text-sm">Category</TableHead>
            <TableHead className="font-semibold text-gray-800 text-sm">Payment Method</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((tx) => (
            <TableRow
              key={`transaction-${tx.id}`}
              className="hover:bg-gray-50/70 cursor-pointer group transition-all duration-200 border-b border-gray-100 last:border-b-0"
              onClick={() => handleRowClick(tx)}
              data-transaction-id={tx.id}
            >
              <TableCell className="max-w-[300px] py-4">
                <div className="space-y-1">
                  <div className="font-medium text-gray-900 truncate text-sm">{tx.from}</div>
                  {tx.notes && (
                    <div className="text-xs text-gray-500 truncate leading-relaxed">{tx.notes}</div>
                  )}
                </div>
              </TableCell>
              
              <TableCell className="py-4">
                <span className={`text-sm ${
                  tx.type === "revenue" ? "text-green-600" : "text-red-500"
                }`}>
                  {formatAmount(tx.amount, tx.type)}
                </span>
              </TableCell>
              
              <TableCell className="py-4">
                <span className="text-gray-700 font-medium text-sm">
                  {tx.date.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
              </TableCell>
              
              <TableCell className="py-4">
                <Badge variant={getCategoryBadgeVariant(tx.category)} className="text-xs font-medium px-2.5 py-1 bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
                  {tx.category}
                </Badge>
              </TableCell>
              
              <TableCell className="py-4">
                <span className="text-gray-600 text-sm">{tx.paymentMethod}</span>
              </TableCell>
              
              <TableCell className="text-right py-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-gray-100"
                  onClick={(e) => handleButtonClick(e, tx)}
                  aria-label={`Edit transaction from ${tx.from}`}
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
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gray-50 flex items-center justify-center">
            <DollarSign className="h-8 w-8 text-gray-300" />
          </div>
          <h3 className="text-gray-900 font-semibold text-xl mb-3">No transactions found</h3>
          <p className="text-gray-500 text-sm max-w-md mx-auto leading-relaxed">
            Try adjusting your filters or search criteria to find the transactions you're looking for.
          </p>
        </div>
      )}
    </div>
  );
};
