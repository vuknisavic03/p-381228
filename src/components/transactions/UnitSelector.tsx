
import React, { useState } from "react";
import { Building, Search, User, UserX } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface Unit {
  id: string;
  unitNumber: string;
  category?: string;
  occupancyStatus: "occupied" | "vacant";
  tenant?: {
    name: string;
    type: string;
    email?: string;
    phone?: string;
  };
}

interface UnitSelectorProps {
  units: Unit[];
  selectedUnitId: string;
  onUnitSelect: (unitId: string) => void;
  placeholder?: string;
}

export function UnitSelector({ units, selectedUnitId, onUnitSelect, placeholder = "Select unit" }: UnitSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("");
  
  const selectedUnit = units.find(u => u.id === selectedUnitId);
  
  const filteredUnits = units.filter(unit => 
    unit.unitNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    unit.tenant?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    unit.occupancyStatus.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    if (status === "occupied") {
      return (
        <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs px-2 py-0.5">
          <User className="h-3 w-3 mr-1" />
          Occupied
        </Badge>
      );
    }
    return (
      <Badge variant="secondary" className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5">
        <UserX className="h-3 w-3 mr-1" />
        Vacant
      </Badge>
    );
  };

  return (
    <div className="space-y-3">
      <div className="text-xs font-medium text-gray-500 mb-1.5 ml-0.5">Unit</div>
      
      <Select value={selectedUnitId} onValueChange={onUnitSelect}>
        <SelectTrigger className="w-full h-auto min-h-[3.5rem] border-gray-200 bg-white text-sm focus:ring-2 focus:ring-gray-100 focus:border-gray-300 text-gray-900 rounded-md">
          <SelectValue placeholder={placeholder}>
            {selectedUnit ? (
              <div className="flex items-center justify-between w-full py-2">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 bg-blue-50 rounded-lg">
                    <Building className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex flex-col items-start">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-gray-900 text-base">{selectedUnit.unitNumber}</span>
                      {getStatusBadge(selectedUnit.occupancyStatus)}
                    </div>
                    {selectedUnit.tenant ? (
                      <div className="text-sm text-gray-600">
                        <div className="font-medium">{selectedUnit.tenant.name}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{selectedUnit.tenant.type}</div>
                      </div>
                    ) : (
                      <div className="text-sm text-gray-500">
                        Available for rent
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 text-gray-400 py-2">
                <div className="flex items-center justify-center w-10 h-10 bg-gray-50 rounded-lg">
                  <Building className="h-5 w-5" />
                </div>
                <span className="text-base">{placeholder}</span>
              </div>
            )}
          </SelectValue>
        </SelectTrigger>
        
        <SelectContent className="w-full max-h-80">
          {/* Search input */}
          <div className="p-3 border-b border-gray-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search units or tenants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 h-9 border-gray-200 bg-gray-50 text-sm focus:bg-white"
              />
            </div>
          </div>
          
          {/* Unit list */}
          <div className="max-h-60 overflow-y-auto">
            {filteredUnits.length === 0 ? (
              <div className="p-4 text-center text-gray-500 text-sm">
                No units found matching "{searchTerm}"
              </div>
            ) : (
              filteredUnits.map((unit) => (
                <SelectItem 
                  key={unit.id} 
                  value={unit.id}
                  className="p-0"
                >
                  <div className="flex items-center gap-3 w-full p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-center w-10 h-10 bg-blue-50 rounded-lg">
                      <Building className="h-5 w-5 text-blue-600" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-gray-900 text-sm">
                          {unit.unitNumber}
                        </span>
                        {getStatusBadge(unit.occupancyStatus)}
                      </div>
                      
                      {unit.tenant ? (
                        <div className="text-xs text-gray-600">
                          <div className="font-medium">{unit.tenant.name}</div>
                          <div className="text-gray-500 mt-0.5">{unit.tenant.type}</div>
                          {unit.tenant.email && (
                            <div className="text-gray-500 mt-0.5">{unit.tenant.email}</div>
                          )}
                        </div>
                      ) : (
                        <div className="text-xs text-gray-500">
                          Available for rent
                        </div>
                      )}
                    </div>
                  </div>
                </SelectItem>
              ))
            )}
          </div>
        </SelectContent>
      </Select>
    </div>
  );
}
