import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar as CalendarIcon, DollarSign } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { TransactionTypeToggle } from "./TransactionTypeToggle";
import { Listing, TransactionFieldsData, TransactionFormFieldsProps } from "./TransactionFormTypes";
import { ListingInfoCard } from "./ListingInfoCard";

export function TransactionFields({ 
  mockListings, 
  initialValues, 
  onChange, 
  editMode = false 
}: TransactionFormFieldsProps) {
  const [fields, setFields] = useState<TransactionFieldsData>(initialValues);

  useEffect(() => {
    setFields(initialValues);
  }, [initialValues]);

  useEffect(() => {
    onChange(fields);
  }, [fields, onChange]);

  const selectedListing = mockListings.find(l => l.id === fields.selectedListingId);

  // Fix the issue here - ensuring we're passing a boolean to the disabled prop
  // The issue is that editMode is a boolean, but fields.selectedListingId is a string
  // We need to convert the string check to a boolean expression
  const isEditModeWithSelectedListing = editMode && !!fields.selectedListingId;

  return (
    <div className="space-y-6">
      {/* Listing Selection Section - Only shown if not in edit mode or if no listing is selected */}
      {(!editMode || !fields.selectedListingId) && (
        <div className="space-y-4 group">
          <div className="flex items-center">
            <h3 className="text-sm font-medium text-gray-800 group-hover:text-gray-950 transition-colors">Listing Selection</h3>
            <div className="ml-2 h-px bg-gray-100 flex-1"></div>
          </div>
          
          <div className="bg-gray-50/50 border border-gray-100 rounded-lg p-5">
            <div className="text-xs font-medium text-gray-500 mb-1.5 ml-0.5">Property</div>
            <Select 
              value={fields.selectedListingId} 
              onValueChange={val => setFields(f => ({ ...f, selectedListingId: val }))}
              disabled={isEditModeWithSelectedListing}
            >
              <SelectTrigger className="w-full border-gray-200 bg-white h-9 text-sm focus:ring-2 focus:ring-gray-100 focus:border-gray-300 text-gray-900 rounded-md">
                <SelectValue placeholder="Select property" />
              </SelectTrigger>
              <SelectContent>
                {mockListings.map(listing => (
                  <SelectItem key={listing.id} value={listing.id}>{listing.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
      
      {selectedListing && (
        <>
          {/* Listing Info Card Section */}
          <div className="space-y-4 group">
            <div className="flex items-center">
              <h3 className="text-sm font-medium text-gray-800 group-hover:text-gray-950 transition-colors">Selected Property</h3>
              <div className="ml-2 h-px bg-gray-100 flex-1"></div>
            </div>
            <ListingInfoCard listing={selectedListing} />
          </div>
          
          {/* Transaction Details Section */}
          <div className="space-y-4 group">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <h3 className="text-sm font-medium text-gray-800 group-hover:text-gray-950 transition-colors">Transaction Details</h3>
                <div className="ml-2 h-px bg-gray-100 flex-1 w-24"></div>
              </div>
              <TransactionTypeToggle
                value={fields.transactionType}
                onChange={type => setFields(f => ({ ...f, transactionType: type }))}
                className="ml-auto"
              />
            </div>
            
            <div className="bg-gray-50/50 border border-gray-100 rounded-lg p-5 space-y-6">
              {/* Category */}
              <div>
                <div className="text-xs font-medium text-gray-500 mb-1.5 ml-0.5">Category</div>
                <Select value={fields.category} onValueChange={cat => setFields(f => ({ ...f, category: cat }))}>
                  <SelectTrigger className="w-full border-gray-200 bg-white h-9 text-sm focus:ring-2 focus:ring-gray-100 focus:border-gray-300 text-gray-900 rounded-md">
                    <SelectValue placeholder={`Select ${fields.transactionType === "revenue" ? "revenue" : "expense"} category`} />
                  </SelectTrigger>
                  <SelectContent>
                    {fields.transactionType === "revenue" ? (
                      <>
                        <SelectItem value="rent">Rent</SelectItem>
                        <SelectItem value="deposit">Deposit</SelectItem>
                        <SelectItem value="fee">Fee</SelectItem>
                        <SelectItem value="other-income">Other Income</SelectItem>
                      </>
                    ) : (
                      <>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                        <SelectItem value="utilities">Utilities</SelectItem>
                        <SelectItem value="insurance">Insurance</SelectItem>
                        <SelectItem value="tax">Tax</SelectItem>
                        <SelectItem value="other-expense">Other Expense</SelectItem>
                      </>
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
