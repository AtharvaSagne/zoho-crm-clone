import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  Users,
  Building2,
  HandCoins,
  Target,
  Calendar,
  BarChart3,
  Settings,
  FileText,
  Phone,
  Mail,
  DollarSign,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
    group: "Main"
  },
  {
    title: "Leads",
    url: "/dashboard/leads",
    icon: Target,
    group: "Sales"
  },
  {
    title: "Deals",
    url: "/dashboard/deals",
    icon: HandCoins,
    group: "Sales"
  },
  {
    title: "Accounts",
    url: "/dashboard/accounts",
    icon: Building2,
    group: "Sales"
  },
  {
    title: "Contacts",
    url: "/dashboard/contacts",
    icon: Users,
    group: "Sales"
  },
  {
    title: "Activities",
    url: "/dashboard/activities",
    icon: Calendar,
    group: "Activities"
  },
  {
    title: "Calls",
    url: "/dashboard/calls",
    icon: Phone,
    group: "Activities"
  },
  {
    title: "Emails",
    url: "/dashboard/emails",
    icon: Mail,
    group: "Activities"
  },
  {
    title: "Reports",
    url: "/dashboard/reports",
    icon: BarChart3,
    group: "Analytics"
  },
  {
    title: "Forecasts",
    url: "/dashboard/forecasts",
    icon: DollarSign,
    group: "Analytics"
  },
  {
    title: "Documents",
    url: "/dashboard/documents",
    icon: FileText,
    group: "Tools"
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
    group: "Tools"
  },
];

const groupedItems = navigationItems.reduce((acc, item) => {
  if (!acc[item.group]) {
    acc[item.group] = [];
  }
  acc[item.group].push(item);
  return acc;
}, {} as Record<string, typeof navigationItems>);

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const collapsed = state === "collapsed";

  const isActive = (path: string) => {
    if (path === "/dashboard") {
      return location.pathname === "/dashboard";
    }
    return location.pathname.startsWith(path);
  };

  const getNavClasses = (active: boolean) =>
    active 
      ? "bg-primary text-primary-foreground hover:bg-primary/90" 
      : "hover:bg-accent hover:text-accent-foreground";

  return (
    <Sidebar className={collapsed ? "w-16" : "w-64"} collapsible="icon">
      <SidebarContent className="py-4">
        <div className="px-4 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">Z</span>
            </div>
            {!collapsed && (
              <div>
                <h2 className="font-semibold text-lg">Zoho CRM</h2>
              </div>
            )}
          </div>
        </div>

        {Object.entries(groupedItems).map(([groupName, items]) => (
          <SidebarGroup key={groupName}>
            {!collapsed && <SidebarGroupLabel>{groupName}</SidebarGroupLabel>}
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink 
                        to={item.url} 
                        className={getNavClasses(isActive(item.url))}
                        title={collapsed ? item.title : undefined}
                      >
                        <item.icon className="h-4 w-4" />
                        {!collapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}