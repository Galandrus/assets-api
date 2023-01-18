import { Entity, EntityManager, QueryRunner, Repository } from 'typeorm';
import { ulid } from 'ulid';
import { Asset } from '../../entities/asset';
import { AppDataSource } from '../../lib/typeorm';
import AssetHistoryRepository from '../assetHistory';

const repository = AppDataSource.getRepository(Asset);

const addAsset =
    (entityManager?: EntityManager) =>
    async (asset: Asset): Promise<Asset> => {
        const date = new Date();
        asset.id = `ASSET-${ulid()}`;
        asset.createdAt = date;
        asset.updatedAt = date;

        const repo = entityManager ? entityManager.getRepository(Asset) : repository;
        return repo.save(asset);
    };

const updateAsset =
    (entityManager?: EntityManager) =>
    async (asset: Asset): Promise<Asset> => {
        asset.updatedAt = new Date();

        const repo = entityManager ? entityManager.getRepository(Asset) : repository;
        return repo.save(asset);
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

const updateAssetValue = async (asset: Asset): Promise<Asset> => {
    return AppDataSource.manager.transaction<Asset>(async (entityManager): Promise<Asset> => {
        await updateAsset(entityManager)(asset);
        await AssetHistoryRepository.createAssetHistory(entityManager)(asset.id, asset.value);

        return asset;
    });
};

const createAsset = async (asset: Asset): Promise<Asset> => {
    return AppDataSource.manager.transaction<Asset>(async (entityManager): Promise<Asset> => {
        const newAsset = await addAsset(entityManager)(asset);
        await AssetHistoryRepository.createAssetHistory(entityManager)(newAsset.id, newAsset.value);

        return newAsset;
    });
};

const AssetRepository = {
    createAsset,
    updateAsset: updateAsset(),
    findAssetById,
    findAssetByCode,
    getListAssets,
    updateAssetValue,
};

export default AssetRepository;
