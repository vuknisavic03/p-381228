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
                  {/* Enhanced Select Component with Better Visual Differentiation */}
                  <Select value={selectedListing} onValueChange={setSelectedListing}>
                    <SelectTrigger 
                      className={cn(
                        "w-full border-gray-200 bg-white hover:border-gray-300 transition-colors",
                        selectedListing && "border-indigo-400 ring-2 ring-indigo-100 shadow-sm",
                        !selectedListing && "border-dashed border-2 border-gray-300 hover:border-gray-400"
                      )}
                    >
                      <SelectValue placeholder="Select a listing" />
                    </SelectTrigger>
                    <SelectContent className="max-h-72">
                      <div className="sticky top-0 z-10 bg-white p-2 border-b border-gray-100">
                        <div className="relative">
                          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input 
                            placeholder="Search listings..." 
                            className="pl-8 h-9 text-sm" 
                          />
                        </div>
                      </div>
                      <div className="p-2">
                        <div className="flex flex-col gap-1 mb-3">
                          <span className="text-xs font-medium text-gray-500 px-2">Commercial Properties</span>
                          {mockListings.filter(l => l.type === 'Commercial').map((listing) => (
                            <SelectItem key={listing.id} value={listing.id.toString()} className="py-3">
                              <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-md flex items-center justify-center bg-indigo-100 text-indigo-700`}>
                                  {getListingCategoryIcon(listing.category)}
                                </div>
                                <div className="flex flex-col">
                                  <span className="font-medium text-gray-800">{listing.address}</span>
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs text-gray-500">
                                      {listing.category}
                                    </span>
                                    <span className="h-1 w-1 rounded-full bg-gray-300"></span>
                                    <span className="text-xs text-gray-500">
                                      {listing.city}, {listing.country}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </SelectItem>
                          ))}
                        </div>
                        
                        <div className="flex flex-col gap-1 mb-2">
                          <span className="text-xs font-medium text-gray-500 px-2">Residential Properties</span>
                          {mockListings.filter(l => l.type === 'Residential').map((listing) => (
                            <SelectItem key={listing.id} value={listing.id.toString()} className="py-3">
                              <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-md flex items-center justify-center bg-amber-100 text-amber-700`}>
                                  <Home className="h-4 w-4" />
                                </div>
                                <div className="flex flex-col">
                                  <span className="font-medium text-gray-800">{listing.address}</span>
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs text-gray-500">
                                      {listing.category}
                                    </span>
                                    <span className="h-1 w-1 rounded-full bg-gray-300"></span>
                                    <span className="text-xs text-gray-500">
                                      {listing.city}, {listing.country}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </SelectItem>
                          ))}
                        </div>
                      </div>
                    </SelectContent>
                  </Select>
                  
                  {/* Enhanced Selected Listing Card with better outline */}
                  {selectedListingDetails && (
                    <div className="mt-4 animate-fade-in">
                      <Card className="border-indigo-200 bg-gradient-to-br from-indigo-50 to-white shadow-md rounded-xl overflow-hidden">
                        <div className="absolute top-3 right-3">
                          <div className="h-6 w-6 rounded-full bg-indigo-500 text-white flex items-center justify-center">
                            <CheckCircle className="h-3.5 w-3.5" />
                          </div>
                        </div>
                        <CardContent className="p-5">
                          <div className="flex items-start gap-4">
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                              selectedListingDetails.type === 'Commercial' 
                                ? 'bg-indigo-500 text-white' 
                                : 'bg-amber-500 text-white'
                            }`}>
                              {selectedListingDetails.type === 'Commercial' ? (
                                getListingCategoryIcon(selectedListingDetails.category)
                              ) : (
                                <Home className="h-6 w-6" />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex flex-col">
                                <h4 className="text-base font-medium text-gray-800 mb-1">
                                  {selectedListingDetails.address}
                                </h4>
                                <div className="flex items-center text-xs text-gray-500 gap-1 mb-3">
                                  <MapPin className="h-3 w-3" />
                                  <span>{selectedListingDetails.city}, {selectedListingDetails.country}</span>
                                </div>
                                <div className="flex gap-2">
                                  <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-700 font-medium">
                                    {selectedListingDetails.type}
                                  </span>
                                  <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-700 font-medium">
                                    {selectedListingDetails.category}
                                  </span>
                                </div>
                              </div>
                              
                              {/* Tenant Information */}
                              {selectedListingDetails.tenant ? (
                                <div className="mt-4 pt-4 border-t border-indigo-100">
                                  <div className="flex items-center gap-2 mb-2">
                                    <User className="h-3.5 w-3.5 text-indigo-500" />
                                    <span className="text-sm font-medium text-gray-700">Tenant Information</span>
                                  </div>
                                  
                                  <div className="flex items-center gap-4">
                                    <div className="h-9 w-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                                      {selectedListingDetails.tenant.type === 'company' ? (
                                        <Building className="h-4 w-4" />
                                      ) : (
                                        <User className="h-4 w-4" />
                                      )}
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium text-gray-800">
                                        {selectedListingDetails.tenant.name}
                                      </p>
                                      <p className="text-xs text-gray-500 mt-0.5">
                                        {selectedListingDetails.tenant.type === 'company' ? 'Company' : 'Individual'}
                                      </p>
                                    </div>
                                  </div>
                                  
                                  <div className="grid grid-cols-2 gap-3 mt-3">
                                    <div className="flex items-center gap-1.5 text-xs">
                                      <Mail className="h-3 w-3 text-indigo-400" />
                                      <span className="text-gray-600">{selectedListingDetails.tenant.email}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-xs">
                                      <Phone className="h-3 w-3 text-indigo-400" />
                                      <span className="text-gray-600">{selectedListingDetails.tenant.phone}</span>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div className="mt-4 pt-4 border-t border-indigo-100">
                                  <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <User className="h-3.5 w-3.5 text-indigo-400" />
                                    <span>No tenant associated with this listing</span>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                  
                  {/* Prompt to Select a Listing When None is Selected */}
                  {!selectedListing && (
                    <div className="mt-3 p-4 bg-gray-50 border border-gray-200 rounded-lg text-center animate-fade-in">
                      <div className="flex flex-col items-center">
                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mb-2">
                          <Search className="h-4 w-4 text-gray-500" />
                        </div>
                        <p className="text-sm font-medium text-gray-700">Select a listing</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Choose a property to associate with this transaction
                        </p>
                      </div>
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
