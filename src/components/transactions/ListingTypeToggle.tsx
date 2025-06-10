
import React from "react";
import { cn } from "@/lib/utils";
import { Building, Briefcase } from "lucide-react";

interface ListingTypeToggleProps {
  value: "listing" | "general";
  onChange: (value: "listing" | "general") => void;
  className?: string;
}

export const ListingTypeToggle: React.FC<ListingTypeToggleProps> = ({
  value,
  onChange,
  className,
}) => {
  return (
    <div className={cn(
      "flex bg-gray-100 rounded-md p-1",
      className
    )}>
      <button
        type="button"
        className={`px-3 py-1.5 text-sm font-medium rounded transition-all duration-200 flex items-center gap-2
          ${value === "listing"
            ? "bg-white text-gray-900 shadow-sm"
            : "bg-transparent text-gray-600 hover:text-gray-900"
          }`}
        onClick={() => onChange("listing")}
      >
        <Building className="h-4 w-4" />
        Listing
      </button>
      <button
        type="button"
        className={`px-3 py-1.5 text-sm font-medium rounded transition-all duration-200 flex items-center gap-2
          ${value === "general"
            ? "bg-white text-gray-900 shadow-sm"
            : "bg-transparent text-gray-600 hover:text-gray-900"
          }`}
        onClick={() => onChange("general")}
      >
        <Briefcase className="h-4 w-4" />
        General
      </button>
    </div>
  );
};
