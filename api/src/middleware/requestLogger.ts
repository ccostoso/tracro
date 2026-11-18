import { pinoHttp } from 'pino-http';
import { logger } from '../logger.js';

export const requestLogger = pinoHttp({
    logger,
    genReqId: (req) => req.headers['x-request-id'] || '',
    redact: ['req.headers.authorization', 'req.headers.cookie']
});