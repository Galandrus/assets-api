import { Request, Response } from 'express';

const healthCheckController = (req: Request, res: Response): Response => {
    return res.status(200).json({
        api: 'Assets API',
        description: 'Information manager of digital assets',
        version: 'v1.0.0',
        maintener: 'Martín Andrés Galán',
    });
};

const HealthControllers = { healthCheckController };
export default HealthControllers;
