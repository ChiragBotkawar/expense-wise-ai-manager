
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useTheme } from "@/hooks/use-theme";

const data = [
  { name: "Jan", amount: 1200 },
  { name: "Feb", amount: 1900 },
  { name: "Mar", amount: 1500 },
  { name: "Apr", amount: 1700 },
  { name: "May", amount: 1400 },
  { name: "Jun", amount: 2100 },
  { name: "Jul", amount: 1800 }
];

export function SpendingChart() {
  const { theme } = useTheme();
  
  const primaryColor = theme === "dark" ? "hsl(263, 75%, 63%)" : "hsl(262, 83.3%, 57.8%)";
  const backgroundColor = theme === "dark" ? "hsl(224, 71.4%, 4.1%)" : "hsl(0, 0%, 100%)";
  const gridColor = theme === "dark" ? "hsl(215, 27.9%, 16.9%)" : "hsl(220, 13%, 91%)";
  const textColor = theme === "dark" ? "hsl(210, 20%, 98%)" : "hsl(224, 71.4%, 4.1%)";
  
  return (
    <Card className="col-span-full xl:col-span-2">
      <CardHeader>
        <CardTitle>Monthly Spending</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={primaryColor} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={primaryColor} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid stroke={gridColor} strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" stroke={textColor} tickLine={false} axisLine={false} />
            <YAxis 
              stroke={textColor} 
              tickLine={false} 
              axisLine={false} 
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: backgroundColor, 
                borderColor: gridColor,
                color: textColor 
              }} 
              formatter={(value: number) => [`$${value}`, "Amount"]}
            />
            <Area 
              type="monotone" 
              dataKey="amount" 
              stroke={primaryColor} 
              fillOpacity={1} 
              fill="url(#colorAmount)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
