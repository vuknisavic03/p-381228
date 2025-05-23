
import React, { useState } from 'react';
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { GoogleMapSearch } from "@/components/maps/GoogleMapSearch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MapSearch() {
  const [location, setLocation] = useState<{ lat: number; lng: number; address: string } | null>(null);
  
  const workspaceData = {
    name: "Kevin's Workspace", 
    owner: "Kevin Anderson", 
    initials: "KA"
  };

  const handleLocationChange = (newLocation: { lat: number; lng: number; address: string }) => {
    setLocation(newLocation);
  };

  return (
    <DashboardLayout
      workspaceName={workspaceData.name}
      userInitials={workspaceData.initials}
      owner={workspaceData.owner}
    >
      <div className="container mx-auto p-6 max-w-5xl">
        <h1 className="text-2xl font-bold mb-6">Map Search</h1>
        
        <div className="grid gap-6 md:grid-cols-7">
          <div className="md:col-span-5">
            <Card>
              <CardHeader>
                <CardTitle>Find Location by Address</CardTitle>
              </CardHeader>
              <CardContent>
                <GoogleMapSearch 
                  height="500px"
                  onLocationChange={handleLocationChange}
                />
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Location Details</CardTitle>
              </CardHeader>
              <CardContent>
                {location ? (
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Address</p>
                      <p className="text-gray-900">{location.address}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Coordinates</p>
                      <p className="text-gray-900">
                        Lat: {location.lat.toFixed(6)}<br />
                        Lng: {location.lng.toFixed(6)}
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500">Search for an address to see location details</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
