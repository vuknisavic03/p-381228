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
    <div className="w-full max-w-none space-y-4">
      {/* Quick Setup */}
      <div className="bg-card rounded-lg border border-border p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-foreground">Quick Setup</h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">For:</span>
            <ListingTypeToggle
              value={fields.listingType || "listing"}
              onChange={type => setFields(f => ({ ...f, listingType: type }))}
            />
          </div>
        </div>
        
        {fields.listingType === "listing" ? (
          <div className="space-y-3">
            <div className="flex gap-2">
              <div className="flex-1">
                <ListingSelector
                  listings={mockListings}
                  selectedValue={fields.selectedListingId}
                  onSelect={(val) => setFields(f => ({ ...f, selectedListingId: val, category: "", selectedUnitId: "" }))}
                  placeholder="Select property"
                />
              </div>
              <Dialog open={isMapOpen} onOpenChange={setIsMapOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="h-10 px-3">
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

            {selectedListing && (
              <div className="rounded-lg border border-border bg-muted/30 p-3">
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm text-foreground">{selectedListing.name}</h4>
                    <div className="flex items-center text-muted-foreground gap-1.5 mt-0.5">
                      <MapPin className="h-3 w-3" />
                      <span className="text-xs">{selectedListing.address}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-card px-2 py-1 rounded border border-border">
                    <span className="h-3 w-3">{getPropertyTypeIcon(selectedListing.type)}</span>
                    <span className="text-xs font-medium text-foreground">
                      {formatPropertyType(selectedListing.type)}
                    </span>
                  </div>
                </div>

                {hasMultipleUnits && (
                  <div className="mt-3 pt-3 border-t border-border">
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant={!fields.selectedUnitId ? "secondary" : "outline"}
                        size="sm"
                        className="flex-1 h-8 text-xs"
                        onClick={() => setFields(f => ({ ...f, selectedUnitId: "" }))}
                      >
                        Whole Property
                      </Button>
                      <UnitSelector
                        units={selectedListing.units}
                        selectedUnitId={fields.selectedUnitId || ""}
                        onUnitSelect={(unitId) => setFields(f => ({ ...f, selectedUnitId: unitId }))}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-3 p-3 bg-purple-50 border border-purple-200 rounded-lg">
            <div className="w-2 h-2 rounded-full bg-purple-500"></div>
            <div>
              <div className="font-medium text-sm text-purple-700">General Transaction</div>
              <p className="text-xs text-purple-600">For your entire portfolio</p>
            </div>
          </div>
        )}
      </div>
      
      {(selectedListing || fields.listingType === "general") && (
        <div className="bg-card rounded-lg border border-border p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-foreground">Transaction Details</h3>
            <TransactionTypeToggle
              value={fields.transactionType}
              onChange={type => setFields(f => ({ ...f, transactionType: type, category: "" }))}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Category */}
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Category</label>
              <Select 
                value={fields.category} 
                onValueChange={cat => setFields(f => ({ ...f, category: cat }))}
              >
                <SelectTrigger className="w-full h-10">
                  <SelectValue placeholder={`Select category`} />
                </SelectTrigger>
                <SelectContent className="max-h-60 overflow-y-auto">
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

            {/* Amount */}
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Amount</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">$</span>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={fields.amount}
                  onChange={(e) => setFields(f => ({ ...f, amount: e.target.value }))}
                  className="pl-7 h-10"
                />
              </div>
            </div>

            {/* Date */}
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left h-10 font-normal",
                      !fields.date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {fields.date ? format(fields.date, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 z-50" align="start">
                  <Calendar
                    mode="single"
                    selected={fields.date}
                    onSelect={d => setFields(f => ({ ...f, date: d }))}
                    initialFocus
                    className="rounded-md pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Payment Method */}
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Payment method</label>
              <Select value={fields.payment} onValueChange={pm => setFields(f => ({ ...f, payment: pm }))}>
                <SelectTrigger className="w-full h-10">
                  <SelectValue placeholder="Select method" />
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
      )}
    </div>
  );
}
