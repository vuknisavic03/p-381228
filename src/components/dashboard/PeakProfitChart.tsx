import React from "react";

export function PeakProfitChart() {
  return (
    <div className="bg-white shadow-[0px_4px_12px_5px_rgba(243,243,246,0.3)] flex w-full flex-col mx-auto px-[27px] py-[26px] rounded-[10px] border-[rgba(228,229,234,1)] max-md:max-w-full max-md:mt-[31px] max-md:px-5">
      <h2 className="text-black text-[22px] font-medium">
        Peak Profit Achieved
      </h2>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/050fc8f9f07a4911bdb5a576ed825054/7fcb27c7e3ea1991954c6d912dcdbd273a4e71f7?placeholderIfAbsent=true"
        className="aspect-[111.11] object-contain w-[444px] z-10 max-w-full mt-[205px] max-md:mt-10"
        alt="Peak profit chart"
      />
      <div className="flex w-[444px] shrink-0 max-w-full h-[30px]" />
      <div className="flex w-[690px] max-w-full items-stretch gap-5 text-[#465365] whitespace-nowrap justify-between">
        <div className="flex items-center gap-7 text-base font-normal text-center leading-none mt-[15px]">
          <div className="self-stretch my-auto">Avg</div>
          <div className="self-stretch my-auto">Sep</div>
          <div className="bg-[rgba(0,111,181,1)] self-stretch gap-2.5 text-white px-5 py-2 rounded-[30px]">
            October
          </div>
          <div className="self-stretch my-auto">Nov</div>
        </div>
        <div className="text-center text-base font-normal leading-none my-auto">
          Dec
        </div>
        <div className="flex items-stretch gap-3 text-[#1E1B39]">
          <div className="text-[44px] font-bold leading-none grow">$0,00</div>
          <div className="flex items-stretch gap-0.5 text-sm font-medium leading-none mt-[29px]">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/050fc8f9f07a4911bdb5a576ed825054/c8218560740793406bdd478a03139e1e1b226c0b?placeholderIfAbsent=true"
              className="aspect-[1.25] object-contain w-2.5 fill-[#04CE00] shrink-0 my-auto"
              alt="Percentage indicator"
            />
            <div>0%</div>
          </div>
        </div>
      </div>
    </div>
  );
}
