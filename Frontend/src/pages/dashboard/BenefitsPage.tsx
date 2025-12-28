
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Gift,
  Percent,
  Ticket,
  Heart,
  ShoppingBag,
  Fuel,
  Utensils,
  Phone,
  ChevronRight
} from "lucide-react";

const benefits = [
  {
    id: 1,
    icon: Fuel,
    title: "benefits.fuel",
    desc: "benefits.fuelDesc",
    discount: "5%",
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
  {
    id: 2,
    icon: Heart,
    title: "benefits.healthcare",
    desc: "benefits.healthcareDesc",
    discount: "10%",
    color: "text-red-500",
    bg: "bg-red-500/10",
  },
  {
    id: 3,
    icon: ShoppingBag,
    title: "benefits.shopping",
    desc: "benefits.shoppingDesc",
    discount: "15%",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    id: 4,
    icon: Utensils,
    title: "benefits.food",
    desc: "benefits.foodDesc",
    discount: "20%",
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    id: 5,
    icon: Phone,
    title: "benefits.recharge",
    desc: "benefits.rechargeDesc",
    discount: "2%",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    id: 6,
    icon: Ticket,
    title: "benefits.entertainment",
    desc: "benefits.entertainmentDesc",
    discount: "25%",
    color: "text-pink-500",
    bg: "bg-pink-500/10",
  },
];

export default function BenefitsPage() {
  const { t } = useLanguage();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">{t("benefits.title")}</h1>
        <p className="text-muted-foreground">{t("benefits.subtitle")}</p>
      </div>

      {/* Stats - Simplified mapping */}
      <div className="grid gap-4 md:grid-cols-3">
        {[
          { icon: Gift, color: "text-primary", bg: "bg-primary/10", label: "benefits.available", value: "6" },
          { icon: Percent, color: "text-green-500", bg: "bg-green-500/10", label: "benefits.saved", value: "₹0" },
          { icon: Ticket, color: "text-yellow-500", bg: "bg-yellow-500/10", label: "benefits.redeemed", value: "0" }
        ].map((stat, i) => (
          <Card key={i} className="hover:border-primary/50 transition-all duration-300 hover:shadow-md">
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

      {/* Benefits Grid - with Staggered Animation */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {benefits.map((benefit, index) => (
          <Card
            key={benefit.id}
            className="hover:border-primary/50 transition-all duration-300 hover:shadow-lg cursor-pointer group animate-in fade-in slide-in-from-bottom-8 fill-mode-backwards"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className={`h-12 w-12 rounded-lg ${benefit.bg} flex items-center justify-center transition-transform group-hover:scale-110 duration-300`}>
                  <benefit.icon className={`h-6 w-6 ${benefit.color}`} />
                </div>
                <Badge variant="secondary" className="text-green-600 bg-green-500/10">
                  {t("benefits.upTo")} {benefit.discount} {t("benefits.off")}
                </Badge>
              </div>
              <CardTitle className="mt-4 group-hover:text-primary transition-colors">{t(benefit.title)}</CardTitle>
              <CardDescription>{t(benefit.desc)}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="ghost"
                className="w-full justify-between group-hover:bg-muted group-hover:text-primary transition-colors"
              >
                {t("benefits.viewOffers")}
                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
