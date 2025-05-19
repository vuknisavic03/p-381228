
export interface Tenant {
  name: string;
  type: string;
  email: string;
  phone: string;
}

export interface Listing {
  id: string;
  name: string;
  type: string;
  address: string;
  city: string;
  country: string;
  tenant: Tenant;
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
