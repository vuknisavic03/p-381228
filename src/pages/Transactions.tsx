
import React from 'react';
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { TransactionActivity } from "@/components/transactions/TransactionActivity";
import { TransactionForm } from "@/components/transactions/TransactionForm";

export default function Transactions() {
  return (
    <DashboardLayout>
      <div className="h-screen flex flex-col lg:flex-row">
        <div className="w-full lg:w-[35%] lg:min-w-[350px] bg-white border-b lg:border-r border-[#EBECED] overflow-y-auto">
          <TransactionActivity />
        </div>
        <div className="flex-1 bg-[#FAFBFC] overflow-y-auto">
          <TransactionForm />
        </div>
      </div>
    </DashboardLayout>
  );
}
