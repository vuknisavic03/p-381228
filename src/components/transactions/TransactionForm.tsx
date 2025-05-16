
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Calendar as CalendarIcon,
  DollarSign,
  FileText,
  X,
  Check,
  ShoppingCart,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { SheetClose } from "@/components/ui/sheet";
import { TransactionTypeToggle } from "./TransactionTypeToggle";
import { Listing, TransactionFieldsData } from "./TransactionFormTypes";
import { Separator } from "@/components/ui/separator";

const mockListings: Listing[] = [
  {
    id: "1",
    name: "Belgrade, Dunavska 12",
    type: "Retail",
    address: "Belgrade, Dunavska 12",
    city: "Belgrade",
    country: "Serbia",
    tenant: {
      name: "Alexander Whitmore",
      type: "Individual",
      email: "alex@example.com",
      phone: "000-000-0000"
    }
  },
  // ... add more mock listings as needed
];

export function TransactionForm({ onClose }: { onClose?: () => void }) {
  const [fields, setFields] = useState<TransactionFieldsData>({
    selectedListingId: "",
    transactionType: "revenue",
    category: "",
    amount: "",
    date: new Date(),
    payment: "",
    notes: "",
  });
  const { toast } = useToast();

  function handleConfirm() {
    toast({
      title: "Transaction created",
      description: "Your transaction has been created successfully.",
    });
    if (onClose) onClose();
  }

  const selectedListing = mockListings.find(l => l.id === fields.selectedListingId);

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-900">Add Transaction</h2>
        <SheetClose asChild>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </SheetClose>
      </div>
      
      {/* Form content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="space-y-8">
          {/* Transaction Details Section */}
          <div>
            <h3 className="text-lg font-medium mb-5">Transaction Details</h3>
            
            {/* Listing Selection */}
            <div className="mb-6">
              <div className="font-medium text-gray-700 mb-2">Listing</div>
              <Select 
                value={fields.selectedListingId} 
                onValueChange={val => setFields(f => ({ ...f, selectedListingId: val }))}
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
                {/* Transaction Type */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium text-gray-700">Transaction Type</div>
                    <TransactionTypeToggle
                      value={fields.transactionType}
                      onChange={type => setFields(f => ({ ...f, transactionType: type }))}
                    />
                  </div>
                </div>

                {/* Category */}
                <div className="mb-6">
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
                <div className="mb-6">
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
                <div className="mb-6">
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
                <div className="mb-6">
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

          {selectedListing && (
            <>
              {/* Payer Information Section */}
              <div>
                <h3 className="text-lg font-medium mb-5">Payer Information</h3>
                
                <div className="space-y-6">
                  {/* Payer Name */}
                  <div>
                    <div className="font-medium text-gray-700 mb-2">Full Name</div>
                    <Input
                      type="text"
                      value={selectedListing.tenant.name}
                      readOnly
                      className="bg-gray-50 cursor-not-allowed h-10"
                    />
                  </div>
                  
                  {/* Payer Contact - Two column layout */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="font-medium text-gray-700 mb-2">Phone</div>
                      <Input
                        type="tel"
                        value={selectedListing.tenant.phone}
                        readOnly
                        className="bg-gray-50 cursor-not-allowed h-10"
                      />
                    </div>
                    <div>
                      <div className="font-medium text-gray-700 mb-2">Email</div>
                      <Input
                        type="email"
                        value={selectedListing.tenant.email}
                        readOnly
                        className="bg-gray-50 cursor-not-allowed h-10"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Information Section */}
              <div>
                <h3 className="text-lg font-medium mb-5">Additional Information</h3>
                
                <div>
                  <div className="font-medium text-gray-700 mb-2">Notes</div>
                  <Textarea
                    placeholder="Add any additional details about this transaction"
                    value={fields.notes}
                    onChange={(e) => setFields(f => ({ ...f, notes: e.target.value }))}
                    className="min-h-[120px]"
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Footer with action buttons */}
      <div className="border-t border-gray-100 p-6 flex justify-end gap-2">
        <Button
          variant="outline" 
          onClick={onClose}
          className="border-gray-200 hover:bg-gray-50 h-10"
        >
          Cancel
        </Button>
        <Button
          onClick={handleConfirm}
          disabled={!fields.selectedListingId || !fields.category || !fields.amount}
          className="bg-gray-900 hover:bg-gray-800 text-white h-10"
        >
          Add transaction
        </Button>
      </div>
    </div>
  );
}
