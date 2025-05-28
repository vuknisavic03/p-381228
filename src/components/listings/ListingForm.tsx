import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Home,
  Building2,
  Factory,
  Store,
  Building,
  Warehouse,
  Hotel,
  Briefcase,
  X,
  Bed,
  Users,
  UserX,
  MapPin,
  Building as BuildingIcon,
  Store as StoreIcon,
  Hotel as HotelIcon,
  ArrowRight,
  CheckCircle,
  FileText,
  Sparkles,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { SheetClose } from "../ui/sheet";
import { PropertyType } from "@/components/transactions/TransactionFormTypes";
import { getPropertyTypeIcon, formatPropertyType } from "@/utils/propertyTypeUtils";
import { UnitsManager } from "./UnitsManager";

interface Unit {
  id: string;
  unitNumber: string;
  category: string;
  occupancyStatus: "occupied" | "vacant";
  tenant?: {
    name: string;
    phone: string;
    email: string;
    type: "individual" | "company";
  };
  notes?: string;
}

interface ListingFormProps {
  onClose: () => void;
  onListingAdded?: () => void;
}

export function ListingForm({ onClose, onListingAdded }: ListingFormProps) {
  const [formData, setFormData] = useState({
    city: "",
    address: "",
    country: "",
    postalCode: "",
    type: "",
    category: "",
    occupancyStatus: "vacant" as "occupied" | "vacant",
    tenantName: "",
    tenantPhone: "",
    tenantEmail: "",
    tenantType: "individual" as "individual" | "company",
    notes: "",
  });

  const [units, setUnits] = useState<Unit[]>([]);
  const [useUnitsMode, setUseUnitsMode] = useState(false);
  const [activeTab, setActiveTab] = useState("location");

  const propertyTypes: { value: PropertyType; label: string; description: string }[] = [
    { value: "residential_rental", label: "Residential", description: "Homes, apartments, condos for rent" },
    { value: "commercial_rental", label: "Commercial", description: "Office, retail, medical spaces" },
    { value: "industrial", label: "Industrial", description: "Warehouses, factories, distribution" },
    { value: "hospitality", label: "Hospitality", description: "Hotels, motels, B&Bs" },
    { value: "vacation_rental", label: "Vacation Rental", description: "Short-term, Airbnb-style" },
    { value: "mixed_use", label: "Mixed Use", description: "Multi-purpose properties" },
  ];

  const typeToCategoryMap = {
    residential_rental: [
      { value: "single_family", label: "Single-family Home", Icon: Home, description: "Standalone house for one family" },
      { value: "multi_family", label: "Multi-family", Icon: Building, description: "Duplex, triplex, fourplex" },
      { value: "apartment_condo", label: "Apartment/Condo", Icon: Building2, description: "Unit in larger building" },
    ],
    commercial_rental: [
      { value: "office", label: "Office Space", Icon: BuildingIcon, description: "Professional workspace" },
      { value: "retail", label: "Retail Store", Icon: StoreIcon, description: "Shop or storefront" },
      { value: "medical", label: "Medical/Professional", Icon: Building2, description: "Clinic, professional office" },
    ],
    industrial: [
      { value: "warehouse", label: "Warehouse", Icon: Warehouse, description: "Storage and distribution" },
      { value: "distribution", label: "Distribution Facility", Icon: Factory, description: "Logistics hub" },
      { value: "manufacturing", label: "Manufacturing", Icon: Factory, description: "Production facility" },
    ],
    hospitality: [
      { value: "hotel", label: "Hotel", Icon: HotelIcon, description: "Full-service accommodation" },
      { value: "motel", label: "Motel", Icon: Hotel, description: "Roadside accommodation" },
      { value: "bed_breakfast", label: "Bed & Breakfast", Icon: Bed, description: "Small hospitality business" },
    ],
    vacation_rental: [
      { value: "short_term", label: "Short-term Rental", Icon: Home, description: "Airbnb, VRBO style" },
      { value: "serviced_apartment", label: "Serviced Apartment", Icon: Building2, description: "Hotel-like apartment" },
      { value: "holiday_home", label: "Holiday Home", Icon: Home, description: "Vacation villa or cabin" },
    ],
    mixed_use: [
      { value: "residential_commercial", label: "Residential-Commercial", Icon: Building, description: "Live-work combination" },
      { value: "live_work", label: "Live-Work Space", Icon: Home, description: "Combined living and workspace" },
      { value: "multi_purpose", label: "Multi-Purpose", Icon: Building, description: "Various use combinations" },
    ],
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const toggleTenantType = () => {
    setFormData(prev => ({
      ...prev,
      tenantType: prev.tenantType === "individual" ? "company" : "individual"
    }));
  };

  const toggleOccupancyStatus = () => {
    setFormData(prev => ({
      ...prev,
      occupancyStatus: prev.occupancyStatus === "occupied" ? "vacant" : "occupied",
      // Clear tenant fields when switching to vacant
      ...(prev.occupancyStatus === "occupied" ? {
        tenantName: "",
        tenantPhone: "",
        tenantEmail: "",
      } : {})
    }));
  };

  const getAvailableCategories = () => {
    if (!formData.type) return [];
    return typeToCategoryMap[formData.type as keyof typeof typeToCategoryMap] || [];
  };

  const shouldShowOccupancyStatus = () => {
    return formData.type && !["hospitality", "vacation_rental"].includes(formData.type);
  };

  const shouldShowTenantInfo = () => {
    return formData.type && !["hospitality", "vacation_rental"].includes(formData.type);
  };

  const handleSubmit = async () => {
    try {
      const finalCategory = useUnitsMode ? "mixed" : formData.category;
      
      const newListing = {
        ...formData,
        category: finalCategory,
        units: useUnitsMode ? units : undefined,
        tenant: (!useUnitsMode && formData.occupancyStatus === "occupied") ? {
          name: formData.tenantName,
          phone: formData.tenantPhone,
          email: formData.tenantEmail,
          type: formData.tenantType,
        } : null
      };

      const res = await fetch("http://localhost:5000/listings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newListing),
      });

      if (!res.ok) {
        throw new Error(`Server responded with status ${res.status}`);
      }

      toast({
        title: "Property Added",
        description: "Your new property has been successfully added to your portfolio.",
      });

      if (onListingAdded) {
        onListingAdded();
      }
      onClose();
    } catch (err) {
      console.error("Error adding listing:", err);
      
      toast({
        title: "Property Added (Demo Mode)",
        description: "Your new property has been added to the demo data.",
      });
      
      if (onListingAdded) {
        onListingAdded();
      }
      onClose();
    }
  };

  const canProceed = formData.city && formData.address && formData.country;
  const canProceedToDetails = formData.type && (useUnitsMode || formData.category);

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-slate-50 to-blue-50/30">
      {/* Enhanced Header with gradient */}
      <div className="relative flex items-center justify-between p-10 bg-white/80 backdrop-blur-sm border-b border-gray-100/50">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-indigo-50/50"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Add New Property
            </h1>
          </div>
          <p className="text-gray-600 ml-13">Create a stunning property listing for your portfolio</p>
        </div>
        <SheetClose asChild>
          <Button variant="ghost" size="sm" className="relative z-10 h-10 w-10 p-0 rounded-full hover:bg-white/60 transition-all duration-200">
            <X className="h-5 w-5" />
          </Button>
        </SheetClose>
      </div>

      {/* Content with better background */}
      <div className="flex-1 overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
          {/* Enhanced Tab Navigation */}
          <div className="px-10 pt-10 pb-6">
            <div className="max-w-4xl mx-auto">
              <TabsList className="grid w-full grid-cols-4 bg-white/60 backdrop-blur-sm border border-gray-200/50 p-1.5 h-14 shadow-lg shadow-gray-100/50">
                <TabsTrigger 
                  value="location" 
                  className="text-sm font-semibold data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-600 py-3 transition-all duration-200"
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  Location
                </TabsTrigger>
                <TabsTrigger 
                  value="type" 
                  className="text-sm font-semibold data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-600 py-3 transition-all duration-200" 
                  disabled={!canProceed}
                >
                  <Building2 className="h-4 w-4 mr-2" />
                  Type
                </TabsTrigger>
                <TabsTrigger 
                  value="details" 
                  className="text-sm font-semibold data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-600 py-3 transition-all duration-200" 
                  disabled={!formData.type}
                >
                  <Building className="h-4 w-4 mr-2" />
                  Details
                </TabsTrigger>
                <TabsTrigger 
                  value="notes" 
                  className="text-sm font-semibold data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-600 py-3 transition-all duration-200" 
                  disabled={!canProceedToDetails}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Notes
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          {/* Location Tab - Enhanced */}
          <TabsContent value="location" className="flex-1 overflow-y-auto px-10 pb-10">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl mb-8 shadow-lg shadow-blue-100/50">
                  <MapPin className="h-10 w-10 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Property Location</h2>
                <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
                  Enter the address and location details for your property
                </p>
              </div>

              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-10 shadow-xl shadow-gray-100/20 border border-gray-200/50">
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <Label htmlFor="city" className="text-base font-semibold text-gray-800">City *</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="e.g., Belgrade"
                        className="h-14 text-base border-gray-200 focus:border-blue-400 focus:ring-blue-100 rounded-xl transition-all duration-200"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="country" className="text-base font-semibold text-gray-800">Country *</Label>
                      <Input
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        placeholder="e.g., Serbia"
                        className="h-14 text-base border-gray-200 focus:border-blue-400 focus:ring-blue-100 rounded-xl transition-all duration-200"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="address" className="text-base font-semibold text-gray-800">Full Address *</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="e.g., Knez Mihailova 42"
                      className="h-14 text-base border-gray-200 focus:border-blue-400 focus:ring-blue-100 rounded-xl transition-all duration-200"
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="postalCode" className="text-base font-semibold text-gray-800">Postal Code</Label>
                    <Input
                      id="postalCode"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      placeholder="e.g., 11000"
                      className="h-14 text-base border-gray-200 focus:border-blue-400 focus:ring-blue-100 rounded-xl transition-all duration-200"
                    />
                  </div>
                </div>

                {canProceed && (
                  <div className="pt-10">
                    <Button 
                      onClick={() => setActiveTab("type")} 
                      className="w-full h-14 text-base bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl font-semibold shadow-lg shadow-blue-200/50 transition-all duration-200 transform hover:scale-[1.02]"
                    >
                      Continue to Property Type
                      <ArrowRight className="ml-3 h-5 w-5" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Property Type Tab - Enhanced */}
          <TabsContent value="type" className="flex-1 overflow-y-auto px-10 pb-10">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl mb-8 shadow-lg shadow-purple-100/50">
                  <Building2 className="h-10 w-10 text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Property Classification</h2>
                <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
                  Choose the type and structure of your property
                </p>
              </div>

              {/* Enhanced Units Mode Toggle */}
              <div className="bg-gradient-to-r from-gray-50 to-blue-50/50 rounded-2xl p-8 mb-10 border border-gray-200/50">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Property Structure</h3>
                    <p className="text-gray-600">Does this property have multiple units to manage separately?</p>
                  </div>
                  <Button
                    type="button"
                    variant={useUnitsMode ? "default" : "outline"}
                    size="lg"
                    onClick={() => setUseUnitsMode(!useUnitsMode)}
                    className="px-6 py-3 font-semibold rounded-xl transition-all duration-200"
                  >
                    {useUnitsMode ? "Multiple Units" : "Single Unit"}
                  </Button>
                </div>
                {useUnitsMode && (
                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl">
                    <p className="text-sm text-blue-700 font-medium">
                      ✨ You can configure individual units in the next step with their own categories and tenant information.
                    </p>
                  </div>
                )}
              </div>

              {/* Enhanced Property Type Selection */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-10 shadow-xl shadow-gray-100/20 border border-gray-200/50">
                <h3 className="text-xl font-bold text-gray-900 mb-8 text-center">Select Property Type</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {propertyTypes.map((type) => (
                    <div
                      key={type.value}
                      className={`group p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-[1.02] ${
                        formData.type === type.value
                          ? "border-blue-400 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg shadow-blue-100/50"
                          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50/80 hover:shadow-md"
                      }`}
                      onClick={() => {
                        setFormData(prev => ({ ...prev, type: type.value, category: "" }));
                        setUnits([]);
                      }}
                    >
                      <div className="flex items-start gap-5">
                        {React.cloneElement(getPropertyTypeIcon(type.value), { 
                          className: `h-8 w-8 mt-1 transition-colors duration-200 ${
                            formData.type === type.value ? "text-blue-600" : "text-gray-500 group-hover:text-gray-700"
                          }` 
                        })}
                        <div className="flex-1">
                          <h4 className={`font-bold text-lg mb-2 transition-colors duration-200 ${
                            formData.type === type.value ? "text-blue-900" : "text-gray-900"
                          }`}>
                            {type.label}
                          </h4>
                          <p className={`text-sm leading-relaxed transition-colors duration-200 ${
                            formData.type === type.value ? "text-blue-700" : "text-gray-600"
                          }`}>
                            {type.description}
                          </p>
                        </div>
                        {formData.type === type.value && (
                          <CheckCircle className="h-6 w-6 text-blue-600 mt-1 animate-scale-in" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {formData.type && (
                  <div className="pt-10">
                    <Button 
                      onClick={() => setActiveTab("details")} 
                      className="w-full h-14 text-base bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl font-semibold shadow-lg shadow-purple-200/50 transition-all duration-200 transform hover:scale-[1.02]"
                    >
                      Continue to Details
                      <ArrowRight className="ml-3 h-5 w-5" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Details Tab - Enhanced */}
          <TabsContent value="details" className="flex-1 overflow-y-auto px-10 pb-10">
            <div className="max-w-4xl mx-auto">
              {/* Units Manager for Multi-Unit Properties */}
              {useUnitsMode && formData.type && (
                <div>
                  <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl mb-8 shadow-lg shadow-green-100/50">
                      <Building className="h-10 w-10 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Manage Units</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
                      Add and configure individual units within your property
                    </p>
                  </div>
                  <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-10 shadow-xl shadow-gray-100/20 border border-gray-200/50">
                    <UnitsManager
                      propertyType={formData.type as PropertyType}
                      units={units}
                      onUnitsChange={setUnits}
                    />
                  </div>
                </div>
              )}

              {/* Category Selection for Single Unit */}
              {!useUnitsMode && formData.type && (
                <div>
                  <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl mb-8 shadow-lg shadow-amber-100/50">
                      <Building className="h-10 w-10 text-amber-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Specific Category</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
                      Choose the specific type within {formatPropertyType(formData.type as PropertyType)}
                    </p>
                  </div>

                  <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-10 shadow-xl shadow-gray-100/20 border border-gray-200/50 space-y-8">
                    <div className="grid grid-cols-1 gap-6">
                      {getAvailableCategories().map((cat) => (
                        <div
                          key={cat.value}
                          className={`group p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-[1.01] ${
                            formData.category === cat.value
                              ? "border-amber-400 bg-gradient-to-br from-amber-50 to-orange-50 shadow-lg shadow-amber-100/50"
                              : "border-gray-200 hover:border-gray-300 hover:bg-gray-50/80 hover:shadow-md"
                          }`}
                          onClick={() => setFormData(prev => ({ ...prev, category: cat.value }))}
                        >
                          <div className="flex items-start gap-5">
                            <cat.Icon className={`h-8 w-8 mt-1 transition-colors duration-200 ${
                              formData.category === cat.value ? "text-amber-600" : "text-gray-500 group-hover:text-gray-700"
                            }`} />
                            <div className="flex-1">
                              <h4 className={`font-bold text-lg mb-2 transition-colors duration-200 ${
                                formData.category === cat.value ? "text-amber-900" : "text-gray-900"
                              }`}>
                                {cat.label}
                              </h4>
                              <p className={`text-sm leading-relaxed transition-colors duration-200 ${
                                formData.category === cat.value ? "text-amber-700" : "text-gray-600"
                              }`}>
                                {cat.description}
                              </p>
                            </div>
                            {formData.category === cat.value && (
                              <CheckCircle className="h-6 w-6 text-amber-600 mt-1 animate-scale-in" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Enhanced Occupancy and Tenant Info */}
                    {shouldShowTenantInfo() && formData.category && (
                      <div className="space-y-10 pt-8 border-t border-gray-200">
                        <div className="text-center">
                          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl mb-6 shadow-lg shadow-indigo-100/50">
                            <Users className="h-8 w-8 text-indigo-600" />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-3">Occupancy Status</h3>
                          <p className="text-gray-600">Is this property currently occupied by tenants?</p>
                        </div>

                        {shouldShowOccupancyStatus() && (
                          <div className="bg-gradient-to-r from-gray-50 to-blue-50/30 rounded-2xl p-8 border border-gray-200/50">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-6">
                                {formData.occupancyStatus === "occupied" ? (
                                  <>
                                    <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl shadow-lg shadow-green-100/50">
                                      <Users className="h-7 w-7 text-green-600" />
                                    </div>
                                    <div>
                                      <p className="font-bold text-lg text-gray-900">Occupied</p>
                                      <p className="text-gray-600">Property has tenants</p>
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-orange-100 to-red-100 rounded-xl shadow-lg shadow-orange-100/50">
                                      <UserX className="h-7 w-7 text-orange-600" />
                                    </div>
                                    <div>
                                      <p className="font-bold text-lg text-gray-900">Vacant</p>
                                      <p className="text-gray-600">Property is available</p>
                                    </div>
                                  </>
                                )}
                              </div>
                              <Button 
                                type="button"
                                variant="outline" 
                                size="lg" 
                                onClick={toggleOccupancyStatus}
                                className="px-6 py-3 font-semibold rounded-xl border-2 hover:bg-white transition-all duration-200"
                              >
                                Switch to {formData.occupancyStatus === "occupied" ? "Vacant" : "Occupied"}
                              </Button>
                            </div>
                          </div>
                        )}

                        {/* Enhanced Tenant Information */}
                        {formData.occupancyStatus === "occupied" && (
                          <div className="space-y-8">
                            <div className="flex items-center justify-between">
                              <h4 className="text-lg font-bold text-gray-900">Tenant Information</h4>
                              <Button 
                                type="button"
                                variant="outline" 
                                size="sm" 
                                onClick={toggleTenantType}
                                className="px-5 py-2 font-semibold rounded-lg border-2 hover:bg-white transition-all duration-200"
                              >
                                {formData.tenantType === "individual" ? "Switch to Company" : "Switch to Individual"}
                              </Button>
                            </div>
                            
                            <div className="space-y-6">
                              <div className="space-y-3">
                                <Label htmlFor="tenantName" className="text-base font-semibold text-gray-800">
                                  {formData.tenantType === "individual" ? "Full Name" : "Company Name"}
                                </Label>
                                <Input
                                  id="tenantName"
                                  name="tenantName"
                                  value={formData.tenantName}
                                  onChange={handleChange}
                                  placeholder={formData.tenantType === "individual" ? "Enter tenant's full name" : "Enter company name"}
                                  className="h-14 text-base border-gray-200 focus:border-blue-400 focus:ring-blue-100 rounded-xl transition-all duration-200"
                                />
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                  <Label htmlFor="tenantPhone" className="text-base font-semibold text-gray-800">Phone</Label>
                                  <Input
                                    id="tenantPhone"
                                    name="tenantPhone"
                                    value={formData.tenantPhone}
                                    onChange={handleChange}
                                    placeholder="Phone number"
                                    className="h-14 text-base border-gray-200 focus:border-blue-400 focus:ring-blue-100 rounded-xl transition-all duration-200"
                                  />
                                </div>
                                <div className="space-y-3">
                                  <Label htmlFor="tenantEmail" className="text-base font-semibold text-gray-800">Email</Label>
                                  <Input
                                    id="tenantEmail"
                                    name="tenantEmail"
                                    value={formData.tenantEmail}
                                    onChange={handleChange}
                                    placeholder="Email address"
                                    className="h-14 text-base border-gray-200 focus:border-blue-400 focus:ring-blue-100 rounded-xl transition-all duration-200"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {canProceedToDetails && (
                <div className="pt-10">
                  <Button 
                    onClick={() => setActiveTab("notes")} 
                    className="w-full h-14 text-base bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 rounded-xl font-semibold shadow-lg shadow-emerald-200/50 transition-all duration-200 transform hover:scale-[1.02]"
                  >
                    Continue to Notes
                    <ArrowRight className="ml-3 h-5 w-5" />
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Notes Tab - Enhanced */}
          <TabsContent value="notes" className="flex-1 overflow-y-auto px-10 pb-10">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-rose-100 to-pink-100 rounded-2xl mb-8 shadow-lg shadow-rose-100/50">
                  <FileText className="h-10 w-10 text-rose-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Additional Notes</h2>
                <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
                  Add any additional information or special details about this property
                </p>
              </div>
              
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-10 shadow-xl shadow-gray-100/20 border border-gray-200/50">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <Label htmlFor="notes" className="text-base font-semibold text-gray-800">Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="Add any additional notes, special features, maintenance requirements, or important details about this property..."
                      className="min-h-[200px] resize-none text-base border-gray-200 focus:border-blue-400 focus:ring-blue-100 rounded-xl transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="pt-10">
                  <Button 
                    onClick={handleSubmit} 
                    className="w-full h-16 text-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-xl font-bold shadow-xl shadow-green-200/50 transition-all duration-200 transform hover:scale-[1.02]"
                  >
                    <Sparkles className="mr-3 h-6 w-6" />
                    Add Property to Portfolio
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
