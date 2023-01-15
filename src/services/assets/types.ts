export type ServiceResponse = {
    success: boolean;
    message?: string;
};

export type CreateAssetServiceResponse = ServiceResponse & {
    id: string;
};

export type UpdateAsset = {
    id: string;
    name?: string;
    description?: string;
    type?: string;
};
