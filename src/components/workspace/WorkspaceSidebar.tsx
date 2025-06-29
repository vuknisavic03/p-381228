
import React from 'react';
import { ChevronRight, Plus } from 'lucide-react';
import { Workspace } from '@/data/workspaceData';

interface WorkspaceSidebarProps {
  workspaces: Workspace[];
  onWorkspaceSelect: (workspace: Workspace) => void;
  onCreateWorkspace: () => void;
}

export const WorkspaceSidebar: React.FC<WorkspaceSidebarProps> = ({
  workspaces,
  onWorkspaceSelect,
  onCreateWorkspace
}) => {
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
          <button
            key={workspace.name}
            onClick={() => onWorkspaceSelect(workspace)}
            className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors text-left mx-1.5"
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
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>
        ))}
      </div>
    </div>
  );
};
