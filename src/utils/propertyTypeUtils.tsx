
import React from "react";
import { Home, Building, Hotel, Bed, Factory, Building2 } from "lucide-react";
import { PropertyType } from "@/components/transactions/TransactionFormTypes";

// Function to format property type strings (convert from snake_case to Title Case)
export const formatPropertyType = (propertyType: PropertyType): string => {
  switch (propertyType) {
    case "residential_rental":
      return "Residential Rental";
    case "commercial_rental":
      return "Commercial Rental";
    case "hospitality":
      return "Hospitality";
    case "vacation_rental":
      return "Vacation Rental";
    case "mixed_use":
      return "Mixed Use";
    case "industrial":
      return "Industrial";
    default:
      // Fix the TypeScript error by ensuring propertyType is treated as a string
      return String(propertyType)
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
  }
};

// Map property types to their corresponding icons
export const getPropertyTypeIcon = (propertyType: PropertyType) => {
  switch (propertyType) {
    case "residential_rental":
      return <Home className="h-4 w-4" />;
    case "commercial_rental":
      return <Building className="h-4 w-4" />;
    case "hospitality":
      return <Hotel className="h-4 w-4" />;
    case "vacation_rental":
      return <Bed className="h-4 w-4" />;
    case "mixed_use":
      return <Building2 className="h-4 w-4" />;
    case "industrial":
      return <Factory className="h-4 w-4" />;
    default:
      return <Building className="h-4 w-4" />;
  }
};

// Component to display property type with icon
export const PropertyTypeDisplay = ({ 
  type, 
  className = "text-xs" 
}: { 
  type: PropertyType; 
  className?: string;
}) => {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {getPropertyTypeIcon(type)}
      <span>{formatPropertyType(type)}</span>
    </div>
  );
};
