import { Asset } from '../../entities/asset';
import AssetHistoryRepository from '../../repositories/assetHistory';
import AssetRepository from '../../repositories/assets';
import { ServiceResponse, UpdateAsset } from './types';

const createAsset = async (asset: Asset): Promise<string> => {
    const newAsset = await AssetRepository.createAsset(asset);
    await AssetHistoryRepository.createAssetHistory(newAsset.id, newAsset.value);
    return newAsset.id;
};

const addNewValue = async (code: string, value: number): Promise<ServiceResponse> => {
    const asset = await getAssetByCode(code);
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
};

const updateAsset = async (updateAsset: UpdateAsset): Promise<ServiceResponse> => {
    const asset = await getAssetById(updateAsset.id);
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
};

const getAssets = async (): Promise<Asset[]> => {
    return AssetRepository.getListAssets();
};

const getAssetById = async (id: string): Promise<Asset> => {
    return AssetRepository.findAssetById(id);
};

const getAssetByCode = async (code: string): Promise<Asset> => {
    return AssetRepository.findAssetByCode(code);
};

const getAssetHistory = async (id: string): Promise<{ value: number; date: Date }[]> => {
    const history = await AssetHistoryRepository.findHistoryByAssetId(id);
    return history
        .map((item) => ({ value: item.value, date: item.createdAt }))
        .sort((a, b) => b.date.getTime() - a.date.getTime());
};

const AssetService = {
    createAsset,
    addNewValue,
    updateAsset,
    getAssets,
    getAssetById,
    getAssetByCode,
    getAssetHistory,
};

export default AssetService;
