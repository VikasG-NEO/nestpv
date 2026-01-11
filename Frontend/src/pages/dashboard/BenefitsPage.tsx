import { useLanguage } from "@/contexts/LanguageContext";
import { Rocket } from "lucide-react";

export default function BenefitsPage() {
  const { t } = useLanguage();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">{t("benefits.title")}</h1>
        <p className="text-muted-foreground">{t("benefits.subtitle")}</p>
      </div>

      {/* Coming Soon Section */}
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-8 p-8 rounded-2xl bg-muted/30 border border-muted/50 border-dashed">
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
          <div className="relative h-24 w-24 bg-background rounded-2xl flex items-center justify-center shadow-sm border">
            <Rocket className="h-10 w-10 text-primary animate-pulse" />
          </div>
        </div>

        <div className="text-center space-y-2 max-w-md">
          <h3 className="text-2xl font-semibold">Coming Soon</h3>
          <p className="text-muted-foreground">
            We are working on bringing you exclusive deals and discounts. Check back later!
          </p>
        </div>
      </div>
    </div>
  );
}
