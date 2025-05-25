
import React, { useState } from 'react';
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { TransactionTable } from "./TransactionTable";
import { FilterTags } from "@/components/ui/filter-tags";
import { EditTransactionForm } from "./EditTransactionForm";
import { TransactionFilterBar } from "./TransactionFilterBar";
import { format } from "date-fns";
import { FilterSection } from "@/components/ui/modern-filter";

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
  selectedListingId: string;
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
    status: 'completed',
    selectedListingId: '1' // Belgrade, Dunavska 12
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
    status: 'completed',
    selectedListingId: '1'
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
    status: 'completed',
    selectedListingId: '1'
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
    status: 'completed',
    selectedListingId: '1'
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
    status: 'completed',
    selectedListingId: '1'
  }
];

export function TransactionActivity() {
  const [transactionType, setTransactionType] = useState<'revenue' | 'expense'>('revenue');
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [search, setSearch] = useState('');
  const { toast } = useToast();

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

  // Build filter sections for the ModernFilter component
  const filterSections: FilterSection[] = [
    {
      id: "category",
      title: "Category",
      options: categories.map(category => ({
        value: category,
        label: category
      })),
      selectedValues: selectedCategories,
      onToggle: (value: string) => toggleFilter(selectedCategories, value, setSelectedCategories),
    },
    {
      id: "paymentMethod", 
      title: "Payment Method",
      options: paymentMethods.map(method => ({
        value: method,
        label: method
      })),
      selectedValues: selectedPaymentMethods,
      onToggle: (value: string) => toggleFilter(selectedPaymentMethods, value, setSelectedPaymentMethods),
    },
    {
      id: "status",
      title: "Status",
      options: statuses.map(status => ({
        value: status,
        label: status.charAt(0).toUpperCase() + status.slice(1)
      })),
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

  // Filter transactions
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

  // Handle transaction edit
  const handleEditTransaction = (tx: Transaction) => {
    setEditingTransaction(tx);
  };

  // Implement an onUpdate callback for EditTransactionForm
  const handleUpdateTransaction = (updatedTransaction: Transaction) => {
    setEditingTransaction(null);
    toast({
      title: "Transaction Updated",
      description: "Transaction was updated successfully.",
      duration: 3000
    });
  };

  return (
    <div className="h-full">
      {/* Filter bar component */}
      <TransactionFilterBar 
        search={search}
        setSearch={setSearch}
        date={date}
        setDate={setDate}
        filterSections={filterSections}
        activeFilterCount={activeFilterCount}
        clearFilters={clearFilters}
        transactionType={transactionType}
        setTransactionType={setTransactionType}
      />
      
      {/* Show active filter tags */}
      <FilterTags tags={filterTags} onClearAll={clearFilters} />

      {/* Modern Table with Notion-inspired styling */}
      <div className="flex-1 overflow-auto p-4">
        <div className="max-w-full mx-auto">
          <div className="animate-fade-in">
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
