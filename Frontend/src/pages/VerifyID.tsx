import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, XCircle, Home, CheckCircle2, User, Calendar, MapPin, Building2 } from 'lucide-react';
import { fetchAPI } from '@/lib/api';
// Import the updated IDCard component
import { IDCard, ProfileData } from '@/components/IDCard';

const VerifyID = () => {
    const { memberId } = useParams<{ memberId: string }>();
    const [profile, setProfile] = useState<ProfileData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const verifyMember = async () => {
            try {
                // Find by Nest ID
                const data = await fetchAPI(`/users/verify/${memberId}`);
                if (!data) throw new Error("No data returned");
                setProfile(data);
            } catch (err) {
                console.error(err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        if (memberId) {
            verifyMember();
        } else {
            setLoading(false);
            setError(true);
        }
    }, [memberId]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
        );
    }

    if (error || !profile) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 animate-in fade-in">
                <Card className="w-full max-w-md border-red-200 shadow-xl">
                    <CardHeader className="text-center pb-2">
                        <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                        <CardTitle className="text-red-700">Invalid or Expired ID</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center space-y-4">
                        <p className="text-muted-foreground">
                            The Member ID you are trying to verify does not exist or has been deactivated.
                        </p>
                        {memberId && (
                            <div className="bg-red-50 p-2 rounded border border-red-100 font-mono text-sm text-red-800">
                                {memberId}
                            </div>
                        )}
                        <Link to="/">
                            <Button variant="outline" className="w-full mt-4">Return to Home</Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="max-w-4xl mx-auto p-4 md:p-8">
                {/* Header Navigation */}
                <div className="mb-8 flex items-center justify-between">
                    <Link to="/">
                        <Button variant="ghost" className="text-muted-foreground hover:text-primary gap-2">
                            <Home className="w-4 h-4" /> Back to Home
                        </Button>
                    </Link>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 gap-1.5 py-1 px-3">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Verified Official ID
                    </Badge>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* ID Card Display */}
                    <div className="flex flex-col items-center w-full">
                        <div className="w-full max-w-[400px]">
                            <IDCard profile={profile} />
                        </div>
                        <p className="mt-8 text-xs text-slate-400 text-center max-w-sm px-4">
                            Officially issued by NestUnion. Toggle to view back side.
                        </p>
                    </div>

                    {/* Detailed Profile */}
                    <div className="space-y-6 animate-in slide-in-from-right-4 duration-500 delay-100">
                        <div className="border-b border-slate-200 pb-4">
                            <h1 className="text-3xl font-bold text-slate-900">{profile.fullName}</h1>
                            <p className="text-slate-500 mt-1">Full Member Profile</p>
                        </div>

                        <div className="grid gap-4">
                            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-start gap-4">
                                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                    <User className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Member Status</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="font-semibold text-slate-900">{profile.community || 'Verified Member'}</span>
                                        <Badge className="bg-green-100 text-green-700 border-0 text-[10px] uppercase">Active</Badge>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-start gap-4">
                                <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                                    <Calendar className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Member Since</p>
                                    <p className="font-semibold text-slate-900 mt-1">
                                        {profile.createdAt
                                            ? new Date(profile.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                                            : 'N/A'
                                        }
                                    </p>
                                </div>
                            </div>

                            {(profile.city || profile.state) && (
                                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-start gap-4 md:col-span-2">
                                    <div className="p-2 bg-red-50 text-red-600 rounded-lg">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Location</p>
                                        <p className="font-semibold text-slate-900 mt-1">
                                            {[profile.city, profile.state, profile.country].filter(Boolean).join(', ')}
                                        </p>
                                    </div>
                                </div>
                            )}

                            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-start gap-4 md:col-span-2">
                                <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
                                    <Building2 className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Nest ID</p>
                                    <p className="font-mono font-bold text-slate-900 mt-1 tracking-wide">{profile.memberId}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mt-4">
                            <h3 className="font-semibold text-blue-900 mb-2">Verification Authority</h3>
                            <p className="text-sm text-blue-700/80">
                                This profile has been verified by the NestUnion platform. The identity of this individual has been confirmed according to our community standards.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerifyID;
