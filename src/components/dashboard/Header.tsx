
import React from "react";
import { Calendar } from "lucide-react";

export function Header() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 className="text-2xl md:text-[36px] text-[#1A1A1A] font-semibold mb-1">Good morning, Kevin</h1>
        <p className="text-xl md:text-[28px] text-[#9EA3AD] font-medium">Today, Dec 21</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 border border-[#E7E8EC] rounded-md px-3 py-2">
          <Calendar className="w-4 h-4 text-[#1A1A1A]" />
          <span className="text-xs font-medium text-[#1A1A1A]">December 2024</span>
        </div>
      </div>
    </div>
  );
}
