
import React from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

function Transactions() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Transactions</h1>
        <p className="text-gray-600">Transaction management page</p>
      </div>
    </DashboardLayout>
  );
}

export default Transactions;
