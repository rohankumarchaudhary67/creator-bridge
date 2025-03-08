import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FaUpload } from 'react-icons/fa6';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { CloudUpload } from 'lucide-react';
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

export default function UploadVideoDialog({
    environment,
    accessToken,
}: {
    environment: any;
    accessToken: string;
}) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
    const [videoTitle, setVideoTitle] = useState('');
    const [videoDescription, setVideoDescription] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    const [category, setCategory] = useState('');
    const [visibility, setVisibility] = useState('public');
    const [isLoading, setIsLoading] = useState(false);

    // Dropzone for video
    const { getRootProps: getVideoProps, getInputProps: getVideoInputProps } =
        useDropzone({
            accept: { 'video/*': [] },
            maxSize: 5 * 1024 * 1024 * 1024, // 5GB
            onDrop: (acceptedFiles) => setVideoFile(acceptedFiles[0]),
        });

    // Dropzone for thumbnail
    const {
        getRootProps: getThumbnailProps,
        getInputProps: getThumbnailInputProps,
    } = useDropzone({
        accept: { 'image/*': [] },
        maxSize: 20 * 1024 * 1024, // 20MB
        onDrop: (acceptedFiles) => setThumbnailFile(acceptedFiles[0]),
    });

    const handleUploadVideo = async () => {
        if (
            !videoFile ||
            !thumbnailFile ||
            !videoTitle ||
            !videoDescription ||
            !category
        ) {
            alert('Please fill in all required fields.');
            return;
        }

        setIsLoading(true);
        const formData = new FormData();
        formData.append('video', videoFile);
        formData.append('thumbnail', thumbnailFile);
        formData.append('title', videoTitle);
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
            setIsDialogOpen(false);
        } catch (error) {
            console.error('Upload failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button className="cursor-pointer font-semibold font-sans">
                    <FaUpload /> Upload Video
                </Button>
            </DialogTrigger>

            <DialogContent className="rounded-lg p-4">
                <DialogHeader>
                    <DialogTitle>
                        Upload video for{' '}
                        {environment.youtubeChannel?.[0]?.channelTitle}
                    </DialogTitle>
                </DialogHeader>
                {!isLoading ? (
                    <div className="p-4">
                        <div className="flex justify-center items-start space-x-4">
                            <div className="flex flex-col justify-start items-start space-y-4 w-full pt-8">
                                {!videoFile ? (
                                    <div
                                        {...getVideoProps()}
                                        className="border-2 border-dashed border-gray-300 w-full p-6 rounded-lg flex flex-col items-center justify-center text-center cursor-pointer"
                                    >
                                        <input {...getVideoInputProps()} />
                                        <CloudUpload className="w-10 h-10 text-gray-500 mb-2" />
                                        <p className="text-blue-500">
                                            Upload a video
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            or drag and drop
                                        </p>
                                        <p className="text-xs text-gray-400">
                                            MP4, AVI, MOV up to 5GB
                                        </p>
                                    </div>
                                ) : (
                                    <p className="text-center text-primary font-bold text-xl mt-2">
                                        Selected Video:{' '}
                                        <span className="font-sans text-gray-400">
                                            {videoFile.name}
                                        </span>
                                    </p>
                                )}

                                {!thumbnailFile ? (
                                    <div
                                        {...getThumbnailProps()}
                                        className="border-2 border-dashed border-gray-300 w-full p-6 rounded-lg flex flex-col items-center justify-center text-center cursor-pointer"
                                    >
                                        <input {...getThumbnailInputProps()} />
                                        <CloudUpload className="w-10 h-10 text-gray-500 mb-2" />
                                        <p className="text-blue-500">
                                            Upload a photo
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            or drag and drop
                                        </p>
                                        <p className="text-xs text-gray-400">
                                            PNG, JPG, JPEG ut to 20MB
                                        </p>
                                    </div>
                                ) : (
                                    <p className="text-center text-primary font-bold text-xl mt-2">
                                        Selected Thumbnail:{' '}
                                        <span className="font-sans text-gray-400">
                                            {thumbnailFile.name}
                                        </span>
                                    </p>
                                )}
                            </div>

                            <div className="w-full">
                                <div className="mt-4">
                                    <label className="text-sm font-medium">
                                        Video Title
                                    </label>
                                    <Input
                                        value={videoTitle}
                                        className="border border-gray-300"
                                        onChange={(e) =>
                                            setVideoTitle(e.target.value)
                                        }
                                        placeholder="Enter video title"
                                    />
                                </div>

                                <div className="mt-4">
                                    <label className="text-sm font-medium">
                                        Description
                                    </label>
                                    <Textarea
                                        value={videoDescription}
                                        className="border border-gray-300"
                                        onChange={(e) =>
                                            setVideoDescription(e.target.value)
                                        }
                                        placeholder="Enter video description"
                                        rows={3}
                                    />
                                </div>

                                <div className="mt-4">
                                    <label className="text-sm font-medium">
                                        Tags (comma separated)
                                    </label>
                                    <Input
                                        className="border border-gray-300"
                                        onChange={(e) =>
                                            setTags(
                                                e.target.value
                                                    .split(',')
                                                    .map((tag) => tag.trim())
                                                    .filter(
                                                        (tag) => tag.length > 0
                                                    )
                                            )
                                        }
                                        placeholder="e.g. vlog, travel, coding"
                                    />
                                </div>

                                <div className="mt-4">
                                    <label className="text-sm font-medium">
                                        Category
                                    </label>
                                    <Select
                                        value={category}
                                        onValueChange={setCategory}
                                    >
                                        <SelectTrigger className="border border-gray-300">
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

                                <div className="mt-4">
                                    <label className="text-sm font-medium">
                                        Visibility
                                    </label>
                                    <RadioGroup
                                        value={visibility}
                                        onValueChange={setVisibility}
                                        className="flex space-x-4 mt-2"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem
                                                value="public"
                                                id="public"
                                            />
                                            <label
                                                htmlFor="public"
                                                className="text-sm"
                                            >
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
                            </div>
                        </div>

                        <div className="pt-8">
                            <Button
                                className="w-full font-sans font-semibold"
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
                    </div>
                ) : (
                    <div className="flex justify-center items-center p-12">
                        Loading
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
