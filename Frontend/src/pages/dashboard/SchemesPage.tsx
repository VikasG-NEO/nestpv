
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Briefcase,
  Loader2,
  HardHat,
  Car,
  Clock,
  Info,
  ExternalLink
} from "lucide-react";
import { useSchemes, Scheme } from "@/hooks/useSchemes";
import { useState } from "react";

export default function SchemesPage() {
  const { schemes, loading } = useSchemes();
  const [applying, setApplying] = useState<string | null>(null);

  const labourSchemes = schemes.filter(s => s.targetGroup === 'labour');
  const autoSchemes = schemes.filter(s => s.targetGroup === 'auto');
  const otherSchemes = schemes.filter(s => s.targetGroup === 'other');

  const handleApply = async (scheme: Scheme) => {
    if (scheme.status === 'coming_soon') return;

    setApplying(scheme.id);
    await new Promise(resolve => setTimeout(resolve, 600)); // Small UX delay

    if (scheme.actionType === 'external' && scheme.actionUrl) {
      window.open(scheme.actionUrl, '_blank');
    } else if (scheme.actionType === 'internal' && scheme.actionUrl) {
      window.location.href = scheme.actionUrl;
    }

    setApplying(null);
  };

  const SchemeCard = ({ scheme }: { scheme: Scheme }) => (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 hover:shadow-md transition-shadow flex flex-col h-full relative overflow-hidden group">
      {/* Top Accent Line */}
      <div className={`absolute top-0 left-0 w-full h-1 ${scheme.targetGroup === 'labour' ? 'bg-orange-400' : 'bg-blue-500'}`} />

      <div className="flex gap-3 mb-3">
        {/* Icon Box */}
        <div className={`w-12 h-12 rounded-lg shrink-0 flex items-center justify-center ${scheme.targetGroup === 'labour' ? 'bg-orange-50 text-orange-600' : 'bg-blue-50 text-blue-600'
          }`}>
          {scheme.category === 'Insurance' ? <Shield className="w-6 h-6" /> :
            scheme.category === 'Pension' ? <Briefcase className="w-6 h-6" /> :
              <Info className="w-6 h-6" />}
        </div>

        {/* Title Section */}
        <div>
          <h3 className="font-bold text-slate-800 leading-tight">{scheme.name}</h3>
          {scheme.hindiName && <p className="text-sm font-bold text-slate-500">{scheme.hindiName}</p>}
        </div>
      </div>

      {/* Benefits List */}
      <div className="space-y-2 flex-1 mb-4">
        {scheme.benefits.map((benefit, idx) => (
          <div key={idx} className="flex items-start gap-2 text-sm text-slate-700 font-medium">
            <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${scheme.targetGroup === 'labour' ? 'bg-orange-400' : 'bg-blue-500'}`} />
            <span>{benefit}</span>
          </div>
        ))}
        {scheme.cost && (
          <div className="flex items-start gap-2 text-sm text-slate-500 font-medium mt-1">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 bg-slate-300" />
            <span>Cost: {scheme.cost}</span>
          </div>
        )}
      </div>

      {/* Action Button */}
      <Button
        size="sm"
        className={`w-full font-bold shadow-sm ${scheme.targetGroup === 'labour'
            ? 'bg-orange-600 hover:bg-orange-700 text-white'
            : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        onClick={() => handleApply(scheme)}
        disabled={applying === scheme.id}
      >
        {applying === scheme.id ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <>
            {scheme.actionType === 'external' ? 'Apply on Gov Portal' : 'Connect with Us'}
            {scheme.actionType === 'external' ? <ExternalLink className="w-3.5 h-3.5 ml-2" /> : null}
          </>
        )}
      </Button>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10 animate-in fade-in duration-500">

      {/* Header */}
      <div className="text-center space-y-2 py-4">
        <h1 className="text-2xl md:text-3xl font-extrabold text-[#0f172a]">
          Government Schemes For <span className="text-blue-600">Auto</span> & <span className="text-orange-500">Labour</span> Workers
        </h1>
        <p className="text-slate-500 font-medium max-w-2xl mx-auto">
          Select your category below to apply for official government benefits or connect with NestUnion support.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-start">

        {/* Labour Column */}
        <div className="space-y-6">
          <div className="bg-orange-100 rounded-t-2xl p-4 flex items-center gap-3 border-b-2 border-orange-200">
            <div className="bg-orange-500 text-white p-2 rounded-lg shadow-sm">
              <HardHat className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-orange-900">Labour (मजदूर)</h2>
              <p className="text-xs font-bold text-orange-700 uppercase tracking-widest">Construction & Daily Wage</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {labourSchemes.map(scheme => (
              <SchemeCard key={scheme.id} scheme={scheme} />
            ))}
          </div>
        </div>

        {/* Auto Column */}
        <div className="space-y-6">
          <div className="bg-blue-100 rounded-t-2xl p-4 flex items-center gap-3 border-b-2 border-blue-200">
            <div className="bg-blue-600 text-white p-2 rounded-lg shadow-sm">
              <Car className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-blue-900">Auto / Taxi Drivers</h2>
              <p className="text-xs font-bold text-blue-700 uppercase tracking-widest">Transport Sector</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {autoSchemes.map(scheme => (
              <SchemeCard key={scheme.id} scheme={scheme} />
            ))}
          </div>
        </div>

      </div>

      {/* Coming Soon Section */}
      {otherSchemes.length > 0 && (
        <div className="mt-12 pt-8 border-t border-slate-200">
          <div className="flex items-center gap-2 mb-6 justify-center">
            <Badge variant="outline" className="text-slate-400 border-slate-300">Other Communities</Badge>
            <span className="text-sm font-bold text-slate-400">Coming Soon</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300">
            {otherSchemes.map(scheme => (
              <Card key={scheme.id} className="bg-slate-50 border-dashed">
                <CardContent className="p-4 flex flex-col items-center text-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-slate-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-700">{scheme.name}</h3>
                    <p className="text-xs text-slate-500">Click to Notify</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4 mt-8 flex flex-col md:flex-row items-center justify-center gap-2 text-center md:text-left">
        <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200 font-bold shrink-0">Disclaimer</Badge>
        <p className="text-sm text-yellow-800/80 font-medium">
          NestUnion acts as a facilitator. You will be redirected to official government portals for application.
        </p>
      </div>

    </div>
  );
}
