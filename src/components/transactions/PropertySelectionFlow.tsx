
import React from "react";
import { ArrowRight, CheckCircle, Circle } from "lucide-react";
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
      {/* Progress Steps */}
      <div className="flex items-center gap-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
        <div className="flex items-center gap-3">
          {isPropertySelected ? (
            <CheckCircle className="h-6 w-6 text-green-500" />
          ) : (
            <Circle className="h-6 w-6 text-gray-300" />
          )}
          <span className={`text-sm font-medium ${
            isPropertySelected ? "text-green-700" : "text-gray-500"
          }`}>
            Select Property
          </span>
        </div>
        
        {hasUnits && (
          <>
            <ArrowRight className="h-5 w-5 text-gray-300" />
            <div className="flex items-center gap-3">
              {isUnitSelected ? (
                <CheckCircle className="h-6 w-6 text-green-500" />
              ) : (
                <Circle className="h-6 w-6 text-gray-300" />
              )}
              <span className={`text-sm font-medium ${
                isUnitSelected ? "text-green-700" : "text-gray-500"
              }`}>
                Select Unit
              </span>
            </div>
          </>
        )}
      </div>

      {/* Step 1: Property Selection */}
      <Card className="p-8 shadow-sm border border-gray-200">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Choose Property
          </h3>
          <p className="text-sm text-gray-600">
            Select the property for this transaction from your portfolio
          </p>
        </div>
        
        <PropertySelector
          listings={listings}
          selectedListingId={selectedListingId}
          onSelect={onListingSelect}
        />
      </Card>

      {/* Step 2: Unit Selection (only if property has units) */}
      {selectedListing && hasUnits && (
        <Card className="p-8 shadow-sm border border-gray-200">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Choose Unit
            </h3>
            <p className="text-sm text-gray-600">
              Select the specific unit at <span className="font-medium text-gray-900">{selectedListing.name}</span>
            </p>
          </div>
          
          <UnitSelectorCard
            units={selectedListing.units || []}
            selectedUnitId={selectedUnitId}
            onUnitSelect={onUnitSelect}
          />
        </Card>
      )}

      {/* Completion Status */}
      {isComplete && (
        <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl">
          <CheckCircle className="h-6 w-6 text-green-500" />
          <div>
            <span className="text-sm font-medium text-green-700">
              Selection complete!
            </span>
            <p className="text-xs text-green-600 mt-1">
              You can now proceed with the transaction details.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
