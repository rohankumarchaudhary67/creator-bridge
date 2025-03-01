import { Router } from 'express';
import { verifySessionToken } from '../middlewares/auth';
import {
    fetchCreator,
    sendRequestToAddEditor,
    fetchEditorRequests,
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

export { creatorRoutes };
