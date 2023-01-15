import { Router } from 'express';
import controllers from '../../controllers/assets';
import { verifyJWT } from '../../middlewares/authetication';

const router = Router();

router.post('/', verifyJWT, controllers.createAssetController);
router.put('/:id', verifyJWT, controllers.updateAssetController);
router.post('/add-value', verifyJWT, controllers.updateAssetValueController);
router.get('/', controllers.getAssetsController);
router.get('/:id', controllers.getAssetByIdController);
router.get('/:id/history', controllers.getAssetHistoryController);

const AssetsRouter = {
    prefix: '/assets',
    router,
};

export default AssetsRouter;
