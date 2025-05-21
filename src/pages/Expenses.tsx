
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { PlusCircle, Filter, Download, ArrowUpDown, Receipt } from "lucide-react";

// Sample expense data
const expenseData = [
  {
    id: "exp-001",
    date: "2025-05-15",
    description: "Grocery Shopping",
    category: "Food",
    amount: 85.43,
    paymentMethod: "Credit Card"
  },
  {
    id: "exp-002",
    date: "2025-05-14",
    description: "Monthly Rent",
    category: "Housing",
    amount: 1200.00,
    paymentMethod: "Bank Transfer"
  },
  {
    id: "exp-003",
    date: "2025-05-12",
    description: "Gasoline",
    category: "Transportation",
    amount: 45.65,
    paymentMethod: "Debit Card"
  },
  {
    id: "exp-004",
    date: "2025-05-10",
    description: "Restaurant Dinner",
    category: "Dining",
    amount: 78.90,
    paymentMethod: "Credit Card"
  },
  {
    id: "exp-005",
    date: "2025-05-08",
    description: "Internet Bill",
    category: "Utilities",
    amount: 59.99,
    paymentMethod: "Automatic Payment"
  }
];

// Category options
const categories = [
  "Food", "Housing", "Transportation", "Entertainment", 
  "Utilities", "Healthcare", "Education", "Shopping", 
  "Dining", "Travel", "Insurance", "Subscriptions", "Other"
];

// Payment methods
const paymentMethods = [
  "Credit Card", "Debit Card", "Cash", "Bank Transfer", 
  "Mobile Payment", "Automatic Payment", "Check", "Other"
];

export default function Expenses() {
  const [expenses, setExpenses] = useState(expenseData);
  const [isAddingExpense, setIsAddingExpense] = useState(false);
  const [newExpense, setNewExpense] = useState({
    description: "",
    amount: "",
    category: "",
    date: new Date().toISOString().split('T')[0],
    paymentMethod: ""
  });

  const handleAddExpense = () => {
    if (!newExpense.description || !newExpense.amount || !newExpense.category || !newExpense.paymentMethod) {
      toast.error("Please fill all required fields");
      return;
    }
    
    const expense = {
      id: `exp-${Math.floor(Math.random() * 1000)}`,
      date: newExpense.date,
      description: newExpense.description,
      category: newExpense.category,
      amount: parseFloat(newExpense.amount),
      paymentMethod: newExpense.paymentMethod
    };
    
    setExpenses([expense, ...expenses]);
    setIsAddingExpense(false);
    setNewExpense({
      description: "",
      amount: "",
      category: "",
      date: new Date().toISOString().split('T')[0],
      paymentMethod: ""
    });
    
    toast.success("Expense added successfully");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewExpense(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setNewExpense(prev => ({ ...prev, [name]: value }));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col space-y-1.5">
        <h1 className="text-2xl font-bold tracking-tight">Expenses Management</h1>
        <p className="text-muted-foreground">Track, categorize, and analyze your spending habits.</p>
      </div>

      <div className="flex flex-wrap gap-4 justify-between items-center">
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter size={16} /> Filter
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowUpDown size={16} /> Sort
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download size={16} /> Export
          </Button>
        </div>
        <Button 
          onClick={() => setIsAddingExpense(true)} 
          className="flex items-center gap-2 btn-hover"
        >
          <PlusCircle size={16} /> Add Expense
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Expenses</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="category">By Category</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          <Card className="w-full">
            <CardContent className="p-0">
              <div className="rounded-md border">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="p-3 text-left font-medium">Date</th>
                        <th className="p-3 text-left font-medium">Description</th>
                        <th className="p-3 text-left font-medium">Category</th>
                        <th className="p-3 text-left font-medium">Amount</th>
                        <th className="p-3 text-left font-medium">Payment Method</th>
                        <th className="p-3 text-left font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {expenses.map((expense) => (
                        <tr 
                          key={expense.id} 
                          className="border-t hover:bg-muted/50 transition-colors"
                        >
                          <td className="p-3">{new Date(expense.date).toLocaleDateString()}</td>
                          <td className="p-3">{expense.description}</td>
                          <td className="p-3">
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                              {expense.category}
                            </span>
                          </td>
                          <td className="p-3 font-medium">{formatCurrency(expense.amount)}</td>
                          <td className="p-3">{expense.paymentMethod}</td>
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Edit</span>
                                <Receipt size={16} />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="recent" className="space-y-4">
          <Card className="w-full">
            <CardContent>
              <p className="text-center py-4 text-muted-foreground">
                Showing expenses from the last 7 days
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="category" className="space-y-4">
          <Card className="w-full">
            <CardContent>
              <p className="text-center py-4 text-muted-foreground">
                Select a category to filter expenses
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Expense Dialog */}
      {isAddingExpense && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
          <Card className="w-full max-w-md mx-4 animate-scale-in">
            <CardHeader>
              <CardTitle>Add New Expense</CardTitle>
              <CardDescription>Enter the details of your expense</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Input 
                  id="description"
                  name="description"
                  placeholder="E.g., Grocery shopping"
                  value={newExpense.description}
                  onChange={handleChange}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="amount">Amount</Label>
                <Input 
                  id="amount"
                  name="amount"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={newExpense.amount}
                  onChange={handleChange}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select onValueChange={(value) => handleSelectChange("category", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Categories</SelectLabel>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="date">Date</Label>
                <Input 
                  id="date"
                  name="date"
                  type="date"
                  value={newExpense.date}
                  onChange={handleChange}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="paymentMethod">Payment Method</Label>
                <Select onValueChange={(value) => handleSelectChange("paymentMethod", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Payment Methods</SelectLabel>
                      {paymentMethods.map((method) => (
                        <SelectItem key={method} value={method}>
                          {method}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setIsAddingExpense(false)}>Cancel</Button>
              <Button onClick={handleAddExpense}>Add Expense</Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
}
