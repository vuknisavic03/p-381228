import React from "react";
import { Sidebar } from "./Sidebar";
import { RevenueChart } from "./RevenueChart";
import { ProfitChart } from "./ProfitChart";
import { PeakProfitChart } from "./PeakProfitChart";
import { IncomeChart } from "./IncomeChart";

export function Overview() {
  return (
    <div className="bg-white flex flex-col overflow-hidden items-stretch pt-[52px] pb-[15px]">
      <div className="z-10 flex w-full flex-col items-stretch pl-[19px] max-md:max-w-full">
        <div className="max-md:max-w-full">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
            <div className="w-[17%] max-md:w-full max-md:ml-0">
              <Sidebar />
            </div>
            <div className="w-[83%] ml-5 max-md:w-full max-md:ml-0">
              <div className="flex grow flex-col items-stretch text-[32px] text-[rgba(26,26,26,1)] font-semibold max-md:max-w-full max-md:mt-3.5">
                <div className="border shrink-0 h-px border-[rgba(228,229,234,1)] border-solid max-md:max-w-full" />
                <div className="ml-[47px] mt-[52px] max-md:ml-2.5 max-md:mt-10">
                  <span className="text-[36px]">Good morning, Kevin</span>
                  <br />
                  <span className="font-medium text-[28px] text-[rgba(158,163,173,1)]">
                    Today, Dec 21
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="w-full max-w-[1321px] mr-12 mt-[42px] max-md:max-w-full max-md:mr-2.5 max-md:mt-10">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
            <div className="w-6/12 max-md:w-full max-md:ml-0">
              <RevenueChart />
            </div>
            <div className="w-6/12 ml-5 max-md:w-full max-md:ml-0">
              <ProfitChart />
            </div>
          </div>
        </div>
      </div>

      {/* Header Info */}
      <div className="flex mt-[-651px] w-full max-w-[1692px] items-stretch gap-5 flex-wrap justify-between ml-[11px] max-md:max-w-full max-md:mt-[-200px]">
        <div className="flex gap-3">
          <div className="bg-white flex items-stretch gap-[7px] text-xl mt-2.5 px-2 py-[7px]">
            <div className="bg-[rgba(243,243,246,1)] text-[rgba(158,163,173,1)] font-semibold whitespace-nowrap text-center w-[26px] h-[26px] px-[7px] rounded-[5px]">
              U
            </div>
            <div className="text-[rgba(26,26,26,1)] font-medium basis-auto">
              User's Space
            </div>
          </div>
          <div className="border self-stretch w-px shrink-0 h-[1117px] border-[rgba(228,229,234,1)] border-solid" />
          <div className="text-[rgba(158,163,173,1)] text-sm font-semibold basis-auto mt-5">
            Edited just now
          </div>
        </div>
        <div className="bg-white border flex items-stretch gap-[3px] text-[13px] text-black font-medium mt-3 px-1.5 py-[7px] rounded-[5px] border-[rgba(231,232,236,1)] border-solid">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/050fc8f9f07a4911bdb5a576ed825054/03808e2390e5b7ca1939517fccbcfa07c3eec33e?placeholderIfAbsent=true"
            className="aspect-[1] object-contain w-[15px] shrink-0"
            alt="Calendar icon"
          />
          <div className="basis-auto my-auto">December 2024</div>
        </div>
      </div>

      {/* Bottom Charts Section */}
      <div className="w-full max-w-[1321px] mr-12 mt-[630px] max-md:max-w-full max-md:mr-2.5 max-md:mt-10">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
          <div className="w-[62%] max-md:w-full max-md:ml-0">
            <PeakProfitChart />
          </div>
          <div className="w-[38%] ml-5 max-md:w-full max-md:ml-0">
            <IncomeChart />
          </div>
        </div>
      </div>

      {/* Action Button */}
      <button className="bg-white border flex w-[41px] flex-col items-center justify-center h-[41px] ml-[19px] mt-[21px] px-2 rounded-md border-[rgba(231,232,236,1)] border-solid max-md:ml-2.5">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/050fc8f9f07a4911bdb5a576ed825054/91d334329402e7c834c94d310199705acdf35890?placeholderIfAbsent=true"
          className="aspect-[1] object-contain w-full"
          alt="Action button"
        />
      </button>
    </div>
  );
}
