
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  TrendingUp,
  Shield,
  Heart,
  GraduationCap,
  Home,
  Briefcase,
  ChevronRight,
  Loader2,
  CheckCircle2,
  Clock,
  XCircle
} from "lucide-react";
import { useSchemes } from "@/hooks/useSchemes";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const iconMap: Record<string, any> = {
  Insurance: Shield,
  Healthcare: Heart,
  Education: GraduationCap,
  Housing: Home,
  Employment: Briefcase,
  Finance: TrendingUp,
};

const colorMap: Record<string, { color: string; bg: string }> = {
  Insurance: { color: "text-blue-500", bg: "bg-blue-500/10" },
  Healthcare: { color: "text-red-500", bg: "bg-red-500/10" },
  Education: { color: "text-purple-500", bg: "bg-purple-500/10" },
  Housing: { color: "text-orange-500", bg: "bg-orange-500/10" },
  Employment: { color: "text-green-500", bg: "bg-green-500/10" },
  Finance: { color: "text-primary", bg: "bg-primary/10" },
};

export default function SchemesPage() {
  const { t } = useLanguage();
  const { schemes, loading, stats, applyForScheme } = useSchemes();
  const { toast } = useToast();
  const [applying, setApplying] = useState<string | null>(null);

  const handleApply = async (scheme: any) => {
    setApplying(scheme.id);
    const result = await applyForScheme(scheme);
    if (result.success) {
      toast({ title: "Success", description: `Applied for ${scheme.name} successfully!` });
    } else {
      toast({ title: "Error", description: result.error, variant: "destructive" });
    }
    setApplying(null);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return <Badge>{t("schemes.apply")}</Badge>;
      case 'applied':
        return <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-600"><Clock className="h-3 w-3 mr-1" /> Pending</Badge>;
      case 'approved':
        return <Badge variant="secondary" className="bg-green-500/10 text-green-600"><CheckCircle2 className="h-3 w-3 mr-1" /> Approved</Badge>;
      case 'rejected':
        return <Badge variant="secondary" className="bg-red-500/10 text-red-600"><XCircle className="h-3 w-3 mr-1" /> Rejected</Badge>;
      default:
        return <Badge variant="secondary">{t("schemes.comingSoon")}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">{t("schemes.title")}</h1>
        <p className="text-muted-foreground">{t("schemes.subtitle")}</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t("schemes.available")}</p>
                <h3 className="text-2xl font-bold">{stats.available}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-green-500/10 rounded-full flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t("schemes.enrolled")}</p>
                <h3 className="text-2xl font-bold">{stats.approved}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-yellow-500/10 rounded-full flex items-center justify-center">
                <FileText className="h-6 w-6 text-yellow-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t("schemes.pending")}</p>
                <h3 className="text-2xl font-bold">{stats.applied}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Schemes Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {schemes.map((scheme) => {
          const IconComponent = iconMap[scheme.category] || FileText;
          const colors = colorMap[scheme.category] || { color: "text-primary", bg: "bg-primary/10" };

          return (
            <Card key={scheme.id} className="hover:border-primary/50 transition-colors cursor-pointer group">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className={`h-12 w-12 rounded-lg ${colors.bg} flex items-center justify-center`}>
                    <IconComponent className={`h-6 w-6 ${colors.color}`} />
                  </div>
                  {getStatusBadge(scheme.status)}
                </div>
                <CardTitle className="mt-4">{scheme.name}</CardTitle>
                <CardDescription>{scheme.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground mb-3">
                  <p><strong>Eligibility:</strong> {scheme.eligibility}</p>
                  <p><strong>Benefits:</strong> {scheme.benefits}</p>
                </div>
                <Button
                  variant={scheme.status === 'available' ? 'default' : 'ghost'}
                  className="w-full justify-between group-hover:bg-muted"
                  disabled={scheme.status !== 'available' || applying === scheme.id}
                  onClick={() => handleApply(scheme)}
                >
                  {applying === scheme.id ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Applying...
                    </>
                  ) : scheme.status === 'available' ? (
                    <>
                      {t("schemes.apply")}
                      <ChevronRight className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      {t("schemes.viewDetails")}
                      <ChevronRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
