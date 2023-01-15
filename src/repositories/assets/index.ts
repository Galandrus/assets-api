import { ulid } from 'ulid';
import { Asset } from '../../entities/asset';
import { AppDataSource } from '../../lib/typeorm';
import logger from '../../utils/logger';

const repository = AppDataSource.getRepository(Asset);

const createAsset = async (asset: Asset): Promise<Asset> => {
    try {
        const date = new Date();
        asset.id = `ASSET-${ulid()}`;
        asset.createdAt = date;
        asset.updatedAt = date;

        return repository.save(asset);
    } catch (e) {
        logger.error(e);
        throw e;
    }
};

const updateAsset = async (asset: Asset): Promise<Asset> => {
    try {
        asset.updatedAt = new Date();

        return repository.save(asset);
    } catch (e) {
        logger.error(e);
        throw e;
    }
};

const findAssetById = async (id: string): Promise<Asset> => {
    try {
        return repository.findOneBy({ id });
    } catch (e) {
        logger.error(e);
        throw e;
    }
};

const findAssetByCode = async (code: string): Promise<Asset> => {
    try {
        return repository.findOneBy({ code });
    } catch (e) {
        logger.error(e);
        throw e;
    }
};

const AssetRepository = {
    createAsset,
    updateAsset,
    findAssetById,
    findAssetByCode,
};

export default AssetRepository;
