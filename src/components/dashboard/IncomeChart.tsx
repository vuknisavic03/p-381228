import React from "react";

export function IncomeChart() {
  return (
    <div className="shadow-[0px_4px_12px_5px_rgba(243,243,246,0.30)] bg-white flex w-full flex-col items-center text-sm font-normal mx-auto pl-[27px] pr-20 py-[30px] rounded-[10px] border-[0.2px] border-solid border-[#E4E5EA] max-md:max-w-full max-md:mt-[31px] max-md:px-5">
      <h2 className="text-black text-[22px] font-medium">Income</h2>
      <div className="text-[#615E83] text-center leading-none mt-[110px] max-md:mt-10">
        Total income{" "}
      </div>
      <div className="text-[#1E1B39] text-center text-2xl font-bold leading-none mt-[11px]">
        $0,00
      </div>
      <div className="flex w-[280px] max-w-full items-stretch gap-5 text-[rgba(158,163,173,1)] leading-none justify-between mt-[110px] max-md:mt-10">
        <div className="flex items-stretch gap-2">
          <div className="bg-[rgba(2,131,250,1)] flex w-3.5 shrink-0 h-3.5 rounded-[50%]" />
          <div>Base rent</div>
        </div>
        <div className="text-[#1E1B39] font-medium">0%</div>
        <div className="flex items-stretch gap-2">
          <div className="bg-[rgba(243,243,246,1)] flex w-3.5 shrink-0 h-3.5 rounded-[50%]" />
          <div>Other fees</div>
        </div>
        <div className="text-[#1E1B39] font-medium">0%</div>
      </div>
    </div>
  );
}
