import { useUserProfile } from "@/hooks/useUserProfile";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { IDCard } from "@/components/IDCard";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertCircle, CreditCard } from "lucide-react";

import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { fetchAPI } from "@/lib/api";
import { useState } from "react";

export default function IDCardPage() {
  const { profile, loading } = useUserProfile();
  const { t } = useLanguage();
  const [verifying, setVerifying] = useState(false);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse text-muted-foreground">{t("common.loading")}</div>
      </div>
    );
  }

  const isVerified = profile?.isDocumentVerified;

  const handleVerify = async () => {
    setVerifying(true);
    try {
      // Simulate API call
      await fetchAPI('/users/verify-documents', { method: 'POST' });
      toast({
        title: "Verification Successful",
        description: "Your documents have been verified via DigiLocker.",
      });
      // We might need to refresh profile here. The simplest way is to reload or use updated context.
      // For now, reload window to see changes as useUserProfile might not auto-refresh.
      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      toast({
        title: "Verification Failed",
        description: "Could not verify documents at this time.",
        variant: "destructive"
      });
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">{t("idCard.pageTitle")}</h1>
        <p className="text-muted-foreground">{t("idCard.pageSubtitle")}</p>
      </div>

      {/* Verification Status */}
      <Card className={isVerified ? "border-green-500/20 bg-green-500/5" : "border-yellow-500/20 bg-yellow-500/5"}>
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${isVerified ? "bg-green-500/10" : "bg-yellow-500/10"}`}>
              {isVerified ? (
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              ) : (
                <AlertCircle className="h-5 w-5 text-yellow-500" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h3 className={`font-medium ${isVerified ? "text-green-700" : "text-yellow-700"}`}>
                    {isVerified ? "Identity Verified" : "Identity Verification Pending"}
                  </h3>
                  <Badge variant={isVerified ? "default" : "secondary"}>
                    {isVerified ? "Verified" : "Action Required"}
                  </Badge>
                </div>
              </div>
              <p className={`text-sm mt-1 ${isVerified ? "text-green-600/80" : "text-yellow-600/80"}`}>
                {isVerified ? "Your identity documents have been verified via DigiLocker." : "Please verify your identity using DigiLocker to activate your ID card fully."}
              </p>

              {!isVerified && (
                <Button
                  onClick={handleVerify}
                  disabled={verifying}
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {verifying ? "Connecting..." : "Verify with DIGILocker"}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ID Card Display */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            {t("idCard.title")}
          </CardTitle>
          <CardDescription>{t("idCard.subtitle")}</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          {profile && (profile.fullName || profile.email) ? (
            <IDCard profile={profile} />
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <CreditCard className="h-16 w-16 text-muted-foreground/30 mb-4" />
              <h3 className="font-medium text-muted-foreground">{t("idCard.noProfile")}</h3>
              <p className="text-sm text-muted-foreground/70 mt-1">{t("idCard.noProfileDesc")}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
