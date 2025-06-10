import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { WorkspaceList } from "@/components/workspace/WorkspaceList";

export default function UserSpace() {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-white">
      <div className="p-4 border-b border-[#E4E5EA]">
        <Button 
          variant="outline"
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
      </div>
      <WorkspaceList />
    </div>
  );
}
