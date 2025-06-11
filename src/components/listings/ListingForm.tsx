import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Home, Building2, Factory, Store, Building, Warehouse, Hotel, Bed, Users, UserX, Building as BuildingIcon, Store as StoreIcon, Hotel as HotelIcon, CheckCircle, MapPin, FileText, Settings, MessageSquare } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { PropertyType } from "@/components/transactions/TransactionFormTypes";
import { getPropertyTypeIcon, formatPropertyType } from "@/utils/propertyTypeUtils";
import { UnitsManager } from "./UnitsManager";
import { LocationAutofill } from "./LocationAutofill";
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
export function ListingForm({
  onClose,
  onListingAdded
}: ListingFormProps) {
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
    notes: ""
  });
  const [units, setUnits] = useState<Unit[]>([]);
  const [useUnitsMode, setUseUnitsMode] = useState(false);
  const propertyTypes: {
    value: PropertyType;
    label: string;
    description: string;
  }[] = [{
    value: "residential_rental",
    label: "Residential",
    description: "Homes, apartments, condos for rent"
  }, {
    value: "commercial_rental",
    label: "Commercial",
    description: "Office, retail, medical spaces"
  }, {
    value: "industrial",
    label: "Industrial",
    description: "Warehouses, factories, distribution"
  }, {
    value: "hospitality",
    label: "Hospitality",
    description: "Hotels, motels, B&Bs"
  }, {
    value: "vacation_rental",
    label: "Vacation Rental",
    description: "Short-term, Airbnb-style"
  }, {
    value: "mixed_use",
    label: "Mixed Use",
    description: "Multi-purpose properties"
  }];
  const typeToCategoryMap = {
    residential_rental: [{
      value: "single_family",
      label: "Single-family Home",
      Icon: Home,
      description: "Standalone house for one family"
    }, {
      value: "multi_family",
      label: "Multi-family",
      Icon: Building,
      description: "Duplex, triplex, fourplex"
    }, {
      value: "apartment_condo",
      label: "Apartment/Condo",
      Icon: Building2,
      description: "Unit in larger building"
    }],
    commercial_rental: [{
      value: "office",
      label: "Office Space",
      Icon: BuildingIcon,
      description: "Professional workspace"
    }, {
      value: "retail",
      label: "Retail Store",
      Icon: StoreIcon,
      description: "Shop or storefront"
    }, {
      value: "medical",
      label: "Medical/Professional",
      Icon: Building2,
      description: "Clinic, professional office"
    }],
    industrial: [{
      value: "warehouse",
      label: "Warehouse",
      Icon: Warehouse,
      description: "Storage and distribution"
    }, {
      value: "distribution",
      label: "Distribution Facility",
      Icon: Factory,
      description: "Logistics hub"
    }, {
      value: "manufacturing",
      label: "Manufacturing",
      Icon: Factory,
      description: "Production facility"
    }],
    hospitality: [{
      value: "hotel",
      label: "Hotel",
      Icon: HotelIcon,
      description: "Full-service accommodation"
    }, {
      value: "motel",
      label: "Motel",
      Icon: Hotel,
      description: "Roadside accommodation"
    }, {
      value: "bed_breakfast",
      label: "Bed & Breakfast",
      Icon: Bed,
      description: "Small hospitality business"
    }],
    vacation_rental: [{
      value: "short_term",
      label: "Short-term Rental",
      Icon: Home,
      description: "Airbnb, VRBO style"
    }, {
      value: "serviced_apartment",
      label: "Serviced Apartment",
      Icon: Building2,
      description: "Hotel-like apartment"
    }, {
      value: "holiday_home",
      label: "Holiday Home",
      Icon: Home,
      description: "Vacation villa or cabin"
    }],
    mixed_use: [{
      value: "residential_commercial",
      label: "Residential-Commercial",
      Icon: Building,
      description: "Live-work combination"
    }, {
      value: "live_work",
      label: "Live-Work Space",
      Icon: Home,
      description: "Combined living and workspace"
    }, {
      value: "multi_purpose",
      label: "Multi-Purpose",
      Icon: Building,
      description: "Various use combinations"
    }]
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };
  const handleLocationSelect = (locationData: {
    city?: string;
    country?: string;
    address?: string;
  }) => {
    setFormData(prev => ({
      ...prev,
      ...(locationData.city && {
        city: locationData.city
      }),
      ...(locationData.country && {
        country: locationData.country
      }),
      ...(locationData.address && {
        address: locationData.address
      })
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
      ...(prev.occupancyStatus === "occupied" ? {
        tenantName: "",
        tenantPhone: "",
        tenantEmail: ""
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
        tenant: !useUnitsMode && formData.occupancyStatus === "occupied" ? {
          name: formData.tenantName,
          phone: formData.tenantPhone,
          email: formData.tenantEmail,
          type: formData.tenantType
        } : null
      };
      const res = await fetch("http://localhost:5000/listings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newListing)
      });
      if (!res.ok) {
        throw new Error(`Server responded with status ${res.status}`);
      }
      toast({
        title: "Property Added",
        description: "Your new property has been successfully added to your portfolio."
      });
      if (onListingAdded) {
        onListingAdded();
      }
      onClose();
    } catch (err) {
      console.error("Error adding listing:", err);
      toast({
        title: "Property Added (Demo Mode)",
        description: "Your new property has been added to the demo data."
      });
      if (onListingAdded) {
        onListingAdded();
      }
      onClose();
    }
  };
  const isFormValid = formData.city && formData.address && formData.country && formData.type && (useUnitsMode || formData.category);
  return <div className="flex flex-col h-full bg-white">
      {/* Header with action buttons */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <div>
          <h1 className="text-lg font-medium text-gray-900">Add New Listing</h1>
          <p className="text-xs text-gray-500 mt-0.5">Create a new listing for your portfolio</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleSubmit} disabled={!isFormValid} size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 h-8">
            Add Listing
          </Button>
          <Button variant="outline" onClick={onClose} size="sm" className="bg-white border-gray-200 hover:bg-gray-50 text-xs px-3 py-1.5 h-8">
            Cancel
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-4 bg-gray-50">
        <div className="w-[98%] max-w-none space-y-4">
          
          {/* Location Section */}
          <Card className="p-4 border border-gray-100 shadow-sm bg-white">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="h-4 w-4 text-gray-500" />
              <h2 className="text-sm font-medium text-gray-900">Location</h2>
            </div>
            <p className="text-xs text-gray-600 mb-4">Where is your listing located?</p>
            
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <LocationAutofill value={formData.city} onChange={value => setFormData(prev => ({
                  ...prev,
                  city: value
                }))} placeholder="e.g., Belgrade" label="City" type="city" className="h-9 text-sm" onLocationSelect={handleLocationSelect} />
                </div>
                <div>
                  <LocationAutofill value={formData.country} onChange={value => setFormData(prev => ({
                  ...prev,
                  country: value
                }))} placeholder="e.g., Serbia" label="Country" type="country" className="h-9 text-sm" onLocationSelect={handleLocationSelect} />
                </div>
              </div>
              
              <div>
                <LocationAutofill value={formData.address} onChange={value => setFormData(prev => ({
                ...prev,
                address: value
              }))} placeholder="e.g., Knez Mihailova 42" label="Full Address" type="address" className="h-9 text-sm" onLocationSelect={handleLocationSelect} />
              </div>
              
              <div>
                <Label htmlFor="postalCode" className="text-xs font-medium text-gray-700 mb-1.5 block">Postal Code</Label>
                <Input id="postalCode" name="postalCode" value={formData.postalCode} onChange={handleChange} placeholder="e.g., 11000" className="h-9 text-sm" />
              </div>
            </div>
          </Card>

          {/* Property Type Section */}
          <Card className="p-4 border border-gray-100 shadow-sm bg-white">
            <div className="flex items-center gap-2 mb-3">
              <Building className="h-4 w-4 text-gray-500" />
              <h2 className="text-sm font-medium text-gray-900">Listing Type</h2>
            </div>
            <p className="text-xs text-gray-600 mb-4">What type of listing is this?</p>

            {/* Units Mode Toggle */}
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-4">
              <div>
                <p className="font-medium text-gray-900 text-xs">Property Structure</p>
                <p className="text-xs text-gray-500">Does this property have multiple units?</p>
              </div>
              <Button type="button" variant={useUnitsMode ? "default" : "outline"} size="sm" onClick={() => setUseUnitsMode(!useUnitsMode)} className="text-xs px-2 py-1 h-7">
                {useUnitsMode ? "Multiple Units" : "Single Unit"}
              </Button>
            </div>

            {/* Property Type Selection */}
            <div className="grid grid-cols-1 gap-2">
              {propertyTypes.map(type => <div key={type.value} className={`p-3 border rounded-lg cursor-pointer transition-all ${formData.type === type.value ? "border-blue-200 bg-blue-50" : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"}`} onClick={() => {
              setFormData(prev => ({
                ...prev,
                type: type.value,
                category: ""
              }));
              setUnits([]);
            }}>
                  <div className="flex items-start gap-2">
                    {React.cloneElement(getPropertyTypeIcon(type.value), {
                  className: `h-4 w-4 mt-0.5 ${formData.type === type.value ? "text-blue-600" : "text-gray-500"}`
                })}
                    <div className="flex-1">
                      <h4 className={`font-medium text-xs ${formData.type === type.value ? "text-blue-900" : "text-gray-900"}`}>
                        {type.label}
                      </h4>
                      <p className={`text-xs mt-0.5 ${formData.type === type.value ? "text-blue-700" : "text-gray-500"}`}>
                        {type.description}
                      </p>
                    </div>
                    {formData.type === type.value && <CheckCircle className="h-3 w-3 text-blue-600 mt-0.5" />}
                  </div>
                </div>)}
            </div>
          </Card>

          {/* Details Section */}
          {formData.type && <Card className="p-4 border border-gray-100 shadow-sm bg-white">
              <div className="flex items-center gap-2 mb-3">
                <Settings className="h-4 w-4 text-gray-500" />
                <h2 className="text-sm font-medium text-gray-900">Details</h2>
              </div>
              <p className="text-xs text-gray-600 mb-4">Configure the specific details of your listing</p>

              {/* Units Manager */}
              {useUnitsMode ? <UnitsManager propertyType={formData.type as PropertyType} units={units} onUnitsChange={setUnits} /> : <div className="mb-4">
                  <Label className="text-xs font-medium text-gray-700 mb-2 block">Specific Category</Label>
                  <div className="grid grid-cols-1 gap-2">
                    {getAvailableCategories().map(cat => <div key={cat.value} className={`p-3 border rounded-lg cursor-pointer transition-all ${formData.category === cat.value ? "border-blue-200 bg-blue-50" : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"}`} onClick={() => setFormData(prev => ({
                ...prev,
                category: cat.value
              }))}>
                        <div className="flex items-start gap-2">
                          <cat.Icon className={`h-4 w-4 mt-0.5 ${formData.category === cat.value ? "text-blue-600" : "text-gray-500"}`} />
                          <div className="flex-1">
                            <h4 className={`font-medium text-xs ${formData.category === cat.value ? "text-blue-900" : "text-gray-900"}`}>
                              {cat.label}
                            </h4>
                            <p className={`text-xs mt-0.5 ${formData.category === cat.value ? "text-blue-700" : "text-gray-500"}`}>
                              {cat.description}
                            </p>
                          </div>
                          {formData.category === cat.value && <CheckCircle className="h-3 w-3 text-blue-600 mt-0.5" />}
                        </div>
                      </div>)}
                  </div>
                </div>}

              {/* Occupancy and Tenant Info for Single Unit */}
              {!useUnitsMode && shouldShowTenantInfo() && formData.category && <div className="space-y-4">
                  <Separator />
                  
                  <div className="space-y-3">
                    <div>
                      <Label className="text-xs font-medium text-gray-700 mb-2 block">Occupancy Status</Label>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          {formData.occupancyStatus === "occupied" ? <>
                              <div className="flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full">
                                <Users className="h-3 w-3 text-blue-600" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900 text-xs">Occupied</p>
                                <p className="text-xs text-gray-500">Property has tenants</p>
                              </div>
                            </> : <>
                              <div className="flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full">
                                <UserX className="h-3 w-3 text-gray-600" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900 text-xs">Vacant</p>
                                <p className="text-xs text-gray-500">Property is available</p>
                              </div>
                            </>}
                        </div>
                        <Button type="button" variant="outline" size="sm" onClick={toggleOccupancyStatus} className="text-xs px-2 py-1 h-7">
                          Switch to {formData.occupancyStatus === "occupied" ? "Vacant" : "Occupied"}
                        </Button>
                      </div>
                    </div>

                    {/* Tenant Information */}
                    {formData.occupancyStatus === "occupied" && <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label className="text-xs font-medium text-gray-700">Tenant Information</Label>
                          
                          {/* Tenant Type Toggle - Smaller and More Elegant */}
                          <div className="flex bg-gray-50 border border-gray-100 rounded-md p-0.5">
                            <button type="button" onClick={() => setFormData(prev => ({
                      ...prev,
                      tenantType: "individual"
                    }))} className={`px-2 py-1 text-xs font-medium rounded-sm transition-all flex items-center gap-1 ${formData.tenantType === "individual" ? "bg-white text-gray-700 shadow-sm border border-gray-200" : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"}`}>
                              <Users className="h-3 w-3" />
                              Individual
                            </button>
                            <button type="button" onClick={() => setFormData(prev => ({
                      ...prev,
                      tenantType: "company"
                    }))} className={`px-2 py-1 text-xs font-medium rounded-sm transition-all flex items-center gap-1 ${formData.tenantType === "company" ? "bg-white text-gray-700 shadow-sm border border-gray-200" : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"}`}>
                              <Building2 className="h-3 w-3" />
                              Company
                            </button>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <Label htmlFor="tenantName" className="text-xs font-medium text-gray-700 mb-1.5 block">
                              {formData.tenantType === "individual" ? "Full Name" : "Company Name"}
                            </Label>
                            <Input id="tenantName" name="tenantName" value={formData.tenantName} onChange={handleChange} placeholder={formData.tenantType === "individual" ? "Enter tenant's full name" : "Enter company name"} className="h-9 text-sm" />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <Label htmlFor="tenantPhone" className="text-xs font-medium text-gray-700 mb-1.5 block">Phone</Label>
                              <Input id="tenantPhone" name="tenantPhone" value={formData.tenantPhone} onChange={handleChange} placeholder="Phone number" className="h-9 text-sm" />
                            </div>
                            <div>
                              <Label htmlFor="tenantEmail" className="text-xs font-medium text-gray-700 mb-1.5 block">Email</Label>
                              <Input id="tenantEmail" name="tenantEmail" value={formData.tenantEmail} onChange={handleChange} placeholder="Email address" className="h-9 text-sm" />
                            </div>
                          </div>
                        </div>
                      </div>}
                  </div>
                </div>}
            </Card>}

          {/* Notes Section */}
          <Card className="p-4 border border-gray-100 shadow-sm bg-white">
            <div className="flex items-center gap-2 mb-3">
              <MessageSquare className="h-4 w-4 text-gray-500" />
              <h2 className="text-sm font-medium text-gray-900">Notes</h2>
            </div>
            <p className="text-xs text-gray-600 mb-4">Add any additional information about this listing</p>
            
            <div>
              <Textarea id="notes" name="notes" value={formData.notes} onChange={handleChange} placeholder="Add any additional notes, special features, maintenance requirements, or important details..." className="min-h-[80px] resize-none text-sm" />
            </div>
          </Card>
        </div>
      </div>
    </div>;
}
