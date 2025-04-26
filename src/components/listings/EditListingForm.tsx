import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { 
  Wrench,
  Settings,
  Bolt,
  Home,
  HandCoins,
  Brush,
  Shield,
  Receipt,
  Megaphone,
  Briefcase,
  Key,
  Building2,
  Coins,
  UtilityPole,
  Building,
  BadgePlus,
  RotateCcw,
  ScrollText,
  Check,
  ChevronDown,
} from "lucide-react";
import { PaymentDetailsInput } from "./PaymentDetailsInput";

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
    tenantName: listing.tenant?.name || "",
    tenantPhone: listing.tenant?.phone || "",
    tenantEmail: listing.tenant?.email || "",
    tenantType: listing.tenant?.type || "individual",
    revenue: listing.payment?.revenue || "",
    expenses: listing.payment?.expenses || "",
    revenueCategories: listing.payment?.revenueCategories || [],
    expensesCategories: listing.payment?.expensesCategories || [],
    notes: listing.notes || "",
  });

  const revenueCategoriesList = [
    { value: "rent", label: "Rent", Icon: Home },
    { value: "facility", label: "Facility Fees", Icon: Building2 },
    { value: "lease", label: "Lease-Related Fees", Icon: ScrollText },
    { value: "utility", label: "Utility & Service Fees", Icon: UtilityPole },
    { value: "key", label: "Key & Access Fees", Icon: Key },
    { value: "maintenance", label: "Maintenance Fees", Icon: Wrench },
    { value: "optional", label: "Optional Fees", Icon: BadgePlus },
    { value: "refunds", label: "Refunds", Icon: RotateCcw },
    { value: "condo", label: "Condo / HOA fees", Icon: Building },
    { value: "misc", label: "Miscellaneous Fees", Icon: Coins },
  ];

  const expenseCategoriesList = [
    { value: "maintenance", label: "Maintenance", Icon: Wrench },
    { value: "repairs", label: "Repairs", Icon: Settings },
    { value: "utilities", label: "Utilities", Icon: Bolt },
    { value: "turnover", label: "Turnover / Make Ready", Icon: Home },
    { value: "dues", label: "Dues and Fees", Icon: HandCoins },
    { value: "cleaning", label: "Cleaning", Icon: Brush },
    { value: "insurance", label: "Insurance", Icon: Shield },
    { value: "taxes", label: "Taxes", Icon: Receipt },
    { value: "marketing", label: "Marketing", Icon: Megaphone },
    { value: "professional", label: "Professional Services", Icon: Briefcase },
  ];

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

  const toggleRevenueCategory = (value: string) => {
    setFormData(prev => ({
      ...prev,
      revenueCategories: prev.revenueCategories.includes(value)
        ? prev.revenueCategories.filter(item => item !== value)
        : [...prev.revenueCategories, value]
    }));
  };

  const toggleExpenseCategory = (value: string) => {
    setFormData(prev => ({
      ...prev,
      expensesCategories: prev.expensesCategories.includes(value)
        ? prev.expensesCategories.filter(item => item !== value)
        : [...prev.expensesCategories, value]
    }));
  };

  const handleSubmit = async () => {
    try {
      const updatedListing = {
        ...listing,
        ...formData,
        tenant: {
          name: formData.tenantName,
          phone: formData.tenantPhone,
          email: formData.tenantEmail,
          type: formData.tenantType,
        },
        payment: {
          revenue: formData.revenue,
          expenses: formData.expenses,
          revenueCategories: formData.revenueCategories,
          expensesCategories: formData.expensesCategories,
        }
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
    } catch (err) {
      console.error("Error updating:", err);
      
      toast({
        title: "Listing Updated (Demo Mode)",
        description: "Your changes have been saved in the demo data",
      });
      
      onUpdate({
        ...listing,
        ...formData,
        tenant: {
          name: formData.tenantName,
          phone: formData.tenantPhone,
          email: formData.tenantEmail,
          type: formData.tenantType,
        },
        payment: {
          revenue: formData.revenue,
          expenses: formData.expenses,
          revenueCategories: formData.revenueCategories,
          expensesCategories: formData.expensesCategories,
        }
      });
    }
  };

  const inputClassName = "h-10 w-full";

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-6 border-b">
        <h2 className="text-lg font-semibold">Listing #{listing.id}</h2>
      </div>
      
      <div className="flex-1 overflow-auto p-6">
        <div className="space-y-4">
          <Input
            className={inputClassName}
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
          />
          <Input
            className={inputClassName}
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
          />
          <Input
            className={inputClassName}
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
          />
          <Input
            className={inputClassName}
            name="postalCode"
            placeholder="Postal Code"
            value={formData.postalCode}
            onChange={handleChange}
          />
          <Input
            className={inputClassName}
            name="type"
            placeholder="Type"
            value={formData.type}
            onChange={handleChange}
          />
          <Input
            className={inputClassName}
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
          />

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-sm">Tenant details</h3>
              <Button variant="outline" size="sm" onClick={toggleTenantType}>
                {formData.tenantType === "individual" ? "Individual" : "Company"}
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Input
                className={inputClassName}
                name="tenantName"
                placeholder={formData.tenantType === "individual" ? "Name" : "Company Name"}
                value={formData.tenantName}
                onChange={handleChange}
              />
              <Input
                className={inputClassName}
                name="tenantPhone"
                placeholder="Phone"
                value={formData.tenantPhone}
                onChange={handleChange}
              />
              <Input
                className={`${inputClassName} col-span-2`}
                name="tenantEmail"
                placeholder="Email"
                value={formData.tenantEmail}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium text-sm">Payment details</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Input
                  className={inputClassName}
                  name="revenue"
                  type="text"
                  placeholder="Revenue"
                  value={formData.revenue}
                  onChange={handleChange}
                />
                
                <PaymentDetailsInput
                  revenueCategories={formData.revenueCategories}
                  expensesCategories={formData.expensesCategories}
                  onToggleRevenueCategory={(value) => {
                    setFormData(prev => ({
                      ...prev,
                      revenueCategories: prev.revenueCategories.includes(value)
                        ? prev.revenueCategories.filter(item => item !== value)
                        : [...prev.revenueCategories, value]
                    }));
                  }}
                  onToggleExpenseCategory={(value) => {
                    setFormData(prev => ({
                      ...prev,
                      expensesCategories: prev.expensesCategories.includes(value)
                        ? prev.expensesCategories.filter(item => item !== value)
                        : [...prev.expensesCategories, value]
                    }));
                  }}
                />
              </div>
              
              <div className="space-y-2">
                <Input
                  className={inputClassName}
                  name="expenses"
                  type="text"
                  placeholder="Expenses"
                  value={formData.expenses}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium text-sm">Additional details</h3>
            <Textarea
              className="min-h-[100px] w-full"
              name="notes"
              placeholder="Notes"
              value={formData.notes}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="border-t p-6">
        <Button className="w-full" onClick={handleSubmit}>
          Save changes
        </Button>
      </div>
    </div>
  );
}
