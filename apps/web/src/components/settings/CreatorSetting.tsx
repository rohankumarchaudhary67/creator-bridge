'use client';

import React, { useState } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import {
    Bell,
    User,
    Moon,
    Sun,
    Monitor,
    Lock,
    Mail,
    Smartphone,
    Check,
    AlertCircle,
    MessageCircle,
    Save,
    Youtube,
    Link,
    BarChart,
    Video,
    Calendar,
    Settings,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { IoSync } from 'react-icons/io5';

const CreatorSettingsPage = () => {
    const [themeMode, setThemeMode] = useState('system');
    const [notifications, setNotifications] = useState({
        email: true,
        browser: true,
        mobile: true,
    });
    const [linkedChannels, setLinkedChannels] = useState([
        { id: 1, name: 'Main Channel', subscribers: '315K', status: 'Active' },
        {
            id: 2,
            name: 'Second Channel',
            subscribers: '98K',
            status: 'Pending',
        },
    ]);

    const primaryColor = 'bg-blue-600 hover:bg-blue-700';
    const bgColor = 'bg-[#181D28]';
    const bgColorLight = 'bg-[#1F2430]';
    const bgColorLighter = 'bg-[#2A2F3D]';
    const textColor = 'text-white';
    const textColorMuted = 'text-gray-400';
    const borderColor = 'border-[#2A2F3D]';

    const handleThemeChange = (value: string) => {
        setThemeMode(value);
    };

    const handleNotificationChange = (type: string, checked: boolean) => {
        setNotifications((prev) => ({ ...prev, [type]: checked }));
    };

    const handleUnlinkChannel = (id: number) => {
        setLinkedChannels((prev) =>
            prev.filter((channel) => channel.id !== id)
        );
    };

    return (
        <div
            className={`container mx-auto py-6 px-4 sm:px-6 max-w-6xl ${bgColor} ${textColor}`}
        >
            <div className="flex justify-between items-center mb-6 bg-[#181D23] p-4 rounded-lg">
                <div className="flex items-center gap-3">
                    <h1 className="text-3xl font-bold">Creator Settings</h1>
                    <Badge
                        variant="outline"
                        className="text-sm font-semibold bg-[#2A2F3D] border-[#3A3F4D] text-white"
                    >
                        Bhuvan Bam
                    </Badge>
                </div>
                <div className="flex justify-end gap-4">
                    <Button className="bg-black flex items-center gap-2">
                        Unlink <IoSync />
                    </Button>
                    <Button className="bg-black flex items-center gap-2">
                        Reset <IoSync />
                    </Button>
                    <Button className="bg-black flex items-center gap-2">
                        Save Changes <Save />
                    </Button>
                </div>
            </div>

            <Card className={`${bgColorLight} ${borderColor} text-white mb-6`}>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Youtube className="h-5 w-5" />
                        YouTube Channel Management
                    </CardTitle>
                    <CardDescription className={textColorMuted}>
                        Manage your linked YouTube channels and live stream
                        settings
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label>Linked Channels</Label>
                        <div className="space-y-2">
                            {linkedChannels.map((channel) => (
                                <div
                                    key={channel.id}
                                    className="flex items-center justify-between p-3 rounded-lg bg-[#2A2F3D] border border-[#3A3F4D]"
                                >
                                    <div>
                                        <p className="font-medium">
                                            {channel.name}
                                        </p>
                                        <p className="text-sm text-gray-400">
                                            {channel.subscribers} subscribers
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Badge
                                            variant={
                                                channel.status === 'Active'
                                                    ? 'default'
                                                    : 'secondary'
                                            }
                                        >
                                            {channel.status}
                                        </Badge>
                                        <Button
                                            variant="ghost"
                                            className="text-red-500 hover:bg-red-500/10"
                                            onClick={() =>
                                                handleUnlinkChannel(channel.id)
                                            }
                                        >
                                            Unlink
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Link New Channel</Label>
                        <Button className="flex items-center gap-2">
                            <Link className="h-4 w-4" />
                            Link YouTube Channel
                        </Button>
                    </div>

                    <Separator className={`my-4 ${borderColor}`} />

                    <div className="space-y-2">
                        <Label>Live Stream Settings</Label>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base flex items-center gap-2">
                                        <Video className="h-4 w-4" />
                                        Auto-Start Live Streams
                                    </Label>
                                    <p className={`text-sm ${textColorMuted}`}>
                                        Automatically start live streams when
                                        scheduled
                                    </p>
                                </div>
                                <Switch defaultChecked />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base flex items-center gap-2">
                                        <Calendar className="h-4 w-4" />
                                        Schedule Reminders
                                    </Label>
                                    <p className={`text-sm ${textColorMuted}`}>
                                        Send reminders for scheduled live
                                        streams
                                    </p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className={`${bgColorLight} ${borderColor} text-white mb-6`}>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BarChart className="h-5 w-5" />
                        Analytics & Email Reports
                    </CardTitle>
                    <CardDescription className={textColorMuted}>
                        Configure analytics and email reporting preferences
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label>Email Reports</Label>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base flex items-center gap-2">
                                        <Mail className="h-4 w-4" />
                                        Weekly Analytics Report
                                    </Label>
                                    <p className={`text-sm ${textColorMuted}`}>
                                        Receive a weekly summary of your channel
                                        performance
                                    </p>
                                </div>
                                <Switch defaultChecked />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base flex items-center gap-2">
                                        <Mail className="h-4 w-4" />
                                        Monthly Analytics Report
                                    </Label>
                                    <p className={`text-sm ${textColorMuted}`}>
                                        Receive a monthly summary of your
                                        channel performance
                                    </p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                        </div>
                    </div>

                    <Separator className={`my-4 ${borderColor}`} />

                    <div className="space-y-2">
                        <Label>Advanced Analytics</Label>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base flex items-center gap-2">
                                        <BarChart className="h-4 w-4" />
                                        Enable Advanced Analytics
                                    </Label>
                                    <p className={`text-sm ${textColorMuted}`}>
                                        Access detailed analytics for your
                                        channel
                                    </p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className={`${bgColorLight} ${borderColor} text-white mb-6`}>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Bell className="h-5 w-5" />
                        Notification Preferences
                    </CardTitle>
                    <CardDescription className={textColorMuted}>
                        Control how and when you receive notifications
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label className="text-base flex items-center gap-2">
                                <Mail className="h-4 w-4" />
                                Email Notifications
                            </Label>
                            <p className={`text-sm ${textColorMuted}`}>
                                Receive notifications via email
                            </p>
                        </div>
                        <Switch
                            checked={notifications.email}
                            onCheckedChange={(checked) =>
                                handleNotificationChange('email', checked)
                            }
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label className="text-base flex items-center gap-2">
                                <Bell className="h-4 w-4" />
                                Browser Notifications
                            </Label>
                            <p className={`text-sm ${textColorMuted}`}>
                                Receive notifications in your browser
                            </p>
                        </div>
                        <Switch
                            checked={notifications.browser}
                            onCheckedChange={(checked) =>
                                handleNotificationChange('browser', checked)
                            }
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label className="text-base flex items-center gap-2">
                                <Smartphone className="h-4 w-4" />
                                Mobile Notifications
                            </Label>
                            <p className={`text-sm ${textColorMuted}`}>
                                Receive notifications on your mobile device
                            </p>
                        </div>
                        <Switch
                            checked={notifications.mobile}
                            onCheckedChange={(checked) =>
                                handleNotificationChange('mobile', checked)
                            }
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default CreatorSettingsPage;
