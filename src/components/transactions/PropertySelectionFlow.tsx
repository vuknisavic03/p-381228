
import React from "react";
import { ArrowRight, CheckCircle, Circle, Building2, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { PropertySelector } from "./PropertySelector";
import { UnitSelectorCard } from "./UnitSelectorCard";
import { Listing } from "./TransactionFormTypes";

interface PropertySelectionFlowProps {
  listings: Listing[];
  selectedListingId: string;
  selectedUnitId: string;
  onListingSelect: (listingId: string) => void;
  onUnitSelect: (unitId: string) => void;
}

export function PropertySelectionFlow({
  listings,
  selectedListingId,
  selectedUnitId,
  onListingSelect,
  onUnitSelect
}: PropertySelectionFlowProps) {
  const selectedListing = listings.find(l => l.id === selectedListingId);
  const hasUnits = selectedListing?.units && selectedListing.units.length > 0;
  const isPropertySelected = !!selectedListingId;
  const isUnitSelected = !hasUnits || !!selectedUnitId;
  const isComplete = isPropertySelected && isUnitSelected;

  return (
    <div className="space-y-8">
      {/* Progress Steps with Modern Design */}
      <div className="flex items-center gap-6 p-6 bg-gradient-to-r from-gray-50 to-slate-50 rounded-2xl border border-gray-200">
        <div className="flex items-center gap-4">
          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
            isPropertySelected ? "bg-green-500" : "bg-gray-300"
          } transition-all duration-300`}>
            {isPropertySelected ? (
              <CheckCircle className="h-5 w-5 text-white" />
            ) : (
              <Circle className="h-5 w-5 text-white" />
            )}
          </div>
          <span className={`text-base font-semibold transition-colors duration-300 ${
            isPropertySelected ? "text-green-700" : "text-gray-500"
          }`}>
            Select Property
          </span>
        </div>
        
        {hasUnits && (
          <>
            <ArrowRight className="h-5 w-5 text-gray-400" />
            <div className="flex items-center gap-4">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                isUnitSelected ? "bg-green-500" : "bg-gray-300"
              } transition-all duration-300`}>
                {isUnitSelected ? (
                  <CheckCircle className="h-5 w-5 text-white" />
                ) : (
                  <Circle className="h-5 w-5 text-white" />
                )}
              </div>
              <span className={`text-base font-semibold transition-colors duration-300 ${
                isUnitSelected ? "text-green-700" : "text-gray-500"
              }`}>
                Select Unit
              </span>
            </div>
          </>
        )}
      </div>

      {/* Step 1: Property Selection with Enhanced Card */}
      <Card className="p-8 shadow-sm border border-gray-200 rounded-2xl hover:shadow-md transition-all duration-200">
        <div className="mb-8 space-y-2">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-blue-100 flex items-center justify-center">
              <Building2 className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Choose Property</h3>
              <p className="text-sm text-gray-600">Select the property for this transaction</p>
            </div>
          </div>
        </div>
        
        <PropertySelector
          listings={listings}
          selectedListingId={selectedListingId}
          onSelect={onListingSelect}
        />
      </Card>

      {/* Step 2: Unit Selection with Enhanced Design */}
      {selectedListing && hasUnits && (
        <Card className="p-8 shadow-sm border border-gray-200 rounded-2xl hover:shadow-md transition-all duration-200">
          <div className="mb-8 space-y-2">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-purple-100 flex items-center justify-center">
                <Building2 className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Choose Unit</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>Select the specific unit at</span>
                  <span className="font-semibold text-gray-900">{selectedListing.name}</span>
                </div>
              </div>
            </div>
          </div>
          
          <UnitSelectorCard
            units={selectedListing.units || []}
            selectedUnitId={selectedUnitId}
            onUnitSelect={onUnitSelect}
          />
        </Card>
      )}

      {/* Completion Status with Celebration Design */}
      {isComplete && (
        <div className="flex items-center gap-4 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl">
          <div className="h-12 w-12 rounded-full bg-green-500 flex items-center justify-center">
            <CheckCircle className="h-6 w-6 text-white" />
          </div>
          <div className="space-y-1">
            <span className="text-base font-bold text-green-800">
              Perfect! Selection Complete
            </span>
            <p className="text-sm text-green-600">
              You can now proceed with the transaction details below.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
