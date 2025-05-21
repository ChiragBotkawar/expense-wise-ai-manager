
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, PieChart, TrendingUp, AlertCircle } from "lucide-react";
import { toast } from "sonner";

// Sample budget data
const budgetData = [
  {
    id: "budget-001",
    category: "Food",
    allocated: 500,
    spent: 320,
    remaining: 180,
    icon: "🍔"
  },
  {
    id: "budget-002",
    category: "Transportation",
    allocated: 300,
    spent: 250,
    remaining: 50,
    icon: "🚗"
  },
  {
    id: "budget-003",
    category: "Entertainment",
    allocated: 200,
    spent: 210,
    remaining: -10,
    icon: "🎬"
  },
  {
    id: "budget-004",
    category: "Shopping",
    allocated: 400,
    spent: 150,
    remaining: 250,
    icon: "🛍️"
  },
  {
    id: "budget-005",
    category: "Utilities",
    allocated: 250,
    spent: 230,
    remaining: 20,
    icon: "💡"
  }
];

export default function Budget() {
  const [budgets, setBudgets] = useState(budgetData);

  const getTotalAllocated = () => {
    return budgets.reduce((sum, budget) => sum + budget.allocated, 0);
  };

  const getTotalSpent = () => {
    return budgets.reduce((sum, budget) => sum + budget.spent, 0);
  };

  const getTotalRemaining = () => {
    return budgets.reduce((sum, budget) => sum + budget.remaining, 0);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const calculatePercentage = (spent: number, allocated: number) => {
    return Math.min(Math.round((spent / allocated) * 100), 100);
  };

  const getProgressColor = (spent: number, allocated: number) => {
    const percentage = (spent / allocated) * 100;
    if (percentage > 100) return "bg-destructive";
    if (percentage > 75) return "bg-yellow-500";
    return "bg-primary";
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col space-y-1.5">
        <h1 className="text-2xl font-bold tracking-tight">Budget Management</h1>
        <p className="text-muted-foreground">Set, track, and optimize your spending limits.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="hover-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(getTotalAllocated())}</div>
            <p className="text-xs text-muted-foreground mt-1">Monthly allocation</p>
          </CardContent>
        </Card>
        <Card className="hover-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Spent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(getTotalSpent())}</div>
            <Progress 
              value={calculatePercentage(getTotalSpent(), getTotalAllocated())} 
              className="h-2 mt-2" 
            />
            <p className="text-xs text-muted-foreground mt-1">
              {calculatePercentage(getTotalSpent(), getTotalAllocated())}% of budget used
            </p>
          </CardContent>
        </Card>
        <Card className="hover-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Remaining</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getTotalRemaining() < 0 ? "text-destructive" : ""}`}>
              {formatCurrency(getTotalRemaining())}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Until end of month</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button className="btn-hover flex items-center gap-2">
          <PlusCircle size={16} /> Create New Budget
        </Button>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {budgets.map((budget) => (
              <Card key={budget.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-medium">
                      <span className="mr-2">{budget.icon}</span>
                      {budget.category}
                    </CardTitle>
                    {budget.remaining < 0 && (
                      <span className="text-xs bg-destructive/10 text-destructive px-2 py-1 rounded-full flex items-center gap-1">
                        <AlertCircle size={12} /> Overspent
                      </span>
                    )}
                  </div>
                  <CardDescription>
                    {formatCurrency(budget.spent)} of {formatCurrency(budget.allocated)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Progress 
                    value={calculatePercentage(budget.spent, budget.allocated)} 
                    className={`h-2 mb-2 ${getProgressColor(budget.spent, budget.allocated)}`}
                  />
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {calculatePercentage(budget.spent, budget.allocated)}% used
                    </span>
                    <span className={budget.remaining < 0 ? "text-destructive font-medium" : "font-medium"}>
                      {formatCurrency(budget.remaining)} left
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="categories" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Budget Categories</CardTitle>
              <CardDescription>Manage your individual budget categories</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center py-6">
              <div className="text-center">
                <PieChart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  Category management coming soon
                </p>
                <Button className="mt-4" onClick={() => toast.info("This feature is coming soon!")}>
                  Try Beta Feature
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Budget Trends</CardTitle>
              <CardDescription>Track your spending trends over time</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center py-6">
              <div className="text-center">
                <TrendingUp className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  Trend analysis coming soon
                </p>
                <Button className="mt-4" onClick={() => toast.info("This feature is coming soon!")}>
                  Try Beta Feature
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
