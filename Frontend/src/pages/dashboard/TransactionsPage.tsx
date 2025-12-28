import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  Search,
  Download,
  Clock,
  CalendarDays,
  Loader2
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTransactions } from "@/hooks/useTransactions";
import { useState } from "react";

export default function TransactionsPage() {
  const { t } = useLanguage();
  const { transactions, loading, stats } = useTransactions(100);
  const [filter, setFilter] = useState<'all' | 'credit' | 'debit'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTransactions = transactions.filter((txn) => {
    const matchesFilter = filter === 'all' || txn.type === filter;
    const matchesSearch = txn.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         txn.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{t("transactions.title")}</h1>
          <p className="text-muted-foreground">{t("transactions.subtitle")}</p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          {t("transactions.export")}
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-green-500/10 rounded-full flex items-center justify-center">
                <ArrowDownLeft className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t("transactions.totalReceived")}</p>
                <h3 className="text-2xl font-bold text-green-600">
                  ₹{stats.totalReceived.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-red-500/10 rounded-full flex items-center justify-center">
                <ArrowUpRight className="h-6 w-6 text-red-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t("transactions.totalSent")}</p>
                <h3 className="text-2xl font-bold text-red-600">
                  ₹{stats.totalSent.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                <CalendarDays className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t("transactions.count")}</p>
                <h3 className="text-2xl font-bold">{stats.count}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t("transactions.search")}
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={filter} onValueChange={(v) => setFilter(v as any)}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder={t("transactions.type")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("transactions.all")}</SelectItem>
                <SelectItem value="credit">{t("transactions.credit")}</SelectItem>
                <SelectItem value="debit">{t("transactions.debit")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Transactions List */}
      <Card>
        <CardHeader>
          <CardTitle>{t("transactions.history")}</CardTitle>
          <CardDescription>{t("transactions.historyDesc")}</CardDescription>
        </CardHeader>
        <CardContent>
          {filteredTransactions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Clock className="h-16 w-16 text-muted-foreground/30 mb-4" />
              <h3 className="font-medium text-muted-foreground text-lg">{t("transactions.noTransactions")}</h3>
              <p className="text-sm text-muted-foreground/70 mt-1">{t("transactions.noTransactionsDesc")}</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredTransactions.map((txn) => (
                <div
                  key={txn.id}
                  className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                      txn.type === 'credit' ? 'bg-green-500/10' : 'bg-red-500/10'
                    }`}>
                      {txn.type === 'credit' ? (
                        <ArrowDownLeft className="h-5 w-5 text-green-500" />
                      ) : (
                        <ArrowUpRight className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{txn.description}</p>
                      <p className="text-sm text-muted-foreground">
                        {txn.date.toLocaleDateString('en-IN', { 
                          day: 'numeric', 
                          month: 'short', 
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${
                      txn.type === 'credit' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {txn.type === 'credit' ? '+' : '-'}₹{txn.amount.toLocaleString('en-IN')}
                    </p>
                    <Badge variant="secondary" className="text-xs">
                      {txn.category}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
