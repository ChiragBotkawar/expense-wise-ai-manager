
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { UserAvatar } from "@/components/UserAvatar";
import { useTheme } from "@/hooks/use-theme";

export default function Settings() {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    weeklyReport: true,
    budgetAlerts: true,
    newFeatures: false
  });
  
  const handleSaveProfile = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast.success("Profile updated successfully");
    }, 1000);
  };
  
  const handleToggleNotification = (key: string) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof notifications]
    }));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col space-y-1.5">
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal information and profile photo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                <div className="relative group">
                  <UserAvatar name="John Doe" className="w-24 h-24" />
                  <div className="absolute inset-0 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <Button variant="ghost" className="text-white text-xs">
                      Change
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4 flex-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="John" defaultValue="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" defaultValue="Doe" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john.doe@example.com" defaultValue="john.doe@example.com" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currency">Default Currency</Label>
                  <Select defaultValue="usd">
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usd">USD - US Dollar</SelectItem>
                      <SelectItem value="eur">EUR - Euro</SelectItem>
                      <SelectItem value="gbp">GBP - British Pound</SelectItem>
                      <SelectItem value="jpy">JPY - Japanese Yen</SelectItem>
                      <SelectItem value="cad">CAD - Canadian Dollar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="america_new_york">
                    <SelectTrigger>
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="america_new_york">America/New York (EDT)</SelectItem>
                      <SelectItem value="america_los_angeles">America/Los Angeles (PDT)</SelectItem>
                      <SelectItem value="europe_london">Europe/London (BST)</SelectItem>
                      <SelectItem value="asia_tokyo">Asia/Tokyo (JST)</SelectItem>
                      <SelectItem value="australia_sydney">Australia/Sydney (AEST)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button onClick={handleSaveProfile} disabled={loading}>
                  {loading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Decide how and when you want to be notified</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive email notifications about your account activity
                    </p>
                  </div>
                  <Switch 
                    checked={notifications.email}
                    onCheckedChange={() => handleToggleNotification("email")}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive push notifications on your devices
                    </p>
                  </div>
                  <Switch 
                    checked={notifications.push}
                    onCheckedChange={() => handleToggleNotification("push")}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Weekly Report</Label>
                    <p className="text-sm text-muted-foreground">
                      Get a weekly summary of your financial activity
                    </p>
                  </div>
                  <Switch 
                    checked={notifications.weeklyReport}
                    onCheckedChange={() => handleToggleNotification("weeklyReport")}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Budget Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when you're approaching budget limits
                    </p>
                  </div>
                  <Switch 
                    checked={notifications.budgetAlerts}
                    onCheckedChange={() => handleToggleNotification("budgetAlerts")}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>New Features</Label>
                    <p className="text-sm text-muted-foreground">
                      Stay updated about new features and improvements
                    </p>
                  </div>
                  <Switch 
                    checked={notifications.newFeatures}
                    onCheckedChange={() => handleToggleNotification("newFeatures")}
                  />
                </div>
              </div>
              
              <div className="flex justify-end pt-4">
                <Button onClick={() => toast.success("Notification settings saved")}>
                  Save Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>Customize the look and feel of the application</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Theme</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className={`cursor-pointer hover:border-primary transition-colors ${theme === 'light' ? 'border-primary' : ''}`}>
                      <CardContent className="p-4 flex flex-col items-center">
                        <div className="w-full h-24 bg-white rounded-md mb-2 shadow-sm"></div>
                        <p className="text-sm font-medium">Light</p>
                      </CardContent>
                    </Card>
                    
                    <Card className={`cursor-pointer hover:border-primary transition-colors ${theme === 'dark' ? 'border-primary' : ''}`}>
                      <CardContent className="p-4 flex flex-col items-center">
                        <div className="w-full h-24 bg-gray-900 rounded-md mb-2 shadow-sm"></div>
                        <p className="text-sm font-medium">Dark</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="cursor-pointer hover:border-primary transition-colors">
                      <CardContent className="p-4 flex flex-col items-center">
                        <div className="w-full h-24 bg-gradient-to-br from-gray-100 to-white dark:from-gray-900 dark:to-gray-800 rounded-md mb-2 shadow-sm"></div>
                        <p className="text-sm font-medium">System</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Accent Color</h3>
                  <div className="flex flex-wrap gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#8B5CF6] cursor-pointer ring-2 ring-offset-2 ring-[#8B5CF6]"></div>
                    <div className="w-8 h-8 rounded-full bg-[#EC4899] cursor-pointer"></div>
                    <div className="w-8 h-8 rounded-full bg-[#14B8A6] cursor-pointer"></div>
                    <div className="w-8 h-8 rounded-full bg-[#F97316] cursor-pointer"></div>
                    <div className="w-8 h-8 rounded-full bg-[#06B6D4] cursor-pointer"></div>
                    <div className="w-8 h-8 rounded-full bg-[#8B5CF6] cursor-pointer"></div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Animation Effects</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable animations and transitions
                    </p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
              </div>
              
              <div className="flex justify-end pt-4">
                <Button onClick={() => toast.success("Appearance settings saved")}>
                  Save Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your password and security preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
                
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="bg-primary h-full w-3/4"></div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Password strength: <span className="text-amber-500">Good</span>
                </p>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Two-Factor Authentication (2FA)</Label>
                  <p className="text-sm text-muted-foreground">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <Button variant="outline" onClick={() => toast.info("2FA setup will be available soon")}>
                  Setup 2FA
                </Button>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-destructive">Danger Zone</Label>
                  <p className="text-sm text-muted-foreground">
                    Delete your account and all associated data
                  </p>
                </div>
                <Button 
                  variant="destructive" 
                  onClick={() => toast.error("This action cannot be undone", {
                    description: "For security reasons, account deletion requires additional verification."
                  })}
                >
                  Delete Account
                </Button>
              </div>
              
              <div className="flex justify-end pt-4">
                <Button onClick={() => toast.success("Security settings updated")}>
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
