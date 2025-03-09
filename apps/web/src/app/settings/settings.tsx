'use client';

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '../../components/ui/tabs';
import { Switch } from '../../components/ui/switch';
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
    Youtube,
    Settings,
    Moon,
    Sun,
    Monitor,
    Lock,
    Clock,
    FileEdit,
    UserCog,
} from 'lucide-react';

type SettingsPageProps = {
    accessToken: string;
};

const SettingsPage: React.FC<SettingsPageProps> = ({ accessToken }) => {
    const [themeMode, setThemeMode] = useState('system');
    const dispatch = useDispatch<AppDispatch>();
    const userData = useSelector((state: RootState) => state.user.data);

    const primaryColor = 'bg-blue-600 hover:bg-blue-700';
    const accentColor = 'text-blue-600';
    const highlightBg = 'bg-blue-50 dark:bg-blue-900/30';
    const highlightBorder = 'border-blue-500';

    //uncomment if context is updated
    // const isLoading = !userData || userData.role === 'NoRole';
    // const isCreator = userData?.role === 'Creator';
    // const isEditor = userData?.role === 'Editor';

    // Temporary values for testing until the backend is integrated
    const isLoading = false;
    const isCreator = false;
    const isEditor = true;

    const getDefaultTab = () => {
        if (isCreator) return 'account';
        if (isEditor) return 'account';
        return 'account';
    };

    if (isLoading) {
        return (
            <div className="container mx-auto py-24 flex justify-center items-center">
                <div className="text-center">
                    <h2 className="text-2xl font-semibold mb-2">
                        Loading settings...
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400">
                        Please wait while we fetch your preferences
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-6 px-4 sm:px-6 max-w-6xl">
            <h1 className="text-3xl font-bold mb-6">Settings</h1>

            <Tabs defaultValue={getDefaultTab()} className="w-full">
                <TabsList className="grid grid-cols-3 sm:grid-cols-5 mb-6">
                    <TabsTrigger
                        value="account"
                        className="flex items-center gap-2"
                    >
                        <User className="h-4 w-4" />
                        <span className="hidden sm:inline">Account</span>
                    </TabsTrigger>

                    {isCreator && (
                        <TabsTrigger
                            value="youtube"
                            className="flex items-center gap-2"
                        >
                            <Youtube className="h-4 w-4" />
                            <span className="hidden sm:inline">YouTube</span>
                        </TabsTrigger>
                    )}

                    <TabsTrigger
                        value="workflow"
                        className="flex items-center gap-2"
                    >
                        <Clock className="h-4 w-4" />
                        <span className="hidden sm:inline">Workflow</span>
                    </TabsTrigger>

                    <TabsTrigger
                        value="notifications"
                        className="flex items-center gap-2"
                    >
                        <Bell className="h-4 w-4" />
                        <span className="hidden sm:inline">Notifications</span>
                    </TabsTrigger>

                    <TabsTrigger
                        value="appearance"
                        className="flex items-center gap-2"
                    >
                        <Settings className="h-4 w-4" />
                        <span className="hidden sm:inline">Appearance</span>
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="account" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Account Information</CardTitle>
                            <CardDescription>
                                Manage your personal account details and
                                preferences
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 py-2 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input
                                        id="name"
                                        placeholder="Your name"
                                        defaultValue={userData?.name || ''}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="your@email.com"
                                        defaultValue={userData?.email || ''}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="role">Account Type</Label>
                                <div className="p-3 rounded-md bg-gray-100 dark:bg-gray-800">
                                    <div className="flex items-center gap-2">
                                        {isCreator ? (
                                            <>
                                                <UserCog className="h-5 w-5 text-blue-600" />
                                                <span className="font-medium">
                                                    Creator
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                <FileEdit className="h-5 w-5 text-blue-600" />
                                                <span className="font-medium">
                                                    Editor
                                                </span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <Separator className="my-4" />

                            <div className="space-y-4">
                                <h3 className="font-medium">Security</h3>
                                <div className="space-y-2">
                                    <Label htmlFor="current-password">
                                        Current Password
                                    </Label>
                                    <Input
                                        id="current-password"
                                        type="password"
                                    />
                                </div>
                                <div className="grid gap-4 py-2 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="new-password">
                                            New Password
                                        </Label>
                                        <Input
                                            id="new-password"
                                            type="password"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="confirm-password">
                                            Confirm Password
                                        </Label>
                                        <Input
                                            id="confirm-password"
                                            type="password"
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <Button className={primaryColor}>
                                        Change Password
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Privacy Settings</CardTitle>
                            <CardDescription>
                                Control your privacy preferences
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base">
                                        Two-Factor Authentication
                                    </Label>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Add an extra layer of security to your
                                        account
                                    </p>
                                </div>
                                <Switch />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base">
                                        Public Profile
                                    </Label>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Allow others to find you on
                                        CreatorBridge
                                    </p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {isCreator && (
                    <TabsContent value="youtube" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>YouTube Integration</CardTitle>
                                <CardDescription>
                                    Manage your YouTube channel connection and
                                    permissions
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex flex-col space-y-4">
                                    <div
                                        className={`flex items-center p-4 ${highlightBg} rounded-lg border ${highlightBorder}`}
                                    >
                                        <Youtube className="h-6 w-6 text-red-600 dark:text-red-400 mr-4" />
                                        <div>
                                            <h3 className="font-medium">
                                                Channel Connected
                                            </h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                                {'Creator Channel'} ({'315K'}{' '}
                                                subscribers)
                                            </p>
                                        </div>
                                        <Button
                                            variant="outline"
                                            className="ml-auto"
                                        >
                                            Disconnect
                                        </Button>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Access Permissions</Label>
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-2">
                                                    <Lock className="h-4 w-4" />
                                                    <span>
                                                        Allow editors to view
                                                        private videos
                                                    </span>
                                                </div>
                                                <Switch defaultChecked />
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-2">
                                                    <Lock className="h-4 w-4" />
                                                    <span>
                                                        Allow editors to
                                                        download video files
                                                    </span>
                                                </div>
                                                <Switch defaultChecked />
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-2">
                                                    <Lock className="h-4 w-4" />
                                                    <span>
                                                        Allow editors to access
                                                        YouTube analytics
                                                    </span>
                                                </div>
                                                <Switch />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Upload Preferences</CardTitle>
                                <CardDescription>
                                    Set default settings for video uploads
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="default-privacy">
                                        Default Privacy Setting
                                    </Label>
                                    <Select defaultValue="private">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select privacy setting" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="private">
                                                Private
                                            </SelectItem>
                                            <SelectItem value="unlisted">
                                                Unlisted
                                            </SelectItem>
                                            <SelectItem value="public">
                                                Public
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label className="text-base">
                                            Require Approval Before Publishing
                                        </Label>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            All editor changes require your
                                            approval before going live
                                        </p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                )}

                <TabsContent value="workflow" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Workflow Settings</CardTitle>
                            <CardDescription>
                                {isCreator
                                    ? 'Customize your collaboration process with editors'
                                    : 'Customize your collaboration process with creators'}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {isCreator ? (
                                <>
                                    <div className="space-y-2">
                                        <Label htmlFor="approval-process">
                                            Approval Process
                                        </Label>
                                        <Select defaultValue="manual">
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select approval process" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="manual">
                                                    Manual approval for all
                                                    changes
                                                </SelectItem>
                                                <SelectItem value="trusted">
                                                    Auto-approve from trusted
                                                    editors
                                                </SelectItem>
                                                <SelectItem value="auto">
                                                    Auto-approve all changes
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="feedback-template">
                                            Default Feedback Template
                                        </Label>
                                        <Select defaultValue="standard">
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select feedback template" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="standard">
                                                    Standard feedback form
                                                </SelectItem>
                                                <SelectItem value="detailed">
                                                    Detailed feedback form
                                                </SelectItem>
                                                <SelectItem value="minimal">
                                                    Minimal feedback
                                                </SelectItem>
                                                <SelectItem value="custom">
                                                    Custom template
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="space-y-2">
                                        <Label htmlFor="default-delivery">
                                            Default Delivery Timeline
                                        </Label>
                                        <Select defaultValue="3days">
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select default timeline" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="24hours">
                                                    24 Hours
                                                </SelectItem>
                                                <SelectItem value="48hours">
                                                    48 Hours
                                                </SelectItem>
                                                <SelectItem value="3days">
                                                    3 Days
                                                </SelectItem>
                                                <SelectItem value="5days">
                                                    5 Days
                                                </SelectItem>
                                                <SelectItem value="custom">
                                                    Custom
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="edit-tools">
                                            Preferred Editing Software
                                        </Label>
                                        <Select defaultValue="premiere">
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select preferred software" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="premiere">
                                                    Adobe Premiere Pro
                                                </SelectItem>
                                                <SelectItem value="finalcut">
                                                    Final Cut Pro
                                                </SelectItem>
                                                <SelectItem value="davinci">
                                                    DaVinci Resolve
                                                </SelectItem>
                                                <SelectItem value="other">
                                                    Other
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </>
                            )}

                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base">
                                        Automatic File Transfers
                                    </Label>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {isCreator
                                            ? 'Automatically transfer new YouTube uploads to editors'
                                            : 'Automatically receive new uploads from creators'}
                                    </p>
                                </div>
                                <Switch defaultChecked />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base">
                                        Project Deadline Reminders
                                    </Label>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Send automatic reminders for upcoming
                                        deadlines
                                    </p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                        </CardContent>
                    </Card>

                    {isCreator ? (
                        <Card>
                            <CardHeader>
                                <CardTitle>Editor Access</CardTitle>
                                <CardDescription>
                                    Manage who has access to your content
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="rounded-md border">
                                    <div className="p-4 flex items-center justify-between">
                                        <div>
                                            <p className="font-medium">
                                                Editor Name
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                editor@example.com
                                            </p>
                                        </div>
                                        <Select defaultValue="full">
                                            <SelectTrigger className="w-32">
                                                <SelectValue placeholder="Access level" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="view">
                                                    View Only
                                                </SelectItem>
                                                <SelectItem value="edit">
                                                    Edit
                                                </SelectItem>
                                                <SelectItem value="full">
                                                    Full Access
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <Separator />
                                    <div className="p-4 flex items-center justify-between">
                                        <div>
                                            <p className="font-medium">
                                                Second Editor
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                editor2@example.com
                                            </p>
                                        </div>
                                        <Select defaultValue="edit">
                                            <SelectTrigger className="w-32">
                                                <SelectValue placeholder="Access level" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="view">
                                                    View Only
                                                </SelectItem>
                                                <SelectItem value="edit">
                                                    Edit
                                                </SelectItem>
                                                <SelectItem value="full">
                                                    Full Access
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <Button variant="outline" className="w-full">
                                    Add New Editor
                                </Button>
                            </CardContent>
                        </Card>
                    ) : (
                        <Card>
                            <CardHeader>
                                <CardTitle>Creator Collaborations</CardTitle>
                                <CardDescription>
                                    Manage your active collaborations with
                                    creators
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="rounded-md border">
                                    <div className="p-4 flex items-center justify-between">
                                        <div>
                                            <p className="font-medium">
                                                Creator Channel
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                315K subscribers
                                            </p>
                                        </div>
                                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                                            Active
                                        </span>
                                    </div>
                                    <Separator />
                                    <div className="p-4 flex items-center justify-between">
                                        <div>
                                            <p className="font-medium">
                                                Creator Channel 2
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                98K subscribers
                                            </p>
                                        </div>
                                        <span className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300">
                                            Pending
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </TabsContent>

                <TabsContent value="notifications" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Notification Preferences</CardTitle>
                            <CardDescription>
                                Control how and when you receive notifications
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base">
                                        Email Notifications
                                    </Label>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Receive notifications via email
                                    </p>
                                </div>
                                <Switch defaultChecked />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base">
                                        Browser Notifications
                                    </Label>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Receive notifications in your browser
                                    </p>
                                </div>
                                <Switch defaultChecked />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base">
                                        Mobile Notifications
                                    </Label>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Receive notifications on your mobile
                                        device
                                    </p>
                                </div>
                                <Switch defaultChecked />
                            </div>

                            <Separator className="my-4" />

                            <h3 className="font-medium">Notification Types</h3>
                            <div className="space-y-3">
                                {isCreator ? (
                                    <>
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="new-edit-notification">
                                                New edits submitted
                                            </Label>
                                            <Switch
                                                id="new-edit-notification"
                                                defaultChecked
                                            />
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="feedback-notification">
                                                Feedback requests
                                            </Label>
                                            <Switch
                                                id="feedback-notification"
                                                defaultChecked
                                            />
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="upload-notification">
                                                Video upload complete
                                            </Label>
                                            <Switch
                                                id="upload-notification"
                                                defaultChecked
                                            />
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="publish-notification">
                                                Video published to YouTube
                                            </Label>
                                            <Switch
                                                id="publish-notification"
                                                defaultChecked
                                            />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="new-project-notification">
                                                New project assigned
                                            </Label>
                                            <Switch
                                                id="new-project-notification"
                                                defaultChecked
                                            />
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="feedback-received-notification">
                                                Feedback received
                                            </Label>
                                            <Switch
                                                id="feedback-received-notification"
                                                defaultChecked
                                            />
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="project-approved-notification">
                                                Project approved
                                            </Label>
                                            <Switch
                                                id="project-approved-notification"
                                                defaultChecked
                                            />
                                        </div>
                                    </>
                                )}

                                <div className="flex items-center justify-between">
                                    <Label htmlFor="deadline-notification">
                                        Approaching deadlines
                                    </Label>
                                    <Switch
                                        id="deadline-notification"
                                        defaultChecked
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <Label htmlFor="comment-notification">
                                        Comments on projects
                                    </Label>
                                    <Switch
                                        id="comment-notification"
                                        defaultChecked
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="appearance" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Appearance Settings</CardTitle>
                            <CardDescription>
                                Customize how CreatorBridge looks for you
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <Label>Theme Mode</Label>
                                <div className="grid grid-cols-3 gap-4">
                                    <div
                                        className={`flex flex-col items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 ${themeMode === 'light' ? highlightBorder + ' ' + highlightBg : ''}`}
                                        onClick={() => setThemeMode('light')}
                                    >
                                        <Sun
                                            className={`h-8 w-8 mb-2 ${themeMode === 'light' ? accentColor : ''}`}
                                        />
                                        <span>Light</span>
                                    </div>

                                    <div
                                        className={`flex flex-col items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 ${themeMode === 'dark' ? highlightBorder + ' ' + highlightBg : ''}`}
                                        onClick={() => setThemeMode('dark')}
                                    >
                                        <Moon
                                            className={`h-8 w-8 mb-2 ${themeMode === 'dark' ? accentColor : ''}`}
                                        />
                                        <span>Dark</span>
                                    </div>

                                    <div
                                        className={`flex flex-col items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 ${themeMode === 'system' ? highlightBorder + ' ' + highlightBg : ''}`}
                                        onClick={() => setThemeMode('system')}
                                    >
                                        <Monitor
                                            className={`h-8 w-8 mb-2 ${themeMode === 'system' ? accentColor : ''}`}
                                        />
                                        <span>System</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="density">
                                    Interface Density
                                </Label>
                                <Select defaultValue="comfortable">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select interface density" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="compact">
                                            Compact
                                        </SelectItem>
                                        <SelectItem value="comfortable">
                                            Comfortable
                                        </SelectItem>
                                        <SelectItem value="spacious">
                                            Spacious
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="language">Language</Label>
                                <Select defaultValue="en">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select language" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="en">
                                            English
                                        </SelectItem>
                                        <SelectItem value="es">
                                            Español
                                        </SelectItem>
                                        <SelectItem value="fr">
                                            Français
                                        </SelectItem>
                                        <SelectItem value="de">
                                            Deutsch
                                        </SelectItem>
                                        <SelectItem value="ja">
                                            日本語
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="timezone">Time Zone</Label>
                                <Select defaultValue="utc">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select time zone" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="utc">UTC</SelectItem>
                                        <SelectItem value="et">
                                            Eastern Time (ET)
                                        </SelectItem>
                                        <SelectItem value="pt">
                                            Pacific Time (PT)
                                        </SelectItem>
                                        <SelectItem value="gmt">
                                            Greenwich Mean Time (GMT)
                                        </SelectItem>
                                        <SelectItem value="ist">
                                            India Standard Time (IST)
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex justify-end gap-2">
                        <Button variant="outline">Reset to Defaults</Button>
                        <Button className={primaryColor}>Save Settings</Button>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default SettingsPage;
