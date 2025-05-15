
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Calendar as CalendarIcon,
  DollarSign,
  FileText,
  ShoppingCart,
  ChevronRight,
  Check,
  User,
  Mail,
  Phone,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

// Mock listings data for the dropdown and payer autofill
const mockListings = [
  {
    id: "1",
    name: "Maple Apartments 104",
    tenant: {
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "+123456789",
    },
  },
  {
    id: "2",
    name: "Pine Residences 12A",
    tenant: {
      name: "Alice Smith",
      email: "alice.smith@email.com",
      phone: "+987654321",
    },
  },
];

export function TransactionForm({ onClose }: { onClose?: () => void }) {
  // Step 1: State variables and mock data
  const [activeTab, setActiveTab] = useState("details");
  const [selectedListingId, setSelectedListingId] = useState<string>("");
  const [transactionType, setTransactionType] = useState<"revenue" | "expense">("revenue");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [payment, setPayment] = useState("");
  const [notes, setNotes] = useState("");
  const { toast } = useToast();

  // Get tenant info from selected listing
  const selectedListing = mockListings.find(l => l.id === selectedListingId);
  const payerName = selectedListing?.tenant.name || "";
  const payerEmail = selectedListing?.tenant.email || "";
  const payerPhone = selectedListing?.tenant.phone || "";

  // Step 2: Handle submission
  function handleConfirm() {
    toast({
      title: "Transaction created",
      description: "Your transaction has been created successfully.",
    });
    if (onClose) onClose();
  }

  // Step 3: Tab navigation and UI
  return (
    <div className="p-6 h-full overflow-auto min-w-[340px]">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800">Add Transaction</h2>
      </div>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 w-full mb-6 bg-gray-50">
          <TabsTrigger value="details" className="rounded-none data-[state=active]:bg-white data-[state=active]:text-gray-900">Transaction Details</TabsTrigger>
          <TabsTrigger value="payer" className="rounded-none data-[state=active]:bg-white data-[state=active]:text-gray-900">Payer Details</TabsTrigger>
          <TabsTrigger value="additional" className="rounded-none data-[state=active]:bg-white data-[state=active]:text-gray-900">Additional Info</TabsTrigger>
        </TabsList>

        {/* Details Tab */}
        <TabsContent value="details">
          <Card className="border border-gray-100 shadow-sm rounded-xl p-5 mb-6">
            {/* Listing */}
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <FileText className="h-4 w-4 text-gray-500 mr-2" />
                <span className="text-sm font-medium text-gray-700">Listing</span>
              </div>
              <Select value={selectedListingId} onValueChange={setSelectedListingId}>
                <SelectTrigger className="w-full border-gray-200 bg-white placeholder:text-gray-400">
                  <SelectValue placeholder="Select a listing" />
                </SelectTrigger>
                <SelectContent>
                  {mockListings.map(listing => (
                    <SelectItem key={listing.id} value={listing.id}>{listing.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {/* Transaction Type */}
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <ShoppingCart className="h-4 w-4 text-gray-500 mr-2" />
                <span className="text-sm font-medium text-gray-700">Transaction Type</span>
              </div>
              <div className="flex gap-2 mt-1">
                <Button
                  variant={transactionType === "revenue" ? "default" : "outline"}
                  size="sm"
                  className={cn(
                    "rounded-full px-5 text-base font-medium transition-colors",
                    transactionType === "revenue" ? "bg-gray-900 text-white" : "bg-white"
                  )}
                  onClick={() => setTransactionType("revenue")}
                >
                  Revenue
                </Button>
                <Button
                  variant={transactionType === "expense" ? "default" : "outline"}
                  size="sm"
                  className={cn(
                    "rounded-full px-5 text-base font-medium transition-colors",
                    transactionType === "expense" ? "bg-red-500 text-white" : "bg-white"
                  )}
                  onClick={() => setTransactionType("expense")}
                >
                  Expense
                </Button>
              </div>
            </div>
            {/* Category */}
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <FileText className="h-4 w-4 text-gray-500 mr-2" />
                <span className="text-sm font-medium text-gray-700">Category</span>
              </div>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-full border-gray-200 bg-white text-gray-900 placeholder:text-gray-400">
                  <SelectValue placeholder={`Select ${transactionType === "revenue" ? "revenue" : "expense"} category`} />
                </SelectTrigger>
                <SelectContent>
                  {transactionType === "revenue" ? (
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
                <span className="text-sm font-medium text-gray-700">Amount</span>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">$</span>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-7 border-gray-200 bg-white placeholder:text-gray-400"
                />
              </div>
            </div>
            {/* Date */}
            <div className="mb-4">
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
                      !date && "text-gray-400"
                    )}
                  >
                    <span className="flex items-center">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Select date</span>}
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 z-50" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
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
              <Select value={payment} onValueChange={setPayment}>
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
          </Card>
          <div className="flex justify-end">
            <Button
              disabled={!selectedListingId}
              onClick={() => setActiveTab("payer")}
              className="flex items-center gap-2 bg-gray-900 text-white"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </TabsContent>

        {/* Payer Tab */}
        <TabsContent value="payer">
          <Card className="border border-gray-100 shadow-sm rounded-xl p-5 mb-6">
            <div>
              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <User className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="text-sm font-medium text-gray-700">Payer Name</span>
                </div>
                <Input
                  type="text"
                  placeholder="Enter payer's name"
                  value={payerName}
                  readOnly
                  className="border-gray-200 bg-gray-50 cursor-not-allowed text-gray-500"
                />
              </div>
              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <Mail className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="text-sm font-medium text-gray-700">Payer Email</span>
                </div>
                <Input
                  type="email"
                  placeholder="Enter payer's email"
                  value={payerEmail}
                  readOnly
                  className="border-gray-200 bg-gray-50 cursor-not-allowed text-gray-500"
                />
              </div>
              <div>
                <div className="flex items-center mb-2">
                  <Phone className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="text-sm font-medium text-gray-700">Payer Phone</span>
                </div>
                <Input
                  type="tel"
                  placeholder="Enter payer's phone"
                  value={payerPhone}
                  readOnly
                  className="border-gray-200 bg-gray-50 cursor-not-allowed text-gray-500"
                />
              </div>
            </div>
          </Card>
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setActiveTab("details")}
              className="border-gray-200"
            >
              Back
            </Button>
            <Button
              onClick={() => setActiveTab("additional")}
              className="flex items-center gap-2 bg-gray-900 text-white"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </TabsContent>

        {/* Additional Info Tab */}
        <TabsContent value="additional">
          <Card className="border border-gray-100 shadow-sm rounded-xl p-5 mb-6">
            <div>
              <div className="flex items-center mb-2">
                <FileText className="h-4 w-4 text-gray-500 mr-2" />
                <span className="text-sm font-medium text-gray-700">Additional Notes</span>
              </div>
              <Textarea
                placeholder="Add additional details or notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="border-gray-200 min-h-[90px]"
              />
            </div>
          </Card>
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setActiveTab("payer")}
              className="border-gray-200"
            >
              Back
            </Button>
            <Button
              onClick={handleConfirm}
              className="flex items-center gap-2 bg-gray-800 text-white"
            >
              <Check className="h-4 w-4" />
              Confirm
            </Button>
          </div>
        </TabsContent>

      </Tabs>
    </div>
  );
}

