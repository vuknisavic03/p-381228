
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

interface Client {
  name: string;
  initials: string;
  revenue: number;
}

const clients: Client[] = [
  { name: "Kevin Anderson", initials: "KA", revenue: 0 },
  { name: "Lucas Everett", initials: "LE", revenue: 0 },
  { name: "Mia Holloway", initials: "MH", revenue: 0 },
  { name: "Nathan Caldwell", initials: "NC", revenue: 0 },
  { name: "Sophia Riggins", initials: "SR", revenue: 0 },
];

export function ClientsList() {
  return (
    <Card className="shadow-sm mt-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold text-left">Clients</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {clients.map((client) => (
            <div
              key={client.name}
              className="flex items-center justify-between pb-4 border-b last:border-0 last:pb-0"
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8 bg-slate-100">
                  <AvatarFallback className="text-sm text-gray-500">
                    {client.initials}
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium">{client.name}</span>
              </div>
              <div className="flex items-center gap-4 flex-1 max-w-[300px] ml-4">
                <Progress 
                  value={0} 
                  className="h-2 w-full bg-slate-100" 
                />
                <span className="text-right font-mono min-w-[60px]">
                  ${client.revenue.toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
