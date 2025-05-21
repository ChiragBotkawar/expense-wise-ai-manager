
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BadgeIndianRupee, Coffee, Droplet, ShoppingCart, Home, CheckCircle, Lightbulb, Star, Train } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Transaction category icons mapping
const categoryIcons = {
  food: Coffee,
  shopping: ShoppingCart,
  utilities: Droplet,
  housing: Home,
  income: BadgeIndianRupee,
  entertainment: Lightbulb,
  education: Star,
  transport: Train
};

type Transaction = {
  id: string;
  date: string;
  description: string;
  category: keyof typeof categoryIcons;
  amount: number;
  isIncome: boolean;
  upiId?: string;
  suggestedCategory?: {
    category: keyof typeof categoryIcons;
    confidence: number;
  };
};

const transactions: Transaction[] = [
  {
    id: "t1",
    date: "2025-05-18",
    description: "BigBazaar",
    category: "food",
    amount: 1247.50,
    isIncome: false,
    upiId: "bigbazaar@ybl",
    suggestedCategory: { category: "food", confidence: 0.92 },
  },
  {
    id: "t2",
    date: "2025-05-17",
    description: "Monthly Salary",
    category: "income",
    amount: 85000.00,
    isIncome: true,
  },
  {
    id: "t3",
    date: "2025-05-15",
    description: "Adani Electricity",
    category: "utilities",
    amount: 2350.75,
    isIncome: false,
    upiId: "adani.bill@icici",
    suggestedCategory: { category: "utilities", confidence: 0.87 },
  },
  {
    id: "t4",
    date: "2025-05-14",
    description: "Myntra",
    category: "shopping",
    amount: 3499.99,
    isIncome: false,
    suggestedCategory: { category: "shopping", confidence: 0.78 },
  },
  {
    id: "t5",
    date: "2025-05-10",
    description: "Rent Payment",
    category: "housing",
    amount: 32000.00,
    isIncome: false,
    upiId: "landlord@paytm",
  },
  {
    id: "t6",
    date: "2025-05-07",
    description: "BYJU's Classes",
    category: "education",
    amount: 4999.00,
    isIncome: false,
  },
  {
    id: "t7",
    date: "2025-05-05",
    description: "Irctc Ticket",
    category: "transport",
    amount: 1845.00,
    isIncome: false,
    upiId: "irctc@sbi",
  },
];

export function TransactionsTable() {
  // Track which category suggestions have been accepted
  const [acceptedSuggestions, setAcceptedSuggestions] = useState<Record<string, boolean>>({});

  const handleAcceptSuggestion = (transactionId: string, category: keyof typeof categoryIcons) => {
    setAcceptedSuggestions(prev => ({
      ...prev,
      [transactionId]: true
    }));
    
    // In a real app, you would update the transaction's category here
    console.log(`Updated transaction ${transactionId} to category: ${category}`);
    
    // Show toast notification
    // toast({
    //   title: "Category updated",
    //   description: `Transaction has been categorized as ${category}`,
    // });
  };

  return (
    <Card className="col-span-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Your latest financial activities</CardDescription>
        </div>
        <Button variant="outline">View All</Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => {
              const Icon = categoryIcons[transaction.category];
              const hasSuggestion = transaction.suggestedCategory && !acceptedSuggestions[transaction.id];
              
              return (
                <TableRow 
                  key={transaction.id}
                  className="group hover:bg-muted/50 transition-colors"
                >
                  <TableCell className="font-medium">
                    {new Date(transaction.date).toLocaleDateString('en-IN', {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{transaction.description}</span>
                      {transaction.upiId && (
                        <span className="text-xs text-muted-foreground">UPI: {transaction.upiId}</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="bg-primary/10 p-1 rounded">
                        <Icon className="h-4 w-4 text-primary" />
                      </div>
                      <span className="capitalize">{transaction.category}</span>
                      
                      {/* Category Suggestion Chip */}
                      {hasSuggestion && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div 
                                onClick={() => handleAcceptSuggestion(
                                  transaction.id, 
                                  transaction.suggestedCategory!.category
                                )}
                                className={cn(
                                  "ml-2 flex items-center gap-1 px-2 py-0.5 rounded-full",
                                  "bg-primary/20 text-xs cursor-pointer",
                                  "hover:bg-primary/30 transition-all",
                                  "animate-fade-in" // Fade-in animation
                                )}
                              >
                                <CheckCircle className="h-3 w-3 text-primary" />
                                <span>{transaction.suggestedCategory!.category}</span>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>
                                Auto-tagged as {transaction.suggestedCategory!.category} 
                                ({Math.round(transaction.suggestedCategory!.confidence * 100)}% sure)
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className={cn(
                    "text-right font-medium",
                    transaction.isIncome 
                      ? "text-green-600 dark:text-green-400" 
                      : "text-foreground"
                  )}>
                    {transaction.isIncome ? "+" : "-"}₹{transaction.amount.toFixed(2)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
