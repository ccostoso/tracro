import { pinoHttp } from 'pino-http';
import { logger } from '../logger.js';
import { randomUUID } from 'node:crypto';

export const requestLogger = pinoHttp({
    logger,
    genReqId: (req, res) => {
        const header = req.headers['x-request-id'];
        const id = header ?? randomUUID();
        res.setHeader('X-Request-Id', id);
        return id;
    },
    redact: ['req.headers.authorization', 'req.headers.cookie']
});