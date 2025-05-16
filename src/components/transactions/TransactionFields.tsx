
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar as CalendarIcon, DollarSign, FileText, ShoppingCart } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { TransactionTypeToggle } from "./TransactionTypeToggle";
import { Card } from "@/components/ui/card";
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

  return (
    <Card className="border border-gray-100 shadow-sm rounded-xl p-6 mb-6 bg-white/50 hover:bg-white/80 transition-colors">
      <div className="mb-5">
        <div className="flex items-center mb-2 gap-2">
          <FileText className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Listing</span>
        </div>
        <Select 
          value={fields.selectedListingId} 
          onValueChange={val => setFields(f => ({ ...f, selectedListingId: val }))}
          disabled={editMode}
        >
          <SelectTrigger className="w-full border-gray-200 bg-white placeholder:text-gray-400">
            <SelectValue placeholder="Select listing" />
          </SelectTrigger>
          <SelectContent>
            {mockListings.map(listing => (
              <SelectItem key={listing.id} value={listing.id}>{listing.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedListing && (
        <>
          {/* Using our new ListingInfoCard component */}
          <ListingInfoCard listing={selectedListing} />
          
          {/* Transaction Type & Category */}
          <div className="mb-5 flex items-center gap-4">
            <span className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <ShoppingCart className="h-4 w-4 text-gray-500" />
              Transaction Type
            </span>
            <div className="flex-1 flex justify-end">
              <TransactionTypeToggle
                value={fields.transactionType}
                onChange={type => setFields(f => ({ ...f, transactionType: type }))}
                className="text-xs"
              />
            </div>
          </div>

          {/* Category Select */}
          <div className="mb-5">
            <Select value={fields.category} onValueChange={cat => setFields(f => ({ ...f, category: cat }))}>
              <SelectTrigger className="w-full border-gray-200 bg-white text-gray-900 placeholder:text-gray-400">
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

          {/* Amount */}
          <div className="mb-5">
            <div className="flex items-center mb-2">
              <DollarSign className="h-4 w-4 text-gray-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">Amount</span>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">$</span>
              <Input
                type="number"
                placeholder="0.00"
                value={fields.amount}
                onChange={(e) => setFields(f => ({ ...f, amount: e.target.value }))}
                className="pl-7 border-gray-200 bg-white placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Date */}
          <div className="mb-5">
            <div className="flex items-center mb-2">
              <CalendarIcon className="h-4 w-4 text-gray-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">Date</span>
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full flex justify-between items-center border-gray-200 bg-white text-gray-900 font-normal",
                    !fields.date && "text-gray-400"
                  )}
                >
                  <span className="flex items-center">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {fields.date ? format(fields.date, "PPP") : <span>Select date</span>}
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 z-50" align="start">
                <Calendar
                  mode="single"
                  selected={fields.date}
                  onSelect={d => setFields(f => ({ ...f, date: d }))}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Payment Method */}
          <div>
            <div className="flex items-center mb-2">
              <DollarSign className="h-4 w-4 text-gray-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">Payment Method</span>
            </div>
            <Select value={fields.payment} onValueChange={pm => setFields(f => ({ ...f, payment: pm }))}>
              <SelectTrigger className="w-full border-gray-200 bg-white text-gray-900 placeholder:text-gray-400">
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
        </>
      )}
    </Card>
  );
}
