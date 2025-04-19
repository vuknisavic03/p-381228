
import React from "react";
import { DashboardLayout } from "./DashboardLayout";

export function Overview() {
  return (
    <DashboardLayout>
      <div className="p-8">
        <h1 className="text-2xl font-semibold">Welcome to your Dashboard</h1>
      </div>
    </DashboardLayout>
  );
}
