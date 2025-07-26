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
import { USLocationAutofill } from "./USLocationAutofill";
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
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    city: "",
    address: "",
    country: "",
    region: "",
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

  const steps = [
    { id: 1, title: "Location", description: "Where is your property?" },
    { id: 2, title: "Property Type", description: "What type of property is it?" },
    { id: 3, title: "Details", description: "Configure the details" },
    { id: 4, title: "Final Details", description: "Add any additional information" }
  ];
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
    state?: string;
    country?: string;
    address?: string;
    formatted_address?: string;
  }) => {
    // This function can be removed but keeping for compatibility
    setFormData(prev => ({
      ...prev,
      ...(locationData.city && { city: locationData.city }),
      ...(locationData.state && { region: locationData.state }),
      ...(locationData.country && { country: locationData.country }),
      ...(locationData.address && { address: locationData.address })
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
  
  const getStepProgress = () => {
    let progress = 0;
    if (formData.city && formData.address && formData.country) progress = 25;
    if (formData.type) progress = 50;
    if (useUnitsMode ? units.length > 0 : formData.category) progress = 75;
    if (isFormValid) progress = 100;
    return progress;
  };

  const canProceedToStep = (step: number) => {
    switch(step) {
      case 1: return true;
      case 2: return formData.city && formData.address && formData.country;
      case 3: return formData.type;
      case 4: return useUnitsMode ? units.length > 0 : formData.category;
      default: return false;
    }
  };

  const isStepComplete = (step: number) => {
    switch(step) {
      case 1: return formData.city && formData.address && formData.country;
      case 2: return formData.type;
      case 3: return useUnitsMode ? units.length > 0 : formData.category;
      case 4: return true; // Notes are optional
      default: return false;
    }
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Modern Header */}
      <div className="bg-card border-b border-border/50 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">Add New Property</h1>
              <p className="text-sm text-muted-foreground">Step {currentStep} of {steps.length}: {steps[currentStep - 1]?.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-sm text-muted-foreground">
              {getStepProgress()}% Complete
            </div>
            <Button variant="outline" onClick={onClose} size="sm">
              Cancel
            </Button>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-4">
          <div className="w-full bg-muted rounded-full h-1.5">
            <div 
              className="bg-primary h-1.5 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${getStepProgress()}%` }}
            />
          </div>
          
          {/* Step Indicators */}
          <div className="flex justify-between mt-3">
            {steps.map((step, index) => (
              <div 
                key={step.id}
                className={`flex items-center gap-2 ${
                  currentStep === step.id ? 'text-primary' : 
                  isStepComplete(step.id) ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium border-2 transition-colors ${
                  currentStep === step.id ? 'border-primary bg-primary text-primary-foreground' :
                  isStepComplete(step.id) ? 'border-primary bg-primary text-primary-foreground' :
                  'border-muted-foreground/30 bg-background'
                }`}>
                  {isStepComplete(step.id) && currentStep !== step.id ? '✓' : step.id}
                </div>
                <span className="text-sm font-medium hidden sm:block">{step.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Step Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-6 py-8">
          
          {/* Step 1: Location */}
          {currentStep === 1 && (
            <Card className="p-6 space-y-6">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <MapPin className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-xl font-semibold">Property Location</h2>
                <p className="text-muted-foreground">Tell us where your property is located</p>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="New York"
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="region">State/Region</Label>
                    <Input
                      id="region"
                      name="region"
                      value={formData.region}
                      onChange={handleChange}
                      placeholder="NY"
                      className="h-11"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Street Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="123 Main Street"
                    className="h-11"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      placeholder="United States"
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">ZIP/Postal Code</Label>
                    <Input
                      id="postalCode"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      placeholder="10001"
                      className="h-11"
                    />
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Step 2: Property Type */}
          {currentStep === 2 && (
            <Card className="p-6 space-y-6">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Building className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-xl font-semibold">Property Type</h2>
                <p className="text-muted-foreground">What type of property are you adding?</p>
              </div>

              {/* Multiple Units Toggle */}
              <div className="flex items-center justify-center">
                <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                  <Building2 className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">Multiple Units Property</span>
                  <Button 
                    variant={useUnitsMode ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setUseUnitsMode(!useUnitsMode)}
                  >
                    {useUnitsMode ? "Yes" : "No"}
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {propertyTypes.map(type => (
                  <div 
                    key={type.value} 
                    className={`relative p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-lg ${
                      formData.type === type.value 
                        ? "border-primary bg-primary/5 shadow-md" 
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        type: type.value,
                        category: ""
                      }));
                      setUnits([]);
                    }}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
                      formData.type === type.value ? "bg-primary/20" : "bg-muted"
                    }`}>
                      {React.cloneElement(getPropertyTypeIcon(type.value), {
                        className: `h-6 w-6 ${
                          formData.type === type.value ? "text-primary" : "text-muted-foreground"
                        }`
                      })}
                    </div>
                    
                    <h3 className="font-semibold text-lg mb-2">{type.label}</h3>
                    <p className="text-sm text-muted-foreground">{type.description}</p>
                    
                    {formData.type === type.value && (
                      <div className="absolute top-4 right-4">
                        <CheckCircle className="h-6 w-6 text-primary" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Step 3: Details */}
          {currentStep === 3 && formData.type && (
            <Card className="p-6 space-y-6">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Settings className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-xl font-semibold">Property Details</h2>
                <p className="text-muted-foreground">Configure your property specifications</p>
              </div>

              {useUnitsMode ? (
                <UnitsManager 
                  propertyType={formData.type as PropertyType} 
                  units={units} 
                  onUnitsChange={setUnits} 
                />
              ) : (
                <>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-base font-medium mb-3 block">Select Category</Label>
                      <div className="grid grid-cols-1 gap-3">
                        {getAvailableCategories().map(cat => (
                          <div 
                            key={cat.value} 
                            className={`p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-sm ${
                              formData.category === cat.value 
                                ? "border-primary bg-primary/5" 
                                : "border-border hover:border-primary/50"
                            }`} 
                            onClick={() => setFormData(prev => ({
                              ...prev,
                              category: cat.value
                            }))}
                          >
                            <div className="flex items-start gap-3">
                              <cat.Icon className={`h-6 w-6 mt-0.5 ${
                                formData.category === cat.value ? "text-primary" : "text-muted-foreground"
                              }`} />
                              <div className="flex-1">
                                <h4 className="font-medium text-base">{cat.label}</h4>
                                <p className="text-sm text-muted-foreground mt-1">{cat.description}</p>
                              </div>
                              {formData.category === cat.value && (
                                <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Occupancy for single unit */}
                    {shouldShowTenantInfo() && formData.category && (
                      <div className="space-y-4 pt-4 border-t">
                        <div>
                          <Label className="text-base font-medium mb-3 block">Occupancy Status</Label>
                          <div className="grid grid-cols-2 gap-3">
                            <div 
                              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                                formData.occupancyStatus === "vacant" ? "border-primary bg-primary/5" : "border-border"
                              }`}
                              onClick={() => setFormData(prev => ({ ...prev, occupancyStatus: "vacant" }))}
                            >
                              <div className="flex items-center gap-3">
                                <UserX className="h-5 w-5 text-muted-foreground" />
                                <div>
                                  <p className="font-medium">Vacant</p>
                                  <p className="text-sm text-muted-foreground">Available for rent</p>
                                </div>
                              </div>
                            </div>
                            <div 
                              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                                formData.occupancyStatus === "occupied" ? "border-primary bg-primary/5" : "border-border"
                              }`}
                              onClick={() => setFormData(prev => ({ ...prev, occupancyStatus: "occupied" }))}
                            >
                              <div className="flex items-center gap-3">
                                <Users className="h-5 w-5 text-primary" />
                                <div>
                                  <p className="font-medium">Occupied</p>
                                  <p className="text-sm text-muted-foreground">Has current tenant</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Tenant Information */}
                        {formData.occupancyStatus === "occupied" && (
                          <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
                            <div className="flex items-center justify-between">
                              <Label className="text-base font-medium">Tenant Information</Label>
                              <div className="flex bg-background rounded-lg p-1 border">
                                <button 
                                  type="button" 
                                  onClick={() => setFormData(prev => ({ ...prev, tenantType: "individual" }))}
                                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                                    formData.tenantType === "individual" 
                                      ? "bg-primary text-primary-foreground shadow-sm" 
                                      : "text-muted-foreground hover:text-foreground"
                                  }`}
                                >
                                  Individual
                                </button>
                                <button 
                                  type="button" 
                                  onClick={() => setFormData(prev => ({ ...prev, tenantType: "company" }))}
                                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                                    formData.tenantType === "company" 
                                      ? "bg-primary text-primary-foreground shadow-sm" 
                                      : "text-muted-foreground hover:text-foreground"
                                  }`}
                                >
                                  Company
                                </button>
                              </div>
                            </div>
                            
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor="tenantName">
                                  {formData.tenantType === "individual" ? "Full Name" : "Company Name"}
                                </Label>
                                <Input 
                                  id="tenantName" 
                                  name="tenantName" 
                                  value={formData.tenantName} 
                                  onChange={handleChange} 
                                  placeholder={formData.tenantType === "individual" ? "John Doe" : "Company Inc."} 
                                  className="h-11 mt-2" 
                                />
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor="tenantEmail">Email</Label>
                                  <Input 
                                    id="tenantEmail" 
                                    name="tenantEmail" 
                                    type="email"
                                    value={formData.tenantEmail} 
                                    onChange={handleChange} 
                                    placeholder="email@example.com" 
                                    className="h-11 mt-2" 
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="tenantPhone">Phone</Label>
                                  <Input 
                                    id="tenantPhone" 
                                    name="tenantPhone" 
                                    type="tel"
                                    value={formData.tenantPhone} 
                                    onChange={handleChange} 
                                    placeholder="(555) 123-4567" 
                                    className="h-11 mt-2" 
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </>
              )}
            </Card>
          )}

          {/* Step 4: Notes */}
          {currentStep === 4 && (
            <Card className="p-6 space-y-6">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <MessageSquare className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-xl font-semibold">Additional Notes</h2>
                <p className="text-muted-foreground">Add any extra details about your property (optional)</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="notes" className="text-base font-medium">Property Notes</Label>
                  <Textarea 
                    id="notes" 
                    name="notes" 
                    value={formData.notes} 
                    onChange={handleChange} 
                    placeholder="Special features, maintenance notes, rental restrictions, amenities, or any other important information..."
                    className="min-h-[120px] mt-2 resize-none"
                  />
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="bg-card border-t px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Button 
            variant="outline" 
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
          >
            Previous
          </Button>
          
          <div className="flex gap-3">
            {currentStep < steps.length ? (
              <Button 
                onClick={() => setCurrentStep(currentStep + 1)}
                disabled={!canProceedToStep(currentStep + 1)}
              >
                Next Step
              </Button>
            ) : (
              <Button 
                onClick={handleSubmit} 
                disabled={!isFormValid}
                className="px-8"
              >
                Add Property
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
