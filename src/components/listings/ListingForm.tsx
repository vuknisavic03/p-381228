import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Home, Building2, Factory, Store, Building, Warehouse, Hotel, Bed, Users, UserX, Building as BuildingIcon, Store as StoreIcon, Hotel as HotelIcon, CheckCircle, MapPin, FileText, Settings, MessageSquare, ChevronLeft, ChevronRight, Check } from "lucide-react";
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
    <div className="flex flex-col h-full bg-gradient-to-br from-background to-muted/20">
      {/* Modern Header */}
      <div className="bg-card/80 backdrop-blur-lg border-b border-border/50 px-6 py-5 sticky top-0 z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Add New Property
              </h1>
              <p className="text-sm text-muted-foreground">
                Step {currentStep} of {steps.length}: {steps[currentStep - 1]?.description}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-muted/50 rounded-full">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-xs font-medium text-muted-foreground">
                {getStepProgress()}% Complete
              </span>
            </div>
            <Button variant="ghost" onClick={onClose} size="sm" className="hover:bg-destructive/10 hover:text-destructive">
              Cancel
            </Button>
          </div>
        </div>
        
        {/* Enhanced Progress Bar */}
        <div className="mt-5">
          <div className="relative w-full bg-muted/50 rounded-full h-2 overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-primary/80 rounded-full transition-all duration-500 ease-out shadow-sm"
              style={{ width: `${getStepProgress()}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
            </div>
          </div>
          
          {/* Enhanced Step Indicators */}
          <div className="flex justify-between mt-4">
            {steps.map((step) => (
              <button
                key={step.id}
                onClick={() => {
                  if (step.id < currentStep || canProceedToStep(step.id)) {
                    setCurrentStep(step.id);
                  }
                }}
                disabled={step.id > currentStep && !canProceedToStep(step.id)}
                className={`flex items-center gap-2 transition-all duration-200 disabled:cursor-not-allowed group ${
                  currentStep === step.id ? 'text-primary scale-105' : 
                  isStepComplete(step.id) ? 'text-primary hover:scale-105' : 
                  'text-muted-foreground hover:text-foreground'
                }`}
              >
                <div className={`relative w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-200 ${
                  currentStep === step.id ? 'border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/25' :
                  isStepComplete(step.id) ? 'border-primary bg-primary text-primary-foreground' :
                  step.id < currentStep ? 'border-primary/50 bg-primary/10 text-primary cursor-pointer hover:bg-primary/20' :
                  'border-muted-foreground/30 bg-background group-hover:border-primary/40'
                }`}>
                  {isStepComplete(step.id) && currentStep !== step.id ? (
                    <Check className="h-4 w-4" />
                  ) : step.id < currentStep ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    step.id
                  )}
                  {currentStep === step.id && (
                    <div className="absolute inset-0 rounded-full border-2 border-primary animate-ping opacity-30" />
                  )}
                </div>
                <span className="text-sm font-medium hidden sm:block group-hover:text-primary transition-colors">
                  {step.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Step Content with Animation */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-6 py-8">
          <div className="animate-fade-in">
            
            {/* Step 1: Location */}
            {currentStep === 1 && (
              <Card className="p-8 space-y-8 border-0 shadow-xl bg-card/50 backdrop-blur-sm">
                <div className="text-center space-y-3">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                    <MapPin className="h-10 w-10 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">Property Location</h2>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Tell us where your property is located so we can help you manage it effectively
                  </p>
                </div>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="city" className="text-base font-medium">City *</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="New York"
                        className="h-12 text-base border-2 focus:border-primary transition-colors"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="region" className="text-base font-medium">State/Region *</Label>
                      <Input
                        id="region"
                        name="region"
                        value={formData.region}
                        onChange={handleChange}
                        placeholder="NY"
                        className="h-12 text-base border-2 focus:border-primary transition-colors"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-base font-medium">Street Address *</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="123 Main Street"
                      className="h-12 text-base border-2 focus:border-primary transition-colors"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="country" className="text-base font-medium">Country *</Label>
                      <Input
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        placeholder="United States"
                        className="h-12 text-base border-2 focus:border-primary transition-colors"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postalCode" className="text-base font-medium">ZIP/Postal Code</Label>
                      <Input
                        id="postalCode"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        placeholder="10001"
                        className="h-12 text-base border-2 focus:border-primary transition-colors"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Step 2: Property Type */}
            {currentStep === 2 && (
              <Card className="p-8 space-y-8 border-0 shadow-xl bg-card/50 backdrop-blur-sm">
                <div className="text-center space-y-3">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                    <Building className="h-10 w-10 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">Property Type</h2>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    What type of property are you adding to your portfolio?
                  </p>
                </div>

                {/* Enhanced Multiple Units Toggle */}
                <div className="flex items-center justify-center">
                  <div className="flex items-center gap-4 p-5 bg-gradient-to-r from-muted/50 to-muted/30 rounded-xl border">
                    <Building2 className="h-6 w-6 text-primary" />
                    <span className="font-semibold text-lg">Multiple Units Property</span>
                    <Button 
                      variant={useUnitsMode ? "default" : "secondary"} 
                      size="lg"
                      onClick={() => setUseUnitsMode(!useUnitsMode)}
                      className="text-base px-6 min-w-[80px] transition-all duration-200"
                    >
                      {useUnitsMode ? "Yes" : "No"}
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {propertyTypes.map((type, index) => (
                    <div 
                      key={type.value} 
                      className={`relative p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                        formData.type === type.value 
                          ? "border-primary bg-gradient-to-br from-primary/10 to-primary/5 shadow-lg shadow-primary/20" 
                          : "border-border hover:border-primary/50 bg-gradient-to-br from-background to-muted/20"
                      }`}
                      onClick={() => {
                        setFormData(prev => ({
                          ...prev,
                          type: type.value,
                          category: ""
                        }));
                        setUnits([]);
                      }}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 ${
                        formData.type === type.value ? "bg-primary/20 scale-110" : "bg-muted hover:bg-primary/10"
                      }`}>
                        {React.cloneElement(getPropertyTypeIcon(type.value), {
                          className: `h-7 w-7 transition-colors ${
                            formData.type === type.value ? "text-primary" : "text-muted-foreground"
                          }`
                        })}
                      </div>
                      
                      <h3 className="font-bold text-xl mb-2">{type.label}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{type.description}</p>
                      
                      {formData.type === type.value && (
                        <div className="absolute top-4 right-4">
                          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                            <Check className="h-5 w-5 text-primary-foreground" />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Step 3: Details */}
            {currentStep === 3 && formData.type && (
              <Card className="p-8 space-y-8 border-0 shadow-xl bg-card/50 backdrop-blur-sm">
                <div className="text-center space-y-3">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                    <Settings className="h-10 w-10 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">Property Details</h2>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Configure your property specifications and tenant information
                  </p>
                </div>

                {useUnitsMode ? (
                  <div className="bg-gradient-to-br from-muted/20 to-muted/10 rounded-xl p-6">
                    <UnitsManager 
                      propertyType={formData.type as PropertyType} 
                      units={units} 
                      onUnitsChange={setUnits} 
                    />
                  </div>
                ) : (
                  <div className="space-y-8">
                    <div>
                      <Label className="text-xl font-semibold mb-4 block">Select Category *</Label>
                      <div className="grid grid-cols-1 gap-4">
                        {getAvailableCategories().map((cat, index) => (
                          <div 
                            key={cat.value} 
                            className={`p-5 border-2 rounded-xl cursor-pointer transition-all duration-300 hover:shadow-lg ${
                              formData.category === cat.value 
                                ? "border-primary bg-gradient-to-r from-primary/10 to-primary/5 shadow-md" 
                                : "border-border hover:border-primary/50 bg-gradient-to-r from-background to-muted/10"
                            }`} 
                            onClick={() => setFormData(prev => ({
                              ...prev,
                              category: cat.value
                            }))}
                            style={{ animationDelay: `${index * 100}ms` }}
                          >
                            <div className="flex items-start gap-4">
                              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                                formData.category === cat.value ? "bg-primary/20" : "bg-muted"
                              }`}>
                                <cat.Icon className={`h-6 w-6 ${
                                  formData.category === cat.value ? "text-primary" : "text-muted-foreground"
                                }`} />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold text-lg">{cat.label}</h4>
                                <p className="text-muted-foreground mt-1">{cat.description}</p>
                              </div>
                              {formData.category === cat.value && (
                                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                                  <Check className="h-4 w-4 text-primary-foreground" />
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Enhanced Occupancy Section */}
                    {shouldShowTenantInfo() && formData.category && (
                      <div className="space-y-6 pt-6 border-t-2 border-border/50">
                        <div>
                          <Label className="text-xl font-semibold mb-4 block">Occupancy Status</Label>
                          <div className="grid grid-cols-2 gap-4">
                            <div 
                              className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 hover:shadow-lg ${
                                formData.occupancyStatus === "vacant" 
                                  ? "border-primary bg-gradient-to-br from-primary/10 to-primary/5 shadow-md" 
                                  : "border-border hover:border-primary/50"
                              }`}
                              onClick={() => setFormData(prev => ({ 
                                ...prev, 
                                occupancyStatus: "vacant",
                                tenantName: "",
                                tenantPhone: "",
                                tenantEmail: ""
                              }))}
                            >
                              <div className="flex flex-col items-center gap-3 text-center">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                                  formData.occupancyStatus === "vacant" ? "bg-primary/20" : "bg-muted"
                                }`}>
                                  <UserX className={`h-6 w-6 ${
                                    formData.occupancyStatus === "vacant" ? "text-primary" : "text-muted-foreground"
                                  }`} />
                                </div>
                                <div>
                                  <p className="font-semibold text-lg">Vacant</p>
                                  <p className="text-sm text-muted-foreground">Available for rent</p>
                                </div>
                              </div>
                            </div>
                            <div 
                              className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 hover:shadow-lg ${
                                formData.occupancyStatus === "occupied" 
                                  ? "border-primary bg-gradient-to-br from-primary/10 to-primary/5 shadow-md" 
                                  : "border-border hover:border-primary/50"
                              }`}
                              onClick={() => setFormData(prev => ({ ...prev, occupancyStatus: "occupied" }))}
                            >
                              <div className="flex flex-col items-center gap-3 text-center">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                                  formData.occupancyStatus === "occupied" ? "bg-primary/20" : "bg-muted"
                                }`}>
                                  <Users className={`h-6 w-6 ${
                                    formData.occupancyStatus === "occupied" ? "text-primary" : "text-muted-foreground"
                                  }`} />
                                </div>
                                <div>
                                  <p className="font-semibold text-lg">Occupied</p>
                                  <p className="text-sm text-muted-foreground">Has current tenant</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Enhanced Tenant Information */}
                        {formData.occupancyStatus === "occupied" && (
                          <div className="space-y-6 p-6 bg-gradient-to-br from-muted/30 to-muted/10 rounded-xl border">
                            <div className="flex items-center justify-between">
                              <Label className="text-lg font-semibold">Tenant Information</Label>
                              <div className="flex bg-background rounded-lg p-1 border-2">
                                <button 
                                  type="button" 
                                  onClick={() => setFormData(prev => ({ ...prev, tenantType: "individual" }))}
                                  className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                                    formData.tenantType === "individual" 
                                      ? "bg-primary text-primary-foreground shadow-sm" 
                                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                  }`}
                                >
                                  <Users className="h-4 w-4 inline mr-2" />
                                  Individual
                                </button>
                                <button 
                                  type="button" 
                                  onClick={() => setFormData(prev => ({ ...prev, tenantType: "company" }))}
                                  className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                                    formData.tenantType === "company" 
                                      ? "bg-primary text-primary-foreground shadow-sm" 
                                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                  }`}
                                >
                                  <Building2 className="h-4 w-4 inline mr-2" />
                                  Company
                                </button>
                              </div>
                            </div>
                            
                            <div className="space-y-6">
                              <div>
                                <Label htmlFor="tenantName" className="text-base font-medium">
                                  {formData.tenantType === "individual" ? "Full Name" : "Company Name"} *
                                </Label>
                                <Input 
                                  id="tenantName" 
                                  name="tenantName" 
                                  value={formData.tenantName} 
                                  onChange={handleChange} 
                                  placeholder={formData.tenantType === "individual" ? "John Doe" : "Company Inc."} 
                                  className="h-12 mt-2 text-base border-2 focus:border-primary transition-colors" 
                                />
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                  <Label htmlFor="tenantEmail" className="text-base font-medium">Email</Label>
                                  <Input 
                                    id="tenantEmail" 
                                    name="tenantEmail" 
                                    type="email"
                                    value={formData.tenantEmail} 
                                    onChange={handleChange} 
                                    placeholder="email@example.com" 
                                    className="h-12 mt-2 text-base border-2 focus:border-primary transition-colors" 
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="tenantPhone" className="text-base font-medium">Phone</Label>
                                  <Input 
                                    id="tenantPhone" 
                                    name="tenantPhone" 
                                    type="tel"
                                    value={formData.tenantPhone} 
                                    onChange={handleChange} 
                                    placeholder="(555) 123-4567" 
                                    className="h-12 mt-2 text-base border-2 focus:border-primary transition-colors" 
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </Card>
            )}

            {/* Step 4: Notes */}
            {currentStep === 4 && (
              <Card className="p-8 space-y-8 border-0 shadow-xl bg-card/50 backdrop-blur-sm">
                <div className="text-center space-y-3">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                    <MessageSquare className="h-10 w-10 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">Additional Notes</h2>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Add any extra details about your property that might be helpful later
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="notes" className="text-lg font-semibold">Property Notes (Optional)</Label>
                    <Textarea 
                      id="notes" 
                      name="notes" 
                      value={formData.notes} 
                      onChange={handleChange} 
                      placeholder="• Special features or amenities&#10;• Maintenance notes or requirements&#10;• Rental restrictions or policies&#10;• Parking information&#10;• Any other important details..."
                      className="min-h-[140px] mt-3 text-base border-2 focus:border-primary transition-colors resize-none"
                    />
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Enhanced Navigation Footer */}
      <div className="bg-card/80 backdrop-blur-lg border-t border-border/50 px-6 py-5">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Button 
            variant="outline" 
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className="px-6 py-3 h-auto text-base"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          
          <div className="flex items-center gap-4">
            {/* Step indicator for mobile */}
            <div className="flex sm:hidden text-sm text-muted-foreground">
              {currentStep} / {steps.length}
            </div>
            
            {currentStep < steps.length ? (
              <Button 
                onClick={() => setCurrentStep(currentStep + 1)}
                disabled={!canProceedToStep(currentStep + 1)}
                className="px-6 py-3 h-auto text-base bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Next Step
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button 
                onClick={handleSubmit} 
                disabled={!isFormValid}
                className="px-8 py-3 h-auto text-base bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Check className="h-4 w-4 mr-2" />
                Add Property
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
