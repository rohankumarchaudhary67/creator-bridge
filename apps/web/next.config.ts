import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        domains: [
            'lh3.googleusercontent.com',
            'yt3.ggpht.com',
            'res.cloudinary.com',
        ], // 👈 Add the Google image domain here
    },
};

export default nextConfig;
