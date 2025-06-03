
import React, { useState } from 'react';
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { TransactionTable } from "./TransactionTable";
import { EditTransactionForm } from "./EditTransactionForm";
import { TransactionFilterBar } from "./TransactionFilterBar";
import { FilterSection } from "@/components/ui/modern-filter";
import { DateRange } from "react-day-picker";

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
  selectedListingId: string;
};

// Enhanced mock transaction data for better table design testing
const mockTransactions: Transaction[] = [
  {
    id: 1,
    type: 'revenue',
    amount: 1200,
    date: new Date(2025, 4, 1), // May 1, 2025
    category: 'Rent',
    paymentMethod: 'Bank Transfer',
    from: 'Alexander Whitmore',
    notes: 'Monthly rent payment for unit 4B',
    selectedListingId: '1'
  },
  {
    id: 2,
    type: 'revenue',
    amount: 1500,
    date: new Date(2025, 4, 5), // May 5, 2025
    category: 'Deposit',
    paymentMethod: 'Credit Card',
    from: 'Sarah Johnson',
    notes: 'Security deposit for apartment lease agreement',
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
    notes: 'Emergency plumbing repair in unit 4B - leaking pipes',
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
    notes: 'Late rent payment for April - received with late fee',
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
    notes: 'Monthly electricity bill for common areas',
    selectedListingId: '1'
  },
  {
    id: 6,
    type: 'revenue',
    amount: 2200,
    date: new Date(2025, 4, 15), // May 15, 2025
    category: 'Rent',
    paymentMethod: 'Bank Transfer',
    from: 'Tech Solutions LLC',
    notes: 'Commercial office rent - monthly payment',
    selectedListingId: '2'
  },
  {
    id: 7,
    type: 'expense',
    amount: 800,
    date: new Date(2025, 4, 12), // May 12, 2025
    category: 'Repairs',
    paymentMethod: 'Check',
    from: 'Premier Construction Co.',
    notes: 'HVAC system repair and maintenance',
    selectedListingId: '2'
  },
  {
    id: 8,
    type: 'revenue',
    amount: 75,
    date: new Date(2025, 4, 10), // May 10, 2025
    category: 'Late Fee',
    paymentMethod: 'Credit Card',
    from: 'Michael Chen',
    notes: 'Late payment fee for May rent',
    selectedListingId: '1'
  },
  {
    id: 9,
    type: 'expense',
    amount: 250,
    date: new Date(2025, 4, 7), // May 7, 2025
    category: 'Cleaning',
    paymentMethod: 'Bank Transfer',
    from: 'Professional Cleaners Inc.',
    notes: 'Deep cleaning after tenant move-out',
    selectedListingId: '1'
  },
  {
    id: 10,
    type: 'revenue',
    amount: 1800,
    date: new Date(2025, 4, 20), // May 20, 2025
    category: 'Rent',
    paymentMethod: 'ACH Transfer',
    from: 'Jennifer Martinez',
    notes: 'Monthly rent for luxury apartment unit',
    selectedListingId: '3'
  },
  {
    id: 11,
    type: 'expense',
    amount: 180,
    date: new Date(2025, 4, 18), // May 18, 2025
    category: 'Insurance',
    paymentMethod: 'Bank Transfer',
    from: 'PropertyGuard Insurance',
    notes: 'Monthly property insurance premium',
    selectedListingId: '1'
  },
  {
    id: 12,
    type: 'revenue',
    amount: 500,
    date: new Date(2025, 4, 25), // May 25, 2025
    category: 'Parking',
    paymentMethod: 'Cash',
    from: 'David Thompson',
    notes: 'Monthly parking space rental fee',
    selectedListingId: '2'
  },
  {
    id: 13,
    type: 'expense',
    amount: 1200,
    date: new Date(2025, 4, 3), // May 3, 2025
    category: 'Property Tax',
    paymentMethod: 'Check',
    from: 'City Tax Office',
    notes: 'Quarterly property tax payment',
    selectedListingId: '1'
  },
  {
    id: 14,
    type: 'revenue',
    amount: 300,
    date: new Date(2025, 4, 22), // May 22, 2025
    category: 'Application Fee',
    paymentMethod: 'Credit Card',
    from: 'Emma Rodriguez',
    notes: 'Rental application processing fee',
    selectedListingId: '1'
  },
  {
    id: 15,
    type: 'expense',
    amount: 95,
    date: new Date(2025, 4, 14), // May 14, 2025
    category: 'Landscaping',
    paymentMethod: 'Cash',
    from: 'Green Thumb Gardens',
    notes: 'Monthly lawn care and garden maintenance',
    selectedListingId: '3'
  }
];

export function TransactionActivity() {
  const [transactionType, setTransactionType] = useState<'revenue' | 'expense'>('revenue');
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2025, 4, 1),
    to: new Date(2025, 4, 31),
  });
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [search, setSearch] = useState('');
  const { toast } = useToast();

  // Enhanced filter state
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState<string[]>([]);
  const [amountRange, setAmountRange] = useState<{ min?: number; max?: number }>({});

  // Collect available categories, payment methods from data
  const categories = Array.from(new Set(mockTransactions.map(t => t.category)));
  const paymentMethods = Array.from(new Set(mockTransactions.map(t => t.paymentMethod)));

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
    setDateRange({
      from: new Date(2025, 4, 1),
      to: new Date(2025, 4, 31),
    });
    setSelectedCategories([]);
    setSelectedPaymentMethods([]);
    setAmountRange({});
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
  ];

  // Get total count of active filters (including date range)
  const activeFilterCount = 
    selectedCategories.length + 
    selectedPaymentMethods.length;

  // Filter transactions
  const filteredTransactions = mockTransactions.filter(transaction => {
    if (transaction.type !== transactionType) return false;
    
    if (dateRange?.from || dateRange?.to) {
      const transactionDate = new Date(transaction.date);
      if (dateRange.from && transactionDate < dateRange.from) return false;
      if (dateRange.to && transactionDate > dateRange.to) return false;
    }
    
    if (selectedCategories.length && !selectedCategories.includes(transaction.category)) return false;
    if (selectedPaymentMethods.length && !selectedPaymentMethods.includes(transaction.paymentMethod)) return false;
    
    if (search && !(
      transaction.from.toLowerCase().includes(search.toLowerCase()) ||
      transaction.category.toLowerCase().includes(search.toLowerCase()) ||
      (transaction.notes ?? '').toLowerCase().includes(search.toLowerCase()) ||
      transaction.paymentMethod.toLowerCase().includes(search.toLowerCase())
    )) return false;

    return true;
  });

  console.log('Total mock transactions:', mockTransactions.length);
  console.log('Current transaction type:', transactionType);
  console.log('Current date range:', dateRange);
  console.log('Filtered transactions:', filteredTransactions.length);

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
    <div className="h-full flex flex-col">
      <TransactionFilterBar 
        search={search}
        setSearch={setSearch}
        filterSections={filterSections}
        activeFilterCount={activeFilterCount}
        clearFilters={clearFilters}
        transactionType={transactionType}
        setTransactionType={setTransactionType}
      />
      
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <TransactionTable
            transactions={filteredTransactions}
            onEdit={handleEditTransaction}
          />
        </div>
      </div>

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
