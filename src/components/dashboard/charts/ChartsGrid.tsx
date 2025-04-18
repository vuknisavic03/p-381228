
import React from "react";
import { RevenueChart } from "./RevenueChart";
import { ProfitChart } from "./ProfitChart";
import { PeakProfitChart } from "./PeakProfitChart";
import { IncomeChart } from "./IncomeChart";

export function ChartsGrid() {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-5">
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
  );
}
