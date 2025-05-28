
import React, { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
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
          location: listing.location,
          tenant: {
            name: listing.tenant?.name || "No Tenant",
            type: listing.tenant?.type || "Individual",
            email: listing.tenant?.email || "",
            phone: listing.tenant?.phone || ""
          },
          units: listing.units || []
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
        <div className="px-6 py-12 flex items-center justify-center">
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
      {/* Enhanced header section */}
      <div className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 px-8 pt-12 pb-8">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/20 via-transparent to-transparent"></div>
        <div className="relative">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">New Transaction</h1>
              <p className="text-gray-600 text-sm">Add a new financial transaction to your portfolio</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form content */}
      <div className="px-8 py-8 space-y-8">
        <TransactionFields 
          mockListings={listings}
          initialValues={fields}
          onChange={setFields}
        />
        
        {showNotesSection && (
          <div className="space-y-6 group">
            <div className="flex items-center gap-4">
              <div className="h-8 w-8 rounded-lg bg-gray-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14,2 14,8 20,8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10,9 9,9 8,9"></polyline>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-950 transition-colors">Additional Information</h3>
              <div className="flex-1 h-px bg-gradient-to-r from-gray-200 to-transparent"></div>
            </div>
            
            <div className="bg-gradient-to-br from-gray-50/80 via-white to-gray-50/50 border border-gray-200/60 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-800 mb-2">Notes</label>
                <p className="text-xs text-gray-500 mb-4">Add any additional details or context about this transaction</p>
              </div>
              <Textarea
                placeholder="Enter additional notes, references, or important details about this transaction..."
                value={fields.notes}
                onChange={(e) => setFields(f => ({ ...f, notes: e.target.value }))}
                className="min-h-[140px] bg-white/80 border-gray-200/60 resize-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 text-sm rounded-xl shadow-sm transition-all duration-200 placeholder:text-gray-400"
              />
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="pt-8 flex gap-4 sticky bottom-0 bg-white/95 backdrop-blur-sm border-t border-gray-100/80 py-6 -mx-8 px-8 mt-12">
          <Button 
            onClick={handleConfirm}
            disabled={fields.listingType === "listing" ? !fields.selectedListingId || !fields.category || !fields.amount : !fields.category || !fields.amount}
            className="flex-1 h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-200"
          >
            Add Transaction
          </Button>
          {onClose && (
            <Button 
              variant="outline" 
              onClick={onClose} 
              className="flex-1 h-12 bg-white/80 border-gray-200 hover:bg-gray-50 text-gray-700 font-medium rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
            >
              Cancel
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
