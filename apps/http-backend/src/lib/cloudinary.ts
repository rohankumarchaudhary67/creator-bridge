import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

// Function to extract public_id from a Cloudinary URL
const getPublicIdFromUrl = (url: string) => {
    try {
        const parts = url.split('/');
        const filename = parts[parts.length - 1]; // Extract the last part
        const publicId = filename?.split('.')[0]; // Remove file extension
        return publicId;
    } catch (error) {
        console.error('Error extracting public ID:', error);
        return null;
    }
};

const uploadOnCloudinary = async (localFilePath: string) => {
    if (!localFilePath) return null;

    // Configuration
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    try {
        // Upload file on cloudinary
        const cloudinaryResponse = await cloudinary.uploader
            .upload(localFilePath, {
                resource_type: 'auto',
            })
            .catch((error: any) => {
                console.log(error);
            });

        // File has been uploaded successfully, delete local file
        fs.unlinkSync(localFilePath);
        return cloudinaryResponse;
    } catch (error) {
        console.log('Cloudinary Upload failed:', error);

        try {
            // Attempt to delete the local file after a failed upload
            fs.unlinkSync(localFilePath);
        } catch (unlinkError) {
            console.log('File deletion on server failed:', unlinkError);
        }

        return null; // Return null or handle the error as needed
    }
};

const deleteOnCloudinary = async (oldFileLink: string) => {
    if (!oldFileLink) {
        console.log('No file link provided');
        return;
    }

    // Configuration
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const publicId = getPublicIdFromUrl(oldFileLink);
    if (!publicId) {
        console.log('Invalid public ID extracted');
        return;
    }

    try {
        const deleteResult = await cloudinary.uploader.destroy(publicId, {
            resource_type: 'video',
        });
        return deleteResult;
    } catch (error) {
        console.error('Error deleting video from Cloudinary:', error);
    }
};

export { uploadOnCloudinary, deleteOnCloudinary };
