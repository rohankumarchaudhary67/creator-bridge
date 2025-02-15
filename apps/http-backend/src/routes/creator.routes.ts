import { Router } from 'express';
import { addEditor } from '../controllers/creator.controller';
import { verifySessionToken } from '../middlewares/auth';

const creatorRoutes: Router = Router();

creatorRoutes.post('/addEditor', verifySessionToken, addEditor);

export { creatorRoutes };
