
import React, { useState, useEffect } from "react";
import { TransactionTable } from "./TransactionTable";
import { TransactionFilterBar } from "./TransactionFilterBar";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { EditTransactionForm } from "./EditTransactionForm";

// Mock data for demonstration
const mockTransactions = [
  {
    id: 1,
    date: new Date("2024-01-15"),
    type: "revenue" as const,
    category: "Rent",
    amount: 2500,
    paymentMethod: "Bank Transfer",
    from: "Sunset Villa - John Doe",
    notes: "Monthly rent payment",
    selectedListingId: "1",
  },
  {
    id: 2, 
    date: new Date("2024-01-20"),
    type: "expense" as const,
    category: "Maintenance",
    amount: 350,
    paymentMethod: "Credit Card",
    from: "Downtown Loft - Plumbing Repair",
    notes: "Plumbing repair in unit 2A",
    selectedListingId: "2",
  },
  {
    id: 3,
    date: new Date("2024-01-25"), 
    type: "revenue" as const,
    category: "Deposit",
    amount: 1200,
    paymentMethod: "Check",
    from: "Garden Apartments - Mike Johnson",
    notes: "Security deposit for new tenant",
    selectedListingId: "3",
  },
  {
    id: 4,
    date: new Date("2024-02-01"),
    type: "expense" as const, 
    category: "Insurance",
    amount: 800,
    paymentMethod: "Bank Transfer",
    from: "Beachfront Condo - Insurance Premium",
    notes: "Quarterly property insurance premium",
    selectedListingId: "4",
  },
  {
    id: 5,
    date: new Date("2024-02-05"),
    type: "revenue" as const,
    category: "Rent", 
    amount: 1800,
    paymentMethod: "Cash",
    from: "Mountain Cabin - David Brown",
    notes: "Monthly rent payment - paid in cash",
    selectedListingId: "5",
  }
];

export function TransactionActivity() {
  const [transactions, setTransactions] = useState(mockTransactions);
  const [filteredTransactions, setFilteredTransactions] = useState(mockTransactions);
  const [editingTransaction, setEditingTransaction] = useState<any>(null);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [transactionType, setTransactionType] = useState<'revenue' | 'expense'>('revenue');

  // Mock filter sections for the new TransactionFilterBar
  const filterSections = [
    {
      id: 'category',
      title: 'Category',
      options: [
        { value: 'rent', label: 'Rent' },
        { value: 'maintenance', label: 'Maintenance' },
        { value: 'deposit', label: 'Deposit' },
        { value: 'insurance', label: 'Insurance' },
      ],
      selectedValues: [],
      onToggle: (value: string) => {
        console.log('Category filter toggled:', value);
      },
      multiSelect: true,
    },
    {
      id: 'payment',
      title: 'Payment Method',
      options: [
        { value: 'bank_transfer', label: 'Bank Transfer' },
        { value: 'credit_card', label: 'Credit Card' },
        { value: 'check', label: 'Check' },
        { value: 'cash', label: 'Cash' },
      ],
      selectedValues: [],
      onToggle: (value: string) => {
        console.log('Payment method filter toggled:', value);
      },
      multiSelect: true,
    }
  ];

  const handleEditTransaction = (transaction: any) => {
    console.log('TransactionActivity - Opening edit form for transaction:', transaction);
    setEditingTransaction(transaction);
    setIsEditFormOpen(true);
  };

  const handleUpdateTransaction = (updatedTransaction: any) => {
    console.log('TransactionActivity - Updating transaction:', updatedTransaction);
    
    setTransactions(prev => 
      prev.map(t => t.id === updatedTransaction.id ? updatedTransaction : t)
    );
    
    setFilteredTransactions(prev => 
      prev.map(t => t.id === updatedTransaction.id ? updatedTransaction : t)
    );
    
    setIsEditFormOpen(false);
    setEditingTransaction(null);
  };

  const handleCloseEditForm = () => {
    console.log('TransactionActivity - Closing edit form');
    setIsEditFormOpen(false);
    setEditingTransaction(null);
  };

  const clearFilters = () => {
    setSearch("");
    setFilteredTransactions(transactions);
  };

  useEffect(() => {
    let filtered = [...transactions];
    
    // Filter by transaction type
    filtered = filtered.filter(t => t.type === transactionType);
    
    // Filter by search
    if (search) {
      filtered = filtered.filter(t => 
        t.from.toLowerCase().includes(search.toLowerCase()) ||
        t.category.toLowerCase().includes(search.toLowerCase()) ||
        t.notes?.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    setFilteredTransactions(filtered);
  }, [transactions, search, transactionType]);

  return (
    <div className="h-full flex flex-col">
      <TransactionFilterBar 
        search={search}
        setSearch={setSearch}
        filterSections={filterSections}
        activeFilterCount={0}
        clearFilters={clearFilters}
        transactionType={transactionType}
        setTransactionType={setTransactionType}
      />
      <div className="flex-1 overflow-hidden">
        <TransactionTable 
          transactions={filteredTransactions}
          onEdit={handleEditTransaction}
        />
      </div>

      <Sheet open={isEditFormOpen} onOpenChange={setIsEditFormOpen}>
        <SheetContent
          side="right"
          className="w-[600px] sm:w-[700px] lg:w-[900px] xl:w-[1000px] p-0 border-l shadow-2xl bg-white"
        >
          {editingTransaction && (
            <EditTransactionForm
              transaction={editingTransaction}
              onClose={handleCloseEditForm}
              onUpdate={handleUpdateTransaction}
            />
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
