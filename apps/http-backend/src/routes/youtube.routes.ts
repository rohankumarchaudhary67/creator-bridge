import { Router } from 'express';
import {
    youtubeAuth,
    youtubeCallback,
} from '../controllers/youtube.controller';
import { verifySessionToken } from '../middlewares/auth';

const youtubeRoutes: Router = Router();

youtubeRoutes.get('/auth', verifySessionToken, youtubeAuth);
youtubeRoutes.get('/callback', youtubeCallback);

export { youtubeRoutes };
