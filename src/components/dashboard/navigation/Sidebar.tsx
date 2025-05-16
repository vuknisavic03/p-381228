import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";

interface NavItemProps {
  icon: string;
  label: string;
  path: string;
  isActive?: boolean;
}

function NavItem({ icon, label, path, isActive }: NavItemProps) {
  const navigate = useNavigate();
  return (
    <div
      className={cn(
        "flex items-center gap-3 px-4 py-2.5 rounded-md transition-all duration-200 ease-in-out cursor-pointer",
        "hover:bg-[#F6F6F7] hover:translate-x-1",
        isActive ? "bg-[#F6F6F7]" : ""
      )}
      onClick={() => navigate(path)}
    >
      <img 
        src={icon} 
        className={cn(
          "w-5 h-5",
          isActive ? "filter-[#1EAEDB] brightness-0 saturate-100 invert-[39%] sepia-[93%] saturate-[2000%] hue-rotate-[165deg]" : "brightness-0"
        )} 
        alt={`${label} icon`}
      />
      <span className={cn(
        "text-[1.08rem] text-[#1A1A1A]",
        isActive ? "font-bold" : "font-normal"
      )}>
        {label}
      </span>
    </div>
  );
}

export function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="p-4 h-full flex flex-col">
      <Button
        variant="ghost"
        onClick={() => navigate("/profile")}
        className="flex items-center gap-2 px-2 py-2 mb-4 h-auto hover:bg-[#F6F6F7] hover:translate-x-1 transition-all duration-200 ease-in-out w-full justify-start"
      >
        <div className="bg-[#F3F3F6] text-[#9EA3AD] font-semibold w-8 h-8 flex items-center justify-center rounded-md">
          U
        </div>
        <span className="text-[#1A1A1A] font-medium text-base">User's Space</span>
      </Button>
      
      <div className="text-sm text-[#9EA3AD] font-bold mb-4 px-2">WORKSPACE</div>
      <div className="space-y-1">
        <NavItem
          icon="https://cdn.builder.io/api/v1/image/assets/050fc8f9f07a4911bdb5a576ed825054/4d45b3f00f54d0b9b021c6c0492b60eeeac9b73d"
          label="Overview"
          path="/"
          isActive={location.pathname === '/'}
        />
        <NavItem
          icon="https://cdn.builder.io/api/v1/image/assets/050fc8f9f07a4911bdb5a576ed825054/33648ba2911e7b4a132f0393b030f068f0e68c68"
          label="Listings"
          path="/listings"
          isActive={location.pathname === '/listings'}
        />
        <NavItem
          icon="https://cdn.builder.io/api/v1/image/assets/050fc8f9f07a4911bdb5a576ed825054/aed2de8395d4d607024afd11386607b1be368ac0"
          label="Transactions"
          path="/transactions"
          isActive={location.pathname === '/transactions'}
        />
      </div>
    </div>
  );
}
