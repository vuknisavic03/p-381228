
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import {
  ChevronRight,
  Check,
  User,
  Mail,
  Phone,
  FileText,
  X
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { TransactionFields } from "./TransactionFields";
import { Listing, TransactionFieldsData } from "./TransactionFormTypes";
import { Separator } from "@/components/ui/separator";
import { SheetClose } from "@/components/ui/sheet";

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
  const [activeTab, setActiveTab] = useState("details");
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

  // Selected listing, tenant info
  const selectedListing = mockListings.find(l => l.id === fields.selectedListingId);
  const payer = selectedListing?.tenant;

  function handleConfirm() {
    toast({
      title: "Transaction created",
      description: "Your transaction has been created successfully.",
    });
    if (onClose) onClose();
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header with close button */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800">Add Transaction</h2>
        <SheetClose asChild>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </SheetClose>
      </div>
      
      {/* Content area with tabs */}
      <div className="flex-1 overflow-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-6 bg-gray-50 p-1 rounded-md">
            <TabsTrigger 
              value="details" 
              className="text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-gray-900 rounded-md"
            >
              Transaction Details
            </TabsTrigger>
            <TabsTrigger 
              value="payer" 
              className="text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-gray-900 rounded-md"
            >
              Payer Details
            </TabsTrigger>
            <TabsTrigger 
              value="additional" 
              className="text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-gray-900 rounded-md"
            >
              Additional Info
            </TabsTrigger>
          </TabsList>

          {/* Details Tab: uses shared fields */}
          <TabsContent value="details">
            <TransactionFields
              mockListings={mockListings}
              initialValues={fields}
              onChange={setFields}
            />
            <div className="flex justify-end">
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

          {/* Payer Tab */}
          <TabsContent value="payer">
            <Card className="border border-gray-100 shadow-sm rounded-lg p-5 mb-6">
              {selectedListing ? (
                <div className="space-y-4">
                  <div>
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
                  <div>
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
                <div className="text-gray-400 text-sm py-4 text-center">Select a listing first to view payer details</div>
              )}
            </Card>
            <div className="flex justify-between">
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

          {/* Additional Info Tab */}
          <TabsContent value="additional">
            <Card className="border border-gray-100 shadow-sm rounded-lg p-5 mb-6">
              <div>
                <div className="flex items-center mb-2">
                  <FileText className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="text-sm font-semibold text-gray-700">Additional Notes</span>
                </div>
                <Textarea
                  placeholder="Add additional details or notes about this transaction"
                  value={fields.notes}
                  onChange={(e) => setFields(f => ({ ...f, notes: e.target.value }))}
                  className="border-gray-200 min-h-[120px] resize-none"
                />
              </div>
            </Card>
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setActiveTab("payer")}
                className="border-gray-200 hover:bg-gray-50"
              >
                Back
              </Button>
              <Button
                onClick={handleConfirm}
                className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white"
              >
                <Check className="h-4 w-4" />
                Confirm
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
