
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Calendar as CalendarIcon, TrendingDown, ChevronRight, FileText, Check, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { EditTransactionForm } from "./EditTransactionForm";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock transaction data
const mockTransactions = [
  {
    id: 1,
    type: 'revenue',
    amount: 1200,
    date: new Date(2025, 4, 1), // May 1, 2025
    category: 'Rent',
    paymentMethod: 'Bank Transfer',
    from: 'Alexander Whitmore',
    notes: 'Monthly rent payment',
    status: 'completed'
  },
  {
    id: 2,
    type: 'revenue',
    amount: 1500,
    date: new Date(2025, 4, 5), // May 5, 2025
    category: 'Deposit',
    paymentMethod: 'Credit Card',
    from: 'Sarah Johnson',
    notes: 'Security deposit for apartment',
    status: 'completed'
  },
  {
    id: 3,
    type: 'expense',
    amount: 350,
    date: new Date(2025, 4, 8), // May 8, 2025
    category: 'Maintenance',
    paymentMethod: 'Credit Card',
    from: 'City Plumbing Services',
    notes: 'Plumbing repair in unit 4B',
    status: 'completed'
  },
  {
    id: 4,
    type: 'revenue',
    amount: 950,
    date: new Date(2025, 3, 28), // April 28, 2025
    category: 'Rent',
    paymentMethod: 'Cash',
    from: 'Watson Enterprises',
    notes: 'Late rent payment for April',
    status: 'completed'
  },
  {
    id: 5,
    type: 'expense',
    amount: 120,
    date: new Date(2025, 3, 25), // April 25, 2025
    category: 'Utilities',
    paymentMethod: 'Bank Transfer',
    from: 'City Power & Light',
    notes: 'Electricity bill for common areas',
    status: 'completed'
  }
];

export function TransactionActivity() {
  const [transactionType, setTransactionType] = useState<'all' | 'revenue' | 'expense'>('all');
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [editingTransaction, setEditingTransaction] = useState<any>(null);
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc'); // Default to newest first
  
  // Filter transactions based on selected type and date
  const filteredTransactions = mockTransactions
    .filter(transaction => {
      // Filter by transaction type (if "all" is selected, don't filter by type)
      if (transactionType !== 'all' && transaction.type !== transactionType) return false;
      
      // Filter by date if selected
      if (date) {
        const transactionDate = new Date(transaction.date);
        return (
          transactionDate.getFullYear() === date.getFullYear() &&
          transactionDate.getMonth() === date.getMonth() &&
          transactionDate.getDate() === date.getDate()
        );
      }
      
      return true;
    })
    .sort((a, b) => {
      // Sort by date
      if (sortOrder === 'desc') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
    });

  // Calculate totals
  const totals = filteredTransactions.reduce(
    (acc, transaction) => {
      if (transaction.type === 'revenue') {
        acc.revenue += transaction.amount;
      } else {
        acc.expense += transaction.amount;
      }
      return acc;
    },
    { revenue: 0, expense: 0 }
  );

  // Handle transaction update
  const handleUpdateTransaction = (updatedTransaction: any) => {
    // In a real app, this would update the state or call an API
    console.log("Transaction updated:", updatedTransaction);
    setEditingTransaction(null);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
  };

  // Reset all filters
  const resetFilters = () => {
    setTransactionType('all');
    setDate(undefined);
  };

  // Helper function to get color based on transaction type
  const getTypeStyles = (type: string) => {
    if (type === 'revenue') {
      return {
        bg: 'bg-green-50',
        text: 'text-green-600',
        iconBg: 'bg-green-100',
        border: 'border-green-200',
        hover: 'hover:bg-green-100',
      };
    } else {
      return {
        bg: 'bg-red-50',
        text: 'text-red-600',
        iconBg: 'bg-red-100',
        border: 'border-red-200',
        hover: 'hover:bg-red-100',
      };
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="sticky top-0 z-10 bg-white p-5 border-b border-gray-100 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Activity</h2>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          <Card 
            className={cn(
              "p-3 shadow-sm border border-gray-200 transition-all",
              transactionType === 'all' ? 'bg-blue-50 border-blue-200' : 'bg-white hover:bg-gray-50'
            )}
            onClick={() => setTransactionType('all')}
            role="button"
          >
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">All</p>
                <p className="text-lg font-bold text-gray-900">
                  ${(totals.revenue - totals.expense).toLocaleString()}
                </p>
              </div>
            </div>
          </Card>
          
          <Card 
            className={cn(
              "p-3 shadow-sm border border-gray-200 transition-all",
              transactionType === 'revenue' ? 'bg-green-50 border-green-200' : 'bg-white hover:bg-gray-50'
            )}
            onClick={() => setTransactionType('revenue')}
            role="button"
          >
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Revenue</p>
                <p className="text-lg font-bold text-green-600">
                  ${totals.revenue.toLocaleString()}
                </p>
              </div>
            </div>
          </Card>
          
          <Card 
            className={cn(
              "p-3 shadow-sm border border-gray-200 transition-all",
              transactionType === 'expense' ? 'bg-red-50 border-red-200' : 'bg-white hover:bg-gray-50'
            )}
            onClick={() => setTransactionType('expense')}
            role="button"
          >
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
                <TrendingDown className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Expenses</p>
                <p className="text-lg font-bold text-red-600">
                  ${totals.expense.toLocaleString()}
                </p>
              </div>
            </div>
          </Card>
        </div>
        
        <div className="flex items-center justify-between">
          {/* Calendar Popover */}
          <div className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant={date ? "default" : "outline"} 
                  size="sm" 
                  className={cn(
                    "text-xs flex items-center gap-1",
                    date ? "bg-blue-600" : "border-gray-200 bg-white hover:bg-gray-50 transition-colors"
                  )}
                >
                  <CalendarIcon className="h-3 w-3" />
                  {date ? format(date, "MMM d, yyyy") : "Filter by date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={toggleSortOrder}
              className="text-xs flex items-center gap-1 border-gray-200 bg-white hover:bg-gray-50 transition-colors"
            >
              {sortOrder === 'desc' ? 'Newest first' : 'Oldest first'}
            </Button>
            
            {(date || transactionType !== 'all') && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={resetFilters}
                className="text-xs flex items-center gap-1 text-gray-600 hover:text-gray-800"
              >
                Clear filters
              </Button>
            )}
          </div>
          
          <Badge variant="outline" className="text-xs font-normal text-gray-600">
            {filteredTransactions.length} transactions
          </Badge>
        </div>
      </div>
      
      {filteredTransactions.length > 0 ? (
        <div className="flex-1 overflow-auto p-5">
          <Table>
            <TableHeader className="sticky top-0 bg-white">
              <TableRow className="border-b border-gray-100 hover:bg-transparent">
                <TableHead className="w-[100px] pl-0">Amount</TableHead>
                <TableHead>Details</TableHead>
                <TableHead className="text-right pr-0">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction) => {
                const typeStyles = getTypeStyles(transaction.type);
                
                return (
                  <TableRow 
                    key={transaction.id} 
                    className={cn(
                      "border-b border-gray-100",
                      "hover:shadow-sm hover:bg-gray-50 transition-all cursor-pointer"
                    )}
                  >
                    <TableCell className="py-4 pl-0">
                      <div className="flex items-start">
                        <div className={`mt-1 w-8 h-8 rounded-full flex items-center justify-center ${typeStyles.iconBg} ${typeStyles.text}`}>
                          {transaction.type === 'revenue' ? 
                            <DollarSign className="h-4 w-4" /> : 
                            <TrendingDown className="h-4 w-4" />
                          }
                        </div>
                        <div className="ml-3">
                          <p className={cn(
                            "font-semibold",
                            transaction.type === 'revenue' ? 'text-green-600' : 'text-red-600'
                          )}>
                            {transaction.type === 'expense' ? '- ' : '+ '}
                            ${transaction.amount.toLocaleString()}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5 flex items-center">
                            <CalendarIcon className="h-3 w-3 mr-1 inline" />
                            {format(new Date(transaction.date), "MMM d, yyyy")}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium text-gray-800">
                          {transaction.category}
                        </div>
                        <div className="text-sm text-gray-600">
                          {transaction.from}
                        </div>
                        {transaction.notes && (
                          <div className="text-xs text-gray-500 mt-1 italic">
                            "{transaction.notes}"
                          </div>
                        )}
                        <div className="mt-1">
                          <Badge variant="outline" className={cn(
                            "text-xs font-normal",
                            typeStyles.bg,
                            typeStyles.text,
                            typeStyles.border
                          )}>
                            {transaction.paymentMethod}
                          </Badge>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right pr-0">
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setEditingTransaction(transaction)}
                            className={cn(
                              "h-8 w-8 p-0 rounded-full",
                              typeStyles.hover
                            )}
                          >
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="sm:max-w-md">
                          {editingTransaction && (
                            <EditTransactionForm 
                              transaction={editingTransaction}
                              onClose={() => setEditingTransaction(null)}
                              onUpdate={handleUpdateTransaction}
                            />
                          )}
                        </SheetContent>
                      </Sheet>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center m-5 p-8 rounded-lg border border-dashed border-gray-200 min-h-[400px]">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-5">
            {transactionType === 'revenue' ? (
              <DollarSign className="h-8 w-8 text-gray-500" />
            ) : transactionType === 'expense' ? (
              <TrendingDown className="h-8 w-8 text-gray-500" />
            ) : (
              <Calendar className="h-8 w-8 text-gray-500" />
            )}
          </div>
          
          <span className="text-gray-800 font-semibold text-lg mb-2">
            {date ? `No transactions on ${format(date, "MMMM d, yyyy")}` : 
              `No ${transactionType !== 'all' ? transactionType : ''} transactions found`}
          </span>
          
          <p className="text-sm text-center text-gray-500 max-w-[280px]">
            {date ? "Try selecting a different date or clear the date filter." :
              transactionType === 'all' 
                ? "Transactions will appear here once they're created."
                : `${transactionType === 'revenue' ? 'Revenue' : 'Expense'} transactions will appear here once they're created.`
            }
          </p>
          
          <Button variant="outline" onClick={resetFilters} className="mt-4">
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
}
