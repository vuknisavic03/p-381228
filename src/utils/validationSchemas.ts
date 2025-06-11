
import { z } from 'zod';

// Address validation schema
export const AddressSchema = z.object({
  address: z.string()
    .min(1, "Address is required")
    .max(500, "Address is too long")
    .regex(/^[a-zA-Z0-9\s\-.,#()\/&']+$/, "Address contains invalid characters"),
  
  city: z.string()
    .min(1, "City is required")
    .max(100, "City name is too long")
    .regex(/^[a-zA-Z\s\-.']+$/, "City contains invalid characters"),
  
  country: z.string()
    .min(1, "Country is required")
    .max(100, "Country name is too long")
    .regex(/^[a-zA-Z\s\-.']+$/, "Country contains invalid characters"),
  
  postalCode: z.string()
    .max(20, "Postal code is too long")
    .regex(/^[a-zA-Z0-9\s\-]+$/, "Postal code contains invalid characters")
    .optional()
});

// Listing validation schema
export const ListingSchema = z.object({
  name: z.string()
    .min(1, "Property name is required")
    .max(200, "Property name is too long")
    .regex(/^[a-zA-Z0-9\s\-.,#()\/&']+$/, "Property name contains invalid characters"),
  
  address: AddressSchema,
  
  type: z.enum([
    "residential_rental",
    "commercial_rental", 
    "hospitality",
    "vacation_rental",
    "mixed_use",
    "industrial"
  ]),
  
  category: z.string()
    .min(1, "Category is required")
    .max(100, "Category is too long"),
  
  description: z.string()
    .max(2000, "Description is too long")
    .optional(),
  
  tenant: z.object({
    name: z.string()
      .min(1, "Tenant name is required")
      .max(200, "Tenant name is too long")
      .regex(/^[a-zA-Z\s\-.']+$/, "Tenant name contains invalid characters"),
    
    email: z.string()
      .email("Invalid email address")
      .max(320, "Email is too long")
      .optional(),
    
    phone: z.string()
      .regex(/^[+]?[\d\s\-()]+$/, "Invalid phone number format")
      .max(20, "Phone number is too long")
      .optional()
  }).optional()
});

// Transaction validation schema
export const TransactionSchema = z.object({
  amount: z.number()
    .min(0, "Amount must be positive")
    .max(1000000000, "Amount is too large"),
  
  description: z.string()
    .min(1, "Description is required")
    .max(500, "Description is too long")
    .regex(/^[a-zA-Z0-9\s\-.,#()\/&']+$/, "Description contains invalid characters"),
  
  type: z.enum(["revenue", "expense"]),
  
  date: z.date()
    .min(new Date("1900-01-01"), "Date is too old")
    .max(new Date("2100-12-31"), "Date is too far in the future"),
  
  category: z.string()
    .min(1, "Category is required")
    .max(100, "Category is too long"),
  
  listingId: z.number()
    .int()
    .positive("Invalid listing ID")
    .optional()
});

// API key validation schema
export const ApiKeySchema = z.string()
  .min(20, "API key is too short")
  .max(100, "API key is too long")
  .regex(/^AIza[a-zA-Z0-9_-]+$/, "Invalid Google Maps API key format");

// Search validation schema
export const SearchSchema = z.string()
  .max(200, "Search query is too long")
  .regex(/^[a-zA-Z0-9\s\-.,#()\/&']*$/, "Search contains invalid characters");

// Validation helper functions
export function validateAddress(data: unknown) {
  return AddressSchema.safeParse(data);
}

export function validateListing(data: unknown) {
  return ListingSchema.safeParse(data);
}

export function validateTransaction(data: unknown) {
  return TransactionSchema.safeParse(data);
}

export function validateApiKey(data: unknown) {
  return ApiKeySchema.safeParse(data);
}

export function validateSearch(data: unknown) {
  return SearchSchema.safeParse(data);
}
