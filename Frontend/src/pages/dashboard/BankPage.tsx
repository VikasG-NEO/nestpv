import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  Plus, 
  CreditCard,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Trash2,
  Loader2
} from "lucide-react";
import { useBankAccounts } from "@/hooks/useBankAccounts";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export default function BankPage() {
  const { t } = useLanguage();
  const { accounts, loading, addAccount, removeAccount } = useBankAccounts();
  const { toast } = useToast();
  const [adding, setAdding] = useState(false);
  const [formData, setFormData] = useState({
    accountHolder: '',
    accountNumber: '',
    ifscCode: '',
    bankName: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.accountHolder || !formData.accountNumber || !formData.ifscCode || !formData.bankName) {
      toast({ title: "Error", description: "Please fill all fields", variant: "destructive" });
      return;
    }

    setAdding(true);
    const result = await addAccount(
      formData.accountHolder,
      formData.accountNumber,
      formData.ifscCode,
      formData.bankName
    );

    if (result.success) {
      toast({ title: "Success", description: "Bank account added successfully" });
      setFormData({ accountHolder: '', accountNumber: '', ifscCode: '', bankName: '' });
    } else {
      toast({ title: "Error", description: result.error, variant: "destructive" });
    }
    setAdding(false);
  };

  const handleRemove = async (accountId: string) => {
    const result = await removeAccount(accountId);
    if (result.success) {
      toast({ title: "Success", description: "Bank account removed" });
    } else {
      toast({ title: "Error", description: result.error, variant: "destructive" });
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
        <h1 className="text-2xl font-bold">{t("bank.title")}</h1>
        <p className="text-muted-foreground">{t("bank.subtitle")}</p>
      </div>

      {/* Security Notice */}
      <Card className="border-green-500/20 bg-green-500/5">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 bg-green-500/10 rounded-full flex items-center justify-center shrink-0">
              <ShieldCheck className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <h3 className="font-medium text-green-700">{t("bank.secureConnection")}</h3>
              <p className="text-sm text-green-600/80 mt-1">{t("bank.secureConnectionDesc")}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Linked Accounts */}
      <Card>
        <CardHeader>
          <CardTitle>{t("bank.linkedAccounts")}</CardTitle>
          <CardDescription>{t("bank.linkedAccountsDesc")}</CardDescription>
        </CardHeader>
        <CardContent>
          {accounts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center border-2 border-dashed border-border rounded-lg">
              <Building2 className="h-12 w-12 text-muted-foreground/30 mb-4" />
              <h3 className="font-medium text-muted-foreground">{t("bank.noAccounts")}</h3>
              <p className="text-sm text-muted-foreground/70 mt-1">{t("bank.noAccountsDesc")}</p>
            </div>
          ) : (
            <div className="space-y-3">
              {accounts.map((account) => (
                <div
                  key={account.id}
                  className="flex items-center justify-between p-4 rounded-lg border"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Building2 className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{account.bankName}</p>
                        {account.isPrimary && (
                          <Badge variant="secondary" className="text-xs">Primary</Badge>
                        )}
                        {account.isVerified ? (
                          <Badge variant="secondary" className="bg-green-500/10 text-green-600 text-xs">
                            <CheckCircle2 className="h-3 w-3 mr-1" /> Verified
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-600 text-xs">
                            Pending
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {account.accountHolder} • ****{account.accountNumber.slice(-4)}
                      </p>
                      <p className="text-xs text-muted-foreground">IFSC: {account.ifscCode}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive"
                    onClick={() => handleRemove(account.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Bank Account */}
      <Card>
        <CardHeader>
          <CardTitle>{t("bank.addAccount")}</CardTitle>
          <CardDescription>{t("bank.addAccountDesc")}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>{t("bank.accountHolder")}</Label>
                <Input 
                  placeholder={t("bank.accountHolderPlaceholder")}
                  value={formData.accountHolder}
                  onChange={(e) => setFormData({ ...formData, accountHolder: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>{t("bank.accountNumber")}</Label>
                <Input 
                  placeholder={t("bank.accountNumberPlaceholder")}
                  value={formData.accountNumber}
                  onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>{t("bank.ifsc")}</Label>
                <Input 
                  placeholder={t("bank.ifscPlaceholder")}
                  value={formData.ifscCode}
                  onChange={(e) => setFormData({ ...formData, ifscCode: e.target.value.toUpperCase() })}
                />
              </div>
              <div className="space-y-2">
                <Label>{t("bank.bankName")}</Label>
                <Input 
                  placeholder={t("bank.bankNamePlaceholder")}
                  value={formData.bankName}
                  onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                />
              </div>
            </div>
            
            <div className="flex items-center gap-2 p-4 bg-muted rounded-lg">
              <AlertCircle className="h-5 w-5 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">{t("bank.verificationNote")}</p>
            </div>

            <Button type="submit" className="w-full" disabled={adding}>
              {adding ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Adding...
                </>
              ) : (
                <>
                  <CreditCard className="h-4 w-4 mr-2" />
                  {t("bank.verifyAndAdd")}
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
