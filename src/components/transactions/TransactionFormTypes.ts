
export interface Tenant {
  name: string;
  type: string;
  email: string;
  phone: string;
}

export interface Listing {
  id: string;
  name: string;
  type: PropertyType;
  address: string;
  city: string;
  country: string;
  tenant: Tenant;
}

export type PropertyType = 
  | "residential_rental" 
  | "commercial_rental"
  | "hospitality"
  | "vacation_rental"
  | "mixed_use"
  | "industrial";

export type PropertySubType =
  // Residential subtypes
  | "single_family"
  | "multi_family"
  | "apartment_condo"
  // Commercial subtypes
  | "office"
  | "retail"
  | "medical_professional"
  // Hospitality subtypes
  | "hotel"
  | "motel"
  | "bed_breakfast"
  // Vacation rental subtypes
  | "short_term_rental"
  | "serviced_apartment"
  | "holiday_home"
  // Mixed-use (typically no subtypes, but could track the mix)
  | "residential_commercial"
  // Industrial subtypes
  | "warehouse"
  | "distribution_manufacturing";

export interface PropertyCategory {
  type: PropertyType;
  label: string;
  subtypes: { value: PropertySubType; label: string }[];
  revenueCategories: { value: string; label: string }[];
  expenseCategories: { value: string; label: string }[];
}

export interface TransactionFieldsData {
  selectedListingId: string;
  transactionType: "revenue" | "expense";
  category: string;
  amount: string;
  date: Date | undefined;
  payment: string;
  notes: string;
  listingType: "listing" | "general";
}

export interface TransactionFormFieldsProps {
  mockListings: Listing[];
  initialValues: TransactionFieldsData;
  onChange: (data: TransactionFieldsData) => void;
  editMode?: boolean;
}

export const PROPERTY_CATEGORIES: PropertyCategory[] = [
  {
    type: "residential_rental",
    label: "Residential Rental",
    subtypes: [
      { value: "single_family", label: "Single-family Home" },
      { value: "multi_family", label: "Multi-family (Duplex, Triplex, etc.)" },
      { value: "apartment_condo", label: "Apartment / Condo" }
    ],
    revenueCategories: [
      { value: "monthly_rent", label: "Monthly Rent" },
      { value: "parking_fees", label: "Parking Fees" },
      { value: "late_payment", label: "Late Payment Fees" },
      { value: "pet_fees", label: "Pet Fees" },
      { value: "utility_reimbursements", label: "Utility Reimbursements" },
      { value: "storage_fees", label: "Storage Fees" },
      { value: "application_admin", label: "Application / Admin Fees" }
    ],
    expenseCategories: [
      // Shared core expenses
      { value: "property_taxes", label: "Property Taxes" },
      { value: "insurance", label: "Insurance" },
      { value: "utilities", label: "Utilities" },
      { value: "maintenance_repairs", label: "Maintenance & Repairs" },
      { value: "management_fees", label: "Property Management Fees" },
      { value: "legal_accounting", label: "Legal & Accounting Fees" },
      { value: "marketing", label: "Marketing / Advertising" },
      { value: "mortgage", label: "Loan / Mortgage Payments" },
      // Residential specific
      { value: "cleaning", label: "Cleaning" },
      { value: "landscaping", label: "Landscaping / Lawn Care" },
      { value: "pest_control", label: "Pest Control" },
      { value: "hoa_fees", label: "HOA Fees" }
    ]
  },
  {
    type: "commercial_rental",
    label: "Commercial Rental",
    subtypes: [
      { value: "office", label: "Office" },
      { value: "retail", label: "Retail" },
      { value: "medical_professional", label: "Medical / Professional Unit" }
    ],
    revenueCategories: [
      { value: "lease_income", label: "Lease Income" },
      { value: "cam_charges", label: "CAM (Common Area Maintenance) Charges" },
      { value: "parking_fees", label: "Parking Fees" },
      { value: "signage_advertising", label: "Signage / Advertising Fees" },
      { value: "utility_reimbursements", label: "Utility Reimbursements" },
      { value: "storage_rental", label: "Storage / Facility Rental" }
    ],
    expenseCategories: [
      // Shared core expenses
      { value: "property_taxes", label: "Property Taxes" },
      { value: "insurance", label: "Insurance" },
      { value: "utilities", label: "Utilities" },
      { value: "maintenance_repairs", label: "Maintenance & Repairs" },
      { value: "management_fees", label: "Property Management Fees" },
      { value: "legal_accounting", label: "Legal & Accounting Fees" },
      { value: "marketing", label: "Marketing / Advertising" },
      { value: "mortgage", label: "Loan / Mortgage Payments" },
      // Commercial specific
      { value: "janitorial", label: "Janitorial Services" },
      { value: "security", label: "Security Staff or Systems" },
      { value: "elevator_hvac", label: "Elevator / HVAC Maintenance" },
      { value: "fire_safety", label: "Fire Safety Systems" }
    ]
  },
  {
    type: "hospitality",
    label: "Hospitality",
    subtypes: [
      { value: "hotel", label: "Hotel" },
      { value: "motel", label: "Motel" },
      { value: "bed_breakfast", label: "Bed & Breakfast" }
    ],
    revenueCategories: [
      { value: "room_booking", label: "Room Booking Income" },
      { value: "cleaning_fees", label: "Cleaning Fees" },
      { value: "food_beverage", label: "Food & Beverage Sales" },
      { value: "mini_bar_addons", label: "Mini Bar / Add-ons" },
      { value: "parking_fees", label: "Parking Fees" },
      { value: "laundry_services", label: "Laundry Services" },
      { value: "event_space", label: "Event Space Rental" }
    ],
    expenseCategories: [
      // Shared core expenses
      { value: "property_taxes", label: "Property Taxes" },
      { value: "insurance", label: "Insurance" },
      { value: "utilities", label: "Utilities" },
      { value: "maintenance_repairs", label: "Maintenance & Repairs" },
      { value: "management_fees", label: "Property Management Fees" },
      { value: "legal_accounting", label: "Legal & Accounting Fees" },
      { value: "marketing", label: "Marketing / Advertising" },
      { value: "mortgage", label: "Loan / Mortgage Payments" },
      // Hospitality specific
      { value: "housekeeping", label: "Housekeeping Staff" },
      { value: "ota_commission", label: "OTA Commission Fees" },
      { value: "laundry_linen", label: "Laundry & Linen Services" },
      { value: "consumables", label: "Consumables" },
      { value: "staff_salaries", label: "Staff Salaries" },
      { value: "subscription_services", label: "Subscription Services" }
    ]
  },
  {
    type: "vacation_rental",
    label: "Vacation Rental",
    subtypes: [
      { value: "short_term_rental", label: "Short-term Rental (Airbnb-style)" },
      { value: "serviced_apartment", label: "Serviced Apartment" },
      { value: "holiday_home", label: "Holiday Home / Villa" }
    ],
    revenueCategories: [
      { value: "nightly_booking", label: "Nightly Booking Income" },
      { value: "cleaning_fees", label: "Cleaning Fees" },
      { value: "extra_guest_pet", label: "Extra Guest / Pet Fees" },
      { value: "parking_fees", label: "Parking Fees" },
      { value: "late_checkout", label: "Late Checkout" },
      { value: "addon_services", label: "Add-on Services" }
    ],
    expenseCategories: [
      // Shared core expenses
      { value: "property_taxes", label: "Property Taxes" },
      { value: "insurance", label: "Insurance" },
      { value: "utilities", label: "Utilities" },
      { value: "maintenance_repairs", label: "Maintenance & Repairs" },
      { value: "management_fees", label: "Property Management Fees" },
      { value: "legal_accounting", label: "Legal & Accounting Fees" },
      { value: "marketing", label: "Marketing / Advertising" },
      { value: "mortgage", label: "Loan / Mortgage Payments" },
      // Vacation rental specific
      { value: "turnover_cleaning", label: "Turnover Cleaning Services" },
      { value: "ota_commission", label: "OTA Commission Fees" },
      { value: "consumables", label: "Consumables" },
      { value: "smart_lock", label: "Smart Lock / Key Exchange Services" },
      { value: "furnishing_decor", label: "Furnishing & Decor" },
      { value: "str_insurance", label: "Short-term Rental Insurance" }
    ]
  },
  {
    type: "mixed_use",
    label: "Mixed-Use",
    subtypes: [
      { value: "residential_commercial", label: "Residential + Commercial" }
    ],
    revenueCategories: [
      { value: "residential_rent", label: "Residential Rent" },
      { value: "commercial_lease", label: "Commercial Lease Income" },
      { value: "parking_fees", label: "Parking Fees" },
      { value: "cam_charges", label: "CAM Charges (Commercial)" },
      { value: "storage_fees", label: "Storage Fees" }
    ],
    expenseCategories: [
      // Shared core expenses
      { value: "property_taxes", label: "Property Taxes" },
      { value: "insurance", label: "Insurance" },
      { value: "utilities", label: "Utilities" },
      { value: "maintenance_repairs", label: "Maintenance & Repairs" },
      { value: "management_fees", label: "Property Management Fees" },
      { value: "legal_accounting", label: "Legal & Accounting Fees" },
      { value: "marketing", label: "Marketing / Advertising" },
      { value: "mortgage", label: "Loan / Mortgage Payments" },
      // Mixed-use specific
      { value: "commercial_expenses", label: "Commercial Section Expenses" },
      { value: "residential_expenses", label: "Residential Section Expenses" },
      { value: "common_area", label: "Common Area Services" },
      { value: "shared_utilities", label: "Shared Utilities Allocation" },
      { value: "security_fire", label: "Security / Fire System Management" }
    ]
  },
  {
    type: "industrial",
    label: "Industrial",
    subtypes: [
      { value: "warehouse", label: "Warehouse" },
      { value: "distribution_manufacturing", label: "Distribution / Manufacturing Facility" }
    ],
    revenueCategories: [
      { value: "warehouse_lease", label: "Warehouse Lease Income" },
      { value: "storage_rental", label: "Storage Rental Fees" },
      { value: "equipment_rental", label: "Equipment Rental" },
      { value: "parking_dock", label: "Parking / Dock Usage Fees" },
      { value: "cam_charges", label: "CAM Charges" }
    ],
    expenseCategories: [
      // Shared core expenses
      { value: "property_taxes", label: "Property Taxes" },
      { value: "insurance", label: "Insurance" },
      { value: "utilities", label: "Utilities" },
      { value: "maintenance_repairs", label: "Maintenance & Repairs" },
      { value: "management_fees", label: "Property Management Fees" },
      { value: "legal_accounting", label: "Legal & Accounting Fees" },
      { value: "marketing", label: "Marketing / Advertising" },
      { value: "mortgage", label: "Loan / Mortgage Payments" },
      // Industrial specific
      { value: "equipment_maintenance", label: "Equipment Maintenance" },
      { value: "loading_dock", label: "Loading Dock Upkeep" },
      { value: "site_security", label: "Site Security" },
      { value: "environmental", label: "Environmental Compliance Costs" },
      { value: "pest_control", label: "Pest Control" }
    ]
  }
];

// For general transactions not tied to a specific property
export const GENERAL_CATEGORIES = {
  revenue: [
    { value: "investment", label: "Investment Return" },
    { value: "interest", label: "Interest" },
    { value: "tax_refund", label: "Tax Refund" },
    { value: "other_general_income", label: "Other Income" }
  ],
  expense: [
    { value: "software", label: "Software & Tools" },
    { value: "admin", label: "Administrative" },
    { value: "legal", label: "Legal Services" },
    { value: "accounting", label: "Accounting Services" },
    { value: "marketing", label: "Marketing" },
    { value: "other_general_expense", label: "Other Expense" }
  ]
};
