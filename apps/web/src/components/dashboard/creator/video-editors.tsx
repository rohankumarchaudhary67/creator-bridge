'use client';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TiUserAdd } from 'react-icons/ti';
import Image from 'next/image';
import { useState } from 'react';

export default function VideoEditorsComponent() {
    const [editors, setEditors] = useState<any[]>(['all']);

    return (
        <>
            <div className="w-full h-full">
                <div className="flex justify-between items-center pb-4">
                    <h1 className="font-sans font-semibold text-xl">
                        Your Video Editors
                    </h1>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="font-sane font-semibold">
                                Editor
                                <TiUserAdd />
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-muted">
                            <DialogHeader>
                                <DialogTitle>Add Your Video Editor</DialogTitle>
                                <DialogDescription>
                                    Caution: Send the request to trusted video
                                    editor only. Enter the correct email address
                                    and check two time to send request.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="flex flex-col space-y-4 pt-4">
                                <div className="flex flex-col space-y-2">
                                    <Label
                                        htmlFor="email"
                                        className="font-sans font-semibold"
                                    >
                                        Email
                                    </Label>
                                    <Input
                                        placeholder="video-editor@creator.xyz"
                                        type="email"
                                        id="email"
                                        className="w-full outline"
                                    />
                                </div>
                                <div className="w-full flex justify-end items-center">
                                    <Button className="font-sans font-semibold">
                                        Send Request <TiUserAdd />
                                    </Button>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
                {editors.length > 0 && (
                    <div>
                        <div className="flex flex-col space-y-4">
                            <div className="flex flex-col px-6 py-4 bg-muted rounded-lg">
                                <div className="flex justify-between items-center space-x-4">
                                    <div className="flex space-x-4">
                                        <Image
                                            src="/test.png"
                                            alt="thumbnail"
                                            className="rounded-full"
                                            height={50}
                                            width={50}
                                        />
                                        <div>
                                            <h1 className="font-sans font-semibold">
                                                Rohan Chaudhary
                                            </h1>
                                            <p className="font-sans text-muted-foreground text-sm">
                                                rohan@creator.xyz
                                            </p>
                                        </div>
                                    </div>
                                    <Button
                                        variant={'ghost'}
                                        className="text-red-600"
                                    >
                                        Remove
                                    </Button>
                                </div>
                            </div>
                            <div className="flex flex-col px-6 py-4 bg-muted rounded-lg">
                                <div className="flex justify-between items-center space-x-4">
                                    <div className="flex space-x-4">
                                        <Image
                                            src="/test.png"
                                            alt="thumbnail"
                                            className="rounded-full"
                                            height={50}
                                            width={50}
                                        />
                                        <div>
                                            <h1 className="font-sans font-semibold">
                                                Rohan Chaudhary
                                            </h1>
                                            <p className="font-sans text-muted-foreground text-sm">
                                                rohan@creator.xyz
                                            </p>
                                        </div>
                                    </div>
                                    <Button
                                        variant={'ghost'}
                                        className="text-red-600"
                                    >
                                        Remove
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h1 className="py-4 font-sans font-semibold">
                                Requested Editors
                            </h1>
                            <div className="flex flex-col space-y-4">
                                <div className="flex flex-col px-6 py-4 bg-muted rounded-lg">
                                    <div className="flex justify-between items-center space-x-4">
                                        <p className="font-sans">
                                            rohan@creator.xyz
                                        </p>
                                        <Button
                                            variant={'ghost'}
                                            className="text-yellow-600"
                                        >
                                            Requested
                                        </Button>
                                    </div>
                                </div>
                                <div className="flex flex-col px-6 py-4 bg-muted rounded-lg">
                                    <div className="flex justify-between items-center space-x-4">
                                        <p className="font-sans">
                                            rohan@creator.xyz
                                        </p>
                                        <Button
                                            variant={'ghost'}
                                            className="text-yellow-600"
                                        >
                                            Requested
                                        </Button>
                                    </div>
                                </div>
                                <div className="flex flex-col px-6 py-4 bg-muted rounded-lg">
                                    <div className="flex justify-between items-center space-x-4">
                                        <p className="font-sans">
                                            rohan@creator.xyz
                                        </p>
                                        <Button
                                            variant={'ghost'}
                                            className="text-yellow-600"
                                        >
                                            Requested
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
