
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    LayoutDashboard,
    Wallet,
    FileText,
    Users,
    CreditCard,
    Gift,
    HelpCircle,
    Building2,
    X
} from "lucide-react";
import { Logo } from "@/components/Logo";

interface DashboardSidebarProps {
    onClose?: () => void;
}

export function DashboardSidebar({ onClose }: DashboardSidebarProps) {
    const { t } = useLanguage();
    const location = useLocation();

    const links = [
        { href: "/dashboard", label: "nav.dashboard", icon: LayoutDashboard },
        { href: "/dashboard/wallet", label: "nav.wallet", icon: Wallet },
        { href: "/dashboard/schemes", label: "nav.schemes", icon: FileText },
        { href: "/dashboard/benefits", label: "nav.benefits", icon: Gift },
        { href: "/dashboard/community", label: "nav.communities", icon: Users },
        { href: "/dashboard/id-card", label: "nav.idCard", icon: CreditCard },
        { href: "/dashboard/bank", label: "nav.bank", icon: Building2 },
        { href: "/dashboard/support", label: "nav.support", icon: HelpCircle },
        { href: "/dashboard/profile", label: "Profile", icon: User },
        { href: "/dashboard/settings", label: "Settings", icon: Settings },
    ];

    const isActive = (path: string) => {
        if (path === "/dashboard" && location.pathname === "/dashboard") return true;
        if (path !== "/dashboard" && location.pathname.startsWith(path)) return true;
        return false;
    };

    return (
        <div className="flex flex-col h-full bg-background border-r border-border/50">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border/50">
                <Logo size="md" />
                {onClose && (
                    <Button variant="ghost" size="icon" onClick={onClose} className="md:hidden">
                        <X className="h-5 w-5" />
                    </Button>
                )}
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
                {links.map((link) => (
                    <Link
                        key={link.href}
                        to={link.href}
                        onClick={onClose}
                    >
                        <Button
                            variant={isActive(link.href) ? "secondary" : "ghost"}
                            className={cn(
                                "w-full justify-start mb-1",
                                isActive(link.href) && "bg-primary/10 text-primary hover:bg-primary/20",
                                !isActive(link.href) && "hover:bg-muted"
                            )}
                        >
                            <link.icon className={cn("h-5 w-5 mr-3", isActive(link.href) ? "text-primary" : "text-muted-foreground")} />
                            {t(link.label)}
                        </Button>
                    </Link>
                ))}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-border/50">
                <div className="bg-primary/5 rounded-lg p-4 mb-4">
                    <p className="text-sm font-medium text-primary mb-1">NestUnion Pro</p>
                    <p className="text-xs text-muted-foreground mb-3">Get access to premium benefits</p>
                    <Button size="sm" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                        Upgrade
                    </Button>
                </div>
            </div>
        </div>
    );
}
