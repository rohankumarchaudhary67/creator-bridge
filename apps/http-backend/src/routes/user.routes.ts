import { Router } from 'express';
import { verifySessionToken } from '../middlewares/auth';
import { userRole, fetchUser } from '../controllers/user.controller';

const userRoutes: Router = Router();

userRoutes.post('/role', verifySessionToken, userRole);
userRoutes.get('/fetch', verifySessionToken, fetchUser);

export { userRoutes };
