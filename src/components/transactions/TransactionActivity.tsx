import React, { useState, useEffect } from "react";
import { TransactionTable } from "./TransactionTable";
import { TransactionFilterBar } from "./TransactionFilterBar";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { EditTransactionForm } from "./EditTransactionForm";
import { fetchListings } from "@/services/listingsService";

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
  {
    id: 11,
    date: new Date("2024-02-22"),
    type: "revenue" as const,
    category: "late_fees",
    amount: 75,
    paymentMethod: "Bank Transfer",
    from: "Maple Grove Apartments - Late Fee",
    notes: "Late payment fee collected",
    selectedListingId: "1",
  },
  {
    id: 12,
    date: new Date("2024-02-25"),
    type: "expense" as const,
    category: "cleaning",
    amount: 200,
    paymentMethod: "Cash",
    from: "Highland Estates - Deep Cleaning",
    notes: "Post-tenant move-out cleaning",
    selectedListingId: "2",
  },
  {
    id: 13,
    date: new Date("2024-02-28"),
    type: "revenue" as const,
    category: "application_fees",
    amount: 100,
    paymentMethod: "Credit Card",
    from: "Sunset Villas - Application Fee",
    notes: "Tenant application processing fee",
    selectedListingId: "3",
  },
  {
    id: 14,
    date: new Date("2024-03-01"),
    type: "expense" as const,
    category: "advertising",
    amount: 300,
    paymentMethod: "Bank Transfer",
    from: "Metro Properties - Online Listing",
    notes: "Property listing on rental platforms",
    selectedListingId: "4",
  },
  {
    id: 15,
    date: new Date("2024-03-05"),
    type: "revenue" as const,
    category: "rent",
    amount: 2750,
    paymentMethod: "Check",
    from: "Oceanview Condos - Emma Davis",
    notes: "March rent payment with utilities",
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
  const [listings, setListings] = useState<any[]>([]);
  const [selectedListings, setSelectedListings] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Load listings on component mount
  useEffect(() => {
    const loadListings = async () => {
      try {
        const listingsData = await fetchListings();
        setListings(listingsData);
      } catch (error) {
        console.error('Error loading listings:', error);
      }
    };
    loadListings();
  }, []);

  // Create filter options from listings and their units
  const createListingFilterOptions = () => {
    const options: Array<{ value: string; label: string }> = [];
    
    listings.forEach(listing => {
      // Add the main listing
      options.push({
        value: listing.id,
        label: listing.name
      });
      
      // Add individual units if they exist
      if (listing.units && listing.units.length > 0) {
        listing.units.forEach((unit: any) => {
          options.push({
            value: `${listing.id}-${unit.id}`,
            label: `${listing.name} - ${unit.unitNumber}`
          });
        });
      }
    });
    
    return options;
  };

  const handleListingFilterToggle = (value: string) => {
    setSelectedListings(prev => {
      if (prev.includes(value)) {
        return prev.filter(v => v !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  const handleCategoryFilterToggle = (value: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(value)) {
        return prev.filter(v => v !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  // Get unique categories from transactions with counts
  const getCategoryOptions = () => {
    const categories = Array.from(new Set(transactions.map(t => t.category)));
    return categories.map(category => {
      const count = transactions.filter(t => t.category === category && t.type === transactionType).length;
      return {
        value: category,
        label: category.charAt(0).toUpperCase() + category.slice(1),
        count
      };
    });
  };

  const filterSections = [
    {
      id: 'category',
      title: 'Category',
      options: getCategoryOptions(),
      selectedValues: selectedCategories,
      onToggle: handleCategoryFilterToggle,
      multiSelect: true,
    },
    {
      id: 'listings',
      title: 'Properties & Units',
      options: createListingFilterOptions(),
      selectedValues: selectedListings,
      onToggle: handleListingFilterToggle,
      multiSelect: true,
      listings: listings, // Pass the actual listings data
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
    setSelectedListings([]);
    setSelectedCategories([]);
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
    
    // Filter by selected categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(t => selectedCategories.includes(t.category));
    }
    
    // Filter by selected listings/units
    if (selectedListings.length > 0) {
      filtered = filtered.filter(t => {
        // Check if transaction's listing is in selected listings
        return selectedListings.some(selectedValue => {
          // Handle both listing ID and listing-unit ID formats
          if (selectedValue.includes('-')) {
            const [listingId, unitId] = selectedValue.split('-');
            return t.selectedListingId === listingId;
          } else {
            return t.selectedListingId === selectedValue;
          }
        });
      });
    }
    
    setFilteredTransactions(filtered);
  }, [transactions, search, transactionType, selectedListings, selectedCategories]);

  const activeFilterCount = selectedListings.length + selectedCategories.length;

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="flex-none">
        <TransactionFilterBar 
          search={search}
          setSearch={setSearch}
          filterSections={filterSections}
          activeFilterCount={activeFilterCount}
          clearFilters={clearFilters}
          transactionType={transactionType}
          setTransactionType={setTransactionType}
        />
      </div>
      <div className="flex-1 overflow-hidden h-0">
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
