import React from "react";

export function ProfitChart() {
  return (
    <div className="bg-white shadow-[0px_4px_12px_5px_rgba(243,243,246,0.3)] grow w-full pt-[26px] pb-[58px] rounded-[10px] border-[rgba(228,229,234,1)] max-md:max-w-full max-md:mt-[31px]">
      <div className="flex w-full flex-col font-medium whitespace-nowrap pl-[27px] pr-[54px] max-md:max-w-full max-md:px-5">
        <h2 className="text-black text-[22px]">Profit</h2>
        <div className="flex w-[175px] max-w-full items-stretch gap-[15px] text-sm text-[rgba(158,163,173,1)] leading-none mt-[27px]">
          <div className="flex items-center gap-2 flex-1 rounded-[10px]">
            <div className="bg-[rgba(2,131,250,1)] self-stretch flex w-2.5 shrink-0 h-2.5 my-auto rounded-[10px]" />
            <div className="self-stretch my-auto">Revenue</div>
          </div>
          <div className="flex items-center gap-[9px] flex-1 rounded-[10px]">
            <div className="bg-[rgba(255,113,139,1)] self-stretch flex w-2.5 shrink-0 h-2.5 my-auto rounded-lg" />
            <div className="self-stretch my-auto">Expenses</div>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col items-stretch mt-[13px] px-[51px] max-md:max-w-full max-md:px-5">
        <div className="flex items-stretch gap-[11px] text-sm text-[#465365] font-normal whitespace-nowrap text-right leading-none flex-wrap">
          <div>30</div>
          <div className="bg-[#E5E5EF] w-[509px] shrink-0 max-w-full h-2.5 border-[rgba(229,229,239,1)] border-dashed border-2" />
        </div>
        <div className="flex items-stretch gap-[11px] text-sm text-[#465365] font-normal whitespace-nowrap text-right leading-none flex-wrap mt-[59px] max-md:mt-10">
          <div>20</div>
          <div className="bg-[#E5E5EF] w-[509px] shrink-0 max-w-full h-[11px] border-[rgba(229,229,239,1)] border-dashed border-2" />
        </div>
        <div className="flex items-stretch gap-[11px] text-sm text-[#465365] font-normal whitespace-nowrap text-right leading-none flex-wrap mt-[61px] max-md:mt-10">
          <div>10</div>
          <div className="bg-[#E5E5EF] w-[509px] shrink-0 max-w-full h-2.5 border-[rgba(229,229,239,1)] border-dashed border-2" />
        </div>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/050fc8f9f07a4911bdb5a576ed825054/b7b2ac3e8d89edde587365d566f13edf8b8776e5?placeholderIfAbsent=true"
          className="aspect-[166.67] object-contain w-[501px] max-w-full mt-[60px] max-md:mr-0.5 max-md:mt-10"
          alt="Profit chart line"
        />
        <div className="flex items-stretch gap-[11px] flex-wrap max-md:max-w-full">
          <div className="text-[#465365] text-right text-sm font-normal leading-none grow">
            0
          </div>
          <div className="grow shrink-0 basis-0 w-fit max-md:max-w-full">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/050fc8f9f07a4911bdb5a576ed825054/5f14970c40c722d9ac514d48a9e4a1bfa49390b5?placeholderIfAbsent=true"
              className="aspect-[166.67] object-contain w-full max-md:max-w-full max-md:mr-0.5"
              alt="Profit chart line"
            />
            <div className="border bg-[#E5E5EF] shrink-0 h-px mt-1 border-[rgba(229,229,239,1)] border-solid max-md:max-w-full" />
          </div>
        </div>
        <div className="flex w-[486px] max-w-full items-stretch gap-5 text-sm text-[rgba(70,83,101,1)] font-normal whitespace-nowrap text-center leading-none flex-wrap justify-between mt-3 max-md:mr-2.5">
          <div>Sep</div>
          <div>Oct</div>
          <div>Nov</div>
          <div>Dec</div>
          <div>Jan</div>
          <div>Feb</div>
        </div>
      </div>
    </div>
  );
}
