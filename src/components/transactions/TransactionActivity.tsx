
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Calendar as CalendarIcon, TrendingDown, ChevronRight, FileText, Check, X, RefreshCcw } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { EditTransactionForm } from "./EditTransactionForm";
import { useToast } from "@/components/ui/use-toast";
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
  const [transactionType, setTransactionType] = useState<'revenue' | 'expense'>('revenue');
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [editingTransaction, setEditingTransaction] = useState<any>(null);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const { toast } = useToast();
  
  // Local toggle function that only affects the activity center
  const toggleTransactionType = () => {
    setTransactionType(prevType => prevType === 'revenue' ? 'expense' : 'revenue');
  };

  // Clear all filters
  const clearFilters = () => {
    setDate(undefined);
    toast({
      title: "Filters cleared",
      description: "All filters have been reset",
    });
  };

  // Filter transactions based on selected type and date
  const filteredTransactions = mockTransactions.filter(transaction => {
    // Filter by transaction type
    if (transaction.type !== transactionType) return false;
    
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
  });

  // Handle transaction update
  const handleUpdateTransaction = (updatedTransaction: any) => {
    // In a real app, this would update the state or call an API
    console.log("Transaction updated:", updatedTransaction);
    setEditingTransaction(null);
    
    toast({
      title: "Transaction updated",
      description: "Your changes have been saved successfully",
    });
  };

  return (
    <div className="h-full flex flex-col">
      {/* Improved filter controls positioning */}
      <div className="p-5 bg-white">
        {/* Transaction type toggle with improved positioning */}
        <div className="flex flex-col gap-5">
          {/* Combined filters row */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            {/* Transaction type toggle */}
            <div className="flex p-1 bg-gray-100 rounded-full">
              <button 
                onClick={() => setTransactionType('revenue')}
                className={`relative flex items-center px-4 py-2 rounded-full font-medium text-sm transition-all duration-200 ${
                  transactionType === 'revenue' 
                    ? 'bg-white text-gray-800 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                aria-pressed={transactionType === 'revenue'}
              >
                <DollarSign className={`h-4 w-4 mr-1.5 ${transactionType === 'revenue' ? 'text-emerald-500' : 'text-gray-500'}`} />
                <span>Revenue</span>
              </button>
              <button 
                onClick={() => setTransactionType('expense')}
                className={`relative flex items-center px-4 py-2 rounded-full font-medium text-sm transition-all duration-200 ${
                  transactionType === 'expense' 
                    ? 'bg-white text-gray-800 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                aria-pressed={transactionType === 'expense'}
              >
                <TrendingDown className={`h-4 w-4 mr-1.5 ${transactionType === 'expense' ? 'text-rose-500' : 'text-gray-500'}`} />
                <span>Expenses</span>
              </button>
            </div>
            
            {/* Date filter */}
            <div className="flex items-center gap-2">
              <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button 
                    variant={date ? "default" : "outline"}
                    size="sm" 
                    className={cn(
                      "text-sm flex items-center gap-1.5",
                      date ? "bg-gray-800 text-white hover:bg-gray-700" : "border-gray-200 bg-white hover:bg-gray-50 transition-colors"
                    )}
                  >
                    <CalendarIcon className="h-3.5 w-3.5" />
                    {date ? format(date, "MMM d, yyyy") : "Filter by date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-auto p-0 border-gray-200 shadow-lg">
                  <div className="p-2 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-700">Select a date</p>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 px-2 text-gray-500" 
                        onClick={() => {
                          setDate(undefined);
                          setCalendarOpen(false);
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(selectedDate) => {
                      setDate(selectedDate);
                      setCalendarOpen(false);
                    }}
                    initialFocus
                    className={cn("rounded-md shadow-none pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
              
              {/* Clear filters button - only shown when filters are active */}
              {date && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearFilters}
                  className="h-9 text-xs gap-1.5 text-gray-600 hover:text-gray-900"
                >
                  <RefreshCcw className="h-3 w-3" />
                  Clear filters
                </Button>
              )}
            </div>
          </div>
          
          {/* Active filters indicators */}
          {date && (
            <div className="flex flex-wrap gap-2">
              <div className="inline-flex items-center gap-1.5 text-xs py-1 px-2.5 bg-gray-100 text-gray-700 rounded-md">
                <span>Date: {format(date, "MMM d, yyyy")}</span>
                <button 
                  onClick={() => setDate(undefined)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {filteredTransactions.length > 0 ? (
        <div className="flex-1 overflow-auto p-5">
          <div className="rounded-lg overflow-hidden border border-gray-200 bg-white shadow-sm">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 hover:bg-gray-50">
                  <TableHead className="w-[120px] pl-4 py-3 font-medium text-gray-500">Amount</TableHead>
                  <TableHead className="font-medium text-gray-500">Details</TableHead>
                  <TableHead className="text-right pr-4 font-medium text-gray-500">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow 
                    key={transaction.id} 
                    className="border-t border-gray-100 hover:bg-gray-50/70 transition-colors"
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
                          <p className="font-semibold text-gray-900">
                            ${transaction.amount.toLocaleString()}
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
                        <div className="mt-1.5">
                          <Badge variant="outline" className="text-xs font-normal text-gray-600 bg-gray-50">
                            {transaction.paymentMethod}
                          </Badge>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right pr-4">
                      <Sheet>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingTransaction(transaction)}
                          className="h-8 px-3 border-gray-200 text-gray-600 hover:text-gray-800"
                        >
                          Edit
                          <ChevronRight className="h-3.5 w-3.5 ml-1 opacity-70" />
                        </Button>
                        <SheetContent side="right" className="sm:max-w-md p-0">
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
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center m-5 p-10 bg-white rounded-lg border border-dashed border-gray-200 shadow-sm">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-5 ${
            transactionType === 'revenue' ? 'bg-emerald-50' : 'bg-rose-50'
          }`}>
            {transactionType === 'revenue' ? (
              <DollarSign className={`h-8 w-8 ${transactionType === 'revenue' ? 'text-emerald-500' : 'text-gray-500'}`} />
            ) : (
              <TrendingDown className={`h-8 w-8 ${transactionType === 'expense' ? 'text-rose-500' : 'text-gray-500'}`} />
            )}
          </div>
          
          <span className="text-gray-800 font-semibold text-lg mb-2">
            {date 
              ? `No ${transactionType} on ${format(date, "MMMM d, yyyy")}` 
              : `No ${transactionType} yet`
            }
          </span>
          
          <p className="text-sm text-center text-gray-500 max-w-[350px] mb-6">
            {date 
              ? `There are no ${transactionType} transactions recorded for this date. Try selecting a different date or clearing filters.`
              : `${transactionType === 'revenue' 
                  ? "Revenue transactions will appear here once they're created or imported from your connected accounts."
                  : "Expense transactions will appear here once they're created or imported from your connected accounts."
                }`
            }
          </p>
          
          {date && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={clearFilters}
              className="gap-2"
            >
              <RefreshCcw className="h-3.5 w-3.5" />
              Clear date filter
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
