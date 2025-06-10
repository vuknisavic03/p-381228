import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar as CalendarIcon, DollarSign, FileText, User, Mail, Phone, ShoppingCart } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { TransactionTypeToggle } from "./TransactionTypeToggle";
import { Card } from "@/components/ui/card";
import { ListingSelector } from "./ListingSelector";
import { PropertyType } from "./TransactionFormTypes"; 
import { getPropertyTypeIcon, formatPropertyType } from "@/utils/propertyTypeUtils";

// Update Listing interface to match the one in TransactionFormTypes.ts
interface Listing {
  id: string;
  name: string;
  type: PropertyType; // Now using PropertyType instead of string
  address: string;
  city: string;
  country: string;
  tenant: {
    name: string;
    type: string;
    email: string;
    phone: string;
  }
}

export interface TransactionFieldsData {
  selectedListingId: string;
  transactionType: "revenue" | "expense";
  category: string;
  amount: string;
  date: Date | undefined;
  payment: string;
  notes: string;
}

interface TransactionFormFieldsProps {
  mockListings: Listing[];
  initialValues: TransactionFieldsData;
  onChange: (data: TransactionFieldsData) => void;
  editMode?: boolean;
}

export function TransactionFormFields({ mockListings, initialValues, onChange, editMode }: TransactionFormFieldsProps) {
  const [fields, setFields] = useState<TransactionFieldsData>(initialValues);

  useEffect(() => {
    setFields(initialValues);
  }, [initialValues]);

  useEffect(() => {
    onChange(fields);
  }, [fields]);

  const selectedListing = mockListings.find(l => l.id === fields.selectedListingId);
  const payer = selectedListing?.tenant;

  return (
    <Card className="border border-gray-100 shadow-sm rounded-xl p-6 mb-6 bg-white">
      <div className="mb-5">
        <div className="flex items-center mb-2 gap-2">
          <FileText className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-semibold text-gray-700">Listing</span>
        </div>
        <ListingSelector
          listings={mockListings}
          selectedValue={fields.selectedListingId}
          onSelect={(val) => setFields(f => ({ ...f, selectedListingId: val }))}
        />
      </div>
      {selectedListing && (
        <>
          {/* Payer/Tenant card */}
          <div className="rounded-xl border border-gray-100 bg-white mb-6 p-5 flex flex-col gap-3 shadow-xs">
            <div className="flex gap-3 items-center">
              <div className="flex items-center justify-center rounded-lg bg-gray-50 h-12 w-12">
                <User className="h-7 w-7 text-gray-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold text-gray-900">{payer?.name}</span>
                  <span className="ml-2 bg-gray-100 text-xs font-semibold text-gray-600 rounded px-2 py-0.5">{payer?.type}</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <Mail className="h-4 w-4 text-gray-400" /><span className="text-sm text-gray-700">{payer?.email}</span>
                  <Phone className="h-4 w-4 text-gray-400 ml-4" /><span className="text-sm text-gray-700">{payer?.phone}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-3 mt-1">
              {selectedListing.type && getPropertyTypeIcon(selectedListing.type)}
              <div>
                <div className="font-semibold text-gray-900">{selectedListing.name}</div>
                <div className="text-sm text-gray-500">{selectedListing.city}, {selectedListing.country}</div>
              </div>
              <span className="ml-auto bg-gray-100 text-xs font-medium text-gray-600 rounded px-2 py-1 flex items-center gap-1">
                {getPropertyTypeIcon(selectedListing.type)}
                {formatPropertyType(selectedListing.type)}
              </span>
            </div>
          </div>
          {/* Transaction Type & Category */}
          <div className="mb-4 flex items-center gap-4">
            <span className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <ShoppingCart className="h-4 w-4 text-gray-500" />
              Transaction Type
            </span>
            <div className="flex-1 flex justify-end">
              <TransactionTypeToggle
                value={fields.transactionType}
                onChange={type => setFields(f => ({ ...f, transactionType: type }))}
                size="small"
              />
            </div>
          </div>
          {/* Category Select */}
          <div className="mb-4">
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
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <DollarSign className="h-4 w-4 text-gray-500 mr-2" />
              <span className="text-sm font-semibold text-gray-700">Amount</span>
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
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <CalendarIcon className="h-4 w-4 text-gray-500 mr-2" />
              <span className="text-sm font-semibold text-gray-700">Date</span>
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
              <span className="text-sm font-semibold text-gray-700">Payment Method</span>
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
