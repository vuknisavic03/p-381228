
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SheetClose } from "@/components/ui/sheet";
import { X, Check, DollarSign, Calendar, FileText } from "lucide-react";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Fake data for property listings
const mockListings = [
  { id: 1, name: "Downtown Apartment" },
  { id: 2, name: "Lakeview Condo" },
  { id: 3, name: "Suburban House" }
];

interface TransactionFormProps {
  onClose?: () => void;
}

export function TransactionForm({ onClose }: TransactionFormProps) {
  const [listing, setListing] = useState<string>("");
  const [transactionType, setTransactionType] = useState<'revenue' | 'expense'>('revenue');
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState<Date>(new Date());
  const [description, setDescription] = useState<string>("");
  const [party, setParty] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const { toast } = useToast();

  // Restore category options as per old UI
  const categoryOptions = transactionType === 'revenue' 
    ? ["Rent", "Deposit", "Fee", "Other Income"] 
    : ["Maintenance", "Utilities", "Insurance", "Tax", "Other Expense"];

  const [category, setCategory] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!listing || !amount || !category || !date || !party) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // In a real app, send data to server here
    console.log({
      listing,
      type: transactionType,
      amount: parseFloat(amount),
      date,
      description,
      category,
      party,
      notes,
    });

    // Reset on Submit
    setListing("");
    setTransactionType('revenue');
    setAmount("");
    setDate(new Date());
    setDescription("");
    setCategory("");
    setParty("");
    setNotes("");

    toast({
      title: `${transactionType === "revenue" ? "Revenue" : "Expense"} transaction created`,
      description: `Your ${transactionType} transaction has been added.`,
    });

    if (onClose) onClose();
  };

  return (
    <div className="flex flex-col p-6 w-full h-full max-h-screen overflow-y-auto">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold">Add Transaction</h2>
        <SheetClose asChild>
          <Button variant="outline" size="icon" onClick={onClose} className="h-9 w-9">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </SheetClose>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-6">
        {/* Section 1: Pick Listing */}
        <div className="p-4 pb-2 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-bold text-gray-700 mb-3">1. Pick Listing</h3>
          <Select 
            value={listing} 
            onValueChange={setListing}
          >
            <SelectTrigger className="w-full border-gray-200 bg-white hover:border-gray-300">
              <SelectValue placeholder="Select a listing" />
            </SelectTrigger>
            <SelectContent>
              {mockListings.map(listing => (
                <SelectItem key={listing.id} value={listing.name}>{listing.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Section 2: Transaction Details */}
        <div className="p-4 pb-2 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-bold text-gray-700 mb-3">2. Transaction Details</h3>
          {/* Transaction Type */}
          <div className="mb-3 flex gap-2">
            <Button
              type="button"
              variant={transactionType === "revenue" ? "default" : "outline"}
              className={cn("px-3 py-1 rounded-full", transactionType === "revenue" && "bg-emerald-600 text-white")}
              onClick={() => setTransactionType("revenue")}
            >
              Revenue
            </Button>
            <Button
              type="button"
              variant={transactionType === "expense" ? "default" : "outline"}
              className={cn("px-3 py-1 rounded-full", transactionType === "expense" && "bg-rose-600 text-white")}
              onClick={() => setTransactionType("expense")}
            >
              Expense
            </Button>
          </div>
          {/* Amount */}
          <div className="mb-3">
            <label className="flex items-center gap-2 text-xs font-medium text-gray-600 mb-1">
              <DollarSign className="h-4 w-4 text-gray-500" />
              Amount
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
              <Input 
                type="text" 
                value={amount}
                onChange={e => setAmount(e.target.value.replace(/[^0-9.]/g, ""))}
                className="pl-7 border-gray-200 bg-white"
                placeholder="0.00" 
              />
            </div>
          </div>
          {/* Category */}
          <div className="mb-3">
            <label className="text-xs font-medium text-gray-600 mb-1 block">Category</label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full border-gray-200 bg-white hover:border-gray-300">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categoryOptions.map((option) => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* Date */}
          <div className="mb-3">
            <label className="flex items-center gap-2 text-xs font-medium text-gray-600 mb-1">
              <Calendar className="h-4 w-4 text-gray-500" />
              Date
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn("w-full justify-start text-left border-gray-200 bg-white", !date && "text-muted-foreground")}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Select date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 border-gray-200" align="start">
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          {/* Party (e.g. From/To) */}
          <div className="mb-3">
            <label className="flex items-center gap-2 text-xs font-medium text-gray-600 mb-1">
              <FileText className="h-4 w-4 text-gray-500" />
              {transactionType === "revenue" ? "From" : "To"}
            </label>
            <Input
              value={party}
              onChange={e => setParty(e.target.value)}
              className="border-gray-200 bg-white"
              placeholder={transactionType === "revenue" ? "Who paid you?" : "Who did you pay?"}
            />
          </div>
          {/* Description */}
          <div className="mb-3">
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Description
            </label>
            <Input
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="border-gray-200 bg-white"
              placeholder="e.g. Security deposit, maintenance, etc."
            />
          </div>
        </div>

        {/* Section 3: Notes */}
        <div className="p-4 pb-2 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-bold text-gray-700 mb-3">3. Notes (optional)</h3>
          <Textarea
            placeholder="Additional notes..."
            value={notes}
            onChange={e => setNotes(e.target.value)}
            className="border-gray-200 bg-white min-h-[64px]"
          />
        </div>

        <div className="flex justify-end gap-3 mt-2">
          <Button type="submit" className="w-full sm:w-auto flex items-center gap-2 bg-gray-800 hover:bg-gray-700">
            <Check className="h-4 w-4" />
            Add {transactionType}
          </Button>
        </div>
      </form>
    </div>
  );
}
