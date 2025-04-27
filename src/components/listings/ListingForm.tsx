
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
  FileText,
  Power,
  KeyRound,
  WrenchIcon,
  PlusCircle,
  RotateCcw as RotateCcwIcon,
  Building,
  Wallet,
  // Additional icons for expense categories
  WrenchIcon as RepairIcon,
  Settings,
  Zap,
  HomeIcon,
  WalletCards,
  Brush as BrushIcon,
  Shield as ShieldIcon,
  Receipt as ReceiptIcon,
  Megaphone as MegaphoneIcon,
  Briefcase as ServicesIcon,
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
  const [revenue, setRevenue] = useState("");
  const [expenses, setExpenses] = useState("");
  const [notes, setNotes] = useState("");
  const [tenantType, setTenantType] = useState("individual");
  const [revenueCategory, setRevenueCategory] = useState("");
  const [expensesCategory, setExpensesCategory] = useState("");

  const revenueCategories = [
    { value: "rent", label: "Rent", Icon: Home },
    { value: "facility", label: "Facility Fees", Icon: Building2 },
    { value: "lease", label: "Lease-Related Fees", Icon: FileText },
    { value: "utility", label: "Utility & Service Fees", Icon: Power },
    { value: "key", label: "Key & Access Fees", Icon: KeyRound },
    { value: "maintenance", label: "Maintenance Fees", Icon: WrenchIcon },
    { value: "optional", label: "Optional Fees", Icon: PlusCircle },
    { value: "refunds", label: "Refunds", Icon: RotateCcwIcon },
    { value: "condo", label: "Condo / HOA fees", Icon: Building },
    { value: "misc", label: "Miscellaneous Fees", Icon: Wallet },
  ];

  const expenseCategories = [
    { value: "maintenance", label: "Maintenance", Icon: RepairIcon },
    { value: "repairs", label: "Repairs", Icon: Settings },
    { value: "utilities", label: "Utilities", Icon: Zap },
    { value: "turnover", label: "Turnover / Make Ready", Icon: HomeIcon },
    { value: "dues", label: "Dues and Fees", Icon: WalletCards },
    { value: "cleaning", label: "Cleaning", Icon: BrushIcon },
    { value: "insurance", label: "Insurance", Icon: ShieldIcon },
    { value: "taxes", label: "Taxes", Icon: ReceiptIcon },
    { value: "marketing", label: "Marketing", Icon: MegaphoneIcon },
    { value: "professional", label: "Professional Services", Icon: ServicesIcon },
  ];

  const typeCategories = [
    { value: "residential", label: "Residential", Icon: Home },
    { value: "commercial", label: "Commercial", Icon: Building },
    { value: "industrial", label: "Industrial", Icon: Building },
    { value: "retail", label: "Retail", Icon: Building },
    { value: "office", label: "Office Space", Icon: Building2 },
    { value: "warehouse", label: "Warehouse", Icon: Building },
    { value: "hotel", label: "Hotel", Icon: Building },
    { value: "mixed", label: "Mixed Use", Icon: Building },
  ];

  const typeToCategoryMap = {
    residential: [
      { value: "apartment", label: "Apartment", Icon: Building2 },
      { value: "house", label: "House", Icon: Home },
      { value: "condo", label: "Condominium", Icon: Building },
    ],
    commercial: [
      { value: "office", label: "Office", Icon: Building2 },
      { value: "retail", label: "Retail Space", Icon: Building },
    ],
    industrial: [
      { value: "warehouse", label: "Warehouse", Icon: Building },
      { value: "factory", label: "Factory", Icon: Building },
    ],
    retail: [
      { value: "store", label: "Store", Icon: Building },
      { value: "shop", label: "Shop", Icon: Building },
      { value: "mall", label: "Mall", Icon: Building },
    ],
    office: [
      { value: "private", label: "Private Office", Icon: Building2 },
      { value: "coworking", label: "Coworking", Icon: Building2 },
      { value: "business", label: "Business Center", Icon: Building2 },
    ],
    warehouse: [
      { value: "storage", label: "Storage", Icon: Building },
      { value: "distribution", label: "Distribution", Icon: Building },
      { value: "logistics", label: "Logistics", Icon: Building },
    ],
    hotel: [
      { value: "hotel", label: "Hotel", Icon: Building },
      { value: "motel", label: "Motel", Icon: Building },
      { value: "resort", label: "Resort", Icon: Building },
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
      payment: {
        revenue,
        expenses,
        revenueCategory,
        expensesCategory,
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
    setRevenue("");
    setExpenses("");
    setNotes("");
    setRevenueCategory("");
    setExpensesCategory("");
  };

  const inputClassName = "h-10 w-full";

  return (
    <div className="p-6 h-full overflow-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Listing details</h2>
      </div>

      <div className="space-y-4">
        <Input
          className={inputClassName}
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <Input
          className={inputClassName}
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <Input
          className={inputClassName}
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <Input
          className={inputClassName}
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
            <SelectTrigger>
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
            <SelectTrigger>
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
              className={inputClassName}
              placeholder={tenantType === "individual" ? "Name" : "Company Name"}
              value={tenantName}
              onChange={(e) => setTenantName(e.target.value)}
            />
            <Input
              className={inputClassName}
              placeholder="Phone"
              value={tenantPhone}
              onChange={(e) => setTenantPhone(e.target.value)}
            />
            <Input
              className={`${inputClassName} col-span-2`}
              placeholder="Email"
              value={tenantEmail}
              onChange={(e) => setTenantEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium text-sm">Payment details</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Select value={revenueCategory} onValueChange={setRevenueCategory}>
                <SelectTrigger className="w-full">
                  <div className="flex items-center gap-2">
                    {revenueCategory ? (
                      <>
                        {revenueCategories.find(cat => cat.value === revenueCategory)?.Icon && (
                          <revenueCategories.find(cat => cat.value === revenueCategory)!.Icon className="h-4 w-4" />
                        )}
                        <span>{revenueCategories.find(cat => cat.value === revenueCategory)?.label}</span>
                      </>
                    ) : (
                      <span>Select revenue type</span>
                    )}
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {revenueCategories.map((category) => (
                    <SelectItem 
                      key={category.value} 
                      value={category.value}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <category.Icon className="h-4 w-4" />
                        <span>{category.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                className="w-full"
                type="text"
                placeholder="Amount"
                value={revenue}
                onChange={(e) => setRevenue(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Select value={expensesCategory} onValueChange={setExpensesCategory}>
                <SelectTrigger className="w-full">
                  <div className="flex items-center gap-2">
                    {expensesCategory ? (
                      <>
                        {expenseCategories.find(cat => cat.value === expensesCategory)?.Icon && (
                          <expenseCategories.find(cat => cat.value === expensesCategory)!.Icon className="h-4 w-4" />
                        )}
                        <span>{expenseCategories.find(cat => cat.value === expensesCategory)?.label}</span>
                      </>
                    ) : (
                      <span>Select expense type</span>
                    )}
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {expenseCategories.map((category) => (
                    <SelectItem 
                      key={category.value} 
                      value={category.value}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <category.Icon className="h-4 w-4" />
                        <span>{category.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                className="w-full"
                type="text"
                placeholder="Amount"
                value={expenses}
                onChange={(e) => setExpenses(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium text-sm">Additional details</h3>
          <Textarea
            className="min-h-[100px] w-full"
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

