
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

interface EditListingFormProps {
  listing: any;
  onClose: () => void;
  onUpdate: (updatedListing: any) => void;
}

export function EditListingForm({ listing, onClose, onUpdate }: EditListingFormProps) {
  const [formData, setFormData] = useState({
    city: listing.city || "",
    address: listing.address || "",
    country: listing.country || "",
    postalCode: listing.postalCode || "",
    type: listing.type || "",
    category: listing.category || "",
    occupancyStatus: listing.occupancyStatus || (listing.tenant?.name ? "occupied" : "vacant"),
    tenantName: listing.tenant?.name || "",
    tenantPhone: listing.tenant?.phone || "",
    tenantEmail: listing.tenant?.email || "",
    tenantType: listing.tenant?.type || "individual",
    notes: listing.notes || "",
  });

  const [units, setUnits] = useState<Unit[]>(listing.units || []);
  const [useUnitsMode, setUseUnitsMode] = useState(listing.units && listing.units.length > 0);
  const [activeTab, setActiveTab] = useState("location");

  // Ensure type and category are properly set when component mounts
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      type: listing.type || "",
      category: listing.category || "",
      occupancyStatus: listing.occupancyStatus || (listing.tenant?.name ? "occupied" : "vacant")
    }));
    setUnits(listing.units || []);
    setUseUnitsMode(listing.units && listing.units.length > 0);
  }, [listing]);

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
      const updatedListing = {
        ...listing,
        ...formData,
        units: useUnitsMode ? units : undefined,
        category: useUnitsMode ? "mixed" : formData.category,
        tenant: (!useUnitsMode && formData.occupancyStatus === "occupied") ? {
          name: formData.tenantName,
          phone: formData.tenantPhone,
          email: formData.tenantEmail,
          type: formData.tenantType,
        } : null
      };

      const res = await fetch(`http://localhost:5000/listings/${listing.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedListing),
      });

      if (!res.ok) {
        throw new Error(`Server responded with status ${res.status}`);
      }

      toast({
        title: "Listing Updated",
        description: "Your changes have been saved successfully",
      });

      onUpdate(updatedListing);
      onClose();
    } catch (err) {
      console.error("Error updating:", err);
      
      toast({
        title: "Listing Updated (Demo Mode)",
        description: "Your changes have been saved in the demo data",
      });
      
      onUpdate({
        ...listing,
        ...formData,
        units: useUnitsMode ? units : undefined,
        category: useUnitsMode ? "mixed" : formData.category,
        tenant: (!useUnitsMode && formData.occupancyStatus === "occupied") ? {
          name: formData.tenantName,
          phone: formData.tenantPhone,
          email: formData.tenantEmail,
          type: formData.tenantType,
        } : null
      });
      onClose();
    }
  };

  const canProceed = formData.city && formData.address && formData.country;

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Edit Property</h1>
          <p className="text-sm text-gray-500 mt-1">Update your property information</p>
        </div>
        <SheetClose asChild>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full hover:bg-gray-100">
            <X className="h-4 w-4" />
          </Button>
        </SheetClose>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-4 mx-6 mt-6">
            <TabsTrigger value="location" className="text-xs">Location</TabsTrigger>
            <TabsTrigger value="type" className="text-xs" disabled={!canProceed}>Type</TabsTrigger>
            <TabsTrigger value="details" className="text-xs" disabled={!formData.type}>Details</TabsTrigger>
            <TabsTrigger value="notes" className="text-xs" disabled={!formData.type}>Notes</TabsTrigger>
          </TabsList>

          {/* Location Tab */}
          <TabsContent value="location" className="flex-1 overflow-y-auto px-6 pb-6">
            <div className="space-y-6 pt-6">
              <div className="text-center">
                <MapPin className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h2 className="text-lg font-medium text-gray-900 mb-2">Property Location</h2>
                <p className="text-sm text-gray-500">Where is your property located?</p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city" className="text-sm font-medium text-gray-700 mb-2 block">City *</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="e.g., Belgrade"
                      className="h-11"
                    />
                  </div>
                  <div>
                    <Label htmlFor="country" className="text-sm font-medium text-gray-700 mb-2 block">Country *</Label>
                    <Input
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      placeholder="e.g., Serbia"
                      className="h-11"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="address" className="text-sm font-medium text-gray-700 mb-2 block">Full Address *</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="e.g., Knez Mihailova 42"
                    className="h-11"
                  />
                </div>
                
                <div>
                  <Label htmlFor="postalCode" className="text-sm font-medium text-gray-700 mb-2 block">Postal Code</Label>
                  <Input
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    placeholder="e.g., 11000"
                    className="h-11"
                  />
                </div>
              </div>

              {canProceed && (
                <div className="pt-4">
                  <Button onClick={() => setActiveTab("type")} className="w-full h-11 bg-blue-600 hover:bg-blue-700">
                    Continue to Property Type
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Property Type Tab */}
          <TabsContent value="type" className="flex-1 overflow-y-auto px-6 pb-6">
            <div className="space-y-6 pt-6">
              <div className="text-center">
                <Building2 className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h2 className="text-lg font-medium text-gray-900 mb-2">Property Classification</h2>
                <p className="text-sm text-gray-500">What type of property are you listing?</p>
              </div>

              {/* Units Mode Toggle */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-medium text-gray-900">Property Structure</h3>
                    <p className="text-sm text-gray-500">Does this property have multiple units?</p>
                  </div>
                  <Button
                    type="button"
                    variant={useUnitsMode ? "default" : "outline"}
                    size="sm"
                    onClick={() => setUseUnitsMode(!useUnitsMode)}
                    className="text-sm"
                  >
                    {useUnitsMode ? "Multiple Units" : "Single Unit"}
                  </Button>
                </div>
              </div>

              {/* Property Type Selection */}
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">Property Type</h3>
                <div className="grid grid-cols-1 gap-3">
                  {propertyTypes.map((type) => (
                    <div
                      key={type.value}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        formData.type === type.value
                          ? "border-blue-500 bg-blue-50 ring-1 ring-blue-500"
                          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                      onClick={() => {
                        setFormData(prev => ({ ...prev, type: type.value, category: "" }));
                        setUnits([]);
                      }}
                    >
                      <div className="flex items-start gap-3">
                        {React.cloneElement(getPropertyTypeIcon(type.value), { 
                          className: `h-5 w-5 mt-0.5 ${formData.type === type.value ? "text-blue-600" : "text-gray-500"}` 
                        })}
                        <div className="flex-1">
                          <h4 className={`font-medium ${formData.type === type.value ? "text-blue-900" : "text-gray-900"}`}>
                            {type.label}
                          </h4>
                          <p className={`text-sm mt-1 ${formData.type === type.value ? "text-blue-700" : "text-gray-500"}`}>
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
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">Specific Category</h3>
                  <div className="grid grid-cols-1 gap-3">
                    {getAvailableCategories().map((cat) => (
                      <div
                        key={cat.value}
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          formData.category === cat.value
                            ? "border-blue-500 bg-blue-50 ring-1 ring-blue-500"
                            : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                        }`}
                        onClick={() => setFormData(prev => ({ ...prev, category: cat.value }))}
                      >
                        <div className="flex items-start gap-3">
                          <cat.Icon className={`h-5 w-5 mt-0.5 ${formData.category === cat.value ? "text-blue-600" : "text-gray-500"}`} />
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
                <div className="pt-4">
                  <Button onClick={() => setActiveTab("details")} className="w-full h-11 bg-blue-600 hover:bg-blue-700">
                    Continue to Details
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Details Tab */}
          <TabsContent value="details" className="flex-1 overflow-y-auto px-6 pb-6">
            <div className="space-y-6 pt-6">
              {/* Units Manager */}
              {useUnitsMode && formData.type && (
                <div>
                  <div className="text-center mb-6">
                    <Building className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                    <h2 className="text-lg font-medium text-gray-900 mb-2">Manage Units</h2>
                    <p className="text-sm text-gray-500">Add and configure individual units</p>
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
                <div className="space-y-6">
                  <div className="text-center">
                    <Users className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                    <h2 className="text-lg font-medium text-gray-900 mb-2">Occupancy Status</h2>
                    <p className="text-sm text-gray-500">Is this property currently occupied?</p>
                  </div>

                  {shouldShowOccupancyStatus() && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {formData.occupancyStatus === "occupied" ? (
                            <>
                              <Users className="h-5 w-5 text-green-600" />
                              <div>
                                <p className="font-medium text-gray-900">Occupied</p>
                                <p className="text-sm text-gray-500">Property has tenants</p>
                              </div>
                            </>
                          ) : (
                            <>
                              <UserX className="h-5 w-5 text-orange-600" />
                              <div>
                                <p className="font-medium text-gray-900">Vacant</p>
                                <p className="text-sm text-gray-500">Property is available</p>
                              </div>
                            </>
                          )}
                        </div>
                        <Button 
                          type="button"
                          variant="outline" 
                          size="sm" 
                          onClick={toggleOccupancyStatus}
                        >
                          Switch to {formData.occupancyStatus === "occupied" ? "Vacant" : "Occupied"}
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Tenant Information */}
                  {formData.occupancyStatus === "occupied" && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-gray-900">Tenant Information</h3>
                        <Button 
                          type="button"
                          variant="outline" 
                          size="sm" 
                          onClick={toggleTenantType}
                        >
                          {formData.tenantType === "individual" ? "Switch to Company" : "Switch to Individual"}
                        </Button>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="tenantName" className="text-sm font-medium text-gray-700 mb-2 block">
                            {formData.tenantType === "individual" ? "Full Name" : "Company Name"}
                          </Label>
                          <Input
                            id="tenantName"
                            name="tenantName"
                            value={formData.tenantName}
                            onChange={handleChange}
                            placeholder={formData.tenantType === "individual" ? "Enter tenant's full name" : "Enter company name"}
                            className="h-11"
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="tenantPhone" className="text-sm font-medium text-gray-700 mb-2 block">Phone</Label>
                            <Input
                              id="tenantPhone"
                              name="tenantPhone"
                              value={formData.tenantPhone}
                              onChange={handleChange}
                              placeholder="Phone number"
                              className="h-11"
                            />
                          </div>
                          <div>
                            <Label htmlFor="tenantEmail" className="text-sm font-medium text-gray-700 mb-2 block">Email</Label>
                            <Input
                              id="tenantEmail"
                              name="tenantEmail"
                              value={formData.tenantEmail}
                              onChange={handleChange}
                              placeholder="Email address"
                              className="h-11"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="pt-4">
                <Button onClick={() => setActiveTab("notes")} className="w-full h-11 bg-blue-600 hover:bg-blue-700">
                  Continue to Notes
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Notes Tab */}
          <TabsContent value="notes" className="flex-1 overflow-y-auto px-6 pb-6">
            <div className="space-y-6 pt-6">
              <div className="text-center">
                <Briefcase className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h2 className="text-lg font-medium text-gray-900 mb-2">Additional Notes</h2>
                <p className="text-sm text-gray-500">Any additional information about this property</p>
              </div>
              
              <div>
                <Label htmlFor="notes" className="text-sm font-medium text-gray-700 mb-2 block">Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Add any additional notes, special features, or important details about this property..."
                  className="min-h-[120px] resize-none"
                />
              </div>

              <div className="pt-4">
                <Button onClick={handleSubmit} className="w-full h-11 bg-green-600 hover:bg-green-700">
                  Update Property
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
