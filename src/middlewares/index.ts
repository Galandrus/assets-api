import { Application, json } from 'express';
import corsMiddleware from './cors';
import loggingMiddleware from './logging';

const applyMiddlewares = (app: Application): void => {
    app.use(corsMiddleware);
    app.use(loggingMiddleware());
    app.use(json());
};

export default applyMiddlewares;
