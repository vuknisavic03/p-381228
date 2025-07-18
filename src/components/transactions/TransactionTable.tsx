import React, { useState } from "react";
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
import { ChevronRight, DollarSign, Search } from "lucide-react";
import { TransactionCategorizationDialog } from "./TransactionCategorizationDialog";

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
  const [categorizationDialog, setCategorizationDialog] = useState<{
    isOpen: boolean;
    transaction: any | null;
  }>({ isOpen: false, transaction: null });
  const formatAmount = (amount: number, type: "revenue" | "expense") => {
    const formattedAmount = amount.toLocaleString();
    return type === "revenue" ? `+$${formattedAmount}` : `-$${formattedAmount}`;
  };

  const getCategoryBadgeVariant = (category: string): "secondary" | "default" | "destructive" | "outline" => {
    return "secondary";
  };

  const capitalizeCategory = (category: string) => {
    return category
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const handleRowClick = (transaction: Transaction) => {
    console.log('Row clicked, transaction ID:', transaction.id, 'transaction:', transaction);
    // For demonstration, show categorization dialog for Starbucks transactions
    if (transaction.from?.toLowerCase().includes('starbucks')) {
      setCategorizationDialog({
        isOpen: true,
        transaction: {
          id: String(transaction.id),
          date: transaction.date.toISOString().split('T')[0],
          description: transaction.from,
          amount: transaction.amount,
          account: transaction.paymentMethod,
          accountNumber: "2490",
          type: "personal"
        }
      });
    } else {
      onEdit(transaction);
    }
  };

  const handleButtonClick = (e: React.MouseEvent, transaction: Transaction) => {
    e.stopPropagation();
    console.log('Button clicked, transaction ID:', transaction.id, 'transaction:', transaction);
    
    // Show categorization dialog instead of edit for certain transactions
    if (transaction.from?.toLowerCase().includes('starbucks')) {
      setCategorizationDialog({
        isOpen: true,
        transaction: {
          id: String(transaction.id),
          date: transaction.date.toISOString().split('T')[0],
          description: transaction.from,
          amount: transaction.amount,
          account: transaction.paymentMethod,
          accountNumber: "2490",
          type: "personal"
        }
      });
    } else {
      onEdit(transaction);
    }
  };

  const handleCloseCategorizationDialog = () => {
    setCategorizationDialog({ isOpen: false, transaction: null });
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-xl border border-gray-200/60 shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-200/50 bg-gradient-to-r from-gray-50/80 to-gray-50/40">
              <TableHead className="font-semibold text-gray-800 text-sm py-4 px-6">Transaction</TableHead>
              <TableHead className="font-semibold text-gray-800 text-sm py-4 px-4 text-right">Amount</TableHead>
              <TableHead className="font-semibold text-gray-800 text-sm py-4 px-4">Date</TableHead>
              <TableHead className="font-semibold text-gray-800 text-sm py-4 px-4">Category</TableHead>
              <TableHead className="font-semibold text-gray-800 text-sm py-4 px-4">Method</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((tx) => (
              <TableRow
                key={`transaction-${tx.id}`}
                className="hover:bg-gradient-to-r hover:from-gray-50/70 hover:to-transparent cursor-pointer group transition-all duration-300 border-b border-gray-100/60 last:border-b-0"
                onClick={() => handleRowClick(tx)}
                data-transaction-id={tx.id}
              >
                <TableCell className="py-5 px-6">
                  <div className="space-y-1.5">
                    <div className="font-semibold text-gray-900 text-sm leading-tight">{tx.from}</div>
                    {tx.notes && (
                      <div className="text-xs text-gray-500 leading-relaxed max-w-xs">{tx.notes}</div>
                    )}
                  </div>
                </TableCell>
                
                <TableCell className="py-5 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <span className={`text-sm font-bold ${
                      tx.type === "revenue" 
                        ? "text-emerald-600" 
                        : "text-red-500"
                    }`}>
                      {formatAmount(tx.amount, tx.type)}
                    </span>
                    <div className={`w-1 h-4 rounded-full ${
                      tx.type === "revenue" 
                        ? "bg-emerald-500" 
                        : "bg-red-500"
                    }`}></div>
                  </div>
                </TableCell>
                
                <TableCell className="py-5 px-4">
                  <div className="text-gray-700 text-sm font-medium">
                    {tx.date.toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </div>
                </TableCell>
                
                <TableCell className="py-5 px-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      tx.category.toLowerCase() === 'rent' ? 'bg-blue-500' :
                      tx.category.toLowerCase() === 'maintenance' ? 'bg-orange-500' :
                      tx.category.toLowerCase() === 'insurance' ? 'bg-purple-500' :
                      'bg-gray-400'
                    }`}></div>
                    <span className="text-xs font-semibold text-gray-700 bg-gray-50 px-2 py-1 rounded-md">
                      {capitalizeCategory(tx.category)}
                    </span>
                  </div>
                </TableCell>
                
                <TableCell className="py-5 px-4">
                  <span className="text-gray-600 text-sm font-medium">{tx.paymentMethod}</span>
                </TableCell>
                
                <TableCell className="py-5 px-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-gray-100 hover:scale-105"
                    onClick={(e) => handleButtonClick(e, tx)}
                    aria-label={`${tx.from?.toLowerCase().includes('starbucks') ? 'Categorize' : 'Edit'} transaction from ${tx.from}`}
                  >
                    {tx.from?.toLowerCase().includes('starbucks') ? (
                      <Search className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
                    )}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {transactions.length === 0 && (
          <div className="py-24 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center shadow-sm">
              <DollarSign className="h-10 w-10 text-gray-300" />
            </div>
            <h3 className="text-gray-900 font-bold text-xl mb-3">No transactions found</h3>
            <p className="text-gray-500 text-sm max-w-md mx-auto leading-relaxed">
              Try adjusting your filters or search criteria to find the transactions you're looking for.
            </p>
          </div>
        )}
      </div>

      <TransactionCategorizationDialog
        isOpen={categorizationDialog.isOpen}
        onClose={handleCloseCategorizationDialog}
        transaction={categorizationDialog.transaction}
      />
    </div>
  );
};
