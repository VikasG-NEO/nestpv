import { 
  BadgeCheck, 
  HeartHandshake, 
  Shield, 
  Wallet,
  ArrowRight
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function FeaturesSection() {
  const { t } = useLanguage();
  
  const features = [
    {
      icon: BadgeCheck,
      titleKey: 'features.digitalId',
      color: "bg-teal-500",
    },
    {
      icon: HeartHandshake,
      titleKey: 'features.support',
      color: "bg-emerald-500",
    },
    {
      icon: Shield,
      titleKey: 'features.insurance',
      color: "bg-amber-500",
    },
    {
      icon: Wallet,
      titleKey: 'features.loan',
      color: "bg-rose-500",
    },
  ];

  return (
    <section id="features" className="py-16 md:py-20 bg-background">
      <div className="container mx-auto">
        {/* Section Header */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-8">
          {t('features.title')}
        </h2>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-5 hover:shadow-md transition-all duration-300 border border-border/30 cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <div className={`${feature.color} w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <feature.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    {t(feature.titleKey)}
                  </h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    {t('features.benefits')}
                    <ArrowRight className="w-3 h-3" />
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}