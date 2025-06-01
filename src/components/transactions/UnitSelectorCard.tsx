
import React from "react";
import { Building, Users, CheckCircle2, User, UserX } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Unit } from "./TransactionFormTypes";

interface UnitSelectorCardProps {
  units: Unit[];
  selectedUnitId: string;
  onUnitSelect: (unitId: string) => void;
}

export function UnitSelectorCard({ units, selectedUnitId, onUnitSelect }: UnitSelectorCardProps) {
  if (!units || units.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      <div className="text-sm font-medium text-gray-700">
        Select Unit ({units.length} available)
      </div>
      
      <div className="grid gap-2 max-h-60 overflow-y-auto">
        {units.map((unit) => {
          const isSelected = unit.id === selectedUnitId;
          
          return (
            <Card
              key={unit.id}
              className={`relative p-3 cursor-pointer transition-all border hover:border-blue-200 ${
                isSelected 
                  ? "border-blue-500 bg-blue-50/30" 
                  : "border-gray-200 bg-white hover:bg-gray-50/50"
              }`}
              onClick={() => onUnitSelect(unit.id)}
            >
              {/* Selection indicator */}
              {isSelected && (
                <div className="absolute top-2 right-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-500" />
                </div>
              )}

              <div className="flex items-start gap-3">
                {/* Unit Icon */}
                <div className={`flex items-center justify-center w-8 h-8 rounded ${
                  isSelected ? "bg-blue-100" : "bg-gray-100"
                }`}>
                  <Building className={`h-4 w-4 ${isSelected ? "text-blue-600" : "text-gray-500"}`} />
                </div>

                {/* Unit Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-gray-900 text-sm">
                      Unit {unit.unitNumber}
                    </span>
                    
                    <div className="flex items-center gap-2">
                      {unit.category && (
                        <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                          {unit.category}
                        </Badge>
                      )}
                      
                      <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${
                        unit.occupancyStatus === "occupied" 
                          ? "bg-green-100 text-green-700" 
                          : "bg-gray-100 text-gray-600"
                      }`}>
                        {unit.occupancyStatus === "occupied" ? (
                          <User className="h-3 w-3" />
                        ) : (
                          <UserX className="h-3 w-3" />
                        )}
                        {unit.occupancyStatus === "occupied" ? "Occupied" : "Vacant"}
                      </div>
                    </div>
                  </div>

                  {unit.tenant && (
                    <div className="text-xs text-gray-600">
                      <span className="font-medium">{unit.tenant.name}</span>
                      <span className="text-gray-500 ml-1">({unit.tenant.type})</span>
                    </div>
                  )}
                  
                  {unit.notes && (
                    <div className="text-xs text-gray-500 mt-1 italic">
                      {unit.notes}
                    </div>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
