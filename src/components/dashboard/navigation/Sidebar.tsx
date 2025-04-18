
import React from "react";
import { cn } from "@/lib/utils";

interface NavItemProps {
  icon: string;
  label: string;
  isActive?: boolean;
}

function NavItem({ icon, label, isActive }: NavItemProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 px-3 py-2",
        isActive && "bg-[#F6F6F7] rounded-md"
      )}
    >
      <img src={icon} className="w-5 h-5" alt={`${label} icon`} />
      <span className={cn("text-[#1A1A1A]", isActive ? "font-semibold" : "font-medium")}>
        {label}
      </span>
    </div>
  );
}

export function Sidebar() {
  return (
    <div className="p-6 md:p-8 h-full flex flex-col">
      <div className="text-sm text-[#9EA3AD] font-semibold mb-4">WORKSPACE</div>
      <div className="space-y-2">
        <NavItem
          icon="https://cdn.builder.io/api/v1/image/assets/050fc8f9f07a4911bdb5a576ed825054/4d45b3f00f54d0b9b021c6c0492b60eeeac9b73d"
          label="Overview"
          isActive
        />
        <NavItem
          icon="https://cdn.builder.io/api/v1/image/assets/050fc8f9f07a4911bdb5a576ed825054/33648ba2911e7b4a132f0393b030f068f0e68c68"
          label="Listings"
        />
        <NavItem
          icon="https://cdn.builder.io/api/v1/image/assets/050fc8f9f07a4911bdb5a576ed825054/aed2de8395d4d607024afd11386607b1be368ac0"
          label="Transactions"
        />
      </div>
      
      <div className="mt-auto">
        <div className="flex items-center gap-2 bg-white px-2 py-1.5">
          <div className="bg-[#F3F3F6] text-[#9EA3AD] font-semibold w-[26px] h-[26px] flex items-center justify-center rounded">
            U
          </div>
          <span className="text-[#1A1A1A] font-medium">User's Space</span>
        </div>
      </div>
    </div>
  );
}
