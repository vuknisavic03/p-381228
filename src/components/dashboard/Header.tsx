
import React from "react";
import { Calendar } from "lucide-react";

export function Header() {
  return (
    <div className="flex justify-between items-start">
      <div>
        <h1 className="text-[36px] text-[#1A1A1A] font-semibold leading-tight mb-2">Good morning, Kevin</h1>
        <p className="text-[28px] text-[#9EA3AD] font-medium leading-none">Today, Dec 21</p>
      </div>
      <div className="flex items-center">
        <div className="flex items-center gap-2.5 border border-[#E7E8EC] rounded-md px-4 py-2.5">
          <Calendar className="w-4 h-4 text-[#1A1A1A]" />
          <span className="text-sm font-medium text-[#1A1A1A]">December 2024</span>
        </div>
      </div>
    </div>
  );
}
