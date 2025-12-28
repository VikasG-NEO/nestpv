import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  HeadphonesIcon, 
  MessageCircle, 
  Phone,
  Mail,
  Clock,
  FileQuestion,
  ChevronRight,
  Send
} from "lucide-react";

const faqs = [
  { id: 1, question: "support.faq1", answer: "support.faq1Answer" },
  { id: 2, question: "support.faq2", answer: "support.faq2Answer" },
  { id: 3, question: "support.faq3", answer: "support.faq3Answer" },
  { id: 4, question: "support.faq4", answer: "support.faq4Answer" },
];

export default function SupportPage() {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">{t("support.title")}</h1>
        <p className="text-muted-foreground">{t("support.subtitle")}</p>
      </div>

      {/* Contact Options */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="hover:border-primary/50 transition-colors cursor-pointer">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="h-14 w-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <MessageCircle className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-medium">{t("support.liveChat")}</h3>
              <p className="text-sm text-muted-foreground mt-1">{t("support.liveChatDesc")}</p>
              <Button className="mt-4 w-full">{t("support.startChat")}</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:border-primary/50 transition-colors cursor-pointer">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="h-14 w-14 bg-green-500/10 rounded-full flex items-center justify-center mb-4">
                <Phone className="h-7 w-7 text-green-500" />
              </div>
              <h3 className="font-medium">{t("support.callUs")}</h3>
              <p className="text-sm text-muted-foreground mt-1">{t("support.callUsDesc")}</p>
              <Button variant="outline" className="mt-4 w-full">1800-123-4567</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:border-primary/50 transition-colors cursor-pointer">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="h-14 w-14 bg-blue-500/10 rounded-full flex items-center justify-center mb-4">
                <Mail className="h-7 w-7 text-blue-500" />
              </div>
              <h3 className="font-medium">{t("support.email")}</h3>
              <p className="text-sm text-muted-foreground mt-1">{t("support.emailDesc")}</p>
              <Button variant="outline" className="mt-4 w-full">support@nestunion.in</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* FAQs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileQuestion className="h-5 w-5" />
            {t("support.faqs")}
          </CardTitle>
          <CardDescription>{t("support.faqsDesc")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer"
            >
              <span className="font-medium">{t(faq.question)}</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Submit Ticket */}
      <Card>
        <CardHeader>
          <CardTitle>{t("support.submitTicket")}</CardTitle>
          <CardDescription>{t("support.submitTicketDesc")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">{t("support.subject")}</label>
            <Input placeholder={t("support.subjectPlaceholder")} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">{t("support.description")}</label>
            <Textarea 
              placeholder={t("support.descriptionPlaceholder")} 
              className="min-h-32"
            />
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            {t("support.responseTime")}
          </div>
          <Button className="w-full">
            <Send className="h-4 w-4 mr-2" />
            {t("support.submit")}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
