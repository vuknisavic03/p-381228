
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
    <div className="h-full overflow-auto bg-white">
      {/* Header with close button */}
      <div className="sticky top-0 z-10 bg-white px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <h2 className="text-xl font-medium text-gray-900">Add Transaction</h2>
        {onClose && (
          <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0 rounded-full hover:bg-gray-100">
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Form content */}
      <div className="px-6 py-4 space-y-8">
        <TransactionFields 
          mockListings={mockListings}
          initialValues={fields}
          onChange={setFields}
        />
        
        {selectedListing && (
          <div className="space-y-4 group">
            <div className="flex items-center">
              <h3 className="text-sm font-medium text-gray-800 group-hover:text-gray-950 transition-colors">Additional Information</h3>
              <div className="ml-2 h-px bg-gray-100 flex-1"></div>
            </div>
            
            <div className="bg-gray-50/50 border border-gray-100 rounded-lg p-5">
              <div className="mb-2 text-xs font-medium text-gray-500 ml-0.5">Notes</div>
              <Textarea
                placeholder="Add any additional details about this transaction"
                value={fields.notes}
                onChange={(e) => setFields(f => ({ ...f, notes: e.target.value }))}
                className="min-h-[120px] bg-white border border-gray-200 resize-none focus:ring-2 focus:ring-gray-100 focus:border-gray-300 text-sm rounded-md"
              />
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="pt-4 flex gap-3 sticky bottom-0 bg-white border-t border-gray-100 py-4 -mx-6 px-6 mt-8">
          <Button 
            onClick={handleConfirm}
            disabled={!fields.selectedListingId || !fields.category || !fields.amount}
            className="flex-1 bg-gray-900 hover:bg-gray-800 text-white"
          >
            Add transaction
          </Button>
          {onClose && (
            <Button 
              variant="outline" 
              onClick={onClose} 
              className="flex-1 bg-white border-gray-200 hover:bg-gray-50"
            >
              Cancel
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
