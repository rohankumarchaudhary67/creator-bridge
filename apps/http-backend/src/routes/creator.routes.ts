import { Router } from 'express';
import { verifySessionToken } from '../middlewares/auth';
import {
    fetchCreator,
    sendRequestToAddEditor,
    fetchEditorRequests,
    handleVideoRequest,
} from '../controllers/creator.controller';

const creatorRoutes: Router = Router();

creatorRoutes.get('/fetch', verifySessionToken, fetchCreator);
creatorRoutes.post(
    '/addEditorRequest',
    verifySessionToken,
    sendRequestToAddEditor
);
creatorRoutes.get(
    '/fetchEditorRequests',
    verifySessionToken,
    fetchEditorRequests
);
creatorRoutes.post(
    '/handleVideoRequest',
    verifySessionToken,
    handleVideoRequest
);

export { creatorRoutes };
