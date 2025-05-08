
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
  const [transactionType, setTransactionType] = useState<'revenue' | 'expense'>('revenue');
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [editingTransaction, setEditingTransaction] = useState<any>(null);
  
  // Local toggle function that only affects the activity center
  const toggleTransactionType = () => {
    setTransactionType(prevType => prevType === 'revenue' ? 'expense' : 'revenue');
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
  };

  return (
    <div className="h-full flex flex-col">
      <div className="sticky top-0 z-10 bg-white p-5 border-b border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-semibold text-gray-800">Activity</h2>
          <button 
            onClick={toggleTransactionType}
            className={`flex items-center px-3 py-1.5 rounded-full font-medium transition-colors duration-200 ${
              transactionType === 'revenue' 
                ? 'bg-gray-100 text-gray-700' 
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            {transactionType === 'revenue' ? (
              <>
                <DollarSign className="h-3.5 w-3.5 mr-1.5" />
                <span className="text-xs">Revenue</span>
              </>
            ) : (
              <>
                <TrendingDown className="h-3.5 w-3.5 mr-1.5" />
                <span className="text-xs">Expenses</span>
              </>
            )}
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            {/* Calendar Popover */}
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs flex items-center gap-1 border-gray-200 bg-white hover:bg-gray-50 transition-colors"
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
          </div>
        </div>
      </div>
      
      {filteredTransactions.length > 0 ? (
        <div className="flex-1 overflow-auto p-5">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-100 hover:bg-transparent">
                <TableHead className="w-[100px] pl-0">Amount</TableHead>
                <TableHead>Details</TableHead>
                <TableHead className="text-right pr-0">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TableRow 
                  key={transaction.id} 
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <TableCell className="py-4 pl-0">
                    <div className="flex items-start">
                      <div className={`mt-1 w-8 h-8 rounded-full flex items-center justify-center ${
                        transaction.type === 'revenue' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
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
                      <div className="mt-1">
                        <Badge variant="outline" className="text-xs font-normal text-gray-600 bg-gray-50">
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
                          className="h-8 w-8 p-0"
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
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center m-5 p-8 bg-gray-50 rounded-lg border border-dashed border-gray-200 min-h-[400px]">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-5 ${
            transactionType === 'revenue' ? 'bg-gray-100' : 'bg-gray-100'
          }`}>
            {transactionType === 'revenue' ? (
              <DollarSign className="h-8 w-8 text-gray-500" />
            ) : (
              <TrendingDown className="h-8 w-8 text-gray-500" />
            )}
          </div>
          <span className="text-gray-800 font-semibold text-lg mb-2">No {transactionType} yet</span>
          <p className="text-sm text-center text-gray-500 max-w-[280px]">
            {transactionType === 'revenue' 
              ? "Revenue transactions will appear here once they're created or imported from your connected accounts."
              : "Expense transactions will appear here once they're created or imported from your connected accounts."}
          </p>
        </div>
      )}
    </div>
  );
}
