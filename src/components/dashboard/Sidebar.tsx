import React from "react";

export function Sidebar() {
  return (
    <div className="flex w-full flex-col text-base text-[rgba(26,26,26,1)] font-semibold whitespace-nowrap mt-[19px] max-md:mt-[33px]">
      <div className="text-[rgba(158,163,173,1)]">WORKSPACE</div>
      <div className="self-stretch flex items-stretch gap-[11px] mt-[15px] px-[11px] py-2 rounded-md">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/050fc8f9f07a4911bdb5a576ed825054/4d45b3f00f54d0b9b021c6c0492b60eeeac9b73d?placeholderIfAbsent=true"
          className="aspect-[1] object-contain w-5 shrink-0"
          alt="Overview icon"
        />
        <div className="grow shrink w-[223px] my-auto">Overview</div>
      </div>
      <div className="flex items-stretch gap-[11px] font-medium ml-[11px] mt-2.5 max-md:ml-2.5">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/050fc8f9f07a4911bdb5a576ed825054/33648ba2911e7b4a132f0393b030f068f0e68c68?placeholderIfAbsent=true"
          className="aspect-[1] object-contain w-5 shrink-0"
          alt="Listings icon"
        />
        <div>Listings</div>
      </div>
      <div className="flex items-stretch gap-[11px] text-base text-[rgba(26,26,26,1)] font-medium whitespace-nowrap ml-[11px] mt-[11px] max-md:ml-2.5">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/050fc8f9f07a4911bdb5a576ed825054/aed2de8395d4d607024afd11386607b1be368ac0?placeholderIfAbsent=true"
          className="aspect-[1] object-contain w-5 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] shrink-0"
          alt="Transactions icon"
        />
        <div className="my-auto">Transactions</div>
      </div>
    </div>
  );
}
