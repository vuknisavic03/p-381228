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
import { DollarSign, TrendingDown, X, RefreshCcw, Calendar as CalendarIcon, Filter as FilterIcon, Search } from "lucide-react";
import { FilterPopover } from "@/components/ui/filter-popover";
import { FilterTags } from "@/components/ui/filter-tags";
import { TransactionTypeToggle } from "./TransactionTypeToggle";

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
  const { toast } = useToast();
  const [search, setSearch] = useState('');

  // Enhanced filter state
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [amountRange, setAmountRange] = useState<{ min?: number; max?: number }>({});
  const [dateRange, setDateRange] = useState<{ start?: Date; end?: Date }>({});

  // Collect available categories, payment methods, statuses from data
  const categories = Array.from(new Set(mockTransactions.map(t => t.category)));
  const paymentMethods = Array.from(new Set(mockTransactions.map(t => t.paymentMethod)));
  const statuses = Array.from(new Set(mockTransactions.map(t => t.status)));

  // Function to toggle a value in a filter array
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
    setAmountRange({});
    setDateRange({});
    toast({
      title: "Filters cleared",
      description: "All filters have been reset",
      duration: 3000,
    });
  };

  // Build filter groups for the FilterPopover component
  const filterGroups = [
    {
      title: "Category",
      options: categories,
      selectedValues: selectedCategories,
      onToggle: (value: string) => toggleFilter(selectedCategories, value, setSelectedCategories),
    },
    {
      title: "Payment Method",
      options: paymentMethods,
      selectedValues: selectedPaymentMethods,
      onToggle: (value: string) => toggleFilter(selectedPaymentMethods, value, setSelectedPaymentMethods),
    },
    {
      title: "Status",
      options: statuses,
      selectedValues: selectedStatuses,
      onToggle: (value: string) => toggleFilter(selectedStatuses, value, setSelectedStatuses),
    },
  ];

  // Get total count of active filters
  const activeFilterCount = 
    selectedCategories.length + 
    selectedPaymentMethods.length + 
    selectedStatuses.length + 
    (date ? 1 : 0);

  // Prepare filter tags for the FilterTags component
  const filterTags = [
    ...(date ? [{ 
      category: "Date", 
      value: format(date, "MMM d, yyyy"), 
      onRemove: () => setDate(undefined) 
    }] : []),
    ...selectedCategories.map(category => ({
      category: "Category",
      value: category,
      onRemove: () => toggleFilter(selectedCategories, category, setSelectedCategories)
    })),
    ...selectedPaymentMethods.map(method => ({
      category: "Payment",
      value: method,
      onRemove: () => toggleFilter(selectedPaymentMethods, method, setSelectedPaymentMethods)
    })),
    ...selectedStatuses.map(status => ({
      category: "Status",
      value: status,
      onRemove: () => toggleFilter(selectedStatuses, status, setSelectedStatuses)
    })),
  ];

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
    setEditingTransaction(null);
    toast({
      title: "Transaction Updated",
      description: "Transaction was updated in demo mode.",
      duration: 3000
    });
  };

  return (
    <div className="h-full">
      {/* Filters and toggles bar - Updated to match Listings page style */}
      <div className="border-b">
        <div className="flex flex-wrap items-center w-full gap-2 p-4">
          {/* Search bar - matching Listings style */}
          <div className="relative flex-1 max-w-[300px]">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input 
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name, category or notes..." 
              className="pl-8 h-9 transition-all duration-200 focus:ring-2 focus:ring-primary/20" 
            />
          </div>
          
          {/* Date Picker */}
          <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                size="sm"
                className={cn(
                  "text-sm flex items-center gap-1.5 ml-1 h-9",
                  date ? "bg-primary/10 text-primary border-primary/20" : ""
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
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
          
          {/* Enhanced Filter Button */}
          <FilterPopover
            groups={filterGroups}
            selectedCount={activeFilterCount}
            onReset={clearFilters}
            trigger={
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  "text-sm flex items-center gap-1.5 h-9",
                  activeFilterCount > 0 ? "bg-primary/10 text-primary border-primary/20" : ""
                )}
              >
                <FilterIcon className="h-4 w-4" />
                Filter
                {activeFilterCount > 0 && (
                  <span className="flex items-center justify-center rounded-full bg-primary text-primary-foreground text-xs w-5 h-5 ml-1">
                    {activeFilterCount}
                  </span>
                )}
              </Button>
            }
          />
          
          {/* Right-aligned transactionType toggle - with improved design */}
          <div className="flex-1" />
          <TransactionTypeToggle 
            value={transactionType} 
            onChange={setTransactionType} 
            className="h-9"
          />
        </div>
        
        {/* Show active filter tags */}
        <FilterTags tags={filterTags} onClearAll={clearFilters} />
      </div>

      {/* Modern Table */}
      <div className="flex-1 overflow-auto">
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
          <SheetContent side="right" className="w-[480px] sm:w-[540px] p-0 border-l shadow-xl bg-white">
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
