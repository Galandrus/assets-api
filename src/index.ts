import http from 'http';
import app from './app';
import config from './config';
import logger from './utils/logger';
import 'reflect-metadata';
import { TypeOrmDataSource } from './lib/typeorm';

void (async () => {
    const server = http.createServer(app);

    try {
        await TypeOrmDataSource.initialize();
        logger.info('Connected to MySQL databse successfully');
    } catch (e) {
        logger.error('An error occurred connecting to MySQL.', e);
    }

    server.listen(config.APP_PORT, () => {
        logger.info(`Started at port ${config.APP_PORT} in ${config.NODE_ENV} environment...`);
    });
})();
