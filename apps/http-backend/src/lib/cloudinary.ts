import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

// Function to extract public_id from a Cloudinary URL
function getPublicIdFromUrl(url: string) {
    const urlParts = url.split('/');
    const publicIdWithExtension = urlParts[urlParts.length - 1];
    const publicId = publicIdWithExtension?.split('.')[0]; // Remove the file extension
    return publicId;
}

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
    // Configuration
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    // Extract the public_id from the URL
    const publicId = getPublicIdFromUrl(oldFileLink);

    // Delete the image using the extracted public_id
    const deleteResult = await cloudinary.uploader
        .destroy(publicId!)
        .catch((error) => {
            console.log(error);
        });
};

export { uploadOnCloudinary, deleteOnCloudinary };
