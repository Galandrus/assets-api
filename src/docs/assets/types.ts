import swaggerJSDoc from 'swagger-jsdoc';
import { TypeDoc } from '../commons/types';

export const AssetDoc: TypeDoc = {
    schema: {
        type: 'object',
        properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            code: { type: 'string' },
            description: { type: 'string' },
            type: { type: 'string' },
            value: { type: 'number' },
            createdAt: { type: 'string' },
            updatedAt: { type: 'string' },
        },
    },
    example: {
        id: 'ASSET-01GPSCSV4XNQ1M4T1MHX2SBN31',
        name: 'Flixxo',
        description: 'A cryptocurrency of Flixxo, the platform for microseries from around the world.',
        value: 0.0009434,
        type: 'crypto',
        code: 'FLIXX',
        createdAt: '2017-10-24 09:00:00',
        updatedAt: '2023-01-17 18:00:00',
    },
};

export const CreateAssetBodyParameterDoc: swaggerJSDoc.RequestBody = {
    required: true,
    content: {
        'application/json': {
            schema: {
                type: 'object',
                properties: {
                    name: { type: 'string' },
                    code: { type: 'string' },
                    description: { type: 'string' },
                    type: { type: 'string' },
                    value: { type: 'number' },
                },
                example: {
                    name: 'Flixxo',
                    description: 'A cryptocurrency of Flixxo, the platform for microseries from around the world.',
                    value: 0.0009434,
                    type: 'crypto',
                    code: 'FLIXX',
                },
            },
        },
    },
};

export const UpdateAssetBodyParameterDoc: swaggerJSDoc.RequestBody = {
    required: true,
    content: {
        'application/json': {
            schema: {
                type: 'object',
                properties: {
                    name: { type: 'string' },
                    description: { type: 'string' },
                    type: { type: 'string' },
                },
                example: {
                    name: 'Flixxo',
                    description: 'A cryptocurrency of Flixxo, the platform for microseries from around the world.',
                    type: 'crypto',
                },
            },
        },
    },
};

export const UpdateAssetValueBodyParameterDoc: swaggerJSDoc.RequestBody = {
    required: true,
    content: {
        'application/json': {
            schema: {
                type: 'object',
                properties: {
                    code: { type: 'string' },
                    value: { type: 'number' },
                },
                example: {
                    code: 'FLIXX',
                    value: 0.0009434,
                },
            },
        },
    },
};

export const IdRequestParam: swaggerJSDoc.Parameter = {
    name: 'id',
    in: 'path',
    required: true,
    type: 'string',
    example: 'ASSET-01GPSCSV4XNQ1M4T1MHX2SBN31',
};

export const AuthorizationResponses = {
    401: {
        description: 'Invalid credentials or token',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        message: { type: 'string' },
                    },
                },
                examples: {
                    'Invalid credentials': {
                        value: {
                            message: 'Invalid credentials',
                        },
                    },
                    'Invalid Token': {
                        value: {
                            message: 'Invalid Token',
                        },
                    },
                },
            },
        },
    },
    403: {
        description: 'Token required for authentication',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        message: { type: 'string' },
                    },
                },
                example: {
                    message: 'A token is required for authentication',
                },
            },
        },
    },
};
