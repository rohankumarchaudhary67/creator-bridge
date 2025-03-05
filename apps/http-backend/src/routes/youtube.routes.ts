import { Router } from 'express';
import {
    youtubeAuth,
    youtubeCallback,
    getYoutubeChannelDetails,
} from '../controllers/youtube.controller';
import { verifySessionToken } from '../middlewares/auth';

const youtubeRoutes: Router = Router();

youtubeRoutes.get('/auth', verifySessionToken, youtubeAuth);
youtubeRoutes.get('/callback', youtubeCallback);
youtubeRoutes.get(
    '/fetch-channel-details',
    verifySessionToken,
    getYoutubeChannelDetails
);

export { youtubeRoutes };
