
import React, { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Listing, TransactionFieldsData } from "./TransactionFormTypes";
import { TransactionFields } from "./TransactionFields";
import { fetchListings } from "@/services/listingsService";

export function TransactionForm({ onClose }: { onClose?: () => void }) {
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoadingListings, setIsLoadingListings] = useState(true);
  const [fields, setFields] = useState<TransactionFieldsData>({
    selectedListingId: "",
    selectedUnitId: "",
    transactionType: "revenue",
    category: "",
    amount: "",
    date: new Date(),
    payment: "",
    notes: "",
    listingType: "listing",
  });
  const { toast } = useToast();

  // Fetch real listings data on component mount
  useEffect(() => {
    const loadListings = async () => {
      setIsLoadingListings(true);
      try {
        const listingsData = await fetchListings();
        // Transform the listings data to match our Listing interface
        const transformedListings: Listing[] = listingsData.map((listing: any) => ({
          id: String(listing.id),
          name: listing.address || listing.name || `Property #${listing.id}`,
          type: listing.type || "residential_rental",
          address: listing.address || "",
          city: listing.city || "",
          country: listing.country || "",
          location: listing.location, // Don't set default coordinates - let map geocode if needed
          tenant: {
            name: listing.tenant?.name || "No Tenant",
            type: listing.tenant?.type || "Individual",
            email: listing.tenant?.email || "",
            phone: listing.tenant?.phone || ""
          },
          units: listing.units || [] // Include units data
        }));
        setListings(transformedListings);
        console.log("Loaded listings for transaction form:", transformedListings);
      } catch (error) {
        console.error("Error loading listings:", error);
        toast({
          title: "Error loading properties",
          description: "Failed to load your properties. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoadingListings(false);
      }
    };

    loadListings();
  }, [toast]);

  function handleConfirm() {
    toast({
      title: "Transaction created",
      description: "Your transaction has been created successfully.",
    });
    if (onClose) onClose();
  }

  const selectedListing = listings.find(l => l.id === fields.selectedListingId);
  const showNotesSection = selectedListing || fields.listingType === "general";

  if (isLoadingListings) {
    return (
      <div className="h-full overflow-auto bg-gray-50">
        <div className="sticky top-0 z-10 bg-white px-10 py-8 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-900">Add Transaction</h2>
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose} className="h-10 w-10 p-0 rounded-full hover:bg-gray-100">
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>
        <div className="px-10 py-12 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Loading your properties...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto bg-gray-50">
      {/* Header with close button */}
      <div className="sticky top-0 z-10 bg-white px-10 py-8 border-b border-gray-200 flex items-center justify-between shadow-sm">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Add Transaction</h2>
          <p className="text-sm text-gray-600 mt-1">Create a new transaction for your properties</p>
        </div>
        {onClose && (
          <Button variant="ghost" size="sm" onClick={onClose} className="h-10 w-10 p-0 rounded-full hover:bg-gray-100">
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>

      {/* Form content */}
      <div className="px-10 py-10 max-w-5xl mx-auto space-y-10">
        <TransactionFields 
          mockListings={listings}
          initialValues={fields}
          onChange={setFields}
        />
        
        {showNotesSection && (
          <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Additional Information</h3>
              <p className="text-sm text-gray-600">Add any notes or details about this transaction</p>
            </div>
            
            <Textarea
              placeholder="Enter any additional details, notes, or comments about this transaction..."
              value={fields.notes}
              onChange={(e) => setFields(f => ({ ...f, notes: e.target.value }))}
              className="min-h-[140px] bg-gray-50 border-gray-200 resize-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 text-sm rounded-lg"
            />
          </div>
        )}

        {/* Action Buttons */}
        <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
          <div className="flex gap-6">
            <Button 
              onClick={handleConfirm}
              disabled={fields.listingType === "listing" ? !fields.selectedListingId || !fields.category || !fields.amount : !fields.category || !fields.amount}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white h-14 text-base font-medium"
            >
              Create Transaction
            </Button>
            {onClose && (
              <Button 
                variant="outline" 
                onClick={onClose} 
                className="flex-1 bg-white border-gray-300 hover:bg-gray-50 h-14 text-base font-medium"
              >
                Cancel
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
