
import React, { useState } from 'react';
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { GoogleMapsApiInput } from "@/components/listings/GoogleMapsApiInput";
import { useGoogleMapsApi } from "@/hooks/useGoogleMapsApi";

function Listings() {
  const { apiKey, setApiKey, isLoaded, loadError, isApiKeyValid } = useGoogleMapsApi();
  const [showApiInput, setShowApiInput] = useState(!isApiKeyValid);

  const handleApiKeySubmit = (newApiKey: string) => {
    setApiKey(newApiKey);
    setShowApiInput(false);
  };

  const handleAddListing = () => {
    console.log("Add new listing clicked");
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col h-full">
        <PageHeader 
          title="Listings"
          onAddClick={handleAddListing}
          addButtonText="Add Listing"
        />
        
        <div className="flex-1 p-6">
          {showApiInput ? (
            <div className="flex items-center justify-center h-full">
              <GoogleMapsApiInput onApiKeySubmit={handleApiKeySubmit} />
            </div>
          ) : (
            <div className="max-w-7xl mx-auto">
              <div className="text-center py-12">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Listings Management</h2>
                <p className="text-gray-600">Google Maps is configured and ready to use.</p>
                {isLoaded && <p className="text-green-600 mt-2">✓ Maps loaded successfully</p>}
                {loadError && <p className="text-red-600 mt-2">✗ Error loading maps</p>}
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Listings;
