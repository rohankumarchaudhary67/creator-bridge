import { Router } from 'express';
import { verifySessionToken } from '../middlewares/auth';
import {
    userRole,
    sendRequestToAddEditor,
    acceptCreatorRequest,
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

export { userRoutes };
