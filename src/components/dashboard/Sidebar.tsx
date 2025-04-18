
import React from "react";

export function Sidebar() {
  return (
    <div className="p-8">
      <div className="text-sm text-[#9EA3AD] font-semibold mb-4">WORKSPACE</div>
      <div className="space-y-2">
        <div className="flex items-center gap-3 bg-[#F6F6F7] px-3 py-2 rounded-md">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/050fc8f9f07a4911bdb5a576ed825054/4d45b3f00f54d0b9b021c6c0492b60eeeac9b73d"
            className="w-5 h-5"
            alt="Overview icon"
          />
          <span className="text-[#1A1A1A] font-semibold">Overview</span>
        </div>
        <div className="flex items-center gap-3 px-3 py-2">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/050fc8f9f07a4911bdb5a576ed825054/33648ba2911e7b4a132f0393b030f068f0e68c68"
            className="w-5 h-5"
            alt="Listings icon"
          />
          <span className="text-[#1A1A1A] font-medium">Listings</span>
        </div>
        <div className="flex items-center gap-3 px-3 py-2">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/050fc8f9f07a4911bdb5a576ed825054/aed2de8395d4d607024afd11386607b1be368ac0"
            className="w-5 h-5"
            alt="Transactions icon"
          />
          <span className="text-[#1A1A1A] font-medium">Transactions</span>
        </div>
      </div>
    </div>
  );
}
