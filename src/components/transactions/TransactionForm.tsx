
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
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
  Building,
  TrendingDown,
  Home,
  MapPin,
  CheckCircle,
  Store
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

// Mock listing data similar to what we have in ListingList
const mockListings = [
  {
    id: 1,
    address: "Belgrade, Dunavska 12",
    city: "Belgrade",
    country: "Serbia",
    type: "Commercial",
    category: "Retail",
    tenant: {
      name: "Alexander Whitmore",
      phone: "000-000-0000",
      email: "alex@example.com",
      type: "individual"
    }
  },
  {
    id: 2,
    address: "New York, 5th Avenue",
    city: "New York",
    country: "USA",
    type: "Residential",
    category: "Apartment",
    tenant: {
      name: "Sarah Johnson",
      phone: "111-222-3333",
      email: "sarah@example.com",
      type: "individual"
    }
  },
  {
    id: 3,
    address: "London, Baker Street 221B",
    city: "London",
    country: "UK",
    type: "Commercial",
    category: "Office",
    tenant: {
      name: "Watson Enterprises",
      phone: "444-555-6666",
      email: "watson@example.com",
      type: "company",
      contactPerson: "John Watson"
    }
  },
  {
    id: 4,
    address: "Paris, Champs-Élysées",
    city: "Paris",
    country: "France",
    type: "Commercial",
    category: "Retail",
    tenant: {
      name: "Dubois Retail Group",
      phone: "777-888-9999",
      email: "contact@duboisretail.com",
      type: "company",
      contactPerson: "Marie Dubois"
    }
  },
  {
    id: 5,
    address: "Tokyo, Shibuya Crossing",
    city: "Tokyo",
    country: "Japan",
    type: "Commercial",
    category: "Restaurant",
    tenant: null
  }
];

export function TransactionForm() {
  const [activeTab, setActiveTab] = useState("details");
  const [createRule, setCreateRule] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedListing, setSelectedListing] = useState<string>("");
  const [payerType, setPayerType] = useState<'individual' | 'company'>('individual');
  const [payerDetails, setPayerDetails] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  });
  const [transactionType, setTransactionType] = useState<'revenue' | 'expense'>('revenue');
  const { toast } = useToast();
  const [isListingsOpen, setIsListingsOpen] = useState(false);
  
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

  // Update payer details when listing is selected
  useEffect(() => {
    if (selectedListing) {
      const listing = mockListings.find(l => l.id.toString() === selectedListing);
      if (listing && listing.tenant) {
        setPayerType(listing.tenant.type as 'individual' | 'company');
        setPayerDetails({
          name: listing.tenant.name || "",
          email: listing.tenant.email || "",
          phone: listing.tenant.phone || "",
          company: listing.tenant.type === "company" ? listing.tenant.name : listing.tenant.name === listing.tenant.contactPerson ? "" : (listing.tenant.contactPerson || ""),
        });
      } else {
        // Clear payer details if no tenant is associated
        setPayerType('individual');
        setPayerDetails({
          name: "",
          email: "",
          phone: "",
          company: "",
        });
      }
    }
  }, [selectedListing]);

  // Local toggle function that only affects the form
  const toggleTransactionType = () => {
    setTransactionType(prevType => prevType === 'revenue' ? 'expense' : 'revenue');
  };

  const handleConfirm = () => {
    toast({
      title: `${transactionType === 'revenue' ? 'Revenue' : 'Expense'} transaction created`,
      description: `Your ${transactionType} transaction has been created successfully.`,
      duration: 5000,
    });
  };

  // Helper function to get the selected listing object
  const getSelectedListingDetails = () => {
    if (!selectedListing) return null;
    return mockListings.find(l => l.id.toString() === selectedListing);
  };

  const selectedListingDetails = getSelectedListingDetails();

  // Get icon for listing category
  const getListingCategoryIcon = (category: string) => {
    switch(category.toLowerCase()) {
      case 'retail':
        return <Store className="h-4 w-4" />;
      case 'office':
        return <BriefcaseIcon className="h-4 w-4" />;
      case 'apartment':
        return <Home className="h-4 w-4" />;
      case 'restaurant':
        return <ShoppingCart className="h-4 w-4" />;
      default:
        return <Building className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Commercial':
        return 'from-violet-500 to-indigo-600';
      case 'Residential':
        return 'from-amber-400 to-amber-600';
      case 'Industrial':
        return 'from-cyan-500 to-blue-600';
      default:
        return 'from-gray-400 to-gray-600';
    }
  };

  return (
    <div className="p-6 h-full overflow-auto">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800">Transaction details</h2>
        <div className="flex items-center gap-2">
          <button 
            onClick={toggleTransactionType}
            className={`flex items-center px-3 py-1.5 rounded-full font-medium transition-colors duration-200 ${
              transactionType === 'revenue' 
                ? 'bg-emerald-50 text-emerald-700' 
                : 'bg-red-50 text-red-700'
            }`}
          >
            {transactionType === 'revenue' ? (
              <>
                <DollarSign className="h-3.5 w-3.5 mr-1.5" />
                <span className="text-xs">Revenue</span>
              </>
            ) : (
              <>
                <TrendingDown className="h-3.5 w-3.5 mr-1.5" />
                <span className="text-xs">Expenses</span>
              </>
            )}
          </button>
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
                
                <div className="space-y-2">
                  {/* Entirely new listing selector */}
                  <div className="relative">
                    <div 
                      onClick={() => setIsListingsOpen(!isListingsOpen)}
                      className={cn(
                        "flex items-center justify-between p-4 border rounded-lg transition-all duration-200 cursor-pointer",
                        selectedListing 
                          ? "bg-gradient-to-r from-gray-50 to-white shadow-sm border-gray-200" 
                          : "bg-white border-dashed border-2 border-gray-300 hover:border-gray-400"
                      )}
                    >
                      {selectedListing ? (
                        <div className="flex items-center gap-3 w-full">
                          <div className={cn(
                            "w-12 h-12 rounded-lg flex items-center justify-center text-white bg-gradient-to-br shadow-sm",
                            getTypeColor(selectedListingDetails?.type || 'Commercial')
                          )}>
                            {getListingCategoryIcon(selectedListingDetails?.category || 'default')}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{selectedListingDetails?.address}</h4>
                            <div className="flex items-center text-xs text-gray-500 mt-0.5">
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {selectedListingDetails?.city}, {selectedListingDetails?.country}
                              </span>
                              <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-300"></span>
                              <span className="text-xs">{selectedListingDetails?.category}</span>
                            </div>
                          </div>
                          <div className="h-6 w-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
                            {isListingsOpen ? (
                              <ChevronRight className="h-4 w-4 rotate-90" />
                            ) : (
                              <ChevronRight className="h-4 w-4 -rotate-90" />
                            )}
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                              <FileText className="h-5 w-5 text-gray-400" />
                            </div>
                            <div>
                              <span className="text-gray-800 font-medium">Select a listing</span>
                              <p className="text-xs text-gray-500">Choose a property to associate with this transaction</p>
                            </div>
                          </div>
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        </>
                      )}
                    </div>
                    
                    {/* Dropdown panel for listing selection */}
                    {isListingsOpen && (
                      <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg animate-fade-in overflow-hidden">
                        <div className="sticky top-0 bg-white p-3 border-b border-gray-100">
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input 
                              placeholder="Search listings..." 
                              className="pl-9 h-10 text-sm bg-gray-50 border-gray-200 focus:bg-white" 
                            />
                          </div>
                        </div>
                        
                        <div className="max-h-80 overflow-y-auto p-2">
                          {/* Group by type */}
                          {["Commercial", "Residential"].map((type) => (
                            <div key={type} className="mb-3">
                              <div className="flex items-center gap-2 px-3 py-2">
                                <div className={cn(
                                  "w-6 h-6 rounded flex items-center justify-center text-white text-xs",
                                  type === "Commercial" ? "bg-indigo-500" : "bg-amber-500"
                                )}>
                                  {type === "Commercial" ? <Building className="h-3 w-3" /> : <Home className="h-3 w-3" />}
                                </div>
                                <span className="text-sm font-medium text-gray-700">{type} Properties</span>
                              </div>
                              
                              <div className="space-y-1">
                                {mockListings
                                  .filter(listing => listing.type === type)
                                  .map(listing => (
                                    <div
                                      key={listing.id}
                                      onClick={() => {
                                        setSelectedListing(listing.id.toString());
                                        setIsListingsOpen(false);
                                      }}
                                      className={cn(
                                        "flex items-center p-3 rounded-lg cursor-pointer transition-all",
                                        selectedListing === listing.id.toString()
                                          ? "bg-indigo-50"
                                          : "hover:bg-gray-50"
                                      )}
                                    >
                                      <div className="flex items-center gap-3 w-full">
                                        <div className={cn(
                                          "w-10 h-10 rounded flex items-center justify-center text-white",
                                          listing.type === "Commercial" 
                                            ? selectedListing === listing.id.toString() ? "bg-indigo-600" : "bg-indigo-100 text-indigo-600"
                                            : selectedListing === listing.id.toString() ? "bg-amber-600" : "bg-amber-100 text-amber-600"
                                        )}>
                                          {selectedListing === listing.id.toString() ? (
                                            <Check className="h-5 w-5" />
                                          ) : (
                                            getListingCategoryIcon(listing.category)
                                          )}
                                        </div>
                                        
                                        <div className="flex-1">
                                          <h4 className={cn(
                                            "font-medium",
                                            selectedListing === listing.id.toString() 
                                              ? listing.type === "Commercial" ? "text-indigo-700" : "text-amber-700"  
                                              : "text-gray-700"
                                          )}>
                                            {listing.address}
                                          </h4>
                                          <div className="flex items-center text-xs text-gray-500 mt-0.5">
                                            <span>{listing.category}</span>
                                            <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-300"></span>
                                            <span>{listing.city}, {listing.country}</span>
                                          </div>
                                        </div>
                                        
                                        {selectedListing === listing.id.toString() && (
                                          <div className="h-6 w-6 rounded-full flex items-center justify-center bg-indigo-100 text-indigo-600">
                                            <Check className="h-3.5 w-3.5" />
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  ))
                                }
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Enhanced Selected Listing Card */}
                  {selectedListing && !isListingsOpen && (
                    <div className="mt-5">
                      <Card className="bg-gradient-to-br from-gray-50 via-white to-gray-50 border-none shadow-sm rounded-xl overflow-hidden">
                        <CardContent className="p-0">
                          <div className="relative">
                            {/* Top colored banner based on type */}
                            <div className={cn(
                              "h-3 w-full bg-gradient-to-r",
                              getTypeColor(selectedListingDetails?.type || 'Commercial')
                            )} />
                            
                            <div className="p-4">
                              {selectedListingDetails?.tenant ? (
                                <div className="flex flex-col">
                                  <div className="flex items-start mb-4">
                                    <div className="mr-4">
                                      <div className={cn(
                                        "w-12 h-12 rounded-lg flex items-center justify-center text-white bg-gradient-to-br shadow-sm",
                                        selectedListingDetails.type === 'Commercial' ? 'from-violet-500 to-indigo-600' : 'from-amber-400 to-amber-600'
                                      )}>
                                        {selectedListingDetails.tenant.type === 'company' ? (
                                          <Building className="h-6 w-6" />
                                        ) : (
                                          <User className="h-6 w-6" />
                                        )}
                                      </div>
                                    </div>
                                    <div className="flex-1">
                                      <div className="flex items-center">
                                        <h4 className="text-lg font-semibold text-gray-900">{selectedListingDetails.tenant.name}</h4>
                                        <span className={cn(
                                          "ml-2 text-xs px-2 py-0.5 rounded-full",
                                          selectedListingDetails.tenant.type === 'company' 
                                            ? "bg-blue-100 text-blue-700" 
                                            : "bg-emerald-100 text-emerald-700"
                                        )}>
                                          {selectedListingDetails.tenant.type === 'company' ? 'Company' : 'Individual'}
                                        </span>
                                      </div>
                                      
                                      <div className="mt-1 flex flex-wrap gap-y-1 gap-x-3">
                                        <div className="flex items-center text-sm text-gray-600">
                                          <Mail className="h-3.5 w-3.5 mr-1.5 text-gray-500" />
                                          <span>{selectedListingDetails.tenant.email}</span>
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600">
                                          <Phone className="h-3.5 w-3.5 mr-1.5 text-gray-500" />
                                          <span>{selectedListingDetails.tenant.phone}</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center p-3 bg-gray-50 rounded-lg mt-1">
                                    <div className="flex items-center gap-2 flex-1">
                                      <MapPin className="h-4 w-4 text-gray-500" />
                                      <div>
                                        <span className="text-sm font-medium text-gray-800">
                                          {selectedListingDetails.address}
                                        </span>
                                        <div className="text-xs text-gray-500">
                                          {selectedListingDetails.city}, {selectedListingDetails.country}
                                        </div>
                                      </div>
                                    </div>
                                    
                                    <div className="flex flex-col items-end">
                                      <div className={cn(
                                        "text-xs px-2 py-1 rounded flex items-center",
                                        selectedListingDetails.type === 'Commercial' 
                                          ? "bg-indigo-100 text-indigo-700" 
                                          : "bg-amber-100 text-amber-700"
                                      )}>
                                        {getListingCategoryIcon(selectedListingDetails.category)}
                                        <span className="ml-1">{selectedListingDetails.category}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div className="flex flex-col">
                                  <div className="flex items-center gap-3 mb-4">
                                    <div className={cn(
                                      "w-12 h-12 rounded-lg flex items-center justify-center text-white bg-gradient-to-br shadow-sm",
                                      selectedListingDetails?.type === 'Commercial' ? 'from-violet-500 to-indigo-600' : 'from-amber-400 to-amber-600'
                                    )}>
                                      {getListingCategoryIcon(selectedListingDetails?.category || 'default')}
                                    </div>
                                    <div>
                                      <h4 className="text-lg font-semibold text-gray-900">{selectedListingDetails?.address}</h4>
                                      <p className="text-sm text-gray-600">
                                        {selectedListingDetails?.city}, {selectedListingDetails?.country}
                                      </p>
                                    </div>
                                  </div>
                                  
                                  <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg">
                                    <div className="flex items-center gap-2 text-sm text-amber-800">
                                      <User className="h-4 w-4 text-amber-600" />
                                      <span>No tenant associated with this listing</span>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Category */}
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
                    {transactionType === 'revenue' ? (
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
              
              {/* Relationship */}
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
              
              {/* Amount */}
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
              
              {/* Date */}
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
              
              {/* Payment Method */}
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
                  {payerType === 'individual' ? (
                    <>
                      <User className="h-3.5 w-3.5 mr-1.5" />
                      <span className="text-xs">Individual</span>
                    </>
                  ) : (
                    <>
                      <Building className="h-3.5 w-3.5 mr-1.5" />
                      <span className="text-xs">Company</span>
                    </>
                  )}
                </div>
              </div>
              
              <div>
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2.5">
                  <User className="h-4 w-4 text-gray-500" />
                  <h3>Name</h3>
                </div>
                <Input 
                  value={payerDetails.name}
                  readOnly
                  placeholder="Name will be populated from listing" 
                  className="border-gray-200 bg-gray-50 text-gray-600 cursor-not-allowed" 
                />
              </div>
              
              <div>
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2.5">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <h3>Email</h3>
                </div>
                <Input 
                  type="email" 
                  value={payerDetails.email}
                  readOnly
                  placeholder="Email will be populated from listing" 
                  className="border-gray-200 bg-gray-50 text-gray-600 cursor-not-allowed" 
                />
              </div>
              
              <div>
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2.5">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <h3>Phone</h3>
                </div>
                <Input 
                  type="tel" 
                  value={payerDetails.phone}
                  readOnly
                  placeholder="Phone will be populated from listing" 
                  className="border-gray-200 bg-gray-50 text-gray-600 cursor-not-allowed" 
                />
              </div>

              {payerType === 'company' && (
                <div>
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2.5">
                    <Building className="h-4 w-4 text-gray-500" />
                    <h3>Contact Person</h3>
                  </div>
                  <Input 
                    value={payerDetails.company}
                    readOnly
                    placeholder="Contact person will be populated from listing" 
                    className="border-gray-200 bg-gray-50 text-gray-600 cursor-not-allowed" 
                  />
                </div>
              )}

              {!selectedListing && (
                <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 text-sm text-yellow-800">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-yellow-100 flex items-center justify-center">
                      <FileText className="h-3.5 w-3.5 text-yellow-600" />
                    </div>
                    <span className="font-medium">Select a listing from the first tab</span>
                  </div>
                  <p className="mt-2 text-xs text-yellow-700 pl-8">
                    Payer details will be auto-populated from your selected listing's tenant information.
                  </p>
                </div>
              )}
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
