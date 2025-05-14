
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Calendar as CalendarIcon, TrendingDown, ChevronRight, FileText, Check, X, Filter, RefreshCw, ArrowDownUp, Wallet } from "lucide-react";
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
import { useToast } from "@/components/ui/use-toast";

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
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [editingTransaction, setEditingTransaction] = useState<any>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const { toast } = useToast();
  
  // Filter transactions based on selected type, date
  const filteredTransactions = mockTransactions.filter(transaction => {
    // Filter by transaction type
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
  }).sort((a, b) => {
    // Sort by date
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });

  // Handle transaction update
  const handleUpdateTransaction = (updatedTransaction: any) => {
    // In a real app, this would update the state or call an API
    toast({
      title: "Transaction updated",
      description: `Transaction #${updatedTransaction.id} has been updated successfully.`,
    });
    setEditingTransaction(null);
  };

  // Toggle sort order
  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    toast({
      description: `Sorted by date: ${sortOrder === 'asc' ? 'newest first' : 'oldest first'}`,
      duration: 2000,
    });
  };

  // Reset filters
  const resetFilters = () => {
    setTransactionType('all');
    setDate(new Date());
    toast({
      description: "All filters have been reset",
      duration: 2000,
    });
  };

  return (
    <div className="h-full flex flex-col bg-white border-l border-gray-100">
      <div className="sticky top-0 z-10 bg-white p-5 border-b border-gray-100 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Transaction Activity</h2>
        
        {/* Completely redesigned transaction type selector */}
        <div className="mb-6">
          <div className="grid grid-cols-3 gap-3">
            {/* All Transactions Card */}
            <button
              onClick={() => setTransactionType('all')}
              className={`relative overflow-hidden h-20 rounded-xl transition-all duration-300 ${
                transactionType === 'all' 
                  ? 'ring-2 ring-blue-500 shadow-md bg-gradient-to-br from-blue-50 to-blue-100' 
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <div className="absolute inset-0 flex items-center justify-center opacity-10">
                <Wallet className={`h-24 w-24 ${
                  transactionType === 'all' ? 'text-blue-300' : 'text-gray-300'
                }`} />
              </div>
              <div className="relative h-full flex flex-col items-center justify-center">
                <Wallet className={`h-5 w-5 mb-1 ${
                  transactionType === 'all' ? 'text-blue-600' : 'text-gray-500'
                }`} />
                <span className={`text-sm font-medium ${
                  transactionType === 'all' ? 'text-blue-900' : 'text-gray-700'
                }`}>All</span>
                {transactionType === 'all' && (
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-500" />
                )}
              </div>
            </button>
            
            {/* Revenue Card */}
            <button
              onClick={() => setTransactionType('revenue')}
              className={`relative overflow-hidden h-20 rounded-xl transition-all duration-300 ${
                transactionType === 'revenue' 
                  ? 'ring-2 ring-emerald-500 shadow-md bg-gradient-to-br from-emerald-50 to-emerald-100' 
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <div className="absolute inset-0 flex items-center justify-center opacity-10">
                <DollarSign className={`h-24 w-24 ${
                  transactionType === 'revenue' ? 'text-emerald-300' : 'text-gray-300'
                }`} />
              </div>
              <div className="relative h-full flex flex-col items-center justify-center">
                <DollarSign className={`h-5 w-5 mb-1 ${
                  transactionType === 'revenue' ? 'text-emerald-600' : 'text-gray-500'
                }`} />
                <span className={`text-sm font-medium ${
                  transactionType === 'revenue' ? 'text-emerald-900' : 'text-gray-700'
                }`}>Revenue</span>
                {transactionType === 'revenue' && (
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-emerald-500" />
                )}
              </div>
            </button>
            
            {/* Expenses Card */}
            <button
              onClick={() => setTransactionType('expense')}
              className={`relative overflow-hidden h-20 rounded-xl transition-all duration-300 ${
                transactionType === 'expense' 
                  ? 'ring-2 ring-rose-500 shadow-md bg-gradient-to-br from-rose-50 to-rose-100' 
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <div className="absolute inset-0 flex items-center justify-center opacity-10">
                <TrendingDown className={`h-24 w-24 ${
                  transactionType === 'expense' ? 'text-rose-300' : 'text-gray-300'
                }`} />
              </div>
              <div className="relative h-full flex flex-col items-center justify-center">
                <TrendingDown className={`h-5 w-5 mb-1 ${
                  transactionType === 'expense' ? 'text-rose-600' : 'text-gray-500'
                }`} />
                <span className={`text-sm font-medium ${
                  transactionType === 'expense' ? 'text-rose-900' : 'text-gray-700'
                }`}>Expenses</span>
                {transactionType === 'expense' && (
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-rose-500" />
                )}
              </div>
            </button>
          </div>
        </div>
        
        <div className="flex items-center gap-2 flex-wrap">
          {/* Calendar Popover */}
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs flex items-center gap-1 border-gray-200 bg-white hover:bg-gray-50"
              >
                <CalendarIcon className="h-3 w-3" />
                {date ? format(date, "MMM d, yyyy") : "Select date"}
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
            className="text-xs flex items-center gap-1 border-gray-200 bg-white hover:bg-gray-50"
            onClick={toggleSortOrder}
          >
            <ArrowDownUp className="h-3 w-3" />
            {sortOrder === 'desc' ? 'Newest first' : 'Oldest first'}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="text-xs flex items-center gap-1 border-gray-200 bg-white hover:bg-gray-50"
            onClick={resetFilters}
          >
            <RefreshCw className="h-3 w-3" />
            Reset
          </Button>
        </div>
      </div>
      
      {filteredTransactions.length > 0 ? (
        <div className="flex-1 overflow-auto p-5">
          <Card className="border border-gray-100 shadow-sm">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-gray-100 hover:bg-transparent">
                  <TableHead className="w-[120px] pl-4">Amount</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead className="text-right pr-4">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow 
                    key={transaction.id} 
                    className="border-b border-gray-100 hover:bg-gray-50/70"
                  >
                    <TableCell className="py-4 pl-4">
                      <div className="flex items-start">
                        <div className={`mt-1 w-8 h-8 rounded-full flex items-center justify-center ${
                          transaction.type === 'revenue' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                        }`}>
                          {transaction.type === 'revenue' ? 
                            <DollarSign className="h-4 w-4" /> : 
                            <TrendingDown className="h-4 w-4" />
                          }
                        </div>
                        <div className="ml-3">
                          <p className={`font-semibold ${
                            transaction.type === 'revenue' ? 'text-emerald-600' : 'text-rose-600'
                          }`}>
                            {transaction.type === 'revenue' ? '+' : '-'}${transaction.amount.toLocaleString()}
                          </p>
                          <p className="text-xs text-gray-500">
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
                        <div className="mt-1 flex items-center gap-2">
                          <Badge variant="outline" className="text-xs font-normal text-gray-600 bg-gray-50 border-gray-200">
                            <Wallet className="h-3 w-3 mr-1" />
                            {transaction.paymentMethod}
                          </Badge>
                          <Badge variant="outline" className="text-xs font-normal text-emerald-600 bg-emerald-50 border-emerald-200">
                            <Check className="h-3 w-3 mr-1" />
                            {transaction.status}
                          </Badge>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right pr-4">
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setEditingTransaction(transaction)}
                            className="h-8 w-8 p-0 rounded-full hover:bg-gray-200/80"
                          >
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="sm:max-w-md p-0 bg-white">
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
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center m-5 p-8 bg-white rounded-lg border border-dashed border-gray-200 min-h-[400px]">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mb-5 bg-gray-50">
            {transactionType === 'revenue' ? (
              <DollarSign className="h-8 w-8 text-gray-400" />
            ) : transactionType === 'expense' ? (
              <TrendingDown className="h-8 w-8 text-gray-400" />
            ) : (
              <Wallet className="h-8 w-8 text-gray-400" />
            )}
          </div>
          <span className="text-gray-800 font-semibold text-lg mb-2">
            No {transactionType === 'all' ? 'transactions' : transactionType} found
          </span>
          <p className="text-sm text-center text-gray-500 max-w-[280px]">
            {transactionType === 'all' 
              ? "No transactions match your current filters. Try changing your date selection or reset filters."
              : transactionType === 'revenue' 
                ? "Revenue transactions will appear here once they're created or imported."
                : "Expense transactions will appear here once they're created or imported."
            }
          </p>
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-4"
            onClick={resetFilters}
          >
            <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  );
}
