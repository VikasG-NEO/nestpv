import { Button } from "@/components/ui/button";
import { ArrowRight, Wallet, Users, Shield, Send, CreditCard } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { Link } from "react-router-dom";

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-b from-background via-sky-50/50 to-emerald-50/30">
      {/* Wave Background */}
      <div className="absolute bottom-0 left-0 right-0 h-48">
        <svg viewBox="0 0 1440 320" className="absolute bottom-0 w-full" preserveAspectRatio="none">
          <path
            fill="hsl(152 60% 85%)"
            d="M0,160L48,170.7C96,181,192,203,288,186.7C384,171,480,117,576,112C672,107,768,149,864,165.3C960,181,1056,171,1152,154.7C1248,139,1344,117,1392,106.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
          <path
            fill="hsl(152 60% 75%)"
            d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,218.7C672,235,768,245,864,234.7C960,224,1056,192,1152,181.3C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>

      {/* Floating Icons */}
      <div className="absolute top-24 right-[15%] w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg animate-float">
        <span className="text-white text-xl">₹</span>
      </div>
      <div className="absolute top-40 right-[8%] w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center shadow-lg animate-float" style={{ animationDelay: '0.5s' }}>
        <Send className="w-5 h-5 text-white" />
      </div>
      <div className="absolute top-56 right-[20%] w-11 h-11 bg-emerald-400 rounded-xl flex items-center justify-center shadow-lg animate-float" style={{ animationDelay: '1s' }}>
        <Shield className="w-5 h-5 text-white" />
      </div>
      <div className="absolute bottom-48 right-[10%] w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center shadow-lg animate-float" style={{ animationDelay: '1.5s' }}>
        <CreditCard className="w-5 h-5 text-white" />
      </div>

      <div className="container mx-auto pt-24 pb-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-8 pt-8 lg:pt-0">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-primary leading-[1.1] animate-fade-up tracking-tight">
              {t('hero.title1')}
              <br />
              <span className="text-emerald-600">{t('hero.title2')}</span>
              <br />
              {t('hero.title3')}
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 animate-fade-up leading-relaxed" style={{ animationDelay: '0.1s' }}>
              {t('hero.subtitle1')}
              <br className="hidden md:block" />
              {t('hero.subtitle2')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-8 h-12 text-base shadow-lg shadow-emerald-600/20 transition-all hover:scale-105" asChild>
                <Link to="/auth">
                  {t('hero.cta')}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Right - Phone Mockup */}
          <div className="relative animate-fade-up flex justify-center lg:justify-end" style={{ animationDelay: '0.3s' }}>
            <div className="relative">
              {/* Phone Frame */}
              <div className="w-[280px] md:w-[320px] bg-slate-900 rounded-[3rem] p-3 shadow-2xl">
                <div className="bg-white rounded-[2.5rem] overflow-hidden">
                  {/* Phone Header */}
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-4 pb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-white">
                        <p className="font-semibold">Rajesh Kadam</p>
                        <p className="text-xs opacity-80">ID: NEST123456</p>
                      </div>
                    </div>
                  </div>

                  {/* Phone Content */}
                  <div className="p-4 space-y-4">
                    {/* Wallet Card */}
                    <div className="bg-emerald-50 rounded-xl p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
                          <Wallet className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">{t('hero.wallet')}</p>
                          <p className="font-bold text-lg">₹1,250</p>
                        </div>
                      </div>
                    </div>

                    {/* Scatter Services */}
                    <div className="bg-slate-50 rounded-xl p-3">
                      <p className="text-sm text-muted-foreground mb-2">{t('hero.scatterServices')}</p>
                      <div className="flex gap-2 flex-wrap">
                        <span className="bg-white px-3 py-1 rounded-full text-xs shadow-sm">Hi Satee</span>
                        <span className="bg-white px-3 py-1 rounded-full text-xs shadow-sm">Jonepayees</span>
                      </div>
                    </div>

                    {/* Community Card */}
                    <div className="bg-amber-50 rounded-xl p-3">
                      <p className="text-sm font-medium">{t('hero.communityChat')}</p>
                      <p className="text-xs text-muted-foreground">Beedndars</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -top-2 -right-4 bg-white px-4 py-2 rounded-xl shadow-lg text-sm font-medium text-emerald-600 animate-float">
                ✓ {t('hero.verified')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}