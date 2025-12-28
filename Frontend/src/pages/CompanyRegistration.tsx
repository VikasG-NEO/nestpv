import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Upload, X, Building2, ImagePlus, FileCheck, ArrowLeft, Check } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";

const communities = [
  { value: "auto", labelKey: "community.autoTaxi" },
  { value: "dukandar", labelKey: "community.dukandar" },
  { value: "labour", labelKey: "community.labour" },
  { value: "delivery", labelKey: "community.delivery" },
  { value: "farmer", labelKey: "community.farmer" },
  { value: "electrician", labelKey: "community.electrician" },
];

export default function CompanyRegistration() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  const preselectedCommunity = searchParams.get("community") || "";

  const [formData, setFormData] = useState({
    ownerName: "",
    companyName: "",
    mobile: "",
    email: "",
    community: preselectedCommunity,
    address: "",
    city: "",
    state: "",
    pincode: "",
    description: "",
  });

  const [shopImages, setShopImages] = useState<File[]>([]);
  const [shopImagePreviews, setShopImagePreviews] = useState<string[]>([]);
  const [documents, setDocuments] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleShopImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (shopImages.length + files.length > 5) {
      toast({
        title: t('register.maxImages'),
        variant: "destructive",
      });
      return;
    }

    const newImages = [...shopImages, ...files];
    setShopImages(newImages);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setShopImagePreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeShopImage = (index: number) => {
    setShopImages((prev) => prev.filter((_, i) => i !== index));
    setShopImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (documents.length + files.length > 3) {
      toast({
        title: t('register.maxDocs'),
        variant: "destructive",
      });
      return;
    }
    setDocuments((prev) => [...prev, ...files]);
  };

  const removeDocument = (index: number) => {
    setDocuments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // No backend connected - show message
      toast({
        title: t('register.error'),
        description: "No backend connected. Please connect a backend service.",
        variant: "destructive",
      });
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: t('register.error'),
        description: t('register.errorDesc'),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-sky-50/50 to-background">
      <Header />
      <main className="flex-1 container mx-auto py-8 px-4">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t('common.back')}
        </Button>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              {t('register.title')}
            </h1>
            <p className="text-muted-foreground">
              {t('register.subtitle')}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Company Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-primary" />
                  {t('register.companyDetails')}
                </CardTitle>
                <CardDescription>{t('register.companyDetailsDesc')}</CardDescription>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ownerName">{t('register.ownerName')} *</Label>
                  <Input
                    id="ownerName"
                    name="ownerName"
                    value={formData.ownerName}
                    onChange={handleInputChange}
                    placeholder={t('register.ownerNamePlaceholder')}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companyName">{t('register.companyName')} *</Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder={t('register.companyNamePlaceholder')}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mobile">{t('form.mobile')} *</Label>
                  <Input
                    id="mobile"
                    name="mobile"
                    type="tel"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    placeholder={t('form.mobilePlaceholder')}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t('dashboard.email')}</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="email@example.com"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="community">{t('form.selectCommunity')} *</Label>
                  <Select
                    value={formData.community}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, community: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t('form.selectCommunity')} />
                    </SelectTrigger>
                    <SelectContent>
                      {communities.map((c) => (
                        <SelectItem key={c.value} value={c.value}>
                          {t(c.labelKey)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">{t('register.address')} *</Label>
                  <Textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder={t('register.addressPlaceholder')}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">{t('register.city')} *</Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder={t('register.cityPlaceholder')}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">{t('register.state')} *</Label>
                  <Input
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder={t('register.statePlaceholder')}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pincode">{t('register.pincode')} *</Label>
                  <Input
                    id="pincode"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    placeholder="400001"
                    required
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="description">{t('register.description')}</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder={t('register.descriptionPlaceholder')}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Shop Images */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImagePlus className="w-5 h-5 text-primary" />
                  {t('register.shopImages')}
                </CardTitle>
                <CardDescription>{t('register.shopImagesDesc')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                  {shopImagePreviews.map((preview, index) => (
                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-border">
                      <img src={preview} alt={`Shop ${index + 1}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeShopImage(index)}
                        className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-1"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  {shopImages.length < 5 && (
                    <label className="aspect-square rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors">
                      <Upload className="w-6 h-6 text-muted-foreground mb-1" />
                      <span className="text-xs text-muted-foreground">{t('register.addImage')}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleShopImageUpload}
                        className="hidden"
                        multiple
                      />
                    </label>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  {t('register.imageHint')} ({shopImages.length}/5)
                </p>
              </CardContent>
            </Card>

            {/* Documents */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-primary" />
                  {t('register.documents')}
                </CardTitle>
                <CardDescription>{t('register.documentsDesc')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-4">
                  {documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-2">
                        <FileCheck className="w-4 h-4 text-primary" />
                        <span className="text-sm truncate max-w-[200px]">{doc.name}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeDocument(index)}
                        className="text-destructive hover:text-destructive/80"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
                {documents.length < 3 && (
                  <label className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-colors">
                    <Upload className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{t('register.uploadDoc')}</span>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleDocumentUpload}
                      className="hidden"
                      multiple
                    />
                  </label>
                )}
                <p className="text-xs text-muted-foreground mt-2">
                  {t('register.docHint')} ({documents.length}/3)
                </p>
              </CardContent>
            </Card>

            {/* Submit */}
            <div className="flex flex-col items-center gap-4">
              <Button
                type="submit"
                size="lg"
                className="w-full md:w-auto px-12 bg-emerald-600 hover:bg-emerald-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? t('register.submitting') : t('register.submit')}
              </Button>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-emerald-600" />
                {t('register.verificationNote')}
              </div>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
