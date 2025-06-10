import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface Workspace {
  name: string;
  owner: string;
  initials?: string;
}

const workspaces: Workspace[] = [
  { name: "Kevin's Workspace", owner: "Kevin Anderson", initials: "KA" },
  { name: "Lucas's Workspace", owner: "Lucas Everett", initials: "LE" },
  { name: "Mia's Workspace", owner: "Mia Holloway", initials: "MH" },
  { name: "Nathan's Workspace", owner: "Nathan Caldwell", initials: "NC" },
  { name: "Sophia's Workspace", owner: "Sophia Riggins", initials: "SR" },
];

export function WorkspaceList() {
  const navigate = useNavigate();

  const handleWorkspaceSelect = (workspace: Workspace) => {
    // Generate initials if not provided
    const initials = workspace.initials || workspace.owner
      .split(' ')
      .map(name => name[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
    
    // Navigate to dashboard with workspace info
    navigate('/dashboard', { 
      state: { 
        workspace: {
          name: workspace.name,
          owner: workspace.owner,
          initials: initials
        }
      } 
    });
  };

  return (
    <div className="w-[280px] border-r border-[#EAEAEC] h-full bg-white">
      <div className="p-4 border-b border-[#EAEAEC]">
        <div className="flex items-center justify-between">
          <h2 className="text-[#1A1A1A] text-lg font-semibold">Choose Workspace</h2>
          <button className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100">
            <span className="text-2xl text-[#1A1A1A]">+</span>
          </button>
        </div>
      </div>
      <div className="space-y-1 p-2">
        {workspaces.map((workspace) => (
          <button
            key={workspace.name}
            className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-[#F9F9FA] transition-colors text-left"
            onClick={() => handleWorkspaceSelect(workspace)}
          >
            <div>
              <div className="text-[#1A1A1A] font-medium text-base">{workspace.name}</div>
              <div className="text-sm text-[#9EA3AD]">{workspace.owner}</div>
            </div>
            <ChevronRight className="w-5 h-5 text-[#9EA3AD]" />
          </button>
        ))}
      </div>
    </div>
  );
}

