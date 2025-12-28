import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, Car, Store, HardHat, Truck, Leaf, Wrench, Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

export function CommunitySection() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  const communities = [
    {
      titleKey: "community.autoTaxi",
      icon: Car,
      color: "bg-amber-100",
      iconColor: "text-amber-600",
      image: "https://images.unsplash.com/photo-1556122071-e404eaedb77f?w=300&h=200&fit=crop",
      value: "auto",
    },
    {
      titleKey: "community.dukandar",
      icon: Store,
      color: "bg-orange-100",
      iconColor: "text-orange-600",
      image: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=300&h=200&fit=crop",
      value: "dukandar",
    },
    {
      titleKey: "community.labour",
      icon: HardHat,
      color: "bg-blue-100",
      iconColor: "text-blue-600",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=300&h=200&fit=crop",
      value: "labour",
    },
    {
      titleKey: "community.delivery",
      icon: Truck,
      color: "bg-green-100",
      iconColor: "text-green-600",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
      value: "delivery",
    },
    {
      titleKey: "community.farmer",
      icon: Leaf,
      color: "bg-emerald-100",
      iconColor: "text-emerald-600",
      image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=300&h=200&fit=crop",
      value: "farmer",
    },
    {
      titleKey: "community.electrician",
      icon: Wrench,
      color: "bg-sky-100",
      iconColor: "text-sky-600",
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=300&h=200&fit=crop",
      value: "electrician",
    },
  ];

  return (
    <section id="community" className="py-16 md:py-24 bg-gradient-to-b from-sky-50/50 to-background">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left - Community Cards */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-8">
              {t('community.title')}
            </h2>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {communities.map((community, index) => (
                <div
                  key={index}
                  className="group bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-border/50 cursor-pointer"
                  onClick={() => navigate(`/register?community=${community.value}`)}
                >
                  {/* Image */}
                  <div className="h-28 overflow-hidden">
                    <img
                      src={community.image}
                      alt={t(community.titleKey)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`w-6 h-6 ${community.color} rounded-md flex items-center justify-center`}>
                        <community.icon className={`w-3.5 h-3.5 ${community.iconColor}`} />
                      </div>
                      <h3 className="font-semibold text-sm text-foreground">
                        {t(community.titleKey)}
                      </h3>
                    </div>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      {t('community.benefits')}
                      <ArrowRight className="w-3 h-3" />
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Registration Form */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-2xl p-6 shadow-lg border border-border/50 sticky top-24">
              <h3 className="text-xl font-bold text-foreground mb-6">
                {t('form.joinToday')}
              </h3>

              <form className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">{t('form.name')}</label>
                  <Input placeholder={t('form.namePlaceholder')} className="rounded-lg" />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">{t('form.mobile')}</label>
                  <Input placeholder={t('form.mobilePlaceholder')} type="tel" className="rounded-lg" />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">{t('form.selectCommunity')}</label>
                  <Select>
                    <SelectTrigger className="rounded-lg">
                      <SelectValue placeholder={t('form.cityVillage')} />
                    </SelectTrigger>
                    <SelectContent>
                      {communities.map((community) => (
                        <SelectItem key={community.value} value={community.value}>
                          {t(community.titleKey)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg py-6 text-base font-semibold">
                  {t('form.getMyId')}
                </Button>

                <p className="text-center text-xs text-muted-foreground">
                  {t('form.getIdTime')}
                </p>
              </form>

              {/* Trust Badge */}
              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex items-center gap-2 text-sm text-emerald-600">
                  <Check className="w-4 h-4" />
                  <span>{t('form.trustedBy')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}