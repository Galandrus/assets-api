import swaggerJSDoc from 'swagger-jsdoc';
import AssetsDocs from '../../docs/assets';
import HealthDocs from '../../docs/health';

const swaggerOptions: swaggerJSDoc.OAS3Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Assets API',
            description: 'Assets API Documentation',
            version: '1.0',
        },
        servers: [
            {
                url: 'https://assets-api.up.railway.app',
            },
        ],
        paths: {
            ...HealthDocs,
            ...AssetsDocs,
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    in: 'header',
                    description:
                        'You can use this token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoibWFydGluR2FsYW4iLCJwYXNzd29yZCI6IjEyM3F3ZWFzZCJ9.BTSdMXFtnm1JStfPpvc08aWlatpAnb2LqWXNwMaqfjM',
                },
            },
        },
    },
    apis: [],
};

export default swaggerJSDoc(swaggerOptions);
