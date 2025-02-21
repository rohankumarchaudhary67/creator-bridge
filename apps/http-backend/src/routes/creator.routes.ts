import { Router } from 'express';
import { verifySessionToken } from '../middlewares/auth';
import {
    fetchCreator,
    sendRequestToAddEditor,
} from '../controllers/creator.controller';

const creatorRoutes: Router = Router();

creatorRoutes.get('/fetch', verifySessionToken, fetchCreator);
creatorRoutes.post(
    '/addEditorRequest',
    verifySessionToken,
    sendRequestToAddEditor
);

export { creatorRoutes };
