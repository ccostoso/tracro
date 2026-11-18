import express from 'express';
import { requestLogger } from './middleware/requestLogger.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import healthRoutes from './routes/health.js';

const createApp = () => {
    const app = express();

    // Middleware
    app.use(requestLogger);

    // Routes
    app.use(healthRoutes);

    // Not found handler
    app.use(notFoundHandler);

    // Error handler
    app.use(errorHandler);

    return app;
};

export default createApp;