
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
    <div className="bg-white rounded-lg border shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="border-b bg-gray-50">
            <TableHead className="font-medium text-gray-700">Description</TableHead>
            <TableHead className="font-medium text-gray-700">Amount</TableHead>
            <TableHead className="font-medium text-gray-700">Date</TableHead>
            <TableHead className="font-medium text-gray-700">Category</TableHead>
            <TableHead className="font-medium text-gray-700">Payment Method</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((tx) => (
            <TableRow
              key={`transaction-${tx.id}`}
              className="hover:bg-gray-50 cursor-pointer group transition-colors"
              onClick={() => handleRowClick(tx)}
              data-transaction-id={tx.id}
            >
              <TableCell className="max-w-[300px]">
                <div className="space-y-1">
                  <div className="font-medium text-gray-900 truncate">{tx.from}</div>
                  {tx.notes && (
                    <div className="text-sm text-gray-500 truncate">{tx.notes}</div>
                  )}
                </div>
              </TableCell>
              
              <TableCell>
                <span className={`font-semibold text-lg ${
                  tx.type === "revenue" ? "text-green-600" : "text-red-600"
                }`}>
                  {formatAmount(tx.amount, tx.type)}
                </span>
              </TableCell>
              
              <TableCell>
                <span className="text-gray-700 font-medium">
                  {tx.date.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
              </TableCell>
              
              <TableCell>
                <Badge variant={getCategoryBadgeVariant(tx.category)} className="text-xs font-medium">
                  {tx.category}
                </Badge>
              </TableCell>
              
              <TableCell>
                <span className="text-gray-600">{tx.paymentMethod}</span>
              </TableCell>
              
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => handleButtonClick(e, tx)}
                  aria-label={`Edit transaction from ${tx.from}`}
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
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <DollarSign className="h-6 w-6 text-gray-400" />
          </div>
          <h3 className="text-gray-900 font-medium text-lg mb-2">No transactions found</h3>
          <p className="text-gray-500 text-sm max-w-sm mx-auto">
            Try adjusting your filters or search criteria to find the transactions you're looking for.
          </p>
        </div>
      )}
    </div>
  );
};
