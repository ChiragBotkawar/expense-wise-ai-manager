
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
import { BadgeDollarSign, Coffee, Droplet, ShoppingCart, Home } from "lucide-react";
import { cn } from "@/lib/utils";

// Transaction category icons mapping
const categoryIcons = {
  food: Coffee,
  shopping: ShoppingCart,
  utilities: Droplet,
  housing: Home,
  income: BadgeDollarSign,
};

type Transaction = {
  id: string;
  date: string;
  description: string;
  category: keyof typeof categoryIcons;
  amount: number;
  isIncome: boolean;
};

const transactions: Transaction[] = [
  {
    id: "t1",
    date: "2025-05-18",
    description: "Grocery Store",
    category: "food",
    amount: 64.75,
    isIncome: false,
  },
  {
    id: "t2",
    date: "2025-05-17",
    description: "Monthly Salary",
    category: "income",
    amount: 2500.00,
    isIncome: true,
  },
  {
    id: "t3",
    date: "2025-05-15",
    description: "Electric Bill",
    category: "utilities",
    amount: 85.20,
    isIncome: false,
  },
  {
    id: "t4",
    date: "2025-05-14",
    description: "Department Store",
    category: "shopping",
    amount: 129.99,
    isIncome: false,
  },
  {
    id: "t5",
    date: "2025-05-10",
    description: "Rent Payment",
    category: "housing",
    amount: 1200.00,
    isIncome: false,
  },
];

export function TransactionsTable() {
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
              return (
                <TableRow 
                  key={transaction.id}
                  className="group hover:bg-muted/50 transition-colors"
                >
                  <TableCell className="font-medium">
                    {new Date(transaction.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="bg-primary/10 p-1 rounded">
                        <Icon className="h-4 w-4 text-primary" />
                      </div>
                      <span className="capitalize">{transaction.category}</span>
                    </div>
                  </TableCell>
                  <TableCell className={cn(
                    "text-right font-medium",
                    transaction.isIncome 
                      ? "text-green-600 dark:text-green-400" 
                      : "text-foreground"
                  )}>
                    {transaction.isIncome ? "+" : "-"}${transaction.amount.toFixed(2)}
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
