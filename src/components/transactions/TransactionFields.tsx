
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar as CalendarIcon, MapPin, User, DollarSign, Phone, Mail } from "lucide-react";
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
import { ListingSelector } from "./ListingSelector";
import { UnitSelector } from "./UnitSelector";
import { formatPropertyType } from "@/utils/propertyTypeUtils";
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
  
  // Log initial values for debugging
  console.log("TransactionFields initialValues:", initialValues);
  console.log("TransactionFields editMode:", editMode);
  console.log("TransactionFields selectedListingId:", initialValues.selectedListingId);
  console.log("TransactionFields mockListings:", mockListings);

  // Update fields when initialValues change (important for edit mode)
  useEffect(() => {
    console.log("Setting fields from initialValues:", initialValues);
    setFields(initialValues);
  }, [initialValues]);

  // Propagate changes back to parent
  useEffect(() => {
    onChange(fields);
  }, [fields, onChange]);

  const selectedListing = mockListings.find(l => l.id === fields.selectedListingId);
  const selectedUnit = selectedListing?.units?.find(u => u.id === fields.selectedUnitId);
  
  // Get the property category based on the selected listing type
  const selectedPropertyCategory = selectedListing 
    ? PROPERTY_CATEGORIES.find(cat => cat.type === selectedListing.type) 
    : undefined;

  // Get appropriate categories based on transaction type and listing type
  const getCategoriesForSelection = () => {
    if (fields.listingType === "general") {
      // Return general categories
      return fields.transactionType === "revenue" 
        ? GENERAL_CATEGORIES.revenue 
        : GENERAL_CATEGORIES.expense;
    } else if (selectedPropertyCategory) {
      // Return property-specific categories
      return fields.transactionType === "revenue"
        ? selectedPropertyCategory.revenueCategories
        : selectedPropertyCategory.expenseCategories;
    }
    return []; // Fallback empty array
  };
  
  const transactionCategories = getCategoriesForSelection();

  const handleListingSelect = (listing: Listing) => {
    console.log("Listing selected from map:", listing);
    setFields(f => ({ ...f, selectedListingId: listing.id, category: "", selectedUnitId: "" }));
    setIsMapOpen(false);
  };

  // Check if selected listing has multiple units
  const hasMultipleUnits = selectedListing?.units && selectedListing.units.length > 0;
  
  return (
    <div className="space-y-6">
      {/* Transaction Type Section */}
      <div className="space-y-4 group">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-800 group-hover:text-gray-950 transition-colors">Transaction Type</h3>
          <div className="h-px bg-gray-100 flex-1 mx-4"></div>
          <ListingTypeToggle
            value={fields.listingType || "listing"}
            onChange={type => setFields(f => ({ ...f, listingType: type }))}
          />
        </div>
        
        {fields.listingType === "listing" ? (
          <div className="bg-gray-50/50 border border-gray-100 rounded-lg p-5">
            <div className="text-xs font-medium text-gray-500 mb-1.5 ml-0.5">Property Selection</div>
            
            {/* Dropdown selector and map button side by side */}
            <div className="flex gap-2 mb-4">
              <div className="flex-1">
                <ListingSelector
                  listings={mockListings}
                  selectedValue={fields.selectedListingId}
                  onSelect={(val) => setFields(f => ({ ...f, selectedListingId: val, category: "", selectedUnitId: "" }))}
                  placeholder="Select property from list"
                />
              </div>

              {/* Small map button on the right */}
              <Dialog open={isMapOpen} onOpenChange={setIsMapOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-9 px-3 border-gray-200 bg-white text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  >
                    <MapPin className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-6xl h-[80vh] p-0 bg-gray-900 border-0 rounded-xl overflow-hidden" hideCloseButton>
                  <TransactionMapSelector
                    listings={mockListings}
                    selectedListingId={fields.selectedListingId}
                    onListingSelect={handleListingSelect}
                    onClose={() => setIsMapOpen(false)}
                  />
                </DialogContent>
              </Dialog>
            </div>

            {/* Unit Selection - only show if listing has multiple units */}
            {hasMultipleUnits && (
              <div className="mb-4">
                <div className="text-xs font-medium text-gray-500 mb-1.5 ml-0.5">Unit Selection</div>
                <UnitSelector
                  units={selectedListing.units || []}
                  selectedUnitId={fields.selectedUnitId || ""}
                  onUnitSelect={(unitId) => setFields(f => ({ ...f, selectedUnitId: unitId }))}
                  placeholder="Select unit"
                />
              </div>
            )}
            
            {/* Enhanced Property Details Card */}
            {selectedListing && (
              <div className="mt-4 bg-white border border-gray-200 rounded-lg overflow-hidden">
                {/* Property Header */}
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 text-lg mb-1">{selectedListing.name}</h4>
                      <div className="flex items-center text-gray-600 gap-1.5">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{selectedListing.address}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 bg-blue-50 px-3 py-1.5 rounded-lg">
                      <span className="text-sm font-medium text-blue-700">
                        {selectedPropertyCategory?.label || formatPropertyType(selectedListing.type)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Unit-specific or Property-level Details */}
                {selectedUnit ? (
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-700">Unit {selectedUnit.unitNumber}</span>
                        <span className={cn(
                          "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium",
                          selectedUnit.occupancyStatus === "occupied" 
                            ? "bg-green-100 text-green-800" 
                            : "bg-gray-100 text-gray-600"
                        )}>
                          {selectedUnit.occupancyStatus === "occupied" ? "Occupied" : "Vacant"}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {selectedUnit.category}
                      </span>
                    </div>

                    {selectedUnit.tenant && (
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2 mb-2">
                            <User className="h-4 w-4 text-gray-400" />
                            <span className="font-medium text-gray-900">{selectedUnit.tenant.name}</span>
                            <span className="text-xs bg-white px-2 py-0.5 rounded border text-gray-600">
                              {selectedUnit.tenant.type}
                            </span>
                          </div>
                        </div>
                        <div className="space-y-1.5 ml-6">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Mail className="h-3.5 w-3.5 text-gray-400" />
                            <span>{selectedUnit.tenant.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Phone className="h-3.5 w-3.5 text-gray-400" />
                            <span>{selectedUnit.tenant.phone}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedUnit.notes && (
                      <div className="mt-3 p-2 bg-blue-50 rounded text-xs text-blue-700">
                        <strong>Notes:</strong> {selectedUnit.notes}
                      </div>
                    )}
                  </div>
                ) : !hasMultipleUnits && selectedListing.tenant ? (
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-700">Property Tenant</span>
                        <span className={cn(
                          "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium",
                          selectedListing.occupancyStatus === "occupied" 
                            ? "bg-green-100 text-green-800" 
                            : "bg-gray-100 text-gray-600"
                        )}>
                          {selectedListing.occupancyStatus === "occupied" ? "Occupied" : "Vacant"}
                        </span>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <span className="font-medium text-gray-900">{selectedListing.tenant.name}</span>
                        <span className="text-xs bg-white px-2 py-0.5 rounded border text-gray-600">
                          {selectedListing.tenant.type}
                        </span>
                      </div>
                      <div className="space-y-1.5 ml-6">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail className="h-3.5 w-3.5 text-gray-400" />
                          <span>{selectedListing.tenant.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="h-3.5 w-3.5 text-gray-400" />
                          <span>{selectedListing.tenant.phone}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                        No tenant assigned
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="bg-purple-50/30 border border-purple-100 rounded-lg p-5">
            <div className="text-sm text-purple-700 font-medium mb-2">General Transaction</div>
            <p className="text-xs text-gray-600 mb-3">
              Applies to your entire portfolio, not a specific property.
            </p>
          </div>
        )}
      </div>
      
      {(selectedListing || fields.listingType === "general") && (
        <>
          {/* Transaction Details Section */}
          <div className="space-y-4 group">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-800 group-hover:text-gray-950 transition-colors">Transaction Details</h3>
              <div className="h-px bg-gray-100 flex-1 mx-4"></div>
              <TransactionTypeToggle
                value={fields.transactionType}
                onChange={type => setFields(f => ({ ...f, transactionType: type, category: "" }))}
              />
            </div>
            
            <div className="bg-gray-50/50 border border-gray-100 rounded-lg p-5 space-y-6">
              {/* Category */}
              <div>
                <div className="text-xs font-medium text-gray-500 mb-1.5 ml-0.5">Category</div>
                <Select 
                  value={fields.category} 
                  onValueChange={cat => setFields(f => ({ ...f, category: cat }))}
                >
                  <SelectTrigger className="w-full border-gray-200 bg-white h-9 text-sm focus:ring-2 focus:ring-gray-100 focus:border-gray-300 text-gray-900 rounded-md">
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
          </div>
          
          {/* Payment Details Section */}
          <div className="space-y-4 group">
            <div className="flex items-center">
              <h3 className="text-sm font-medium text-gray-800 group-hover:text-gray-950 transition-colors">Payment Details</h3>
              <div className="ml-2 h-px bg-gray-100 flex-1"></div>
            </div>
            
            <div className="bg-gray-50/50 border border-gray-100 rounded-lg p-5 space-y-6">
              {/* Amount */}
              <div>
                <div className="text-xs font-medium text-gray-500 mb-1.5 ml-0.5">Amount</div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={fields.amount}
                    onChange={(e) => setFields(f => ({ ...f, amount: e.target.value }))}
                    className="pl-7 h-9 border-gray-200 bg-white text-sm focus:ring-2 focus:ring-gray-100 focus:border-gray-300 text-gray-900 rounded-md"
                  />
                </div>
              </div>

              {/* Date */}
              <div>
                <div className="text-xs font-medium text-gray-500 mb-1.5 ml-0.5">Date</div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left h-9 font-normal border-gray-200 bg-white text-sm focus:ring-2 focus:ring-gray-100 focus:border-gray-300 rounded-md",
                        !fields.date && "text-gray-400"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" />
                      {fields.date ? format(fields.date, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 z-50" align="start">
                    <Calendar
                      mode="single"
                      selected={fields.date}
                      onSelect={d => setFields(f => ({ ...f, date: d }))}
                      initialFocus
                      className="rounded-md"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Payment Method */}
              <div>
                <div className="text-xs font-medium text-gray-500 mb-1.5 ml-0.5">Payment Method</div>
                <Select value={fields.payment} onValueChange={pm => setFields(f => ({ ...f, payment: pm }))}>
                  <SelectTrigger className="w-full border-gray-200 bg-white h-9 text-sm focus:ring-2 focus:ring-gray-100 focus:border-gray-300 text-gray-900 rounded-md">
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
          </div>
        </>
      )}
    </div>
  );
}
