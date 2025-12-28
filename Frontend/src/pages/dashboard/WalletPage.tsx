import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Wallet, 
  Plus, 
  ArrowUpRight, 
  ArrowDownLeft, 
  CreditCard,
  Smartphone,
  Building2,
  QrCode,
  Loader2
} from "lucide-react";
import { useState } from "react";
import { useWallet } from "@/hooks/useWallet";
import { useTransactions } from "@/hooks/useTransactions";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function WalletPage() {
  const { t } = useLanguage();
  const { wallet, loading, addMoney, withdrawMoney } = useWallet();
  const { addTransaction } = useTransactions();
  const { toast } = useToast();
  const [amount, setAmount] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isWithdrawDialogOpen, setIsWithdrawDialogOpen] = useState(false);
  const [processing, setProcessing] = useState(false);

  const quickAmounts = [100, 500, 1000, 2000, 5000];

  const handleAddMoney = async () => {
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      toast({ title: "Error", description: "Please enter a valid amount", variant: "destructive" });
      return;
    }

    setProcessing(true);
    const result = await addMoney(amountNum);
    if (result.success) {
      await addTransaction('credit', amountNum, 'Added to wallet', 'Wallet');
      toast({ title: "Success", description: `₹${amountNum} added to wallet` });
      setAmount("");
      setIsAddDialogOpen(false);
    } else {
      toast({ title: "Error", description: result.error, variant: "destructive" });
    }
    setProcessing(false);
  };

  const handleWithdraw = async () => {
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      toast({ title: "Error", description: "Please enter a valid amount", variant: "destructive" });
      return;
    }

    setProcessing(true);
    const result = await withdrawMoney(amountNum);
    if (result.success) {
      await addTransaction('debit', amountNum, 'Withdrawn from wallet', 'Wallet');
      toast({ title: "Success", description: `₹${amountNum} withdrawn from wallet` });
      setAmount("");
      setIsWithdrawDialogOpen(false);
    } else {
      toast({ title: "Error", description: result.error, variant: "destructive" });
    }
    setProcessing(false);
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
        <h1 className="text-2xl font-bold">{t("wallet.title")}</h1>
        <p className="text-muted-foreground">{t("wallet.subtitle")}</p>
      </div>

      {/* Balance Card */}
      <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-primary-foreground/80 text-sm">{t("wallet.availableBalance")}</p>
              <h2 className="text-4xl font-bold mt-1">₹{wallet?.balance.toLocaleString('en-IN', { minimumFractionDigits: 2 }) || '0.00'}</h2>
            </div>
            <div className="h-16 w-16 bg-primary-foreground/10 rounded-full flex items-center justify-center">
              <Wallet className="h-8 w-8" />
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <Button 
              variant="secondary" 
              className="flex-1"
              onClick={() => setIsAddDialogOpen(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              {t("wallet.addMoney")}
            </Button>
            <Button 
              variant="secondary" 
              className="flex-1"
              onClick={() => setIsWithdrawDialogOpen(true)}
            >
              <ArrowUpRight className="h-4 w-4 mr-2" />
              {t("wallet.withdraw")}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Add Money Section */}
      <Card>
        <CardHeader>
          <CardTitle>{t("wallet.addMoney")}</CardTitle>
          <CardDescription>{t("wallet.addMoneyDesc")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">{t("wallet.enterAmount")}</label>
            <div className="relative mt-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
              <Input
                type="number"
                placeholder="0.00"
                className="pl-8 text-lg"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {quickAmounts.map((amt) => (
              <Button
                key={amt}
                variant="outline"
                size="sm"
                onClick={() => setAmount(amt.toString())}
              >
                ₹{amt}
              </Button>
            ))}
          </div>

          <div className="grid gap-3 pt-4">
            <Button 
              className="w-full justify-start h-auto py-4" 
              variant="outline"
              onClick={() => amount && setIsAddDialogOpen(true)}
            >
              <CreditCard className="h-5 w-5 mr-3 text-primary" />
              <div className="text-left">
                <div className="font-medium">{t("wallet.debitCard")}</div>
                <div className="text-xs text-muted-foreground">{t("wallet.debitCardDesc")}</div>
              </div>
            </Button>
            <Button 
              className="w-full justify-start h-auto py-4" 
              variant="outline"
              onClick={() => amount && setIsAddDialogOpen(true)}
            >
              <Smartphone className="h-5 w-5 mr-3 text-green-500" />
              <div className="text-left">
                <div className="font-medium">{t("wallet.upi")}</div>
                <div className="text-xs text-muted-foreground">{t("wallet.upiDesc")}</div>
              </div>
            </Button>
            <Button 
              className="w-full justify-start h-auto py-4" 
              variant="outline"
              onClick={() => amount && setIsAddDialogOpen(true)}
            >
              <Building2 className="h-5 w-5 mr-3 text-blue-500" />
              <div className="text-left">
                <div className="font-medium">{t("wallet.netBanking")}</div>
                <div className="text-xs text-muted-foreground">{t("wallet.netBankingDesc")}</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Send Money */}
      <Card>
        <CardHeader>
          <CardTitle>{t("wallet.sendMoney")}</CardTitle>
          <CardDescription>{t("wallet.sendMoneyDesc")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Button variant="outline" className="h-24 flex-col gap-2">
              <QrCode className="h-6 w-6" />
              <span className="text-xs">{t("wallet.scanQr")}</span>
            </Button>
            <Button variant="outline" className="h-24 flex-col gap-2">
              <Smartphone className="h-6 w-6" />
              <span className="text-xs">{t("wallet.toUpi")}</span>
            </Button>
            <Button variant="outline" className="h-24 flex-col gap-2">
              <Building2 className="h-6 w-6" />
              <span className="text-xs">{t("wallet.toBank")}</span>
            </Button>
            <Button variant="outline" className="h-24 flex-col gap-2">
              <ArrowDownLeft className="h-6 w-6" />
              <span className="text-xs">{t("wallet.request")}</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Add Money Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("wallet.addMoney")}</DialogTitle>
            <DialogDescription>Enter the amount you want to add to your wallet.</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-lg">₹</span>
              <Input
                type="number"
                placeholder="0.00"
                className="pl-8 text-2xl h-14"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {quickAmounts.map((amt) => (
                <Button
                  key={amt}
                  variant="outline"
                  size="sm"
                  onClick={() => setAmount(amt.toString())}
                >
                  ₹{amt}
                </Button>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddMoney} disabled={processing}>
              {processing && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Add ₹{amount || '0'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Withdraw Dialog */}
      <Dialog open={isWithdrawDialogOpen} onOpenChange={setIsWithdrawDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("wallet.withdraw")}</DialogTitle>
            <DialogDescription>Enter the amount you want to withdraw. Available: ₹{wallet?.balance.toLocaleString('en-IN') || '0'}</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-lg">₹</span>
              <Input
                type="number"
                placeholder="0.00"
                className="pl-8 text-2xl h-14"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                max={wallet?.balance || 0}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsWithdrawDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleWithdraw} disabled={processing}>
              {processing && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Withdraw ₹{amount || '0'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
