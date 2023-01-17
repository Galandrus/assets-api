import { Endpoint } from '../commons/types';
import {
    AssetDoc,
    AuthorizationResponses,
    CreateAssetBodyParameterDoc,
    IdRequestParam,
    UpdateAssetBodyParameterDoc,
    UpdateAssetValueBodyParameterDoc,
} from './types';

const assetsEndpoint: Endpoint = {
    '/assets/': {
        post: {
            tags: ['Assets'],
            security: [{ bearerAuth: [] }],
            description: 'Create Asset',
            operationId: 'createAsset',
            requestBody: CreateAssetBodyParameterDoc,
            responses: {
                200: {
                    description: 'Success response',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    id: { type: 'string' },
                                },
                            },
                            example: {
                                id: 'ASSET-01GPSCSV4XNQ1M4T1MHX2SBN31',
                            },
                        },
                    },
                },
                400: {
                    description: 'An invalid request was made',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: { type: 'string' },
                                },
                            },
                            examples: {
                                'Asset already exist': {
                                    value: {
                                        message: 'An asset with code FLIXX already exisit',
                                    },
                                },
                                'Invalid body': {
                                    value: {
                                        message: 'Invalid body. "code" is required',
                                    },
                                },
                            },
                        },
                    },
                },
                ...AuthorizationResponses,
                500: {
                    description: 'An internal server occurred',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: { type: 'string' },
                                },
                            },
                            example: {
                                message: 'An handled error occurred',
                            },
                        },
                    },
                },
            },
        },
        get: {
            tags: ['Assets'],
            description: 'List all Asset availables',
            operationId: 'listAssets',
            responses: {
                200: {
                    description: 'Success response',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'array',
                                items: { ...AssetDoc.schema, example: AssetDoc.example },
                            },
                        },
                    },
                },
                500: {
                    description: 'An internal server occurred',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: { type: 'string' },
                                },
                            },
                            example: {
                                message: 'An handled error occurred',
                            },
                        },
                    },
                },
            },
        },
    },
};

const assetsIdEndpoints: Endpoint = {
    '/assets/{id}': {
        put: {
            tags: ['Assets'],
            description: 'Update Asset',
            operationId: 'updateAsset',
            parameters: [IdRequestParam],
            security: [{ bearerAuth: [] }],
            requestBody: UpdateAssetBodyParameterDoc,
            responses: {
                200: {
                    description: 'Success response',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: { type: 'boolean' },
                                },
                            },
                            example: {
                                success: true,
                            },
                        },
                    },
                },
                400: {
                    description: 'Asset was not found',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: { type: 'string' },
                                },
                            },
                            example: {
                                message: 'Asset not found',
                            },
                        },
                    },
                },
                ...AuthorizationResponses,
                500: {
                    description: 'An internal server occurred',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: { type: 'string' },
                                },
                            },
                            example: {
                                message: 'An handled error occurred',
                            },
                        },
                    },
                },
            },
        },
        get: {
            tags: ['Assets'],
            description: 'Get Asset by id',
            operationId: 'getAssetById',
            parameters: [IdRequestParam],
            responses: {
                200: {
                    description: 'Success response',
                    content: {
                        'application/json': {
                            ...AssetDoc,
                        },
                    },
                },
                400: {
                    description: 'Asset was not found',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: { type: 'string' },
                                },
                            },
                            example: {
                                message: 'Asset not found',
                            },
                        },
                    },
                },
                500: {
                    description: 'An internal server occurred',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: { type: 'string' },
                                },
                            },
                            example: {
                                message: 'An handled error occurred',
                            },
                        },
                    },
                },
            },
        },
    },
};

const addValueEndpoint: Endpoint = {
    '/assets/add-value': {
        put: {
            tags: ['Assets'],
            description: 'Update asset value',
            operationId: 'updateAssetValue',
            requestBody: UpdateAssetValueBodyParameterDoc,
            security: [{ bearerAuth: [] }],
            responses: {
                200: {
                    description: 'Success response',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: { type: 'boolean' },
                                },
                            },
                            example: {
                                success: true,
                            },
                        },
                    },
                },
                400: {
                    description: 'Asset was not found',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: { type: 'string' },
                                },
                            },
                            examples: {
                                'Asset already exist': {
                                    value: {
                                        message: 'Asset not found',
                                    },
                                },
                                'Invalid body': {
                                    value: {
                                        message: 'Invalid body. "code" is required',
                                    },
                                },
                            },
                        },
                    },
                },
                ...AuthorizationResponses,
                500: {
                    description: 'An internal server occurred',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: { type: 'string' },
                                },
                            },
                            example: {
                                message: 'An handled error occurred',
                            },
                        },
                    },
                },
            },
        },
    },
};

const assetHistoryEndpoint: Endpoint = {
    '/assets/{id}/history': {
        get: {
            tags: ['Assets'],
            description: "Get history of an asset's value",
            operationId: 'assetHistoryValue',
            parameters: [IdRequestParam],
            responses: {
                200: {
                    description: 'Success response',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        value: { type: 'number' },
                                        date: { type: 'string' },
                                    },
                                    example: {
                                        value: 0.0009434,
                                        date: '2017-10-24 09:00:00',
                                    },
                                },
                            },
                        },
                    },
                },
                500: {
                    description: 'An internal server occurred',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: { type: 'string' },
                                },
                            },
                            example: {
                                message: 'An handled error occurred',
                            },
                        },
                    },
                },
            },
        },
    },
};

const AssetsDocs = {
    ...assetsEndpoint,
    ...assetsIdEndpoints,
    ...addValueEndpoint,
    ...assetHistoryEndpoint,
};

export default AssetsDocs;
