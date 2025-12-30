
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bell, Globe, Lock, Shield } from 'lucide-react';

const SettingsPage = () => {
    const { language, setLanguage } = useLanguage();
    const [notifications, setNotifications] = useState(true);
    const [marketing, setMarketing] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>

            <div className="grid gap-6">

                {/* General Settings */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Globe className="h-5 w-5" />
                            General
                        </CardTitle>
                        <CardDescription>Manage your display and language preferences</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label>Language</Label>
                                <p className="text-sm text-muted-foreground">Select your preferred language</p>
                            </div>
                            <Select value={language} onValueChange={(v: any) => setLanguage(v)}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select Language" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="en">English</SelectItem>
                                    <SelectItem value="hi">हिंदी (Hindi)</SelectItem>
                                    <SelectItem value="kn">ಕನ್ನಡ (Kannada)</SelectItem>
                                    <SelectItem value="ta">தமிழ் (Tamil)</SelectItem>
                                    <SelectItem value="te">తెలుగు (Telugu)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label>Dark Mode</Label>
                                <p className="text-sm text-muted-foreground">Switch between light and dark themes</p>
                            </div>
                            <Switch checked={darkMode} onCheckedChange={setDarkMode} disabled />
                        </div>
                    </CardContent>
                </Card>

                {/* Notifications */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Bell className="h-5 w-5" />
                            Notifications
                        </CardTitle>
                        <CardDescription>Configure how you receive alerts</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label>Email Alerts</Label>
                                <p className="text-sm text-muted-foreground">Receive updates about your account via email</p>
                            </div>
                            <Switch checked={notifications} onCheckedChange={setNotifications} />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label>Marketing Messages</Label>
                                <p className="text-sm text-muted-foreground">Receive offers and newsletters</p>
                            </div>
                            <Switch checked={marketing} onCheckedChange={setMarketing} />
                        </div>
                    </CardContent>
                </Card>

                {/* Security */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Shield className="h-5 w-5" />
                            Security
                        </CardTitle>
                        <CardDescription>Protect your account and data</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center gap-4">
                                <div className="bg-primary/10 p-2 rounded-full">
                                    <Lock className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <p className="font-medium">Password</p>
                                    <p className="text-sm text-muted-foreground">Last changed 3 months ago</p>
                                </div>
                            </div>
                            <Button variant="outline">Change Password</Button>
                        </div>
                    </CardContent>
                </Card>

            </div>
        </div>
    );
};

export default SettingsPage;
