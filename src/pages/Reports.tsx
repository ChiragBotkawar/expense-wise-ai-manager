
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart3, PieChart, Download, Calendar, ChevronLeft, ChevronRight, TrendingUp } from "lucide-react";
import { useState } from "react";

// Sample spending by category data for the charts
const categoryData = [
  { category: "Food", amount: 450, color: "#8b5cf6" },
  { category: "Housing", amount: 1200, color: "#ec4899" },
  { category: "Transportation", amount: 350, color: "#14b8a6" },
  { category: "Entertainment", amount: 200, color: "#f97316" },
  { category: "Utilities", amount: 300, color: "#06b6d4" },
  { category: "Shopping", amount: 280, color: "#8b5cf6" }
];

// Sample monthly spending data
const monthlyData = [
  { month: "Jan", amount: 2480 },
  { month: "Feb", amount: 2320 },
  { month: "Mar", amount: 2710 },
  { month: "Apr", amount: 2290 },
  { month: "May", amount: 2580 }
];

export default function Reports() {
  const [selectedPeriod, setSelectedPeriod] = useState("last30days");
  const [currentMonth, setCurrentMonth] = useState("May 2025");

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  // Calculate total spending
  const totalSpending = categoryData.reduce((sum, item) => sum + item.amount, 0);

  const handlePrevMonth = () => {
    // This is a simplified example - in a real app you'd properly track and update dates
    const months = ["January", "February", "March", "April", "May", "June", 
                   "July", "August", "September", "October", "November", "December"];
    const currentIndex = months.findIndex(m => currentMonth.includes(m));
    if (currentIndex > 0) {
      setCurrentMonth(`${months[currentIndex - 1]} 2025`);
    } else {
      setCurrentMonth("December 2024");
    }
  };

  const handleNextMonth = () => {
    // This is a simplified example - in a real app you'd properly track and update dates
    const months = ["January", "February", "March", "April", "May", "June", 
                   "July", "August", "September", "October", "November", "December"];
    const currentIndex = months.findIndex(m => currentMonth.includes(m));
    if (currentIndex < 11) {
      setCurrentMonth(`${months[currentIndex + 1]} 2025`);
    } else {
      setCurrentMonth("January 2026");
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col space-y-1.5">
        <h1 className="text-2xl font-bold tracking-tight">Financial Reports</h1>
        <p className="text-muted-foreground">Analyze your spending patterns and financial trends.</p>
      </div>

      <div className="flex flex-wrap gap-4 justify-between items-center">
        <div className="flex items-center gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last7days">Last 7 days</SelectItem>
              <SelectItem value="last30days">Last 30 days</SelectItem>
              <SelectItem value="thisMonth">This month</SelectItem>
              <SelectItem value="lastMonth">Last month</SelectItem>
              <SelectItem value="last3Months">Last 3 months</SelectItem>
              <SelectItem value="thisYear">This year</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Download size={16} /> Export Reports
        </Button>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Spending by Category</CardTitle>
                  <PieChart className="h-4 w-4 text-muted-foreground" />
                </div>
                <CardDescription>How your spending is distributed</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <div className="w-[220px] h-[220px] rounded-full relative bg-muted flex items-center justify-center">
                    <div className="absolute inset-0">
                      {/* This is a simplified pie chart representation */}
                      {categoryData.map((item, index) => {
                        const offset = index * 60; // Simple offset for visualization
                        return (
                          <div 
                            key={item.category} 
                            className="absolute inset-0 flex items-center justify-center"
                            style={{ transform: `rotate(${offset}deg)` }}
                          >
                            <div 
                              className="w-full h-4 origin-center"
                              style={{ 
                                backgroundColor: item.color,
                                clipPath: "polygon(50% 50%, 100% 0, 100% 15%, 50% 50%)",
                                transform: `rotate(${(item.amount / totalSpending) * 360}deg)`,
                                opacity: 0.8
                              }}
                            />
                          </div>
                        );
                      })}
                    </div>
                    <div className="text-center z-10">
                      <div className="text-2xl font-bold">{formatCurrency(totalSpending)}</div>
                      <div className="text-xs text-muted-foreground">Total Spending</div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {categoryData.map((item) => (
                    <div key={item.category} className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-xs">{item.category}: {formatCurrency(item.amount)}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Monthly Spending</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </div>
                <CardDescription>Your spending over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-end justify-between gap-2 pt-6">
                  {monthlyData.map((item) => {
                    // Calculate bar height as percentage of max value
                    const maxValue = Math.max(...monthlyData.map(d => d.amount));
                    const height = (item.amount / maxValue) * 100;
                    
                    return (
                      <div key={item.month} className="flex flex-col items-center flex-1">
                        <div 
                          className="w-full bg-primary/90 rounded-t-md transition-all hover:bg-primary"
                          style={{ height: `${height}%` }}
                        />
                        <div className="text-xs mt-2">{item.month}</div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-between items-center mt-4">
                  <div className="text-sm text-muted-foreground">
                    Average Monthly Spending:
                    <span className="font-medium text-foreground ml-1">
                      {formatCurrency(monthlyData.reduce((sum, item) => sum + item.amount, 0) / monthlyData.length)}
                    </span>
                  </div>
                  <Button variant="outline" size="sm">View Details</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Spending by Categories</CardTitle>
              <CardDescription>Detailed breakdown of your spending by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="p-3 text-left font-medium">Category</th>
                      <th className="p-3 text-left font-medium">Amount</th>
                      <th className="p-3 text-left font-medium">% of Total</th>
                      <th className="p-3 text-left font-medium">vs. Last Period</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categoryData.map((category) => (
                      <tr key={category.category} className="border-t hover:bg-muted/50 transition-colors">
                        <td className="p-3 flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: category.color }}
                          />
                          {category.category}
                        </td>
                        <td className="p-3 font-medium">{formatCurrency(category.amount)}</td>
                        <td className="p-3">
                          {((category.amount / totalSpending) * 100).toFixed(1)}%
                        </td>
                        <td className="p-3">
                          <span className="inline-flex items-center text-green-500">
                            <TrendingUp size={14} className="mr-1" />
                            5.2%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle>Monthly Trends</CardTitle>
                <div className="flex items-center gap-2">
                  <Button size="icon" variant="ghost" onClick={handlePrevMonth}>
                    <ChevronLeft size={18} />
                  </Button>
                  <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    <span>{currentMonth}</span>
                  </div>
                  <Button size="icon" variant="ghost" onClick={handleNextMonth}>
                    <ChevronRight size={18} />
                  </Button>
                </div>
              </div>
              <CardDescription>Your spending patterns over time</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center items-center py-16">
              <div className="text-center">
                <TrendingUp className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-2">
                  Advanced trend analysis coming soon
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  Our data science team is working on predictive analytics for your finances
                </p>
                <Button>Join Waiting List</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
