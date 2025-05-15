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
  House,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const mockListings = [
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
  const [activeTab, setActiveTab] = useState("details");
  const [selectedListingId, setSelectedListingId] = useState<string>("");
  const [transactionType, setTransactionType] = useState<"revenue" | "expense">("revenue");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [payment, setPayment] = useState("");
  const [notes, setNotes] = useState("");
  const { toast } = useToast();

  // Selected listing, tenant info
  const selectedListing = mockListings.find(l => l.id === selectedListingId);
  const payer = selectedListing?.tenant;

  function handleConfirm() {
    toast({
      title: "Transaction created",
      description: "Your transaction has been created successfully.",
    });
    if (onClose) onClose();
  }

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

        {/* Details Tab: Key redesign here */}
        <TabsContent value="details">
          <Card className="border border-gray-100 shadow-sm rounded-xl p-6 mb-6">
            {/* LISTING PICKER always shown */}
            <div className="mb-5">
              <div className="flex items-center mb-2 gap-2">
                <FileText className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-semibold text-gray-700">Listing</span>
              </div>
              <Select value={selectedListingId} onValueChange={setSelectedListingId}>
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
            {/* Show rest only after listing is selected */}
            {selectedListing && (
              <>
                {/* PAYER/TENANT CARD */}
                <div className="rounded-xl border border-gray-100 bg-white mb-6 p-5 flex flex-col gap-3 shadow-xs">
                  <div className="flex gap-3 items-center">
                    <div className="flex items-center justify-center rounded-lg bg-gray-50 h-12 w-12">
                      <User className="h-7 w-7 text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-semibold text-gray-900">{payer.name}</span>
                        <span className="ml-2 bg-gray-100 text-xs font-semibold text-gray-600 rounded px-2 py-0.5">{payer.type}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Mail className="h-4 w-4 text-gray-400" /><span className="text-sm text-gray-700">{payer.email}</span>
                        <Phone className="h-4 w-4 text-gray-400 ml-4" /><span className="text-sm text-gray-700">{payer.phone}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-3 mt-1">
                    <House className="h-5 w-5 text-gray-400" />
                    <div>
                      <div className="font-semibold text-gray-900">{selectedListing.name}</div>
                      <div className="text-sm text-gray-500">{selectedListing.city}, {selectedListing.country}</div>
                    </div>
                    <span className="ml-auto bg-gray-100 text-xs font-medium text-gray-600 rounded px-2 py-0.5 flex items-center gap-1"><ShoppingCart className="h-3 w-3" />{selectedListing.type}</span>
                  </div>
                </div>

                {/* Transaction Type & Category (horizontal layout for toggle) */}
                <div className="mb-4 flex items-center gap-4">
                  <span className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <ShoppingCart className="h-4 w-4 text-gray-500" />
                    Transaction Type
                  </span>
                  <div className="flex-1 flex justify-end">
                    <div className="flex bg-white border border-gray-200 rounded-full overflow-hidden shadow-sm">
                      <button
                        type="button"
                        className={`px-6 py-2 text-base font-semibold focus:outline-none transition 
                          ${transactionType === "revenue"
                            ? "bg-white text-gray-900 shadow-sm"
                            : "bg-transparent text-gray-500 hover:bg-gray-50"
                          }`}
                        style={{
                          borderRadius: "9999px 0 0 9999px",
                          borderRight: "1px solid #E5E7EB"
                        }}
                        onClick={() => setTransactionType("revenue")}
                      >
                        Revenue
                      </button>
                      <button
                        type="button"
                        className={`px-6 py-2 text-base font-semibold focus:outline-none transition
                          ${transactionType === "expense"
                            ? "bg-white text-gray-900 shadow-sm"
                            : "bg-transparent text-gray-500 hover:bg-gray-50"
                          }`}
                        style={{
                          borderRadius: "0 9999px 9999px 0"
                        }}
                        onClick={() => setTransactionType("expense")}
                      >
                        Expense
                      </button>
                    </div>
                  </div>
                </div>
                {/* Category Select */}
                <div className="mb-4">
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
                    <span className="text-sm font-semibold text-gray-700">Amount</span>
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
                    <span className="text-sm font-semibold text-gray-700">Date</span>
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
                    <span className="text-sm font-semibold text-gray-700">Payment Method</span>
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
              </>
            )}
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
            {selectedListing ? (
              <div>
                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <User className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-sm font-semibold text-gray-700">Payer Name</span>
                  </div>
                  <Input
                    type="text"
                    value={payer.name}
                    readOnly
                    className="border-gray-200 bg-gray-50 cursor-not-allowed text-gray-500"
                  />
                </div>
                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <Mail className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-sm font-semibold text-gray-700">Payer Email</span>
                  </div>
                  <Input
                    type="email"
                    value={payer.email}
                    readOnly
                    className="border-gray-200 bg-gray-50 cursor-not-allowed text-gray-500"
                  />
                </div>
                <div>
                  <div className="flex items-center mb-2">
                    <Phone className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-sm font-semibold text-gray-700">Payer Phone</span>
                  </div>
                  <Input
                    type="tel"
                    value={payer.phone}
                    readOnly
                    className="border-gray-200 bg-gray-50 cursor-not-allowed text-gray-500"
                  />
                </div>
              </div>
            ) : (
              <div className="text-gray-400 text-sm">Select a listing first...</div>
            )}
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
                <span className="text-sm font-semibold text-gray-700">Additional Notes</span>
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
