
import React, { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { X, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Listing, TransactionFieldsData } from "./TransactionFormTypes";
import { TransactionFields } from "./TransactionFields";
import { fetchListings } from "@/services/listingsService";

export function TransactionForm({ onClose }: { onClose?: () => void }) {
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoadingListings, setIsLoadingListings] = useState(true);
  const [fields, setFields] = useState<TransactionFieldsData>({
    selectedListingId: "",
    selectedUnitId: "", // Added unit selection
    transactionType: "revenue",
    category: "",
    amount: "",
    date: new Date(),
    payment: "",
    notes: "",
    listingType: "listing", // Default to listing type
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
      <div className="h-full overflow-auto bg-white">
        <div className="sticky top-0 z-10 bg-white px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-xl font-medium text-gray-900">Add Transaction</h2>
        </div>
        <div className="px-6 py-8 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your properties...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto bg-white">
      {/* Header with action buttons */}
      <div className="sticky top-0 z-10 bg-white px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <h2 className="text-lg font-medium text-gray-900">Add Transaction</h2>
        <div className="flex gap-3">
          <Button 
            onClick={handleConfirm}
            disabled={fields.listingType === "listing" ? !fields.selectedListingId || !fields.category || !fields.amount : !fields.category || !fields.amount}
            className="text-sm px-4 py-2 h-9 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-sm border border-blue-600 hover:border-blue-700 transition-colors"
          >
            Add transaction
          </Button>
          {onClose && (
            <Button 
              variant="outline" 
              onClick={onClose} 
              className="text-sm px-4 py-2 h-9 bg-white border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-md shadow-sm transition-colors"
            >
              Cancel
            </Button>
          )}
        </div>
      </div>

      {/* Form content */}
      <div className="px-6 py-4 space-y-8 bg-gray-50">
        <div className="w-[98%] max-w-none">
          <TransactionFields 
            mockListings={listings}
            initialValues={fields}
            onChange={setFields}
          />
          
          {showNotesSection && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mt-8">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="h-4 w-4 text-gray-500" />
                <h2 className="text-sm font-medium text-gray-900">Additional Information</h2>
              </div>
              <p className="text-xs text-gray-600 mb-4">Add any additional details about this transaction</p>
              
              <div>
                <div className="text-xs font-medium text-gray-700 mb-1.5 block">Notes</div>
                <Textarea
                  placeholder="Add any additional details about this transaction"
                  value={fields.notes}
                  onChange={(e) => setFields(f => ({ ...f, notes: e.target.value }))}
                  className="min-h-[120px] bg-white border border-gray-200 resize-none focus:ring-2 focus:ring-gray-100 focus:border-gray-300 text-sm rounded-lg"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
