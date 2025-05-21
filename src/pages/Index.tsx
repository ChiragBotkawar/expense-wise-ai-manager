
import { PlusCircle, Receipt, Target, BarChart3 } from "lucide-react";
import { QuickActionCard } from "@/components/dashboard/QuickActionCard";
import { StatCard } from "@/components/dashboard/StatCard";
import { SpendingChart } from "@/components/dashboard/SpendingChart";
import { TransactionsTable } from "@/components/dashboard/TransactionsTable";
import { InsightWidget } from "@/components/dashboard/InsightWidget";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const [greeting, setGreeting] = useState("");
  
  useEffect(() => {
    const hour = new Date().getHours();
    
    if (hour < 12) {
      setGreeting("Good Morning");
    } else if (hour < 18) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  }, []);
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-1.5">
        <h1 className="text-2xl font-bold tracking-tight animate-fade-in">{greeting}, John!</h1>
        <p className="text-muted-foreground animate-fade-in">Track your finances, set budgets, and get insights.</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Monthly Balance" 
          value="$3,240.50" 
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Total Expenses"
          value="$1,830.00"
          trend={{ value: 5, isPositive: false }}
        />
        <StatCard
          title="Total Income"
          value="$5,070.50"
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Budget Remaining"
          value="$1,410.50"
          trend={{ value: -3, isPositive: false }}
        />
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <SpendingChart />
        <div className="flex flex-col gap-4 xl:col-span-1">
          <InsightWidget />
          <div className="grid gap-4 grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-1">
            <QuickActionCard
              title="Add Expense"
              description="Record new transactions"
              icon={PlusCircle}
            />
            <QuickActionCard
              title="Upload Receipt"
              description="Scan and process receipts"
              icon={Receipt}
            />
            <QuickActionCard
              title="Set Budget"
              description="Create spending limits"
              icon={Target}
              className="hidden lg:block xl:hidden"
            />
            <QuickActionCard
              title="View Reports"
              description="Analyze your spending"
              icon={BarChart3}
              className="hidden lg:block xl:hidden"
            />
          </div>
        </div>
      </div>
      
      <TransactionsTable />
    </div>
  );
};

export default Dashboard;
