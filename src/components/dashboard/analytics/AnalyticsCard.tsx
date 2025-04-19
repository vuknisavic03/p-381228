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
  return <Card className="p-8 shadow-sm border border-[#E7E8EC] min-h-[200px] transition-all hover:shadow-md">
      
    </Card>;
}