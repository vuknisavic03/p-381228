
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar as CalendarIcon, DollarSign, X } from "lucide-react";
import { format } from "date-fns";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { SheetClose } from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

// Mock listings and categories (like the old form)
const mockListings = [
  { id: 1, name: "Downtown Apartment" },
  { id: 2, name: "Lakeview Condo" },
  { id: 3, name: "Suburban House" }
];

const revenueCategories = ["Rent", "Deposit", "Fee", "Other Income"];
const expenseCategories = ["Maintenance", "Utilities", "Insurance", "Tax", "Other Expense"];

type TransactionType = "revenue" | "expense";

interface TransactionFormProps {
  onClose?: () => void;
}

export function TransactionForm({ onClose }: TransactionFormProps) {
  const [listing, setListing] = useState("");
  const [type, setType] = useState<TransactionType>("revenue");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState<Date>(new Date());
  const [party, setParty] = useState("");
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState("");
  const { toast } = useToast();

  const categoryOptions = type === "revenue" ? revenueCategories : expenseCategories;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Minimal required validations (just like before)
    if (!listing || !amount || !category || !date || !party) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    // Simulate send
    console.log({ listing, type, amount, category, date, party, description, notes });
    toast({
      title: `${type === "revenue" ? "Revenue" : "Expense"} transaction created`,
      description: `Your ${type} transaction has been added.`,
    });
    // Reset fields
    setListing("");
    setType("revenue");
    setAmount("");
    setCategory("");
    setDate(new Date());
    setParty("");
    setDescription("");
    setNotes("");
    if (onClose) onClose();
  }

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

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Pick Listing */}
        <div className="bg-gray-50 rounded-lg px-5 py-4">
          <div className="mb-2 text-xs font-semibold text-gray-700 uppercase tracking-wider">1. Pick Listing</div>
          <Select value={listing} onValueChange={setListing}>
            <SelectTrigger className="w-full border-gray-200 bg-white hover:border-gray-300">
              <SelectValue placeholder="Select listing" />
            </SelectTrigger>
            <SelectContent>
              {mockListings.map(l => (
                <SelectItem key={l.id} value={l.name}>{l.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Section 2: Transaction Details */}
        <div className="bg-gray-50 rounded-lg px-5 py-4">
          <div className="mb-2 text-xs font-semibold text-gray-700 uppercase tracking-wider">2. Transaction Details</div>
          <div className="flex items-center gap-3 mb-4">
            <Button
              type="button"
              size="sm"
              variant={type === "revenue" ? "default" : "outline"}
              className={cn("rounded-full px-4", type === "revenue" && "bg-emerald-600 text-white")}
              onClick={() => setType("revenue")}
            >
              Revenue
            </Button>
            <Button
              type="button"
              size="sm"
              variant={type === "expense" ? "default" : "outline"}
              className={cn("rounded-full px-4", type === "expense" && "bg-rose-600 text-white")}
              onClick={() => setType("expense")}
            >
              Expense
            </Button>
          </div>
          <div className="mb-3">
            <label className="block text-xs font-medium text-gray-600 mb-1">Amount</label>
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
          <div className="mb-3">
            <label className="block text-xs font-medium text-gray-600 mb-1">Category</label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full border-gray-200 bg-white hover:border-gray-300">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categoryOptions.map(opt => (
                  <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="mb-3">
            <label className="block text-xs font-medium text-gray-600 mb-1">Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn("w-full justify-start text-left border-gray-200 bg-white", !date && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Select date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 border-gray-200" align="start">
                {/* Calendar must be imported via shadcn's UI */}
                <div>
                  {/* Use a real calendar in your environment */}
                  <input
                    type="date"
                    value={format(date, "yyyy-MM-dd")}
                    onChange={e => setDate(new Date(e.target.value))}
                    className="w-full px-2 py-2 border rounded-md text-sm"
                  />
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <div className="mb-3">
            <label className="block text-xs font-medium text-gray-600 mb-1">
              {type === "revenue" ? "From" : "To"}
            </label>
            <Input
              value={party}
              onChange={e => setParty(e.target.value)}
              className="border-gray-200 bg-white"
              placeholder={type === "revenue" ? "Who paid you?" : "Who did you pay?"}
            />
          </div>
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

        {/* Section 3: Notes (optional) */}
        <div className="bg-gray-50 rounded-lg px-5 py-4">
          <div className="mb-2 text-xs font-semibold text-gray-700 uppercase tracking-wider">3. Notes (optional)</div>
          <Textarea
            placeholder="Additional notes..."
            value={notes}
            onChange={e => setNotes(e.target.value)}
            className="border-gray-200 bg-white min-h-[50px]"
          />
        </div>

        <div className="flex justify-end gap-3 mt-2">
          <Button type="submit" className="w-full sm:w-auto flex items-center gap-2 bg-gray-800 hover:bg-gray-700">
            Add {type}
          </Button>
        </div>
      </form>
    </div>
  );
}
