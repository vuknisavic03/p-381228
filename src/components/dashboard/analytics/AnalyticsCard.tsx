
import { LucideIcon } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useClientComponent } from "@/hooks/use-client-component";
import React from "react";
import dynamic from "next/dynamic";

// Import ApexCharts dynamically to avoid SSR issues
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

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
  // Configure chart options based on card type
  const getChartOptions = () => {
    const baseOptions = {
      chart: {
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
        background: '#FFFFFF',
      },
      stroke: {
        curve: 'smooth',
      },
      grid: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      tooltip: {
        enabled: true,
      },
      xaxis: {
        labels: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        show: false,
      },
    };

    const colorValue = color === 'bg-[#9b87f5]' ? '#9b87f5' : 
                      color === 'bg-[#F97316]' ? '#F97316' :
                      color === 'bg-[#0EA5E9]' ? '#0EA5E9' :
                      color === 'bg-[#D946EF]' ? '#D946EF' : '#9b87f5';

    switch (title) {
      case "Total Revenue":
        return {
          ...baseOptions,
          colors: [colorValue],
          series: [{
            name: 'Revenue',
            data: [31, 40, 28, 51, 42, 109, 100],
          }],
          fill: {
            type: 'gradient',
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 0.7,
              opacityTo: 0.3,
              stops: [0, 90, 100]
            }
          },
        };
      case "Active Users":
        return {
          ...baseOptions,
          colors: [colorValue],
          series: [{
            name: 'Users',
            data: [11, 32, 45, 32, 34, 52, 41],
          }],
          fill: {
            type: 'gradient',
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 0.7,
              opacityTo: 0.3,
              stops: [0, 90, 100]
            }
          },
        };
      case "Conversion Rate":
        return {
          ...baseOptions,
          colors: [colorValue, '#F3F4F6'],
          labels: ['Converted', 'Not Converted'],
          series: [67, 33],
          chart: {
            ...baseOptions.chart,
            type: 'donut',
          },
          stroke: {
            width: 0
          },
          plotOptions: {
            pie: {
              donut: {
                size: '75%',
                background: 'transparent',
                labels: {
                  show: true,
                  name: {
                    show: false
                  },
                  total: {
                    show: true,
                    showAlways: true,
                    label: 'Conversion',
                    fontSize: '16px',
                    fontWeight: 500,
                    color: '#333',
                    formatter: function() {
                      return '67%';
                    }
                  },
                  value: {
                    show: false
                  }
                }
              }
            }
          },
          legend: {
            show: false
          }
        };
      case "Average Score":
        return {
          ...baseOptions,
          colors: [colorValue],
          series: [{
            name: 'Score',
            data: [80, 50, 30, 40, 100, 20],
          }],
          fill: {
            type: 'gradient',
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 0.7,
              opacityTo: 0.3,
              stops: [0, 90, 100]
            }
          },
        };
      default:
        return {
          ...baseOptions,
          series: [{
            name: 'Data',
            data: [10, 41, 35, 51, 49, 62, 69],
          }],
        };
    }
  };

  const getChartType = () => {
    if (title === "Conversion Rate") {
      return 'donut';
    } 
    return 'area';
  };

  const getChartHeight = () => {
    return 200;
  };

  return (
    <Card className={`p-6 shadow-md border border-[#E7E8EC] min-h-[250px] md:min-h-[300px] transition-all hover:shadow-lg flex flex-col justify-between bg-white`}>
      <CardHeader className="p-0 pb-4 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
        <div className={`${color} text-white p-2 rounded-md`}>
          <Icon size={18} />
        </div>
      </CardHeader>
      
      <div className="mt-4 flex-grow">
        {React.createElement(ReactApexChart, {
          options: getChartOptions(),
          series: getChartOptions().series,
          type: getChartType(),
          height: getChartHeight()
        })}
      </div>
    </Card>
  );
}
