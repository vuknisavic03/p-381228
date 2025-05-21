
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { SheetClose } from "@/components/ui/sheet";
import { X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Listing, TransactionFieldsData, PropertyType } from "./TransactionFormTypes";
import { TransactionFields } from "./TransactionFields";
import { formatPropertyType } from "@/utils/propertyTypeUtils";

// Use the same mock listings from TransactionForm with proper PropertyType values
const mockListings: Listing[] = [
  {
    id: "1",
    name: "Belgrade, Dunavska 12",
    type: "residential_rental" as PropertyType,
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
  {
    id: "2",
    name: "Berlin Office Space",
    type: "commercial_rental" as PropertyType,
    address: "Alexanderplatz 5",
    city: "Berlin",
    country: "Germany",
    tenant: {
      name: "Tech Innovators GmbH",
      type: "Company",
      email: "contact@techinnovators.de",
      phone: "030-555-7890"
    }
  },
  {
    id: "3",
    name: "Paris Vacation Apartment",
    type: "vacation_rental" as PropertyType,
    address: "Rue de Rivoli 75",
    city: "Paris",
    country: "France",
    tenant: {
      name: "Vacation Rental Management",
      type: "Company",
      email: "bookings@vrm.com",
      phone: "33-145-678-900"
    }
  },
  {
    id: "4",
    name: "Zagreb Mixed-Use Building",
    type: "mixed_use" as PropertyType,
    address: "Ilica 15",
    city: "Zagreb",
    country: "Croatia",
    tenant: {
      name: "Multiple Tenants",
      type: "Various",
      email: "management@zgproperties.hr",
      phone: "385-1-234-5678"
    }
  },
  {
    id: "5",
    name: "Vienna Boutique Hotel",
    type: "hospitality" as PropertyType,
    address: "Stephansplatz 10",
    city: "Vienna",
    country: "Austria",
    tenant: {
      name: "Vienna Stays Ltd",
      type: "Company",
      email: "reception@viennastays.at",
      phone: "43-1-987-6543"
    }
  },
  {
    id: "6",
    name: "Warehouse Facility",
    type: "industrial" as PropertyType,
    address: "Industrial Zone 3, Building 7",
    city: "Budapest",
    country: "Hungary",
    tenant: {
      name: "Logistics Solutions Inc.",
      type: "Company",
      email: "operations@logisticssolutions.com",
      phone: "36-1-555-1234"
    }
  }
];

interface EditTransactionFormProps {
  transaction: any;
  onClose: () => void;
  onUpdate: (updatedTransaction: any) => void;
}

export function EditTransactionForm({ transaction, onClose, onUpdate }: EditTransactionFormProps) {
  console.log("EditTransactionForm received transaction:", transaction);
  
  // Make sure we have a default value for selectedListingId and listingType
  const [fields, setFields] = useState<TransactionFieldsData>({
    selectedListingId: transaction.selectedListingId || "",
    transactionType: transaction.type || "revenue",
    category: transaction.category || "",
    amount: transaction.amount?.toString() || "",
    date: transaction.date ? new Date(transaction.date) : new Date(),
    payment: transaction.paymentMethod || "",
    notes: transaction.notes || "",
    listingType: transaction.listingType || "listing",
  });
  const { toast } = useToast();

  // Keep fields in sync with prop if transaction changes
  useEffect(() => {
    console.log("Transaction data changed in EditForm:", transaction);
    setFields({
      selectedListingId: transaction.selectedListingId || "",
      transactionType: transaction.type || "revenue",
      category: transaction.category || "",
      amount: transaction.amount?.toString() || "",
      date: transaction.date ? new Date(transaction.date) : new Date(),
      payment: transaction.paymentMethod || "",
      notes: transaction.notes || "",
      listingType: transaction.listingType || "listing",
    });
    
    console.log("Fields set in EditForm:", {
      selectedListingId: transaction.selectedListingId || "",
      transactionType: transaction.type || "revenue",
      category: transaction.category || "",
      amount: transaction.amount?.toString() || "",
      date: transaction.date ? new Date(transaction.date) : new Date(),
      payment: transaction.paymentMethod || "",
      notes: transaction.notes || "",
      listingType: transaction.listingType || "listing",
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
      listingType: fields.listingType,
    };
    toast({
      title: "Transaction Updated",
      description: "Your changes have been saved successfully.",
    });
    onUpdate(updatedTransaction);
  }

  const showNotesSection = fields.selectedListingId || fields.listingType === "general";

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
        
        {showNotesSection && (
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
        )}

        {/* Footer with action buttons */}
        <div className="pt-4 flex gap-3 sticky bottom-0 bg-white border-t border-gray-100 py-4 -mx-6 px-6 mt-8">
          <Button
            onClick={handleUpdate}
            disabled={fields.listingType === "listing" ? !fields.selectedListingId || !fields.category || !fields.amount : !fields.category || !fields.amount}
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
