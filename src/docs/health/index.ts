import { Endpoint } from '../commons/types';

const getHealthEndpoint: Endpoint = {
    '/health/': {
        get: {
            tags: ['Health'],
            description: 'Health of the MS',
            operationId: 'health',
            responses: {
                200: {
                    description: 'Success response, the microservice is alive',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    api: { type: 'string' },
                                    description: { type: 'string' },
                                    version: { type: 'string' },
                                    maintener: { type: 'string' },
                                },
                            },
                            example: {
                                api: 'Assets API',
                                description: 'Information manager of digital assets',
                                version: 'v1.0.0',
                                maintener: 'Martín Andrés Galán',
                            },
                        },
                    },
                },
            },
        },
    },
};

const HealthDocs = {
    ...getHealthEndpoint,
};
export default HealthDocs;
