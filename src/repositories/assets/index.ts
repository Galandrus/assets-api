import { ulid } from 'ulid';
import { Asset } from '../../entities/asset';
import { AppDataSource } from '../../lib/typeorm';

const repository = AppDataSource.getRepository(Asset);

const createAsset = async (asset: Asset): Promise<Asset> => {
    const date = new Date();
    asset.id = `ASSET-${ulid()}`;
    asset.createdAt = date;
    asset.updatedAt = date;

    return repository.save(asset);
};

const updateAsset = async (asset: Asset): Promise<Asset> => {
    asset.updatedAt = new Date();

    return repository.save(asset);
};

const findAssetById = async (id: string): Promise<Asset> => {
    return repository.findOneBy({ id });
};

const findAssetByCode = async (code: string): Promise<Asset> => {
    return repository.findOneBy({ code });
};

const getListAssets = async (): Promise<Asset[]> => {
    return repository.find();
};

const AssetRepository = {
    createAsset,
    updateAsset,
    findAssetById,
    findAssetByCode,
    getListAssets,
};

export default AssetRepository;
