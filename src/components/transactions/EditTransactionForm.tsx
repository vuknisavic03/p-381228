import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { SheetClose } from "@/components/ui/sheet";
import { X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Listing, TransactionFieldsData } from "./TransactionFormTypes";
import { TransactionFields } from "./TransactionFields";

// Should match the listings from TransactionForm for editing!
const mockListings = [
  {
    id: "1",
    name: "Belgrade, Dunavska 12",
    type: "Retail",
    address: "Belgrade, Dunavska 12",
    city: "Belgrade",
    country: "Serbia",
    tenant: {
      name: "Alexander Whitmore",
      type: "Individual",
      email: "alex@example.com",
      phone: "000-000-0000"
    }
  },
  // ... add more mock listings if needed
];

interface EditTransactionFormProps {
  transaction: any;
  onClose: () => void;
  onUpdate: (updatedTransaction: any) => void;
}

export function EditTransactionForm({ transaction, onClose, onUpdate }: EditTransactionFormProps) {
  const [fields, setFields] = useState<TransactionFieldsData>({
    selectedListingId: transaction.selectedListingId ?? "",
    transactionType: transaction.type ?? "revenue",
    category: transaction.category ?? "",
    amount: transaction.amount?.toString() ?? "",
    date: transaction.date ? new Date(transaction.date) : new Date(),
    payment: transaction.paymentMethod ?? "",
    notes: transaction.notes ?? "",
  });
  const { toast } = useToast();

  // Keep fields in sync with prop if transaction changes
  useEffect(() => {
    setFields({
      selectedListingId: transaction.selectedListingId ?? "",
      transactionType: transaction.type ?? "revenue",
      category: transaction.category ?? "",
      amount: transaction.amount?.toString() ?? "",
      date: transaction.date ? new Date(transaction.date) : new Date(),
      payment: transaction.paymentMethod ?? "",
      notes: transaction.notes ?? "",
    });
  }, [transaction]);

  function handleUpdate() {
    const updatedTransaction = {
      ...transaction,
      selectedListingId: fields.selectedListingId,
      type: fields.transactionType,
      category: fields.category,
      amount: parseFloat(fields.amount),
      date: fields.date,
      paymentMethod: fields.payment,
      notes: fields.notes,
    };
    toast({
      title: "Transaction Updated",
      description: "Your changes have been saved successfully.",
    });
    onUpdate(updatedTransaction);
  }

  const selectedListing = mockListings.find(l => l.id === fields.selectedListingId);

  return (
    <div className="h-full overflow-auto bg-white">
      {/* Header with close button */}
      <div className="sticky top-0 z-10 bg-white px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <h2 className="text-xl font-medium text-gray-900">Edit Transaction</h2>
        <SheetClose asChild>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full hover:bg-gray-100">
            <X className="h-4 w-4" />
          </Button>
        </SheetClose>
      </div>
      
      {/* Content area */}
      <div className="px-6 py-4 space-y-8">
        <TransactionFields 
          mockListings={mockListings}
          initialValues={fields}
          onChange={setFields}
          editMode={true}
        />
        
        {/* Notes section - always visible in edit mode */}
        <div className="space-y-4 group">
          <div className="flex items-center">
            <h3 className="text-sm font-medium text-gray-800 group-hover:text-gray-950 transition-colors">Additional Information</h3>
            <div className="ml-2 h-px bg-gray-100 flex-1"></div>
          </div>
          
          <div className="bg-gray-50/50 border border-gray-100 rounded-lg p-5">
            <div className="mb-2 text-xs font-medium text-gray-500 ml-0.5">Notes</div>
            <Textarea
              placeholder="Add additional details or notes"
              value={fields.notes}
              onChange={(e) => setFields(f => ({ ...f, notes: e.target.value }))}
              className="min-h-[120px] bg-white border border-gray-200 resize-none focus:ring-2 focus:ring-gray-100 focus:border-gray-300 text-sm rounded-md"
            />
          </div>
        </div>

        {/* Footer with action buttons */}
        <div className="pt-4 flex gap-3 sticky bottom-0 bg-white border-t border-gray-100 py-4 -mx-6 px-6 mt-8">
          <Button
            onClick={handleUpdate}
            className="flex-1 bg-gray-900 hover:bg-gray-800 text-white"
          >
            Save changes
          </Button>
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 bg-white border-gray-200 hover:bg-gray-50"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
