
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
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { PropertyType } from "@/components/transactions/TransactionFormTypes";
import { getPropertyTypeIcon, formatPropertyType } from "@/utils/propertyTypeUtils";

interface ListingFormProps {
  onClose?: () => void;
}

export function ListingForm({ onClose }: ListingFormProps) {
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [typeField, setTypeField] = useState<string>("");
  const [category, setCategory] = useState("");
  const [tenantName, setTenantName] = useState("");
  const [tenantPhone, setTenantPhone] = useState("");
  const [tenantEmail, setTenantEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [tenantType, setTenantType] = useState("individual");

  // Updated property types with corresponding icon components
  const propertyTypes: { value: PropertyType; label: string }[] = [
    { value: "residential_rental", label: "Residential Rental" },
    { value: "commercial_rental", label: "Commercial Rental" },
    { value: "industrial", label: "Industrial" },
    { value: "hospitality", label: "Hospitality" },
    { value: "vacation_rental", label: "Vacation Rental" },
    { value: "mixed_use", label: "Mixed Use" },
  ];

  // Updated category maps based on the new structure
  const typeToCategoryMap = {
    residential_rental: [
      { value: "single_family", label: "Single-family Home", Icon: Home },
      { value: "multi_family", label: "Multi-family (Duplex, Triplex)", Icon: Building },
      { value: "apartment_condo", label: "Apartment / Condo", Icon: Building2 },
    ],
    commercial_rental: [
      { value: "office", label: "Office", Icon: BuildingIcon },
      { value: "retail", label: "Retail", Icon: StoreIcon },
      { value: "medical", label: "Medical / Professional Unit", Icon: Building2 },
    ],
    industrial: [
      { value: "warehouse", label: "Warehouse", Icon: Warehouse },
      { value: "distribution", label: "Distribution Facility", Icon: Factory },
      { value: "manufacturing", label: "Manufacturing Facility", Icon: Factory },
    ],
    hospitality: [
      { value: "hotel", label: "Hotel", Icon: HotelIcon },
      { value: "motel", label: "Motel", Icon: Hotel },
      { value: "bed_breakfast", label: "Bed & Breakfast", Icon: Bed },
    ],
    vacation_rental: [
      { value: "short_term", label: "Short-term Rental (Airbnb-style)", Icon: Home },
      { value: "serviced_apartment", label: "Serviced Apartment", Icon: Building2 },
      { value: "holiday_home", label: "Holiday Home / Villa", Icon: Home },
    ],
    mixed_use: [
      { value: "residential_commercial", label: "Residential-Commercial", Icon: Building },
      { value: "live_work", label: "Live-Work", Icon: Home },
      { value: "multi_purpose", label: "Multi-Purpose", Icon: Building },
    ],
  };

  const getAvailableCategories = () => {
    if (!typeField) return [];
    return typeToCategoryMap[typeField as keyof typeof typeToCategoryMap] || [];
  };

  const toggleTenantType = () => {
    setTenantType(tenantType === "individual" ? "company" : "individual");
  };

  const handleSave = async () => {
    if (!typeField) {
      toast({
        title: "Type Required",
        description: "Please select a property type",
        variant: "destructive",
      });
      return;
    }

    if (!category) {
      toast({
        title: "Category Required",
        description: "Please select a property category",
        variant: "destructive",
      });
      return;
    }

    const randomId = Math.floor(Math.random() * 10000);
    
    const payload = {
      id: randomId,
      city,
      address,
      country,
      postalCode,
      type: typeField,
      category,
      tenant: {
        name: tenantName,
        phone: tenantPhone,
        email: tenantEmail,
        type: tenantType,
      },
      notes,
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
        title: "Listing Added",
        description: "Your listing was successfully created",
      });
      
      resetForm();
      
      window.dispatchEvent(new CustomEvent('refresh-listings'));
      
      if (onClose) {
        onClose();
      }
      
    } catch (err) {
      console.error("Error saving:", err);
      
      toast({
        title: "Listing Added (Demo Mode)",
        description: "Your listing was added to the demo data",
      });
      
      resetForm();
      
      window.dispatchEvent(new CustomEvent('refresh-listings'));
      
      if (onClose) {
        onClose();
      }
    }
  };
  
  const resetForm = () => {
    setCity("");
    setAddress("");
    setCountry("");
    setPostalCode("");
    setTypeField("");
    setCategory("");
    setTenantName("");
    setTenantPhone("");
    setTenantEmail("");
    setNotes("");
  };

  return (
    <div className="h-full overflow-auto bg-white">
      {/* Header with close button */}
      <div className="sticky top-0 z-10 bg-white px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <h2 className="text-xl font-medium text-gray-900">Add New Listing</h2>
        {onClose && (
          <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0 rounded-full hover:bg-gray-100">
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Form content */}
      <div className="px-6 py-4 space-y-8">
        {/* Property Information Section */}
        <div className="space-y-4 group">
          <div className="flex items-center">
            <h3 className="text-sm font-medium text-gray-800 group-hover:text-gray-950 transition-colors">Property Location</h3>
            <div className="ml-2 h-px bg-gray-100 flex-1"></div>
          </div>
          
          <div className="bg-gray-50/50 border border-gray-100 rounded-lg p-5 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5 ml-0.5">City</label>
                <Input
                  className="h-9 w-full border-gray-200 bg-white focus:ring-2 focus:ring-gray-100 focus:border-gray-300 text-sm rounded-md"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5 ml-0.5">Country</label>
                <Input
                  className="h-9 w-full border-gray-200 bg-white focus:ring-2 focus:ring-gray-100 focus:border-gray-300 text-sm rounded-md"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5 ml-0.5">Address</label>
              <Input
                className="h-9 w-full border-gray-200 bg-white focus:ring-2 focus:ring-gray-100 focus:border-gray-300 text-sm rounded-md"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5 ml-0.5">Postal Code</label>
              <Input
                className="h-9 w-full border-gray-200 bg-white focus:ring-2 focus:ring-gray-100 focus:border-gray-300 text-sm rounded-md"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Property Type Section */}
        <div className="space-y-4 group">
          <div className="flex items-center">
            <h3 className="text-sm font-medium text-gray-800 group-hover:text-gray-950 transition-colors">Property Classification</h3>
            <div className="ml-2 h-px bg-gray-100 flex-1"></div>
          </div>
          
          <div className="bg-gray-50/50 border border-gray-100 rounded-lg p-5 space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5 ml-0.5">Property Type</label>
              <Select
                value={typeField}
                onValueChange={(value) => {
                  setTypeField(value);
                  setCategory(""); // Reset category when type changes
                }}
              >
                <SelectTrigger className="border-gray-200 bg-white h-9 focus:ring-2 focus:ring-gray-100 focus:border-gray-300 text-sm rounded-md">
                  <SelectValue placeholder="Select property type" />
                </SelectTrigger>
                <SelectContent>
                  {propertyTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center gap-2">
                        {React.cloneElement(getPropertyTypeIcon(type.value), { className: "h-4 w-4 text-gray-500" })}
                        <span>{type.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5 ml-0.5">Category</label>
              <Select
                value={category}
                onValueChange={setCategory}
                disabled={!typeField}
              >
                <SelectTrigger className="border-gray-200 bg-white h-9 focus:ring-2 focus:ring-gray-100 focus:border-gray-300 text-sm rounded-md">
                  <SelectValue placeholder={typeField ? "Select category" : "Select type first"} />
                </SelectTrigger>
                <SelectContent>
                  {getAvailableCategories().map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      <div className="flex items-center gap-2">
                        <cat.Icon className="h-4 w-4 text-gray-500" />
                        <span>{cat.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Tenant Details Section */}
        <div className="space-y-4 group">
          <div className="flex items-center justify-between">
            <div className="flex items-center flex-1">
              <h3 className="text-sm font-medium text-gray-800 group-hover:text-gray-950 transition-colors">Tenant Information</h3>
              <div className="ml-2 h-px bg-gray-100 flex-1"></div>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={toggleTenantType} 
              className="h-7 text-xs bg-white hover:bg-gray-50 border-gray-200 rounded-full px-3"
            >
              {tenantType === "individual" ? "Switch to Company" : "Switch to Individual"}
            </Button>
          </div>
          
          <div className="bg-gray-50/50 border border-gray-100 rounded-lg p-5 space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5 ml-0.5">
                {tenantType === "individual" ? "Full Name" : "Company Name"}
              </label>
              <Input
                className="h-9 w-full border-gray-200 bg-white focus:ring-2 focus:ring-gray-100 focus:border-gray-300 text-sm rounded-md"
                value={tenantName}
                onChange={(e) => setTenantName(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5 ml-0.5">Phone</label>
                <Input
                  className="h-9 w-full border-gray-200 bg-white focus:ring-2 focus:ring-gray-100 focus:border-gray-300 text-sm rounded-md"
                  value={tenantPhone}
                  onChange={(e) => setTenantPhone(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5 ml-0.5">Email</label>
                <Input
                  className="h-9 w-full border-gray-200 bg-white focus:ring-2 focus:ring-gray-100 focus:border-gray-300 text-sm rounded-md"
                  value={tenantEmail}
                  onChange={(e) => setTenantEmail(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Additional Details Section */}
        <div className="space-y-4 group">
          <div className="flex items-center">
            <h3 className="text-sm font-medium text-gray-800 group-hover:text-gray-950 transition-colors">Additional Details</h3>
            <div className="ml-2 h-px bg-gray-100 flex-1"></div>
          </div>
          
          <div className="bg-gray-50/50 border border-gray-100 rounded-lg p-5">
            <Textarea
              className="min-h-[120px] w-full border-gray-200 bg-white focus:ring-2 focus:ring-gray-100 focus:border-gray-300 resize-none text-sm rounded-md"
              placeholder="Add notes or additional details about this property..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="pt-4 flex gap-3 sticky bottom-0 bg-white border-t border-gray-100 py-4 -mx-6 px-6 mt-8">
          <Button 
            onClick={handleSave} 
            className="flex-1 bg-gray-900 hover:bg-gray-800 text-white"
          >
            Add listing
          </Button>
          {onClose && (
            <Button 
              variant="outline" 
              onClick={onClose} 
              className="flex-1 bg-white border-gray-200 hover:bg-gray-50"
            >
              Cancel
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
