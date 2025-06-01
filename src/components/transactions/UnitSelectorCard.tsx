
import React from "react";
import { Building, Users, CheckCircle2, User, UserX, Crown } from "lucide-react";
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
    <div className="space-y-4">
      <div className="flex items-center gap-3 text-sm font-semibold text-gray-700">
        <Users className="h-4 w-4" />
        Select Unit ({units.length} available)
      </div>
      
      <div className="grid gap-3 max-h-72 overflow-y-auto pr-2">
        {units.map((unit) => {
          const isSelected = unit.id === selectedUnitId;
          
          return (
            <Card
              key={unit.id}
              className={`relative p-5 cursor-pointer transition-all duration-200 border-2 hover:shadow-md ${
                isSelected 
                  ? "border-blue-500 bg-blue-50/50 shadow-sm scale-[1.01]" 
                  : "border-gray-200 bg-white hover:border-blue-200"
              }`}
              onClick={() => onUnitSelect(unit.id)}
            >
              {/* Selection indicator */}
              {isSelected && (
                <div className="absolute top-3 right-3">
                  <div className="h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center">
                    <CheckCircle2 className="h-3 w-3 text-white" />
                  </div>
                </div>
              )}

              <div className="flex items-start gap-4">
                {/* Unit Icon */}
                <div className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200 ${
                  isSelected ? "bg-blue-500" : "bg-gray-100"
                }`}>
                  <Building className={`h-5 w-5 transition-colors duration-200 ${
                    isSelected ? "text-white" : "text-gray-500"
                  }`} />
                </div>

                {/* Unit Details */}
                <div className="flex-1 min-w-0 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-900 text-base">
                      Unit {unit.unitNumber}
                    </span>
                    
                    <div className="flex items-center gap-2">
                      {unit.category && (
                        <Badge variant="outline" className="text-xs px-2 py-1 bg-gray-50">
                          {unit.category}
                        </Badge>
                      )}
                      
                      <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
                        unit.occupancyStatus === "occupied" 
                          ? "bg-green-100 text-green-700 border border-green-200" 
                          : "bg-gray-100 text-gray-600 border border-gray-200"
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
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <Crown className="h-4 w-4 text-amber-500" />
                      <div className="text-sm">
                        <span className="font-semibold text-gray-900">{unit.tenant.name}</span>
                        <span className="text-gray-500 ml-2">({unit.tenant.type})</span>
                      </div>
                    </div>
                  )}
                  
                  {unit.notes && (
                    <div className="text-xs text-gray-600 italic bg-blue-50 p-2 rounded-lg border border-blue-100">
                      "{unit.notes}"
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
