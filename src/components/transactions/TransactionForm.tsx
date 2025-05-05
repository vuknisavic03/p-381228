
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
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
  ChevronDown,
  Calendar,
  Mail,
  Phone,
  User,
  Check 
} from "lucide-react";

export function TransactionForm() {
  const [activeTab, setActiveTab] = useState("details");
  const [expanded, setExpanded] = useState(true);
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
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      <div className="flex flex-col space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#EBF5FF] text-[#006FB5]">
              <Search className="h-5 w-5" />
            </div>
            <h1 className="text-xl md:text-2xl font-medium text-gray-900">Where to move this transaction?</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center border border-[#E7E8EC] rounded-md px-3 py-2 bg-white shadow-sm">
              <Euro className="h-4 w-4 mr-2 text-gray-700" />
              <span className="text-sm font-medium">Revenue</span>
            </div>
            
            <Button className="bg-[#006FB5] hover:bg-[#005A92] text-white font-medium px-5">
              <Check className="h-4 w-4 mr-2" />
              Confirm
            </Button>
          </div>
        </div>

        {/* Main Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 w-full max-w-md bg-[#F6F7F9] p-1 rounded-lg">
            <TabsTrigger 
              value="details" 
              className="data-[state=active]:bg-white data-[state=active]:text-[#006FB5] data-[state=active]:shadow-sm rounded-md py-2"
            >
              Transaction Details
            </TabsTrigger>
            <TabsTrigger 
              value="payer" 
              className="data-[state=active]:bg-white data-[state=active]:text-[#006FB5] data-[state=active]:shadow-sm rounded-md py-2"
            >
              Payer Details
            </TabsTrigger>
            <TabsTrigger 
              value="additional" 
              className="data-[state=active]:bg-white data-[state=active]:text-[#006FB5] data-[state=active]:shadow-sm rounded-md py-2"
            >
              Additional Info
            </TabsTrigger>
          </TabsList>

          {/* Transaction Details Tab */}
          <TabsContent value="details" className="mt-6 space-y-6 animate-fade-in">
            <Card className="bg-white border border-[#E7E8EC] rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-1 w-1 rounded-full bg-[#006FB5]"></div>
                <h2 className="text-lg font-medium">Transaction Details</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Listing Selection */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-gray-700">
                    <FileText className="h-4 w-4" />
                    <h3 className="text-sm font-medium">Listing</h3>
                  </div>
                  <Select>
                    <SelectTrigger className="w-full">
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
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-gray-700">
                    <ShoppingCart className="h-4 w-4" />
                    <h3 className="text-sm font-medium">Category</h3>
                  </div>
                  <Select>
                    <SelectTrigger className="w-full">
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
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-gray-700">
                    <BriefcaseIcon className="h-4 w-4" />
                    <h3 className="text-sm font-medium">Relationship</h3>
                  </div>
                  <Select>
                    <SelectTrigger className="w-full">
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
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Wallet className="h-4 w-4" />
                    <h3 className="text-sm font-medium">Amount</h3>
                  </div>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <Input type="number" placeholder="0.00" className="pl-8" />
                  </div>
                </div>
                
                {/* Date Selection */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Calendar className="h-4 w-4" />
                    <h3 className="text-sm font-medium">Date</h3>
                  </div>
                  <Input type="date" />
                </div>
                
                {/* Payment Method */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-gray-700">
                    <CreditCard className="h-4 w-4" />
                    <h3 className="text-sm font-medium">Payment Method</h3>
                  </div>
                  <Select>
                    <SelectTrigger className="w-full">
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
            </Card>
          </TabsContent>
          
          {/* Payer Details Tab */}
          <TabsContent value="payer" className="mt-6 space-y-6 animate-fade-in">
            <Card className="bg-white border border-[#E7E8EC] rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="h-1 w-1 rounded-full bg-[#006FB5]"></div>
                  <h2 className="text-lg font-medium">Payer Details</h2>
                </div>
                
                <div className="flex items-center border border-[#E7E8EC] rounded-md px-3 py-2 bg-white shadow-sm">
                  <Euro className="h-4 w-4 mr-2 text-gray-700" />
                  <span className="text-sm font-medium">Individual</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Input */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-gray-700">
                    <User className="h-4 w-4" />
                    <h3 className="text-sm font-medium">Name</h3>
                  </div>
                  <Input placeholder="Enter full name" />
                </div>
                
                {/* Email Input */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Mail className="h-4 w-4" />
                    <h3 className="text-sm font-medium">Email</h3>
                  </div>
                  <Input type="email" placeholder="Enter email address" />
                </div>
                
                {/* Phone Input */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Phone className="h-4 w-4" />
                    <h3 className="text-sm font-medium">Phone</h3>
                  </div>
                  <Input type="tel" placeholder="Enter phone number" />
                </div>
              </div>
            </Card>
          </TabsContent>
          
          {/* Additional Info Tab */}
          <TabsContent value="additional" className="mt-6 space-y-6 animate-fade-in">
            <Card className="bg-white border border-[#E7E8EC] rounded-lg p-6 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">
                <div className="flex items-center gap-3">
                  <div className="h-1 w-1 rounded-full bg-[#006FB5]"></div>
                  <h2 className="text-lg font-medium">Additional Details</h2>
                </div>
                
                <Button variant="outline" size="sm" className="gap-2">
                  <Upload className="h-4 w-4" />
                  Upload documents
                </Button>
              </div>
              
              <div className="space-y-4">
                <Textarea 
                  placeholder="Add notes or additional details about this transaction..."
                  className="min-h-[120px]"
                />
              </div>
              
              <div className="flex items-center justify-between mt-6 pt-6 border-t border-[#E7E8EC]">
                <div className="flex items-center gap-3">
                  <div className="h-1 w-1 rounded-full bg-[#006FB5]"></div>
                  <h3 className="text-base font-medium">Create a rule for next time?</h3>
                </div>
                
                <div className="flex items-center gap-2">
                  <Switch 
                    id="create-rule" 
                    checked={createRule} 
                    onCheckedChange={setCreateRule} 
                  />
                  <span className="text-sm font-medium">
                    {createRule ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>
              
              {createRule && (
                <div className="mt-4 p-4 bg-[#FAFAFC] border border-[#E7E8EC] rounded-lg">
                  <p className="text-sm text-[#9EA3AD] font-medium">Action</p>
                  <div className="mt-3">
                    <Select>
                      <SelectTrigger>
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
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
