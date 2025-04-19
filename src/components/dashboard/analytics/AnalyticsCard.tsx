
import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface AnalyticsCardProps {
  title: string;
  icon: LucideIcon;
  color: string;
}

export function AnalyticsCard({ title, icon: Icon, color }: AnalyticsCardProps) {
  return (
    <Card className="p-6 shadow-sm border border-[#E7E8EC]">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="h-6" /> {/* Placeholder for future data */}
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
    </Card>
  );
}
