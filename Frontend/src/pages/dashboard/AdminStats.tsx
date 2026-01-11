
import { useEffect, useState } from 'react';
import { fetchAPI } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Eye, UserPlus, FileText, LayoutDashboard } from 'lucide-react';

export default function AdminStats() {
    const [stats, setStats] = useState<any>(null);
    const [activity, setActivity] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const [refreshing, setRefreshing] = useState(false);

    const loadData = async () => {
        setRefreshing(true);
        try {
            const [statsData, activityData] = await Promise.all([
                fetchAPI('/admin/stats'),
                fetchAPI('/admin/activity')
            ]);
            setStats(statsData);
            setActivity(activityData);
        } catch (err) {
            console.error("Failed to load admin data", err);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    if (loading) {
        return (
            <div className="flex h-full items-center justify-center">
                <div className="animate-pulse text-muted-foreground">Loading admin data...</div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <LayoutDashboard className="h-6 w-6 text-primary" />
                    <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                </div>
                <button
                    onClick={loadData}
                    disabled={refreshing}
                    className="text-sm bg-primary text-primary-foreground px-3 py-2 rounded hover:bg-primary/90 disabled:opacity-50"
                >
                    {refreshing ? 'Refreshing...' : 'Refresh Data'}
                </button>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats?.totalUsers || 0}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">New Users Today</CardTitle>
                        <UserPlus className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats?.usersToday || 0}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Webpage Views</CardTitle>
                        <Eye className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats?.totalViews || 0}</div>
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-semibold">Real-time Activity Log</h2>
                <div className="rounded-md border bg-card/50 backdrop-blur-sm">
                    <div className="p-4 max-h-[500px] overflow-y-auto">
                        {activity.length === 0 ? (
                            <p className="text-muted-foreground">No recent activity recorded.</p>
                        ) : (
                            <ul className="space-y-4">
                                {activity.map((act, i) => (
                                    <li key={i} className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0 border-border/50">
                                        <div className="bg-primary/10 p-2 rounded-full mt-1">
                                            <FileText className="h-4 w-4 text-primary" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-medium text-sm">
                                                Page View: <span className="text-muted-foreground font-mono bg-muted px-1 rounded">{act.path}</span>
                                            </p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <p className="text-xs text-muted-foreground">
                                                    {new Date(act.createdAt).toLocaleString()}
                                                </p>
                                                {act.userId && (
                                                    <span className="text-xs bg-muted px-1 rounded text-muted-foreground">
                                                        User: {act.userId}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
