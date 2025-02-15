import { Router } from 'express';
import { healthCheckController } from '../controllers/health-check.controller';

const healthCheckRoutes: Router = Router();

healthCheckRoutes.get('/', healthCheckController);

export { healthCheckRoutes };
