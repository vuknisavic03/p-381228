
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar as CalendarIcon, MapPin, Sparkles } from "lucide-react";
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
    <div className="space-y-10">
      {/* Header Section with Modern Design */}
      <div className="flex items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-blue-500 flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Transaction Details</h2>
              <p className="text-sm text-gray-600">Configure your financial transaction</p>
            </div>
          </div>
        </div>
        <ListingTypeToggle
          value={fields.listingType || "listing"}
          onChange={type => setFields(f => ({ ...f, listingType: type, selectedListingId: "", selectedUnitId: "", category: "" }))}
        />
      </div>

      {/* Property/General Selection with Enhanced Design */}
      {fields.listingType === "listing" ? (
        <div className="space-y-8">
          {/* Map Selector with Better Positioning */}
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Select Property</h3>
              <p className="text-sm text-gray-500 mt-1">Choose from your property portfolio</p>
            </div>
            <Dialog open={isMapOpen} onOpenChange={setIsMapOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2 bg-white shadow-sm hover:shadow-md transition-all duration-200">
                  <MapPin className="h-4 w-4" />
                  Map View
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-7xl h-[85vh] p-0 bg-gray-900 border-0 rounded-2xl overflow-hidden" hideCloseButton>
                <TransactionMapSelector
                  listings={mockListings}
                  selectedListingId={fields.selectedListingId}
                  onListingSelect={handleMapListingSelect}
                  onClose={() => setIsMapOpen(false)}
                />
              </DialogContent>
            </Dialog>
          </div>

          {/* Property Selection Flow with Modern Cards */}
          <PropertySelectionFlow
            listings={mockListings}
            selectedListingId={fields.selectedListingId}
            selectedUnitId={fields.selectedUnitId || ""}
            onListingSelect={handleListingSelect}
            onUnitSelect={handleUnitSelect}
          />
        </div>
      ) : (
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-2xl p-8">
          <div className="text-center space-y-3">
            <div className="h-12 w-12 rounded-xl bg-purple-500 flex items-center justify-center mx-auto">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-purple-900">General Transaction</h3>
            <p className="text-sm text-purple-700 max-w-md mx-auto">
              This transaction applies to your entire portfolio, not linked to a specific property.
            </p>
          </div>
        </div>
      )}
      
      {/* Transaction Details - Enhanced Modern Design */}
      {(selectedListing || fields.listingType === "general") && (
        <div className="space-y-8">
          {/* Transaction Type and Category Card */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between mb-8">
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-gray-900">Transaction Configuration</h3>
                <p className="text-sm text-gray-600">Set transaction type and category</p>
              </div>
              <TransactionTypeToggle
                value={fields.transactionType}
                onChange={type => setFields(f => ({ ...f, transactionType: type, category: "" }))}
              />
            </div>
            
            {/* Category Selection with Better Spacing */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-800">
                Transaction Category
              </label>
              <Select 
                value={fields.category} 
                onValueChange={cat => setFields(f => ({ ...f, category: cat }))}
              >
                <SelectTrigger className="w-full h-12 border-gray-200 bg-gray-50 hover:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-xl text-base transition-all duration-200">
                  <SelectValue placeholder={`Select ${fields.transactionType === "revenue" ? "revenue" : "expense"} category`} />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-gray-200 shadow-lg">
                  {transactionCategories.length > 0 ? (
                    transactionCategories.map(cat => (
                      <SelectItem key={cat.value} value={cat.value} className="py-3 text-base">
                        {cat.label}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="none" disabled className="py-3 text-base">No categories available</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Payment Details Card with Modern Grid */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="space-y-6">
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-gray-900">Payment Information</h3>
                <p className="text-sm text-gray-600">Enter transaction amount and payment details</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Amount Input with Modern Design */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-800">
                    Transaction Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold text-lg">$</span>
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={fields.amount}
                      onChange={(e) => setFields(f => ({ ...f, amount: e.target.value }))}
                      className="pl-10 h-12 border-gray-200 bg-gray-50 hover:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-xl text-base transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Payment Method with Enhanced Styling */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-800">
                    Payment Method
                  </label>
                  <Select value={fields.payment} onValueChange={pm => setFields(f => ({ ...f, payment: pm }))}>
                    <SelectTrigger className="w-full h-12 border-gray-200 bg-gray-50 hover:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-xl text-base transition-all duration-200">
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-gray-200 shadow-lg">
                      <SelectItem value="card" className="py-3 text-base">Credit Card</SelectItem>
                      <SelectItem value="bank" className="py-3 text-base">Bank Transfer</SelectItem>
                      <SelectItem value="cash" className="py-3 text-base">Cash</SelectItem>
                      <SelectItem value="check" className="py-3 text-base">Check</SelectItem>
                      <SelectItem value="crypto" className="py-3 text-base">Cryptocurrency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Date Picker with Modern Styling */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-800">
                  Transaction Date
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full h-12 justify-start text-left font-normal border-gray-200 bg-gray-50 hover:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-xl text-base transition-all duration-200",
                        !fields.date && "text-gray-400"
                      )}
                    >
                      <CalendarIcon className="mr-3 h-5 w-5 text-gray-500" />
                      {fields.date ? format(fields.date, "PPP") : "Select transaction date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 rounded-xl border-gray-200 shadow-lg" align="start">
                    <Calendar
                      mode="single"
                      selected={fields.date}
                      onSelect={d => setFields(f => ({ ...f, date: d }))}
                      initialFocus
                      className="p-4 pointer-events-auto rounded-xl"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
