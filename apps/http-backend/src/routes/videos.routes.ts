import { Router } from 'express';
import {
    uploadVideo,
    sendRequestToCreator,
} from '../controllers/videos.controller';
import { upload } from '../middlewares/multer';
import { verifySessionToken } from '../middlewares/auth';

const videoRoutes: Router = Router();

videoRoutes
    .route('/upload')
    .post(
        upload.fields([{ name: 'video', maxCount: 1 }]),
        verifySessionToken,
        uploadVideo
    );

videoRoutes
    .route('/request-creator')
    .post(verifySessionToken, sendRequestToCreator);

export { videoRoutes };
