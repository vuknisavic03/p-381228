
import React, { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { X, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Listing, TransactionFieldsData } from "./TransactionFormTypes";
import { TransactionFields } from "./TransactionFields";
import { fetchListings } from "@/services/listingsService";

interface EditTransactionFormProps {
  transaction: any;
  onClose: () => void;
  onUpdate: (updatedTransaction: any) => void;
}

export function EditTransactionForm({ transaction, onClose, onUpdate }: EditTransactionFormProps) {
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoadingListings, setIsLoadingListings] = useState(true);
  const [fields, setFields] = useState<TransactionFieldsData>({
    selectedListingId: transaction.selectedListingId || "",
    selectedUnitId: transaction.selectedUnitId || "",
    transactionType: transaction.type || "revenue",
    category: transaction.category || "",
    amount: transaction.amount?.toString() || "",
    date: transaction.date ? new Date(transaction.date) : new Date(),
    payment: transaction.paymentMethod || "",
    notes: transaction.notes || "",
    listingType: transaction.listingType || "listing",
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
        console.log("Loaded listings for edit transaction form:", transformedListings);
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

  // Keep fields in sync with prop if transaction changes
  useEffect(() => {
    setFields({
      selectedListingId: transaction.selectedListingId || "",
      selectedUnitId: transaction.selectedUnitId || "",
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
      selectedUnitId: fields.selectedUnitId,
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
      description: `Transaction #${transaction.id} has been saved successfully.`,
    });
    onUpdate(updatedTransaction);
  }

  const selectedListing = listings.find(l => l.id === fields.selectedListingId);
  const showNotesSection = selectedListing || fields.listingType === "general";

  if (isLoadingListings) {
    return (
      <div className="h-full overflow-auto bg-white">
        <div className="sticky top-0 z-10 bg-white px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-xl font-medium text-gray-900">Edit Transaction</h2>
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
    <div className="h-full overflow-auto bg-background">
      {/* Header with action buttons */}
      <div className="sticky top-0 z-10 bg-card backdrop-blur-sm border-b border-border/50 px-6 py-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Edit Transaction</h2>
            <p className="text-sm text-muted-foreground mt-1">Update transaction details</p>
          </div>
          <div className="flex gap-3">
            <Button 
              onClick={handleUpdate}
              disabled={fields.listingType === "listing" ? !fields.selectedListingId || !fields.category || !fields.amount : !fields.category || !fields.amount}
              className="px-6 py-2 h-10 font-medium transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Save changes
            </Button>
            <Button 
              variant="outline" 
              onClick={onClose} 
              className="px-6 py-2 h-10 font-medium transition-all duration-200"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>

      {/* Form content */}
      <div className="px-6 py-6 space-y-6">
        <div className="w-[98%] max-w-none">
          <TransactionFields 
            mockListings={listings}
            initialValues={fields}
            onChange={setFields}
            editMode={true}
          />
          
          {showNotesSection && (
            <div className="bg-card rounded-xl border border-border shadow-sm p-6 transition-all duration-200 hover:shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-accent">
                  <FileText className="h-4 w-4 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">Additional Information</h3>
                  <p className="text-xs text-muted-foreground">Add any additional details about this transaction</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">Notes</label>
                <Textarea
                  placeholder="Add any additional details about this transaction..."
                  value={fields.notes}
                  onChange={(e) => setFields(f => ({ ...f, notes: e.target.value }))}
                  className="min-h-[120px] resize-none transition-all duration-200 focus:ring-2 focus:ring-ring/20"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
