import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit2, Trash2, DollarSign } from "lucide-react";

interface Transaction {
  id: number;
  type: "revenue" | "expense";
  amount: number;
  date: Date;
  category: string;
  paymentMethod: string;
  from: string;
  notes?: string;
  selectedListingId: string;
}

interface TransactionsTableProps {
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (transaction: Transaction) => void;
}

export function TransactionsTable({
  transactions,
  onEdit,
  onDelete,
}: TransactionsTableProps) {
  
  const getPropertyType = (listingId: string): string => {
    const listings = [
      { id: "1", type: "commercial_rental" },
      { id: "2", type: "commercial_rental" },
      { id: "3", type: "hospitality" },
      { id: "4", type: "hospitality" },
      { id: "5", type: "residential_rental" },
    ];
    
    const listing = listings.find(l => l.id === listingId);
    if (!listing) return "Portfolio";
    
    return listing.type
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const getListingAddress = (listingId: string): string => {
    const listings = [
      { id: "1", address: "Knez Mihailova 42" },
      { id: "2", address: "Terazije 23" },
      { id: "3", address: "Kalemegdan Park 1" },
      { id: "4", address: "Skadarlija 29" },
      { id: "5", address: "Makedonska 22" },
    ];
    
    const listing = listings.find(l => l.id === listingId);
    return listing ? listing.address : "Portfolio";
  };

  const formatAmount = (amount: number, type: "revenue" | "expense"): string => {
    const sign = type === "revenue" ? "+" : "-";
    return `${sign}$${amount.toLocaleString()}`;
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getCategoryColor = (category: string): string => {
    const colors: Record<string, string> = {
      rent: "bg-blue-500",
      maintenance: "bg-orange-500", 
      insurance: "bg-purple-500",
      utilities: "bg-green-500",
      deposit: "bg-indigo-500",
      default: "bg-muted"
    };
    return colors[category] || colors.default;
  };

  if (transactions.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center bg-card rounded-lg border">
        <div className="text-center space-y-4 p-8">
          <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
            <DollarSign className="h-8 w-8 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-foreground">No transactions found</h3>
            <p className="text-sm text-muted-foreground">
              Try adjusting your filters or search criteria
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-card rounded-lg border overflow-hidden">
      <div className="overflow-auto h-full">
        <table className="w-full">
          <thead className="bg-muted/50 sticky top-0 z-10">
            <tr className="border-b">
              <th className="text-left p-4 font-medium text-sm text-muted-foreground min-w-[200px]">
                Transaction
              </th>
              <th className="text-right p-4 font-medium text-sm text-muted-foreground w-32">
                Amount
              </th>
              <th className="text-left p-4 font-medium text-sm text-muted-foreground w-28">
                Date
              </th>
              <th className="text-left p-4 font-medium text-sm text-muted-foreground w-40">
                Category
              </th>
              <th className="text-left p-4 font-medium text-sm text-muted-foreground w-32">
                Method
              </th>
              <th className="text-center p-4 font-medium text-sm text-muted-foreground w-20">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr
                key={transaction.id}
                className="border-b hover:bg-muted/30 transition-colors group cursor-pointer"
                onClick={() => onEdit(transaction)}
              >
                <td className="p-4">
                  <div className="space-y-1">
                    <div className="font-medium text-foreground text-sm">
                      {getListingAddress(transaction.selectedListingId)}
                    </div>
                    {transaction.notes && (
                      <div className="text-xs text-muted-foreground line-clamp-2">
                        {transaction.notes}
                      </div>
                    )}
                  </div>
                </td>
                
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <span className={`font-semibold text-sm ${
                      transaction.type === "revenue" 
                        ? "text-green-600" 
                        : "text-red-600"
                    }`}>
                      {formatAmount(transaction.amount, transaction.type)}
                    </span>
                    <div className={`w-1 h-4 rounded-full ${
                      transaction.type === "revenue" 
                        ? "bg-green-500" 
                        : "bg-red-500"
                    }`} />
                  </div>
                </td>
                
                <td className="p-4">
                  <span className="text-sm text-foreground">
                    {formatDate(transaction.date)}
                  </span>
                </td>
                
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${getCategoryColor(transaction.category)}`} />
                    <Badge variant="secondary" className="text-xs">
                      {getPropertyType(transaction.selectedListingId)}
                    </Badge>
                  </div>
                </td>
                
                <td className="p-4">
                  <span className="text-sm text-muted-foreground">
                    {transaction.paymentMethod}
                  </span>
                </td>
                
                <td className="p-4">
                  <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit(transaction);
                      }}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm('Delete this transaction?')) {
                          onDelete(transaction);
                        }
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}