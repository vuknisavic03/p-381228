
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
      <div className="bg-white rounded-xl border border-gray-300 shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Building className="h-5 w-5 text-blue-600" />
            </div>
            <h2 className="text-base font-semibold text-gray-900">Transaction Type</h2>
          </div>
          <ListingTypeToggle
            value={fields.listingType || "listing"}
            onChange={type => setFields(f => ({ ...f, listingType: type }))}
          />
        </div>
        <p className="text-sm text-gray-600 mb-6 bg-gray-50 p-3 rounded-lg border">What type of transaction is this?</p>
        
        {fields.listingType === "listing" ? (
          <div className="space-y-6">
            <div>
              <label className="text-sm font-semibold text-gray-800 mb-3 block">Property Selection</label>
              
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
                      className="h-10 px-4 border-gray-300 bg-white text-gray-700 hover:text-gray-900 hover:bg-gray-50 hover:border-gray-400 text-sm font-medium"
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
                  <div className="rounded-lg border-2 border-gray-200 bg-gray-50 p-5 mb-4">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm text-gray-900 mb-1">{selectedListing.name}</h4>
                        <div className="flex items-center text-gray-600 gap-2">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <span className="text-sm">{selectedListing.address}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border-2 border-gray-200 shadow-sm">
                        <span className="h-4 w-4">{getPropertyTypeIcon(selectedListing.type)}</span>
                        <span className="text-sm font-semibold text-gray-800">
                          {formatPropertyType(selectedListing.type)}
                        </span>
                      </div>
                    </div>
                    
                    <Separator className="my-4 bg-gray-300" />
                    
                    <div>
                      <label className="text-sm font-semibold text-gray-800 mb-3 block">Tenant Information</label>
                      {hasTenant ? (
                        <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
                          <div className="flex-1">
                            <div className="font-semibold text-sm text-gray-900">{selectedListing.tenant.name}</div>
                            <div className="text-sm text-gray-600 mt-1">{capitalizeTenantType(selectedListing.tenant.type)}</div>
                          </div>
                          <div className="space-y-2">
                            {selectedListing.tenant.email && (
                              <div className="flex items-center gap-2 text-sm text-gray-700">
                                <Mail className="h-4 w-4 text-gray-500" /> 
                                <span>{selectedListing.tenant.email}</span>
                              </div>
                            )}
                            {selectedListing.tenant.phone && (
                              <div className="flex items-center gap-2 text-sm text-gray-700">
                                <Phone className="h-4 w-4 text-gray-500" /> 
                                <span>{selectedListing.tenant.phone}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-3 px-4 py-3 bg-white rounded-lg border-2 border-gray-200">
                          <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full">
                            <UserX className="h-4 w-4 text-gray-500" />
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-sm text-gray-700">No Tenant Assigned</div>
                            <div className="text-sm text-gray-500">This property is currently vacant</div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {hasMultipleUnits && (
                    <>
                      <Separator className="my-6 bg-gray-300" />
                      <div>
                        <label className="text-sm font-semibold text-gray-800 mb-3 block">Unit Selection</label>
                        
                        <div className="mb-4">
                          <Button
                            type="button"
                            variant={!fields.selectedUnitId ? "default" : "outline"}
                            size="sm"
                            className={cn(
                              "w-full justify-start text-left h-10 font-medium border-2 text-sm",
                              !fields.selectedUnitId 
                                ? "bg-blue-600 text-white border-blue-600 hover:bg-blue-700" 
                                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                            )}
                            onClick={() => setFields(f => ({ ...f, selectedUnitId: "" }))}
                          >
                            <div className="flex items-center gap-3">
                              <div className={cn(
                                "w-3 h-3 rounded-full",
                                !fields.selectedUnitId ? "bg-white" : "bg-gray-400"
                              )} />
                              <span className="font-semibold">Whole Property</span>
                              <span className="text-sm opacity-75 ml-auto">All units included</span>
                            </div>
                          </Button>
                        </div>
                        
                        <div className="text-sm text-gray-600 mb-4 ml-1 bg-gray-50 p-2 rounded border">Or select specific unit:</div>
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
          </div>
        ) : (
          <div className="flex items-center gap-4 p-5 bg-purple-50 border-2 border-purple-200 rounded-lg">
            <div className="w-3 h-3 rounded-full bg-purple-600"></div>
            <div>
              <div className="font-semibold text-sm text-purple-800">General Transaction</div>
              <p className="text-sm text-purple-700 mt-1">
                Applies to your entire portfolio, not a specific property.
              </p>
            </div>
          </div>
        )}
      </div>
      
      {(selectedListing || fields.listingType === "general") && (
        <>
          {/* Transaction Details Section */}
          <div className="bg-white rounded-xl border border-gray-300 shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-50 rounded-lg">
                  <DollarSign className="h-5 w-5 text-green-600" />
                </div>
                <h2 className="text-base font-semibold text-gray-900">Transaction Details</h2>
              </div>
              <TransactionTypeToggle
                value={fields.transactionType}
                onChange={type => setFields(f => ({ ...f, transactionType: type, category: "" }))}
              />
            </div>
            <p className="text-sm text-gray-600 mb-6 bg-gray-50 p-3 rounded-lg border">Configure the specific details of your transaction</p>
            
            <div>
              <label className="text-sm font-semibold text-gray-800 mb-2 block">Category</label>
              <Select 
                value={fields.category} 
                onValueChange={cat => setFields(f => ({ ...f, category: cat }))}
              >
                <SelectTrigger className="w-full border-2 border-gray-300 bg-white h-10 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 text-gray-900 rounded-lg text-sm font-medium">
                  <SelectValue placeholder={`Select ${fields.transactionType === "revenue" ? "revenue" : "expense"} category`} />
                </SelectTrigger>
                <SelectContent className="max-h-60 overflow-y-auto bg-white border-2 border-gray-300 shadow-xl">
                  {transactionCategories.length > 0 ? (
                    transactionCategories.map(cat => (
                      <SelectItem 
                        key={cat.value} 
                        value={cat.value}
                        className="py-3 px-4 hover:bg-gray-100 focus:bg-gray-100 cursor-pointer text-sm font-medium"
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
          <div className="bg-white rounded-xl border border-gray-300 shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-50 rounded-lg">
                <CreditCard className="h-5 w-5 text-orange-600" />
              </div>
              <h2 className="text-base font-semibold text-gray-900">Payment Details</h2>
            </div>
            <p className="text-sm text-gray-600 mb-6 bg-gray-50 p-3 rounded-lg border">Add payment information for this transaction</p>
            
            <div className="space-y-6">
              {/* Amount */}
              <div>
                <label className="text-sm font-semibold text-gray-800 mb-2 block">Amount</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 font-semibold text-sm">$</span>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={fields.amount}
                    onChange={(e) => setFields(f => ({ ...f, amount: e.target.value }))}
                    className="pl-8 h-10 border-2 border-gray-300 bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-400 text-gray-900 rounded-lg text-sm font-medium placeholder:text-gray-500"
                  />
                </div>
              </div>

              {/* Date */}
              <div>
                <label className="text-sm font-semibold text-gray-800 mb-2 block">Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left h-10 font-medium border-2 border-gray-300 bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-400 rounded-lg text-sm",
                        !fields.date && "text-gray-500"
                      )}
                    >
                      <CalendarIcon className="mr-3 h-4 w-4 text-gray-600" />
                      {fields.date ? format(fields.date, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 z-50 border-2 border-gray-300" align="start">
                    <Calendar
                      mode="single"
                      selected={fields.date}
                      onSelect={d => setFields(f => ({ ...f, date: d }))}
                      initialFocus
                      className="rounded-md p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Payment Method */}
              <div>
                <label className="text-sm font-semibold text-gray-800 mb-2 block">Payment Method</label>
                <Select value={fields.payment} onValueChange={pm => setFields(f => ({ ...f, payment: pm }))}>
                  <SelectTrigger className="w-full border-2 border-gray-300 bg-white h-10 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 text-gray-900 rounded-lg text-sm font-medium">
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-2 border-gray-300 shadow-xl">
                    <SelectItem value="card" className="text-sm font-medium py-2">Credit Card</SelectItem>
                    <SelectItem value="bank" className="text-sm font-medium py-2">Bank Transfer</SelectItem>
                    <SelectItem value="cash" className="text-sm font-medium py-2">Cash</SelectItem>
                    <SelectItem value="check" className="text-sm font-medium py-2">Check</SelectItem>
                    <SelectItem value="crypto" className="text-sm font-medium py-2">Cryptocurrency</SelectItem>
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
