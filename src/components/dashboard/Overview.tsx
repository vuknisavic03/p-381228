
import React from "react";
import { DashboardLayout } from "./DashboardLayout";

export function Overview() {
  return (
    <DashboardLayout>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
        <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-100">
          <p className="text-gray-600">Welcome to your dashboard! This is an overview of your account.</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
