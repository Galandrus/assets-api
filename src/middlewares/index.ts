import { Application, json } from 'express';
import corsMiddleware from './cors';
import loggingMiddleware from './logging';
import applySwagger from './swagger';

const applyMiddlewares = (app: Application): void => {
    applySwagger(app);
    app.use(corsMiddleware);
    app.use(loggingMiddleware());
    app.use(json());
};

export default applyMiddlewares;
