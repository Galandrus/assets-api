import { Asset } from '../../entities/asset';
import { AssetHistory } from '../../entities/assetHistory';
import AssetHistoryRepository from '../../repositories/assetHistory';
import AssetRepository from '../../repositories/assets';
import { CreateAssetServiceResponse, ServiceResponse, UpdateAsset } from './types';

const createAsset = async (asset: Asset): Promise<CreateAssetServiceResponse> => {
    try {
        const newAsset = await AssetRepository.createAsset(asset);
        await AssetHistoryRepository.createAssetHistory(newAsset.id, newAsset.value);
        return {
            success: true,
            id: newAsset.id,
        };
    } catch (e) {
        return {
            success: false,
            id: '',
            message: (<Error>e).message,
        };
    }
};

const addNewValue = async (code: string, value: number): Promise<ServiceResponse> => {
    try {
        const asset = await AssetRepository.findAssetByCode(code);
        if (!asset) {
            return {
                success: false,
                message: 'Asset not found',
            };
        }

        asset.value = value;
        await AssetRepository.updateAsset(asset);
        await AssetHistoryRepository.createAssetHistory(asset.id, asset.value);

        return {
            success: true,
        };
    } catch (e) {
        return {
            success: false,
            message: (<Error>e).message,
        };
    }
};

const updateAsset = async (updateAsset: UpdateAsset): Promise<ServiceResponse> => {
    try {
        const asset = await AssetRepository.findAssetById(updateAsset.id);
        if (!asset) {
            return {
                success: false,
                message: 'Asset not found',
            };
        }

        if (updateAsset.name) asset.name = updateAsset.name;
        if (updateAsset.description) asset.description = updateAsset.description;
        if (updateAsset.type) asset.type = updateAsset.type;

        await AssetRepository.updateAsset(asset);

        return {
            success: true,
        };
    } catch (e) {
        return {
            success: false,
            message: (<Error>e).message,
        };
    }
};

const getAssets = async (): Promise<Asset[]> => {
    try {
        return AssetRepository.getListAssets();
    } catch (e) {
        return [];
    }
};

const getAssetById = async (id: string): Promise<Asset> => {
    try {
        return AssetRepository.findAssetById(id);
    } catch (e) {
        return null;
    }
};

const getAssetHistory = async (id: string): Promise<{ value: number; date: Date }[]> => {
    try {
        const history = await AssetHistoryRepository.findHistoryByAssetId(id);
        return history
            .map((item) => ({ value: item.value, date: item.createdAt }))
            .sort((a, b) => b.date.getTime() - a.date.getTime());
    } catch (e) {
        return [];
    }
};

const AssetService = {
    createAsset,
    addNewValue,
    updateAsset,
    getAssets,
    getAssetById,
    getAssetHistory,
};

export default AssetService;
