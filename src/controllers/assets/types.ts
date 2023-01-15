import { Request } from 'express';

export interface CreateAssetRequest extends Request {
    body: {
        name: string;
        description: string;
        value: number;
        type: string;
        code: string;
    };
}

export interface UpdateAssetRequest extends Request {
    params: { id: string };
    body: {
        name: string;
        description: string;
        type: string;
    };
}

export interface UpdateAssetValueRequest extends Request {
    params: { id: string };
    body: {
        code: string;
        value: number;
    };
}
