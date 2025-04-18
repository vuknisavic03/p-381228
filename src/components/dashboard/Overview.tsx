import React from "react";
import { Sidebar } from "./Sidebar";
import { RevenueChart } from "./RevenueChart";
import { ProfitChart } from "./ProfitChart";
import { PeakProfitChart } from "./PeakProfitChart";
import { IncomeChart } from "./IncomeChart";

export function Overview() {
  return (
    <div className="bg-white flex flex-col overflow-hidden items-stretch min-h-screen">
      <div className="flex flex-1">
        <div className="w-[17%] border-r border-[#E4E5EA]">
          <Sidebar />
        </div>
        <div className="flex-1 px-12 pt-[52px] pb-4">
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
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/050fc8f9f07a4911bdb5a576ed825054/03808e2390e5b7ca1939517fccbcfa07c3eec33e"
                  alt="Calendar"
                  className="w-4 h-4"
                />
                <span className="text-xs font-medium">December 2024</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5 mb-5">
            <RevenueChart />
            <ProfitChart />
          </div>

          <div className="grid grid-cols-12 gap-5">
            <div className="col-span-7">
              <PeakProfitChart />
            </div>
            <div className="col-span-5">
              <IncomeChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
