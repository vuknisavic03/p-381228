
import React from "react";
import { Building, User, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Unit {
  id: string;
  unitNumber: string;
  occupancyStatus: string;
  tenant?: {
    name: string;
    type: string;
    email: string;
    phone: string;
  };
}

interface UnitSelectorProps {
  units: Unit[];
  selectedUnitId: string;
  onUnitSelect: (unitId: string) => void;
}

export function UnitSelector({ units, selectedUnitId, onUnitSelect }: UnitSelectorProps) {
  if (!units || units.length === 0) return null;

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className="space-y-2">
      {units.map((unit) => (
        <Card
          key={unit.id}
          className={cn(
            "p-4 cursor-pointer border transition-all duration-200 hover:shadow-sm",
            selectedUnitId === unit.id
              ? "border-blue-200 bg-blue-50/50 shadow-sm"
              : "border-gray-200 bg-white hover:border-gray-300"
          )}
          onClick={() => onUnitSelect(unit.id)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={cn(
                "flex items-center justify-center w-10 h-10 rounded-lg",
                selectedUnitId === unit.id
                  ? "bg-blue-100"
                  : "bg-gray-100"
              )}>
                <Building className={cn(
                  "h-5 w-5",
                  selectedUnitId === unit.id
                    ? "text-blue-600"
                    : "text-gray-500"
                )} />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900">{unit.unitNumber}</span>
                  <span className={cn(
                    "px-2 py-1 text-xs font-medium rounded-full",
                    unit.occupancyStatus === "occupied"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-600"
                  )}>
                    {capitalizeFirstLetter(unit.occupancyStatus)}
                  </span>
                </div>
                
                {unit.tenant ? (
                  <div className="flex items-center gap-1 mt-1">
                    <User className="h-3 w-3 text-gray-400" />
                    <span className="text-sm text-gray-600">{unit.tenant.name}</span>
                    <span className="text-xs text-gray-400">({unit.tenant.type})</span>
                  </div>
                ) : (
                  <span className="text-sm text-gray-500 mt-1 block">No tenant assigned</span>
                )}
              </div>
            </div>
            
            {selectedUnitId === unit.id && (
              <CheckCircle2 className="h-5 w-5 text-blue-600" />
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}
