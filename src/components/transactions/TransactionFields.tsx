
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
import { ListingSelector } from "./ListingSelector";
import { UnitSelector } from "./UnitSelector";
import { formatPropertyType, getPropertyTypeIcon } from "@/utils/propertyTypeUtils";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { TransactionMapSelector } from "./TransactionMapSelector";
import { Mail, Phone, UserX, Building2, CreditCard, DollarSign, Tag } from "lucide-react";

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
  
  // Check if tenant has meaningful data
  const hasTenant = selectedListing?.tenant && 
    selectedListing.tenant.name && 
    selectedListing.tenant.name !== "No Tenant" && 
    selectedListing.tenant.name.trim() !== "";
  
  return (
    <div className="space-y-8">
      {/* Transaction Type Section */}
      <div className="group">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
              <Building2 className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Property Selection</h3>
              <p className="text-sm text-gray-500">Choose your property or create a general transaction</p>
            </div>
          </div>
          <ListingTypeToggle
            value={fields.listingType || "listing"}
            onChange={type => setFields(f => ({ ...f, listingType: type }))}
          />
        </div>
        
        {fields.listingType === "listing" ? (
          <div className="bg-gradient-to-br from-white to-gray-50/30 border border-gray-200/60 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-2 mb-5">
              <Building2 className="h-4 w-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Select Property</span>
            </div>
            
            {/* Dropdown selector and map button side by side */}
            <div className="flex gap-3 mb-6">
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
                    className="h-10 px-4 border-gray-200 bg-white text-gray-600 hover:text-gray-900 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm hover:shadow"
                  >
                    <MapPin className="h-4 w-4" />
                    <span className="ml-2 text-sm">Map</span>
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
              <div className="rounded-xl border border-gray-200/80 bg-white/70 backdrop-blur-sm p-5 mb-6 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 text-base">{selectedListing.name}</h4>
                    <div className="flex items-center text-gray-600 gap-2 mt-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{selectedListing.address}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-gradient-to-r from-gray-50 to-gray-100 px-3 py-2 rounded-lg border border-gray-200">
                    {getPropertyTypeIcon(selectedListing.type)}
                    <span className="text-sm font-medium text-gray-700">
                      {formatPropertyType(selectedListing.type)}
                    </span>
                  </div>
                </div>
                
                <div className="h-px bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 mb-4" />
                
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">Tenant Information</span>
                  </div>
                  {hasTenant ? (
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900 text-base">{selectedListing.tenant.name}</div>
                        <div className="text-sm text-gray-600 mt-1 bg-gray-100 px-2 py-1 rounded-md inline-block">{selectedListing.tenant.type}</div>
                      </div>
                      <div className="space-y-2">
                        {selectedListing.tenant.email && (
                          <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
                            <Mail className="h-4 w-4 text-gray-400" /> 
                            <span>{selectedListing.tenant.email}</span>
                          </div>
                        )}
                        {selectedListing.tenant.phone && (
                          <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
                            <Phone className="h-4 w-4 text-gray-400" /> 
                            <span>{selectedListing.tenant.phone}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-xl border border-gray-200">
                      <div className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full">
                        <UserX className="h-5 w-5 text-gray-500" />
                      </div>
                      <div className="flex-1">
                        <div className="text-base font-semibold text-gray-700">No Tenant Assigned</div>
                        <div className="text-sm text-gray-500">This property is currently vacant</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Unit Selection - show if listing has multiple units */}
            {hasMultipleUnits && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">Apply Transaction To</span>
                  </div>
                  {selectedPropertyCategory && (
                    <span className="bg-gradient-to-r from-emerald-50 to-emerald-100 text-sm px-3 py-1.5 rounded-lg flex items-center gap-2 text-emerald-700 border border-emerald-200">
                      {selectedPropertyCategory.subtypes.find(s => s.value.toString().includes(selectedListing.type))?.label || 
                       formatPropertyType(selectedListing.type)}
                    </span>
                  )}
                </div>
                
                {/* Whole Property Option */}
                <div className="mb-4">
                  <Button
                    type="button"
                    variant={!fields.selectedUnitId ? "default" : "outline"}
                    size="sm"
                    className={cn(
                      "w-full justify-start text-left h-12 font-medium border-gray-200 transition-all duration-200",
                      !fields.selectedUnitId 
                        ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white border-blue-500 hover:from-blue-600 hover:to-blue-700 shadow-md" 
                        : "bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-300 shadow-sm"
                    )}
                    onClick={() => setFields(f => ({ ...f, selectedUnitId: "" }))}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-3 h-3 rounded-full",
                        !fields.selectedUnitId ? "bg-white" : "bg-gray-300"
                      )} />
                      <span className="text-base">Whole Property</span>
                      <span className="text-sm opacity-75 ml-auto">All units included</span>
                    </div>
                  </Button>
                </div>
                
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700">Or select specific unit:</span>
                </div>
                <div className="space-y-2">
                  <UnitSelector
                    units={selectedListing.units}
                    selectedUnitId={fields.selectedUnitId || ""}
                    onUnitSelect={(unitId) => setFields(f => ({ ...f, selectedUnitId: unitId }))}
                  />
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200/60 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-xl">
                <DollarSign className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <div className="text-lg font-semibold text-purple-900">General Transaction</div>
                <p className="text-sm text-purple-700/80">Applies to your entire portfolio, not a specific property.</p>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {(selectedListing || fields.listingType === "general") && (
        <>
          {/* Transaction Details Section */}
          <div className="group">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl border border-emerald-100">
                  <Tag className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Transaction Details</h3>
                  <p className="text-sm text-gray-500">Specify the type and category of your transaction</p>
                </div>
              </div>
              <TransactionTypeToggle
                value={fields.transactionType}
                onChange={type => setFields(f => ({ ...f, transactionType: type, category: "" }))}
              />
            </div>
            
            <div className="bg-gradient-to-br from-white to-gray-50/30 border border-gray-200/60 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
              {/* Category */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="h-4 w-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">Category</span>
                </div>
                <Select 
                  value={fields.category} 
                  onValueChange={cat => setFields(f => ({ ...f, category: cat }))}
                >
                  <SelectTrigger className="w-full border-gray-200/80 bg-white/70 h-12 text-base focus:ring-2 focus:ring-emerald-100 focus:border-emerald-300 text-gray-900 rounded-xl shadow-sm hover:shadow transition-all duration-200">
                    <SelectValue placeholder={`Select ${fields.transactionType === "revenue" ? "revenue" : "expense"} category`} />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-gray-200 shadow-lg">
                    {transactionCategories.length > 0 ? (
                      transactionCategories.map(cat => (
                        <SelectItem key={cat.value} value={cat.value} className="rounded-lg">
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
          <div className="group">
            <div className="flex items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-100">
                  <CreditCard className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Payment Details</h3>
                  <p className="text-sm text-gray-500">Enter the financial information for this transaction</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-white to-gray-50/30 border border-gray-200/60 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 space-y-6">
              {/* Amount */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <DollarSign className="h-4 w-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">Amount</span>
                </div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium text-base">$</span>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={fields.amount}
                    onChange={(e) => setFields(f => ({ ...f, amount: e.target.value }))}
                    className="pl-8 h-12 border-gray-200/80 bg-white/70 text-base focus:ring-2 focus:ring-amber-100 focus:border-amber-300 text-gray-900 rounded-xl shadow-sm hover:shadow transition-all duration-200"
                  />
                </div>
              </div>

              {/* Date */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <CalendarIcon className="h-4 w-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">Date</span>
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left h-12 font-normal border-gray-200/80 bg-white/70 text-base focus:ring-2 focus:ring-amber-100 focus:border-amber-300 rounded-xl shadow-sm hover:shadow transition-all duration-200",
                        !fields.date && "text-gray-400"
                      )}
                    >
                      <CalendarIcon className="mr-3 h-4 w-4 text-gray-400" />
                      {fields.date ? format(fields.date, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 z-50 rounded-xl border-gray-200 shadow-lg" align="start">
                    <Calendar
                      mode="single"
                      selected={fields.date}
                      onSelect={d => setFields(f => ({ ...f, date: d }))}
                      initialFocus
                      className="rounded-xl p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Payment Method */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <CreditCard className="h-4 w-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">Payment Method</span>
                </div>
                <Select value={fields.payment} onValueChange={pm => setFields(f => ({ ...f, payment: pm }))}>
                  <SelectTrigger className="w-full border-gray-200/80 bg-white/70 h-12 text-base focus:ring-2 focus:ring-amber-100 focus:border-amber-300 text-gray-900 rounded-xl shadow-sm hover:shadow transition-all duration-200">
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-gray-200 shadow-lg">
                    <SelectItem value="card" className="rounded-lg">Credit Card</SelectItem>
                    <SelectItem value="bank" className="rounded-lg">Bank Transfer</SelectItem>
                    <SelectItem value="cash" className="rounded-lg">Cash</SelectItem>
                    <SelectItem value="check" className="rounded-lg">Check</SelectItem>
                    <SelectItem value="crypto" className="rounded-lg">Cryptocurrency</SelectItem>
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
