export type PropertyType = 
  | "residential_rental"
  | "commercial_rental" 
  | "hospitality"
  | "vacation_rental"
  | "mixed_use"
  | "industrial";

export interface PropertyTypeOption {
  value: PropertyType;
  label: string;
  icon: React.ComponentType<any>;
}