import { Request, Response } from 'express';

const healthCheckController = (req: Request, res: Response): Response => {
    return res.status(200).json({
        version: 'v1.0.0',
    });
};

export default { healthCheckController };
