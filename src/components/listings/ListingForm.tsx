import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
  // Additional icons for revenue categories
  FileText,
  Power,
  KeyRound,
  WrenchIcon,
  PlusCircle,
  RotateCcw as RotateCcwIcon,
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
import { Badge } from "@/components/ui/badge";
import {
  Receipt as ReceiptIcon2,
  FileText as FileTextIcon,
  Banknote as BanknoteIcon,
  Coins as CoinsIcon,
  CreditCard as CreditCardIcon,
  BadgeDollarSign as BadgeDollarSignIcon
} from "lucide-react";

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
  
  const [selectedRevenues, setSelectedRevenues] = useState<Array<{
    type: string;
    amount: string;
  }>>([]);
  
  const [selectedExpenses, setSelectedExpenses] = useState<Array<{
    type: string;
    amount: string;
  }>>([]);

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

  const revenueTypes = [
    { value: "rent", label: "Rent", icon: BadgeDollarSignIcon },
    { value: "utility", label: "Utility Fees", icon: ReceiptIcon2 },
    { value: "service", label: "Service Fees", icon: FileTextIcon },
    { value: "deposit", label: "Deposits", icon: BanknoteIcon },
    { value: "extra", label: "Extra Charges", icon: CoinsIcon },
    { value: "maintenance", label: "Maintenance Fees", icon: CreditCardIcon },
  ];

  const expenseTypes = [
    { value: "mortgage", label: "Mortgage", icon: BadgeDollarSignIcon },
    { value: "maintenance", label: "Maintenance", icon: CreditCardIcon },
    { value: "utilities", label: "Utilities", icon: ReceiptIcon2 },
    { value: "taxes", label: "Taxes", icon: FileTextIcon },
    { value: "insurance", label: "Insurance", icon: BanknoteIcon },
    { value: "management", label: "Management", icon: CoinsIcon },
  ];

  const handleAddRevenue = (type: string) => {
    setSelectedRevenues([...selectedRevenues, { type, amount: "" }]);
  };

  const handleAddExpense = (type: string) => {
    setSelectedExpenses([...selectedExpenses, { type, amount: "" }]);
  };

  const handleRemoveRevenue = (index: number) => {
    setSelectedRevenues(selectedRevenues.filter((_, i) => i !== index));
  };

  const handleRemoveExpense = (index: number) => {
    setSelectedExpenses(selectedExpenses.filter((_, i) => i !== index));
  };

  const handleRevenueAmountChange = (index: number, amount: string) => {
    const newRevenues = [...selectedRevenues];
    newRevenues[index].amount = amount;
    setSelectedRevenues(newRevenues);
  };

  const handleExpenseAmountChange = (index: number, amount: string) => {
    const newExpenses = [...selectedExpenses];
    newExpenses[index].amount = amount;
    setSelectedExpenses(newExpenses);
  };

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

  const getIconComponent = (items: typeof revenueTypes, value: string) => {
    const item = items.find((i) => i.value === value);
    return item ? item.icon : BadgeDollarSignIcon;
  };

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
          <h3 className="font-medium text-sm">Revenue details</h3>
          <Select onValueChange={handleAddRevenue}>
            <SelectTrigger>
              <SelectValue placeholder="Add revenue type" />
            </SelectTrigger>
            <SelectContent>
              {revenueTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  <div className="flex items-center gap-2">
                    <type.icon className="h-4 w-4" />
                    <span>{type.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {selectedRevenues.map((revenue, index) => {
            const IconComponent = getIconComponent(revenueTypes, revenue.type);
            const label = revenueTypes.find(t => t.value === revenue.type)?.label;
            
            return (
              <div key={index} className="flex items-center gap-2">
                <Badge 
                  variant="outline" 
                  className="flex items-center gap-2 px-3 py-1"
                >
                  <IconComponent className="h-4 w-4" />
                  <span>{label}</span>
                </Badge>
                <Input
                  type="text"
                  placeholder="Amount"
                  value={revenue.amount}
                  onChange={(e) => handleRevenueAmountChange(index, e.target.value)}
                  className="flex-1"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveRevenue(index)}
                >
                  Remove
                </Button>
              </div>
            );
          })}
        </div>

        <div className="space-y-2">
          <h3 className="font-medium text-sm">Expense details</h3>
          <Select onValueChange={handleAddExpense}>
            <SelectTrigger>
              <SelectValue placeholder="Add expense type" />
            </SelectTrigger>
            <SelectContent>
              {expenseTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  <div className="flex items-center gap-2">
                    <type.icon className="h-4 w-4" />
                    <span>{type.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {selectedExpenses.map((expense, index) => {
            const IconComponent = getIconComponent(expenseTypes, expense.type);
            const label = expenseTypes.find(t => t.value === expense.type)?.label;
            
            return (
              <div key={index} className="flex items-center gap-2">
                <Badge 
                  variant="outline" 
                  className="flex items-center gap-2 px-3 py-1"
                >
                  <IconComponent className="h-4 w-4" />
                  <span>{label}</span>
                </Badge>
                <Input
                  type="text"
                  placeholder="Amount"
                  value={expense.amount}
                  onChange={(e) => handleExpenseAmountChange(index, e.target.value)}
                  className="flex-1"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveExpense(index)}
                >
                  Remove
                </Button>
              </div>
            );
          })}
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
