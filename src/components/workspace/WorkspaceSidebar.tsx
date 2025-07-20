
import React, { useState } from 'react';
import { ChevronRight, Plus, UserX } from 'lucide-react';
import { Workspace } from '@/data/workspaceData';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface WorkspaceSidebarProps {
  workspaces: Workspace[];
  onWorkspaceSelect: (workspace: Workspace) => void;
  onCreateWorkspace: () => void;
  onRemoveClient?: (workspace: Workspace) => void;
}

export const WorkspaceSidebar: React.FC<WorkspaceSidebarProps> = ({
  workspaces,
  onWorkspaceSelect,
  onCreateWorkspace,
  onRemoveClient
}) => {
  const { toast } = useToast();
  const [hoveredWorkspace, setHoveredWorkspace] = useState<string | null>(null);

  const handleRemoveClient = (e: React.MouseEvent, workspace: Workspace) => {
    e.stopPropagation();
    if (confirm(`Are you sure you want to remove ${workspace.owner} from this workspace?`)) {
      if (onRemoveClient) {
        onRemoveClient(workspace);
        toast({
          title: "Client Removed",
          description: `${workspace.owner} has been removed from the workspace.`,
        });
      }
    }
  };
  return (
    <div className="w-[280px] border-r border-gray-200 bg-white shadow-sm flex-shrink-0">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-gray-900 text-lg font-semibold">Workspaces</h2>
          <button 
            onClick={onCreateWorkspace}
            className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <Plus className="w-4 h-4 text-gray-900" />
          </button>
        </div>
      </div>
      <div className="overflow-auto h-[calc(100vh-57px)]">
        {workspaces.map((workspace) => (
          <div
            key={workspace.name}
            className="relative mx-1.5"
            onMouseEnter={() => setHoveredWorkspace(workspace.name)}
            onMouseLeave={() => setHoveredWorkspace(null)}
          >
            <button
              onClick={() => onWorkspaceSelect(workspace)}
              className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
            >
              <div className="flex items-center gap-2.5">
                <div className="min-w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-600">
                  {workspace.initials}
                </div>
                <div>
                  <div className="text-gray-900 font-medium truncate max-w-36 text-base">{workspace.name}</div>
                  <div className="text-sm text-gray-500 truncate max-w-36">{workspace.owner}</div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {onRemoveClient && hoveredWorkspace === workspace.name && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => handleRemoveClient(e, workspace)}
                    className="h-6 w-6 p-0 hover:bg-red-50 text-red-500 hover:text-red-600"
                  >
                    <UserX className="h-3 w-3" />
                  </Button>
                )}
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
