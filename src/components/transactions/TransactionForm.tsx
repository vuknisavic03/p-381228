
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { 
  CreditCard, 
  Search,
  Upload, 
  Euro, 
  FileText,
  ShoppingCart,
  Wallet,
  BriefcaseIcon,
  Calendar,
  Mail,
  Phone,
  User,
  Check,
  ChevronRight
} from "lucide-react";

export function TransactionForm() {
  const [activeTab, setActiveTab] = useState("details");
  const [createRule, setCreateRule] = useState(false);
  
  const form = useForm({
    defaultValues: {
      listing: "",
      category: "",
      relationship: "",
      name: "",
      email: "",
      phone: "",
      amount: "",
      date: "",
      payment: ""
    }
  });

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-8">
      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-md border border-[#E7E8EC] p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#F5EFFE] text-[#8B5CF6]">
              <Search className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold text-[#1A1F2C]">Categorize Transaction</h1>
              <p className="text-[#8E9196] mt-1">Assign this transaction to the right category</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center px-4 py-2.5 rounded-full bg-[#F5EFFE] text-[#8B5CF6]">
              <Euro className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">Revenue</span>
            </div>
            
            <Button className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-medium px-6 py-2.5 h-auto rounded-lg">
              <Check className="h-5 w-5 mr-2" />
              Confirm
            </Button>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 w-full p-1 rounded-xl mb-8 shadow-sm">
          <TabsTrigger value="details" className="rounded-lg py-3">
            Transaction Details
          </TabsTrigger>
          <TabsTrigger value="payer" className="rounded-lg py-3">
            Payer Details
          </TabsTrigger>
          <TabsTrigger value="additional" className="rounded-lg py-3">
            Additional Info
          </TabsTrigger>
        </TabsList>

        {/* Transaction Details Tab */}
        <TabsContent value="details">
          <Card className="bg-white border border-[#E7E8EC] rounded-xl p-6 md:p-7 shadow-md">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-3 w-3 rounded-full bg-[#8B5CF6]"></div>
              <h2 className="text-xl font-semibold text-[#1A1F2C]">Transaction Details</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {/* Listing Selection */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[#1A1F2C] mb-2">
                  <FileText className="h-4 w-4" />
                  <h3 className="text-base font-medium">Listing</h3>
                </div>
                <Select>
                  <SelectTrigger className="w-full h-14 text-base">
                    <SelectValue placeholder="Select a listing" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="listing1">Apartment Rental</SelectItem>
                    <SelectItem value="listing2">Office Space</SelectItem>
                    <SelectItem value="listing3">Commercial Property</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Category Selection */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[#1A1F2C] mb-2">
                  <ShoppingCart className="h-4 w-4" />
                  <h3 className="text-base font-medium">Category</h3>
                </div>
                <Select>
                  <SelectTrigger className="w-full h-14 text-base">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="income">Income</SelectItem>
                    <SelectItem value="expense">Expense</SelectItem>
                    <SelectItem value="investment">Investment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Relationship Selection */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[#1A1F2C] mb-2">
                  <BriefcaseIcon className="h-4 w-4" />
                  <h3 className="text-base font-medium">Relationship</h3>
                </div>
                <Select>
                  <SelectTrigger className="w-full h-14 text-base">
                    <SelectValue placeholder="Select a relationship" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="client">Client</SelectItem>
                    <SelectItem value="vendor">Vendor</SelectItem>
                    <SelectItem value="partner">Partner</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Amount Input */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[#1A1F2C] mb-2">
                  <Wallet className="h-4 w-4" />
                  <h3 className="text-base font-medium">Amount</h3>
                </div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1A1F2C]">$</span>
                  <Input type="number" placeholder="0.00" className="pl-8 h-14" />
                </div>
              </div>
              
              {/* Date Selection */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[#1A1F2C] mb-2">
                  <Calendar className="h-4 w-4" />
                  <h3 className="text-base font-medium">Date</h3>
                </div>
                <Input type="date" className="h-14" />
              </div>
              
              {/* Payment Method */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[#1A1F2C] mb-2">
                  <CreditCard className="h-4 w-4" />
                  <h3 className="text-base font-medium">Payment Method</h3>
                </div>
                <Select>
                  <SelectTrigger className="w-full h-14 text-base">
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="card">Credit Card</SelectItem>
                    <SelectItem value="bank">Bank Transfer</SelectItem>
                    <SelectItem value="cash">Cash</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <Button 
                onClick={() => setActiveTab("payer")}
                className="flex items-center gap-2 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white px-6 py-2.5 h-auto rounded-lg"
              >
                Next
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </Card>
        </TabsContent>
        
        {/* Payer Details Tab */}
        <TabsContent value="payer">
          <Card className="bg-white border border-[#E7E8EC] rounded-xl p-6 md:p-7 shadow-md">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-[#8B5CF6]"></div>
                <h2 className="text-xl font-semibold text-[#1A1F2C]">Payer Details</h2>
              </div>
              
              <div className="flex items-center px-4 py-2 rounded-full bg-[#F5EFFE] text-[#8B5CF6]">
                <User className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">Individual</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {/* Name Input */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[#1A1F2C] mb-2">
                  <User className="h-4 w-4" />
                  <h3 className="text-base font-medium">Name</h3>
                </div>
                <Input placeholder="Enter full name" className="h-14" />
              </div>
              
              {/* Email Input */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[#1A1F2C] mb-2">
                  <Mail className="h-4 w-4" />
                  <h3 className="text-base font-medium">Email</h3>
                </div>
                <Input type="email" placeholder="Enter email address" className="h-14" />
              </div>
              
              {/* Phone Input */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[#1A1F2C] mb-2">
                  <Phone className="h-4 w-4" />
                  <h3 className="text-base font-medium">Phone</h3>
                </div>
                <Input type="tel" placeholder="Enter phone number" className="h-14" />
              </div>
            </div>
            
            <div className="flex justify-between mt-8">
              <Button 
                variant="outline"
                onClick={() => setActiveTab("details")}
                className="flex items-center gap-2 border-[#E7E8EC] hover:border-[#D6BCFA] hover:bg-[#F5EFFE] px-6 py-2.5 h-auto rounded-lg"
              >
                Back
              </Button>
              
              <Button 
                onClick={() => setActiveTab("additional")}
                className="flex items-center gap-2 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white px-6 py-2.5 h-auto rounded-lg"
              >
                Next
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </Card>
        </TabsContent>
        
        {/* Additional Info Tab */}
        <TabsContent value="additional">
          <Card className="bg-white border border-[#E7E8EC] rounded-xl p-6 md:p-7 shadow-md">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-[#8B5CF6]"></div>
                <h2 className="text-xl font-semibold text-[#1A1F2C]">Additional Details</h2>
              </div>
              
              <Button variant="outline" className="gap-2 h-10 border-[#D6BCFA] text-[#8B5CF6] hover:bg-[#F5EFFE]">
                <Upload className="h-4 w-4" />
                Upload documents
              </Button>
            </div>
            
            <div className="space-y-4">
              <Textarea 
                placeholder="Add notes or additional details about this transaction..."
                className="min-h-[180px] text-base"
              />
            </div>
            
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#E7E8EC]">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-[#8B5CF6]"></div>
                <h3 className="text-lg font-semibold text-[#1A1F2C]">Create a rule for next time?</h3>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-[#8E9196]">
                  {createRule ? 'Yes' : 'No'}
                </span>
                <Switch 
                  id="create-rule" 
                  checked={createRule} 
                  onCheckedChange={setCreateRule}
                  className="data-[state=checked]:bg-[#8B5CF6]" 
                />
              </div>
            </div>
            
            {createRule && (
              <div className="mt-6 p-6 bg-[#F8FAFF] border border-[#E7E8EC] rounded-xl shadow-sm animate-fade-in">
                <p className="text-sm text-[#8E9196] font-medium mb-4">Auto-categorize similar transactions</p>
                <div className="space-y-4">
                  <Select>
                    <SelectTrigger className="h-14 text-base">
                      <SelectValue placeholder="Select an action" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="categorize">Auto-categorize</SelectItem>
                      <SelectItem value="assign">Assign to listing</SelectItem>
                      <SelectItem value="notify">Send notification</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            
            <div className="flex justify-between mt-8">
              <Button 
                variant="outline"
                onClick={() => setActiveTab("payer")}
                className="flex items-center gap-2 border-[#E7E8EC] hover:border-[#D6BCFA] hover:bg-[#F5EFFE] px-6 py-2.5 h-auto rounded-lg"
              >
                Back
              </Button>
              
              <Button 
                className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white px-6 py-2.5 h-auto rounded-lg"
              >
                <Check className="h-5 w-5 mr-2" />
                Confirm Transaction
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
