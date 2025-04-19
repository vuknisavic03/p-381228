
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
  return <Card className={`p-6 shadow-md border border-[#E7E8EC] min-h-[250px] md:min-h-[300px] transition-all hover:shadow-lg flex flex-col justify-between`}>
      
      {/* Placeholder for additional content if needed */}
      
    </Card>;
}
