
import React from 'react';
import { PropertyManagerProfile } from '@/components/profile/PropertyManagerProfile';
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

export default function PropertyManagerProfilePage() {
  return (
    <DashboardLayout>
      <div className="h-full bg-white p-8">
        <PropertyManagerProfile />
      </div>
    </DashboardLayout>
  );
}
