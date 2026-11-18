import { ErrorSchema, ErrorCodeType } from '../schemas/common.js';

export class AppError extends Error {
    constructor(
        public code: 'invalid_request' | 'unauthorized' | 'not_found' | 'upstream_error' | 'internal_error',
        message: string,
        public status: number = 500
    ) {
        super(message);
        this.name = 'AppError';
    }
}

export const errorResponse = (code: ErrorCodeType, description: string) => ({
    description,
    content: {
        'application/json': {
            schema: ErrorSchema,
            example: {
                error: { code, message: description }
            }
        }
    }
});