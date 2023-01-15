import { Router } from 'express';
import controllers from '../../controllers/health';

const router = Router();

router.get('/', controllers.healthCheckController);

const HealthRouter = {
    prefix: '/health',
    router,
};

export default HealthRouter;
