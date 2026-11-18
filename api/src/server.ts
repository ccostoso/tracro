import createApp from './app.js';
import { config } from './config.js';
import { logger } from './logger.js';

const app = createApp();

const server = app.listen(config.PORT, () => {
    logger.info({ port: config.PORT, env: config.NODE_ENV }, 'Server listening');
});

const shutdown = (signal: string) => {
    logger.info({ signal }, 'Shutting down');

    // Force exit if connections don't drain in time
    const timer = setTimeout(() => {
        logger.error('Shutdown timed out, forcing exit');
        process.exit(1);
    }, 10_000);
    timer.unref();

    server.close((err) => {
        if (err) {
            logger.error({ err }, 'Error while closing server');
            process.exit(1);
        }
        logger.info('Server closed');
        process.exit(0);
    });
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));