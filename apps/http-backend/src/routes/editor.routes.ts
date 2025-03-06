import { Router } from 'express';
import { verifySessionToken } from '../middlewares/auth';
import {
    fetchEditor,
    handleCreatorRequest,
    fetchEditorRequests,
    fetchYouTubeEnvironment,
    fetchRequestedVideos,
} from '../controllers/editor.controller';

const editorRoutes: Router = Router();

editorRoutes.get('/fetch', verifySessionToken, fetchEditor);
editorRoutes.post(
    '/handleCreatorRequest',
    verifySessionToken,
    handleCreatorRequest
);
editorRoutes.get(
    '/fetchEditorRequests',
    verifySessionToken,
    fetchEditorRequests
);
editorRoutes.get(
    '/fetchYouTubeEnvironment',
    verifySessionToken,
    fetchYouTubeEnvironment
);
editorRoutes.get(
    '/fetchRequestedVideos',
    verifySessionToken,
    fetchRequestedVideos
);

export { editorRoutes };
