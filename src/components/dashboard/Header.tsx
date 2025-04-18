
import React from "react";
import { Calendar } from "lucide-react";

export function Header() {
  return (
    <div className="flex justify-between items-center mb-12">
      <div>
        <h1 className="text-[36px] text-[#1A1A1A] font-semibold">Good morning, Kevin</h1>
        <p className="text-[28px] text-[#9EA3AD] font-medium">Today, Dec 21</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-white px-2 py-1.5">
          <div className="bg-[#F3F3F6] text-[#9EA3AD] font-semibold w-[26px] h-[26px] flex items-center justify-center rounded">
            U
          </div>
          <span className="text-[#1A1A1A] font-medium">User's Space</span>
        </div>
        <div className="text-[#9EA3AD] text-sm font-semibold">Edited just now</div>
        <div className="flex items-center gap-1 border border-[#E7E8EC] rounded px-1.5 py-1.5">
          <Calendar className="w-4 h-4" />
          <span className="text-xs font-medium">December 2024</span>
        </div>
      </div>
    </div>
  );
}
