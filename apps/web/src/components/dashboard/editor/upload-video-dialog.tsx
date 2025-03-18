import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FaUpload } from 'react-icons/fa6';
import { useState, useCallback, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import axios from 'axios';
import { categoryOptions } from '@/func/video-category';
import { toast } from 'sonner';

const sanitizeTitle = (title: string) => {
    if (/[|@]/.test(title)) {
        toast.error(
            'Title cannot contain "|" or "@" characters due to YouTube API restrictions.'
        );
        return null;
    }
    return title
        .replace(/[|@]/g, '')
        .replace(/\s+/g, ' ')
        .trim()
        .substring(0, 100);
};

const sanitizeDescription = (description: string) => {
    if (/[<>]/.test(description)) {
        toast.error("Description cannot contain '<' or '>' characters.");
        return null;
    }
    return description
        .replace(/[<>]/g, '')
        .replace(/\s+/g, ' ')
        .trim()
        .substring(0, 5000);
};

interface EnvironmentProps {
    youtubeChannel?: { channelTitle: string }[];
}

export default function UploadVideoDialog({
    environment,
    accessToken,
}: {
    environment: EnvironmentProps;
    accessToken: string;
}) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [videoTitle, setVideoTitle] = useState('');
    const [videoDescription, setVideoDescription] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    const [category, setCategory] = useState('');
    const [visibility, setVisibility] = useState('public');
    const [isLoading, setIsLoading] = useState(false);

    const videoInputRef = useRef<HTMLInputElement>(null);
    const thumbnailInputRef = useRef<HTMLInputElement>(null);

    const handleTitleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) =>
            setVideoTitle(e.target.value),
        []
    );

    const handleDescriptionChange = useCallback(
        (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            const sanitized = sanitizeDescription(e.target.value);
            if (sanitized !== null) setVideoDescription(sanitized);
        },
        []
    );

    const handleTagsChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setTags(
                e.target.value
                    .split(',')
                    .map((tag) => tag.trim())
                    .filter((tag) => tag.length > 0)
            );
        },
        []
    );

    const handleCategoryChange = useCallback(
        (value: string) => setCategory(value),
        []
    );
    const handleVisibilityChange = useCallback(
        (value: string) => setVisibility(value),
        []
    );

    const handleUploadVideo = async () => {
        if (
            !videoInputRef.current?.files?.[0] ||
            !thumbnailInputRef.current?.files?.[0] ||
            !videoTitle ||
            !videoDescription ||
            !category
        ) {
            alert('Please fill in all required fields.');
            return;
        }

        const sanitizedTitle = sanitizeTitle(videoTitle);
        if (!sanitizedTitle) return;

        setIsLoading(true);
        const toastId = toast.loading('Uploading Video...');
        const formData = new FormData();
        formData.append('video', videoInputRef.current.files[0]);
        formData.append('thumbnail', thumbnailInputRef.current.files[0]);
        formData.append('title', sanitizedTitle);
        formData.append('description', videoDescription);
        formData.append('category', category);
        formData.append('visibility', visibility);
        tags.forEach((tag) => formData.append('tags', tag));

        try {
            await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/video/upload`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            toast.success('Video uploaded successfully!', { id: toastId });
            setIsDialogOpen(false);
            window.location.reload();
        } catch (error) {
            console.error('Upload failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button className="cursor-pointer font-semibold font-sans bg-purple-600 text-white hover:bg-purple-800">
                    <FaUpload /> Upload Video
                </Button>
            </DialogTrigger>

            <DialogContent className="rounded-lg p-4 bg-gradient-to-tr from-blue-900/30 to-purple-900/30 backdrop-blur-md">
                <DialogHeader>
                    <DialogTitle>
                        Upload video for{' '}
                        {environment.youtubeChannel?.[0]?.channelTitle}
                    </DialogTitle>
                </DialogHeader>
                {!isLoading ? (
                    <div className="p-4 space-y-4">
                        <div>
                            <label className="text-sm font-medium">
                                Select Video
                            </label>
                            <input
                                ref={videoInputRef}
                                type="file"
                                accept="video/*"
                                className="w-full border p-2 rounded-md"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium">
                                Select Thumbnail
                            </label>
                            <input
                                ref={thumbnailInputRef}
                                type="file"
                                accept="image/*"
                                className="w-full border p-2 rounded-md"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium">
                                Video Title
                            </label>
                            <Input
                                value={videoTitle}
                                className="border"
                                onChange={handleTitleChange}
                                placeholder="Enter video title"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium">
                                Description
                            </label>
                            <Textarea
                                value={videoDescription}
                                className="border"
                                onChange={handleDescriptionChange}
                                placeholder="Enter video description"
                                rows={6}
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium">
                                Tags (comma separated)
                            </label>
                            <Input
                                className="border"
                                onChange={handleTagsChange}
                                placeholder="e.g. vlog, travel, coding"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium">
                                Category
                            </label>
                            <Select
                                value={category}
                                onValueChange={handleCategoryChange}
                            >
                                <SelectTrigger className="border">
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categoryOptions.map((option) => (
                                        <SelectItem
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <label className="text-sm font-medium">
                                Visibility
                            </label>
                            <RadioGroup
                                value={visibility}
                                onValueChange={handleVisibilityChange}
                                className="flex space-x-4 mt-2"
                            >
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                        value="public"
                                        id="public"
                                    />
                                    <label htmlFor="public" className="text-sm">
                                        Public
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                        value="private"
                                        id="private"
                                    />
                                    <label
                                        htmlFor="private"
                                        className="text-sm"
                                    >
                                        Private
                                    </label>
                                </div>
                            </RadioGroup>
                        </div>

                        <Button
                            className="w-full font-semibold bg-purple-600 text-white hover:bg-purple-800"
                            onClick={handleUploadVideo}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                'Uploading...'
                            ) : (
                                <>
                                    <FaUpload /> Upload & Request Video
                                </>
                            )}
                        </Button>
                    </div>
                ) : (
                    <div className="py-12">
                        <div className="md:px-12">
                            <div className="w-full rounded-full">
                                <div className="h-1.5 w-full bg-purple-100 overflow-hidden rounded-full">
                                    <div className="animate-[progress_1s_infinite_linear] w-full h-full bg-gradient-to-r from-blue-900/90 to-purple-900/80 rounded-full origin-left"></div>
                                </div>
                            </div>
                        </div>
                        <div className="text-center text-red-700 pt-4 font-bold text-xl">
                            Do not close or reload the window until upload
                            completes.
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
