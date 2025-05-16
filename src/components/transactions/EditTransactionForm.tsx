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
    <div className="flex flex-col h-full bg-white">
      {/* Header with close button */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Edit Transaction</h2>
        <SheetClose asChild>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </SheetClose>
      </div>
      
      {/* Content area */}
      <div className="flex-1 overflow-auto p-6">
        <TransactionFields
          mockListings={mockListings}
          initialValues={fields}
          onChange={setFields}
          editMode={true}
        />
        
        {selectedListing && (
          <div className="mt-8">
            <div className="flex items-center mb-6">
              <h3 className="text-lg font-medium text-gray-900">Additional Information</h3>
              <div className="ml-3 flex-grow h-px bg-gray-200"></div>
            </div>
            
            <div className="rounded-lg bg-[#F1F1F1] p-6">
              <div className="mb-2 font-medium text-gray-700">Notes</div>
              <Textarea
                placeholder="Add additional details or notes"
                value={fields.notes}
                onChange={(e) => setFields(f => ({ ...f, notes: e.target.value }))}
                className="min-h-[120px] bg-white border border-gray-200"
              />
            </div>
          </div>
        )}
      </div>

      {/* Footer with action buttons */}
      <div className="border-t border-gray-100 p-6 flex justify-end gap-2">
        <Button
          variant="outline"
          onClick={onClose}
          className="border-gray-200 hover:bg-gray-50"
        >
          Cancel
        </Button>
        <Button
          onClick={handleUpdate}
          className="bg-gray-900 hover:bg-gray-800 text-white"
        >
          Save changes
        </Button>
      </div>
    </div>
  );
}
