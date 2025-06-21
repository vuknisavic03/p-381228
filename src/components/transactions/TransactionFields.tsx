
import React, { useState, useEffect, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar as CalendarIcon, MapPin, Mail, Phone, UserX, Building, CreditCard, DollarSign } from "lucide-react";
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

  // Memoize categories to prevent unnecessary re-renders that cause lag
  const transactionCategories = useMemo(() => {
    if (fields.listingType === "general") {
      // Return general categories
      return fields.transactionType === "revenue" 
        ? GENERAL_CATEGORIES.revenue 
        : GENERAL_CATEGORIES.expense;
    } else if (selectedPropertyCategory) {
      // Use the proper transaction categories from PROPERTY_CATEGORIES
      return fields.transactionType === "revenue"
        ? selectedPropertyCategory.revenueCategories
        : selectedPropertyCategory.expenseCategories;
    }
    return []; // Fallback empty array
  }, [fields.listingType, fields.transactionType, selectedPropertyCategory]);

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
    <div className="w-full max-w-none space-y-6">
      {/* Transaction Type Section */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Building className="h-4 w-4 text-gray-500" />
            <h2 className="text-sm font-medium text-gray-900">Transaction Type</h2>
          </div>
          <ListingTypeToggle
            value={fields.listingType || "listing"}
            onChange={type => setFields(f => ({ ...f, listingType: type }))}
          />
        </div>
        <p className="text-xs text-gray-600 mb-4">What type of transaction is this?</p>
        
        {fields.listingType === "listing" ? (
          <div className="space-y-6">
            <div className="flex gap-3 mb-4">
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
                    className="h-9 px-3 border-gray-200 bg-white text-gray-600 hover:text-gray-900 hover:bg-gray-50 text-xs"
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
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 mb-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h4 className="font-medium text-xs text-gray-900">{selectedListing.name}</h4>
                      <div className="flex items-center text-gray-600 gap-1.5 mt-0.5">
                        <MapPin className="h-3 w-3 text-gray-400" />
                        <span className="text-xs">{selectedListing.address}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-gray-200">
                      <span className="h-3 w-3">{getPropertyTypeIcon(selectedListing.type)}</span>
                      <span className="text-xs font-medium text-gray-700">
                        {formatPropertyType(selectedListing.type)}
                      </span>
                    </div>
                  </div>
                  
                  <Separator className="my-3" />
                  
                  <div>
                    <div className="text-xs font-medium text-gray-700 mb-2 block">Tenant information</div>
                    {hasTenant ? (
                      <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
                        <div className="flex-1">
                          <div className="font-medium text-xs text-gray-900">{selectedListing.tenant.name}</div>
                          <div className="text-xs text-gray-500 mt-0.5">{capitalizeTenantType(selectedListing.tenant.type)}</div>
                        </div>
                        <div className="space-y-1.5">
                          {selectedListing.tenant.email && (
                            <div className="flex items-center gap-2 text-xs text-gray-600">
                              <Mail className="h-3 w-3 text-gray-400" /> 
                              <span>{selectedListing.tenant.email}</span>
                            </div>
                          )}
                          {selectedListing.tenant.phone && (
                            <div className="flex items-center gap-2 text-xs text-gray-600">
                              <Phone className="h-3 w-3 text-gray-400" /> 
                              <span>{selectedListing.tenant.phone}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3 px-4 py-3 bg-white rounded-lg border border-gray-200">
                        <div className="flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full">
                          <UserX className="h-3 w-3 text-gray-400" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-xs text-gray-600">No Tenant Assigned</div>
                          <div className="text-xs text-gray-500">This property is currently vacant</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {hasMultipleUnits && (
                  <>
                    <Separator className="my-4" />
                    <div>
                      <div className="text-xs font-medium text-gray-700 mb-2 block">Unit selection</div>
                      
                      <div className="mb-3">
                        <Button
                          type="button"
                          variant={!fields.selectedUnitId ? "default" : "outline"}
                          size="sm"
                          className={cn(
                            "w-full justify-start text-left h-9 font-normal border-gray-200 text-xs",
                            !fields.selectedUnitId 
                              ? "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100" 
                              : "bg-white text-gray-700 hover:bg-gray-50"
                          )}
                          onClick={() => setFields(f => ({ ...f, selectedUnitId: "" }))}
                        >
                          <div className="flex items-center gap-2">
                            <div className={cn(
                              "w-2 h-2 rounded-full",
                              !fields.selectedUnitId ? "bg-blue-500" : "bg-gray-300"
                            )} />
                            <span className="font-medium">Whole Property</span>
                            <span className="text-xs text-gray-500 ml-auto">All units included</span>
                          </div>
                        </Button>
                      </div>
                      
                      <div className="text-xs text-gray-500 mb-3 ml-1">Or select specific unit:</div>
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
          <div className="flex items-center gap-3 p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <div className="w-2 h-2 rounded-full bg-purple-500"></div>
            <div>
              <div className="font-medium text-xs text-purple-700">General Transaction</div>
              <p className="text-xs text-purple-600">
                Applies to your entire portfolio, not a specific property.
              </p>
            </div>
          </div>
        )}
      </div>
      
      {(selectedListing || fields.listingType === "general") && (
        <>
          {/* Transaction Details Section */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-gray-500" />
                <h2 className="text-sm font-medium text-gray-900">Transaction Details</h2>
              </div>
              <TransactionTypeToggle
                value={fields.transactionType}
                onChange={type => setFields(f => ({ ...f, transactionType: type, category: "" }))}
              />
            </div>
            <p className="text-xs text-gray-600 mb-4">Configure the specific details of your transaction</p>
            
            <div>
              <div className="text-xs font-medium text-gray-700 mb-1.5 block">Category</div>
              <Select 
                value={fields.category} 
                onValueChange={cat => setFields(f => ({ ...f, category: cat }))}
              >
                <SelectTrigger className="w-full border-gray-200 bg-white h-9 focus:ring-2 focus:ring-gray-100 focus:border-gray-300 text-gray-900 rounded-lg text-sm">
                  <SelectValue placeholder={`Select ${fields.transactionType === "revenue" ? "revenue" : "expense"} category`} />
                </SelectTrigger>
                <SelectContent className="max-h-60 overflow-y-auto bg-white border border-gray-200 shadow-lg">
                  {transactionCategories.length > 0 ? (
                    transactionCategories.map(cat => (
                      <SelectItem 
                        key={cat.value} 
                        value={cat.value}
                        className="py-2 px-3 hover:bg-gray-50 focus:bg-gray-50 cursor-pointer text-sm"
                      >
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
          
          {/* Payment Details Section */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <CreditCard className="h-4 w-4 text-gray-500" />
              <h2 className="text-sm font-medium text-gray-900">Payment Details</h2>
            </div>
            <p className="text-xs text-gray-600 mb-4">Add any additional information about this transaction</p>
            
            <div className="space-y-6">
              {/* Amount */}
              <div>
                <div className="text-xs font-medium text-gray-700 mb-1.5 block">Amount</div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium text-sm">$</span>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={fields.amount}
                    onChange={(e) => setFields(f => ({ ...f, amount: e.target.value }))}
                    className="pl-7 h-9 border-gray-200 bg-white focus:ring-2 focus:ring-gray-100 focus:border-gray-300 text-gray-900 rounded-lg text-sm placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* Date */}
              <div>
                <div className="text-xs font-medium text-gray-700 mb-1.5 block">Date</div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left h-9 font-normal border-gray-200 bg-white focus:ring-2 focus:ring-gray-100 focus:border-gray-300 rounded-lg text-sm",
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
                <div className="text-xs font-medium text-gray-700 mb-1.5 block">Payment method</div>
                <Select value={fields.payment} onValueChange={pm => setFields(f => ({ ...f, payment: pm }))}>
                  <SelectTrigger className="w-full border-gray-200 bg-white h-9 focus:ring-2 focus:ring-gray-100 focus:border-gray-300 text-gray-900 rounded-lg text-sm">
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-200 shadow-lg">
                    <SelectItem value="card" className="text-sm">Credit Card</SelectItem>
                    <SelectItem value="bank" className="text-sm">Bank Transfer</SelectItem>
                    <SelectItem value="cash" className="text-sm">Cash</SelectItem>
                    <SelectItem value="check" className="text-sm">Check</SelectItem>
                    <SelectItem value="crypto" className="text-sm">Cryptocurrency</SelectItem>
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
