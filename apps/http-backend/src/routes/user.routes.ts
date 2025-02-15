import { Router } from 'express';
import { userRole } from '../controllers/user.controller';
import { verifySessionToken } from '../middlewares/auth';

const userRoutes: Router = Router();

userRoutes.post('/role', verifySessionToken, userRole);

export { userRoutes };
