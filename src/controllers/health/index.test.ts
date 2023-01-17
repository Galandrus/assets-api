import { getMockReq, getMockRes } from '@jest-mock/express';
import HealthControllers from '.';

describe('healthCheckController', () => {
    test('Should return status 200 with information', () => {
        const req = getMockReq();
        const { res } = getMockRes();
        HealthControllers.healthCheckController(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                api: 'Assets API',
                description: 'Information manager of digital assets',
                version: 'v1.0.0',
                maintener: 'Martín Andrés Galán',
            })
        );
    });
});
