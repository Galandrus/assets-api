import { Request, Response } from 'express';
import { Asset } from '../../entities/asset';
import AssetService from '../../services/assets';
import { UpdateAsset } from '../../services/assets/types';
import { validateCreateAssetBody } from './helpers';
import { CreateAssetRequest, UpdateAssetRequest, UpdateAssetValueRequest } from './types';

const createAssetController = async (req: CreateAssetRequest, res: Response): Promise<Response> => {
    const body = req.body;

    const validate = validateCreateAssetBody(body);
    if (!validate.success) {
        return res.status(400).json({ message: `Invalid body. ${validate.message}` });
    }

    const response = await AssetService.createAsset(body as Asset);
    if (!response.success) {
        return res.status(500).json({ message: response.message });
    }

    return res.status(200).json({
        id: response.id,
    });
};

const updateAssetController = async (req: UpdateAssetRequest, res: Response): Promise<Response> => {
    const { description, type, name } = req.body;

    const updateAsset: UpdateAsset = {
        id: req.params.id,
        description,
        name,
        type,
    };

    const response = await AssetService.updateAsset(updateAsset);
    if (!response.success) {
        return res.status(500).json(response);
    }

    return res.status(200).json(response);
};

const updateAssetValueController = async (req: UpdateAssetValueRequest, res: Response): Promise<Response> => {
    const { code, value } = req.body;

    const response = await AssetService.addNewValue(code, value);
    if (!response.success) {
        return res.status(500).json(response);
    }

    return res.status(200).json(response);
};

const getAssetsController = async (req: Request, res: Response): Promise<Response> => {
    const response = await AssetService.getAssets();
    return res.status(200).json(response);
};

const getAssetByIdController = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const response = await AssetService.getAssetById(id);
    return res.status(200).json(response);
};

const getAssetHistoryController = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const response = await AssetService.getAssetHistory(id);
    return res.status(200).json(response);
};

export default {
    createAssetController,
    updateAssetController,
    updateAssetValueController,
    getAssetsController,
    getAssetByIdController,
    getAssetHistoryController,
};
