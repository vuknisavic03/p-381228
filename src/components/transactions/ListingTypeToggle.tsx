
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
      "inline-flex bg-gray-50 rounded-lg p-0.5 border border-gray-200",
      className
    )}>
      <button
        type="button"
        className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-150 flex items-center gap-2.5 min-w-[100px] justify-center
          ${value === "listing"
            ? "bg-white text-gray-900 shadow-sm border border-gray-200/50"
            : "bg-transparent text-gray-500 hover:text-gray-700"
          }`}
        onClick={() => onChange("listing")}
      >
        <Building className="h-4 w-4" />
        Listing
      </button>
      <button
        type="button"
        className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-150 flex items-center gap-2.5 min-w-[100px] justify-center
          ${value === "general"
            ? "bg-white text-gray-900 shadow-sm border border-gray-200/50"
            : "bg-transparent text-gray-500 hover:text-gray-700"
          }`}
        onClick={() => onChange("general")}
      >
        <Briefcase className="h-4 w-4" />
        General
      </button>
    </div>
  );
};
