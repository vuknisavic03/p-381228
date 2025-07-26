import React, { useState, useEffect } from "react";
import { TransactionsTable } from "./TransactionsTable";
import { TransactionFiltersNew } from "./TransactionFiltersNew";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { EditTransactionForm } from "./EditTransactionForm";

// Mock data for demonstration
const mockTransactions = [
  {
    id: 1,
    date: new Date("2024-01-15"),
    type: "revenue" as const,
    category: "rent",
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
    category: "maintenance",
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
    category: "deposit",
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
    category: "insurance",
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
    category: "rent", 
    amount: 1800,
    paymentMethod: "Cash",
    from: "Mountain Cabin - David Brown",
    notes: "Monthly rent payment - paid in cash",
    selectedListingId: "5",
  },
  {
    id: 6,
    date: new Date("2024-02-10"),
    type: "expense" as const,
    category: "utilities",
    amount: 250,
    paymentMethod: "Credit Card",
    from: "Oak Street Duplex - Electric Bill",
    notes: "Monthly electricity bill for February",
    selectedListingId: "1",
  },
  {
    id: 7,
    date: new Date("2024-02-12"),
    type: "revenue" as const,
    category: "rent",
    amount: 3200,
    paymentMethod: "Bank Transfer",
    from: "Luxury Penthouse - Sarah Wilson",
    notes: "February rent payment",
    selectedListingId: "2",
  },
  {
    id: 8,
    date: new Date("2024-02-15"),
    type: "expense" as const,
    category: "landscaping",
    amount: 450,
    paymentMethod: "Check",
    from: "Pine Valley Complex - Lawn Care",
    notes: "Monthly landscaping service",
    selectedListingId: "3",
  },
  {
    id: 9,
    date: new Date("2024-02-18"),
    type: "revenue" as const,
    category: "parking",
    amount: 150,
    paymentMethod: "Cash",
    from: "City Center Apartments - Parking Fee",
    notes: "Monthly parking space rental",
    selectedListingId: "4",
  },
  {
    id: 10,
    date: new Date("2024-02-20"),
    type: "expense" as const,
    category: "repairs",
    amount: 680,
    paymentMethod: "Credit Card",
    from: "Riverside Townhomes - HVAC Service",
    notes: "Air conditioning unit repair",
    selectedListingId: "5",
  },
  // Portfolio-level transactions
  {
    id: 16,
    date: new Date("2024-03-08"),
    type: "expense" as const,
    category: "legal",
    amount: 1200,
    paymentMethod: "Bank Transfer",
    from: "Legal & Associates Law Firm",
    notes: "Legal consultation for lease agreements",
    selectedListingId: "",
  },
  {
    id: 17,
    date: new Date("2024-03-10"),
    type: "expense" as const,
    category: "accounting",
    amount: 450,
    paymentMethod: "Credit Card",
    from: "CPA Services Inc",
    notes: "Monthly bookkeeping and tax preparation",
    selectedListingId: "",
  },
  {
    id: 18,
    date: new Date("2024-03-12"),
    type: "revenue" as const,
    category: "interest",
    amount: 125,
    paymentMethod: "Bank Transfer",
    from: "Wells Fargo Business Account",
    notes: "Monthly interest income from business savings",
    selectedListingId: "",
  },
];

export function TransactionActivityNew() {
  const [transactions] = useState(mockTransactions);
  const [filteredTransactions, setFilteredTransactions] = useState(mockTransactions);
  const [editingTransaction, setEditingTransaction] = useState<any>(null);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  
  // Filter states
  const [search, setSearch] = useState("");
  const [transactionType, setTransactionType] = useState<'revenue' | 'expense' | 'all'>('all');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedProperties, setSelectedProperties] = useState<string[]>([]);

  // Get filter options
  const getCategoryOptions = () => {
    const categories = Array.from(new Set(
      transactions
        .filter(t => transactionType === 'all' || t.type === transactionType)
        .map(t => t.category)
    ));
    
    return categories.map(category => ({
      value: category,
      label: category.charAt(0).toUpperCase() + category.slice(1).replace('_', ' '),
      count: transactions.filter(t => t.category === category && (transactionType === 'all' || t.type === transactionType)).length
    }));
  };

  const getTypeOptions = () => [
    { value: "all", label: "All", count: transactions.length },
    { value: "revenue", label: "Revenue", count: transactions.filter(t => t.type === 'revenue').length },
    { value: "expense", label: "Expense", count: transactions.filter(t => t.type === 'expense').length }
  ];

  // Mock listings data with units for hierarchical filter
  const getMockListings = () => [
    {
      id: "1",
      address: "Knez Mihailova 42",
      units: [
        { id: "1a", name: "Unit A", type: "Retail Space" },
        { id: "1b", name: "Unit B", type: "Storage" }
      ]
    },
    {
      id: "2", 
      address: "Terazije 23",
      units: [
        { id: "2a", name: "Office 1", type: "Office" },
        { id: "2b", name: "Office 2", type: "Office" },
        { id: "2c", name: "Conference Room", type: "Meeting Space" }
      ]
    },
    {
      id: "3",
      address: "Kalemegdan Park 1",
      // No units - single property
    },
    {
      id: "4",
      address: "Skadarlija 29",
    },
    {
      id: "5",
      address: "Makedonska 22",
    },
    {
      id: "",
      address: "Portfolio",
    }
  ];

  // Filter handlers
  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handlePropertyToggle = (property: string) => {
    setSelectedProperties(prev => 
      prev.includes(property) 
        ? prev.filter(p => p !== property)
        : [...prev, property]
    );
  };

  const handleClearFilters = () => {
    setSearch("");
    setSelectedCategories([]);
    setSelectedProperties([]);
  };

  // Apply filters
  useEffect(() => {
    let filtered = transactionType === 'all' ? transactions : transactions.filter(t => t.type === transactionType);
    
    // Search filter
    if (search) {
      filtered = filtered.filter(t => 
        t.from.toLowerCase().includes(search.toLowerCase()) ||
        t.category.toLowerCase().includes(search.toLowerCase()) ||
        t.notes?.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(t => selectedCategories.includes(t.category));
    }
    
    // Property filter - Fix this logic for hierarchical filter
    if (selectedProperties.length > 0) {
      filtered = filtered.filter(t => {
        return selectedProperties.some(selected => {
          if (selected.startsWith('listing-')) {
            const listingId = selected.replace('listing-', '');
            return t.selectedListingId === listingId;
          } else if (selected.startsWith('unit-')) {
            // For now, just match by listing since we don't have unit data in transactions
            // In a real app, you'd have transaction.selectedUnitId
            return false; // Or implement unit matching logic
          }
          return false;
        });
      });
    }
    
    setFilteredTransactions(filtered);
  }, [transactions, transactionType, search, selectedCategories, selectedProperties]);

  // Transaction handlers
  const handleEditTransaction = (transaction: any) => {
    setEditingTransaction(transaction);
    setIsEditFormOpen(true);
  };

  const handleDeleteTransaction = (transaction: any) => {
    console.log('Delete transaction:', transaction.id);
  };

  const handleUpdateTransaction = (updatedTransaction: any) => {
    console.log('Update transaction:', updatedTransaction);
    setIsEditFormOpen(false);
    setEditingTransaction(null);
  };

  const handleCloseEditForm = () => {
    setIsEditFormOpen(false);
    setEditingTransaction(null);
  };

  return (
    <div className="h-full flex flex-col">
      <TransactionFiltersNew
        search={search}
        onSearchChange={setSearch}
        categories={getCategoryOptions()}
        selectedCategories={selectedCategories}
        onCategoryToggle={handleCategoryToggle}
        listings={getMockListings()}
        selectedProperties={selectedProperties}
        onPropertyToggle={handlePropertyToggle}
        transactionType={transactionType}
        onTypeChange={setTransactionType}
        onClearFilters={handleClearFilters}
        typeOptions={getTypeOptions()}
      />
      
      <div className="flex-1 p-4">
        <TransactionsTable
          transactions={filteredTransactions}
          onEdit={handleEditTransaction}
          onDelete={handleDeleteTransaction}
        />
      </div>

      <Sheet open={isEditFormOpen} onOpenChange={setIsEditFormOpen}>
        <SheetContent
          side="right"
          className="w-[600px] sm:w-[700px] lg:w-[800px] p-0 border-l shadow-2xl bg-white"
        >
          {editingTransaction && (
            <EditTransactionForm
              transaction={editingTransaction}
              onUpdate={handleUpdateTransaction}
              onClose={handleCloseEditForm}
            />
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}