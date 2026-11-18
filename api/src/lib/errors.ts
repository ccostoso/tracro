import { ErrorSchema, ErrorCodeType } from '../schemas/common.js';


export class AppError extends Error {
    constructor(
        public code: ErrorCodeType,
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