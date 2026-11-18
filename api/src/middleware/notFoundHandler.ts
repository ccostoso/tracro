import { Request, Response } from 'express';
import { AppError } from '../lib/errors.js';

export const notFoundHandler = (req: Request, res: Response) => {
    throw new AppError('not_found', 'Resource not found', 404);
};