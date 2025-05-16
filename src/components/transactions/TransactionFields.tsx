
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar as CalendarIcon, DollarSign, FileText } from "lucide-react";
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
    <Card className="border border-gray-200 shadow-sm rounded-lg p-6 mb-6 bg-white">
      <div className="space-y-6">
        {/* Listing Selection */}
        <div>
          <div className="font-medium text-gray-700 mb-2">Listing</div>
          <Select 
            value={fields.selectedListingId} 
            onValueChange={val => setFields(f => ({ ...f, selectedListingId: val }))}
            disabled={editMode}
          >
            <SelectTrigger className="w-full border-gray-200 bg-white h-10">
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
            {/* Listing Info Card */}
            <ListingInfoCard listing={selectedListing} />
            
            {/* Transaction Type */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium text-gray-700">Transaction Type</div>
                <TransactionTypeToggle
                  value={fields.transactionType}
                  onChange={type => setFields(f => ({ ...f, transactionType: type }))}
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <div className="font-medium text-gray-700 mb-2">Category</div>
              <Select value={fields.category} onValueChange={cat => setFields(f => ({ ...f, category: cat }))}>
                <SelectTrigger className="w-full border-gray-200 bg-white h-10">
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
            <div>
              <div className="font-medium text-gray-700 mb-2">Amount</div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
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
              <div className="font-medium text-gray-700 mb-2">Date</div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left h-10 font-normal",
                      !fields.date && "text-gray-400"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
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
              <div className="font-medium text-gray-700 mb-2">Payment Method</div>
              <Select value={fields.payment} onValueChange={pm => setFields(f => ({ ...f, payment: pm }))}>
                <SelectTrigger className="w-full border-gray-200 bg-white h-10">
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
      </div>
    </Card>
  );
}
