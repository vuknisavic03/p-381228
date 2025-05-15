import React, { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { EditTransactionForm } from "./EditTransactionForm";
import { useToast } from "@/components/ui/use-toast";
import { TransactionTable } from "./TransactionTable";
import { Input } from "@/components/ui/input";
import { DollarSign, TrendingDown, X, RefreshCcw, Calendar as CalendarIcon, Filter as FilterIcon } from "lucide-react";

// Define type based on TransactionTable
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
};

// Mock transaction data
const mockTransactions: Transaction[] = [
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
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [filterPopoverOpen, setFilterPopoverOpen] = useState(false);
  const { toast } = useToast();
  const [search, setSearch] = useState('');

  // Collect available categories, payment methods, statuses from data
  const categories = Array.from(new Set(mockTransactions.map(t => t.category)));
  const paymentMethods = Array.from(new Set(mockTransactions.map(t => t.paymentMethod)));
  const statuses = Array.from(new Set(mockTransactions.map(t => t.status)));

  // Filter state
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

  // Handlers for filter popover checkboxes
  function toggleFilter(selected: string[], value: string, onChange: (v: string[]) => void) {
    if (selected.includes(value)) {
      onChange(selected.filter(v => v !== value));
    } else {
      onChange([...selected, value]);
    }
  }

  // Clear all filters
  const clearFilters = () => {
    setDate(undefined);
    setSelectedCategories([]);
    setSelectedPaymentMethods([]);
    setSelectedStatuses([]);
    toast({
      title: "Filters cleared",
      description: "All filters have been reset",
      duration: 3000,
    });
  };

  // Filter transactions as before
  const filteredTransactions = mockTransactions.filter(transaction => {
    if (transaction.type !== transactionType) return false;
    if (date) {
      const transactionDate = new Date(transaction.date);
      if (
        transactionDate.getFullYear() !== date.getFullYear() ||
        transactionDate.getMonth() !== date.getMonth() ||
        transactionDate.getDate() !== date.getDate()
      )
        return false;
    }
    if (selectedCategories.length && !selectedCategories.includes(transaction.category)) return false;
    if (selectedPaymentMethods.length && !selectedPaymentMethods.includes(transaction.paymentMethod)) return false;
    if (selectedStatuses.length && !selectedStatuses.includes(transaction.status)) return false;
    if (search && !(
      transaction.from.toLowerCase().includes(search.toLowerCase()) ||
      transaction.category.toLowerCase().includes(search.toLowerCase()) ||
      (transaction.notes ?? '').toLowerCase().includes(search.toLowerCase()) ||
      transaction.paymentMethod.toLowerCase().includes(search.toLowerCase())
    )) return false;

    return true;
  });

  // Handle transaction edit — opens sheet with edit form
  const handleEditTransaction = (tx: Transaction) => {
    setEditingTransaction(tx);
  };

  // Implement an onUpdate callback for EditTransactionForm
  const handleUpdateTransaction = (updatedTransaction: Transaction) => {
    // In the real app: update the transaction in local state or backend
    // Here: Simply close the sheet for demo, or update if next step
    setEditingTransaction(null);
    toast({
      title: "Transaction Updated",
      description: "Transaction was updated in demo mode.",
      duration: 3000
    });
  };

  return (
    <div className="h-full flex flex-col">
      {/* Filters and toggles bar */}
      <div className="sticky top-0 z-10 bg-white p-4 border-b border-gray-100 flex flex-col gap-3">
        <div className="flex flex-wrap items-center w-full gap-2">
          {/* Search bar */}
          <div className="w-[220px]">
            <Input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search"
              className="text-sm bg-[#F6F6F7] border-gray-200 rounded-lg pl-3 focus:bg-white focus:ring-1 focus:ring-gray-300 placeholder:text-gray-400"
              style={{ fontSize: '0.94rem' }}
            />
          </div>
          {/* Date Picker */}
          <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
            <PopoverTrigger asChild>
              <Button 
                variant={date ? "default" : "outline"}
                size="sm"
                className={cn(
                  "text-sm flex items-center gap-1.5 ml-1",
                  date ? "bg-gray-800 text-white hover:bg-gray-700" : "border-gray-200 bg-white hover:bg-gray-50 transition-colors"
                )}
              >
                <CalendarIcon className="h-3.5 w-3.5" />
                {date ? format(date, "MMM d, yyyy") : "Date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-auto p-0">
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
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
          {/* Filter Button */}
          <Popover open={filterPopoverOpen} onOpenChange={setFilterPopoverOpen}>
            <PopoverTrigger asChild>
              <Button
                variant={selectedCategories.length || selectedPaymentMethods.length || selectedStatuses.length ? "default" : "outline"}
                size="sm"
                className="text-sm flex items-center gap-1.5"
              >
                <FilterIcon className="h-4 w-4" />
                Filter
                {(selectedCategories.length + selectedPaymentMethods.length + selectedStatuses.length) > 0 && (
                  <span className="inline-flex items-center bg-gray-700 text-white text-xs px-1 rounded-full ml-2">
                    {selectedCategories.length + selectedPaymentMethods.length + selectedStatuses.length}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-72 p-0">
              <div className="p-4">
                <div className="font-bold text-sm mb-1">Category</div>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {categories.map(cat => (
                    <label key={cat} className="flex items-center gap-1 text-sm">
                      <input
                        type="checkbox"
                        className="accent-gray-700"
                        checked={selectedCategories.includes(cat)}
                        onChange={() => toggleFilter(selectedCategories, cat, setSelectedCategories)}
                      />
                      {cat}
                    </label>
                  ))}
                </div>
                <div className="font-bold text-sm mb-1">Payment Method</div>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {paymentMethods.map(pm => (
                    <label key={pm} className="flex items-center gap-1 text-sm">
                      <input
                        type="checkbox"
                        className="accent-gray-700"
                        checked={selectedPaymentMethods.includes(pm)}
                        onChange={() => toggleFilter(selectedPaymentMethods, pm, setSelectedPaymentMethods)}
                      />
                      {pm}
                    </label>
                  ))}
                </div>
                <div className="font-bold text-sm mb-1">Status</div>
                <div className="flex gap-2 mb-4">
                  {statuses.map(status => (
                    <label key={status} className="flex items-center gap-1 text-sm">
                      <input
                        type="checkbox"
                        className="accent-gray-700"
                        checked={selectedStatuses.includes(status)}
                        onChange={() => toggleFilter(selectedStatuses, status, setSelectedStatuses)}
                      />
                      {status}
                    </label>
                  ))}
                </div>
                <div className="flex justify-between mt-4 gap-2">
                  <Button variant="outline" size="sm" onClick={() => {
                    setSelectedCategories([]); setSelectedPaymentMethods([]); setSelectedStatuses([]);
                  }}>
                    Reset
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setFilterPopoverOpen(false)}
                  >
                    Apply
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          {/* Right-aligned transactionType toggle - unify font/height */}
          <div className="flex-1" />
          <div className="flex p-1 bg-gray-100 rounded-full">
            <button 
              onClick={() => setTransactionType('revenue')}
              className={`relative flex items-center px-4 py-1.5 rounded-full font-medium transition-all duration-200 ${
                transactionType === 'revenue' 
                  ? 'bg-white text-black shadow-sm' 
                  : 'text-gray-500 hover:text-black'
              }`}
              style={{ fontSize: '0.94rem', height: '36px' }}
              aria-pressed={transactionType === 'revenue'}
            >
              <DollarSign className={`h-4 w-4 mr-1.5 ${transactionType === 'revenue' ? 'text-black' : 'text-gray-400'}`} />
              <span>Revenue</span>
            </button>
            <button 
              onClick={() => setTransactionType('expense')}
              className={`relative flex items-center px-4 py-1.5 rounded-full font-medium transition-all duration-200 ${
                transactionType === 'expense' 
                  ? 'bg-white text-black shadow-sm' 
                  : 'text-gray-500 hover:text-black'
              }`}
              style={{ fontSize: '0.94rem', height: '36px' }}
              aria-pressed={transactionType === 'expense'}
            >
              <TrendingDown className={`h-4 w-4 mr-1.5 ${transactionType === 'expense' ? 'text-black' : 'text-gray-400'}`} />
              <span>Expenses</span>
            </button>
          </div>
        </div>
        {/* Show active date/filter chips */}
        {(date || selectedCategories.length > 0 || selectedPaymentMethods.length > 0 || selectedStatuses.length > 0) && (
          <div className="flex flex-wrap gap-2 mt-2">
            {date && (
              <div className="inline-flex items-center gap-1.5 text-xs py-1 px-2 bg-gray-100 text-gray-700 rounded-md">
                <span>Date: {format(date, "MMM d, yyyy")}</span>
                <button onClick={() => setDate(undefined)} className="text-gray-500 hover:text-gray-700">
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}
            {selectedCategories.map(cat => (
              <div key={cat} className="inline-flex items-center gap-1.5 text-xs py-1 px-2 bg-gray-100 text-gray-700 rounded-md">
                <span>Category: {cat}</span>
                <button onClick={() => toggleFilter(selectedCategories, cat, setSelectedCategories)} className="text-gray-500 hover:text-gray-700">
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
            {selectedPaymentMethods.map(pm => (
              <div key={pm} className="inline-flex items-center gap-1.5 text-xs py-1 px-2 bg-gray-100 text-gray-700 rounded-md">
                <span>Payment: {pm}</span>
                <button onClick={() => toggleFilter(selectedPaymentMethods, pm, setSelectedPaymentMethods)} className="text-gray-500 hover:text-gray-700">
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
            {selectedStatuses.map(status => (
              <div key={status} className="inline-flex items-center gap-1.5 text-xs py-1 px-2 bg-gray-100 text-gray-700 rounded-md">
                <span>Status: {status}</span>
                <button onClick={() => toggleFilter(selectedStatuses, status, setSelectedStatuses)} className="text-gray-500 hover:text-gray-700">
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
            {/* Clear filters */}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearFilters}
              className="h-8 text-xs gap-1.5 text-gray-600 hover:text-black"
            >
              <RefreshCcw className="h-3 w-3" />
              Clear filters
            </Button>
          </div>
        )}
      </div>

      {/* Modern Table */}
      <div className="flex-1 p-5 bg-[#FAFBFC]">
        <div className="max-w-full mx-auto">
          <div className="mb-4">
            {/* Results Table or Empty State */}
            <TransactionTable
              transactions={filteredTransactions}
              onEdit={handleEditTransaction}
            />
          </div>
        </div>
      </div>

      {/* Edit sheet */}
      {editingTransaction && (
        <Sheet open={!!editingTransaction} onOpenChange={() => setEditingTransaction(null)}>
          <SheetContent side="right" className="sm:max-w-md p-0">
            <EditTransactionForm
              transaction={editingTransaction}
              onClose={() => setEditingTransaction(null)}
              onUpdate={handleUpdateTransaction}
            />
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
}

// NOTE: This file is getting large! Consider asking me to refactor/split filter bar and large sections into their own components for maintainability!
