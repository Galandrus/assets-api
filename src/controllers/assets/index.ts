import { Request, Response } from 'express';
import { Asset } from '../../entities/asset';
import AssetService from '../../services/assets';
import { UpdateAsset } from '../../services/assets/types';
import logger from '../../utils/logger';
import { validateCreateAssetBody, validateUpdateAssetValueBody } from './helpers';
import { CreateAssetRequest, UpdateAssetRequest, UpdateAssetValueRequest } from './types';

const createAssetController = async (req: CreateAssetRequest, res: Response): Promise<Response> => {
    try {
        const body = req.body;

        const validate = validateCreateAssetBody(body);
        if (!validate.success) {
            return res.status(400).json({ message: `Invalid body. ${validate.errorMessage}` });
        }

        const existAsset = await AssetService.getAssetByCode(body.code);
        if (existAsset) {
            return res.status(400).json({ message: `An asset with code ${body.code} already exisit` });
        }

        const id = await AssetService.createAsset(body as Asset);

        return res.status(200).json({ id });
    } catch (e) {
        logger.error('createAssetController error:', e);
        return res.status(500).json({ message: 'An handled error occurred' });
    }
};

const updateAssetController = async (req: UpdateAssetRequest, res: Response): Promise<Response> => {
    try {
        const { description, type, name } = req.body;

        const updateAsset: UpdateAsset = {
            id: req.params.id,
            description,
            name,
            type,
        };

        const asset = await AssetService.getAssetById(updateAsset.id);
        if (!asset) {
            return res.status(400).json({ message: 'Asset not found' });
        }

        await AssetService.updateAsset(asset, updateAsset);
        return res.status(200).json({ success: true });
    } catch (e) {
        logger.error('updateAssetController error:', e);
        return res.status(500).json({ message: 'An handled error occurred' });
    }
};

const updateAssetValueController = async (req: UpdateAssetValueRequest, res: Response): Promise<Response> => {
    try {
        const body = req.body;

        const validate = validateUpdateAssetValueBody(body);
        if (!validate.success) {
            return res.status(400).json({ message: `Invalid body. ${validate.errorMessage}` });
        }

        const asset = await AssetService.getAssetByCode(body.code);
        if (!asset) {
            return res.status(400).json({ message: 'Asset not found' });
        }

        await AssetService.addNewValue(asset, body.value);

        return res.status(200).json({ success: true });
    } catch (e) {
        logger.error('updateAssetValueController error:', e);
        return res.status(500).json({ message: 'An handled error occurred' });
    }
};

const getAssetsController = async (req: Request, res: Response): Promise<Response> => {
    try {
        const response = await AssetService.getAssets();
        return res.status(200).json(response);
    } catch (e) {
        logger.error('getAssetsController error:', e);
        return res.status(500).json({ message: 'An handled error occurred' });
    }
};

const getAssetByIdController = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const asset = await AssetService.getAssetById(id);
        if (!asset) {
            return res.status(400).json({ message: 'Asset not found' });
        }

        return res.status(200).json(asset);
    } catch (e) {
        logger.error('getAssetByIdController error:', e);
        return res.status(500).json({ message: 'An handled error occurred' });
    }
};

const getAssetHistoryController = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const response = await AssetService.getAssetHistory(id);
        return res.status(200).json(response);
    } catch (e) {
        logger.error('getAssetHistoryController error:', e);
        return res.status(500).json({ message: 'An handled error occurred' });
    }
};

const AssetsControllers = {
    createAssetController,
    updateAssetController,
    updateAssetValueController,
    getAssetsController,
    getAssetByIdController,
    getAssetHistoryController,
};
export default AssetsControllers;
