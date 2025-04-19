
import React from 'react';
import { ChevronRight } from 'lucide-react';

interface Workspace {
  name: string;
  owner: string;
}

const workspaces: Workspace[] = [
  { name: "Kevin's Workspace", owner: "Kevin Anderson" },
  { name: "Lucas's Workspace", owner: "Lucas Everett" },
  { name: "Mia's Workspace", owner: "Mia Holloway" },
  { name: "Nathan's Workspace", owner: "Nathan Caldwell" },
  { name: "Sophia's Workspace", owner: "Sophia Riggins" },
];

export function WorkspaceList() {
  return (
    <div className="w-[280px] border-r border-[#E4E5EA] h-full bg-white">
      <div className="p-4 border-b border-[#E4E5EA]">
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
            className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-[#F6F6F7] transition-colors text-left"
          >
            <div>
              <div className="text-[#1A1A1A] font-medium">{workspace.name}</div>
              <div className="text-sm text-[#9EA3AD]">{workspace.owner}</div>
            </div>
            <ChevronRight className="w-5 h-5 text-[#9EA3AD]" />
          </button>
        ))}
      </div>
    </div>
  );
}
