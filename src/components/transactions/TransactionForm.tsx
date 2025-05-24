
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Listing, TransactionFieldsData } from "./TransactionFormTypes";
import { TransactionFields } from "./TransactionFields";

// Updated mockListings to match the listings from the main listings list
const mockListings: Listing[] = [
  {
    id: "1",
    name: "Sunny Downtown Apartment",
    type: "residential_rental",
    address: "123 Main Street, Downtown",
    city: "Belgrade",
    country: "Serbia",
    location: { lat: 44.8176, lng: 20.4633 },
    tenant: {
      name: "John Smith",
      type: "Individual",
      email: "john.smith@email.com",
      phone: "+381 60 123 4567"
    }
  },
  {
    id: "2",
    name: "Modern Office Complex",
    type: "commercial_rental",
    address: "456 Business Ave, Tech District",
    city: "Berlin",
    country: "Germany",
    location: { lat: 52.5200, lng: 13.4050 },
    tenant: {
      name: "TechCorp Solutions",
      type: "Company",
      email: "office@techcorp.com",
      phone: "+49 30 987 6543"
    }
  },
  {
    id: "3",
    name: "Luxury Villa Resort",
    type: "vacation_rental",
    address: "789 Oceanview Drive, Coastal Area",
    city: "Paris",
    country: "France",
    location: { lat: 48.8566, lng: 2.3522 },
    tenant: {
      name: "Holiday Rentals Inc",
      type: "Company",
      email: "bookings@holidayrentals.com",
      phone: "+33 1 234 5678"
    }
  },
  {
    id: "4",
    name: "Historic Mixed-Use Building",
    type: "mixed_use",
    address: "321 Heritage Street, Old Town",
    city: "Zagreb",
    country: "Croatia",
    location: { lat: 45.8150, lng: 15.9819 },
    tenant: {
      name: "Mixed Tenants Association",
      type: "Various",
      email: "info@mixedbuilding.hr",
      phone: "+385 1 345 6789"
    }
  },
  {
    id: "5",
    name: "Boutique City Hotel",
    type: "hospitality",
    address: "654 Hotel Boulevard, City Center",
    city: "Vienna",
    country: "Austria",
    location: { lat: 48.2082, lng: 16.3738 },
    tenant: {
      name: "Vienna Hospitality Group",
      type: "Company",
      email: "reservations@viennahotels.at",
      phone: "+43 1 567 8901"
    }
  },
  {
    id: "6",
    name: "Industrial Warehouse Complex",
    type: "industrial",
    address: "987 Industrial Park, Warehouse District",
    city: "Budapest",
    country: "Hungary",
    location: { lat: 47.4979, lng: 19.0402 },
    tenant: {
      name: "LogiTech Warehousing",
      type: "Company",
      email: "operations@logitech-warehouse.hu",
      phone: "+36 1 678 9012"
    }
  }
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
    listingType: "listing", // Default to listing type
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
  const showNotesSection = selectedListing || fields.listingType === "general";

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
        
        {showNotesSection && (
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
            disabled={fields.listingType === "listing" ? !fields.selectedListingId || !fields.category || !fields.amount : !fields.category || !fields.amount}
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
