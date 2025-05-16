
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { SheetClose } from "@/components/ui/sheet";
import { X, Check, ChevronRight, User, Mail, Phone, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";
import { TransactionFields } from "./TransactionFields";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// Should match the listings from TransactionForm for editing!
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
  // ... add more mock listings if needed
];

interface EditTransactionFormProps {
  transaction: any;
  onClose: () => void;
  onUpdate: (updatedTransaction: any) => void;
}

export function EditTransactionForm({ transaction, onClose, onUpdate }: EditTransactionFormProps) {
  // Prefill with transaction data, allow editing of all fields
  const [activeTab, setActiveTab] = useState("details");
  const [fields, setFields] = useState({
    selectedListingId: transaction.selectedListingId ?? "",
    transactionType: transaction.type ?? "revenue",
    category: transaction.category ?? "",
    amount: transaction.amount?.toString() ?? "",
    date: transaction.date ? new Date(transaction.date) : new Date(),
    payment: transaction.paymentMethod ?? "",
    notes: transaction.notes ?? "",
  });
  const { toast } = useToast();

  // Keep fields in sync with prop if transaction changes
  useEffect(() => {
    setFields({
      selectedListingId: transaction.selectedListingId ?? "",
      transactionType: transaction.type ?? "revenue",
      category: transaction.category ?? "",
      amount: transaction.amount?.toString() ?? "",
      date: transaction.date ? new Date(transaction.date) : new Date(),
      payment: transaction.paymentMethod ?? "",
      notes: transaction.notes ?? "",
    });
  }, [transaction]);

  function handleUpdate() {
    const updatedTransaction = {
      ...transaction,
      selectedListingId: fields.selectedListingId,
      type: fields.transactionType,
      category: fields.category,
      amount: parseFloat(fields.amount),
      date: fields.date,
      paymentMethod: fields.payment,
      notes: fields.notes,
    };
    toast({
      title: "Transaction Updated",
      description: "Your changes have been saved successfully.",
    });
    onUpdate(updatedTransaction);
  }

  // Selected listing and its tenant
  const selectedListing = mockListings.find(l => l.id === fields.selectedListingId);
  const payer = selectedListing?.tenant;

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header with close button */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800">Edit Transaction</h2>
        <SheetClose asChild>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </SheetClose>
      </div>
      
      {/* Content area with tabs */}
      <div className="flex-1 overflow-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-6 bg-gray-50 rounded-md overflow-hidden">
            <TabsTrigger 
              value="details" 
              className="py-2.5 text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-gray-900 rounded-none"
            >
              Transaction Details
            </TabsTrigger>
            <TabsTrigger 
              value="payer" 
              className="py-2.5 text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-gray-900 rounded-none"
            >
              Payer Details
            </TabsTrigger>
            <TabsTrigger 
              value="additional" 
              className="py-2.5 text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-gray-900 rounded-none"
            >
              Additional Info
            </TabsTrigger>
          </TabsList>

          {/* Tab 1: Details */}
          <TabsContent value="details">
            <TransactionFields
              mockListings={mockListings}
              initialValues={fields}
              onChange={setFields}
              editMode={true}
            />
            <div className="flex justify-end mt-6">
              <Button
                disabled={!fields.selectedListingId}
                onClick={() => setActiveTab("payer")}
                className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </TabsContent>

          {/* Tab 2: Payer */}
          <TabsContent value="payer">
            <Card className="border border-gray-200 shadow-sm rounded-lg p-6 mb-6 bg-white/50 hover:bg-white/80 transition-colors">
              {selectedListing ? (
                <div className="space-y-5">
                  <div>
                    <div className="flex items-center mb-2 gap-2">
                      <User className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">Payer Name</span>
                    </div>
                    <Input
                      type="text"
                      value={payer.name}
                      readOnly
                      className="border-gray-200 bg-gray-50/50 cursor-not-allowed text-gray-600"
                    />
                  </div>
                  <div>
                    <div className="flex items-center mb-2 gap-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">Payer Email</span>
                    </div>
                    <Input
                      type="email"
                      value={payer.email}
                      readOnly
                      className="border-gray-200 bg-gray-50/50 cursor-not-allowed text-gray-600"
                    />
                  </div>
                  <div>
                    <div className="flex items-center mb-2 gap-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">Payer Phone</span>
                    </div>
                    <Input
                      type="tel"
                      value={payer.phone}
                      readOnly
                      className="border-gray-200 bg-gray-50/50 cursor-not-allowed text-gray-600"
                    />
                  </div>
                </div>
              ) : (
                <div className="text-gray-400 text-sm py-8 text-center">
                  <div className="flex flex-col items-center">
                    <User className="h-12 w-12 text-gray-300 mb-3" />
                    <p>Select a listing first to view payer details</p>
                  </div>
                </div>
              )}
            </Card>
            <div className="flex justify-between mt-6">
              <Button
                variant="outline"
                onClick={() => setActiveTab("details")}
                className="border-gray-200 hover:bg-gray-50"
              >
                Back
              </Button>
              <Button
                onClick={() => setActiveTab("additional")}
                className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </TabsContent>

          {/* Tab 3: Additional */}
          <TabsContent value="additional">
            <Card className="border border-gray-200 shadow-sm rounded-lg p-6 mb-6 bg-white/50 hover:bg-white/80 transition-colors">
              <div>
                <div className="flex items-center mb-3 gap-2">
                  <FileText className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Additional Notes</span>
                </div>
                <Textarea
                  placeholder="Add additional details or notes"
                  value={fields.notes}
                  onChange={(e) => setFields(f => ({ ...f, notes: e.target.value }))}
                  className="border-gray-200 min-h-[140px] resize-none"
                />
              </div>
            </Card>
            <div className="flex justify-between mt-6">
              <Button
                variant="outline"
                onClick={() => setActiveTab("payer")}
                className="border-gray-200 hover:bg-gray-50"
              >
                Back
              </Button>
              <Button
                onClick={handleUpdate}
                className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white"
              >
                <Check className="h-4 w-4" />
                Save changes
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
