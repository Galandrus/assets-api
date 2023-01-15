import { AssetHistory } from '../../entities/assetHistory';
import { AppDataSource } from '../../lib/typeorm';

const repository = AppDataSource.getRepository(AssetHistory);

const createAssetHistory = async (assetId: string, value: number): Promise<AssetHistory> => {
    const assetHistory = {
        assetId,
        value,
        createdAt: new Date(),
    };

    return repository.save(assetHistory);
};

const AssetHistoryRepository = {
    createAssetHistory,
};

export default AssetHistoryRepository;
