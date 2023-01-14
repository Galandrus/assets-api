import { Application } from 'express';
import health from './health';

const applyRoutes = (app: Application): void => {
    app.use(health.prefix, health.router);
};

export default applyRoutes;
