
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useUserProfile } from '@/hooks/useUserProfile';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Camera, CheckCircle2, ShieldAlert } from 'lucide-react';
import { fetchAPI } from '@/lib/api';

const ProfilePage = () => {
    const { user } = useAuth();
    const { profile, loading, refetchProfile } = useUserProfile();
    const { toast } = useToast();
    const [isEditing, setIsEditing] = useState(false);
    const [saving, setSaving] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        fullName: profile?.fullName || user?.displayName || '',
        phone: profile?.phone || user?.phoneNumber || '',
        address: profile?.address || '',
        city: profile?.city || '',
        state: profile?.state || '',
        zip: profile?.zip || ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await fetchAPI('/users/profile', {
                method: 'PATCH',
                body: JSON.stringify(formData)
            });
            await refetchProfile();
            setIsEditing(false);
            toast({
                title: "Profile Updated",
                description: "Your profile information has been saved.",
            });
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "Failed to update profile.",
                variant: "destructive"
            });
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-8 text-center">Loading profile...</div>;

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Profile</h1>

            <div className="grid gap-6 md:grid-cols-2">
                {/* ID Card / Avatar Section */}
                <Card className="h-fit">
                    <CardHeader>
                        <CardTitle>Your Identity</CardTitle>
                        <CardDescription>Manage your public profile and avatar</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center gap-4">
                        <div className="relative">
                            <Avatar className="h-32 w-32 border-4 border-background shadow-xl">
                                <AvatarImage src={profile?.photo || user?.photoURL} />
                                <AvatarFallback className="text-4xl bg-primary/10 text-primary">
                                    {profile?.fullName?.charAt(0) || user?.email?.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                            <Button size="icon" variant="secondary" className="absolute bottom-0 right-0 rounded-full shadow-lg">
                                <Camera className="h-4 w-4" />
                            </Button>
                        </div>

                        <div className="text-center space-y-1">
                            <h3 className="text-2xl font-bold">{profile?.fullName || user?.displayName || "User"}</h3>
                            <p className="text-sm text-muted-foreground">{user?.email}</p>
                            <div className="flex items-center justify-center gap-2 mt-2">
                                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
                                    {profile?.role || "Member"}
                                </span>
                                {profile?.isDocumentVerified ? (
                                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                                        <CheckCircle2 className="h-3 w-3" /> Verified
                                    </span>
                                ) : (
                                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                                        <ShieldAlert className="h-3 w-3" /> Unverified
                                    </span>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Details Form */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <div className="space-y-1">
                            <CardTitle>Personal Details</CardTitle>
                            <CardDescription>Update your personal information</CardDescription>
                        </div>
                        {!isEditing && (
                            <Button variant="outline" onClick={() => setIsEditing(true)}>Edit Profile</Button>
                        )}
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="fullName">Full Name</Label>
                                    <Input
                                        id="fullName"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="address">Address</Label>
                                <Input
                                    id="address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    placeholder="House No, Street Area"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="city">City</Label>
                                    <Input
                                        id="city"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="state">State</Label>
                                    <Input
                                        id="state"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                    />
                                </div>
                            </div>

                            {isEditing && (
                                <div className="flex justify-end gap-3 pt-4">
                                    <Button variant="ghost" onClick={() => setIsEditing(false)}>Cancel</Button>
                                    <Button onClick={handleSave} disabled={saving}>
                                        {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        Save Changes
                                    </Button>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default ProfilePage;
