
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { 
  CreditCard, 
  Search, 
  Upload, 
  Euro, 
  FileText,
  ShoppingCart,
  Wallet,
  BriefcaseIcon
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { useIsMobile } from '@/hooks/use-mobile';

export function TransactionForm() {
  const isMobile = useIsMobile();
  const [activeSection, setActiveSection] = useState("listing");
  
  return (
    <div className="p-4 md:p-7 max-w-4xl mx-auto">
      <Card className="bg-white border border-[#E7E8EC] rounded-lg p-4 md:p-7 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6 gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-7 h-7 border border-[#E4E5EA] rounded bg-white">
              <Search className="h-4 w-4 text-gray-700" />
            </div>
            <h2 className="text-lg md:text-xl font-medium">Where to move this transaction?</h2>
          </div>
          
          <div className="flex gap-3 md:gap-6">
            <div className="flex items-center border border-[#E7E8EC] rounded-md px-2.5 py-2">
              <Euro className="h-3.5 w-3.5 mr-2.5 text-gray-700" />
              <span className="text-sm font-medium">Revenue</span>
            </div>
            
            <Button className="bg-[#E7E8EB] hover:bg-gray-300 text-black text-sm font-medium rounded-md">
              Confirm
            </Button>
          </div>
        </div>
        
        <div className="ml-0 md:ml-11 space-y-8">
          {/* Listing, Category, Relationship Section */}
          <div className="bg-white rounded-lg">
            <Tabs defaultValue="listing" className="w-full" value={activeSection} onValueChange={setActiveSection}>
              <TabsList className="flex mb-4 bg-transparent border-b border-[#E7E8EC] w-full p-0 h-auto gap-4 justify-start overflow-x-auto">
                <TabsTrigger 
                  value="listing" 
                  className="py-2 px-2 border-b-2 border-transparent data-[state=active]:border-[#006FB5] data-[state=active]:bg-transparent rounded-none text-gray-500 data-[state=active]:text-gray-900 data-[state=active]:shadow-none whitespace-nowrap"
                >
                  <FileText className="h-4 w-4 mr-2 text-gray-700" />
                  Listing
                </TabsTrigger>
                <TabsTrigger 
                  value="category" 
                  className="py-2 px-2 border-b-2 border-transparent data-[state=active]:border-[#006FB5] data-[state=active]:bg-transparent rounded-none text-gray-500 data-[state=active]:text-gray-900 data-[state=active]:shadow-none whitespace-nowrap"
                >
                  <ShoppingCart className="h-4 w-4 mr-2 text-gray-700" />
                  Category
                </TabsTrigger>
                <TabsTrigger 
                  value="relationship" 
                  className="py-2 px-2 border-b-2 border-transparent data-[state=active]:border-[#006FB5] data-[state=active]:bg-transparent rounded-none text-gray-500 data-[state=active]:text-gray-900 data-[state=active]:shadow-none whitespace-nowrap"
                >
                  <BriefcaseIcon className="h-4 w-4 mr-2 text-gray-700" />
                  Relationship
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="listing" className="pt-4 animate-fade-in">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm text-[#9EA3AD]">Select Listing</label>
                    <Select>
                      <SelectTrigger className="border-[#E7E8EC] focus:border-[#E7E8EC]">
                        <SelectValue placeholder="Select a listing" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="listing1">Listing 1</SelectItem>
                        <SelectItem value="listing2">Listing 2</SelectItem>
                        <SelectItem value="listing3">Listing 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="category" className="pt-4 animate-fade-in">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm text-[#9EA3AD]">Select Category</label>
                    <Select>
                      <SelectTrigger className="border-[#E7E8EC] focus:border-[#E7E8EC]">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="income">Income</SelectItem>
                        <SelectItem value="expense">Expense</SelectItem>
                        <SelectItem value="investment">Investment</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="relationship" className="pt-4 animate-fade-in">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm text-[#9EA3AD]">Select Relationship</label>
                    <Select>
                      <SelectTrigger className="border-[#E7E8EC] focus:border-[#E7E8EC]">
                        <SelectValue placeholder="Select a relationship" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="client">Client</SelectItem>
                        <SelectItem value="vendor">Vendor</SelectItem>
                        <SelectItem value="partner">Partner</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Payer Details Section */}
          <div className="pt-4">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#006FB5]"></div>
                <span className="text-base font-medium">Confirm these payer details</span>
              </div>
              
              <div className="flex items-center border border-[#E7E8EC] rounded-md px-2.5 py-2">
                <Euro className="h-3.5 w-3.5 mr-2 text-gray-700" />
                <span className="text-sm font-medium">Individual</span>
              </div>
            </div>
            
            <Tabs defaultValue="name" className="w-full">
              <TabsList className="flex mb-4 bg-transparent border-b border-[#E7E8EC] w-full p-0 h-auto gap-4 justify-start overflow-x-auto">
                <TabsTrigger 
                  value="name" 
                  className="py-2 px-2 border-b-2 border-transparent data-[state=active]:border-[#006FB5] data-[state=active]:bg-transparent rounded-none text-gray-500 data-[state=active]:text-gray-900 data-[state=active]:shadow-none whitespace-nowrap"
                >
                  Name
                </TabsTrigger>
                <TabsTrigger 
                  value="phone" 
                  className="py-2 px-2 border-b-2 border-transparent data-[state=active]:border-[#006FB5] data-[state=active]:bg-transparent rounded-none text-gray-500 data-[state=active]:text-gray-900 data-[state=active]:shadow-none whitespace-nowrap"
                >
                  Phone
                </TabsTrigger>
                <TabsTrigger 
                  value="email" 
                  className="py-2 px-2 border-b-2 border-transparent data-[state=active]:border-[#006FB5] data-[state=active]:bg-transparent rounded-none text-gray-500 data-[state=active]:text-gray-900 data-[state=active]:shadow-none whitespace-nowrap"
                >
                  Email
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="name" className="pt-4 animate-fade-in">
                <div className="space-y-4">
                  <Input placeholder="Enter name" className="border-[#E7E8EC] focus:border-[#E7E8EC]" />
                </div>
              </TabsContent>
              
              <TabsContent value="phone" className="pt-4 animate-fade-in">
                <div className="space-y-4">
                  <Input placeholder="Enter phone number" className="border-[#E7E8EC] focus:border-[#E7E8EC]" />
                </div>
              </TabsContent>
              
              <TabsContent value="email" className="pt-4 animate-fade-in">
                <div className="space-y-4">
                  <Input placeholder="Enter email address" className="border-[#E7E8EC] focus:border-[#E7E8EC]" />
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Transaction Details Section */}
          <div className="pt-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-[#006FB5]"></div>
              <span className="text-base font-medium">Confirm these transaction details</span>
            </div>
            
            <Tabs defaultValue="amount" className="w-full">
              <TabsList className="flex mb-4 bg-transparent border-b border-[#E7E8EC] w-full p-0 h-auto gap-4 justify-start overflow-x-auto">
                <TabsTrigger 
                  value="amount" 
                  className="py-2 px-2 border-b-2 border-transparent data-[state=active]:border-[#006FB5] data-[state=active]:bg-transparent rounded-none text-gray-500 data-[state=active]:text-gray-900 data-[state=active]:shadow-none whitespace-nowrap"
                >
                  <Wallet className="h-4 w-4 mr-2 text-gray-700" />
                  Amount
                </TabsTrigger>
                <TabsTrigger 
                  value="date" 
                  className="py-2 px-2 border-b-2 border-transparent data-[state=active]:border-[#006FB5] data-[state=active]:bg-transparent rounded-none text-gray-500 data-[state=active]:text-gray-900 data-[state=active]:shadow-none whitespace-nowrap"
                >
                  Date
                </TabsTrigger>
                <TabsTrigger 
                  value="payment" 
                  className="py-2 px-2 border-b-2 border-transparent data-[state=active]:border-[#006FB5] data-[state=active]:bg-transparent rounded-none text-gray-500 data-[state=active]:text-gray-900 data-[state=active]:shadow-none whitespace-nowrap"
                >
                  <CreditCard className="h-4 w-4 mr-2 text-gray-700" />
                  Payment
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="amount" className="pt-4 animate-fade-in">
                <div className="space-y-4">
                  <Input placeholder="Enter amount" type="number" className="border-[#E7E8EC] focus:border-[#E7E8EC]" />
                </div>
              </TabsContent>
              
              <TabsContent value="date" className="pt-4 animate-fade-in">
                <div className="space-y-4">
                  <Input placeholder="Select date" type="date" className="border-[#E7E8EC] focus:border-[#E7E8EC]" />
                </div>
              </TabsContent>
              
              <TabsContent value="payment" className="pt-4 animate-fade-in">
                <div className="space-y-4">
                  <Select>
                    <SelectTrigger className="border-[#E7E8EC] focus:border-[#E7E8EC]">
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="card">Credit Card</SelectItem>
                      <SelectItem value="bank">Bank Transfer</SelectItem>
                      <SelectItem value="cash">Cash</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Additional Details Section */}
          <div className="pt-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-5 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#006FB5]"></div>
                <span className="text-base font-medium">Add some additional details</span>
              </div>
              
              <Button 
                variant="outline"
                className="border-[#E7E8EC] hover:bg-gray-50 text-sm font-medium py-2"
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload documents
              </Button>
            </div>
            
            <div className="border border-[#E7E8EC] rounded-lg p-4 mb-5">
              <Textarea 
                placeholder="Type here..." 
                className="border-0 focus-visible:ring-0 p-0 placeholder:text-[#9EA3AD]"
                rows={3}
              />
            </div>
          </div>
          
          {/* Rule Creation Section */}
          <div className="pt-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-5 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#006FB5]"></div>
                <span className="text-base font-medium">Create a rule for next time?</span>
              </div>
              
              <div className="flex items-center gap-3.5">
                <Switch id="rule-switch" />
                <span className="text-base font-medium">No</span>
              </div>
            </div>
            
            <div className="border border-[#E7E8EC] bg-[#FAFAFC] rounded-lg p-4 mt-6">
              <div className="text-[#9EA3AD] text-sm font-medium">Action</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
