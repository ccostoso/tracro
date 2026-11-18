import { Request, Response, NextFunction } from 'express';
import { logger } from '../logger.js';
import { ZodError } from 'zod';
import { AppError } from '../lib/errors.js';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    // If headers are already sent, delegate to the default Express error handler
    if (res.headersSent) return next(err);

    // ZodError from validation
    if (err instanceof ZodError) {
        logger.warn({ err }, 'Validation error');
        return res.status(400).json({
            error: {
                code: 'invalid_request',
                message: 'Invalid request',
                details: err.issues.map((issue) => ({
                    path: issue.path.join('.'),
                    message: issue.message,
                })),
            },
        });
    }

    // Custom AppError
    if (err instanceof AppError) {
        logger.warn({ err }, `${err.code} error`);
        return res.status(err.status).json({
            error: { code: err.code, message: err.message }
        });
    }

    // Catch-all: log the full stack, send generic message to client
    logger.error({ err }, 'Unhandled error');
    res.status(500).json({
        error: { code: 'internal_error', message: 'Internal Server Error' }
    });
};