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
import { Separator } from "@/components/ui/separator";
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
import { formatPropertyType, getPropertyTypeIcon } from "@/utils/propertyTypeUtils";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { TransactionMapSelector } from "./TransactionMapSelector";
import { Mail, Phone, UserX } from "lucide-react";

// Category mapping from ListingForm - this ensures consistency
const typeToCategoryMap = {
  residential_rental: [
    { value: "single_family", label: "Single-family Home" },
    { value: "multi_family", label: "Multi-family" },
    { value: "apartment_condo", label: "Apartment/Condo" },
  ],
  commercial_rental: [
    { value: "office", label: "Office Space" },
    { value: "retail", label: "Retail Store" },
    { value: "medical", label: "Medical/Professional" },
  ],
  industrial: [
    { value: "warehouse", label: "Warehouse" },
    { value: "distribution", label: "Distribution Facility" },
    { value: "manufacturing", label: "Manufacturing" },
  ],
  hospitality: [
    { value: "hotel", label: "Hotel" },
    { value: "motel", label: "Motel" },
    { value: "bed_breakfast", label: "Bed & Breakfast" },
  ],
  vacation_rental: [
    { value: "short_term", label: "Short-term Rental" },
    { value: "serviced_apartment", label: "Serviced Apartment" },
    { value: "holiday_home", label: "Holiday Home" },
  ],
  mixed_use: [
    { value: "residential_commercial", label: "Residential-Commercial" },
    { value: "live_work", label: "Live-Work Space" },
    { value: "multi_purpose", label: "Multi-Purpose" },
  ],
};

// Helper function to capitalize tenant type
const capitalizeTenantType = (type: string) => {
  return type.charAt(0).toUpperCase() + type.slice(1);
};

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
  console.log("Selected listing:", selectedListing);
  
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
    } else if (selectedListing) {
      // Get categories based on the property type from the listing form mapping
      const propertyTypeCategories = typeToCategoryMap[selectedListing.type as keyof typeof typeToCategoryMap];
      if (propertyTypeCategories) {
        // For transactions, we use the property subcategories as transaction categories
        return propertyTypeCategories;
      }
      // Fallback to the property categories system if available
      return selectedPropertyCategory ? (
        fields.transactionType === "revenue"
          ? selectedPropertyCategory.revenueCategories
          : selectedPropertyCategory.expenseCategories
      ) : [];
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
  
  // Check if tenant has meaningful data
  const hasTenant = selectedListing?.tenant && 
    selectedListing.tenant.name && 
    selectedListing.tenant.name !== "No Tenant" && 
    selectedListing.tenant.name.trim() !== "";
  
  return (
    <div className="space-y-8">
      {/* Transaction Type Section */}
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            <h3 className="text-base font-semibold text-gray-900">Transaction Type</h3>
          </div>
          <ListingTypeToggle
            value={fields.listingType || "listing"}
            onChange={type => setFields(f => ({ ...f, listingType: type }))}
          />
        </div>
        
        {fields.listingType === "listing" ? (
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="text-xs font-medium text-gray-500 mb-3 uppercase tracking-wide">Property Selection</div>
            
            <div className="flex gap-3 mb-5">
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
                    className="h-10 px-4 border-gray-200 bg-white text-gray-600 hover:text-gray-900 hover:bg-gray-50"
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

            {/* Selected Property Info - Shown directly below property selector */}
            {selectedListing && (
              <>
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-5 mb-5">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 text-base">{selectedListing.name}</h4>
                      <div className="flex items-center text-gray-600 gap-1.5 mt-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{selectedListing.address}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-gray-200">
                      {getPropertyTypeIcon(selectedListing.type)}
                      <span className="text-sm font-medium text-gray-700">
                        {formatPropertyType(selectedListing.type)}
                      </span>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div>
                    <div className="text-xs font-medium text-gray-500 mb-3 uppercase tracking-wide">Tenant Information</div>
                    {hasTenant ? (
                      <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900">{selectedListing.tenant.name}</div>
                          <div className="text-sm text-gray-600 mt-1">{capitalizeTenantType(selectedListing.tenant.type)}</div>
                        </div>
                        <div className="space-y-2">
                          {selectedListing.tenant.email && (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Mail className="h-4 w-4 text-gray-400" /> 
                              <span>{selectedListing.tenant.email}</span>
                            </div>
                          )}
                          {selectedListing.tenant.phone && (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Phone className="h-4 w-4 text-gray-400" /> 
                              <span>{selectedListing.tenant.phone}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3 px-4 py-3 bg-white rounded-lg border border-gray-200">
                        <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full">
                          <UserX className="h-5 w-5 text-gray-400" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-600">No Tenant Assigned</div>
                          <div className="text-sm text-gray-500">This property is currently vacant</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {hasMultipleUnits && (
                  <>
                    <Separator className="my-5" />
                    <div>
                      <div className="text-xs font-medium text-gray-500 mb-3 uppercase tracking-wide">Unit Selection</div>
                      
                      <div className="mb-4">
                        <Button
                          type="button"
                          variant={!fields.selectedUnitId ? "default" : "outline"}
                          size="sm"
                          className={cn(
                            "w-full justify-start text-left h-11 font-normal border-gray-200",
                            !fields.selectedUnitId 
                              ? "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100" 
                              : "bg-white text-gray-700 hover:bg-gray-50"
                          )}
                          onClick={() => setFields(f => ({ ...f, selectedUnitId: "" }))}
                        >
                          <div className="flex items-center gap-3">
                            <div className={cn(
                              "w-2.5 h-2.5 rounded-full",
                              !fields.selectedUnitId ? "bg-blue-500" : "bg-gray-300"
                            )} />
                            <span className="font-medium">Whole Property</span>
                            <span className="text-sm text-gray-500 ml-auto">All units included</span>
                          </div>
                        </Button>
                      </div>
                      
                      <div className="text-xs font-medium text-gray-500 mb-3 ml-1">Or select specific unit:</div>
                      <UnitSelector
                        units={selectedListing.units}
                        selectedUnitId={fields.selectedUnitId || ""}
                        onUnitSelect={(unitId) => setFields(f => ({ ...f, selectedUnitId: unitId }))}
                      />
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        ) : (
          <div className="bg-white border border-purple-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-2 h-2 rounded-full bg-purple-500"></div>
              <div className="font-semibold text-purple-700">General Transaction</div>
            </div>
            <p className="text-sm text-gray-600">
              Applies to your entire portfolio, not a specific property.
            </p>
          </div>
        )}
      </div>
      
      {(selectedListing || fields.listingType === "general") && (
        <>
          <Separator className="my-8" />
          
          {/* Transaction Details Section */}
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <h3 className="text-base font-semibold text-gray-900">Transaction Details</h3>
              </div>
              <TransactionTypeToggle
                value={fields.transactionType}
                onChange={type => setFields(f => ({ ...f, transactionType: type, category: "" }))}
              />
            </div>
            
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="text-xs font-medium text-gray-500 mb-3 uppercase tracking-wide">Category</div>
              <Select 
                value={fields.category} 
                onValueChange={cat => setFields(f => ({ ...f, category: cat }))}
              >
                <SelectTrigger className="w-full border-gray-200 bg-white h-10 text-sm focus:ring-2 focus:ring-gray-100 focus:border-gray-300 text-gray-900 rounded-lg">
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
          
          <Separator className="my-8" />
          
          {/* Payment Details Section */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-orange-500"></div>
              <h3 className="text-base font-semibold text-gray-900">Payment Details</h3>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-6">
              {/* Amount */}
              <div>
                <div className="text-xs font-medium text-gray-500 mb-3 uppercase tracking-wide">Amount</div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={fields.amount}
                    onChange={(e) => setFields(f => ({ ...f, amount: e.target.value }))}
                    className="pl-8 h-10 border-gray-200 bg-white text-sm focus:ring-2 focus:ring-gray-100 focus:border-gray-300 text-gray-900 rounded-lg"
                  />
                </div>
              </div>

              {/* Date */}
              <div>
                <div className="text-xs font-medium text-gray-500 mb-3 uppercase tracking-wide">Date</div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left h-10 font-normal border-gray-200 bg-white text-sm focus:ring-2 focus:ring-gray-100 focus:border-gray-300 rounded-lg",
                        !fields.date && "text-gray-400"
                      )}
                    >
                      <CalendarIcon className="mr-3 h-4 w-4 text-gray-400" />
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
                <div className="text-xs font-medium text-gray-500 mb-3 uppercase tracking-wide">Payment Method</div>
                <Select value={fields.payment} onValueChange={pm => setFields(f => ({ ...f, payment: pm }))}>
                  <SelectTrigger className="w-full border-gray-200 bg-white h-10 text-sm focus:ring-2 focus:ring-gray-100 focus:border-gray-300 text-gray-900 rounded-lg">
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
