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
import { ChevronRight, TrendingUp, TrendingDown, Calendar, CreditCard, Building } from "lucide-react";

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

export const TransactionTableModern: React.FC<TransactionTableProps> = ({
  transactions,
  onEdit,
}) => {
  const formatAmount = (amount: number, type: "revenue" | "expense") => {
    const formattedAmount = amount.toLocaleString();
    return type === "revenue" ? `+$${formattedAmount}` : `-$${formattedAmount}`;
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'rent':
        return '🏠';
      case 'maintenance':
        return '🔧';
      case 'insurance':
        return '🛡️';
      case 'utilities':
        return '⚡';
      case 'cleaning':
        return '🧹';
      case 'landscaping':
        return '🌿';
      default:
        return '📋';
    }
  };

  const capitalizeCategory = (category: string) => {
    return category
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const handleRowClick = (transaction: Transaction) => {
    onEdit(transaction);
  };

  const handleButtonClick = (e: React.MouseEvent, transaction: Transaction) => {
    e.stopPropagation();
    onEdit(transaction);
  };

  return (
    <div className="p-6 bg-surface-secondary">
      <div className="bg-card rounded-2xl border shadow-[var(--shadow-soft)] overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-b bg-surface-tertiary hover:bg-surface-tertiary">
              <TableHead className="font-semibold text-foreground py-4 px-6">Transaction Details</TableHead>
              <TableHead className="font-semibold text-foreground py-4 px-4 text-right">Amount</TableHead>
              <TableHead className="font-semibold text-foreground py-4 px-4">Date & Method</TableHead>
              <TableHead className="font-semibold text-foreground py-4 px-4">Category</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((tx) => (
              <TableRow
                key={`transaction-${tx.id}`}
                className="hover:bg-hover cursor-pointer group transition-all duration-200 border-b border-border/50 last:border-b-0"
                onClick={() => handleRowClick(tx)}
                data-transaction-id={tx.id}
              >
                <TableCell className="py-6 px-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-surface-tertiary flex items-center justify-center">
                        <Building className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <div className="font-semibold text-foreground leading-tight">{tx.from}</div>
                        {tx.notes && (
                          <div className="text-sm text-muted-foreground leading-relaxed max-w-sm mt-1">{tx.notes}</div>
                        )}
                      </div>
                    </div>
                  </div>
                </TableCell>
                
                <TableCell className="py-6 px-4 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <div className={`p-2 rounded-xl ${
                      tx.type === "revenue" 
                        ? "bg-success/10" 
                        : "bg-destructive/10"
                    }`}>
                      {tx.type === "revenue" ? (
                        <TrendingUp className="h-4 w-4 text-success" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-destructive" />
                      )}
                    </div>
                    <span className={`text-base font-bold ${
                      tx.type === "revenue" 
                        ? "text-success" 
                        : "text-destructive"
                    }`}>
                      {formatAmount(tx.amount, tx.type)}
                    </span>
                  </div>
                </TableCell>
                
                <TableCell className="py-6 px-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">
                        {tx.date.toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{tx.paymentMethod}</span>
                    </div>
                  </div>
                </TableCell>
                
                <TableCell className="py-6 px-4">
                  <Badge variant="secondary" className="flex items-center gap-2 w-fit">
                    <span className="text-base">{getCategoryIcon(tx.category)}</span>
                    <span className="font-medium">{capitalizeCategory(tx.category)}</span>
                  </Badge>
                </TableCell>
                
                <TableCell className="py-6 px-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-hover hover:scale-105"
                    onClick={(e) => handleButtonClick(e, tx)}
                    aria-label={`Edit transaction from ${tx.from}`}
                  >
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {transactions.length === 0 && (
          <div className="py-24 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-surface-tertiary flex items-center justify-center">
              <TrendingUp className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-foreground font-bold text-xl mb-3">No transactions found</h3>
            <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
              Try adjusting your filters or search criteria to find the transactions you're looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};