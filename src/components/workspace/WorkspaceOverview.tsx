
import React from 'react';
import { Header } from "@/components/dashboard/Header";

export function WorkspaceOverview() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-none px-8 pt-8">
        <Header />
      </div>
      <div className="flex-1 p-8 min-h-0">
        {/* Content goes here */}
      </div>
    </div>
  );
}
