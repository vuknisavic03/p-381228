
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { 
  CreditCard, 
  Search,
  Upload, 
  DollarSign, 
  FileText,
  ShoppingCart,
  Wallet,
  BriefcaseIcon,
  Calendar as CalendarIcon,
  Mail,
  Phone,
  User,
  Check,
  ChevronRight,
  Building
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export function TransactionForm() {
  const [activeTab, setActiveTab] = useState("details");
  const [createRule, setCreateRule] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { toast } = useToast();
  
  const form = useForm({
    defaultValues: {
      listing: "",
      category: "",
      relationship: "",
      name: "",
      email: "",
      phone: "",
      amount: "",
      date: new Date(),
      payment: ""
    }
  });

  const handleConfirm = () => {
    toast({
      title: "Transaction created",
      description: "Your transaction has been created successfully.",
      duration: 5000,
    });
  };

  return (
    <div className="p-6 h-full overflow-auto">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800">Transaction details</h2>
        <div className="flex items-center gap-2">
          <div className="flex items-center px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 font-medium">
            <DollarSign className="h-3.5 w-3.5 mr-1.5" />
            <span className="text-xs">Revenue</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 w-full p-1 rounded-lg mb-8 bg-gray-50">
          <TabsTrigger 
            value="details" 
            className="rounded-md text-xs py-2.5 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm data-[state=active]:font-medium"
          >
            Transaction Details
          </TabsTrigger>
          <TabsTrigger 
            value="payer" 
            className="rounded-md text-xs py-2.5 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm data-[state=active]:font-medium"
          >
            Payer Details
          </TabsTrigger>
          <TabsTrigger 
            value="additional" 
            className="rounded-md text-xs py-2.5 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm data-[state=active]:font-medium"
          >
            Additional Info
          </TabsTrigger>
        </TabsList>

        {/* Transaction Details Tab */}
        <TabsContent value="details" className="space-y-6 animate-fade-in">
          <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden">
            <div className="p-5 space-y-6">
              <div>
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2.5">
                  <FileText className="h-4 w-4 text-gray-500" />
                  <h3>Listing</h3>
                </div>
                <Select>
                  <SelectTrigger className="w-full border-gray-200 bg-white hover:border-gray-300 transition-colors">
                    <SelectValue placeholder="Select a listing" />
                  </SelectTrigger>
                  <SelectContent className="max-h-72">
                    <SelectItem value="listing1">Apartment Rental</SelectItem>
                    <SelectItem value="listing2">Office Space</SelectItem>
                    <SelectItem value="listing3">Commercial Property</SelectItem>
                    <SelectItem value="listing4">Retail Space</SelectItem>
                    <SelectItem value="listing5">Industrial Unit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2.5">
                  <ShoppingCart className="h-4 w-4 text-gray-500" />
                  <h3>Category</h3>
                </div>
                <Select>
                  <SelectTrigger className="w-full border-gray-200 bg-white hover:border-gray-300 transition-colors">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="income">Income</SelectItem>
                    <SelectItem value="expense">Expense</SelectItem>
                    <SelectItem value="investment">Investment</SelectItem>
                    <SelectItem value="tax">Tax</SelectItem>
                    <SelectItem value="insurance">Insurance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2.5">
                  <BriefcaseIcon className="h-4 w-4 text-gray-500" />
                  <h3>Relationship</h3>
                </div>
                <Select>
                  <SelectTrigger className="w-full border-gray-200 bg-white hover:border-gray-300 transition-colors">
                    <SelectValue placeholder="Select a relationship" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="client">Client</SelectItem>
                    <SelectItem value="vendor">Vendor</SelectItem>
                    <SelectItem value="partner">Partner</SelectItem>
                    <SelectItem value="tenant">Tenant</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2.5">
                  <Wallet className="h-4 w-4 text-gray-500" />
                  <h3>Amount</h3>
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
                  <Input 
                    type="number" 
                    placeholder="0.00" 
                    className="pl-7 border-gray-200 bg-white hover:border-gray-300 transition-colors" 
                  />
                </div>
              </div>
              
              <div>
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2.5">
                  <CalendarIcon className="h-4 w-4 text-gray-500" />
                  <h3>Date</h3>
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left border-gray-200 bg-white hover:bg-gray-50 transition-colors",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Select date</span>}
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
              
              <div>
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2.5">
                  <CreditCard className="h-4 w-4 text-gray-500" />
                  <h3>Payment Method</h3>
                </div>
                <Select>
                  <SelectTrigger className="w-full border-gray-200 bg-white hover:border-gray-300 transition-colors">
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
            </div>
          </Card>

          <div className="flex justify-end mt-6">
            <Button 
              onClick={() => setActiveTab("payer")}
              className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white h-10 px-5 rounded-md transition-all duration-200"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </TabsContent>
        
        {/* Payer Details Tab */}
        <TabsContent value="payer" className="space-y-6 animate-fade-in">
          <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden">
            <div className="p-5 space-y-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <User className="h-4 w-4 text-gray-500" />
                  <h3>Payer Details</h3>
                </div>
                
                <div className="flex items-center px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 font-medium">
                  <User className="h-3.5 w-3.5 mr-1.5" />
                  <span className="text-xs">Individual</span>
                </div>
              </div>
              
              <div>
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2.5">
                  <User className="h-4 w-4 text-gray-500" />
                  <h3>Name</h3>
                </div>
                <Input 
                  placeholder="Enter full name" 
                  className="border-gray-200 bg-white hover:border-gray-300 transition-colors" 
                />
              </div>
              
              <div>
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2.5">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <h3>Email</h3>
                </div>
                <Input 
                  type="email" 
                  placeholder="Enter email address" 
                  className="border-gray-200 bg-white hover:border-gray-300 transition-colors" 
                />
              </div>
              
              <div>
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2.5">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <h3>Phone</h3>
                </div>
                <Input 
                  type="tel" 
                  placeholder="Enter phone number" 
                  className="border-gray-200 bg-white hover:border-gray-300 transition-colors" 
                />
              </div>

              <div>
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2.5">
                  <Building className="h-4 w-4 text-gray-500" />
                  <h3>Company</h3>
                </div>
                <Input 
                  placeholder="Enter company name (optional)" 
                  className="border-gray-200 bg-white hover:border-gray-300 transition-colors" 
                />
              </div>
            </div>
          </Card>
          
          <div className="flex justify-between mt-6">
            <Button 
              variant="outline"
              onClick={() => setActiveTab("details")}
              className="border-gray-200 hover:bg-gray-50 h-10 px-5 rounded-md"
            >
              Back
            </Button>
            
            <Button 
              onClick={() => setActiveTab("additional")}
              className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white h-10 px-5 rounded-md transition-all duration-200"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </TabsContent>
        
        {/* Additional Info Tab */}
        <TabsContent value="additional" className="space-y-6 animate-fade-in">
          <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden">
            <div className="p-5 space-y-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <FileText className="h-4 w-4 text-gray-500" />
                  <h3>Additional Details</h3>
                </div>
                
                <Button 
                  variant="outline" 
                  className="h-9 text-xs gap-1 border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <Upload className="h-3.5 w-3.5" />
                  Upload documents
                </Button>
              </div>
              
              <div>
                <Textarea 
                  placeholder="Add notes or additional details about this transaction..."
                  className="min-h-[120px] border-gray-200 bg-white hover:border-gray-300 transition-colors"
                />
              </div>
              
              <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Check className="h-4 w-4 text-gray-500" />
                  <h3>Create a rule for next time?</h3>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 font-medium">
                    {createRule ? 'Yes' : 'No'}
                  </span>
                  <Switch 
                    id="create-rule" 
                    checked={createRule} 
                    onCheckedChange={setCreateRule}
                    className="data-[state=checked]:bg-emerald-500"
                  />
                </div>
              </div>
              
              {createRule && (
                <div className="mt-4 p-5 bg-gray-50 border border-gray-100 rounded-lg shadow-sm animate-fade-in">
                  <p className="text-sm text-gray-700 font-medium mb-3">Auto-categorize similar transactions</p>
                  <div className="space-y-3">
                    <Select>
                      <SelectTrigger className="h-10 text-sm border-gray-200 bg-white">
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
            </div>
          </Card>
          
          <div className="flex justify-between mt-6">
            <Button 
              variant="outline"
              onClick={() => setActiveTab("payer")}
              className="border-gray-200 hover:bg-gray-50 h-10 px-5 rounded-md"
            >
              Back
            </Button>
            
            <Button 
              onClick={handleConfirm}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white h-10 px-5 rounded-md transition-colors"
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
