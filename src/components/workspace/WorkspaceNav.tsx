
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { LayoutDashboard, List, BarChart } from 'lucide-react';

export function WorkspaceNav() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

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
      <div className="p-4">
        <div className="text-sm text-[#9EA3AD] font-semibold mb-4">WORKSPACE</div>
        <div className="space-y-2">
          <div
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer",
              isActive('/dashboard') && "bg-[#F6F6F7]"
            )}
            onClick={() => navigate('/dashboard')}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className={cn(
              "text-[#1A1A1A]",
              isActive('/dashboard') ? "font-semibold" : "font-medium"
            )}>Overview</span>
          </div>
          <div
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer",
              isActive('/listings') && "bg-[#F6F6F7]"
            )}
            onClick={() => navigate('/listings')}
          >
            <List className="w-5 h-5" />
            <span className={cn(
              "text-[#1A1A1A]",
              isActive('/listings') ? "font-semibold" : "font-medium"
            )}>Listings</span>
          </div>
          <div
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer",
              isActive('/transactions') && "bg-[#F6F6F7]"
            )}
            onClick={() => navigate('/transactions')}
          >
            <BarChart className="w-5 h-5" />
            <span className={cn(
              "text-[#1A1A1A]",
              isActive('/transactions') ? "font-semibold" : "font-medium"
            )}>Transactions</span>
          </div>
        </div>
      </div>
    </div>
  );
}
