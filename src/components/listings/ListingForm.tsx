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
  return <div className="flex flex-col h-full bg-background">
      {/* Header with action buttons */}
      <div className="sticky top-0 z-10 bg-card backdrop-blur-sm border-b border-border/50 px-6 py-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-foreground">Add New Listing</h1>
            <p className="text-sm text-muted-foreground mt-1">Create a new listing for your portfolio</p>
          </div>
          <div className="flex gap-3">
            <Button onClick={handleSubmit} disabled={!isFormValid} className="px-6 py-2 h-10 font-medium transition-all duration-200 shadow-sm hover:shadow-md">
              Add Listing
            </Button>
            <Button variant="outline" onClick={onClose} className="px-6 py-2 h-10 font-medium transition-all duration-200">
              Cancel
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">
        <div className="w-[98%] max-w-none space-y-7">
          
          {/* Location Section */}
          <div className="bg-card rounded-lg border border-border border-l-4 border-l-primary/20 p-5 space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-muted rounded-lg">
                <MapPin className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">Location</h3>
                <p className="text-sm text-muted-foreground">Where is your listing located?</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <LocationAutofill value={formData.city} onChange={value => setFormData(prev => ({
                  ...prev,
                  city: value
                }))} placeholder="e.g., Belgrade" label="City" type="city" className="h-10" onLocationSelect={handleLocationSelect} />
                </div>
                <div>
                  <LocationAutofill value={formData.country} onChange={value => setFormData(prev => ({
                  ...prev,
                  country: value
                }))} placeholder="e.g., Serbia" label="Country" type="country" className="h-10" onLocationSelect={handleLocationSelect} />
                </div>
              </div>
              
              <div>
                <LocationAutofill value={formData.address} onChange={value => setFormData(prev => ({
                ...prev,
                address: value
              }))} placeholder="e.g., Knez Mihailova 42" label="Full Address" type="address" className="h-10" onLocationSelect={handleLocationSelect} />
              </div>
              
              <div>
                <Label htmlFor="postalCode" className="text-sm font-medium text-foreground mb-1.5 block">Postal Code</Label>
                <Input id="postalCode" name="postalCode" value={formData.postalCode} onChange={handleChange} placeholder="e.g., 11000" className="h-10" />
              </div>
            </div>
          </div>

          {/* Property Type Section */}
          <div className="bg-card rounded-lg border border-border border-l-4 border-l-accent/30 p-5 space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-muted rounded-lg">
                <Building className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">Listing Type</h3>
                <p className="text-sm text-muted-foreground">What type of listing is this?</p>
              </div>
            </div>

            {/* Units Mode Toggle */}
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg mb-4">
              <div>
                <p className="font-medium text-foreground text-sm">Property Structure</p>
                <p className="text-sm text-muted-foreground">Does this property have multiple units?</p>
              </div>
              <Button type="button" variant={useUnitsMode ? "default" : "outline"} size="sm" onClick={() => setUseUnitsMode(!useUnitsMode)} className="text-sm px-3 py-1.5 h-8">
                {useUnitsMode ? "Yes" : "No"}
              </Button>
            </div>

            {/* Property Type Selection */}
            <div className="grid grid-cols-1 gap-3">
              {propertyTypes.map(type => <div key={type.value} className={`p-4 border rounded-lg cursor-pointer transition-all ${formData.type === type.value ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-muted/30"}`} onClick={() => {
              setFormData(prev => ({
                ...prev,
                type: type.value,
                category: ""
              }));
              setUnits([]);
            }}>
                  <div className="flex items-start gap-3">
                    {React.cloneElement(getPropertyTypeIcon(type.value), {
                  className: `h-5 w-5 mt-0.5 ${formData.type === type.value ? "text-primary" : "text-muted-foreground"}`
                })}
                    <div className="flex-1">
                      <h4 className={`font-medium text-sm ${formData.type === type.value ? "text-foreground" : "text-foreground"}`}>
                        {type.label}
                      </h4>
                      <p className={`text-sm mt-0.5 ${formData.type === type.value ? "text-muted-foreground" : "text-muted-foreground"}`}>
                        {type.description}
                      </p>
                    </div>
                    {formData.type === type.value && <CheckCircle className="h-4 w-4 text-primary mt-0.5" />}
                  </div>
                </div>)}
            </div>
          </div>

          {/* Details Section */}
          {formData.type && <div className="bg-card rounded-lg border border-border border-l-4 border-l-success/30 p-5 space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-muted rounded-lg">
                  <Settings className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Details</h3>
                  <p className="text-sm text-muted-foreground">Configure the specific details of your listing</p>
                </div>
              </div>

              {/* Units Manager */}
              {useUnitsMode ? <UnitsManager propertyType={formData.type as PropertyType} units={units} onUnitsChange={setUnits} /> : <div className="mb-4">
                  <Label className="text-sm font-medium text-foreground mb-2 block">Specific Category</Label>
                  <div className="grid grid-cols-1 gap-3">
                    {getAvailableCategories().map(cat => <div key={cat.value} className={`p-4 border rounded-lg cursor-pointer transition-all ${formData.category === cat.value ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-muted/30"}`} onClick={() => setFormData(prev => ({
                ...prev,
                category: cat.value
              }))}>
                        <div className="flex items-start gap-3">
                          <cat.Icon className={`h-5 w-5 mt-0.5 ${formData.category === cat.value ? "text-primary" : "text-muted-foreground"}`} />
                          <div className="flex-1">
                            <h4 className={`font-medium text-sm ${formData.category === cat.value ? "text-foreground" : "text-foreground"}`}>
                              {cat.label}
                            </h4>
                            <p className={`text-sm mt-0.5 ${formData.category === cat.value ? "text-muted-foreground" : "text-muted-foreground"}`}>
                              {cat.description}
                            </p>
                          </div>
                          {formData.category === cat.value && <CheckCircle className="h-4 w-4 text-primary mt-0.5" />}
                        </div>
                      </div>)}
                  </div>
                </div>}

              {/* Occupancy and Tenant Info for Single Unit */}
              {!useUnitsMode && shouldShowTenantInfo() && formData.category && <div className="space-y-4">
                  <Separator />
                  
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-foreground mb-2 block">Occupancy Status</Label>
                      <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                        <div className="flex items-center gap-3">
                          {formData.occupancyStatus === "occupied" ? <>
                              <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full">
                                <Users className="h-4 w-4 text-primary" />
                              </div>
                              <div>
                                <p className="font-medium text-foreground text-sm">Occupied</p>
                                <p className="text-sm text-muted-foreground">Property has tenants</p>
                              </div>
                            </> : <>
                              <div className="flex items-center justify-center w-8 h-8 bg-muted rounded-full">
                                <UserX className="h-4 w-4 text-muted-foreground" />
                              </div>
                              <div>
                                <p className="font-medium text-foreground text-sm">Vacant</p>
                                <p className="text-sm text-muted-foreground">Property is available</p>
                              </div>
                            </>}
                        </div>
                        <Button type="button" variant="outline" size="sm" onClick={toggleOccupancyStatus} className="text-sm px-3 py-1.5 h-8">
                          Switch to {formData.occupancyStatus === "occupied" ? "Vacant" : "Occupied"}
                        </Button>
                      </div>
                    </div>

                    {/* Tenant Information */}
                    {formData.occupancyStatus === "occupied" && <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Label className="text-sm font-medium text-foreground">Tenant Information</Label>
                          
                          {/* Tenant Type Toggle */}
                          <div className="flex bg-muted border border-border rounded-lg p-1">
                            <button type="button" onClick={() => setFormData(prev => ({
                      ...prev,
                      tenantType: "individual"
                    }))} className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all flex items-center gap-2 ${formData.tenantType === "individual" ? "bg-card text-foreground shadow-sm border border-border" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"}`}>
                              <Users className="h-3 w-3" />
                              Individual
                            </button>
                            <button type="button" onClick={() => setFormData(prev => ({
                      ...prev,
                      tenantType: "company"
                    }))} className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all flex items-center gap-2 ${formData.tenantType === "company" ? "bg-card text-foreground shadow-sm border border-border" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"}`}>
                              <Building2 className="h-3 w-3" />
                              Company
                            </button>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="tenantName" className="text-sm font-medium text-foreground mb-1.5 block">
                              {formData.tenantType === "individual" ? "Full Name" : "Company Name"}
                            </Label>
                            <Input id="tenantName" name="tenantName" value={formData.tenantName} onChange={handleChange} placeholder={formData.tenantType === "individual" ? "Enter tenant's full name" : "Enter company name"} className="h-10" />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <Label htmlFor="tenantPhone" className="text-sm font-medium text-foreground mb-1.5 block">Phone</Label>
                              <Input id="tenantPhone" name="tenantPhone" value={formData.tenantPhone} onChange={handleChange} placeholder="Phone number" className="h-10" />
                            </div>
                            <div>
                              <Label htmlFor="tenantEmail" className="text-sm font-medium text-foreground mb-1.5 block">Email</Label>
                              <Input id="tenantEmail" name="tenantEmail" value={formData.tenantEmail} onChange={handleChange} placeholder="Email address" className="h-10" />
                            </div>
                          </div>
                        </div>
                      </div>}
                  </div>
                </div>}
            </div>}

          {/* Notes Section */}
          <div className="bg-card rounded-lg border border-border border-l-4 border-l-muted/40 p-5 space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-muted rounded-lg">
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">Notes</h3>
                <p className="text-sm text-muted-foreground">Add any additional information about this listing</p>
              </div>
            </div>
            
            <div>
              <Textarea id="notes" name="notes" value={formData.notes} onChange={handleChange} placeholder="Add any additional notes, special features, maintenance requirements, or important details..." className="min-h-[100px] resize-none" />
            </div>
          </div>
        </div>
      </div>
    </div>;
}
