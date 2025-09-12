import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Target,
  Calendar,
  Phone,
  Mail,
  MoreVertical,
} from "lucide-react";

const statsCards = [
  {
    title: "Total Leads",
    value: "1,234",
    change: "+12%",
    trend: "up",
    icon: Target,
  },
  {
    title: "Active Deals",
    value: "$45,231",
    change: "+8%",
    trend: "up",
    icon: DollarSign,
  },
  {
    title: "Customers",
    value: "573",
    change: "-2%",
    trend: "down",
    icon: Users,
  },
  {
    title: "Conversion Rate",
    value: "24.5%",
    change: "+5%",
    trend: "up",
    icon: TrendingUp,
  },
];

const recentDeals = [
  {
    id: 1,
    company: "Acme Corp",
    value: "$12,000",
    stage: "Negotiation",
    probability: 75,
    closeDate: "2024-01-15",
  },
  {
    id: 2,
    company: "TechStart Inc",
    value: "$8,500",
    stage: "Proposal",
    probability: 60,
    closeDate: "2024-01-20",
  },
  {
    id: 3,
    company: "Global Solutions",
    value: "$25,000",
    stage: "Qualified",
    probability: 45,
    closeDate: "2024-01-25",
  },
];

const recentActivities = [
  {
    id: 1,
    type: "call",
    contact: "Sarah Johnson",
    company: "Acme Corp",
    time: "2 hours ago",
  },
  {
    id: 2,
    type: "email",
    contact: "Mike Chen",
    company: "TechStart Inc",
    time: "4 hours ago",
  },
  {
    id: 3,
    type: "meeting",
    contact: "Emma Wilson",
    company: "Global Solutions",
    time: "1 day ago",
  },
];

export function DashboardContent() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your sales.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Export</Button>
          <Button>View Reports</Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                {stat.trend === "up" ? (
                  <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                ) : (
                  <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
                )}
                <span className={stat.trend === "up" ? "text-green-500" : "text-red-500"}>
                  {stat.change}
                </span>
                <span className="ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="deals" className="space-y-4">
        <TabsList>
          <TabsTrigger value="deals">Recent Deals</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
          <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
        </TabsList>

        <TabsContent value="deals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Deals</CardTitle>
              <CardDescription>
                Track your latest opportunities and their progress.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Stage</TableHead>
                    <TableHead>Probability</TableHead>
                    <TableHead>Close Date</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentDeals.map((deal) => (
                    <TableRow key={deal.id}>
                      <TableCell className="font-medium">{deal.company}</TableCell>
                      <TableCell>{deal.value}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{deal.stage}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Progress value={deal.probability} className="w-16" />
                          <span className="text-sm">{deal.probability}%</span>
                        </div>
                      </TableCell>
                      <TableCell>{deal.closeDate}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activities" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>
                Your latest interactions with contacts and leads.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-4">
                    <div className="p-2 rounded-full bg-muted">
                      {activity.type === "call" && <Phone className="h-4 w-4" />}
                      {activity.type === "email" && <Mail className="h-4 w-4" />}
                      {activity.type === "meeting" && <Calendar className="h-4 w-4" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{activity.contact}</p>
                      <p className="text-sm text-muted-foreground">{activity.company}</p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {activity.time}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pipeline" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Qualified</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$127K</div>
                <p className="text-xs text-muted-foreground">12 deals</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Proposal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$89K</div>
                <p className="text-xs text-muted-foreground">8 deals</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Negotiation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$56K</div>
                <p className="text-xs text-muted-foreground">5 deals</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Closed Won</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$234K</div>
                <p className="text-xs text-muted-foreground">18 deals</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}