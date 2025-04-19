
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { WorkspaceList } from "@/components/workspace/WorkspaceList";

export default function WorkspacePicker() {
  const location = useLocation();
  const fromPage = location.state?.from || "/dashboard";

  return (
    <div className="h-screen bg-white">
      <WorkspaceList returnTo={fromPage} />
    </div>
  );
}
