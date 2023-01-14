import { Router } from 'express';
import controllers from '../../controllers/health';

const router = Router();

router.get('/', controllers.healthCheckController);

export default {
    prefix: '/health',
    router,
};
