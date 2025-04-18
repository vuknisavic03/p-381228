
import React from 'react';
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

export default function Listings() {
  return (
    <DashboardLayout>
      <div className="px-10 pt-8">
        <h1 className="text-2xl font-semibold mb-4">Listings</h1>
        <p>Your listings will appear here.</p>
      </div>
    </DashboardLayout>
  );
}
