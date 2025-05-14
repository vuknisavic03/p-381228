
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function WorkspaceManager() {
  const location = useLocation();
  const navigate = useNavigate();
  const workspaceData = location.state?.workspace || {
    name: "Kevin's Workspace", 
    owner: "Kevin Anderson", 
    initials: "KA"
  };

  // Go back to the previous page, preserving workspace data
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="h-screen bg-white overflow-auto">
      <div className="p-4 border-b border-[#E4E5EA] flex items-center">
        <Button 
          variant="outline"
          onClick={handleBack}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <h1 className="ml-4 text-xl font-semibold">Workspace Manager</h1>
      </div>
      
      <div className="p-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 rounded-lg bg-[#F6F6F7] flex items-center justify-center text-2xl font-medium text-[#9EA3AD] mr-5">
              {workspaceData.initials}
            </div>
            <div>
              <h2 className="text-2xl font-bold">{workspaceData.name}</h2>
              <p className="text-gray-500">Managed by {workspaceData.owner}</p>
            </div>
          </div>

          <div className="grid gap-6">
            <div className="border rounded-lg p-6 bg-white shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Workspace Settings</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Workspace Name
                    </label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      defaultValue={workspaceData.name}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Owner
                    </label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      defaultValue={workspaceData.owner}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-5">
                <Button>Save Changes</Button>
              </div>
            </div>

            <div className="border rounded-lg p-6 bg-white shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Client Information</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Client Name
                    </label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      defaultValue={workspaceData.owner}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input 
                      type="email" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      defaultValue={`${workspaceData.owner.toLowerCase().replace(' ', '.')}@example.com`}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      defaultValue="(555) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      defaultValue="123 Main St, City, State"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-5">
                <Button>Update Client Information</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
