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
    Clock,
    Lock,
    Mail,
    Smartphone,
    Check,
    AlertCircle,
    MessageCircle,
    Video,
    Calendar,
    Settings,
    File,
    Download,
    History,
    Save,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const EditorSettingsPage = () => {
    const [notifications, setNotifications] = useState({
        email: true,
        browser: true,
        mobile: true,
    });
    const [workflowSettings, setWorkflowSettings] = useState({
        autoDownload: true,
        versionHistory: true,
        deadlineReminders: true,
    });

    const primaryColor = 'bg-blue-600 hover:bg-blue-700';
    const bgColor = 'bg-[#181D28]';
    const bgColorLight = 'bg-[#1F2430]';
    const bgColorLighter = 'bg-[#2A2F3D]';
    const textColor = 'text-white';
    const textColorMuted = 'text-gray-400';
    const borderColor = 'border-[#2A2F3D]';

    const handleNotificationChange = (type: string, checked: boolean) => {
        setNotifications((prev) => ({ ...prev, [type]: checked }));
    };

    const handleWorkflowChange = (type: string, checked: boolean) => {
        setWorkflowSettings((prev) => ({ ...prev, [type]: checked }));
    };

    return (
        <div
            className={`container mx-auto py-6 px-4 sm:px-6 max-w-6xl ${bgColor} ${textColor}`}
        >
            <div className="flex justify-between items-center mb-6 bg-[#181D23] p-4 rounded-lg">
                <div className="flex items-center gap-3">
                    <h1 className="text-3xl font-bold">Editor Settings</h1>
                    <Badge
                        variant="outline"
                        className="text-sm font-semibold bg-[#2A2F3D] border-[#3A3F4D] text-white"
                    >
                        Editor
                    </Badge>
                </div>
                <div className="flex justify-end gap-4">
                    <Button className="bg-black flex items-center gap-2">
                        Reset <Settings className="h-4 w-4" />
                    </Button>
                    <Button className="bg-black flex items-center gap-2">
                        Save Changes <Save />
                    </Button>
                </div>
            </div>

            <Card className={`${bgColorLight} ${borderColor} text-white mb-6`}>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Clock className="h-5 w-5" />
                        Workflow Settings
                    </CardTitle>
                    <CardDescription className={textColorMuted}>
                        Customize your editing workflow preferences
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label>Default Project View</Label>
                        <Select defaultValue="timeline">
                            <SelectTrigger
                                className={`${bgColorLighter} ${borderColor} ${textColor}`}
                            >
                                <SelectValue placeholder="Select default view" />
                            </SelectTrigger>
                            <SelectContent
                                className={`${bgColorLighter} ${textColor}`}
                            >
                                <SelectItem value="timeline">
                                    Timeline
                                </SelectItem>
                                <SelectItem value="board">Board</SelectItem>
                                <SelectItem value="list">List</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Preferred File Format</Label>
                        <Select defaultValue="mp4">
                            <SelectTrigger
                                className={`${bgColorLighter} ${borderColor} ${textColor}`}
                            >
                                <SelectValue placeholder="Select file format" />
                            </SelectTrigger>
                            <SelectContent
                                className={`${bgColorLighter} ${textColor}`}
                            >
                                <SelectItem value="mp4">MP4</SelectItem>
                                <SelectItem value="mov">MOV</SelectItem>
                                <SelectItem value="prproj">
                                    Premiere Project
                                </SelectItem>
                                <SelectItem value="fcpxml">
                                    Final Cut Pro XML
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label className="text-base flex items-center gap-2">
                                <Download className="h-4 w-4" />
                                Auto-Download Assets
                            </Label>
                            <p className={`text-sm ${textColorMuted}`}>
                                Automatically download project assets when
                                available
                            </p>
                        </div>
                        <Switch
                            checked={workflowSettings.autoDownload}
                            onCheckedChange={(checked) =>
                                handleWorkflowChange('autoDownload', checked)
                            }
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label className="text-base flex items-center gap-2">
                                <History className="h-4 w-4" />
                                Version History
                            </Label>
                            <p className={`text-sm ${textColorMuted}`}>
                                Keep track of all project revisions
                            </p>
                        </div>
                        <Switch
                            checked={workflowSettings.versionHistory}
                            onCheckedChange={(checked) =>
                                handleWorkflowChange('versionHistory', checked)
                            }
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label className="text-base flex items-center gap-2">
                                <AlertCircle className="h-4 w-4" />
                                Deadline Reminders
                            </Label>
                            <p className={`text-sm ${textColorMuted}`}>
                                Send automatic reminders for upcoming deadlines
                            </p>
                        </div>
                        <Switch
                            checked={workflowSettings.deadlineReminders}
                            onCheckedChange={(checked) =>
                                handleWorkflowChange(
                                    'deadlineReminders',
                                    checked
                                )
                            }
                        />
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

                    <Separator className={`my-4 ${borderColor}`} />

                    <h3 className="font-medium">Notification Types</h3>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <Label
                                htmlFor="new-project"
                                className="flex items-center gap-2"
                            >
                                <File className="h-4 w-4" />
                                New Project Assigned
                            </Label>
                            <Switch id="new-project" defaultChecked />
                        </div>

                        <div className="flex items-center justify-between">
                            <Label
                                htmlFor="feedback"
                                className="flex items-center gap-2"
                            >
                                <MessageCircle className="h-4 w-4" />
                                Feedback Received
                            </Label>
                            <Switch id="feedback" defaultChecked />
                        </div>

                        <div className="flex items-center justify-between">
                            <Label
                                htmlFor="deadline"
                                className="flex items-center gap-2"
                            >
                                <AlertCircle className="h-4 w-4" />
                                Deadline Reminders
                            </Label>
                            <Switch id="deadline" defaultChecked />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className={`${bgColorLight} ${borderColor} text-white mb-6`}>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Lock className="h-5 w-5" />
                        Access Permissions
                    </CardTitle>
                    <CardDescription className={textColorMuted}>
                        Manage your access to creator content
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label>Access Level</Label>
                        <Select defaultValue="edit">
                            <SelectTrigger
                                className={`${bgColorLighter} ${borderColor} ${textColor}`}
                            >
                                <SelectValue placeholder="Select access level" />
                            </SelectTrigger>
                            <SelectContent
                                className={`${bgColorLighter} ${textColor}`}
                            >
                                <SelectItem value="view">View Only</SelectItem>
                                <SelectItem value="edit">Edit</SelectItem>
                                <SelectItem value="full">
                                    Full Access
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Linked Creators</Label>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between p-3 rounded-lg bg-[#2A2F3D] border border-[#3A3F4D]">
                                <div>
                                    <p className="font-medium">
                                        Creator Channel
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        315K subscribers
                                    </p>
                                </div>
                                <Badge variant="default">Active</Badge>
                            </div>
                            <div className="flex items-center justify-between p-3 rounded-lg bg-[#2A2F3D] border border-[#3A3F4D]">
                                <div>
                                    <p className="font-medium">
                                        Second Channel
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        98K subscribers
                                    </p>
                                </div>
                                <Badge variant="secondary">Pending</Badge>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default EditorSettingsPage;
