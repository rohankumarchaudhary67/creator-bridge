import { Router } from 'express';
import { userRole } from '../controllers/user.controller';
import { verifySessionToken } from '../middlewares/auth';
import { addEditor } from '../controllers/user.controller';

const userRoutes: Router = Router();

userRoutes.post('/role', verifySessionToken, userRole);
userRoutes.post('/addEditor', verifySessionToken, addEditor);

export { userRoutes };
