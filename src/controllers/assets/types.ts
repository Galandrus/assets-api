import { Request } from 'express';

export type CreateAssetRequestBody = {
    name: string;
    description: string;
    value: number;
    type: string;
    code: string;
};

export interface CreateAssetRequest extends Request {
    body: CreateAssetRequestBody;
}

export interface UpdateAssetRequest extends Request {
    params: { id: string };
    body: {
        name: string;
        description: string;
        type: string;
    };
}

export type UpdateAssetValueRequestBody = {
    code: string;
    value: number;
};

export interface UpdateAssetValueRequest extends Request {
    params: { id: string };
    body: UpdateAssetValueRequestBody;
}

export type ValidationResponse = {
    success: boolean;
    errorMessage?: string;
};
