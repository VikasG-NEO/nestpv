import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Users,
  MessageCircle,
  Send,
  Plus,
  UserPlus,
  Bell,
  Settings,
  Search
} from "lucide-react";

const communityGroups = [
  { id: 1, name: "Auto Drivers Maharashtra", members: 1250, unread: 5 },
  { id: 2, name: "Taxi Union Mumbai", members: 890, unread: 0 },
  { id: 3, name: "Dukandar Association", members: 2100, unread: 12 },
];

export default function CommunityPage() {
  const { t } = useLanguage();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{t("communityDash.title")}</h1>
          <p className="text-muted-foreground">{t("communityDash.subtitle")}</p>
        </div>
        <Button className="shadow-lg shadow-primary/20 hover:shadow-xl transition-all duration-300">
          <Plus className="h-4 w-4 mr-2" />
          {t("communityDash.createGroup")}
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        {[
          { icon: Users, color: "text-primary", bg: "bg-primary/10", label: "communityDash.groups", value: "3" },
          { icon: UserPlus, color: "text-green-500", bg: "bg-green-500/10", label: "communityDash.connections", value: "0" },
          { icon: MessageCircle, color: "text-blue-500", bg: "bg-blue-500/10", label: "communityDash.messages", value: "17" }
        ].map((stat, i) => (
          <Card key={i} className="border-primary/20 hover:shadow-md transition-all duration-300">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className={`h-12 w-12 ${stat.bg} rounded-full flex items-center justify-center transition-transform hover:scale-110 duration-300`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t(stat.label)}</p>
                  <h3 className="text-2xl font-bold">{stat.value}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={t("communityDash.searchGroups")}
          className="pl-10 h-12 bg-background/50 backdrop-blur-sm focus:bg-background transition-all"
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Community Groups */}
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle>{t("communityDash.yourGroups")}</CardTitle>
            <CardDescription>{t("communityDash.yourGroupsDesc")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {communityGroups.map((group, index) => (
              <div
                key={group.id}
                className="flex items-center gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer group animate-in slide-in-from-bottom-4 fade-in fill-mode-backwards"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Avatar className="h-12 w-12 border-2 border-background shadow-sm group-hover:scale-105 transition-transform duration-300">
                  <AvatarFallback className="bg-primary/10 text-primary font-bold">
                    {group.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium truncate group-hover:text-primary transition-colors">{group.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {group.members.toLocaleString()} {t("communityDash.members")}
                  </p>
                </div>
                {group.unread > 0 && (
                  <Badge className="bg-primary animate-pulse">{group.unread}</Badge>
                )}
                <Button variant="ghost" size="icon" className="group-hover:translate-x-1 transition-transform">
                  <MessageCircle className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Chat */}
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle>{t("communityDash.quickChat")}</CardTitle>
            <CardDescription>{t("communityDash.quickChatDesc")}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col h-[400px]">
            <div className="flex-1 bg-muted/30 rounded-lg flex items-center justify-center mb-4 border border-dashed border-muted-foreground/25">
              <div className="text-center space-y-2">
                <MessageCircle className="h-8 w-8 text-muted-foreground mx-auto opacity-50" />
                <p className="text-muted-foreground">{t("communityDash.selectGroup")}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Input placeholder={t("communityDash.typeMessage")} className="flex-1" />
              <Button>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
