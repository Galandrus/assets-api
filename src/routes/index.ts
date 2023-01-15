import { Application } from 'express';
import AssetsRouter from './assets';
import HealthRouter from './health';

const applyRoutes = (app: Application): void => {
    app.use(HealthRouter.prefix, HealthRouter.router);
    app.use(AssetsRouter.prefix, AssetsRouter.router);
};

export default applyRoutes;
