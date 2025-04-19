
import React from 'react';
import { Card } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

const clients = [
  { initials: "KA", name: "Kevin Anderson", amount: "$0.00" },
  { initials: "LE", name: "Lucas Everett", amount: "$0.00" },
  { initials: "MH", name: "Mia Holloway", amount: "$0.00" },
  { initials: "NC", name: "Nathan Caldwell", amount: "$0.00" },
  { initials: "SR", name: "Sophia Riggins", amount: "$0.00" },
];

export function WorkspaceOverview() {
  return (
    <div className="p-8 space-y-8">
      <section>
        <h2 className="text-xl font-semibold mb-4">Revenue</h2>
        <Card className="p-6">
          {/* Revenue chart would go here - using a placeholder for now */}
          <div className="h-[300px] bg-[#F6F6F7] rounded-lg flex items-center justify-center text-[#9EA3AD]">
            Revenue Chart Placeholder
          </div>
        </Card>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Clients</h2>
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.initials}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#F6F6F7] flex items-center justify-center text-sm font-medium text-[#9EA3AD]">
                        {client.initials}
                      </div>
                      {client.name}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">{client.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </section>
    </div>
  );
}
