
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
  DollarSign, 
  FileText,
  ShoppingCart,
  Wallet,
  BriefcaseIcon,
  Calendar,
  Mail,
  Phone,
  User,
  Check,
  ChevronRight,
  Building
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
    <div className="p-6 h-full overflow-auto">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Transaction details</h2>
        <div className="flex items-center gap-2">
          <div className="flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-700">
            <DollarSign className="h-3.5 w-3.5 mr-1" />
            <span className="text-xs font-medium">Revenue</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 w-full p-1 rounded-md mb-6">
          <TabsTrigger value="details" className="text-xs">
            Transaction Details
          </TabsTrigger>
          <TabsTrigger value="payer" className="text-xs">
            Payer Details
          </TabsTrigger>
          <TabsTrigger value="additional" className="text-xs">
            Additional Info
          </TabsTrigger>
        </TabsList>

        {/* Transaction Details Tab */}
        <TabsContent value="details" className="space-y-4">
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <FileText className="h-4 w-4" />
              <h3>Listing</h3>
            </div>
            <Select>
              <SelectTrigger className="w-full border-gray-200">
                <SelectValue placeholder="Select a listing" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="listing1">Apartment Rental</SelectItem>
                <SelectItem value="listing2">Office Space</SelectItem>
                <SelectItem value="listing3">Commercial Property</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <ShoppingCart className="h-4 w-4" />
              <h3>Category</h3>
            </div>
            <Select>
              <SelectTrigger className="w-full border-gray-200">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
                <SelectItem value="investment">Investment</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <BriefcaseIcon className="h-4 w-4" />
              <h3>Relationship</h3>
            </div>
            <Select>
              <SelectTrigger className="w-full border-gray-200">
                <SelectValue placeholder="Select a relationship" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="client">Client</SelectItem>
                <SelectItem value="vendor">Vendor</SelectItem>
                <SelectItem value="partner">Partner</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Wallet className="h-4 w-4" />
              <h3>Amount</h3>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <Input type="number" placeholder="0.00" className="pl-7 border-gray-200" />
            </div>
          </div>
          
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Calendar className="h-4 w-4" />
              <h3>Date</h3>
            </div>
            <Input type="date" className="border-gray-200" />
          </div>
          
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <CreditCard className="h-4 w-4" />
              <h3>Payment Method</h3>
            </div>
            <Select>
              <SelectTrigger className="w-full border-gray-200">
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="card">Credit Card</SelectItem>
                <SelectItem value="bank">Bank Transfer</SelectItem>
                <SelectItem value="cash">Cash</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end mt-6">
            <Button 
              onClick={() => setActiveTab("payer")}
              className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white h-9 rounded-md"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </TabsContent>
        
        {/* Payer Details Tab */}
        <TabsContent value="payer" className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <User className="h-4 w-4" />
              <h3>Payer Details</h3>
            </div>
            
            <div className="flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-700">
              <User className="h-3.5 w-3.5 mr-1" />
              <span className="text-xs font-medium">Individual</span>
            </div>
          </div>
          
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <User className="h-4 w-4" />
              <h3>Name</h3>
            </div>
            <Input placeholder="Enter full name" className="border-gray-200" />
          </div>
          
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Mail className="h-4 w-4" />
              <h3>Email</h3>
            </div>
            <Input type="email" placeholder="Enter email address" className="border-gray-200" />
          </div>
          
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Phone className="h-4 w-4" />
              <h3>Phone</h3>
            </div>
            <Input type="tel" placeholder="Enter phone number" className="border-gray-200" />
          </div>

          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Building className="h-4 w-4" />
              <h3>Company</h3>
            </div>
            <Input placeholder="Enter company name (optional)" className="border-gray-200" />
          </div>
          
          <div className="flex justify-between mt-6">
            <Button 
              variant="outline"
              onClick={() => setActiveTab("details")}
              className="border-gray-200 hover:bg-gray-50 h-9 rounded-md"
            >
              Back
            </Button>
            
            <Button 
              onClick={() => setActiveTab("additional")}
              className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white h-9 rounded-md"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </TabsContent>
        
        {/* Additional Info Tab */}
        <TabsContent value="additional" className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <FileText className="h-4 w-4" />
              <h3>Additional Details</h3>
            </div>
            
            <Button variant="outline" className="h-8 text-xs gap-1 border-gray-200 hover:bg-gray-50">
              <Upload className="h-3.5 w-3.5" />
              Upload documents
            </Button>
          </div>
          
          <div>
            <Textarea 
              placeholder="Add notes or additional details about this transaction..."
              className="min-h-[120px] border-gray-200"
            />
          </div>
          
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Check className="h-4 w-4" />
              <h3>Create a rule for next time?</h3>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">
                {createRule ? 'Yes' : 'No'}
              </span>
              <Switch 
                id="create-rule" 
                checked={createRule} 
                onCheckedChange={setCreateRule}
              />
            </div>
          </div>
          
          {createRule && (
            <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm animate-fade-in">
              <p className="text-xs text-gray-500 font-medium mb-3">Auto-categorize similar transactions</p>
              <div className="space-y-3">
                <Select>
                  <SelectTrigger className="h-9 text-sm border-gray-200">
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
          
          <div className="flex justify-between mt-6">
            <Button 
              variant="outline"
              onClick={() => setActiveTab("payer")}
              className="border-gray-200 hover:bg-gray-50 h-9 rounded-md"
            >
              Back
            </Button>
            
            <Button 
              className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white h-9 rounded-md"
            >
              <Check className="h-4 w-4 mr-1" />
              Confirm Transaction
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
