import { EntityManager, QueryRunner } from 'typeorm';
import { AssetHistory } from '../../entities/assetHistory';
import { AppDataSource } from '../../lib/typeorm';

const repository = AppDataSource.getRepository(AssetHistory);

const createAssetHistory =
    (entityManager?: EntityManager) =>
    async (assetId: string, value: number): Promise<AssetHistory> => {
        const assetHistory = {
            assetId,
            value,
            createdAt: new Date(),
        };

        const repo = entityManager ? entityManager.getRepository(AssetHistory) : repository;
        return repo.save(assetHistory);
    };

const findHistoryByAssetId = async (assetId: string): Promise<AssetHistory[]> => {
    return await repository.findBy({ assetId });
};

const AssetHistoryRepository = {
    createAssetHistory,
    findHistoryByAssetId,
};

export default AssetHistoryRepository;
