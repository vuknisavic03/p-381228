
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreateWorkspaceDialog } from '@/components/workspace/CreateWorkspaceDialog';
import { WorkspaceSidebar } from '@/components/workspace/WorkspaceSidebar';
import { ChartToggleButtons } from '@/components/workspace/ChartToggleButtons';
import { RevenueChartsGrid } from '@/components/workspace/RevenueChartsGrid';
import { CommissionChart } from '@/components/workspace/CommissionChart';
import { workspaces, Workspace } from '@/data/workspaceData';
import { useToast } from '@/hooks/use-toast';

export default function WorkspacePicker() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeChartType, setActiveChartType] = useState<'revenue' | 'commission'>('revenue');
  const [filteredWorkspaces, setFilteredWorkspaces] = useState(workspaces);

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

  const handleRemoveClient = (workspace: Workspace) => {
    setFilteredWorkspaces(prev => prev.filter(w => w.name !== workspace.name));
  };

  return (
    <div className="h-screen flex overflow-hidden bg-white">
      <WorkspaceSidebar 
        workspaces={filteredWorkspaces}
        onWorkspaceSelect={handleWorkspaceSelect}
        onCreateWorkspace={handleCreateWorkspace}
        onRemoveClient={handleRemoveClient}
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
              workspaces={filteredWorkspaces}
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
