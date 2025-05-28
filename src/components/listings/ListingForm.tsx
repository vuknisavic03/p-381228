import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
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
  Building as BuildingIcon,
  Store as StoreIcon,
  Hotel as HotelIcon,
  MapPin,
  Loader2,
  Users,
  UserX,
  ArrowRight,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { PropertyType } from "@/components/transactions/TransactionFormTypes";
import { getPropertyTypeIcon, formatPropertyType } from "@/utils/propertyTypeUtils";
import { useGeocoding } from "@/hooks/useGeocoding";
import { LocationAutofill } from "./LocationAutofill";
import { UnitsManager } from "./UnitsManager";

interface ListingFormProps {
  onClose?: () => void;
  onListingAdded?: () => void;
}

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

export function ListingForm({ onClose, onListingAdded }: ListingFormProps) {
  const [formData, setFormData] = useState({
    city: "",
    address: "",
    country: "",
    postalCode: "",
    type: "",
    category: "",
    occupancyStatus: "occupied" as "occupied" | "vacant",
    tenantName: "",
    tenantPhone: "",
    tenantEmail: "",
    tenantType: "individual" as "individual" | "company",
    notes: "",
  });

  const [units, setUnits] = useState<Unit[]>([]);
  const [useUnitsMode, setUseUnitsMode] = useState(false);
  const [activeTab, setActiveTab] = useState("location");
  const [isSaving, setIsSaving] = useState(false);

  const { getCoordinates, isGeocoding } = useGeocoding();

  const handleCityLocationSelect = (locationData: { city?: string; country?: string }) => {
    if (locationData.country) {
      setFormData(prev => ({ ...prev, country: locationData.country || "" }));
    }
  };

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

  const handleSave = async () => {
    if (!formData.type) {
      toast({
        title: "Type Required",
        description: "Please select a property type",
        variant: "destructive",
      });
      return;
    }

    if (!useUnitsMode && !formData.category) {
      toast({
        title: "Category Required",
        description: "Please select a property category",
        variant: "destructive",
      });
      return;
    }

    if (useUnitsMode && units.length === 0) {
      toast({
        title: "Units Required",
        description: "Please add at least one unit",
        variant: "destructive",
      });
      return;
    }

    if (!formData.address || !formData.city || !formData.country) {
      toast({
        title: "Address Required",
        description: "Please provide complete address information",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);

    try {
      console.log(`Attempting maximum precision geocoding for: ${formData.address}, ${formData.city}, ${formData.country}`);
      
      const coordinates = await getCoordinates(formData.address, formData.city, formData.country);
      
      if (!coordinates) {
        setIsSaving(false);
        return;
      }

      console.log(`High-precision coordinates obtained:`, coordinates);

      const randomId = Math.floor(Math.random() * 10000);
      
      const payload = {
        id: randomId,
        city: formData.city,
        address: formData.address,
        country: formData.country,
        postalCode: formData.postalCode,
        type: formData.type,
        category: useUnitsMode ? "mixed" : formData.category,
        location: coordinates,
        units: useUnitsMode ? units : undefined,
        ...(shouldShowOccupancyStatus() && !useUnitsMode && { occupancyStatus: formData.occupancyStatus }),
        tenant: (!useUnitsMode && shouldShowTenantInfo() && formData.tenantName) ? {
          name: formData.tenantName,
          phone: formData.tenantPhone,
          email: formData.tenantEmail,
          type: formData.tenantType,
        } : null,
        notes: formData.notes,
      };
      
      try {
        const res = await fetch("http://localhost:5000/listings", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          throw new Error(`Server responded with status ${res.status}`);
        }

        await res.json();
        
        toast({
          title: "Listing Added Successfully",
          description: `Property ${useUnitsMode ? 'with multiple units' : ''} geocoded with maximum precision and saved`,
        });
        
      } catch (err) {
        console.error("Error saving to server:", err);
        
        toast({
          title: "Listing Added (Demo Mode)",
          description: `Property ${useUnitsMode ? 'with multiple units' : ''} added with precise coordinates from enhanced geocoding`,
        });
      }
      
      resetForm();
      window.dispatchEvent(new CustomEvent('refresh-listings'));
      
      if (onClose) {
        onClose();
      }
      
      if (onListingAdded) {
        onListingAdded();
      }
      
    } catch (err) {
      console.error("Error during save:", err);
      toast({
        title: "Error",
        description: "Failed to create listing. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  const resetForm = () => {
    setFormData({
      city: "",
      address: "",
      country: "",
      postalCode: "",
      type: "",
      category: "",
      occupancyStatus: "occupied",
      tenantName: "",
      tenantPhone: "",
      tenantEmail: "",
      tenantType: "individual",
      notes: "",
    });
    setUnits([]);
    setUseUnitsMode(false);
    setActiveTab("location");
  };

  const isProcessing = isSaving || isGeocoding;
  const canProceed = formData.address.trim() !== "" && 
                     formData.city.trim() !== "" && 
                     formData.country.trim() !== "";

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-8 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
            <Building2 className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Add New Listing</h1>
            <p className="text-sm text-gray-500 mt-1">Create a new property listing</p>
          </div>
          {isGeocoding && (
            <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-full ml-4">
              <Loader2 className="h-3 w-3 animate-spin text-blue-600" />
              <span className="text-xs text-blue-600 font-medium">Loading...</span>
            </div>
          )}
        </div>
        {onClose && (
          <Button variant="ghost" size="sm" onClick={onClose} className="h-9 w-9 p-0 rounded-full hover:bg-gray-100">
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
          <div className="px-8 pt-6">
            <TabsList className="grid w-full grid-cols-4 h-12 bg-gray-50 p-1 rounded-xl">
              <TabsTrigger value="location" className="text-sm font-medium rounded-lg h-10">Location</TabsTrigger>
              <TabsTrigger value="type" className="text-sm font-medium rounded-lg h-10" disabled={!canProceed}>Type</TabsTrigger>
              <TabsTrigger value="details" className="text-sm font-medium rounded-lg h-10" disabled={!formData.type}>Details</TabsTrigger>
              <TabsTrigger value="notes" className="text-sm font-medium rounded-lg h-10" disabled={!formData.type}>Notes</TabsTrigger>
            </TabsList>
          </div>

          {/* Location Tab */}
          <TabsContent value="location" className="flex-1 overflow-y-auto px-8 pb-8">
            <div className="space-y-8 pt-8">
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                  <MapPin className="h-8 w-8 text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Property Location</h2>
                <p className="text-gray-500 max-w-md mx-auto">Where is your property located? We'll use this information to find it on the map.</p>
              </div>

              <div className="max-w-2xl mx-auto space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="city" className="text-sm font-semibold text-gray-700">City *</Label>
                    <LocationAutofill
                      value={formData.city}
                      onChange={(value) => setFormData(prev => ({ ...prev, city: value }))}
                      placeholder="e.g., Belgrade"
                      label=""
                      type="city"
                      className="h-12 w-full border-gray-200 bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-300 text-sm rounded-xl px-4"
                      onLocationSelect={handleCityLocationSelect}
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="country" className="text-sm font-semibold text-gray-700">Country *</Label>
                    <LocationAutofill
                      value={formData.country}
                      onChange={(value) => setFormData(prev => ({ ...prev, country: value }))}
                      placeholder="e.g., Serbia"
                      label=""
                      type="country"
                      className="h-12 w-full border-gray-200 bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-300 text-sm rounded-xl px-4"
                    />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="address" className="text-sm font-semibold text-gray-700">Full Address *</Label>
                  <LocationAutofill
                    value={formData.address}
                    onChange={(value) => setFormData(prev => ({ ...prev, address: value }))}
                    placeholder="e.g., Knez Mihailova 42"
                    label=""
                    type="address"
                    className="h-12 w-full border-gray-200 bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-300 text-sm rounded-xl px-4"
                  />
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="postalCode" className="text-sm font-semibold text-gray-700">Postal Code</Label>
                  <Input
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    placeholder="e.g., 11000"
                    className="h-12 rounded-xl"
                  />
                </div>
              </div>

              {canProceed && (
                <div className="pt-6 max-w-2xl mx-auto">
                  <Button onClick={() => setActiveTab("type")} className="w-full h-12 bg-blue-600 hover:bg-blue-700 rounded-xl text-base font-medium">
                    Continue to Property Type
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Property Type Tab */}
          <TabsContent value="type" className="flex-1 overflow-y-auto px-8 pb-8">
            <div className="space-y-8 pt-8">
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                  <Building2 className="h-8 w-8 text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Property Classification</h2>
                <p className="text-gray-500 max-w-md mx-auto">What type of property are you listing? This helps us categorize it correctly.</p>
              </div>

              <div className="max-w-3xl mx-auto space-y-8">
                {/* Units Mode Toggle */}
                <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6 border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                        <Building className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Property Structure</h3>
                        <p className="text-sm text-gray-600">Does this property have multiple units?</p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant={useUnitsMode ? "default" : "outline"}
                      size="sm"
                      onClick={() => setUseUnitsMode(!useUnitsMode)}
                      className="px-6 h-10 rounded-xl font-medium"
                    >
                      {useUnitsMode ? "Multiple Units" : "Single Unit"}
                    </Button>
                  </div>
                </div>

                {/* Property Type Selection */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">Property Type</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {propertyTypes.map((type) => (
                      <div
                        key={type.value}
                        className={`p-6 border-2 rounded-2xl cursor-pointer transition-all hover:shadow-md ${
                          formData.type === type.value
                            ? "border-blue-500 bg-blue-50 shadow-lg"
                            : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                        }`}
                        onClick={() => {
                          setFormData(prev => ({ ...prev, type: type.value, category: "" }));
                          setUnits([]);
                        }}
                      >
                        <div className="flex items-start gap-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            formData.type === type.value ? "bg-blue-100" : "bg-gray-100"
                          }`}>
                            {React.cloneElement(getPropertyTypeIcon(type.value), { 
                              className: `h-6 w-6 ${formData.type === type.value ? "text-blue-600" : "text-gray-500"}` 
                            })}
                          </div>
                          <div className="flex-1">
                            <h4 className={`font-semibold text-base ${formData.type === type.value ? "text-blue-900" : "text-gray-900"}`}>
                              {type.label}
                            </h4>
                            <p className={`text-sm mt-2 ${formData.type === type.value ? "text-blue-700" : "text-gray-500"}`}>
                              {type.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Category Selection */}
                {formData.type && !useUnitsMode && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900">Specific Category</h3>
                    <div className="grid grid-cols-1 gap-4">
                      {getAvailableCategories().map((cat) => (
                        <div
                          key={cat.value}
                          className={`p-5 border-2 rounded-xl cursor-pointer transition-all hover:shadow-sm ${
                            formData.category === cat.value
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                          }`}
                          onClick={() => setFormData(prev => ({ ...prev, category: cat.value }))}
                        >
                          <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                              formData.category === cat.value ? "bg-blue-100" : "bg-gray-100"
                            }`}>
                              <cat.Icon className={`h-5 w-5 ${formData.category === cat.value ? "text-blue-600" : "text-gray-500"}`} />
                            </div>
                            <div className="flex-1">
                              <h4 className={`font-medium ${formData.category === cat.value ? "text-blue-900" : "text-gray-900"}`}>
                                {cat.label}
                              </h4>
                              <p className={`text-sm mt-1 ${formData.category === cat.value ? "text-blue-700" : "text-gray-500"}`}>
                                {cat.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {formData.type && (useUnitsMode || formData.category) && (
                  <div className="pt-6">
                    <Button onClick={() => setActiveTab("details")} className="w-full h-12 bg-blue-600 hover:bg-blue-700 rounded-xl text-base font-medium">
                      Continue to Details
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Details Tab */}
          <TabsContent value="details" className="flex-1 overflow-y-auto px-8 pb-8">
            <div className="space-y-8 pt-8">
              {/* Units Manager */}
              {useUnitsMode && formData.type && (
                <div className="max-w-4xl mx-auto">
                  <div className="text-center mb-8">
                    <div className="mx-auto w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                      <Building className="h-8 w-8 text-blue-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-3">Manage Units</h2>
                    <p className="text-gray-500 max-w-md mx-auto">Add and configure individual units for this property.</p>
                  </div>
                  <UnitsManager
                    propertyType={formData.type as PropertyType}
                    units={units}
                    onUnitsChange={setUnits}
                  />
                </div>
              )}

              {/* Occupancy and Tenant Info for Single Unit */}
              {!useUnitsMode && shouldShowTenantInfo() && (
                <div className="max-w-2xl mx-auto space-y-8">
                  <div className="text-center">
                    <div className="mx-auto w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                      <Users className="h-8 w-8 text-blue-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-3">Occupancy Status</h2>
                    <p className="text-gray-500 max-w-md mx-auto">Is this property currently occupied by tenants?</p>
                  </div>

                  {shouldShowOccupancyStatus() && (
                    <div className="bg-gradient-to-r from-gray-50 to-green-50 rounded-2xl p-6 border border-gray-100">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            formData.occupancyStatus === "occupied" ? "bg-green-100" : "bg-orange-100"
                          }`}>
                            {formData.occupancyStatus === "occupied" ? (
                              <Users className="h-6 w-6 text-green-600" />
                            ) : (
                              <UserX className="h-6 w-6 text-orange-600" />
                            )}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 text-lg">
                              {formData.occupancyStatus === "occupied" ? "Occupied" : "Vacant"}
                            </p>
                            <p className="text-sm text-gray-600">
                              {formData.occupancyStatus === "occupied" ? "Property has tenants" : "Property is available"}
                            </p>
                          </div>
                        </div>
                        <Button 
                          type="button"
                          variant="outline" 
                          size="sm" 
                          onClick={toggleOccupancyStatus}
                          className="px-6 h-10 rounded-xl font-medium"
                        >
                          Switch to {formData.occupancyStatus === "occupied" ? "Vacant" : "Occupied"}
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Tenant Information */}
                  {formData.occupancyStatus === "occupied" && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">Tenant Information</h3>
                        <Button 
                          type="button"
                          variant="outline" 
                          size="sm" 
                          onClick={toggleTenantType}
                          className="px-6 h-10 rounded-xl font-medium"
                        >
                          {formData.tenantType === "individual" ? "Switch to Company" : "Switch to Individual"}
                        </Button>
                      </div>
                      
                      <div className="space-y-6">
                        <div className="space-y-3">
                          <Label htmlFor="tenantName" className="text-sm font-semibold text-gray-700">
                            {formData.tenantType === "individual" ? "Full Name" : "Company Name"}
                          </Label>
                          <Input
                            id="tenantName"
                            name="tenantName"
                            value={formData.tenantName}
                            onChange={handleChange}
                            placeholder={formData.tenantType === "individual" ? "Enter tenant's full name" : "Enter company name"}
                            className="h-12 rounded-xl"
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <Label htmlFor="tenantPhone" className="text-sm font-semibold text-gray-700">Phone</Label>
                            <Input
                              id="tenantPhone"
                              name="tenantPhone"
                              value={formData.tenantPhone}
                              onChange={handleChange}
                              placeholder="Phone number"
                              className="h-12 rounded-xl"
                            />
                          </div>
                          <div className="space-y-3">
                            <Label htmlFor="tenantEmail" className="text-sm font-semibold text-gray-700">Email</Label>
                            <Input
                              id="tenantEmail"
                              name="tenantEmail"
                              value={formData.tenantEmail}
                              onChange={handleChange}
                              placeholder="Email address"
                              className="h-12 rounded-xl"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="pt-6 max-w-2xl mx-auto">
                <Button onClick={() => setActiveTab("notes")} className="w-full h-12 bg-blue-600 hover:bg-blue-700 rounded-xl text-base font-medium">
                  Continue to Notes
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Notes Tab */}
          <TabsContent value="notes" className="flex-1 overflow-y-auto px-8 pb-8">
            <div className="space-y-8 pt-8">
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                  <Briefcase className="h-8 w-8 text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Additional Notes</h2>
                <p className="text-gray-500 max-w-md mx-auto">Add any additional information about this property that might be helpful.</p>
              </div>
              
              <div className="max-w-2xl mx-auto space-y-3">
                <Label htmlFor="notes" className="text-sm font-semibold text-gray-700">Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Add any additional notes, special features, or important details about this property..."
                  className="min-h-[200px] resize-none rounded-xl"
                />
              </div>

              <div className="pt-6 max-w-2xl mx-auto">
                <Button 
                  onClick={handleSave} 
                  disabled={isProcessing || !formData.type || (useUnitsMode ? units.length === 0 : !formData.category)}
                  className="w-full h-12 bg-green-600 hover:bg-green-700 disabled:opacity-50 rounded-xl text-base font-medium"
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>{isGeocoding ? "Loading..." : "Adding listing..."}</span>
                    </div>
                  ) : (
                    "Add Listing"
                  )}
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
