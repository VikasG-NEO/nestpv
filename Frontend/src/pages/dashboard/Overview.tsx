import { useAuth } from "@/hooks/useAuth";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownLeft, 
  TrendingUp, 
  Shield, 
  CheckCircle2,
  Clock,
  FileText
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Overview() {
  const { user } = useAuth();
  const { profile, loading: profileLoading } = useUserProfile();
  const { t } = useLanguage();

  const getInitials = (name: string) => {
    return name.slice(0, 2).toUpperCase();
  };

  if (profileLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse text-muted-foreground">{t("common.loading")}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-6 bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl border border-primary/20">
        <Avatar className="w-16 h-16 border-2 border-primary/20">
          <AvatarImage src={user?.photoURL || profile?.photo || undefined} />
          <AvatarFallback className="text-lg bg-primary text-primary-foreground">
            {getInitials(profile?.fullName || user?.email || "U")}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">
            {t("dashboard.welcome")}, {profile?.fullName || user?.displayName || "Member"}!
          </h1>
          <p className="text-muted-foreground">{t("dashboard.manageAccount")}</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 text-green-600 rounded-full text-sm font-medium">
          <CheckCircle2 className="h-4 w-4" />
          {t("dashboard.verified")}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{t("wallet.balance")}</CardTitle>
            <Wallet className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹0.00</div>
            <p className="text-xs text-muted-foreground">{t("wallet.availableBalance")}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{t("transactions.received")}</CardTitle>
            <ArrowDownLeft className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">₹0.00</div>
            <p className="text-xs text-muted-foreground">{t("transactions.thisMonth")}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{t("transactions.sent")}</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">₹0.00</div>
            <p className="text-xs text-muted-foreground">{t("transactions.thisMonth")}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{t("schemes.active")}</CardTitle>
            <FileText className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">{t("schemes.enrolled")}</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="hover:border-primary/50 transition-colors cursor-pointer">
          <Link to="/dashboard/wallet">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Wallet className="h-5 w-5 text-primary" />
                </div>
                {t("wallet.addMoney")}
              </CardTitle>
              <CardDescription>{t("wallet.addMoneyDesc")}</CardDescription>
            </CardHeader>
          </Link>
        </Card>

        <Card className="hover:border-primary/50 transition-colors cursor-pointer">
          <Link to="/dashboard/schemes">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-blue-500" />
                </div>
                {t("schemes.explore")}
              </CardTitle>
              <CardDescription>{t("schemes.exploreDesc")}</CardDescription>
            </CardHeader>
          </Link>
        </Card>

        <Card className="hover:border-primary/50 transition-colors cursor-pointer">
          <Link to="/dashboard/bank">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-green-500" />
                </div>
                {t("bank.connect")}
              </CardTitle>
              <CardDescription>{t("bank.connectDesc")}</CardDescription>
            </CardHeader>
          </Link>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>{t("transactions.recent")}</CardTitle>
          <CardDescription>{t("transactions.recentDesc")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Clock className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <h3 className="font-medium text-muted-foreground">{t("transactions.noTransactions")}</h3>
            <p className="text-sm text-muted-foreground/70">{t("transactions.noTransactionsDesc")}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
