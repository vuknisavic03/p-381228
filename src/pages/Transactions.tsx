
import React from 'react';
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

export default function Transactions() {
  return (
    <DashboardLayout>
      <div className="px-10 pt-8">
        <h1 className="text-2xl font-semibold mb-4">Transactions</h1>
        <p>Your transactions will appear here.</p>
      </div>
    </DashboardLayout>
  );
}
