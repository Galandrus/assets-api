import { Asset } from '../../entities/asset';
import AssetHistoryRepository from '../../repositories/assetHistory';
import AssetRepository from '../../repositories/assets';
import { UpdateAsset } from './types';

const createAsset = async (asset: Asset): Promise<string> => {
    const newAsset = await AssetRepository.createAsset(asset);
    return newAsset.id;
};

const addNewValue = async (asset: Asset, newValue: number): Promise<Asset> => {
    asset.value = newValue;
    return AssetRepository.updateAssetValue(asset);
};

const updateAsset = async (asset: Asset, updateAsset: UpdateAsset): Promise<Asset> => {
    if (updateAsset.name) asset.name = updateAsset.name;
    if (updateAsset.description) asset.description = updateAsset.description;
    if (updateAsset.type) asset.type = updateAsset.type;

    return AssetRepository.updateAsset(asset);
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
