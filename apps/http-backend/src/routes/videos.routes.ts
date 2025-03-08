import { Router } from 'express';
import {
    handleVideoRequest,
    uploadVideo,
} from '../controllers/videos.controller';
import { upload } from '../middlewares/multer';
import { verifySessionToken } from '../middlewares/auth';

const videoRoutes: Router = Router();

videoRoutes.route('/upload').post(
    upload.fields([
        { name: 'video', maxCount: 1 },
        { name: 'thumbnail', maxCount: 1 },
    ]),
    verifySessionToken,
    uploadVideo
);

videoRoutes.post('/handleVideoRequest', verifySessionToken, handleVideoRequest);

export { videoRoutes };
