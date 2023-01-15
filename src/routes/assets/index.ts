import { Router } from 'express';
import controllers from '../../controllers/assets';

const router = Router();

router.post('/', controllers.createAssetController);
router.put('/:id', controllers.updateAssetController);
router.post('/add-value', controllers.updateAssetValueController);
router.get('/', controllers.getAssetsController);
router.get('/:id', controllers.getAssetByIdController);
router.get('/:id/history', controllers.getAssetHistoryController);

const AssetsRouter = {
    prefix: '/assets',
    router,
};

export default AssetsRouter;
