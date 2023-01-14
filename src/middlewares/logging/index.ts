import { Handler } from 'express';
import logger from '../../utils/logger';
import morgan from 'morgan';

export default (): Handler =>
    morgan('tiny', {
        stream: {
            write: (msg) => logger.debug(msg),
        },
    });
