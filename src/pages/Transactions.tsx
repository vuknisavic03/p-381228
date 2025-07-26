
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { TransactionsTable } from "@/components/transactions/TransactionsTable";
import { TransactionFiltersNew } from "@/components/transactions/TransactionFiltersNew";
import { TransactionForm } from "@/components/transactions/TransactionForm";
import { DateRangeHeader } from "@/components/transactions/DateRangeHeader";
import { PageHeader } from "@/components/shared/PageHeader";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { DateRange } from "react-day-picker";
import { startOfMonth, endOfMonth } from "date-fns";

export default function Transactions() {
  const location = useLocation();
  const workspaceData = location.state?.workspace || {
    name: "Kevin's Workspace", 
    owner: "Kevin Anderson", 
    initials: "KA"
  };

  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: startOfMonth(new Date()),
    to: endOfMonth(new Date()),
  });

  // Mock data for demonstration - moved from TransactionActivityNew
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
  ];

  const [transactions] = useState(mockTransactions);
  const [filteredTransactions, setFilteredTransactions] = useState(mockTransactions);
  
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

  // Mock listings data
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
    
    // Property filter
    if (selectedProperties.length > 0) {
      filtered = filtered.filter(t => {
        return selectedProperties.some(selected => {
          if (selected.startsWith('listing-')) {
            const listingId = selected.replace('listing-', '');
            return t.selectedListingId === listingId;
          } else if (selected.startsWith('unit-')) {
            return false; // Unit matching logic can be implemented later
          }
          return false;
        });
      });
    }
    
    setFilteredTransactions(filtered);
  }, [transactions, transactionType, search, selectedCategories, selectedProperties]);

  // Transaction handlers
  const handleEditTransaction = (transaction: any) => {
    console.log('Edit transaction:', transaction.id);
  };

  const handleDeleteTransaction = (transaction: any) => {
    console.log('Delete transaction:', transaction.id);
  };

  return (
    <DashboardLayout
      workspaceName={workspaceData.name}
      userInitials={workspaceData.initials}
      owner={workspaceData.owner}
    >
      <div className="h-screen flex flex-col bg-gray-50">
        <PageHeader
          onAddClick={() => setIsAddFormOpen(true)}
          addButtonText="Add Transaction"
        >
          <DateRangeHeader 
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
          />
        </PageHeader>

        {/* Fixed filters section */}
        <div className="flex-shrink-0 bg-white border-b">
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
        </div>

        {/* Scrollable table section */}
        <div className="flex-1 bg-white p-4">
          <TransactionsTable
            transactions={filteredTransactions}
            onEdit={handleEditTransaction}
            onDelete={handleDeleteTransaction}
          />
        </div>

        <Sheet open={isAddFormOpen} onOpenChange={setIsAddFormOpen}>
          <SheetContent
            side="right"
            className="w-[600px] sm:w-[700px] lg:w-[800px] p-0 border-l shadow-2xl bg-white"
          >
            <TransactionForm onClose={() => setIsAddFormOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>
    </DashboardLayout>
  );
}
