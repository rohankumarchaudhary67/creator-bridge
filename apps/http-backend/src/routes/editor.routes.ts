import { Router } from 'express';
import { verifySessionToken } from '../middlewares/auth';
import {
    fetchEditor,
    acceptCreatorRequest,
} from '../controllers/editor.controller';

const editorRoutes: Router = Router();

editorRoutes.get('/fetch', verifySessionToken, fetchEditor);
editorRoutes.post(
    '/acceptCreatorRequest',
    verifySessionToken,
    acceptCreatorRequest
);

export { editorRoutes };
