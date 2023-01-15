import { Router } from 'express';
import controllers from '../../controllers/assets';

const router = Router();

router.post('/', controllers.createAssetController);
router.put('/:id', controllers.updateAssetController);
router.post('/add-value', controllers.updateAssetValueController);

const AssetsRouter = {
    prefix: '/assets',
    router,
};

export default AssetsRouter;
