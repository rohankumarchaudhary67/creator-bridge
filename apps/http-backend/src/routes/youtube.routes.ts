import { Router } from 'express';
import {
    youtubeAuth,
    youtubeCallback,
    uploadVideoToYoutube,
    getYoutubeChannelDetails,
} from '../controllers/youtube.controller';
import { verifySessionToken } from '../middlewares/auth';

const youtubeRoutes: Router = Router();

youtubeRoutes.get('/auth', verifySessionToken, youtubeAuth);
youtubeRoutes.get('/callback', youtubeCallback);
youtubeRoutes.post(
    '/upload-to-youtube',
    verifySessionToken,
    uploadVideoToYoutube
);
youtubeRoutes.get(
    '/fetch-channel-details',
    verifySessionToken,
    getYoutubeChannelDetails
);

export { youtubeRoutes };
