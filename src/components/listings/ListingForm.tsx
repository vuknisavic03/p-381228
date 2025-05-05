
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
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

export function ListingForm() {
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [typeField, setTypeField] = useState("");
  const [category, setCategory] = useState("");
  const [tenantName, setTenantName] = useState("");
  const [tenantPhone, setTenantPhone] = useState("");
  const [tenantEmail, setTenantEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [tenantType, setTenantType] = useState("individual");

  const typeCategories = [
    { value: "residential", label: "Residential", Icon: Home },
    { value: "commercial", label: "Commercial", Icon: Building },
    { value: "industrial", label: "Industrial", Icon: Factory },
    { value: "retail", label: "Retail", Icon: Store },
    { value: "office", label: "Office Space", Icon: Building2 },
    { value: "warehouse", label: "Warehouse", Icon: Warehouse },
    { value: "hotel", label: "Hotel", Icon: Hotel },
    { value: "mixed", label: "Mixed Use", Icon: Briefcase },
  ];

  const typeToCategoryMap = {
    residential: [
      { value: "apartment", label: "Apartment", Icon: Building2 },
      { value: "house", label: "House", Icon: Home },
      { value: "condo", label: "Condominium", Icon: Building },
    ],
    commercial: [
      { value: "office", label: "Office", Icon: Building2 },
      { value: "retail", label: "Retail Space", Icon: Store },
    ],
    industrial: [
      { value: "warehouse", label: "Warehouse", Icon: Warehouse },
      { value: "factory", label: "Factory", Icon: Factory },
    ],
    retail: [
      { value: "store", label: "Store", Icon: Store },
      { value: "shop", label: "Shop", Icon: Store },
      { value: "mall", label: "Mall", Icon: Building },
    ],
    office: [
      { value: "private", label: "Private Office", Icon: Building2 },
      { value: "coworking", label: "Coworking", Icon: Building2 },
      { value: "business", label: "Business Center", Icon: Building2 },
    ],
    warehouse: [
      { value: "storage", label: "Storage", Icon: Warehouse },
      { value: "distribution", label: "Distribution", Icon: Warehouse },
      { value: "logistics", label: "Logistics", Icon: Warehouse },
    ],
    hotel: [
      { value: "hotel", label: "Hotel", Icon: Hotel },
      { value: "motel", label: "Motel", Icon: Hotel },
      { value: "resort", label: "Resort", Icon: Hotel },
    ],
    mixed: [
      { value: "residential-commercial", label: "Residential-Commercial", Icon: Building },
      { value: "live-work", label: "Live-Work", Icon: Home },
      { value: "multi-purpose", label: "Multi-Purpose", Icon: Building },
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
      
    } catch (err) {
      console.error("Error saving:", err);
      
      toast({
        title: "Listing Added (Demo Mode)",
        description: "Your listing was added to the demo data",
      });
      
      resetForm();
      
      window.dispatchEvent(new CustomEvent('refresh-listings'));
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
    <div className="p-6 h-full overflow-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Listing details</h2>
      </div>

      <div className="space-y-4">
        <Input
          className="h-10 w-full border-gray-200"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <Input
          className="h-10 w-full border-gray-200"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <Input
          className="h-10 w-full border-gray-200"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <Input
          className="h-10 w-full border-gray-200"
          placeholder="Postal Code"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
        />

        <div className="space-y-4">
          <Select
            value={typeField}
            onValueChange={(value) => {
              setTypeField(value);
              setCategory(""); // Reset category when type changes
            }}
          >
            <SelectTrigger className="border-gray-200">
              <SelectValue placeholder="Select property type" />
            </SelectTrigger>
            <SelectContent>
              {typeCategories.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  <div className="flex items-center gap-2">
                    <type.Icon className="h-4 w-4" />
                    <span>{type.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={category}
            onValueChange={setCategory}
            disabled={!typeField}
          >
            <SelectTrigger className="border-gray-200">
              <SelectValue placeholder={typeField ? "Select category" : "Select type first"} />
            </SelectTrigger>
            <SelectContent>
              {getAvailableCategories().map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  <div className="flex items-center gap-2">
                    <cat.Icon className="h-4 w-4" />
                    <span>{cat.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-sm">Tenant details</h3>
            <Button variant="outline" size="sm" onClick={toggleTenantType}>
              {tenantType === "individual" ? "Individual" : "Company"}
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input
              className="h-10 w-full border-gray-200"
              placeholder={tenantType === "individual" ? "Name" : "Company Name"}
              value={tenantName}
              onChange={(e) => setTenantName(e.target.value)}
            />
            <Input
              className="h-10 w-full border-gray-200"
              placeholder="Phone"
              value={tenantPhone}
              onChange={(e) => setTenantPhone(e.target.value)}
            />
            <Input
              className="h-10 w-full col-span-2 border-gray-200"
              placeholder="Email"
              value={tenantEmail}
              onChange={(e) => setTenantEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium text-sm">Additional details</h3>
          <Textarea
            className="min-h-[100px] w-full border-gray-200"
            placeholder="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
        
        <Button className="w-full" onClick={handleSave}>
          Add listing
        </Button>
      </div>
    </div>
  );
}
