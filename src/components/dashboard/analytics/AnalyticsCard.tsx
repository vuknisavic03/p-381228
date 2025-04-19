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
  return <Card className="p-6 shadow-sm border border-[#E7E8EC] px-[24px]">
      <div className="flex items-center justify-between">
        <div>
          
          <div className="h-6" /> {/* Placeholder for future data */}
        </div>
        
      </div>
    </Card>;
}