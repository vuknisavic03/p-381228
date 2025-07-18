
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreateWorkspaceDialog } from '@/components/workspace/CreateWorkspaceDialog';
import { WorkspaceSidebar } from '@/components/workspace/WorkspaceSidebar';
import { ChartToggleButtons } from '@/components/workspace/ChartToggleButtons';
import { RevenueChartsGrid } from '@/components/workspace/RevenueChartsGrid';
import { CommissionChart } from '@/components/workspace/CommissionChart';
import { workspaces, Workspace } from '@/data/workspaceData';

export default function WorkspacePicker() {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeChartType, setActiveChartType] = useState<'revenue' | 'commission'>('revenue');

  const handleWorkspaceSelect = (workspace: Workspace) => {
    // Pass the workspace data to the dashboard via state
    navigate('/dashboard', { 
      state: { 
        workspace: {
          name: workspace.name,
          owner: workspace.owner,
          initials: workspace.initials
        } 
      } 
    });
  };

  const handleCreateWorkspace = () => {
    setIsDialogOpen(true);
  };

  const handleChartTypeChange = (type: 'revenue' | 'commission') => {
    setActiveChartType(type);
  };

  return (
    <div className="h-screen flex overflow-hidden bg-white">
      <WorkspaceSidebar 
        workspaces={workspaces}
        onWorkspaceSelect={handleWorkspaceSelect}
        onCreateWorkspace={handleCreateWorkspace}
      />

      <div className="flex-1 overflow-auto pb-6">
        <div className="w-full mx-auto p-2 md:px-4">
          <div className="mb-5">            
            <ChartToggleButtons 
              activeChartType={activeChartType}
              onChartTypeChange={handleChartTypeChange}
            />
          </div>
          
          {activeChartType === 'revenue' ? (
            <RevenueChartsGrid 
              workspaces={workspaces}
              onWorkspaceSelect={handleWorkspaceSelect}
            />
          ) : (
            <CommissionChart />
          )}
        </div>
      </div>
      
      <CreateWorkspaceDialog 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen}
      />
    </div>
  );
}
