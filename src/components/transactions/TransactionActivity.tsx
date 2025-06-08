
import React, { useState, useEffect } from "react";
import { TransactionTable } from "./TransactionTable";
import { TransactionFilterBar } from "./TransactionFilterBar";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { EditTransactionForm } from "./EditTransactionForm";

// Mock data for demonstration
const mockTransactions = [
  {
    id: "TXN001",
    date: "2024-01-15",
    type: "revenue",
    category: "Rent",
    amount: 2500,
    paymentMethod: "Bank Transfer",
    propertyName: "Sunset Villa",
    propertyAddress: "123 Sunset Blvd, Los Angeles, CA",
    tenant: "John Doe",
    notes: "Monthly rent payment",
    selectedListingId: "1",
    listingType: "listing"
  },
  {
    id: "TXN002", 
    date: "2024-01-20",
    type: "expense",
    category: "Maintenance",
    amount: 350,
    paymentMethod: "Credit Card",
    propertyName: "Downtown Loft",
    propertyAddress: "456 Main St, San Francisco, CA", 
    tenant: "Jane Smith",
    notes: "Plumbing repair in unit 2A",
    selectedListingId: "2",
    listingType: "listing"
  },
  {
    id: "TXN003",
    date: "2024-01-25", 
    type: "revenue",
    category: "Deposit",
    amount: 1200,
    paymentMethod: "Check",
    propertyName: "Garden Apartments",
    propertyAddress: "789 Oak Ave, Seattle, WA",
    tenant: "Mike Johnson", 
    notes: "Security deposit for new tenant",
    selectedListingId: "3",
    listingType: "listing"
  },
  {
    id: "TXN004",
    date: "2024-02-01",
    type: "expense", 
    category: "Insurance",
    amount: 800,
    paymentMethod: "Bank Transfer",
    propertyName: "Beachfront Condo",
    propertyAddress: "321 Beach Dr, Miami, FL",
    tenant: "Sarah Wilson",
    notes: "Quarterly property insurance premium",
    selectedListingId: "4",
    listingType: "listing"
  },
  {
    id: "TXN005",
    date: "2024-02-05",
    type: "revenue",
    category: "Rent", 
    amount: 1800,
    paymentMethod: "Cash",
    propertyName: "Mountain Cabin",
    propertyAddress: "654 Pine Ridge, Denver, CO",
    tenant: "David Brown",
    notes: "Monthly rent payment - paid in cash",
    selectedListingId: "5",
    listingType: "listing"
  }
];

export function TransactionActivity() {
  const [transactions, setTransactions] = useState(mockTransactions);
  const [filteredTransactions, setFilteredTransactions] = useState(mockTransactions);
  const [editingTransaction, setEditingTransaction] = useState<any>(null);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);

  // Filter transactions based on applied filters
  const handleFiltersChange = (filters: any) => {
    let filtered = [...transactions];
    
    // Apply filters logic here
    if (filters.type && filters.type !== 'all') {
      filtered = filtered.filter(t => t.type === filters.type);
    }
    
    if (filters.category && filters.category !== 'all') {
      filtered = filtered.filter(t => t.category.toLowerCase() === filters.category);
    }
    
    if (filters.property && filters.property !== 'all') {
      filtered = filtered.filter(t => t.selectedListingId === filters.property);
    }
    
    if (filters.paymentMethod && filters.paymentMethod !== 'all') {
      filtered = filtered.filter(t => t.paymentMethod.toLowerCase().replace(' ', '') === filters.paymentMethod);
    }
    
    setFilteredTransactions(filtered);
  };

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

  useEffect(() => {
    setFilteredTransactions(transactions);
  }, [transactions]);

  return (
    <div className="h-full flex flex-col">
      <TransactionFilterBar onFiltersChange={handleFiltersChange} />
      <div className="flex-1 overflow-hidden">
        <TransactionTable 
          transactions={filteredTransactions}
          onEditTransaction={handleEditTransaction}
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
              onClose={handleCloseEditForm}
              onUpdate={handleUpdateTransaction}
            />
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
