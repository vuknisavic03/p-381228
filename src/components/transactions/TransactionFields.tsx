
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar as CalendarIcon, MapPin } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { TransactionTypeToggle } from "./TransactionTypeToggle";
import { 
  Listing, 
  TransactionFieldsData, 
  TransactionFormFieldsProps, 
  PROPERTY_CATEGORIES, 
  GENERAL_CATEGORIES 
} from "./TransactionFormTypes";
import { ListingTypeToggle } from "./ListingTypeToggle";
import { PropertySelectionFlow } from "./PropertySelectionFlow";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { TransactionMapSelector } from "./TransactionMapSelector";

export function TransactionFields({ 
  mockListings, 
  initialValues, 
  onChange, 
  editMode = false 
}: TransactionFormFieldsProps) {
  const [fields, setFields] = useState<TransactionFieldsData>(initialValues);
  const [isMapOpen, setIsMapOpen] = useState(false);
  
  // Update fields when initialValues change (important for edit mode)
  useEffect(() => {
    setFields(initialValues);
  }, [initialValues]);

  // Propagate changes back to parent
  useEffect(() => {
    onChange(fields);
  }, [fields, onChange]);

  const selectedListing = mockListings.find(l => l.id === fields.selectedListingId);
  
  // Get the property category based on the selected listing type
  const selectedPropertyCategory = selectedListing 
    ? PROPERTY_CATEGORIES.find(cat => cat.type === selectedListing.type) 
    : undefined;

  // Get appropriate categories based on transaction type and listing type
  const getCategoriesForSelection = () => {
    if (fields.listingType === "general") {
      return fields.transactionType === "revenue" 
        ? GENERAL_CATEGORIES.revenue 
        : GENERAL_CATEGORIES.expense;
    } else if (selectedPropertyCategory) {
      return fields.transactionType === "revenue"
        ? selectedPropertyCategory.revenueCategories
        : selectedPropertyCategory.expenseCategories;
    }
    return [];
  };
  
  const transactionCategories = getCategoriesForSelection();

  const handleListingSelect = (listingId: string) => {
    setFields(f => ({ ...f, selectedListingId: listingId, category: "", selectedUnitId: "" }));
  };

  const handleUnitSelect = (unitId: string) => {
    setFields(f => ({ ...f, selectedUnitId: unitId }));
  };

  const handleMapListingSelect = (listing: Listing) => {
    setFields(f => ({ ...f, selectedListingId: listing.id, category: "", selectedUnitId: "" }));
    setIsMapOpen(false);
  };

  return (
    <div className="space-y-8">
      {/* Transaction Type Toggle */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Add Transaction</h2>
          <p className="text-sm text-gray-600 mt-1">Choose transaction type and property</p>
        </div>
        <ListingTypeToggle
          value={fields.listingType || "listing"}
          onChange={type => setFields(f => ({ ...f, listingType: type, selectedListingId: "", selectedUnitId: "", category: "" }))}
        />
      </div>

      {/* Property/General Selection */}
      {fields.listingType === "listing" ? (
        <div className="space-y-6">
          {/* Map Selector Button */}
          <div className="flex justify-end">
            <Dialog open={isMapOpen} onOpenChange={setIsMapOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <MapPin className="h-4 w-4" />
                  Select from Map
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-6xl h-[80vh] p-0 bg-gray-900 border-0 rounded-xl overflow-hidden" hideCloseButton>
                <TransactionMapSelector
                  listings={mockListings}
                  selectedListingId={fields.selectedListingId}
                  onListingSelect={handleMapListingSelect}
                  onClose={() => setIsMapOpen(false)}
                />
              </DialogContent>
            </Dialog>
          </div>

          {/* Property Selection Flow */}
          <PropertySelectionFlow
            listings={mockListings}
            selectedListingId={fields.selectedListingId}
            selectedUnitId={fields.selectedUnitId || ""}
            onListingSelect={handleListingSelect}
            onUnitSelect={handleUnitSelect}
          />
        </div>
      ) : (
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-purple-900 mb-2">General Transaction</h3>
            <p className="text-sm text-purple-700">
              This transaction applies to your entire portfolio, not a specific property.
            </p>
          </div>
        </div>
      )}
      
      {/* Transaction Details - only show when property is selected or general type */}
      {(selectedListing || fields.listingType === "general") && (
        <div className="space-y-6">
          {/* Transaction Type and Category */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Transaction Details</h3>
                <p className="text-sm text-gray-600 mt-1">Configure your transaction</p>
              </div>
              <TransactionTypeToggle
                value={fields.transactionType}
                onChange={type => setFields(f => ({ ...f, transactionType: type, category: "" }))}
              />
            </div>
            
            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <Select 
                value={fields.category} 
                onValueChange={cat => setFields(f => ({ ...f, category: cat }))}
              >
                <SelectTrigger className="w-full h-11 border-gray-200 bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-300">
                  <SelectValue placeholder={`Select ${fields.transactionType === "revenue" ? "revenue" : "expense"} category`} />
                </SelectTrigger>
                <SelectContent>
                  {transactionCategories.length > 0 ? (
                    transactionCategories.map(cat => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="none" disabled>No categories available</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Payment Details */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Payment Information</h3>
              <p className="text-sm text-gray-600">Enter transaction amount and details</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={fields.amount}
                    onChange={(e) => setFields(f => ({ ...f, amount: e.target.value }))}
                    className="pl-8 h-11 border-gray-200 bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Method
                </label>
                <Select value={fields.payment} onValueChange={pm => setFields(f => ({ ...f, payment: pm }))}>
                  <SelectTrigger className="w-full h-11 border-gray-200 bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-300">
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="card">Credit Card</SelectItem>
                    <SelectItem value="bank">Bank Transfer</SelectItem>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="check">Check</SelectItem>
                    <SelectItem value="crypto">Cryptocurrency</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Transaction Date
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full h-11 justify-start text-left font-normal border-gray-200 bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-300",
                      !fields.date && "text-gray-400"
                    )}
                  >
                    <CalendarIcon className="mr-3 h-4 w-4" />
                    {fields.date ? format(fields.date, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={fields.date}
                    onSelect={d => setFields(f => ({ ...f, date: d }))}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
