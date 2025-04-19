
import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

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
    <Card className="p-8 shadow-sm border border-[#E7E8EC] min-h-[200px] transition-all hover:shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-[#1A1A1A]">{title}</h3>
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </Card>
  );
}
