
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
      "flex rounded-full border border-gray-200 bg-white p-0.5 shadow-xs",
      className
    )}>
      <button
        type="button"
        className={`px-3 py-1 text-xs font-medium rounded-full transition-all duration-200 flex items-center gap-1.5
          ${value === "listing"
            ? "bg-blue-50 text-blue-600 shadow-sm"
            : "bg-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
          }`}
        style={{
          minWidth: 80,
        }}
        aria-pressed={value === "listing"}
        onClick={() => onChange("listing")}
      >
        <Building className="h-3 w-3" />
        Listing
      </button>
      <button
        type="button"
        className={`ml-1 px-3 py-1 text-xs font-medium rounded-full transition-all duration-200 flex items-center gap-1.5
          ${value === "general"
            ? "bg-purple-50 text-purple-600 shadow-sm"
            : "bg-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
          }`}
        style={{
          minWidth: 80,
        }}
        aria-pressed={value === "general"}
        onClick={() => onChange("general")}
      >
        <Briefcase className="h-3 w-3" />
        General
      </button>
    </div>
  );
};
