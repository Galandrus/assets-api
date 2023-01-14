import http from 'http';
import app from './app';
import config from './config';
import logger from './utils/logger';

void (() => {
    const server = http.createServer(app);
    server.listen(config.APP_PORT, () => {
        logger.info(`Started at port ${config.APP_PORT} in ${config.NODE_ENV} environment...`);
    });
})();
