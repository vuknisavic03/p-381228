
import React from "react";
import { DashboardLayout } from "./DashboardLayout";
import { WorkspaceOverview } from "../workspace/WorkspaceOverview";

export function Overview() {
  return (
    <DashboardLayout>
      <WorkspaceOverview />
    </DashboardLayout>
  );
}
