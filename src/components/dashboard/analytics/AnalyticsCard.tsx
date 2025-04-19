
import { LucideIcon } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

interface AnalyticsCardProps {
  title: string;
  icon: LucideIcon;
  color: string;
}

export function AnalyticsCard({
  title,
  icon: Icon,
  color
}: AnalyticsCardProps) {
  return (
    <Card className={`p-6 shadow-md border border-[#E7E8EC] min-h-[300px] transition-all hover:shadow-lg flex flex-col justify-between`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-medium">{title}</CardTitle>
        <div className={`h-12 w-12 ${color} rounded-full flex items-center justify-center`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </CardHeader>
      {/* Placeholder for additional content if needed */}
      <div className="flex-grow"></div>
    </Card>
  );
}
