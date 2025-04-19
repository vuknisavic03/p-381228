
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";

export function Sidebar() {
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
            <img
              src="https://cdn.builder.io/api/v1/image/assets/050fc8f9f07a4911bdb5a576ed825054/4d45b3f00f54d0b9b021c6c0492b60eeeac9b73d"
              className="w-5 h-5"
              alt="Overview icon"
            />
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
            <img
              src="https://cdn.builder.io/api/v1/image/assets/050fc8f9f07a4911bdb5a576ed825054/33648ba2911e7b4a132f0393b030f068f0e68c68"
              className="w-5 h-5"
              alt="Listings icon"
            />
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
            <img
              src="https://cdn.builder.io/api/v1/image/assets/050fc8f9f07a4911bdb5a576ed825054/aed2de8395d4d607024afd11386607b1be368ac0"
              className="w-5 h-5"
              alt="Transactions icon"
            />
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
