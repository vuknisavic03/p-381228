
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { SheetClose } from "@/components/ui/sheet";
import { Listing, TransactionFieldsData } from "./TransactionFormTypes";
import { TransactionFields } from "./TransactionFields";

const mockListings: Listing[] = [
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
  // ... add more mock listings as needed
];

export function TransactionForm({ onClose }: { onClose?: () => void }) {
  const [fields, setFields] = useState<TransactionFieldsData>({
    selectedListingId: "",
    transactionType: "revenue",
    category: "",
    amount: "",
    date: new Date(),
    payment: "",
    notes: "",
  });
  const { toast } = useToast();

  function handleConfirm() {
    toast({
      title: "Transaction created",
      description: "Your transaction has been created successfully.",
    });
    if (onClose) onClose();
  }

  const selectedListing = mockListings.find(l => l.id === fields.selectedListingId);

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Form content */}
      <div className="flex-1 overflow-auto p-6">
        <TransactionFields 
          mockListings={mockListings}
          initialValues={fields}
          onChange={setFields}
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
                placeholder="Add any additional details about this transaction"
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
          className="border-gray-200 hover:bg-gray-50 h-10"
        >
          Cancel
        </Button>
        <Button
          onClick={handleConfirm}
          disabled={!fields.selectedListingId || !fields.category || !fields.amount}
          className="bg-gray-900 hover:bg-gray-800 text-white h-10"
        >
          Add transaction
        </Button>
      </div>
    </div>
  );
}
