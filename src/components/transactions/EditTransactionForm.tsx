import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { SheetClose } from "@/components/ui/sheet";
import { X, FileText } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
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

  // Log which transaction is being edited
  console.log('EditTransactionForm - Editing transaction ID:', transaction.id, 'Full transaction:', transaction);

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
    console.log("Transaction data changed in EditForm, new transaction ID:", transaction.id, "Full transaction:", transaction);
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
    
    console.log('Updating transaction ID:', transaction.id, 'with data:', updatedTransaction);
    
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
          <div>
            <h2 className="text-xl font-medium text-gray-900">Edit Transaction</h2>
            <p className="text-sm text-gray-500">Transaction #{transaction.id}</p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0 rounded-full hover:bg-gray-100">
            <X className="h-4 w-4" />
          </Button>
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
      {/* Header with close button */}
      <div className="sticky top-0 z-10 bg-white px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-medium text-gray-900">Edit Transaction</h2>
          <p className="text-sm text-gray-500">Transaction #{transaction.id} • {transaction.type === 'revenue' ? 'Revenue' : 'Expense'}</p>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0 rounded-full hover:bg-gray-100">
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Form content */}
      <div className="px-6 py-4 space-y-6 scale-95 origin-top">
        <TransactionFields 
          mockListings={listings}
          initialValues={fields}
          onChange={setFields}
          editMode={true}
        />
        
        {showNotesSection && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 scale-95 origin-top">
            <div className="flex items-center gap-3 mb-5">
              <FileText className="h-4 w-4 text-black" />
              <h3 className="text-base font-medium text-gray-900">Additional Information</h3>
            </div>
            
            <div>
              <div className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">Notes</div>
              <Textarea
                placeholder="Add any additional details about this transaction"
                value={fields.notes}
                onChange={(e) => setFields(f => ({ ...f, notes: e.target.value }))}
                className="min-h-[120px] bg-white border border-gray-200 resize-none focus:ring-2 focus:ring-gray-100 focus:border-gray-300 text-sm rounded-lg"
              />
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="pt-4 flex gap-3 sticky bottom-0 bg-white border-t border-gray-100 py-4 -mx-6 px-6 mt-8">
          <Button 
            onClick={handleUpdate}
            disabled={fields.listingType === "listing" ? !fields.selectedListingId || !fields.category || !fields.amount : !fields.category || !fields.amount}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
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
