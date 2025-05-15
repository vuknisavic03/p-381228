import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { 
  CreditCard, 
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
  Store,
  Search,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

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
  const [listingSearch, setListingSearch] = useState("");
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

  // Filter listings based on search term
  const filteredListings = mockListings.filter(listing => {
    const searchLower = listingSearch.toLowerCase();
    return (
      listing.address.toLowerCase().includes(searchLower) ||
      listing.city.toLowerCase().includes(searchLower) ||
      listing.country.toLowerCase().includes(searchLower) ||
      listing.type.toLowerCase().includes(searchLower) ||
      listing.category.toLowerCase().includes(searchLower) ||
      listing.tenant?.name.toLowerCase().includes(searchLower) || 
      false
    );
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
      <div className="flex items-center justify-between mb-6 pb-3 border-b border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800">Transaction details</h2>
      </div>

      {/* Main Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 w-full p-1 rounded-lg mb-6 bg-gray-50">
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
        <TabsContent value="details" className="space-y-5 animate-fade-in">
          <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden">
            <div className="p-5 space-y-5">
              {/* Listing Section */}
              <div>
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2.5">
                  <FileText className="h-4 w-4 text-gray-500" />
                  <h3>Listing</h3>
                </div>
                
                <div className="space-y-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="w-full justify-between border-gray-200 bg-white hover:bg-gray-50 text-left font-normal h-10"
                      >
                        {selectedListing ? (
                          <span className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-md flex items-center justify-center bg-gray-100 text-gray-700">
                              {selectedListingDetails && getListingCategoryIcon(selectedListingDetails.category)}
                            </div>
                            <span className="truncate">{selectedListingDetails?.address}</span>
                          </span>
                        ) : (
                          <span className="text-gray-500">Select a listing</span>
                        )}
                        <ChevronRight className="h-4 w-4 ml-2 text-gray-500 shrink-0" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent 
                      align="start" 
                      className="w-[var(--radix-dropdown-menu-trigger-width)] p-2 max-h-[320px] overflow-auto"
                    >
                      {/* Search input for listings */}
                      <div className="sticky top-0 bg-white z-10 pb-2 mb-1 border-b border-gray-100">
                        <div className="relative">
                          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                          <Input 
                            placeholder="Search listings..." 
                            className="pl-8 h-9 focus:ring-1 focus:ring-primary/20 border-gray-200"
                            value={listingSearch}
                            onChange={(e) => setListingSearch(e.target.value)}
                          />
                        </div>
                      </div>
                      
                      {/* Filtered listings */}
                      {filteredListings.length > 0 ? (
                        filteredListings.map((listing) => (
                          <DropdownMenuItem 
                            key={listing.id} 
                            className="flex items-center gap-2 py-2.5 cursor-pointer"
                            onClick={() => {
                              setSelectedListing(listing.id.toString());
                              setListingSearch(""); // Clear search after selection
                            }}
                          >
                            <div className="w-6 h-6 rounded-md flex items-center justify-center bg-gray-100 text-gray-700 shrink-0">
                              {getListingCategoryIcon(listing.category)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">{listing.address}</p>
                              <p className="text-xs text-gray-500 truncate">{listing.city}, {listing.country}</p>
                            </div>
                            {selectedListing === listing.id.toString() && (
                              <Check className="h-4 w-4 text-green-500 shrink-0" />
                            )}
                          </DropdownMenuItem>
                        ))
                      ) : (
                        <div className="py-3 text-center text-gray-500 text-sm">
                          No listings found
                        </div>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  
                  {/* Selected Listing Card */}
                  {selectedListing && (
                    <div className="mt-5">
                      <Card className="bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden">
                        <CardContent className="p-0">
                          <div className="relative">
                            <div className="h-2 w-full bg-gray-100" />
                            
                            <div className="p-4">
                              {selectedListingDetails?.tenant ? (
                                <div className="flex flex-col">
                                  <div className="flex items-start mb-4">
                                    <div className="mr-4">
                                      <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-gray-100 text-gray-700">
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
                                        <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
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
                                      <div className="text-xs px-2 py-1 rounded flex items-center bg-gray-100 text-gray-700">
                                        {getListingCategoryIcon(selectedListingDetails.category)}
                                        <span className="ml-1">{selectedListingDetails.category}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div className="flex flex-col">
                                  <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-gray-100 text-gray-700">
                                      {getListingCategoryIcon(selectedListingDetails?.category || 'default')}
                                    </div>
                                    <div>
                                      <h4 className="text-lg font-semibold text-gray-900">{selectedListingDetails?.address}</h4>
                                      <p className="text-sm text-gray-600">
                                        {selectedListingDetails?.city}, {selectedListingDetails?.country}
                                      </p>
                                    </div>
                                  </div>
                                  
                                  <div className="p-3 bg-gray-50 border border-gray-100 rounded-lg">
                                    <div className="flex items-center gap-2 text-sm text-gray-700">
                                      <User className="h-4 w-4 text-gray-500" />
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
              
              {/* Transaction Type & Category */}
              <div className="grid gap-4">
                {/* Transaction Type as simple pill selector */}
                <div className="pb-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <ShoppingCart className="h-4 w-4 text-gray-500" />
                      <h3>Transaction Type</h3>
                    </div>
                    
                    {/* Minimal Transaction Type Selector - UPDATED ORDER HERE */}
                    <div className="flex items-center gap-2 bg-gray-50 rounded-full py-1 px-2 border border-gray-200">
                      <span 
                        className={cn(
                          "text-xs px-3 py-1 rounded-full cursor-pointer",
                          transactionType === 'revenue' 
                            ? 'bg-white shadow-sm text-gray-800' 
                            : 'text-gray-500'
                        )}
                        onClick={() => setTransactionType('revenue')}
                      >
                        Revenue
                      </span>
                      <span 
                        className={cn(
                          "text-xs px-3 py-1 rounded-full cursor-pointer",
                          transactionType === 'expense' 
                            ? 'bg-white shadow-sm text-gray-800' 
                            : 'text-gray-500'
                        )}
                        onClick={() => setTransactionType('expense')}
                      >
                        Expense
                      </span>
                    </div>
                  </div>

                  {/* Category Selector */}
                  <Select>
                    <SelectTrigger 
                      className="w-full border-gray-200 bg-white hover:border-gray-300 transition-colors"
                    >
                      <SelectValue placeholder={`Select ${transactionType} category`} />
                    </SelectTrigger>
                    <SelectContent className="w-[var(--radix-select-trigger-width)]">
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
              
                {/* Amount - simplified */}
                <div>
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2.5">
                    <DollarSign className="h-4 w-4 text-gray-500" />
                    <h3>Amount</h3>
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600">$</span>
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
                    <SelectContent className="w-[var(--radix-select-trigger-width)]">
                      <SelectItem value="card">Credit Card</SelectItem>
                      <SelectItem value="bank">Bank Transfer</SelectItem>
                      <SelectItem value="cash">Cash</SelectItem>
                      <SelectItem value="check">Check</SelectItem>
                      <SelectItem value="crypto">Cryptocurrency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </Card>

          <div className="flex justify-end mt-5">
            <Button 
              onClick={() => setActiveTab("payer")}
              className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-5 rounded-md transition-all duration-200"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </TabsContent>
        
        {/* Payer Details Tab */}
        <TabsContent value="payer" className="space-y-5 animate-fade-in">
          <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden">
            <div className="p-5 space-y-5">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <User className="h-4 w-4 text-gray-500" />
                  <h3>Payer Details</h3>
                </div>
                
                <div className="flex items-center px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 font-medium">
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
                <div className="bg-gray-50 border border-gray-100 rounded-lg p-4 text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center">
                      <FileText className="h-3.5 w-3.5 text-gray-600" />
                    </div>
                    <span className="font-medium">Select a listing from the first tab</span>
                  </div>
                  <p className="mt-2 text-xs text-gray-600 pl-8">
                    Payer details will be auto-populated from your selected listing's tenant information.
                  </p>
                </div>
              )}
            </div>
          </Card>
          
          <div className="flex justify-between mt-5">
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
        <TabsContent value="additional" className="space-y-5 animate-fade-in">
          <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden">
            <div className="p-5 space-y-5">
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
            </div>
          </Card>
          
          <div className="flex justify-between mt-5">
            <Button 
              variant="outline"
              onClick={() => setActiveTab("payer")}
              className="border-gray-200 hover:bg-gray-50 h-10 px-5 rounded-md"
            >
              Back
            </Button>
            
            <Button 
              onClick={handleConfirm}
              className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white h-10 px-5 rounded-md transition-colors"
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
