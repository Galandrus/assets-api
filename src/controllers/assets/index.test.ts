import { getMockReq, getMockRes } from '@jest-mock/express';
import AssetsControllers from '.';
import { Asset } from '../../entities/asset';
import AssetService from '../../services/assets';
import { UpdateAssetRequest } from './types';

describe('AssetsControllers', () => {
    const { res, mockClear } = getMockRes();

    beforeEach(() => {
        mockClear();
        jest.clearAllMocks();
    });

    const defaultAsset: Asset = {
        id: 'ASSET-1234',
        name: 'Flixxo',
        description: 'A cryptocurrency of Flixxo, the platform for microseries from around the world.',
        value: 0.0009434,
        type: 'crypto',
        code: 'FLIXX',
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    describe('createAssetController', () => {
        test('Should return status 200 with the new id', async () => {
            const body = {
                name: defaultAsset.name,
                description: defaultAsset.description,
                value: defaultAsset.value,
                type: defaultAsset.type,
                code: defaultAsset.code,
            };

            const req = getMockReq({
                body,
            });

            const getAssetByCodeMock = jest.spyOn(AssetService, 'getAssetByCode').mockResolvedValue(null);
            const createAssetMock = jest.spyOn(AssetService, 'createAsset').mockResolvedValue(defaultAsset.id);

            await AssetsControllers.createAssetController(req, res);

            expect(getAssetByCodeMock).toHaveBeenCalledWith(body.code);
            expect(createAssetMock).toHaveBeenCalledWith(expect.objectContaining(body));
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ id: defaultAsset.id });
        });

        test('Should return status 400 because fails the validation of the body', async () => {
            const body = {
                name: defaultAsset.name,
                description: defaultAsset.description,
                value: defaultAsset.value,
                type: defaultAsset.type,
            };

            const req = getMockReq({
                body,
            });

            await AssetsControllers.createAssetController(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Invalid body. "code" is required' });
        });

        test('Should return status 400 because the asset already exists', async () => {
            const body = {
                name: defaultAsset.name,
                description: defaultAsset.description,
                value: defaultAsset.value,
                type: defaultAsset.type,
                code: defaultAsset.code,
            };

            const req = getMockReq({
                body,
            });

            const getAssetByCodeMock = jest.spyOn(AssetService, 'getAssetByCode').mockResolvedValue(defaultAsset);

            await AssetsControllers.createAssetController(req, res);

            expect(getAssetByCodeMock).toHaveBeenCalledWith(body.code);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: `An asset with code ${body.code} already exisit` });
        });

        test('Should return status 500 because a handled error occurred', async () => {
            const body = {
                name: defaultAsset.name,
                description: defaultAsset.description,
                value: defaultAsset.value,
                type: defaultAsset.type,
                code: defaultAsset.code,
            };

            const req = getMockReq({
                body,
            });

            jest.spyOn(AssetService, 'getAssetByCode').mockRejectedValue('Error');

            await AssetsControllers.createAssetController(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'An handled error occurred' });
        });
    });

    describe('updateAssetController', () => {
        test('Should return status 200 with a message of success', async () => {
            const body = {
                name: defaultAsset.name,
                description: defaultAsset.description,
                type: defaultAsset.type,
            };

            const req = getMockReq({
                body,
                params: { id: defaultAsset.id },
            }) as UpdateAssetRequest;

            const getAssetByIdMock = jest.spyOn(AssetService, 'getAssetById').mockResolvedValue(defaultAsset);
            const updateeAssetMock = jest.spyOn(AssetService, 'updateAsset').mockResolvedValue(defaultAsset);

            await AssetsControllers.updateAssetController(req, res);

            expect(getAssetByIdMock).toHaveBeenCalledWith(defaultAsset.id);
            expect(updateeAssetMock).toHaveBeenCalledWith(
                expect.objectContaining(defaultAsset),
                expect.objectContaining(body)
            );
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ success: true });
        });

        test('Should return status 400 because the asset was not found', async () => {
            const body = {
                name: defaultAsset.name,
                description: defaultAsset.description,
                type: defaultAsset.type,
            };

            const req = getMockReq({
                body,
                params: { id: defaultAsset.id },
            }) as UpdateAssetRequest;

            const getAssetByIdMock = jest.spyOn(AssetService, 'getAssetById').mockResolvedValue(null);

            await AssetsControllers.updateAssetController(req, res);

            expect(getAssetByIdMock).toHaveBeenCalledWith(defaultAsset.id);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Asset not found' });
        });

        test('Should return status 500 because a handled error occurred', async () => {
            const body = {
                name: defaultAsset.name,
                description: defaultAsset.description,
                type: defaultAsset.type,
            };

            const req = getMockReq({
                body,
                params: { id: defaultAsset.id },
            }) as UpdateAssetRequest;

            const getAssetByIdMock = jest.spyOn(AssetService, 'getAssetById').mockResolvedValue(defaultAsset);
            const updateeAssetMock = jest.spyOn(AssetService, 'updateAsset').mockRejectedValue('Error');

            await AssetsControllers.updateAssetController(req, res);

            expect(getAssetByIdMock).toHaveBeenCalledWith(defaultAsset.id);
            expect(updateeAssetMock).toHaveBeenCalledWith(
                expect.objectContaining(defaultAsset),
                expect.objectContaining(body)
            );
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'An handled error occurred' });
        });
    });

    describe('updateAssetValueController', () => {
        test('Should return status 200 with a message of success', async () => {
            const body = {
                value: defaultAsset.value,
                code: defaultAsset.code,
            };

            const req = getMockReq({
                body,
            });

            const getAssetByCodeMock = jest.spyOn(AssetService, 'getAssetByCode').mockResolvedValue(defaultAsset);
            const addNewValuetMock = jest.spyOn(AssetService, 'addNewValue').mockResolvedValue(defaultAsset);

            await AssetsControllers.updateAssetValueController(req, res);

            expect(getAssetByCodeMock).toHaveBeenCalledWith(defaultAsset.code);
            expect(addNewValuetMock).toHaveBeenCalledWith(expect.objectContaining(defaultAsset), body.value);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ success: true });
        });

        test('Should return status 400 because fails the validation of the body', async () => {
            const body = {
                value: defaultAsset.value,
            };

            const req = getMockReq({
                body,
            });

            await AssetsControllers.updateAssetValueController(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Invalid body. "code" is required' });
        });

        test('Should return status 400 because the asset was not found', async () => {
            const body = {
                value: defaultAsset.value,
                code: defaultAsset.code,
            };

            const req = getMockReq({
                body,
            });

            const getAssetByCodeMock = jest.spyOn(AssetService, 'getAssetByCode').mockResolvedValue(null);

            await AssetsControllers.updateAssetValueController(req, res);

            expect(getAssetByCodeMock).toHaveBeenCalledWith(defaultAsset.code);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Asset not found' });
        });

        test('Should return status 500 because a handled error occurred', async () => {
            const body = {
                value: defaultAsset.value,
                code: defaultAsset.code,
            };

            const req = getMockReq({
                body,
            });

            const getAssetByCodeMock = jest.spyOn(AssetService, 'getAssetByCode').mockResolvedValue(defaultAsset);
            const addNewValuetMock = jest.spyOn(AssetService, 'addNewValue').mockRejectedValue('Error');

            await AssetsControllers.updateAssetValueController(req, res);

            expect(getAssetByCodeMock).toHaveBeenCalledWith(defaultAsset.code);
            expect(addNewValuetMock).toHaveBeenCalledWith(expect.objectContaining(defaultAsset), body.value);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'An handled error occurred' });
        });
    });

    describe('getAssetsController', () => {
        test('Should return status 200 with an array of Assets', async () => {
            const req = getMockReq();

            const getAssestMock = jest.spyOn(AssetService, 'getAssets').mockResolvedValue([defaultAsset, defaultAsset]);

            await AssetsControllers.getAssetsController(req, res);

            expect(getAssestMock).toHaveBeenCalledWith();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([defaultAsset, defaultAsset]);
        });

        test('Should return status 500 because a handled error occurred', async () => {
            const req = getMockReq({
                params: { id: defaultAsset.id },
            });
            const getAssestMock = jest.spyOn(AssetService, 'getAssets').mockRejectedValue('Error');

            await AssetsControllers.getAssetsController(req, res);

            expect(getAssestMock).toHaveBeenCalledWith();
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'An handled error occurred' });
        });
    });

    describe('getAssetByIdController', () => {
        test('Should return status 200 with an Asset', async () => {
            const req = getMockReq({
                params: { id: defaultAsset.id },
            });
            const getAssetByIdMock = jest.spyOn(AssetService, 'getAssetById').mockResolvedValue(defaultAsset);

            await AssetsControllers.getAssetByIdController(req, res);

            expect(getAssetByIdMock).toHaveBeenCalledWith(defaultAsset.id);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining(defaultAsset));
        });

        test('Should return status 400 because the asset was not found', async () => {
            const req = getMockReq({
                params: { id: defaultAsset.id },
            });

            const getAssetByIdMock = jest.spyOn(AssetService, 'getAssetById').mockResolvedValue(null);

            await AssetsControllers.getAssetByIdController(req, res);

            expect(getAssetByIdMock).toHaveBeenCalledWith(defaultAsset.id);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Asset not found' });
        });

        test('Should return status 500 because a handled error occurred', async () => {
            const req = getMockReq({
                params: { id: defaultAsset.id },
            });
            const getAssetByIdMock = jest.spyOn(AssetService, 'getAssetById').mockRejectedValue('Error');

            await AssetsControllers.getAssetByIdController(req, res);

            expect(getAssetByIdMock).toHaveBeenCalledWith(defaultAsset.id);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'An handled error occurred' });
        });
    });

    describe('getAssetHistoryController', () => {
        test('Should return status 200 with an Asset', async () => {
            const req = getMockReq({
                params: { id: defaultAsset.id },
            });
            const assetHistory = { value: defaultAsset.value, date: defaultAsset.createdAt };
            const getAssetHistoryMock = jest.spyOn(AssetService, 'getAssetHistory').mockResolvedValue([assetHistory]);

            await AssetsControllers.getAssetHistoryController(req, res);

            expect(getAssetHistoryMock).toHaveBeenCalledWith(defaultAsset.id);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([assetHistory]);
        });

        test('Should return status 500 because a handled error occurred', async () => {
            const req = getMockReq({
                params: { id: defaultAsset.id },
            });
            const getAssetHistoryMock = jest.spyOn(AssetService, 'getAssetHistory').mockRejectedValue('Error');

            await AssetsControllers.getAssetHistoryController(req, res);

            expect(getAssetHistoryMock).toHaveBeenCalledWith(defaultAsset.id);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'An handled error occurred' });
        });
    });
});
