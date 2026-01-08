import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { Button } from '@/components/ui/button';
import { Download, Loader2, CheckCircle2, ShieldCheck, Landmark, Building2, Mail, Gift } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import QRCode from 'react-qr-code';

export interface ProfileData {
  fullName: string;
  email: string;
  phone: string;
  age?: number;
  gender?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  photo?: string;
  community?: string;
  nestId?: string;
  memberId?: string;
  createdAt?: string;
  isEmailVerified?: boolean;
}

interface IDCardProps {
  profile: ProfileData;
}

export function IDCard({ profile }: IDCardProps) {
  const frontRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const [activeSide, setActiveSide] = useState<'front' | 'back'>('front');

  // Fallback or ensure Nest ID format
  const memberId = profile.nestId || profile.memberId || `NU${Date.now().toString().slice(-8)}`;
  const referralLink = `nestunion.in/join?ref=${memberId}`;

  const handleDownload = async (side: 'front' | 'back') => {
    const ref = side === 'front' ? frontRef : backRef;
    if (!ref.current) return;

    setDownloading(true);
    try {
      const clone = ref.current.cloneNode(true) as HTMLElement;

      clone.style.position = 'fixed';
      clone.style.top = '-9999px';
      clone.style.left = '-9999px';
      clone.style.width = '375px';
      clone.style.height = '667px';
      clone.style.borderRadius = '0';
      clone.style.boxShadow = 'none';
      clone.style.transform = 'none';
      clone.style.zIndex = '9999';
      clone.style.backgroundColor = '#ffffff';

      // Capture Fixes
      const profileCard = clone.querySelector('[data-id="profile-card"]') as HTMLElement;
      const profileText = clone.querySelector('[data-id="profile-text"]') as HTMLElement;
      const profileName = clone.querySelector('[data-id="profile-name"]') as HTMLElement;

      if (profileCard) {
        profileCard.style.height = 'auto';
        profileCard.style.minHeight = '110px';
        profileCard.style.display = 'flex';
        profileCard.style.alignItems = 'center';
        profileCard.style.overflow = 'visible';
      }

      if (profileText) {
        profileText.style.display = 'block';
        profileText.style.paddingTop = '8px';
        profileText.style.overflow = 'visible';
      }

      if (profileName) {
        profileName.style.lineHeight = '1.4';
        profileName.style.marginBottom = '4px';
        profileName.style.marginTop = '0px';
        profileName.style.display = 'block';
        profileName.style.overflow = 'visible';
        profileName.style.removeProperty('-webkit-line-clamp');
      }

      document.body.appendChild(clone);

      const canvas = await html2canvas(clone, {
        scale: 3,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
        width: 375,
        height: 667,
      });

      document.body.removeChild(clone);

      const link = document.createElement('a');
      link.download = `NestUnion-ID-${side}-${profile.fullName.replace(/\s+/g, '-')}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();

      toast({
        title: "Saved!",
        description: `${side === 'front' ? 'Front' : 'Back'} side downloaded successfully.`,
      });
    } catch (error) {
      console.error("Download failed:", error);
      toast({
        title: "Download failed",
        description: "Could not export the ID card.",
        variant: "destructive",
      });
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-8 w-full max-w-[400px] mx-auto perspective-1000">

      {/* Front Side */}
      <div className={`${activeSide === 'front' ? 'block' : 'hidden'} w-full animate-in fade-in zoom-in-95 duration-300 flex justify-center`}>
        <div
          ref={frontRef}
          className="relative bg-white rounded-[24px] overflow-hidden shadow-2xl flex flex-col border border-slate-100 mx-auto"
          style={{ width: '375px', height: '667px' }}
        >
          {/* Background Gradient */}
          <div className="absolute inset-0 z-0 bg-white">
            <div className="absolute top-0 w-full h-[320px] bg-gradient-to-b from-blue-50 to-blue-100/50"></div>
            <div className="absolute top-0 w-full h-full overflow-hidden opacity-40">
              <svg viewBox="0 0 375 300" className="w-full absolute top-0" preserveAspectRatio="none">
                <path d="M0 0 H375 V220 C250 280 120 180 0 240 Z" fill="url(#headerGrad)" />
                <defs>
                  <linearGradient id="headerGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="#22c55e" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="absolute bottom-0 w-full h-32">
              <svg viewBox="0 0 1440 320" className="w-full h-full preserve-3d">
                <path fill="#0ea5e9" fillOpacity="0.8" d="M0,192L60,197.3C120,203,240,213,360,197.3C480,181,600,139,720,133.3C840,128,960,160,1080,186.7C1200,213,1320,235,1380,245.3L1440,256L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
              </svg>
            </div>
          </div>

          {/* Front Content */}
          <div className="relative z-10 flex flex-col items-center h-full px-6 pt-8 text-center w-full">
            {/* Header - Replaced with official logo image */}
            <div className="mb-6 flex flex-col items-center h-[120px] justify-center">
              <img
                src="/nestunion.jpg"
                alt="NestUnion"
                className="h-full w-auto object-contain mix-blend-multiply drop-shadow-sm"
              />
            </div>

            {/* Profile Section */}
            <div
              data-id="profile-card"
              className="w-full bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4 mb-6 relative z-10"
              style={{ minHeight: '100px' }}
            >
              {/* Photo */}
              <div
                className="w-[72px] h-[72px] rounded-lg overflow-hidden border border-slate-100 shrink-0 bg-slate-50"
                style={{ minWidth: '72px' }}
              >
                <img
                  src={profile.photo || "https://github.com/shadcn.png"}
                  alt={profile.fullName}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Text */}
              <div
                data-id="profile-text"
                className="text-left flex-1"
              >
                <h2
                  data-id="profile-name"
                  className="text-lg font-bold text-slate-900 break-words"
                  style={{ lineHeight: '1.4', marginBottom: '2px' }}
                >
                  {profile.fullName}
                </h2>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                  <span className="text-sm font-semibold text-slate-600">{profile.community || 'Member'}</span>
                </div>
              </div>
            </div>

            {/* Data Card */}
            <div className="w-full bg-slate-50/90 rounded-xl p-5 border border-slate-100 space-y-4 mb-8 shrink-0">
              <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Full Name</p>
                <p className="text-base font-bold text-slate-800">{profile.fullName}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Nest ID</p>
                <p className="text-base font-mono font-bold text-blue-700 tracking-wide">{memberId}</p>
              </div>
            </div>

            {/* QR Section */}
            <div className="flex-1 w-full flex flex-col justify-end items-center pb-12 mt-auto">
              <div className="bg-white p-4 rounded-2xl shadow-lg border border-slate-100 relative mb-4">
                <div className="absolute -top-3 -right-3 bg-green-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1 ring-4 ring-white">
                  <CheckCircle2 className="w-3 h-3" /> Active
                </div>
                <QRCode
                  value={`https://nestunion.in/verify/${memberId}`}
                  size={120}
                  viewBox={`0 0 256 256`}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  level="M"
                  fgColor="#0f172a"
                />
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-white/50 px-3 py-1 rounded-full">
                Scan to Verify
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Back Side */}
      <div className={`${activeSide === 'back' ? 'block' : 'hidden'} w-full animate-in fade-in zoom-in-95 duration-300 flex justify-center`}>
        <div
          ref={backRef}
          className="relative bg-white rounded-[24px] overflow-hidden shadow-2xl flex flex-col border border-slate-100 mx-auto"
          style={{ width: '375px', height: '667px' }}
        >
          <div className="w-full h-[180px] relative overflow-hidden shrink-0">
            <div className="absolute inset-0 bg-white">
              <svg viewBox="0 0 1440 320" className="absolute top-0 w-full h-[140%] -mt-6 opacity-30">
                <path fill="#e0f2fe" fillOpacity="1" d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
              </svg>
            </div>
            <div className="relative z-10 flex flex-col items-center justify-center pt-8 h-[140px]">
              <img
                src="/nestunion.jpg"
                alt="NestUnion"
                className="h-[100px] w-auto object-contain mix-blend-multiply"
              />
            </div>
          </div>

          <div className="bg-[#0284c7] text-white py-5 px-6 text-center transform -skew-y-2 origin-left mb-8 shadow-lg relative z-20 shrink-0">
            <div className="transform skew-y-2">
              <p className="text-xs font-bold uppercase opacity-80 mb-1 tracking-widest">Verify ID at</p>
              <p className="text-xl font-bold tracking-wide">nestunion.in/verify</p>
            </div>
          </div>

          <div className="flex-1 px-8 space-y-4">
            <div>
              <h3 className="text-center text-slate-800 font-bold mb-6 text-lg uppercase tracking-wide border-b border-slate-100 pb-2">Community Benefits</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-green-100 rounded-lg text-green-600 shadow-sm">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-slate-700 text-base">Insurance Coverage</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-orange-100 rounded-lg text-orange-600 shadow-sm">
                    <Landmark className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-slate-700 text-base">Govt Schemes</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-blue-100 rounded-lg text-blue-600 shadow-sm">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-slate-700 text-base">Banking Support</span>
                </div>
              </div>
            </div>

            {/* Refer & Earn Section */}
            <div className="mt-6 pt-3 border-t border-slate-100">
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-3 border border-orange-100 text-center shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-8 h-8 bg-orange-100 rounded-bl-full opacity-50"></div>
                <div className="relative z-10">
                  <div className="flex justify-center items-center gap-2 mb-2">
                    <Gift className="w-4 h-4 text-orange-600 animate-pulse" />
                    <p className="text-[11px] font-extrabold text-orange-700 uppercase tracking-widest">
                      Refer & Earn Rewards
                    </p>
                  </div>
                  <p className="text-[10px] text-slate-600 mb-2 font-medium leading-tight px-2">
                    Share link to get rewards on transactions
                  </p>
                  <div className="bg-white/80 rounded-lg px-2 py-1.5 border border-orange-200 inline-block w-full">
                    <p className="text-xs font-bold text-slate-800 break-all">{referralLink}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="px-6 pb-24 text-center relative z-10 mt-auto shrink-0">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Customer Care</p>
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm">
              <Mail className="w-3.5 h-3.5 text-green-600" />
              <span className="text-green-700 font-bold text-xs">support@nestunion.in</span>
            </div>
          </div>

          <div className="absolute bottom-0 w-full h-24 overflow-hidden pointer-events-none z-0">
            <svg viewBox="0 0 1440 320" className="absolute bottom-[-10px] w-full h-full transform scale-x-150">
              <path fill="#f97316" fillOpacity="0.8" d="M0,224L60,229.3C120,235,240,245,360,229.3C480,213,600,171,720,165.3C840,160,960,192,1080,218.7C1200,245,1320,267,1380,277.3L1440,288L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
            </svg>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 w-full px-1 max-w-[375px] mx-auto">
        <div className="flex bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveSide('front')}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${activeSide === 'front' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Front Side
          </button>
          <button
            onClick={() => setActiveSide('back')}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${activeSide === 'back' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Back Side
          </button>
        </div>

        <Button
          className="w-full h-11 rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200"
          onClick={() => handleDownload(activeSide)}
          disabled={downloading}
        >
          {downloading ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Download className="w-4 h-4 mr-2" />
          )}
          Download {activeSide === 'front' ? 'Front' : 'Back'} Image
        </Button>
      </div>
    </div>
  );
}
