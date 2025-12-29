import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle2, XCircle, ShieldCheck } from 'lucide-react';
import { fetchAPI } from '@/lib/api';

interface PublicProfile {
    fullName: string;
    photo: string;
    community: string;
    nestId: string;
    createdAt: string;
    isEmailVerified: boolean;
}

const VerifyID = () => {
    const { memberId } = useParams<{ memberId: string }>();
    const [profile, setProfile] = useState<PublicProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const verifyMember = async () => {
            try {
                // Find by Nest ID
                const data = await fetchAPI(`/users/verify/${memberId}`);
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
            <div className="min-h-screen flex items-center justify-center bg-background">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    if (error || !profile) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background p-4 animate-in fade-in">
                <Card className="w-full max-w-md border-red-200 shadow-xl">
                    <CardHeader className="text-center pb-2">
                        <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                        <CardTitle className="text-red-700">Invalid ID Card</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center space-y-4">
                        <p className="text-muted-foreground">
                            We could not verify this member ID. It may be invalid or expired.
                        </p>
                        <p className="font-mono bg-muted p-2 rounded text-sm">{memberId}</p>
                        <Link to="/">
                            <Button variant="outline" className="w-full mt-4">Go Home</Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-accent/5 p-4 animate-in zoom-in-95 duration-500">
            <Card className="w-full max-w-sm overflow-hidden shadow-2xl border-0 ring-1 ring-border/50">
                <div className="h-32 bg-primary/10 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/5 to-transparent" />
                    <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
                        <div className="relative">
                            <div className="w-32 h-32 rounded-full border-4 border-background shadow-lg overflow-hidden bg-white">
                                <img
                                    src={profile.photo || "https://github.com/shadcn.png"}
                                    alt={profile.fullName}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute bottom-1 right-1 bg-green-500 text-white p-1 rounded-full shadow-sm border-2 border-background">
                                <ShieldCheck className="w-5 h-5" />
                            </div>
                        </div>
                    </div>
                </div>

                <CardContent className="pt-20 pb-8 px-6 text-center space-y-6">
                    <div>
                        <h2 className="text-2xl font-bold text-foreground">{profile.fullName}</h2>
                        <div className="flex items-center justify-center gap-2 mt-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                                {profile.community || 'Member'}
                            </span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Verified
                            </span>
                        </div>
                    </div>

                    <div className="space-y-3 pt-4 border-t border-border">
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Nest ID</span>
                            <span className="font-mono font-medium">{profile.nestId}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Joined</span>
                            <span className="font-medium">{new Date(profile.createdAt).getFullYear()}</span>
                        </div>
                    </div>

                    <div className="pt-4">
                        <div className="flex items-center justify-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg border border-green-100">
                            <CheckCircle2 className="w-5 h-5" />
                            <span className="font-semibold text-sm">Officially Verified Member</span>
                        </div>
                    </div>

                    <Link to="/" className="block">
                        <Button variant="ghost" className="w-full text-muted-foreground hover:text-foreground">
                            Learn about NestUnion
                        </Button>
                    </Link>
                </CardContent>
            </Card>
        </div>
    );
};

export default VerifyID;
