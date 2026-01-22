import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Logo } from "@/components/Logo";
import {
  LayoutDashboard,
  Wallet,
  CreditCard,
  FileText,
  Gift,
  Users,
  HeadphonesIcon,
  IdCard,
  Building2,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

interface DashboardSidebarProps {
  onSignOut: () => void;
}

const menuItems = [
  { icon: LayoutDashboard, labelKey: "sidebar.overview", path: "/dashboard" },
  { icon: IdCard, labelKey: "sidebar.idCard", path: "/dashboard/id-card" },
  { icon: Wallet, labelKey: "sidebar.wallet", path: "/dashboard/wallet" },
  { icon: Building2, labelKey: "sidebar.bank", path: "/dashboard/bank" },
  { icon: CreditCard, labelKey: "sidebar.transactions", path: "/dashboard/transactions" },
  { icon: FileText, labelKey: "sidebar.schemes", path: "/dashboard/schemes" },
  { icon: Gift, labelKey: "sidebar.benefits", path: "/dashboard/benefits" },
  { icon: Users, labelKey: "sidebar.community", path: "/dashboard/community" },
  { icon: HeadphonesIcon, labelKey: "sidebar.support", path: "/dashboard/support" },
];

export function DashboardSidebar({ onSignOut }: DashboardSidebarProps) {
  const { t } = useLanguage();
  const { user } = useAuth();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-card border-r border-border transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-border">
          {!collapsed && <Logo size="sm" />}
          <Button
            variant="ghost"
            size="icon"
            className={cn("h-8 w-8", collapsed && "mx-auto")}
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <item.icon className="h-5 w-5 shrink-0" />
                    {!collapsed && <span>{t(item.labelKey)}</span>}
                  </Link>
                </li>
              );
            })}

            {/* Admin Link */}
            {user?.role === 'admin' && (
              <li>
                <Link
                  to="/dashboard/admin"
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    location.pathname === "/dashboard/admin"
                      ? "bg-primary text-primary-foreground"
                      : "text-red-500 hover:bg-red-50 hover:text-red-600"
                  )}
                >
                  <ShieldCheck className="h-5 w-5 shrink-0" />
                  {!collapsed && <span>Admin Dashboard</span>}
                </Link>
              </li>
            )}
          </ul>
        </nav>

        {/* Sign Out */}
        <div className="p-2 border-t border-border">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start gap-3 text-muted-foreground hover:text-destructive",
              collapsed && "justify-center"
            )}
            onClick={onSignOut}
          >
            <LogOut className="h-5 w-5 shrink-0" />
            {!collapsed && <span>{t("nav.signOut")}</span>}
          </Button>
        </div>
      </div>
    </aside>
  );
}
