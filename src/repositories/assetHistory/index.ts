import { AssetHistory } from '../../entities/assetHistory';
import { AppDataSource } from '../../lib/typeorm';
import logger from '../../utils/logger';

const repository = AppDataSource.getRepository(AssetHistory);

const createAssetHistory = async (assetId: string, value: number): Promise<AssetHistory> => {
    try {
        const assetHistory = {
            assetId,
            value,
            createdAt: new Date(),
        };

        return repository.save(assetHistory);
    } catch (e) {
        logger.error(e);
        throw e;
    }
};

const findHistoryByAssetId = async (assetId: string): Promise<AssetHistory[]> => {
    try {
        return await repository.findBy({ assetId });
    } catch (e) {
        logger.error(e);
        throw e;
    }
};

const AssetHistoryRepository = {
    createAssetHistory,
    findHistoryByAssetId,
};

export default AssetHistoryRepository;
