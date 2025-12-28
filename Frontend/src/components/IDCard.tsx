import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { User, Phone, MapPin, Calendar, Shield, Download, Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import QRCode from 'react-qr-code';

interface ProfileData {
  fullName: string;
  email: string;
  phone: string;
  age: number;
  gender: string;
  address: string;
  city: string;
  state: string;
  country: string;
  photo: string;
  community?: string;
  nestId?: string;
  memberId?: string;
  createdAt?: string;
}

interface IDCardProps {
  profile: ProfileData;
}

export function IDCard({ profile }: IDCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  const memberId = profile.nestId || profile.memberId || `NU${Date.now().toString().slice(-8)}`;
  const joinDate = profile.createdAt
    ? new Date(profile.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })
    : new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });

  const handleDownload = async () => {
    if (!cardRef.current) return;

    setDownloading(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: null,
      });

      const link = document.createElement('a');
      link.download = `NestUnion-ID-${profile.fullName.replace(/\s+/g, '-')}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();

      toast({
        title: "Downloaded!",
        description: "Your ID card has been saved.",
      });
    } catch (error) {
      toast({
        title: "Download failed",
        description: "Could not export the ID card. Please try again.",
        variant: "destructive",
      });
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div ref={cardRef}>
        <Card className="w-full max-w-md overflow-hidden shadow-brand-lg border-0">
          {/* Header with gradient */}
          <div className="gradient-hero px-6 py-4 text-primary-foreground">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="w-6 h-6" />
                <span className="font-bold text-lg tracking-wide">NestUnion</span>
              </div>
              <Badge variant="secondary" className="bg-white/20 text-white border-0">
                Member ID
              </Badge>
            </div>
            <p className="text-xs text-white/70 mt-1">{profile.community || 'Worker Community'} Card</p>
          </div>

          {/* Main content */}
          <div className="p-6 bg-card">
            <div className="flex gap-5">
              {/* Photo */}
              <div className="shrink-0">
                <div className="w-28 h-32 rounded-lg overflow-hidden border-2 border-border shadow-brand-sm bg-muted">
                  {profile.photo ? (
                    <img
                      src={profile.photo}
                      alt={profile.fullName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User className="w-12 h-12 text-muted-foreground" />
                    </div>
                  )}
                </div>
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-bold text-foreground truncate">{profile.fullName}</h2>
                <Badge variant="outline" className="mb-2 border-primary/20 text-primary bg-primary/5">{profile.community || 'Member'}</Badge>
                <p className="text-sm text-muted-foreground mb-3">{profile.email}</p>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-accent shrink-0" />
                    <span className="text-foreground truncate">{profile.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-accent shrink-0" />
                    <span className="text-foreground">
                      {profile.age} years • {profile.gender.charAt(0).toUpperCase() + profile.gender.slice(1)}
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span className="text-foreground leading-snug">
                      {profile.city}, {profile.state}, {profile.country}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Address section */}
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground mb-1">Address</p>
              <p className="text-sm text-foreground">{profile.address}</p>
            </div>

            {/* Footer with ID and date */}
            <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Member ID</p>
                <p className="font-mono font-bold text-primary text-sm">{memberId}</p>
                <p className="text-xs text-muted-foreground mt-1">Issue Date</p>
                <p className="text-sm text-foreground">{joinDate}</p>
              </div>

              {/* QR Code */}
              <div className="bg-white p-1 rounded-sm border border-border/20 shadow-sm">
                <QRCode
                  value={`https://nestunion.in/verify/${memberId}`}
                  size={64}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  viewBox={`0 0 256 256`}
                  level="M"
                />
              </div>
            </div>
          </div>

          {/* Bottom accent bar */}
          <div className="h-2 gradient-accent" />
        </Card>
      </div>

      <Button
        onClick={handleDownload}
        disabled={downloading}
        className="w-full max-w-md"
      >
        {downloading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Download className="w-4 h-4 mr-2" />
            Download ID Card
          </>
        )}
      </Button>
    </div>
  );
}
