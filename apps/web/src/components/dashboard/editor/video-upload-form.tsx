'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
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
import { useDropzone } from 'react-dropzone';
import { CloudUpload } from 'lucide-react';

export default function VideoUploadFormDashboardComponent() {
    const [file, setFile] = useState<File | null>(null);
    const [visibility, setVisibility] = useState('public');

    const { getRootProps, getInputProps } = useDropzone({
        accept: { 'video/*': [] },
        maxSize: 2 * 1024 * 1024 * 1024, // 2GB
        onDrop: (acceptedFiles) => setFile(acceptedFiles[0]),
    });

    return (
        <div className="py-4">
            <h1 className="font-sans font-semibold md:text-xl p-2">
                Upload Video
            </h1>
            <div className="bg-muted p-6 rounded-lg shadow-md md:px-96">
                {/* File Upload Box */}
                <div
                    {...getRootProps()}
                    className="border-2 border-dashed border-gray-300 p-6 rounded-lg flex flex-col items-center justify-center text-center cursor-pointer"
                >
                    <input {...getInputProps()} />
                    <CloudUpload className="w-10 h-10 text-gray-500 mb-2" />
                    <p className="text-blue-500">Upload a file</p>
                    <p className="text-sm text-gray-500">or drag and drop</p>
                    <p className="text-xs text-gray-400">
                        MP4, AVI, MOV up to 5GB
                    </p>
                </div>

                {/* File Name Preview */}
                {file && (
                    <p className="text-sm text-center text-gray-600 mt-2">
                        Selected: {file.name}
                    </p>
                )}

                {/* Video Title Input */}
                <div className="mt-4">
                    <label className="text-sm font-medium">Video Title</label>
                    <Input
                        placeholder="Enter video title"
                        className="border border-gray-300"
                    />
                </div>

                {/* Description Textarea */}
                <div className="mt-4">
                    <label className="text-sm font-medium">Description</label>
                    <Textarea
                        placeholder="Enter video description"
                        className="border border-gray-300"
                        rows={3}
                    />
                </div>

                {/* Category Dropdown */}
                <div className="mt-4">
                    <label className="text-sm font-medium">Category</label>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent className="border border-gray-300">
                            <SelectItem value="education">Education</SelectItem>
                            <SelectItem value="entertainment">
                                Entertainment
                            </SelectItem>
                            <SelectItem value="technology">
                                Technology
                            </SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Visibility Radio Buttons */}
                <div className="mt-4">
                    <label className="text-sm font-medium">Visibility</label>
                    <RadioGroup
                        value={visibility}
                        onValueChange={setVisibility}
                        className="flex space-x-4 mt-2"
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="public" id="public" />
                            <label htmlFor="public" className="text-sm">
                                Public
                            </label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="private" id="private" />
                            <label htmlFor="private" className="text-sm">
                                Private
                            </label>
                        </div>
                    </RadioGroup>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between mt-6">
                    <Button variant="outline">Cancel</Button>
                    <Button>Upload & Request Approval</Button>
                </div>
            </div>
        </div>
    );
}
