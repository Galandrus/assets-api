import http from 'http';
import app from './app';
import config from './config';
import logger from './utils/logger';
import { AppDataSource } from './lib/typeorm';

void (async () => {
    const server = http.createServer(app);

    try {
        await AppDataSource.initialize();
        logger.info('Connected to MySQL databse successfully');
        await AppDataSource.runMigrations();
        logger.info('Seeds added correctly');
    } catch (e) {
        logger.error('An error occurred connecting to MySQL.', e);
    }

    server.listen(config.APP_PORT, () => {
        logger.info(`Started at port ${config.APP_PORT} in ${config.NODE_ENV} environment...`);
    });
})();
