import React from "react";

export function RevenueChart() {
  return (
    <div className="bg-white shadow-[0px_4px_12px_5px_rgba(243,243,246,0.3)] flex w-full flex-col items-stretch mx-auto pt-[27px] pb-[50px] px-[27px] rounded-[10px] border-[rgba(228,229,234,1)] max-md:max-w-full max-md:mt-[31px] max-md:px-5">
      <h2 className="text-black text-[22px] font-medium">Revenue</h2>
      <div className="flex items-stretch gap-[19px] text-sm text-[#465365] font-normal whitespace-nowrap text-right leading-none flex-wrap ml-[13px] mt-14 max-md:mt-10">
        <div>30</div>
        <div className="bg-[#E5E5EF] w-[527px] shrink-0 max-w-full h-2.5 border-[rgba(229,229,239,1)] border-dashed border-2" />
      </div>
      <div className="text-[#465365] text-right text-sm font-normal leading-none ml-3.5 mt-[59px] max-md:ml-2.5 max-md:mt-10">
        20
      </div>
      <div className="flex items-stretch gap-[19px] flex-wrap ml-[15px]">
        <div className="flex flex-col items-stretch text-sm text-[#465365] font-normal whitespace-nowrap text-right leading-none my-auto">
          <div>10</div>
          <div className="mt-[65px] max-md:mt-10">0</div>
        </div>
        <div className="grow shrink-0 basis-0 w-fit max-md:max-w-full">
          <div className="bg-[#E5E5EF] shrink-0 h-px border-[rgba(229,229,239,1)] border-dashed border-2 max-md:max-w-full" />
          <div className="bg-[#E5E5EF] shrink-0 h-px mt-[70px] border-[rgba(229,229,239,1)] border-dashed border-2 max-md:max-w-full max-md:mt-10" />
          <div className="flex items-stretch gap-5 flex-wrap justify-between ml-3.5 mr-4 mt-[60px] max-md:max-w-full max-md:mr-2.5 max-md:mt-10">
            <div className="stroke-[2px] bg-[#FF718B] flex w-[11px] shrink-0 h-[11px] fill-[#FF718B] stroke-white rounded-[50%] border-white border-solid border-2" />
            <div className="stroke-[2px] bg-[#FF718B] flex w-[11px] shrink-0 h-[11px] fill-[#FF718B] stroke-white rounded-[50%] border-white border-solid border-2" />
            <div className="stroke-[2px] bg-[#FF718B] flex w-[11px] shrink-0 h-[11px] fill-[#FF718B] stroke-white rounded-[50%] border-white border-solid border-2" />
            <div className="stroke-[2px] bg-[#FF718B] flex w-2.5 shrink-0 h-[11px] fill-[#FF718B] stroke-white rounded-[50%] border-white border-solid border-2" />
            <div className="stroke-[2px] bg-[#FF718B] flex w-[11px] shrink-0 h-[11px] fill-[#FF718B] stroke-white rounded-[50%] border-white border-solid border-2" />
            <div className="stroke-[2px] bg-[#FF718B] flex w-[11px] shrink-0 h-[11px] fill-[#FF718B] stroke-white rounded-[50%] border-white border-solid border-2" />
          </div>
          <div className="bg-[#E5E5EF] shrink-0 h-px border-[rgba(229,229,239,1)] border-solid border-2 max-md:max-w-full" />
          <div className="flex items-stretch gap-5 text-sm text-[rgba(70,83,101,1)] font-normal whitespace-nowrap text-center leading-none flex-wrap justify-between ml-2.5 mr-[11px] mt-5 max-md:max-w-full max-md:mr-2.5">
            <div>Sep</div>
            <div>Oct</div>
            <div>Nov</div>
            <div>Dec</div>
            <div>Jan</div>
            <div>Feb</div>
          </div>
        </div>
      </div>
    </div>
  );
}
