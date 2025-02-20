import { Router } from 'express';
import { verifySessionToken } from '../middlewares/auth';
import {
    userRole,
    sendRequestToAddEditor,
    acceptCreatorRequest,
    fetchUser,
} from '../controllers/user.controller';

const userRoutes: Router = Router();

userRoutes.post('/role', verifySessionToken, userRole);
userRoutes.post(
    '/sendRequestToAddEditor',
    verifySessionToken,
    sendRequestToAddEditor
);
userRoutes.post(
    '/acceptCreatorRequest',
    verifySessionToken,
    acceptCreatorRequest
);
userRoutes.get('/fetchUser', verifySessionToken, fetchUser);

export { userRoutes };
